/// <reference types="vite/client" />

interface ImportMetaEnv {
  // The frontend never talks to Ollama directly. All requests go through
  // a Vercel Serverless Function under /api/* (see api/improve-prompt.ts
  // and api/health.ts), which reads the upstream Ollama env vars
  // server-side. No upstream-server env is ever baked into the client
  // bundle.
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Build fingerprint globals, injected into every JS bundle by vite.config.ts
// (see the `define` block). Treat as plain string literals at compile time.
declare const __BUILD_COMMIT__: string;
declare const __BUILD_DATE__: string;
