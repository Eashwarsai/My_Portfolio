/*
 * Vite Configuration
 *
 * WHAT: Vite's build tool configuration.
 * WHY:  Configures the dev server, build process, and plugins.
 * HOW:
 *   - react() plugin: Enables JSX transform and Fast Refresh (HMR)
 *   - resolve.alias: '@' maps to 'src/' for clean imports
 *     (import Button from '@/components/ui/Button' instead of '../../components/ui/Button')
 *   - server.proxy: Routes /api requests to FastAPI backend in development
 *     This avoids CORS issues — browser thinks API is on same origin
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // '@' → src/ for cleaner imports across the codebase
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 5173,
    // Proxy API requests to FastAPI backend during development
    // This eliminates CORS issues: browser sends to localhost:5173/api
    // → Vite forwards to localhost:8000/api
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },

  build: {
    // Generate source maps for debugging production issues
    sourcemap: true,
  },
});
