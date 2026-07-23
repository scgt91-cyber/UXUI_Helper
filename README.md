<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# System Thinking

A no-fluff, opinionated reference for translating vague product asks into
structured, professional UX/UI and frontend prompts. The "Prompt Lab"
turns rough user input into optimized directives for AI coding assistants
(Claude, GPT, Cursor, Windsurf, Lovable, Bolt, …).

The AI runs against any Ollama-compatible endpoint controlled by the
operator. The browser never learns the upstream URL — every request is
routed through a Vercel Serverless Function.

## Architecture

```
                 ┌────────────────────────┐
 Browser         │   Vercel Frontend     │
   │  POST       │   (static SPA,       │       POST
   ├─────────────►    Vite build)       ├──────────────►
   │ /api/        │                        │  /api/improve-prompt
   │ improve-     │                        │       │
   │  prompt      │                        │       │ read OLLAMA_BASE_URL
                 │                        │       │ (server-side env)
                 │                        │       ▼
                 │                        │   ┌─────────────────┐
                 │                        │   │  Ollama daemon  │
                 │   ◄──── Response ──────┤   │   (llama3 …)    │
                 │                        │   └─────────────────┘
                 └────────────────────────┘
```

The browser talks to **two same-origin `/api/*` endpoints only**:

- `POST /api/improve-prompt` — translate the user's prompt.
- `GET  /api/health` — server-side Ollama reachability probe (the browser
  never sees the Ollama URL, only the abstract status).

The frontend is intentionally dumb: it surfaces loading state, renders the
backend's user-facing error copy, and never lets the user paste a
hardcoded sample into the field. The AI itself only fires after the user
enters text and clicks **Traducir a Sistema**.

The serverless function in `/api/improve-prompt.ts` is the only place
where:

- the Ollama URL (`OLLAMA_BASE_URL` env var) is read,
- the system prompt enforcing the "Prompt Engineering only" persona lives,
- upstream HTTP status codes are mapped to a clean `{ success, error }`
  envelope,
- server-side metadata (timestamp, status, model, char-length) is logged
  — never the user's prompt content itself.

## How the AI behaves

The system enforces a tight role inside `api/improve-prompt.ts`:

- The browser sends the user's prompt verbatim to `/api/improve-prompt`.
- The function appends a strict system-prompt persona and forwards an
  Ollama `/api/generate` request with `format: "json"`,
  `temperature: 0.2`, `num_predict: 1024`.
- The model's persona is *exclusively* prompt engineering. The system
  prompt refuses general-knowledge questions, refuses chit-chat, and
  refuses anything outside prompt improvement.
- Output is a single JSON object containing a single field
  `optimizedPrompt`. The function extracts it (handling stray
  `<think>…</think>` blocks, markdown fences, etc.) before responding.
- The optimized prompt is in Spanish (the app's UI language) with
  standard technical terms (flexbox, grid, hover, breakpoints, …) kept
  in English, organized into: **Objetivo** · **Layout & Grid** ·
  **Typography & Spacing** · **Interaction & States** · **Accessibility
  (WCAG)** · **Constraints & Assumptions** · **Expected Behavior** ·
  **Edge Cases** · **Desired Output**.

If the model fails to produce a parseable response, the user sees a clean
error banner explaining what to check (daemon running? model pulled?
timeout too short?) — never a hardcoded fallback that would silently
ignore the user's input.

## API contract

`POST /api/improve-prompt`

Request body:

```json
{ "prompt": "<the user's raw prompt>" }
```

| HTTP status | Body                              | Meaning                                 |
| ----------- | --------------------------------- | --------------------------------------- |
| 200         | `{ "success": true, "prompt": … }` | Success.                                |
| 400         | `{ "success": false, "error": … }` | Empty / non-string / oversized prompt.  |
| 405         | `{ "success": false, "error": … }` | Wrong HTTP method (non-POST).           |
| 500         | `{ "success": false, "error": … }` | Missing `OLLAMA_BASE_URL` or crash.      |
| 502         | `{ "success": false, "error": … }` | Upstream Ollama returned non-2xx.       |
| 504         | `{ "success": false, "error": … }` | Upstream timed out (`OLLAMA_TIMEOUT_MS`).|

The `error` field is the user-facing copy the frontend renders.

`GET /api/health`

Always returns HTTP 200 with a JSON shape:

- Healthy: `{ "ok": true, "models": ["llama3", "qwen3", …] }`
- Unhealthy: `{ "ok": false, "status": "timeout"|"http-error"|"unreachable"|"config-missing", "upstreamHttpStatus": <number|null>, "detail": "<sanitized>" }`

Critical detail: **the Ollama URL is never echoed in the response**. The
diagnostic panel in the page shows the browser origin and the backend
route — never the upstream URL.

## Prerequisites

- **Node.js 20+**
- A **publicly reachable Ollama-compatible endpoint** with HTTPS.
  Either expose your local Ollama via a tunnel (Cloudflare Tunnel,
  ngrok, …) or run a hosted Ollama instance over HTTPS.
- **A Vercel account** for production deploys. (Set the env vars in
  Vercel project settings.)
- `npm install`

## Local development — `vercel dev`

The recommended local workflow is `vercel dev`. It serves the Vite-built
SPA and the `/api/*` serverless functions on the same origin so the
frontend's same-origin `/api` calls work without extra config.

```bash
# 1. Install the Vercel CLI if you don't have it
npm i -g vercel

# 2. Pull or set the env vars the function reads (OLLAMA_BASE_URL, etc.)
#    easiest: set them in a local .env.local at the project root.
#    the function reads them at runtime — they are NOT bundled.

# 3. Run the dev server
vercel dev

# 4. Open the printed URL (http://localhost:3000 by default), navigate
#    to "Prompt Lab", write any rough prompt, click "Traducir a Sistema".
```

Alternatively, with plain `vite dev`, the client bundle works but the
`/api/*` calls fail unless you also set `VITE_API_BASE_URL` to point at a
deployed preview backend.

## Production build & deploy

```bash
npm run build         # tsc + vite build
vercel deploy --prod   # or use the Vercel dashboard / GitHub integration
```

### Vercel project environment variables

Set these in **Vercel → Project → Settings → Environment Variables**.
Tick "Production" (and optionally "Preview"). They are read by the
serverless function at runtime; **none** of them are bundled into the
client.

| Variable              | Required | Default | Purpose                                                         |
| --------------------- | -------- | ------- | --------------------------------------------------------------- |
| `OLLAMA_BASE_URL`     | **Yes**  | —       | HTTPS URL the function can reach. Tunnel or hosted Ollama.       |
| `OLLAMA_MODEL`        | No       | `llama3`| Model name (also try `qwen3`, `deepseek-r1`, `qwen2.5-coder` …).|
| `OLLAMA_TIMEOUT_MS`   | No       | `120000`| Per-request timeout against Ollama (min 1000).                  |

The browser reads `VITE_API_BASE_URL` only when a developer overrides
it for cross-origin local development. In production and `vercel dev`,
the frontend dials same-origin and ignores the override.

## Tunneling your local Ollama

If your Ollama daemon runs on your own machine, expose it via a tunnel:

```bash
# Cloudflare Tunnel — simplest
cloudflared tunnel --url http://127.0.0.1:11434
# It prints an https://…trycloudflare.com URL. Set OLLAMA_BASE_URL
# (the SERVER-SIDE env, in Vercel) to that URL.

# Or with ngrok
ngrok http 11434
# Use the printed https://… URL.

# Allow the tunnel's origin on the Ollama daemon so its /api/generate
# doesn't refuse the cross-origin request:
OLLAMA_ORIGINS="*" ollama serve
```

Both endpoints must be reachable from the Vercel function runtime, NOT
from your browser. The browser only sees `https://<your-vercel-app>.vercel.app`
when the SPA loads — public-internet traffic is what the function makes
to Ollama.

## How the model knows when to retry

There is **no automatic retry in the client**. If a request hits 502
(daemon refused) or 504 (timeout), the user sees a banner explaining the
likely cause. They retry by clicking **Traducir a Sistema** again.

This is intentional: AI generation can take 30–60s on cold-model loads,
and silent auto-retries tend to feel like the app froze. Fail-fast is
better UX than hidden reattempts.

## Troubleshooting

| Symptom                                                                      | Cause / Fix                                                                                            |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `Input inválido` (HTTP 400)                                                  | Frontend validation or backend validation. Check the banner copy.                                      |
| `Modelo no disponible` (HTTP 502)                                           | Backend can't reach Ollama. Verify `OLLAMA_BASE_URL` in Vercel envs is reachable from the function.    |
| `Tiempo de espera agotado` (HTTP 504)                                        | Cold-model load. Raise `OLLAMA_TIMEOUT_MS` (must be ≤ function `maxDuration` 60s) or warm up.          |
| `Error del servidor` (HTTP 500)                                              | Server-side crash or missing env. Check the Vercel function logs for `unhandled_exception` / `config_missing`. |
| `Sin conexión con el servidor` (HTTP 0 / fetch failure)                      | `vercel dev` not running, or the deploy has no `/api/improve-prompt` function yet.                     |
| Healthy health-probe + `Modelo no disponible` on translate                    | The probe used `OLLAMA_BASE_URL` correctly but the actual model name or 405/404 differs. Check upstream model name and `OLLAMA_MODEL`. |

## Project layout

```
api/
  improve-prompt.ts        POST handler — server-side Ollama proxy + system prompt
  health.ts                GET handler — server-side /api/tags probe (no URL leak)
src/
  components/              UI primitives and visual examples
  data/                    Dictionary data (UX/UI glossary)
  lib/ai-service.ts        Browser client for /api/improve-prompt + /api/health
  lib/utils.ts             cn() helper (clsx + tailwind-merge)
  pages/                   Top-level pages (PromptLab, Dictionary, …)
vercel.json                SPA rewrites with a /api/* exclude (regex negative-lookahead)
vite.config.ts             Build fingerprint (commit SHA + ISO date) injected as `define`
```
