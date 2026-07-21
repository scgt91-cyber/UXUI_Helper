import React, { useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { generateOptimizedPrompt, OllamaError, OLLAMA_MODEL } from '@/lib/ai-service';

export function PromptLabPage() {
  const [input, setInput] = useState('hazme una app bonita para vender zapatos');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Increments on every handleOptimize call. Only the latest in-flight request
  // is allowed to mutate UI state, so out-of-order resolutions from rapid
  // clicks cannot visually overwrite the most recent request.
  const requestIdRef = useRef(0);

  const handleOptimize = async () => {
    if (!input.trim()) return;
    const myId = ++requestIdRef.current;

    setIsLoading(true);
    setOutput('');
    setError('');

    try {
      const result = await generateOptimizedPrompt(input);
      if (myId !== requestIdRef.current) return;
      setOutput(result.optimizedPrompt);
      setError('');
    } catch (err) {
      if (myId !== requestIdRef.current) return;
      const message =
        err instanceof OllamaError
          ? err.message
          : err instanceof Error
            ? err.message
            : 'Error inesperado al procesar la solicitud.';
      setError(message);
      setOutput('');
    } finally {
      if (myId === requestIdRef.current) {
        setIsLoading(false);
      }
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
        <p className="text-xs uppercase tracking-widest text-v-ink/50 mt-3">
          Modelo local activo:{' '}
          <span className="font-bold text-v-ink">{OLLAMA_MODEL}</span>
          <span className="ml-2 text-v-ink/40">(cambiable vía VITE_OLLAMA_MODEL)</span>
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
            {error ? (
              <div className="border-2 border-v-red bg-v-red/10 p-4 text-v-ink">
                <p className="text-sm font-bold uppercase tracking-widest mb-2">
                  Error del modelo local
                </p>
                <p className="text-base leading-relaxed whitespace-pre-wrap">{error}</p>
                <p className="text-xs text-v-ink/60 mt-4">
                  Asegúrate de que Ollama esté en ejecución (<code>ollama serve</code>) y
                  que el modelo configurado (<code>{OLLAMA_MODEL}</code>) esté
                  descargado (<code>ollama pull {OLLAMA_MODEL}</code>).
                </p>
              </div>
            ) : output ? (
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

      {!error && output && (
        <div className="mt-12 border-y-2 md:border-2 border-v-ink p-8 bg-v-yellow/20 mx-0 md:mx-8">
          <h3 className="text-xl font-bold uppercase tracking-widest mb-4 flex items-center gap-3 text-v-ink">
            <Sparkles className="w-6 h-6 text-v-ink" />
            Listo para copiar
          </h3>
          <p className="text-xl font-medium leading-relaxed text-v-ink">
            Esta directiva fue generada dinámicamente por tu modelo local de Ollama
            (<span className="font-bold">{OLLAMA_MODEL}</span>) a partir del input que
            escribiste. Selecciónala, cópiala y pégala en tu herramienta de IA favorita
            (Claude, GPT, Cursor, Windsurf, Lovable, Bolt, …).
          </p>
        </div>
      )}
    </div>
  );
}
