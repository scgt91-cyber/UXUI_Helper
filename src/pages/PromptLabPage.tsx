import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Activity } from 'lucide-react';
import {
  BUILD,
  BackendError,
  type BackendErrorKind,
  type BackendHealth,
  diagnoseOllama,
  generateOptimizedPrompt,
} from '@/lib/ai-service';

export function PromptLabPage() {
  // Textarea starts empty — no preloaded sample. The HTML `placeholder`
  // attribute is the ONLY thing the user sees when the field is empty.
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [errorKind, setErrorKind] = useState<BackendErrorKind | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [diag, setDiag] = useState<BackendHealth | null>(null);
  const [isDiagLoading, setIsDiagLoading] = useState(false);

  // Increments on every handleOptimize call. Only the latest in-flight
  // request is allowed to mutate UI state, so out-of-order resolutions
  // from rapid clicks cannot visually overwrite the most recent result.
  const requestIdRef = useRef(0);

  // Helper: choose a banner heading from the typed error kind.
  const headingFor = (kind: BackendErrorKind | null): string => {
    switch (kind) {
      case 'validation':
        return 'Input inválido';
      case 'upstream':
        return 'Modelo no disponible';
      case 'timeout':
        return 'Tiempo de espera agotado';
      case 'server':
        return 'Error del servidor';
      case 'network':
        return 'Sin conexión con el servidor';
      default:
        return 'Error';
    }
  };

  // Auto-run the diagnostic on first mount so any backend / upstream
  // failure is visible without the user having to click anything. This
  // is a GET /api/health (a server-side probe) — NOT a prompt preload;
  // the AI body only fires after the user clicks "Traducir a Sistema".
  useEffect(() => {
    let cancelled = false;
    setIsDiagLoading(true);
    diagnoseOllama()
      .then((result) => {
        if (cancelled) return;
        setDiag(result);
      })
      .finally(() => {
        if (!cancelled) setIsDiagLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const runDiagnose = async () => {
    setIsDiagLoading(true);
    try {
      const diagResult = await diagnoseOllama();
      setDiag(diagResult);
    } finally {
      setIsDiagLoading(false);
    }
  };

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
      setErrorKind(null);
    } catch (err) {
      if (myId !== requestIdRef.current) return;
      if (err instanceof BackendError) {
        setError(err.message);
        setErrorKind(err.kind);
      } else {
        const message =
          err instanceof Error
            ? err.message
            : 'Error inesperado al procesar la solicitud.';
        setError(message);
        setErrorKind('server');
      }
      setOutput('');
    } finally {
      if (myId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  };

  const textareaHasContent = input.trim().length > 0;
  const diagChipClass = (() => {
    if (!diag) return '';
    if (diag.success) return 'text-v-green';
    if (diag.status === 'timeout') return 'text-v-yellow';
    if (diag.status === 'config-missing') return 'text-v-ink';
    return 'text-v-red';
  })();
  const diagChipText = (() => {
    if (!diag) return '';
    if (diag.success) return '✓ Backend conectado';
    if (diag.status === 'timeout') return '◯ Timeout';
    if (diag.status === 'config-missing') return '⚠ Backend sin configurar';
    return `✗ ${diag.status ?? 'unreachable'}`;
  })();

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
          Arquitectura: Browser → <span className="font-bold text-v-ink">/api/improve-prompt</span> → Ollama (server-side)
        </p>
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={runDiagnose}
            disabled={isDiagLoading}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest bg-v-bg border-2 border-v-ink hover:bg-v-yellow transition-colors disabled:opacity-50"
          >
            <Activity className="w-4 h-4" />
            {isDiagLoading ? 'Probando…' : 'Probar Conexión con el Backend'}
          </button>
          {diag && (
            <span
              className={`text-xs font-bold uppercase tracking-widest ${diagChipClass}`}
              title={diag.error ?? diag.status ?? 'unknown'}
            >
              {diagChipText}
            </span>
          )}
        </div>
        {diag && (
          <div className="mt-3 border-2 border-v-ink bg-v-bg/40 p-3 text-xs font-mono leading-relaxed text-v-ink">
            <div>
              <span className="font-bold">Ruta del backend:</span> {diag.backendRoute}
            </div>
            <div>
              <span className="font-bold">Método:</span> {diag.method}
            </div>
            <div>
              <span className="font-bold">Origen del navegador:</span> {diag.browserOrigin}
            </div>
            <div>
              <span className="font-bold">Estado:</span>{' '}
              {diag.success ? 'reachable' : (diag.status ?? 'unreachable')}
              {diag.httpStatus ? ` (HTTP ${diag.httpStatus})` : ''}
            </div>
            {diag.success && diag.models && diag.models.length > 0 && (
              <div className="mt-2">
                <span className="font-bold">Modelos disponibles:</span>{' '}
                {diag.models.join(', ')}
              </div>
            )}
            {diag.error && (
              <div className="mt-2 whitespace-pre-wrap">
                <span className="font-bold">Detalle:</span> {diag.error}
              </div>
            )}
          </div>
        )}
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
              placeholder="Escribe aquí tu petición genérica para que el sistema la traduzca a una directiva profesional de UX/UI…"
              className="flex-1 resize-none text-2xl font-medium p-0 border-0 bg-transparent focus:ring-0 outline-none placeholder:text-v-ink/30"
            />
          </div>
          <button
            onClick={handleOptimize}
            disabled={isLoading || !textareaHasContent}
            className="w-full py-6 text-xl font-bold uppercase tracking-widest bg-v-ink hover:bg-v-blue text-white transition-colors flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed border-t-2 border-v-ink"
          >
            {isLoading ? 'Procesando...' : 'Traducir a Sistema'}
            {!isLoading && textareaHasContent && <ArrowRight className="w-6 h-6" />}
          </button>
        </div>

        {/* Output Section */}
        <div className="flex flex-col bg-v-blue/5">
          <div className="p-6 border-b-2 border-v-ink flex items-center justify-between bg-v-blue text-white">
            <h2 className="text-xl font-bold uppercase tracking-widest">2. Directiva Estructurada</h2>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            {error ? (
              <div
                className={
                  'border-2 p-4 text-v-ink ' +
                  (errorKind === 'validation'
                    ? 'border-v-yellow bg-v-yellow/30'
                    : errorKind === 'upstream'
                      ? 'border-v-ink bg-v-blue/10'
                      : errorKind === 'timeout'
                        ? 'border-v-yellow bg-v-yellow/30'
                        : 'border-v-red bg-v-red/10')
                }
              >
                <p className="text-sm font-bold uppercase tracking-widest mb-2">
                  {headingFor(errorKind)}
                </p>
                <p className="text-base leading-relaxed whitespace-pre-wrap">{error}</p>
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
            Esta directiva fue generada dinámicamente por el servidor (a través
            de <span className="font-bold">/api/improve-prompt</span>) a
            partir del input que escribiste. Selecciónala, cópiala y pégala
            en tu herramienta de IA favorita (Claude, GPT, Cursor,
            Windsurf, Lovable, Bolt, …).
          </p>
        </div>
      )}

      <footer className="mt-16 mx-0 md:mx-8 px-0 md:px-0 text-xs font-mono text-v-ink/40 text-center">
        build {BUILD.commit} · {BUILD.date}
      </footer>
    </div>
  );
}
