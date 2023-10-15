import { defineConfig } from "@playwright/test";

export default defineConfig({
    testMatch: "/__tests__/**/*.test.js",
    outputDir: "./__tests__/test-results",
});
