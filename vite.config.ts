import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { execSync } from 'node:child_process';
import { defineConfig } from 'vite';

// Build fingerprint: capture the current commit SHA and an ISO timestamp
// AT BUILD TIME so the user always sees exactly which commit they're running.
// This is read by ai-service.ts (declared in vite-env.d.ts) and rendered in
// the UI footer and inside every error banner. If a preview's displayed
// commit does NOT match the latest one pushed to GitHub, the preview is
// serving a stale bundle.
let buildCommit = 'unknown';
try {
  const out = execSync('git rev-parse --short HEAD', {
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'ignore'],
  });
  buildCommit = out.toString().trim() || 'unknown';
} catch {
  /* git unavailable in this environment — leave placeholder */
}
const buildDate = new Date().toISOString();

export default defineConfig(() => ({
  define: {
    __BUILD_COMMIT__: JSON.stringify(buildCommit),
    __BUILD_DATE__: JSON.stringify(buildDate),
  },
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
  },
}));
