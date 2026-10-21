import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end tests against the built site, served by `vite preview`. They run
 * in Chrome, the browser the page is written for; the preview server is
 * started with the production Content-Security-Policy in place.
 */
export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  workers: 2,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4273',
    channel: 'chrome',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } }],
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4273',
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
