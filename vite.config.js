import { defineConfig } from "vite";

// @MX:NOTE: Vite is kept framework-free to match the tutorial harness contract.
export default defineConfig({
  base: "./",
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
  build: {
    target: "es2022",
  },
});
