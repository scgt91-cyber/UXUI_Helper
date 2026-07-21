<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# System Thinking

A no-fluff, opinionated reference for translating vague product asks into
structured, professional UX/UI and frontend prompts. The "Prompt Lab"
turns rough user input into optimized directives for AI coding assistants
(Claude, GPT, Cursor, Windsurf, Lovable, Bolt, …).

The local AI runs entirely on your machine via [Ollama](https://ollama.com/).
No external API keys, no rate limits, no telemetry-leaky SDK calls.

## Prerequisites

- **Node.js 20+**
- **[Ollama](https://ollama.com/download)** installed and running
  (`ollama serve` if you don't have it auto-starting).

## Run Locally

1. **Pull a model.** Pick any supported Ollama model and pull it:
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
   `VITE_OLLAMA_MODEL` to the name you pulled. Other vars are optional —
   `VITE_OLLAMA_BASE_URL` defaults to `http://127.0.0.1:11434`, and
   `VITE_OLLAMA_TIMEOUT_MS` defaults to 120000 (2 minutes; raise it for
   first-call cold-start of large models).
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

## How the AI behaves

The system enforces a tight role:

- The model acts **exclusively** as a prompt-engineering specialist.
- It must **not** answer general knowledge questions, chat, or do anything
  unrelated to improving the user's prompt.
- Output is a single JSON object: `{"optimizedPrompt": "…"}`.
- The optimized prompt is in Spanish (the app's UI language) with standard
  technical terms (flexbox, grid, hover, breakpoints, …) kept in English.
- It is organized into logical sections: **Objetivo**, **Layout & Grid**,
  **Typography & Spacing**, **Interaction & States**, **Accessibility
  (WCAG)**, **Constraints & Assumptions**, **Expected Behavior**,
  **Edge Cases**, **Desired Output**.

If the model fails to produce a parseable response, you'll see a clear
error explaining what to check (daemon running? model pulled? timeout too
short?) — never a hardcoded fallback that would silently ignore your input.

> **Note on prompt-injection.** Your input is sent verbatim to the local
> model. Although the system prompt is fixed and separated from the user
> message, any local LLM can be steered in unexpected directions by
> adversarial inputs. Treat the output as a draft, not ground truth.

## Production build

```bash
npm run build
npm run preview
```

> The app calls the Ollama daemon from the user's browser via the Vite
> dev proxy at `/__ollama` (rewritten to `http://127.0.0.1:11434`).
> The `/_` prefix is deliberate — many cloud preview / AI-agent
> containers reserve `/api/*` and 405 anything they don't explicitly
> route, so we use a non-reserved namespace.
>
> Cross-origin previews: send `Content-Type: text/plain` so the
> browser treats the call as a CORS-simple request (no preflight)
> regardless of origin. The proxy also adds permissive CORS response
> headers.

## Project layout

```
api/                  (deprecated — removed; build directly with Vite)
src/components/       UI primitives and visual examples
src/data/             Dictionary data (UX/UI glossary)
src/lib/ai-service.ts Local Ollama client + strict system prompt
src/lib/utils.ts      cn() helper (clsx + tailwind-merge)
src/pages/            Top-level pages
```
