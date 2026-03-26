import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req: any, res: any) {
  // 1. Solo permitimos peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: 'Input is required' });
    }

    // 2. Obtenemos la API Key de las variables de entorno de Vercel
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured in Vercel Environment Variables' });
    }

    // 3. Inicializamos la IA (esto ocurre en el servidor de Vercel, de forma oculta)
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: `You are an expert UX/UI Architect and Frontend Engineer. 
      Translate the following generic user request into a highly professional, structured prompt intended for an AI code generator or design system.
      
      The output prompt MUST use professional UX/UI terminology (e.g., visual hierarchy, affordances, cognitive load, 8pt grid system, design tokens, WCAG accessibility, responsive breakpoints).
      It should be structured logically (e.g., Objetivo, Layout & Grid, Typography & Spacing, Interaction & States).
      
      Also provide a brief explanation of WHY these changes were made and what UX/UI principles were applied.
      CRITICAL: The 'optimizedPrompt' MUST be written in Spanish, but keep standard UX/UI and frontend technical terms in English (e.g., flexbox, grid, hover, affordance, breakpoints, CTA). The 'explanation' MUST also be in Spanish.
      
      User Request: "${input}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            optimizedPrompt: {
              type: Type.STRING,
              description: "The highly structured, professional UX/UI prompt in Spanish with English technical terms.",
            },
            explanation: {
              type: Type.STRING,
              description: "Explanation of the UX/UI principles applied during translation, in Spanish.",
            },
          },
          required: ["optimizedPrompt", "explanation"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    // 4. Devolvemos la respuesta al frontend
    return res.status(200).json(JSON.parse(text));

  } catch (error) {
    console.error("Vercel API Error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
