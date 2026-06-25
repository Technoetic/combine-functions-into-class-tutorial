import { defineConfig } from "vitest/config";

// @MX:NOTE: Unit tests target pure tutorial state so UI behavior stays easy to verify.
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/tests/**/*.test.js"],
    coverage: {
      reporter: ["text", "json"],
      include: ["src/core/**/*.js", "src/data/**/*.js"],
    },
  },
});
