<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# System Thinking

A no-fluff, opinionated reference for translating vague product asks into
structured, professional UX/UI and frontend prompts. The "Prompt Lab"
turns rough user input into optimized directives for AI coding assistants
(Claude, GPT, Cursor, Windsurf, Lovable, Bolt, …).

The AI runs against any Ollama-compatible endpoint you point it at —
tunnel or hosted. No external API keys, no rate limits, no
telemetry-leaky SDK calls.

## How the AI is wired

The browser calls `${VITE_OLLAMA_BASE_URL}/api/generate` directly. There is
**no Vite dev proxy** — proxy-based approaches never applied in AI-agent
preview sandboxes (which serve the static `vite build` output) and would
have been silently ignored. Direct fetch is the simplest correct
production architecture.

`VITE_OLLAMA_BASE_URL` is **REQUIRED**. There is no implicit host-private
fallback by design — this app is deployed on Vercel and the frontend
must never attempt to dial a loopback address on its own. If the env
var is missing, calls throw a clear configuration error and the UI
shows a dedicated "Configuración del modelo local" banner instead of
attempting any network call.

Two additional requirements for a deploy-preview context:

1. **The Ollama URL must be reachable from the page's network.** The
   page's origin cannot dial a host-private endpoint. Point
   `VITE_OLLAMA_BASE_URL` at a tunnel (Cloudflare Tunnel, ngrok) or a
   hosted Ollama over HTTPS.
2. **Ollama's `OLLAMA_ORIGINS` must allow the page's origin.** Otherwise
   the browser blocks the cross-origin request at preflight. Set
   `OLLAMA_ORIGINS=https://<preview-host>` (or `*`) on the Ollama daemon.

HTTPS pages cannot reach HTTP Ollama endpoints (Mixed Content). Always
use HTTPS in front of the Ollama daemon for any hosted/Ollama-Cloud /
deploy-preview context.

## Prerequisites

- **Node.js 20+**
- An **Ollama-compatible endpoint** the deployed page can reach
  (HTTPS). Either expose your local Ollama via a tunnel, or run a hosted
  Ollama instance over HTTPS.

## Run Locally — config a tunnel, then point the app at it

This app has **no implicit fallback**. To run against a local Ollama
daemon you must expose it via a tunnel. Cloudflare Tunnel is the
simplest:

1. **Pull a model:**
   ```bash
   ollama serve                                # if it isn't already running
   ollama pull llama3                          # or qwen3, deepseek-r1, qwen2.5-coder, mistral, …
   ```
   Good defaults for prompt-engineering:
   - `llama3` / `llama3.2` — general, fast
   - `qwen3` / `qwen2.5-coder` — strong on structured JSON output
   - `mistral` / `mistral-nemo` — solid multilingual (good for Spanish output)
   - `deepseek-r1` — strong reasoning, but emits `<think>` blocks (the app
     already strips them; expect slower responses)

2. **Expose the daemon** over HTTPS — the cloudflared CLI takes a URL
   pointing at your machine's daemon port (this is a user-side tool
   invocation, not a frontend fallback):
   ```bash
   cloudflared tunnel --url http://127.0.0.1:11434
   ```
   Copy the printed `https://…trycloudflare.com` URL.

3. **Install JS dependencies:**
   ```bash
   npm install
   ```

4. **Configure the app.** Copy `.env.example` to `.env.local` and set
   `VITE_OLLAMA_BASE_URL` to the tunnel URL (the model and timeout are
   optional):
   ```env
   VITE_OLLAMA_BASE_URL=https://your-tunnel.trycloudflare.com
   VITE_OLLAMA_MODEL=llama3
   VITE_OLLAMA_TIMEOUT_MS=120000
   ```
   `VITE_OLLAMA_BASE_URL` is **REQUIRED** — there is no default.

5. **Allow your tunnel's origin on Ollama** so preflight succeeds:
   ```bash
   OLLAMA_ORIGINS="*" ollama serve                # permissive
   # or, in production:
   OLLAMA_ORIGINS="https://your-tunnel.trycloudflare.com" ollama serve
   ```

6. **Run the dev server:**
   ```bash
   npm run dev
   ```
   Open the printed URL, go to **Prompt Lab**, write any rough prompt
   and hit **Traducir a Sistema**. The optimized directive is generated
   from your input — never from a hardcoded template.

## Run from an AI-agent preview

The deploy step is the same as the local-dev step — `VITE_OLLAMA_BASE_URL`
must point at an HTTPS Ollama endpoint the deployed browser can reach.

1. **Expose your Ollama** over HTTPS (Cloudflare Tunnel, ngrok, or any
   HTTPS proxy):
   ```bash
   cloudflared tunnel --url http://127.0.0.1:11434
   ```

2. **Set `VITE_OLLAMA_BASE_URL`** in your build environment / Vercel
   project variables to that URL.

3. **Allow the preview's origin on Ollama**:
   ```bash
   OLLAMA_ORIGINS="https://ai.studio" ollama serve   # adjust host as needed
   ```

If you skip any of these, the UI will show a precise error explaining
which is missing — see "Troubleshooting" below.

## How the AI behaves

The system enforces a tight role:

- The model acts **exclusively** as a prompt-engineering specialist.
- It must **not** answer general knowledge questions, chat, or do
  anything unrelated to improving the user's prompt.
- Output is a single JSON object: `{"optimizedPrompt": "…"}`.
- The optimized prompt is in Spanish (the app's UI language) with standard
  technical terms (flexbox, grid, hover, breakpoints, …) kept in English.
- It is organized into logical sections: **Objetivo**, **Layout & Grid**,
  **Typography & Spacing**, **Interaction & States**, **Accessibility
  (WCAG)**, **Constraints & Assumptions**, **Expected Behavior**,
  **Edge Cases**, **Desired Output**.

If the model fails to produce a parseable response, you'll see a clear
error explaining what to check (daemon running? model pulled? timeout
too short?) — never a hardcoded fallback that would silently ignore your
input.

The textarea starts **empty** on first load, and the AI only executes
the user's prompt after they have entered text and clicked
**Traducir a Sistema** — no preloaded samples, no automatic prompt sends.

> **Note on prompt-injection.** Your input is sent verbatim to the model.
> Although the system prompt is fixed and separated from the user message,
> any local LLM can be steered in unexpected directions by adversarial
> inputs. Treat the output as a draft, not ground truth.

## Production build

```bash
npm run build
```

The static bundle can be deployed to any static host. Configure
`VITE_OLLAMA_BASE_URL` (REQUIRED) in the build environment / host's
project variables before deploying.

## Troubleshooting

| Symptom                                                                                                | Cause / Fix                                                                                |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `Configuración requerida: VITE_OLLAMA_BASE_URL no está definida`                                       | Set `VITE_OLLAMA_BASE_URL` in `.env.local` (dev) or your host's environment variables.     |
| `Network error: could not reach Ollama … (1) CORS blocked`                                            | Set `OLLAMA_ORIGINS` on the Ollama daemon to allow the page's origin (or `*`).              |
| `… (2) \`ollama serve\` is not running`                                                                | Start the daemon.                                                                          |
| `… (3) the page's network can't reach the configured endpoint`                                       | The URL is host-private — reachable only from your machine. Use a tunnel or hosted Ollama pointing at an HTTPS URL the deploy origin can resolve. |
| `… (4) the page is HTTPS but the Ollama URL is HTTP (Mixed Content)`                                  | Tunnel / hosted endpoint must be HTTPS, not HTTP.                                          |
| `Ollama returned 404 … the model "X" is not pulled`                                                    | `ollama pull X`.                                                                           |
| `Ollama returned 405 … something between your browser and Ollama rejected POST`                       | Try `curl -X POST $VITE_OLLAMA_BASE_URL/api/generate` to isolate which layer rejected it. |
| `Ollama request timed out after 120000ms`                                                              | Raise `VITE_OLLAMA_TIMEOUT_MS` (cold-model loads can be slow).                             |

## Project layout

```
src/components/       UI primitives and visual examples
src/data/             Dictionary data (UX/UI glossary)
src/lib/ai-service.ts Browser-to-Ollama client, ConfigError class, strict system prompt
src/lib/utils.ts      cn() helper (clsx + tailwind-merge)
src/pages/            Top-level pages (PromptLab, Dictionary, …)
```
