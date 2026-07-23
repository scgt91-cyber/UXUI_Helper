const PRODUCTION_ORIGIN = "https://uxui-ai-helper.vercel.app";

/**
 * /api/improve-prompt
 *
 * Vercel Serverless Function (Node.js). Receives the user's prompt
 * from the browser, runs it through the PromptForge system prompt,
 * and returns the rewritten version. OpenRouter is dialed server-side
 * only — the API key never lives in the client bundle.
 *
 * CORS policy:
 *   The frontend is normally served from PRODUCTION_ORIGIN, so a
 *   same-origin POST does NOT trigger a preflight. But the same Vite
 *   bundle is also opened inside the Freebuff AI-agent preview
 *   (a different origin that does NOT host this function). When that
 *   preview issues a cross-origin POST, the browser will issue a
 *   preflight against this function. The preflight MUST succeed
 *   otherwise the actual POST never fires and the UI displays the
 *   generic "Server error / 405" message.
 *
 *   To make the preflight pass for any preview iframe that proxies
 *   through to this deployment, we echo the requesting Origin header
 *   back as Access-Control-Allow-Origin. The `Vary: Origin` header
 *   prevents cache pollution between origins.
 *
 *   This is safe for a stateless, unauthenticated, read-only text
 *   transformation: there is no cookie, no Authorization header from
 *   the client, no user-identifying state. The only risk is abuse as
 *   a free OpenRouter proxy, which is mitigated by Vercel's per-IP
 *   rate limits at the edge and by the absence of any credential.
 *
 * Status mapping:
 *   200 — success
 *   400 — empty / missing prompt (validation)
 *   405 — wrong HTTP method (so OPTIONS preflights get 200 not 405)
 *   500 — missing OPENROUTER_API_KEY, or upstream threw unexpectedly
 *   502 — OpenRouter returned a non-2xx (bad model, quota, etc.)
 */

export default async function handler(req: any, res: any) {
  // CORS — echo Origin so cross-origin callers (Freebuff preview,
  // devtools, ad-hoc curl-from-anywhere) pass preflight. Same-origin
  // POSTs do not send Origin, so the fallback to PRODUCTION_ORIGIN
  // keeps the explicit allowlist semantics intact. Both casing
  // variants of the header are checked because Node's lower-cases
  // header names but some proxies / edge layers do not.
  //
  // IMPORTANT: optional chaining for null safety, `||` (NOT `??`) for
  // the fallback so that an empty Origin header still resolves to
  // PRODUCTION_ORIGIN. `??` only falls back on null/undefined, but a
  // null/empty-string ACAO is rejected by browsers — `||` matches the
  // original `(... || PRODUCTION_ORIGIN)` semantics exactly.
  const requestOrigin =
    req?.headers?.origin || req?.headers?.Origin || PRODUCTION_ORIGIN;

  // NOTE: the canonical production origin is also hardcoded in
  // src/lib/ai-service.ts as the frontend default and as the
  // 'HTTP-Referer' header below for OpenRouter attribution. If
  // the project migrates to a custom domain, all three locations
  // must be updated in lockstep.
  res.setHeader("Access-Control-Allow-Origin", requestOrigin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );
  // Defensive: prevent any CDN or browser back/forward cache from
  // pinning a response keyed by URL alone — the CORS-Origin we echo
  // here differs per caller, so a cached response would leak the
  // wrong allowed-origin to a different caller. Cheap insurance.
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Pragma", "no-cache");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { prompt } = req.body || {};

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        error: "Prompt is required",
      });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      // Never log the key. Log only the missing-var name so an operator
      // can find the misconfiguration without exposing the secret.
      console.error("[improve-prompt] OPENROUTER_API_KEY is not set");
      return res.status(500).json({
        success: false,
        error: "Server misconfiguration: OPENROUTER_API_KEY is not set",
      });
    }

    const systemPrompt = `
You are PromptForge.

You are NOT a chatbot.

Your only purpose is to transform simple software-development prompts into professional prompts.

Output language:

The user-facing UI of this app is Spanish-only and the user's
working language is Spanish. The response renders directly into
a Spanish UI panel ("Directiva Estructurada"). The optimized
prompt must therefore be written in Spanish with the following
narrow exception for canonical English literals.

EVERY word MUST be Spanish, EXCEPT for the following categories
of canonical English LITERALS — which appear in source code in
English and have no idiomatic Spanish equivalent:
  - code identifiers (variable / function / type / class names),
  - package names ("bcrypt", "react", "lucide-react"),
  - CSS class fragments ("bg-v-yellow", "text-v-ink"),
  - file paths ("/api/improve-prompt"),
  - HTTP route or method names ("POST /users", "GET /api/tags").

NEVER begin a sentence in English. NEVER describe the user's
request in English. If you would write "Create a…", you must
write "Crea un/una…". If you would write "Use X to do Y", you
must write "Usa X para hacer Y".

Example — the user's input is "make a signup form with submit
button". BEGIN your output as:
  "Crea un formulario de registro con un botón de envío…"
NEVER begin your output as:
  "Create a signup form with…"

Expertise:

- UX/UI
- Product Design
- Frontend
- React
- TypeScript
- JavaScript
- Next.js
- Vite
- Tailwind CSS
- APIs
- AI-assisted development
- Figma
- Accessibility
- Performance
- Prompt Engineering

Rules:

- Never answer the user's question.
- Never explain.
- Never chat.
- Never add markdown.
- Never use code fences.
- Return ONLY the optimized prompt.
- Preserve the user's intent.
- Make it structured, detailed and production-ready.
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://uxui-ai-helper.vercel.app",
          "X-Title": "UXUI AI Helper",
        },
        body: JSON.stringify({
          model: "qwen/qwen3-30b-a3b",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.3,
          max_tokens: 1500,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      // Server-side log of upstream metadata only — never the prompt
      // body (it can carry proprietary technical intent). The
      // downstream user-facing copy lives in the JSON envelope.
      console.error(
        `[improve-prompt] OpenRouter non-2xx (status=${response.status})`
      );

      return res.status(502).json({
        success: false,
        error: data.error?.message || "OpenRouter request failed",
        upstreamHttpStatus: response.status,
      });
    }

    const improvedPrompt =
      data.choices?.[0]?.message?.content ?? "No response.";

    return res.status(200).json({
      success: true,
      prompt: improvedPrompt,
    });
  } catch (error) {
    console.error("[improve-prompt] unhandled error", error);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}

