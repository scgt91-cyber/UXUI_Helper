import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify; file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Proxy local Ollama requests so the browser can call /api/ollama/*
      // without CORS. The path is rewritten: /api/ollama/api/generate -> /api/generate.
      // Note the trailing slash on the rewrite match: without it, paths like
      // `/api/ollamapull` would strip to `pull` and forward an unintended
      // Ollama-internal endpoint. The `/` anchor forces only intended paths.
      proxy: {
        '/api/ollama': {
          target: env.VITE_OLLAMA_BASE_URL || 'http://127.0.0.1:11434',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/ollama\//, '/'),
        },
      },
    },
  };
});
