const ALLOWED_ORIGIN = "https://uxui-ai-helper.vercel.app";

export default async function handler(req: any, res: any) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

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
      return res.status(500).json({
        success: false,
        error: "OPENROUTER_API_KEY missing",
      });
    }

    const systemPrompt = `
You are PromptForge.

You are NOT a chatbot.

Your only purpose is to transform simple software-development prompts into professional prompts.

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
          model: "qwen/qwen3-30b-a3b:free",
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
      console.error(data);

      return res.status(response.status).json({
        success: false,
        error: data.error?.message || "OpenRouter request failed",
      });
    }

    const improvedPrompt =
      data.choices?.[0]?.message?.content ?? "No response.";

    return res.status(200).json({
      success: true,
      prompt: improvedPrompt,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
