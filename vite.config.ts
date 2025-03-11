import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // preview: {
  //   port: 8080,
  //   strictPort: true,
  // },
  // server: {
  //   port: 8080,
  //   strictPort: true,
  //   host: "0.0.0.0",
  //   origin: "http://0.0.0.0:3000",
  //   cors: false,
  // },
});
