import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { generateOptimizedPrompt } from '@/lib/ai-service';

export function PromptLabPage() {
  const [input, setInput] = useState('hazme una app bonita para vender zapatos');
  const [output, setOutput] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOptimize = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    try {
      const result = await generateOptimizedPrompt(input);
      setOutput(result.optimizedPrompt);
      setExplanation(result.explanation);
    } catch (error) {
      console.error(error);
      setOutput('Error procesando la solicitud. Asegúrate de que la API key esté configurada.');
      setExplanation('Fallo del sistema durante la traducción semántica.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500 pb-20">
      <div className="mb-12 border-b-4 border-v-ink pb-8 px-4 md:px-8 pt-8">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none mb-6">
          Prompt Lab
        </h1>
        <p className="text-xl md:text-2xl font-medium max-w-3xl">
          Traduce peticiones genéricas en directivas estructuradas y profesionales de UX/UI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 border-y-2 md:border-2 border-v-ink min-h-[600px] bg-white mx-0 md:mx-8">
        {/* Input Section */}
        <div className="flex flex-col border-b-2 lg:border-b-0 lg:border-r-2 border-v-ink bg-v-yellow/10">
          <div className="p-6 border-b-2 border-v-ink flex items-center justify-between bg-v-yellow">
            <h2 className="text-xl font-bold uppercase tracking-widest text-v-ink">1. Input Genérico</h2>
          </div>
          <div className="flex-1 p-6 flex flex-col">
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ej., hazme una app bonita..."
              className="flex-1 resize-none text-2xl font-medium p-0 border-0 bg-transparent focus:ring-0 outline-none placeholder:text-v-ink/30"
            />
          </div>
          <button 
            onClick={handleOptimize} 
            disabled={isLoading || !input.trim()}
            className="w-full py-6 text-xl font-bold uppercase tracking-widest bg-v-ink hover:bg-v-blue text-white transition-colors flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed border-t-2 border-v-ink"
          >
            {isLoading ? 'Procesando...' : 'Traducir a Sistema'}
            {!isLoading && <ArrowRight className="w-6 h-6" />}
          </button>
        </div>

        {/* Output Section */}
        <div className="flex flex-col bg-v-blue/5">
          <div className="p-6 border-b-2 border-v-ink flex items-center justify-between bg-v-blue text-white">
            <h2 className="text-xl font-bold uppercase tracking-widest">2. Directiva Estructurada</h2>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto">
            {output ? (
              <div className="prose prose-lg max-w-none">
                <pre className="whitespace-pre-wrap font-mono text-base leading-relaxed text-v-ink bg-transparent p-0 border-0">
                  {output}
                </pre>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-v-ink/40 text-xl font-medium italic">
                Esperando input para traducción...
              </div>
            )}
          </div>
        </div>
      </div>

      {explanation && (
        <div className="mt-12 border-y-2 md:border-2 border-v-ink p-8 bg-v-yellow/20 mx-0 md:mx-8">
          <h3 className="text-xl font-bold uppercase tracking-widest mb-4 flex items-center gap-3 text-v-ink">
            <Sparkles className="w-6 h-6 text-v-ink" />
            Análisis Estructural
          </h3>
          <p className="text-xl font-medium leading-relaxed text-v-ink">
            {explanation}
          </p>
        </div>
      )}
    </div>
  );
}
