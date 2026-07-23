/// <reference types="vite/client" />

interface ImportMetaEnv {
  // VITE_OLLAMA_BASE_URL is REQUIRED at runtime — `resolveOllamaBaseUrl()` in
  // src/lib/ai-service.ts throws ConfigError if it's missing. We type it as
  // non-optional so consumers see it as always-present after Vite's build-time
  // replace (an unset var emits `undefined` in the bundle, which the runtime
  // resolver still rejects).
  readonly VITE_OLLAMA_BASE_URL: string;
  readonly VITE_OLLAMA_MODEL?: string;
  readonly VITE_OLLAMA_TIMEOUT_MS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Build fingerprint globals, injected into every JS bundle by vite.config.ts
// (see the `define` block). Treat as plain string literals at compile time.
declare const __BUILD_COMMIT__: string;
declare const __BUILD_DATE__: string;
