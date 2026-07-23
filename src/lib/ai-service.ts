/**
 * ai-service.ts
 *
 * Browser-side client for the project's Vercel Serverless backend. The
 * frontend NEVER talks to Ollama directly — every request is routed
 * through a Serverless Function under `/api/*` so that:
 *
 *   - the Ollama URL (read from OLLAMA_BASE_URL) is only ever read
 *     server-side and is never baked into the client bundle,
 *   - the system prompt's role enforcement lives in one place
 *     (in /api/improve-prompt.ts, not split between client and server),
 *   - the Ollama daemon credentials / tunnel URL do not appear in any
 *     network panel the user can open in DevTools.
 *
 * Browser → /api/improve-prompt → (server) Ollama
 *                          ↑
 *                    server-side env only
 *
 * Two backend routes are consumed here. JSON contract:
 *   POST /api/improve-prompt  body: { prompt: string }
 *       200 → { success: true, prompt: string }
 *       4xx/5xx → { success: false, error: string }
 *
 *   GET  /api/health
 *       200 → { success: true, status: 'reachable', models: string[] }
 *       4xx/5xx → { success: false, status: '...' , error: '...' }
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

/* -------------------------------------------------------------------------- */
/* Backend URL resolution                                                     */
/* -------------------------------------------------------------------------- */

/**
 * The frontend dials only same-origin paths under `/api/*`. The host
 * origin is implicit: in production it's the Vercel deployment URL; in
 * `vite dev` it's the Vite dev server (configurable via
 * VITE_API_BASE_URL override) so that `vite dev` can target a deployed
 * preview backend when needed.
 *
 * `vercel dev` is the recommended local workflow (it serves both the
 * Vite-built bundle and the /api functions on the same port). The
 * override exists so users can test against a deployed backend even
 * from a plain `vite dev` session.
 */
function apiBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_API_BASE_URL?.trim();

  if (fromEnv) {
    return fromEnv.replace(/\/+$/, "");
  }

  return "https://uxui-ai-helper-api.vercel.app/";
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
 * for a given { prompt } input (deterministic at temperature 0.2 — even
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

  try {
    const res = await fetch(apiUrl(path), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body ?? {}),
      signal: controller.signal,
    });

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
      throw new BackendError(
        'La solicitud al servidor tardó demasiado. Inténtalo de nuevo.',
        'timeout',
        null,
        err,
      );
    }
    const msg = err instanceof Error ? err.message : String(err);
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

/* -------------------------------------------------------------------------- */
/* Diagnostic helper — talks to GET /api/health (never to Ollama directly)    */
/* -------------------------------------------------------------------------- */

export interface BackendHealth {
  /** success: true → upstream reachable (see `models`). */
  success: boolean;
  /** Granular status field — same union as /api/health. */
  status?: string;
  /** Models Ollama currently has loaded (only when success: true). */
  models?: string[];
  /** Upstream Ollama's HTTP status (when known). */
  upstreamHttpStatus?: number | null;
  /** User-facing diagnostic copy (only when success: false). */
  error?: string;
  /** Free-form diagnostic fields the UI surfaces (no secret leak). */
  backendRoute: string;
  browserOrigin: string;
  /** The HTTP status the browser received from /api/health. */
  httpStatus: number;
  method: 'GET';
}

interface HealthResponseBody {
  success?: boolean;
  status?: string;
  models?: string[];
  upstreamHttpStatus?: number | null;
  error?: string;
}

export async function diagnoseOllama(): Promise<BackendHealth> {
  const browserOrigin =
    typeof window !== 'undefined' ? window.location.origin : '(server)';
  const backendRoute = apiUrl('/api/health');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);

  try {
    const res = await fetch(backendRoute, {
      method: 'GET',
      signal: controller.signal,
    });
    clearTimeout(timer);

    const body = (await res.json().catch(() => null)) as HealthResponseBody | null;

    return {
      success: body?.success === true,
      status: body?.status,
      models: body?.models,
      upstreamHttpStatus: body?.upstreamHttpStatus ?? null,
      error: body?.error,
      backendRoute,
      browserOrigin,
      httpStatus: res.status,
      method: 'GET',
    };
  } catch (err: unknown) {
    clearTimeout(timer);
    const msg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      status: 'network',
      error: `No se pudo contactar con el backend: ${msg}`,
      backendRoute,
      browserOrigin,
      httpStatus: 0,
      method: 'GET',
    };
  }
}
