import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginButtonTop;
  readonly emailInput;
  readonly passwordInput;
  readonly submitLoginButton;

  constructor(page: Page) {
    this.page = page;

    // Top-right "Log in" link
    this.loginButtonTop = page.locator('a', { hasText: 'Log in' });

    // Login form — exact IDs
    this.emailInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitLoginButton = page.locator('[data-testid="login-button"]');
  }

  async open() {
    await this.page.goto('https://sandbox-app.brighthr.com/lite');
  }

  async login(email: string, password: string) {
    // Step 1: Open homepage
    await this.open();
    console.log('✅ Homepage opened');

    // ✅ REMOVED networkidle — it causes CI timeouts!
    await this.page.waitForLoadState('domcontentloaded');
    
    // Step 2: Click Log in link — longer timeout for CI
    await this.loginButtonTop.waitFor({ state: 'visible', timeout: 30000 });
    await this.loginButtonTop.click();
    console.log('✅ Log in button clicked — going to login page');

    // Step 3: Fill login form
    await this.emailInput.waitFor({ state: 'visible', timeout: 30000 });
    await this.emailInput.fill(email);
    console.log('✅ Email filled');

    await this.passwordInput.waitFor({ state: 'visible', timeout: 30000 });
    await this.passwordInput.fill(password);
    console.log('✅ Password filled');

    // Step 4: Submit
    await this.submitLoginButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.submitLoginButton.click();
    console.log('✅ Login submitted');

    // ✅ Don't wait for networkidle here either
    await this.page.waitForURL(/dashboard|employee-hub/, { timeout: 30000 });
    console.log('✅ Logged in successfully!');
  }
}