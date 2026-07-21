/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OLLAMA_BASE_URL?: string;
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
