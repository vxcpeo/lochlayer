import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig, type Plugin } from 'vite';

/**
 * The policy the site is served with. The page's own script narrows
 * `connect-src` once it knows which RPC endpoint is in use (public/boot.js).
 * In development the policy in index.html also admits Vite's HMR socket and
 * inline styles; the build replaces it with this one.
 */
export const PRODUCTION_CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' https: http://localhost:* http://127.0.0.1:*",
  "form-action 'self' https://waitlist.velaira.xyz",
  "base-uri 'none'",
  "object-src 'none'",
].join('; ');

function productionPolicy(): Plugin {
  return {
    name: 'velaira-production-policy',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace(/<meta[^>]*http-equiv="Content-Security-Policy"[^>]*>/i, `<meta http-equiv="Content-Security-Policy" content="${PRODUCTION_CSP}">`);
    },
  };
}

export default defineConfig({
  plugins: [vue(), productionPolicy()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
    // Keep the output inside `website/`: Vercel treats `website/` as the project
    // root and only collects files below it, so a `../dist` beside the workspace
    // folders is invisible to the deployment and ends in
    // STATIC_BUILD_NO_OUT_DIR.
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  preview: {
    port: 4273,
    strictPort: true,
  },
});
