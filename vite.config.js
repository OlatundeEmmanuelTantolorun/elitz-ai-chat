import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
  // This ensures environment variables are available during build
  define: {
    "import.meta.env.VITE_GOOGLE_API_KEY": JSON.stringify(
      process.env.VITE_GOOGLE_API_KEY,
    ),
  },
});
