/**
 * ai-service.ts
 *
 * Calls a local Ollama instance directly from the browser to optimize a
 * user-supplied prompt into a high-quality, structured prompt suitable for
 * AI coding assistants.
 *
 * Configuration (via Vite env vars / .env):
 *   VITE_OLLAMA_BASE_URL   Ollama base URL the BROWSER can reach. Default
 *                          is http://127.0.0.1:11434 (works for local dev;
 *                          NOT usable from AI-agent preview sandboxes —
 *                          see README for tunnel / hosted-Ollama options).
 *   VITE_OLLAMA_MODEL      Model name (e.g. llama3, qwen3, deepseek-r1).
 *   VITE_OLLAMA_TIMEOUT_MS Per-request timeout in ms. Defaults to 120000.
 *
 * The browser calls `${VITE_OLLAMA_BASE_URL}/api/generate` directly. There is
 * no Vite dev proxy — such a proxy never applied in AI-agent previews
 * (which serve the static `vite build` output) and would have been silently
 * ignored. Direct fetch is the simplest correct architecture.
 *
 * CORS / Mixed-Content notes:
 * - Same-origin: works without configuration.
 * - Cross-origin (e.g. AI-agent preview, Vercel, etc.): Ollama's
 *   OLLAMA_ORIGINS env var must allow the page's origin (set to `*` for
 *   permissive).
 * - HTTPS page → HTTP Ollama URL: blocked by the browser as Mixed Content.
 *   Use a tunnel (Cloudflare Tunnel, ngrok) or a hosted Ollama over HTTPS.
 *
 * The AI is constrained — by the system prompt below — to act exclusively as
 * a prompt-engineering specialist. It is not a general chatbot and will not
 * answer off-topic questions.
 */

export const OLLAMA_MODEL =
  import.meta.env.VITE_OLLAMA_MODEL?.trim() || 'llama3';

const OLLAMA_BASE_URL =
  import.meta.env.VITE_OLLAMA_BASE_URL?.trim() || 'http://127.0.0.1:11434';

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
 * Matches loopback hostnames: 127.0.0.1, 0.0.0.0, localhost, with an
 * optional port and optional scheme. Anchored so that "127.0.0.1.evil.com"
 * does NOT match (next char after .1 must be :/?# or end of string).
 */
const LOOPBACK_HOSTNAME =
  /^(?:https?:\/\/)?(?:127\.0\.0\.1|0\.0\.0\.0|localhost)(?::\d+)?(?:[\/?#]|$)/i;

/**
 * True when this app is loaded from a localhost origin. Used to suppress
 * the "misconfigured in a hosted context" heads-up when the user is
 * actually running locally (including `vite preview` on localhost, which
 * still reports `import.meta.env.MODE === 'production'`).
 */
function pageIsOnLocalhost(): boolean {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0';
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

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OLLAMA_TIMEOUT_MS);

  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
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
            `something between your browser and Ollama rejected POST (a Cloudflare Worker, Vercel rewrite, or your tunnel config may disallow POST) — try \`curl -X POST ${OLLAMA_BASE_URL}/api/generate\` to confirm Ollama itself accepts the call.`
          : 'the Ollama daemon rejected the request.';
      throw new OllamaError(
        `Ollama returned ${response.status}${detail ? `: ${detail.slice(0, 500)}` : ''}. ` +
          `${diagnostic} ` +
          `Endpoint: POST ${OLLAMA_BASE_URL}/api/generate. ` +
          `Make sure \`ollama serve\` is running and the model is pulled.`,
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
    if (err?.name === 'AbortError') {
      throw new OllamaError(
        `Ollama request timed out after ${OLLAMA_TIMEOUT_MS}ms. ` +
          `The model may still be loading — try again, or raise VITE_OLLAMA_TIMEOUT_MS.`,
      );
    }
    // CORS is listed first in this list because it's the most common cause
    // when a deployed / preview page can't reach Ollama.
    //
    // When the diagnostic heads-up applies (VITE_OLLAMA_BASE_URL is still a
    // loopback URL AND the page is loaded from a non-localhost origin AND
    // this isn't `vite dev`), the four-mode enumeration is replaced with a
    // short targeted hint to keep the banner readable.
    const headsUp = LOOPBACK_HOSTNAME.test(OLLAMA_BASE_URL) &&
      pageIsOnLocalhost() === false;
    const message = headsUp
      ? `Network error: ${OLLAMA_BASE_URL}/api/generate is unreachable from this page's ` +
        `network. VITE_OLLAMA_BASE_URL is still pointing at a loopback address, but the page is ` +
        `being served from a non-localhost origin. Set VITE_OLLAMA_BASE_URL to a publicly ` +
        `reachable endpoint (Cloudflare Tunnel, ngrok, or hosted Ollama over HTTPS) and configure ` +
        `\u2018OLLAMA_ORIGINS\u2019 on the Ollama daemon to allow this page's origin (or \`*\`).`
      : `Network error: could not reach Ollama at ${OLLAMA_BASE_URL}/api/generate. ` +
        `Likely causes (most common first): ` +
        `(1) CORS blocked by the browser — set \`OLLAMA_ORIGINS\` on the Ollama daemon to allow this page's origin (or \`*\`); ` +
        `(2) \`ollama serve\` is not running at that URL; ` +
        `(3) this network can't reach the URL (e.g. AI-agent preview sandbox can't dial your localhost — set VITE_OLLAMA_BASE_URL to a publicly reachable endpoint); ` +
        `(4) the page is HTTPS but the Ollama URL is HTTP (Mixed Content — use a tunnel or hosted Ollama).`;
    throw new OllamaError(message, err);
  } finally {
    clearTimeout(timeout);
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
