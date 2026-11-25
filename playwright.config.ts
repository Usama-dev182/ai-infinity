import { defineConfig, devices } from "@playwright/test";

/**
 * End-to-end tests. Run against a local server backed by a local database:
 *   1. export DATABASE_URL=<local test db>  (never production)
 *   2. npm run build && npm run start -- -p 3100   (or `npm run dev -- -p 3100`)
 *   3. npm run test:e2e
 * Uses the system Chrome (channel "chrome"); no browser download is required.
 */
const baseURL = process.env.E2E_BASE_URL ?? "http://localhost:3100";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL,
    channel: "chrome",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], channel: "chrome", viewport: { width: 1440, height: 900 } },
      testIgnore: /mobile\.spec\.ts/,
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"], channel: "chrome", viewport: { width: 390, height: 844 } },
      testMatch: /mobile\.spec\.ts/,
    },
  ],
});
