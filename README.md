<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# System Thinking

A no-fluff, opinionated reference for translating vague product asks into
structured, professional UX/UI and frontend prompts. The "Prompt Lab"
turns rough user input into optimized directives for AI coding assistants
(Claude, GPT, Cursor, Windsurf, Lovable, Bolt, …).

The local AI runs entirely on your machine — or on a public Ollama
instance you control. No external API keys, no rate limits, no
telemetry-leaky SDK calls.

## How the AI is wired

The browser calls `${VITE_OLLAMA_BASE_URL}/api/generate` directly. There is
**no Vite dev proxy** — proxy-based approaches never applied in AI-agent
preview sandboxes (which serve the static `vite build` output) and would
have been silently ignored. Direct fetch is the simplest correct
architecture.

Two environment requirements to make this work in a non-localhost setup:

1. **The Ollama URL must be reachable from the page's network.** A sandbox
   can't dial your `127.0.0.1` directly. Use a tunnel (Cloudflare
   Tunnel, ngrok) or a hosted Ollama over HTTPS.
2. **Ollama's `OLLAMA_ORIGINS` must allow the page's origin.** Otherwise
   the browser blocks the cross-origin request at preflight. Set
   `OLLAMA_ORIGINS=https://<preview-host>` (or `*`) on the Ollama daemon.

HTTPS pages cannot reach HTTP Ollama endpoints (Mixed Content). Always
use HTTPS in front of the preview.

## Prerequisites

- **Node.js 20+**
- **[Ollama](https://ollama.com/download)** installed and running
  (`ollama serve` if it doesn't auto-start).

## Run Locally (the easy path)

1. **Pull a model:**
   ```bash
   ollama serve               # if it isn't already running
   ollama pull llama3         # or qwen3, deepseek-r1, qwen2.5-coder, mistral, …
   ```
   Good defaults for prompt-engineering:
   - `llama3` / `llama3.2` — general, fast
   - `qwen3` / `qwen2.5-coder` — strong on structured JSON output
   - `mistral` / `mistral-nemo` — solid multilingual (good for Spanish output)
   - `deepseek-r1` — strong reasoning, but emits `<think>` blocks (the app
     already strips them; expect slower responses)

2. **Install JS dependencies:**
   ```bash
   npm install
   ```

3. **Configure the model.** Copy `.env.example` to `.env.local` and edit
   `VITE_OLLAMA_MODEL` if you want a different model. The default URL
   `http://127.0.0.1:11434` works for local dev — Ollama's default
   `OLLAMA_ORIGINS` allows `localhost` origins.
   ```env
   VITE_OLLAMA_BASE_URL=http://127.0.0.1:11434
   VITE_OLLAMA_MODEL=llama3
   ```

4. **Run the dev server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000`, go to **Prompt Lab**, write any rough
   prompt and hit **Traducir a Sistema**. The optimized directive is
   generated entirely on your machine — every result is dynamic per
   input, never a hardcoded template.

## Run from an AI-agent preview

To make "Traducir a Sistema" work in a preview sandbox:

1. **Expose your local Ollama.** Cloudflare Tunnel is the simplest:
   ```bash
   cloudflared tunnel --url http://127.0.0.1:11434
   ```
   It prints a public `https://…trycloudflare.com` URL. Copy that.

2. **Set `VITE_OLLAMA_BASE_URL` to it** in your `.env.local`.

3. **Allow the preview's origin on Ollama** (anywhere Ollama runs):
   ```bash
   OLLAMA_ORIGINS="https://ai.studio" ollama serve     # adjust host as needed
   # or, permissively:
   OLLAMA_ORIGINS="*" ollama serve
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

> **Note on prompt-injection.** Your input is sent verbatim to the model.
> Although the system prompt is fixed and separated from the user message,
> any local LLM can be steered in unexpected directions by adversarial
> inputs. Treat the output as a draft, not ground truth.

## Production build

```bash
npm run build
npm run preview
```

The static bundle can be deployed to any static host, but you still need
a publicly reachable Ollama daemon (see above) for the feature to work.

## Troubleshooting

| Symptom                                                                                                 | Cause / Fix                                                                                              |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `Network error: could not reach Ollama … (1) \`ollama serve\` is not running`                            | Start the daemon.                                                                                        |
| `… (2) CORS blocked — set \`OLLAMA_ORIGINS\`…`                                                          | Set `OLLAMA_ORIGINS` to your page's origin (or `*`) and restart `ollama serve`.                          |
| `… (3) the page is HTTPS but the Ollama URL is HTTP (Mixed Content)`                                   | Use HTTPS in front of Ollama — Cloudflare Tunnel, hosted Ollama, etc.                                    |
| `… (4) this network can't reach the Ollama URL`                                                        | AI-agent preview sandbox can't dial your localhost. Use a tunnel or hosted Ollama.                      |
| `Ollama returned 404 … the model "X" is not pulled`                                                     | `ollama pull X`.                                                                                         |
| `Ollama returned 405 … Ollama rejected the method`                                                     | Something is rewriting the request method. Check for transparent proxies between your browser and Ollama. |
| `Ollama request timed out after 120000ms`                                                                | Raise `VITE_OLLAMA_TIMEOUT_MS` (cold-model loads can be slow).                                           |

## Project layout

```
api/                  (deprecated — removed; build directly with Vite)
src/components/       UI primitives and visual examples
src/data/             Dictionary data (UX/UI glossary)
src/lib/ai-service.ts Direct browser-to-Ollama client + strict system prompt
src/lib/utils.ts      cn() helper (clsx + tailwind-merge)
src/pages/            Top-level pages
```
