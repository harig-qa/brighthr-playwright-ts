import { Page, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly welcomeMessage;
  readonly employeesLink;

  constructor(page: Page) {
    this.page = page;
    
    // Welcome message check
    this.welcomeMessage = page.getByText(/Hi, Hari/i);
    
    // ✅ PERFECT STABLE SELECTOR — from your error: data-e2e="employees"
    this.employeesLink = page.locator('a[data-e2e="employees"]');
  }

  async verifyLoggedInAs(expectedName: string) {
    await this.page.waitForURL(/dashboard/);
    console.log('✅ On dashboard page');

    await expect(this.welcomeMessage).toBeVisible({ timeout: 15000 });
    await expect(this.welcomeMessage).toContainText(expectedName);
    console.log(`✅ Verified: Logged in as "${expectedName}"`);
  }

  async goToEmployees() {
    // ✅ Uses data-e2e="employees" — matches the sidebar icon link exactly
    await this.employeesLink.waitFor({ state: 'visible', timeout: 15000 });
    await this.employeesLink.click();
    console.log('✅ Clicked Employees icon in sidebar');
  }
}