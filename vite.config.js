import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        "team-development-guide": "team-development-guide.html",
        "logo-recommendations-preview": "logo-recommendations-preview.html",
      },
    },
  },
});
