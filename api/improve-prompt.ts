/**
 * /api/improve-prompt
 *
 * Vercel Serverless Function (Node.js 20.x, maxDuration 60s).
 *
 * Receives the user's raw prompt from the browser and forwards an
 * optimized request to the Ollama daemon configured server-side via
 * the OLLAMA_BASE_URL environment variable. The browser never learns
 * the Ollama URL — this is the architectural firewall between
 * frontend and upstream model.
 *
 * Request:
 *   POST /api/improve-prompt
 *   Content-Type: application/json
 *   Body: { "prompt": "<user's raw prompt>" }
 *
 * Response (200 OK):
 *   { "success": true, "prompt": "<the improved prompt>" }
 *
 * Response (any non-2xx):
 *   { "success": false, "error": "<human-readable message>" }
 *
 * Status mapping:
 *   200 — success
 *   400 — empty / missing / oversized prompt (validation)
 *   405 — wrong HTTP method
 *   500 — unhandled exception (server-side crash), missing env, or
 *         OLLAMA_BASE_URL scheme misconfigured (must be https in prod)
 *   502 — Ollama unreachable or returned non-2xx (upstream)
 *   504 — Ollama took too long (timeout)
 *
 * Production-runtime hardening:
 *   When VERCEL_ENV is "production" or "preview", OLLAMA_BASE_URL MUST
 *   be an https:// URL. Plain http:// is refused with a server-side log
 *   entry so an operator can't silently fall back to plaintext when an
 *   SSL certificate misconfig makes a tunnel fail. The escape hatch
 *   OLLAMA_INSECURE=true is honored (logged with a warning) for local
 *   development through `vercel dev` against an unencrypted VPS tunnel.
 *
 * CORS: permissive on purpose (the API is read-only and pure
 * generation, no cookies, no auth tokens).
 */

export const config = {
  runtime: 'nodejs20.x',
  // Ollama cold-model loads + 1024-token generation can run >10s; raise
  // the ceiling to 60s so Hobby plan deployments have headroom.
  maxDuration: 60,
};

/* -------------------------------------------------------------------------- */
/* Server-side env (NEVER exposed to the browser)                             */
/* -------------------------------------------------------------------------- */

const OLLAMA_BASE_URL = (process.env.OLLAMA_BASE_URL ?? '').trim();
const OLLAMA_MODEL =
  (process.env.OLLAMA_MODEL ?? 'llama3').trim() || 'llama3';

// Floor of 1s so a typo like "5" doesn't silently set a 5ms abort.
const MIN_TIMEOUT_MS = 1_000;
const OLLAMA_TIMEOUT_MS = (() => {
  const raw = process.env.OLLAMA_TIMEOUT_MS?.trim();
  const parsed = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(parsed) && parsed >= MIN_TIMEOUT_MS
    ? parsed
    : 120_000;
})();

// Hard cap on accepted prompt size so a malicious caller can't blow
// out the 60s function timeout with a 1MB body. ~1,000–1,200 tokens.
const MAX_PROMPT_CHARS = 5_000;

/* -------------------------------------------------------------------------- */
/* Production-runtime hardening — refuse plain http:// against the upstream   */
/* model when running on a real Vercel deployment (production or preview).    */
/* HTTPS is the only acceptable transport for a VPS-hosted Ollama daemon     */
/* because prompts carry proprietary technical intent.                       */
/* -------------------------------------------------------------------------- */

const VERCEL_ENV = (process.env.VERCEL_ENV ?? '').trim();
const IS_PRODUCTION_RUNTIME =
  VERCEL_ENV === 'production' || VERCEL_ENV === 'preview';
const OLLAMA_INSECURE_OPT_IN =
  (process.env.OLLAMA_INSECURE ?? '').trim().toLowerCase() === 'true';

type UrlValidation =
  | { tag: 'ok'; url: URL }
  | { tag: 'invalid'; reason: string };

function validateOllamaUrl(raw: string): UrlValidation {
  if (!raw) {
    return { tag: 'invalid', reason: 'OLLAMA_BASE_URL is empty' };
  }
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return { tag: 'invalid', reason: 'OLLAMA_BASE_URL is not a parseable URL' };
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return {
      tag: 'invalid',
      reason: `OLLAMA_BASE_URL must use http(s); got '${parsed.protocol}'`,
    };
  }
  if (IS_PRODUCTION_RUNTIME && parsed.protocol === 'http:' && !OLLAMA_INSECURE_OPT_IN) {
    return {
      tag: 'invalid',
      reason:
        'OLLAMA_BASE_URL must use https in production / preview. Set OLLAMA_INSECURE=true to override (not recommended).',
    };
  }
  // In production runtime, loopback hostnames are unreachable from a
  // Vercel function — refuse them so an operator doesn't wait 60s for a
  // doomed connection instead of seeing a fast config error.
  if (IS_PRODUCTION_RUNTIME) {
    const host = parsed.hostname.toLowerCase();
    if (host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0' || host === '::1') {
      return {
        tag: 'invalid',
        reason: `OLLAMA_BASE_URL uses loopback hostname "${host}" — unreachable from a Vercel function in production. Point it at the public HTTPS URL of your VPS Ollama / tunnel.`,
      };
    }
  }
  if (OLLAMA_INSECURE_OPT_IN && IS_PRODUCTION_RUNTIME) {
    log('warn', 'ollama_insecure_opt_in', {
      env: 'OLLAMA_INSECURE=true',
      hint: 'Plaintext transport is enabled against the upstream Ollama daemon.',
    });
  }
  return { tag: 'ok', url: parsed };
}

/* -------------------------------------------------------------------------- */
/* System prompt — owns the model's persona                                   */
/* -------------------------------------------------------------------------- */

const SYSTEM_PROMPT = `
You are an AI agent specialized EXCLUSIVELY in prompt engineering for software development.

Your ONLY responsibility is to transform a user-supplied prompt into a high-quality, professional prompt intended for AI coding assistants such as Claude, GPT, Cursor, Windsurf, Lovable, Bolt, and similar tools.

Domains of expertise you draw on (use them, never go outside them):
- Prompt engineering
- UX/UI design and design systems
- React, TypeScript, Next.js, Tailwind CSS, Vite
- Backend development (Node.js, REST APIs, GraphQL, databases)
- Full-stack architecture
- Figma and modern web application patterns
- AI-assisted software development workflows

Hard constraints — violating any of these is a failure:
1. You do NOT answer general knowledge questions.
2. You do NOT act as a chatbot or engage in conversation.
3. You do NOT perform tasks unrelated to improving the user's prompt.
4. You output ONLY a single JSON object. No prose, no markdown fences, no preamble, no commentary.
5. You do NOT output reasoning, planning, or thought tags of any kind (e.g. <think>...</think>, <reason>...</reason>). The JSON object is your entire response.
6. The JSON object MUST have exactly one key: "optimizedPrompt" (string).
7. The "optimizedPrompt" must be written in Spanish (the application's UI language), but standard technical terms (flexbox, grid, hover, breakpoints, CTA, WCAG, design tokens, affordance, cognitive load, etc.) MUST stay in English.
8. The optimized prompt must be clear, detailed, structured, context-aware, and technically accurate.
9. Organize it with logical sections such as: Objetivo, Layout & Grid, Typography & Spacing, Interaction & States, Accessibility (WCAG), Constraints & Assumptions, Expected Behavior, Edge Cases, Desired Output.
10. Specify constraints, assumptions, expected behavior, edge cases, and the desired output.
11. Preserve the user's original intent. Do not invent unrelated features.
12. Fill in missing technical context only when it is genuinely required to make the prompt executable.
13. Do not echo the user's input verbatim. Rewrite it using professional software engineering terminology.

Output format — produce exactly the following shape and nothing more:
{"optimizedPrompt":"<the new prompt, in Spanish with English technical terms, organized with the sections above>"}
`.trim();

/* -------------------------------------------------------------------------- */
/* CORS headers applied to every response                                     */
/* -------------------------------------------------------------------------- */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
} as const;

/* -------------------------------------------------------------------------- */
/* Server-side logging — metadata only, never log the user's prompt content. */
/* -------------------------------------------------------------------------- */

type LogLevel = 'info' | 'warn' | 'error';
function log(level: LogLevel, event: string, fields: Record<string, unknown>) {
  const ts = new Date().toISOString();
  // NEVER include `prompt` here — user prompts can carry proprietary text.
  const safe = { ts, level, event, ...fields };
  const line = JSON.stringify(safe);
  if (level === 'error') console.error(line);
  else if (level === 'warn') console.warn(line);
  else console.log(line);
}

/* -------------------------------------------------------------------------- */
/* JSON extractor (model output → optimizedPrompt string)                     */
/* Non-greedy regex (stops at FIRST closing brace).                           */
/* -------------------------------------------------------------------------- */

function extractOptimizedPrompt(raw: string): string | null {
  if (typeof raw !== 'string' || raw.length === 0) return null;
  const cleaned = raw
    .replace(/```(?:json)?/gi, '')
    .replace(/```/g, '')
    .replace(/<(think|reason|reflection|analysis)>[\s\S]*?<\/\1>/gi, '')
    .replace(/<\/?(?:think|reason|reflection|analysis)\/?>/gi, '')
    .trim();

  const match = cleaned.match(/\{[\s\S]*?\}/);
  if (!match) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(match[0]);
  } catch {
    return null;
  }

  if (parsed && typeof parsed === 'object') {
    const candidate = (parsed as Record<string, unknown>).optimizedPrompt;
    if (typeof candidate === 'string' && candidate.trim().length > 0) {
      return candidate.trim();
    }
  }
  return null;
}

/* -------------------------------------------------------------------------- */
/* Upstream Ollama call                                                       */
/* -------------------------------------------------------------------------- */

type UpstreamResult =
  | { tag: 'success'; optimizedPrompt: string }
  | {
      tag: 'failure';
      kind: 'upstream' | 'timeout';
      upstreamHttpStatus: number | null;
      detail: string;
    };

async function callOllama(userPrompt: string): Promise<UpstreamResult> {
  const urlCheck = validateOllamaUrl(OLLAMA_BASE_URL);
  if (urlCheck.tag === 'invalid') {
    log('error', 'ollama_url_invalid', { detail: urlCheck.reason });
    return {
      tag: 'failure',
      kind: 'upstream',
      upstreamHttpStatus: 500,
      detail: `Server misconfiguration: ${urlCheck.reason}`,
    };
  }
  // After validation the upstream URL has been verified to be either
  // https (in production) or http/https (in dev) — never a typo or
  // bare hostname that would 404 silently.
  const upstreamBaseUrl = urlCheck.url.toString().replace(/\/+$/, '');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), OLLAMA_TIMEOUT_MS);

  try {
    const response = await fetch(`${upstreamBaseUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        system: SYSTEM_PROMPT,
        prompt: userPrompt,
        format: 'json',
        stream: false,
        options: { temperature: 0.2, num_predict: 1024 },
      }),
    });

    if (!response.ok) {
      let detail = response.statusText;
      try {
        detail = (await response.text()) || detail;
      } catch {
        /* ignore */
      }
      const diagnostic =
        response.status === 404
          ? `the model "${OLLAMA_MODEL}" is not pulled on the upstream daemon`
          : response.status === 405
            ? `upstream rejected POST (a tunnel or proxy between the function and the daemon disallows POST)`
            : `upstream returned ${response.status}`;
      return {
        tag: 'failure',
        kind: 'upstream',
        upstreamHttpStatus: response.status,
        detail: `${diagnostic}: ${detail.slice(0, 500)}`,
      };
    }

    const payload = await response.json().catch(() => null);
    const raw = typeof payload?.response === 'string' ? payload.response : '';
    if (!raw) {
      return {
        tag: 'failure',
        kind: 'upstream',
        upstreamHttpStatus: response.status,
        detail: 'upstream returned an empty response body',
      };
    }

    const optimizedPrompt = extractOptimizedPrompt(raw);
    if (!optimizedPrompt) {
      return {
        tag: 'failure',
        kind: 'upstream',
        upstreamHttpStatus: response.status,
        detail:
          'upstream did not include a valid "optimizedPrompt" field in its JSON output',
      };
    }
    return { tag: 'success', optimizedPrompt };
  } catch (err: unknown) {
    if ((err as { name?: string } | null)?.name === 'AbortError') {
      return {
        tag: 'failure',
        kind: 'timeout',
        upstreamHttpStatus: null,
        detail: `upstream timed out after ${OLLAMA_TIMEOUT_MS}ms`,
      };
    }
    const msg = err instanceof Error ? err.message : String(err);
    return {
      tag: 'failure',
      kind: 'upstream',
      upstreamHttpStatus: null,
      detail: `upstream network error: ${msg.slice(0, 500)}`,
    };
  } finally {
    clearTimeout(timer);
  }
}

/* -------------------------------------------------------------------------- */
/* JSON response helpers                                                      */
/* -------------------------------------------------------------------------- */

function jsonResponse(
  body: unknown,
  status: number,
  extraHeaders: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json; charset=utf-8',
      ...extraHeaders,
    },
  });
}

/* -------------------------------------------------------------------------- */
/* HTTP handler (Web Fetch API: Request → Response)                           */
/* -------------------------------------------------------------------------- */

export default async function handler(request: Request): Promise<Response> {
  // CORS preflight — pass through before any other check.
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  // Method gate.
  if (request.method !== 'POST') {
    log('warn', 'method_not_allowed', { method: request.method });
    return jsonResponse(
      { success: false, error: 'Método no permitido. Usa POST.' },
      405,
    );
  }

  // Server-side env gate — never expose to the browser, only logged here
  // for the operator's diagnosis.
  if (!OLLAMA_BASE_URL) {
    log('error', 'config_missing', { env: 'OLLAMA_BASE_URL' });
    return jsonResponse(
      {
        success: false,
        error:
          'Configuración del servidor incompleta. Define OLLAMA_BASE_URL en las variables de entorno del proyecto en Vercel.',
      },
      500,
    );
  }

  // Validate body shape.
  let body: { prompt?: unknown };
  try {
    body = (await request.json()) as { prompt?: unknown };
  } catch {
    return jsonResponse(
      { success: false, error: 'Cuerpo JSON inválido.' },
      400,
    );
  }

  const prompt =
    typeof body?.prompt === 'string' ? body.prompt.trim() : '';
  const charLength = prompt.length;

  if (!prompt) {
    log('info', 'validation_empty', { charLength });
    return jsonResponse(
      { success: false, error: 'El prompt está vacío.' },
      400,
    );
  }
  if (charLength > MAX_PROMPT_CHARS) {
    log('info', 'validation_too_long', { charLength });
    return jsonResponse(
      {
        success: false,
        error: `El prompt excede el límite de ${MAX_PROMPT_CHARS} caracteres.`,
      },
      400,
    );
  }

  // Call the upstream model.
  try {
    const result = await callOllama(prompt);

    if (result.tag === 'success') {
      log('info', 'success', { charLength, model: OLLAMA_MODEL });
      return jsonResponse(
        { success: true, prompt: result.optimizedPrompt },
        200,
      );
    }

    // Tag is 'failure' from here on — TS narrows on the tagged union.
    if (result.kind === 'timeout') {
      log('warn', 'upstream_timeout', {
        charLength,
        detail: result.detail,
        timeoutMs: OLLAMA_TIMEOUT_MS,
      });
      return jsonResponse(
        {
          success: false,
          error: 'El modelo tardó demasiado en responder. Inténtalo de nuevo.',
        },
        504,
      );
    }

    log('error', 'upstream_failure', {
      charLength,
      upstreamHttpStatus: result.upstreamHttpStatus,
      detail: result.detail,
    });
    return jsonResponse(
      {
        success: false,
        error:
          'No se pudo comunicar con el modelo. Verifica que el daemon de Ollama esté accesible desde el servidor.',
      },
      502,
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    log('error', 'unhandled_exception', { charLength, message: msg });
    return jsonResponse(
      { success: false, error: 'Error inesperado del servidor.' },
      500,
    );
  }
}
