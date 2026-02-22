import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import process from "node:process";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
  },
});
