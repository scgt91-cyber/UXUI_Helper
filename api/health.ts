/**
 * /api/health
 *
 * Vercel Serverless Function (Node.js 20.x, maxDuration 30s).
 *
 * Probes the Ollama daemon server-side (OLLAMA_BASE_URL env var) and
 * returns a sanitized status — the Ollama URL is NEVER echoed into the
 * response payload. The browser uses this to confirm:
 *   (a) the backend function is reachable from the page's origin, and
 *   (b) the backend can in turn reach the upstream Ollama daemon.
 *
 * The browser never sees Ollama's URL, daemon address, or tunnel
 * credentials — only the abstract status it needs.
 *
 * JSON contract (aligned with the user's spec for /api/improve-prompt):
 *   Success — { "success": true,  "status": "reachable",
 *               "models": ["llama3", "qwen3", ...] }
 *   Failure — { "success": false, "status": "timeout" | "http-error" |
 *               "unreachable" | "config-missing" | "method-not-allowed",
 *               "upstreamHttpStatus": <number|null>,
 *               "error": "<sanitized human-readable message>" }
 *
 * HTTP status mapping (so curl tools can read failure from the status
 * line alone, while the browser UI reads the JSON envelope):
 *   200 — reachable
 *   405 — method-not-allowed
 *   500 — config-missing (server misconfiguration)
 *   502 — http-error (Ollama returned non-2xx) or unreachable (network)
 *   504 — timeout
 *
 * CORS: same permissive policy as /api/improve-prompt (read-only).
 */

export const config = {
  runtime: 'nodejs20.x',
  maxDuration: 30,
};

const OLLAMA_BASE_URL = (process.env.OLLAMA_BASE_URL ?? '').trim();
const DIAGNOSE_TIMEOUT_MS = 5_000;

type HealthStatus =
  | 'reachable'
  | 'timeout'
  | 'http-error'
  | 'unreachable'
  | 'config-missing'
  | 'method-not-allowed';

function log(
  level: 'info' | 'warn' | 'error',
  event: string,
  fields: Record<string, unknown>,
) {
  const ts = new Date().toISOString();
  const safe = { ts, level, event, ...fields };
  const line = JSON.stringify(safe);
  if (level === 'error') console.error(line);
  else if (level === 'warn') console.warn(line);
  else console.log(line);
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
} as const;

function jsonResponse(
  body: unknown,
  status: number,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

function failureBody(
  status: HealthStatus,
  upstreamHttpStatus: number | null,
  error: string,
): { success: false; status: HealthStatus; upstreamHttpStatus: number | null; error: string } {
  return {
    success: false,
    status,
    upstreamHttpStatus,
    error,
  };
}

export default async function handler(request: Request): Promise<Response> {
  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (request.method !== 'GET') {
    log('warn', 'method_not_allowed', { method: request.method });
    return jsonResponse(
      failureBody('method-not-allowed', null, 'Método no permitido. Esta ruta solo acepta GET.'),
      405,
    );
  }

  if (!OLLAMA_BASE_URL) {
    log('error', 'config_missing', { env: 'OLLAMA_BASE_URL' });
    return jsonResponse(
      failureBody(
        'config-missing',
        null,
        'OLLAMA_BASE_URL no está definida en el servidor. Configúrala en las variables de entorno del proyecto Vercel.',
      ),
      500,
    );
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DIAGNOSE_TIMEOUT_MS);

  try {
    const upstream = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
      method: 'GET',
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (upstream.ok) {
      const data = await upstream.json().catch(() => null);
      const models = Array.isArray(data?.models)
        ? (data.models as Array<{ name?: string } | string>)
            .map((m) => (typeof m === 'string' ? m : m?.name ?? '?'))
            .filter(Boolean)
        : [];
      log('info', 'health_reachable', { modelCount: models.length });
      return jsonResponse(
        { success: true, status: 'reachable', models },
        200,
      );
    }

    // Upstream non-2xx — report the status code but do not echo the body
    // (those can leak daemon details the browser doesn't need).
    log('warn', 'health_http_error', { upstreamHttpStatus: upstream.status });
    return jsonResponse(
      failureBody(
        'http-error',
        upstream.status,
        `El upstream devolvió ${upstream.status} ${upstream.statusText}`.trim(),
      ),
      502,
    );
  } catch (err: unknown) {
    clearTimeout(timer);
    if ((err as { name?: string } | null)?.name === 'AbortError') {
      log('warn', 'health_timeout', { timeoutMs: DIAGNOSE_TIMEOUT_MS });
      return jsonResponse(
        failureBody(
          'timeout',
          null,
          `El upstream tardó demasiado (timeout tras ${DIAGNOSE_TIMEOUT_MS}ms).`,
        ),
        504,
      );
    }
    const msg = err instanceof Error ? err.message : String(err);
    log('error', 'health_unreachable', { detail: msg });
    return jsonResponse(
      failureBody(
        'unreachable',
        null,
        `No se pudo contactar con el upstream: ${msg.slice(0, 500)}`,
      ),
      502,
    );
  }
}
