import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration file.
// It tells Vite to use the React plugin so JSX works, and starts the dev server.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // http://localhost:5173 once you run `npm run dev`
    open: true, // automatically opens the browser
      base: '/country-info-app/',

  },
});
