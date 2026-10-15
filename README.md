# BrightHR Playwright Automation

## Tech Stack
- Playwright + TypeScript
- Page Object Model pattern
- GitHub Actions CI

## How to Run Locally
```bash
npm install
npx playwright install
npx playwright test --headed

CI Pipeline
Runs automatically on every push & Pull Request
HTML test report available as an artifact
Status: ✅ Passing
Test Flow
Navigate to homepage & log in
Add first employee → success popup appears
Click "Add another employee" → add second
Close popup → verify both listed in Employee Hub
