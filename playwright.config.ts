import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  workers: 2,
  retries: process.env.CI ? 1 : 0,
  forbidOnly: Boolean(process.env.CI),
  timeout: 45_000,
  reporter: [["list"], ["html", { open: "never" }], ["json", { outputFile: "test-results/results.json" }]],
  // Only this hard-coded loopback test server uses an ephemeral certificate.
  use: { baseURL: "https://127.0.0.1:3100", ignoreHTTPSErrors: true, trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit-mobile", use: { ...devices["iPhone 13"] } },
  ],
  webServer: {
    command: "node scripts/start-qa-server.mjs", url: "https://127.0.0.1:3100/fr", ignoreHTTPSErrors: true, reuseExistingServer: false,
    env: {
      CONTACT_ALLOWED_ORIGINS: "https://127.0.0.1:3100",
      CONTACT_EMAIL_TRANSPORT: "gmail-api", GMAIL_APP_PASSWORD: "",
      GMAIL_CLIENT_ID: "", GMAIL_CLIENT_SECRET: "", GMAIL_REFRESH_TOKEN: "",
    },
  },
});
