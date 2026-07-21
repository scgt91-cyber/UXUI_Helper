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
      // Proxy local Ollama requests.
      //
      // Why /__ollama and not /api/ollama: many cloud preview / AI-agent
      // containers intercept anything under /api/* and return 405 for
      // unknown POST routes. /__ollama lives outside that reserved
      // namespace, so the proxy actually reaches the dev server.
      //
      // Trailing slash on the rewrite match: /__ollama/api/generate ->
      // /api/generate. Without the `/` anchor, paths like /__ollamapull
      // would strip to `pull` and hit Ollama-internal endpoints.
      //
      // CORS response headers: prepend permissive Access-Control-* to the
      // proxy response so origin-isolated preview environments can still
      // read the body even when the request is cross-origin from the page.
      proxy: {
        '/__ollama': {
          target: env.VITE_OLLAMA_BASE_URL || 'http://127.0.0.1:11434',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/__ollama\//, '/'),
          configure: (proxy) => {
            proxy.on('proxyRes', (proxyRes) => {
              proxyRes.headers['access-control-allow-origin'] = '*';
              proxyRes.headers['access-control-allow-methods'] =
                'POST, OPTIONS, GET';
              proxyRes.headers['access-control-allow-headers'] =
                'Content-Type';
            });
          },
        },
      },
    },
  };
});
