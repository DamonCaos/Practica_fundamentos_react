import { defineConfig } from "vitest/config"; // 🟢 Importar desde Vitest
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
