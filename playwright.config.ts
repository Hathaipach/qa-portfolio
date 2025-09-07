import { defineConfig, devices } from '@playwright/test'
import * as dotenv from 'dotenv'
dotenv.config()

const BASE_URL = process.env.BASE_URL ?? 'https://demo.playwright.dev/todomvc'

export default defineConfig({
  testDir: './tests',
  retries: 1,
  reporter: [['list'], ['html', { outputFolder: 'reports/html' }]],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
  ],
})
