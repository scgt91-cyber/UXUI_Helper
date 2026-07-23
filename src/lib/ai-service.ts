/**
 * ai-service.ts
 *
 * Calls an Ollama daemon directly from the browser to optimize a
 * user-supplied prompt into a high-quality, structured prompt suitable for
 * AI coding assistants.
 *
 * Configuration (via Vite env vars / .env):
 *   VITE_OLLAMA_BASE_URL   REQUIRED. The Ollama HTTPS base URL the BROWSER
 *                          can reach at runtime. There is NO localhost
 *                          fallback by design — this app is deployed on
 *                          Vercel and must never attempt to dial 127.0.0.1
 *                          directly. Use a tunnel (Cloudflare Tunnel,
 *                          ngrok) or a hosted-Ollama-over-HTTPS endpoint.
 *                          If unset, calls throw ConfigError before any
 *                          network request — a clear configuration banner
 *                          is rendered instead of attempting a default.
 *   VITE_OLLAMA_MODEL      Model name (e.g. llama3, qwen3, deepseek-r1).
 *                          Defaults to 'llama3' if unset.
 *   VITE_OLLAMA_TIMEOUT_MS Per-request timeout in ms. Defaults to 120000.
 *
 * The browser calls `${VITE_OLLAMA_BASE_URL}/api/generate` directly. There is
 * no Vite dev proxy — such a proxy never applied in AI-agent previews
 * (which serve the static `vite build` output) and would have been silently
 * ignored. Direct fetch is the simplest correct production architecture.
 *
 * CORS / Mixed-Content notes:
 * - Same-origin: works without configuration.
 * - Cross-origin (e.g. Vercel preview, AI-agent preview): Ollama's
 *   OLLAMA_ORIGINS env var on the Ollama daemon must allow the page's
 *   origin (or `*` for permissive). The frontend itself cannot bypass CORS.
 * - HTTPS page → HTTP Ollama URL: blocked by the browser as Mixed Content.
 *   Always use HTTPS in front of the Ollama daemon for any hosted context.
 *
 * The AI is constrained — by the system prompt below — to act exclusively as
 * a prompt-engineering specialist. It is not a general chatbot and will not
 * answer off-topic questions.
 */

/**
 * Build fingerprint, auto-injected at build time by vite.config.ts (see the
 * `define` block). Exposed so the UI can display "build: <sha>" and so
 * every error banner can prefix `[build <sha>]` — letting the user compare
 * their running bundle against origin/main without DevTools.
 */
export const BUILD = {
  commit: __BUILD_COMMIT__ || 'unknown',
  date: __BUILD_DATE__ || 'unknown',
};

export const OLLAMA_MODEL =
  import.meta.env.VITE_OLLAMA_MODEL?.trim() || 'llama3';

/**
 * Resolved lazily at call time (NOT exported as a constant) so the
 * configured endpoint can be read fresh each request — and so a missing
 * env var produces a clean ConfigError rather than a silent localhost
 * fallback that would fail anyway in production.
 *
 * Throws ConfigError if VITE_OLLAMA_BASE_URL is missing or whitespace-only.
 * Never returns a loopback address implicitly; the user must explicitly
 * set a loopback URL if they want to talk to a local daemon.
 */
function resolveOllamaBaseUrl(): string {
  const raw = import.meta.env.VITE_OLLAMA_BASE_URL?.trim();
  if (!raw) {
    throw new ConfigError(
      `[build ${BUILD.commit}] Configuración requerida: VITE_OLLAMA_BASE_URL no está definida. ` +
        `Esta aplicación está desplegada en producción y, por diseño, no usa ningún fallback a localhost. ` +
        `Define VITE_OLLAMA_BASE_URL con la URL HTTPS pública de un Ollama accesible desde el navegador ` +
        `(por ejemplo, un túnel: Cloudflare Tunnel, ngrok; o una instancia Ollama alojada sobre HTTPS). ` +
        `Si VITE_OLLAMA_BASE_URL apunta explícitamente a 127.0.0.1/localhost, el navegador tampoco podrá llegar: ` +
        `los sandboxes de Vercel / preview no pueden marcar un puerto local.`,
    );
  }
  return raw;
}

// 1s floor so a typo like `5` doesn't silently set a 5ms abort.
const MIN_OLLAMA_TIMEOUT_MS = 1_000;
const OLLAMA_TIMEOUT_MS = (() => {
  const raw = import.meta.env.VITE_OLLAMA_TIMEOUT_MS?.trim();
  const parsed = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(parsed) && parsed >= MIN_OLLAMA_TIMEOUT_MS ? parsed : 120_000;
})();

const SYSTEM_PROMPT = `
You are an AI agent specialized EXCLUSIVELY in prompt engineering for software development.

Your ONLY responsibility is to transform a user-supplied prompt into a high-quality, professional prompt intended for AI coding assistants such as Claude, GPT, Cursor, Windsurf, Lovable, Bolt, and similar tools.

Domains of expertise you draw on (use them, never go outside them):
- Prompt engineering
- UX/UI design and design systems
- Frontend development (React, TypeScript, Next.js, Tailwind CSS, Vite)
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

export interface OptimizedPromptResult {
  optimizedPrompt: string;
}

export class OllamaError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = 'OllamaError';
  }
}

/**
 * Distinct from OllamaError so the UI can render a dedicated "Configuration
 * required" banner (instead of "Local model error") and so this category
 * never bleeds into the runtime-network diagnostic lists.
 */
export class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigError';
  }
}

/**
 * Calls the Ollama daemon to optimize the prompt. Throws on failure so
 * callers can surface a real error — no hardcoded fallback template is used.
 */
export async function generateOptimizedPrompt(
  input: string,
): Promise<OptimizedPromptResult> {
  const trimmed = (input ?? '').trim();
  if (!trimmed) {
    throw new OllamaError('Input is empty.');
  }

  // Resolve the configured endpoint FIRST so a missing env var surfaces as
  // a clean ConfigError rather than crashing mid-fetch. The catch block
  // below forwards ConfigError untouched so the UI can render a dedicated
  // "Configuration required" banner instead of a runtime-network error.
  const baseUrl = resolveOllamaBaseUrl();
  const endpoint = `${baseUrl}/api/generate`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OLLAMA_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        system: SYSTEM_PROMPT,
        prompt: trimmed,
        format: 'json',
        stream: false,
        options: {
          temperature: 0.2,
          num_predict: 1024,
        },
      }),
    });

    if (!response.ok) {
      let detail = response.statusText;
      try {
        detail = (await response.text()) || detail;
      } catch {
        /* ignore */
      }
      const diagnostic = response.status === 404
        ? `the model "${OLLAMA_MODEL}" is not pulled — try \`ollama pull ${OLLAMA_MODEL}\`.`
        : response.status === 405
          ? // Ollama itself almost never returns 405 for valid POST + JSON to
            // /api/generate; the failure is almost always an intermediary
            // (Cloudflare Worker, Vercel rewrite, tunnel refusing POST, …).
            // Suggest a curl sanity check so the user can isolate the layer.
            `something between your browser and Ollama rejected POST (a Cloudflare Worker, Vercel rewrite, or your tunnel config may disallow POST) — try \`curl -X POST ${baseUrl}/api/generate\` to confirm Ollama itself accepts the call.`
          : 'the Ollama daemon rejected the request.';
      throw new OllamaError(
        `[build ${BUILD.commit}] Ollama returned ${response.status}${detail ? `: ${detail.slice(0, 500)}` : ''}. ` +
          `${diagnostic} ` +
          `Endpoint: POST ${endpoint}. ` +
          `Browser origin: ${typeof window !== 'undefined' ? window.location.origin : '(server)'}. ` +
          `Method: POST. Content-Type: application/json. ` +
          `Make sure \`ollama serve\` is running and the model is pulled. ` +
          `If you see the OLD \`/api/ollama\` or \`/__ollama\` path in the error, your preview is serving a stale build — force-resync.`,
      );
    }

    const payload = await response.json().catch(() => null);
    const raw = typeof payload?.response === 'string' ? payload.response : '';
    if (!raw) {
      throw new OllamaError('Ollama returned an empty response.');
    }

    const optimizedPrompt = extractOptimizedPrompt(raw);
    if (!optimizedPrompt) {
      throw new OllamaError(
        'Ollama response did not include a valid "optimizedPrompt" string.',
      );
    }

    return { optimizedPrompt };
  } catch (err) {
    if (err instanceof OllamaError) {
      throw err;
    }
    if (err instanceof ConfigError) {
      throw err;
    }
    if (err?.name === 'AbortError') {
      throw new OllamaError(
        `[build ${BUILD.commit}] Ollama request timed out after ${OLLAMA_TIMEOUT_MS}ms. ` +
          `The model may still be loading — try again, or raise VITE_OLLAMA_TIMEOUT_MS. ` +
          `Endpoint: POST ${endpoint}.`,
      );
    }
    // CORS is listed first in this list because it's the most common cause
    // when a deployed / preview page can't reach Ollama.
    const browserOrigin =
      typeof window !== 'undefined' ? window.location.origin : '(server)';
    throw new OllamaError(
      `[build ${BUILD.commit}] Network error: could not reach Ollama at ${endpoint}. ` +
        `Browser origin: ${browserOrigin}. ` +
        `Likely causes (most common first): ` +
        `(1) CORS blocked by the browser — set \`OLLAMA_ORIGINS\` on the Ollama daemon to allow this page's origin (or \`*\`); ` +
        `(2) \`ollama serve\` is not running at that URL; ` +
        `(3) the page's network can't reach the configured endpoint (a private / loopback URL will never be reachable from a deployed Vercel / preview origin — set VITE_OLLAMA_BASE_URL to a publicly reachable one); ` +
        `(4) the page is HTTPS but the Ollama URL is HTTP (Mixed Content — use a tunnel or hosted Ollama). ` +
        `Cause: ${err instanceof Error ? err.message : String(err)}.`,
      err,
    );
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Diagnostic helper. Calls `GET /api/tags` on the configured Ollama
 * endpoint and returns what the browser actually did — the URL it called,
 * its own origin, the HTTP status (or a network error class), and the
 * list of models Ollama currently has loaded. The UI surfaces this so the
 * user can copy-paste it back when debugging connectivity.
 */
export interface OllamaDiagnostic {
  url: string;
  origin: string;
  method: 'GET';
  status:
    | 'reachable'
    | 'unreachable'
    | 'timeout'
    | 'http-error'
    | 'not-configured';
  httpStatus?: number;
  detail?: string;
}

const DIAGNOSE_TIMEOUT_MS = 5_000;

export async function diagnoseOllama(): Promise<OllamaDiagnostic> {
  const origin =
    typeof window !== 'undefined' ? window.location.origin : '(server)';

  // Resolve the configured endpoint FIRST. We never want to attempt any
  // network call without an explicit, user-configured URL.
  let baseUrl: string;
  try {
    baseUrl = resolveOllamaBaseUrl();
  } catch (err) {
    if (err instanceof ConfigError) {
      return {
        url: '(VITE_OLLAMA_BASE_URL not set)',
        origin,
        method: 'GET',
        status: 'not-configured',
        detail: err.message,
      };
    }
    throw err;
  }
  const endpoint = `${baseUrl}/api/tags`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DIAGNOSE_TIMEOUT_MS);
  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (res.ok) {
      const data = await res.json().catch(() => null);
      const models = Array.isArray(data?.models)
        ? data.models
            .map((m: { name?: string }) => m.name ?? '?')
            .join(', ')
        : null;
      return {
        url: endpoint,
        origin,
        method: 'GET',
        status: 'reachable',
        httpStatus: res.status,
        detail: models ? `models: ${models}` : 'reachable',
      };
    }
    let body = '';
    try {
      body = (await res.text()).slice(0, 200);
    } catch {
      /* ignore */
    }
    return {
      url: endpoint,
      origin,
      method: 'GET',
      status: 'http-error',
      httpStatus: res.status,
      detail: `${res.status} ${res.statusText}${body ? ` — ${body}` : ''}`.trim(),
    };
  } catch (err: unknown) {
    clearTimeout(timer);
    if ((err as { name?: string } | null)?.name === 'AbortError') {
      return {
        url: endpoint,
        origin,
        method: 'GET',
        status: 'timeout',
        detail: `${DIAGNOSE_TIMEOUT_MS}ms timeout`,
      };
    }
    const message =
      err instanceof Error ? err.message : String(err);
    return {
      url: endpoint,
      origin,
      method: 'GET',
      status: 'unreachable',
      detail: message,
    };
  }
}

/**
 * Pulls out the first JSON object from the model's output (in case the local
 * model wraps it in markdown fences, leaks reasoning tags like <think>, or
 * otherwise adds stray text) and reads the "optimizedPrompt" field. Returns
 * null if nothing usable is found.
 *
 * Non-greedy match so we stop at the FIRST closing brace — protects against
 * a model that emits a stray `{…}` later in the response (e.g. the JSON
 * followed by a stray code sample) hijacking the parse.
 */
function extractOptimizedPrompt(raw: string): string | null {
  const cleaned = raw
    // Strip markdown code fences (```json ... ``` or ``` ... ```).
    .replace(/```(?:json)?/gi, '')
    .replace(/```/g, '')
    // Strip reasoning-model artifacts (<think>...</think>, <reason>...</reason>).
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
