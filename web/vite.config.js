import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// The preview is served through a proxy, so the dev server must accept the
// forwarded Host header. Vite >= 6.1 also honours
// __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS (passed through by compose); the
// sandbox-id wildcard below is the same allowlist expressed in config form and
// only applies in the Base44 preview sandbox.
const previewMode = process.env.BASE44_PREVIEW_MODE === '1';
const sandboxHostDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN;

const allowedHosts = ['localhost', '127.0.0.1'];
if (previewMode && sandboxHostDomain) {
  allowedHosts.push(`.${sandboxHostDomain}`);
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts,
    // Bind mounts do not always emit inotify events inside the sandbox.
    watch: { usePolling: true, interval: 300 },
    // Single-origin wiring: the browser only reaches port 3000, and the API is
    // proxied over the compose network (so no CORS and no public API port needed).
    proxy: {
      '/api': {
        target: process.env.VITE_API_PROXY_TARGET || 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});
