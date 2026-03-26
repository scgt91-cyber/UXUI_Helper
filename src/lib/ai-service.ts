// Removido GoogleGenAI de aquí ya que ahora usamos la versión de Vercel /api

export async function generateOptimizedPrompt(input: string): Promise<{ optimizedPrompt: string; explanation: string }> {
  // ============================================================================
  // 🚀 INSTRUCCIONES PARA VERCEL (DESPLIEGUE SEGURO)
  // ============================================================================
  // Cuando descargues este código y lo subas a Vercel:
  // 1. COMENTA el bloque "VERSIÓN LOCAL" que hay más abajo.
  // 2. DESCOMENTA este bloque "VERSIÓN VERCEL".
  // Esto hará que React llame a la carpeta /api de Vercel en lugar de exponer tu API Key.


  try {
    const response = await fetch('/api/optimize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });

    if (!response.ok) {
      throw new Error(`Error de la API: ${response.statusText}`);
    }

    return await response.json() as { optimizedPrompt: string; explanation: string };
  } catch (error: any) {
    console.error("Vercel API Service Error:", error);
    return getFallbackResponse();
  }
}

// ============================================================================


// ============================================================================
// 💻 VERSIÓN LOCAL / AI STUDIO (Insegura para producción pública)
// ============================================================================

/*
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }

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
  
  return JSON.parse(text) as { optimizedPrompt: string; explanation: string };
} catch (error) {
  console.error("AI Service Error:", error);
  return getFallbackResponse();
}
*/


function getFallbackResponse(): { optimizedPrompt: string; explanation: string } {
  return {
    optimizedPrompt: `Objetivo: Diseñar una interfaz e-commerce mobile-first para calzado.

Layout & Grid:
- Implementar un sistema de grid responsivo de 12 columnas.
- Utilizar un sistema de espaciado de 8pt para mantener un ritmo y padding consistentes.
- Asegurar un ancho máximo de contenido (max-w-7xl) para viewports ultra-anchos.

Typography & Hierarchy:
- Establecer una escala tipográfica estricta usando una tipografía sans-serif (ej. Inter).
- Usar font-weight y tamaño para crear una visual hierarchy clara entre títulos de productos, precios y metadatos secundarios.

Interaction & Affordances:
- Diseñar botones Call-to-Action (CTA) principales con alto contraste y affordances claros.
- Definir estados hover, active y disabled para todos los elementos interactivos.
- Minimizar el cognitive load agrupando información relacionada (ej. selección de talla y add-to-cart).

Accessibility (WCAG):
- Asegurar ratios de contraste de color mínimos (4.5:1) para el texto.
- Mantener un touch target size mínimo de 44x44pt para interacciones móviles.`,
    explanation: "Se han traducido términos subjetivos como 'bonita' en requisitos estructurales objetivos (grid, espaciado, tipografía). Se añadieron restricciones de accesibilidad y estados de interacción para asegurar un sistema de diseño robusto y listo para producción."
  };
}