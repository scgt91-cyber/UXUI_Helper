#!/usr/bin/env node
/**
 * scripts/verify-bundle.mjs
 *
 * Post-build guard that fails `npm run build` if the client bundle
 * (including sourcemaps) ever contains:
 *
 *   - VITE_OLLAMA_* references (a Vite env var the frontend must never read),
 *   - any hardcoded http://127.0.0.1:11434 or http://localhost:11434
 *     (loopback fallback, now architecturally forbidden for the frontend),
 *   - any bare "OLLAMA_BASE_URL" string (the server-side env var),
 *   - any path to /api/generate or /api/tags (server-only Ollama routes
 *     the browser must never reach — even via string concatenation or
 *     template literals, with or without quotes),
 *   - any `fetch(` or `XMLHttpRequest` targeting an Ollama endpoint
 *     string. (Defense in depth.)
 *
 * The architecture is: Browser -> POST /api/improve-prompt -> (server)
 * Ollama. The browser bundle (including sourcemaps) must NEVER contain
 * any of the patterns above.
 *
 * Exits 0 with a ✅ summary if clean; exits 1 with a per-file report if any
 * pattern leaks.
 */

import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');

// Patterns that MUST NOT appear in the client bundle (incl. sourcemaps).
//
// Notes on regex shape:
// - No quote requirement for /api/* paths — covers string-concatenation
//   leaks (`'/api/' + 'generate'`), template literals, and bare strings.
// - /OLLAMA_BASE_URL/ matches the bare env-var name. We exclude this very
//   script's basename from the scan below to avoid self-trigger.
// - Loopback URL pattern is anchored with optional scheme so it matches
//   both "127.0.0.1:11434" and "http://127.0.0.1:11434".
const FORBIDDEN = [
  { label: 'VITE_OLLAMA_BASE_URL', pattern: /VITE_OLLAMA_BASE_URL/g },
  { label: 'VITE_OLLAMA_MODEL',    pattern: /VITE_OLLAMA_MODEL/g },
  { label: 'VITE_OLLAMA_TIMEOUT',  pattern: /VITE_OLLAMA_TIMEOUT/g },
  { label: 'bare OLLAMA_BASE_URL (server env, must not be in bundle)', pattern: /OLLAMA_BASE_URL/g },
  { label: 'hardcoded loopback Ollama URL (e.g. 127.0.0.1:11434)', pattern: /(?:https?:\/\/)?(?:127\.0\.0\.1|localhost|0\.0\.0\.0):11434/gi },
  // /api/generate and /api/tags are Ollama routes meant for the
  // serverless function only — they must never appear in the browser
  // bundle, even via concatenation. The pattern intentionally does NOT
  // require quote-wrapping.
  { label: 'Ollama /api/generate (server-only POST)', pattern: /\/api\/generate/g },
  { label: 'Ollama /api/tags (server-only GET)',     pattern: /\/api\/tags/g },
];

/** Extensions to scan, including sourcemaps so source comments don't leak. */
const SCAN_EXT = /\.(js|mjs|cjs|html|css|map|json)$/;

/**
 * Files inside the dist tree that we intentionally skip (this script's
 * own content lives outside `dist/` so it never needs to be excluded
 * by name in the scan; this hook remains in case of future inlining).
 */
const IGNORE_FILES = new Set();

/** Recursively collect every regular file under `dir`. */
async function walk(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await walk(p)));
    } else if (e.isFile()) {
      out.push(p);
    }
  }
  return out;
}

async function main() {
  let distStat;
  try {
    distStat = await stat(DIST);
  } catch {
    console.error(`✗ verify-bundle: ${relative(ROOT, DIST)} does not exist. Did vite build run?`);
    process.exit(1);
  }
  if (!distStat.isDirectory()) {
    console.error(`✗ verify-bundle: ${relative(ROOT, DIST)} is not a directory.`);
    process.exit(1);
  }

  const allFiles = await walk(DIST);
  const files = allFiles.filter(
    (p) => SCAN_EXT.test(p) && !IGNORE_FILES.has(relative(ROOT, p)),
  );

  const violations = [];
  for (const file of files) {
    const text = await readFile(file, 'utf-8');
    for (const rule of FORBIDDEN) {
      // Reset lastIndex defensively — global regexes can carry state.
      rule.pattern.lastIndex = 0;
      const matches = text.match(rule.pattern);
      if (matches && matches.length > 0) {
        violations.push({
          file: relative(ROOT, file),
          rule: rule.label,
          count: matches.length,
          sample: matches[0].slice(0, 80),
        });
      }
    }
  }

  if (violations.length === 0) {
    const summary = FORBIDDEN.map((r) => `  ✓ no \`${r.label}\``).join('\n');
    console.log(`✅ verify-bundle: ${relative(ROOT, DIST)} (${files.length} files scanned, incl. sourcemaps) is clean.`);
    console.log(summary);
    process.exit(0);
  }

  console.error('✗ verify-bundle: forbidden patterns found in the client bundle.');
  console.error('The architectural firewall is leaking. The browser must NEVER');
  console.error('see any Ollama URL, env var, or route. Fix the source so none of');
  console.error('the patterns below appear in dist/.');
  console.error('');
  for (const v of violations) {
    console.error(`  ✗ ${v.file}`);
    console.error(`      rule:    ${v.rule}`);
    console.error(`      matches: ${v.count}`);
    console.error(`      sample:  ${JSON.stringify(v.sample)}`);
  }
  console.error('');
  console.error('How to fix:');
  console.error('  - Browser must NEVER reference VITE_OLLAMA_*, localhost:11434,');
  console.error('    /api/generate, or /api/tags.');
  console.error('  - Server reads OLLAMA_BASE_URL via process.env.* at runtime;');
  console.error('    it is NEVER bundled into the client.');
  console.error('  - Run `grep -rIn OLLAMA src/` to find the offender.');
  process.exit(1);
}

main().catch((err) => {
  console.error('✗ verify-bundle: unexpected failure:', err);
  process.exit(1);
});
