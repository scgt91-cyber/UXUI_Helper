/**
 * ai-service.ts
 *
 * Browser-side client for the project's Vercel Serverless backend. The
 * frontend NEVER talks to Ollama directly — every request is routed
 * through a Serverless Function under `/api/*` so that:
 *
 *   - the AI provider credentials (OPENROUTER_API_KEY) are only ever
 *     read server-side and are never baked into the client bundle,
 *   - the system prompt's role enforcement lives in one place
 *     (in /api/improve-prompt.ts, not split between client and server),
 *   - provider credentials and upstream configuration never appear in
 *     the browser network layer.
 *
 * Browser → /api/improve-prompt → (server) OpenRouter
 *                          ↑
 *                    server-side env only
 *
 * Two backend routes are consumed here. JSON contract:
 *   POST /api/improve-prompt  body: { prompt: string }
 *       200 → { success: true, prompt: string }
 *       4xx/5xx → { success: false, error: string }
 *
 *
 * The backend controls the user-facing copy via the `error` field; the
 * frontend never exposes raw stack traces, upstream URLs, or daemon
 * payloads to the user.
 */

/**
 * Build fingerprint, auto-injected at build time by vite.config.ts (see
 * the `define` block). Exposed so the UI can display "build: <sha>"
 * and so every error banner can prefix `[build <sha>]` — letting the
 * user compare their running bundle against origin/main without
 * DevTools.
 */
export const BUILD = {
  commit: __BUILD_COMMIT__ || 'unknown',
  date: __BUILD_DATE__ || 'unknown',
};

export interface OptimizedPromptResult {
  optimizedPrompt: string;
}

export type BackendErrorKind =
  | 'validation'
  | 'upstream'
  | 'timeout'
  | 'server'
  | 'network';

/**
 * Single error class for everything that goes wrong on the way to a
 * translated prompt. The `kind` field is the discriminator the UI uses
 * to pick a heading; `httpStatus` is preserved for diagnostics but is
 * NOT rendered to the user — the backend sets the user-facing copy.
 */
export class BackendError extends Error {
  constructor(
    message: string,
    public readonly kind: BackendErrorKind,
    public readonly httpStatus: number | null = null,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = 'BackendError';
  }
}

/**
 * Diagnostic logger. Safe to leave enabled in production: emits ONLY
 * the final request URL, the HTTP method, and the response status.
 * It explicitly does NOT log the request body (which can carry the
 * user's proprietary technical intent), the response body, or any
 * Authorization / Cookie / API-Key header. The output is prefixed with
 * `[ai-service]` so it is trivial to grep in DevTools.
 *
 * The argument is a discriminated union, NOT a free-form `...unknown[]`.
 * That is deliberate: a future maintainer cannot accidentally add a
 * call like `diag('log', body)` and ship a prompt-leaking build — the
 * TypeScript compiler will reject it. The shape of each variant is
 * the only payload the logger ever emits.
 */
type DiagEvent =
  | { kind: 'request'; method: 'POST'; url: string }
  | { kind: 'response'; status: number; url: string }
  | { kind: 'timeout'; url: string }
  | { kind: 'network_error'; url: string; message: string };

function diag(event: DiagEvent): void {
  const prefix = `[ai-service]`;
  switch (event.kind) {
    case 'request':
      // eslint-disable-next-line no-console
      console.log(prefix, `→ ${event.method} ${event.url}`);
      return;
    case 'response':
      // eslint-disable-next-line no-console
      console.log(prefix, `← ${event.status} ${event.url}`);
      return;
    case 'timeout':
      // eslint-disable-next-line no-console
      console.warn(prefix, `timeout/abort for POST ${event.url}`);
      return;
    case 'network_error':
      // eslint-disable-next-line no-console
      console.warn(prefix, `network error for POST ${event.url}: ${event.message}`);
      return;
  }
}

/* -------------------------------------------------------------------------- */
/* Backend URL resolution                                                     */
/* -------------------------------------------------------------------------- */

/**
 * The backend lives at a stable URL so the frontend dials it regardless
 * of where the Vite bundle is hosted (production Vercel deployment,
 * `vercel dev` on localhost, a Freebuff AI-agent preview on some other
 * origin, etc.). Three resolution tiers, lowest priority first:
 *
 *   1. Empty string — only valid when the bundle is hosted on the SAME
 *      origin as the /api function. This is `vite preview`, plain
 *      `vite dev`, and `vercel dev` where both share a single port.
 *      Returning "" there lets apiUrl() emit a relative `/api/*` path
 *      that resolves to the local dev server.
 *
 *   2. VITE_API_BASE_URL env override — highest priority, used when
 *      the operator wants to point at a different backend (custom
 *      staging, a local proxy, etc.). Honored in dev AND in prod.
 *
 *   3. Hardcoded production URL — `import.meta.env.PROD` is `true`
 *      only in production Vite builds. This is the critical one:
 *      a relative URL in a production build fails with 405 when the
 *      bundle is opened inside the Freebuff AI-agent preview, because
 *      that preview's origin does NOT host the /api/improve-prompt
 *      function and the browser resolves the relative fetch against
 *      its own origin. Hardcoding the production deployment URL
 *      sidesteps the entire class of "wrong host" failure the user
 *      just hit.
 *
 * Trailing slashes are always stripped so path joining can never
 * produce a doubled slash like `https://x.com//api/improve-prompt`.
 */
function apiBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_API_BASE_URL?.trim();

  if (fromEnv) {
    return fromEnv.replace(/\/+$/, "");
  }

  if (import.meta.env.PROD) {
    // The single Vercel deployment that hosts /api/improve-prompt.
    // This branch is what makes the bundle work correctly when it is
    // served from any other origin (Freebuff preview, embed, iframe).
    return "https://uxui-ai-helper.vercel.app";
  }

  return "";
}

function apiUrl(path: string): string {
  const base = apiBaseUrl();
  return `${base}${path}`;
}

/* -------------------------------------------------------------------------- */
/* Backend transport                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Sends a single POST to the backend. Throws a typed BackendError on
 * any non-200 + { success: true, prompt } response so the UI can pick
 * a heading and let the user retry when appropriate.
 *
 * Retries: NOT implemented in the browser. The backend is idempotent
 * for a given { prompt } input (deterministic at temperature 0.3 — even
 * though not strictly guaranteed, going around the user-visible
 * surface would just hide the failure). The UI exposes a manual retry
 * via the existing button click.
 */
async function postJson<T>(
  path: string,
  body: unknown,
  options: { timeoutMs: number; signal?: AbortSignal } = { timeoutMs: 120_000 },
): Promise<T> {
  const controller = new AbortController();
  const onAbort = () => controller.abort();
  if (options.signal) {
    if (options.signal.aborted) controller.abort();
    else options.signal.addEventListener('abort', onAbort);
  }
  const timer = setTimeout(() => controller.abort(), options.timeoutMs);

  // Final URL the browser will request. Computed once before the fetch
  // so the diagnostic log shows EXACTLY what was dialed (helpful when
  // diagnosing the "the function got reloaded but I'm still hitting an
  // old origin" class of bug).
  const url = apiUrl(path);

  diag({ kind: 'request', method: 'POST', url });

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body ?? {}),
      signal: controller.signal,
    });

    diag({ kind: 'response', status: res.status, url });

    if (!res.ok) {
      // Non-2xx — read the JSON envelope (if any) for the user-facing
      // message. Fall back to statusText.
      const envelope = await readEnvelope(res);
      throw mapHttpStatusToError(res.status, envelope);
    }

    const envelope = (await res.json().catch(() => null)) as
      | { success?: boolean; prompt?: string; error?: string }
      | null;

    if (!envelope || envelope.success !== true) {
      throw new BackendError(
        envelope?.error || 'La respuesta del servidor no es válida.',
        'server',
        res.status,
      );
    }
    return envelope as T;
  } catch (err) {
    if (err instanceof BackendError) throw err;
    if ((err as { name?: string } | null)?.name === 'AbortError') {
      diag({ kind: 'timeout', url });
      throw new BackendError(
        'La solicitud al servidor tardó demasiado. Inténtalo de nuevo.',
        'timeout',
        null,
        err,
      );
    }
    const msg = err instanceof Error ? err.message : String(err);
    diag({ kind: 'network_error', url, message: msg });
    throw new BackendError(
      'No se pudo contactar con el servidor backend. Verifica tu conexión.',
      'network',
      null,
      msg,
    );
  } finally {
    clearTimeout(timer);
    if (options.signal) options.signal.removeEventListener('abort', onAbort);
  }
}

async function readEnvelope(
  res: Response,
): Promise<{ success?: boolean; prompt?: string; error?: string } | null> {
  try {
    return (await res.json()) as {
      success?: boolean;
      prompt?: string;
      error?: string;
    };
  } catch {
    return null;
  }
}

function mapHttpStatusToError(
  status: number,
  envelope: { success?: boolean; prompt?: string; error?: string } | null,
): BackendError {
  const message = envelope?.error || `Error ${status}`;
  if (status === 400) {
    return new BackendError(message, 'validation', status);
  }
  if (status === 504) {
    return new BackendError(message, 'timeout', status);
  }
  if (status === 502) {
    return new BackendError(message, 'upstream', status);
  }
  if (status >= 500) {
    return new BackendError(message, 'server', status);
  }
  return new BackendError(message, 'server', status);
}

/* -------------------------------------------------------------------------- */
/* Public API                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Calls the backend to optimize the user's prompt. The HTTP-status
 * mapping drives the UI banner:
 *   - 400 → input was invalid (banner: "Input inválido")
 *   - 502 → backend couldn't reach Ollama (banner: "Modelo no disponible")
 *   - 504 → Ollama was too slow (banner: "Tiempo agotado")
 *   - 500 → backend crashed (banner: "Error del servidor")
 *   - network / abort → banner: "Sin conexión con el servidor"
 */
export async function generateOptimizedPrompt(
  input: string,
  options: { signal?: AbortSignal } = {},
): Promise<OptimizedPromptResult> {
  const trimmed = (input ?? '').trim();
  if (!trimmed) {
    throw new BackendError('El prompt está vacío.', 'validation', 400);
  }
  const envelope = await postJson<{ success: true; prompt: string }>(
    '/api/improve-prompt',
    { prompt: trimmed },
    { timeoutMs: 130_000, signal: options.signal },
  );
  return { optimizedPrompt: envelope.prompt };
}

