import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginButtonTop;
  readonly emailInput;
  readonly passwordInput;
  readonly submitLoginButton;

  constructor(page: Page) {
    this.page = page;

    // Top-right "Log in" button on homepage FYI It's an <a> tag, NOT a button!
  //this.loginButtonTop = page.getByRole('button', { name: /Log in/i });
    this.loginButtonTop = page.locator('a', { hasText: 'Log in' });

    // Email field — using id="username"
    this.emailInput = page.locator('#username');

    // Password field — using id="password"
    this.passwordInput = page.locator('#password');

    // Login button — using YOUR exact data-testid
    this.submitLoginButton = page.getByTestId('login-button');
  }

  async open() {
    await this.page.goto('https://sandbox-app.brighthr.com/lite');
  }

  async login(email: string, password: string) {
    // Step 1: Open homepage
    await this.open();
    console.log('✅ Homepage opened');

    // Step 2: Click "Log in" button at top-right
    await this.page.waitForLoadState('networkidle');
    await this.loginButtonTop.waitFor({ state: 'visible', timeout: 10000 });
    await this.loginButtonTop.click();
    console.log('✅ Log in button clicked — going to login page');

    // Step 3: Fill email — using id="username"
    await this.emailInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.emailInput.fill(email);
    console.log('✅ Email filled');

    // Step 4: Fill password — using id="password"
    await this.passwordInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.passwordInput.fill(password);
    console.log('✅ Password filled');

    // Step 5: Click Login button — using data-testid
    await this.submitLoginButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.submitLoginButton.click();
    console.log('✅ Login button clicked — logging in...');

    await this.page.waitForLoadState('networkidle');
    console.log('✅ Logged in successfully!');
  }
}