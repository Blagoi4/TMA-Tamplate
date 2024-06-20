import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  base: "/TWA-Template/",
  server: {
    port: 8080,
    host: "0.0.0.0",
    hmr: {
      protocol: "wss",
host: '6ded68d0de06.ngrok.app',
clientPort: 443,
      port: 8080,
    },
  },
});
