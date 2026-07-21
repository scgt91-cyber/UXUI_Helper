/**
 * ai-service.ts
 *
 * Calls a local Ollama instance to optimize a user-supplied prompt into a
 * high-quality, structured prompt suitable for AI coding assistants.
 *
 * Configuration (via Vite env vars / .env):
 *   VITE_OLLAMA_BASE_URL  Ollama base URL. Defaults to http://localhost:11434.
 *   VITE_OLLAMA_MODEL     Model name (e.g. llama3, qwen3, deepseek-r1).
 *   VITE_OLLAMA_TIMEOUT_MS Per-request timeout in ms. Defaults to 120000.
 *
 * In dev, requests to /api/ollama/* are proxied to the local Ollama daemon
 * (see vite.config.ts), which removes CORS as a concern.
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

const OLLAMA_PROXY_PATH = '/api/ollama';

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
 * Calls the local Ollama daemon to optimize the prompt. Throws on failure so
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
    const response = await fetch(`${OLLAMA_PROXY_PATH}/api/generate`, {
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
      throw new OllamaError(
        `Ollama returned ${response.status}: ${detail.slice(0, 500)}. ` +
          `Is the model "${OLLAMA_MODEL}" pulled? Try \`ollama pull ${OLLAMA_MODEL}\`.`,
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
    throw new OllamaError(
      `Could not reach the local Ollama daemon at ${OLLAMA_PROXY_PATH}. ` +
        `Is \`ollama serve\` running on ${OLLAMA_BASE_URL}?`,
      err,
    );
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Pulls out the first JSON object from the model's output (in case the local
 * model wraps it in markdown fences, leaks reasoning tags like <think>, or
 * otherwise adds stray text) and reads the "optimizedPrompt" field. Returns
 * null if nothing usable is found.
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

  const match = cleaned.match(/\{[\s\S]*\}/);
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
