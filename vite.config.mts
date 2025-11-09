import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// ⚠️ cambia "wa-dialer-pwa" por el nombre EXACTO de tu repo en GitHub
export default defineConfig({
  plugins: [react()],
  base: "WhatsApp-Num",
});