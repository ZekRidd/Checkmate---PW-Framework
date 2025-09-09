import { defineConfig, devices } from '@playwright/test';
import { environment } from './src/config/environment';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // Gmail API kullanımı için sıralı çalıştırma
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? environment.getMaxRetryAttempts() : 0,
  workers: 1, // Her zaman tek worker kullan
  timeout: environment.getTestTimeout(),
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  use: {
    baseURL: environment.getBaseUrl(),
    trace: environment.shouldTraceOnRetry() ? 'on-first-retry' : 'off',
    screenshot: environment.shouldTakeScreenshotOnFailure() ? 'only-on-failure' : 'off',
    video: environment.shouldRecordVideoOnFailure() ? 'retain-on-failure' : 'off',
    viewport: environment.getViewportSize(),
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        headless: environment.isHeadlessMode(),
        // Docker'da sistem Chromium kullan
        channel: process.env.DOCKER ? undefined : 'chrome',
        executablePath: process.env.DOCKER ? '/usr/bin/chromium-browser' : undefined,
      },
    },
  ],

  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
