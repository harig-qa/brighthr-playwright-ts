import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  
  // ✅ Generate HTML report
  reporter: [
    ['html', { open: 'never' }], // Don't auto-open in CI
    ['list'] // Console output
  ],
  
  use: {
    baseURL: 'https://sandbox-app.brighthr.com',
    trace: 'on-first-retry',
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});