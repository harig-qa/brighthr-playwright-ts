import { Page, expect } from '@playwright/test';

export class EmployeePage {
  readonly page: Page;
  readonly addButton;
  readonly firstNameInput;
  readonly lastNameInput;
  readonly emailInput;
  readonly phoneInput;
  readonly startDateInput;
  readonly jobTitleInput;
  readonly saveButton;
  readonly successMessage;
  readonly addAnotherEmployeeButton;

  constructor(page: Page) {
    this.page = page;
    // Add Employee button
    this.addButton = page.getByRole('button', { name: /add employee|add new/i });
    // Form fields
    this.firstNameInput = page.getByLabel('First name');
    this.lastNameInput = page.getByLabel('Last name');
    this.emailInput = page.getByLabel('Email address');
    this.phoneInput = page.getByLabel(/Phone number/i);
    this.startDateInput = page.getByLabel(/Start date/i);
    this.jobTitleInput = page.getByLabel(/Job title/i);

    this.saveButton = page.getByRole('button', { name: /Save new employee/i });
    // ✅ Success popup
    this.successMessage = page.getByText('Success! New employee added');
    this.addAnotherEmployeeButton = page.getByRole('button', { name: /Add another employee/i });
  }

  async openAddForm() {
    console.log('📌 Opening Add Employee form...');
    await this.addButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.addButton.click();
    await expect(this.firstNameInput).toBeVisible({ timeout: 10000 });
    console.log('✅ Form opened');
  }

  async addEmployee(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    startDate: string,
    jobTitle: string
  ) {
    await this.openAddForm();

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.startDateInput.fill(startDate);
    await this.jobTitleInput.fill(jobTitle);
    await this.saveButton.click();
    // ✅ Wait for success message
    await this.successMessage.waitFor({ state: 'visible', timeout: 15000 });
    console.log(`✅ SUCCESS: ${firstName} ${lastName} added`);
  }

  async addAnotherEmployee(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    startDate: string,
    jobTitle: string
  ) {
    // ✅ Click "Add another employee" from the success popup — NO navigation needed!
    console.log('📌 Clicking "Add another employee"...');
    await this.addAnotherEmployeeButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.addAnotherEmployeeButton.click();
    // Form re-opens automatically — fill new details
    await this.firstNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.startDateInput.fill(startDate);
    await this.jobTitleInput.fill(jobTitle);
    await this.saveButton.click();
    // Confirm second success
    await this.successMessage.waitFor({ state: 'visible', timeout: 15000 });
    console.log(`✅ SUCCESS: ${firstName} ${lastName} added`);
  }

  async closeSuccessPopup() {
    // ✅ // Close popup to reveal employee list Fyi ✅ EXACT match: "Close modal" — targets ONLY the success
    const closeBtn = this.page.getByRole('button', { name: /Close modal/i });
    await closeBtn.waitFor({ state: 'visible', timeout: 5000 });
    await closeBtn.click();
    console.log('✅ Success popup closed');

    // Confirm popup is fully gone
    await this.page.waitForSelector('[role="dialog"]', { state: 'hidden', timeout: 5000 });
   //await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async checkEmployeeVisible(firstName: string, lastName: string) {
    const fullName = `${firstName} ${lastName}`;
    
    // ✅ Exact match on the heading element from your card — no duplicates!
    const employeeCard = this.page.locator('h1.text-base.font-bold', { hasText: fullName }).first();
    
    await expect(employeeCard).toBeVisible({ timeout: 10000 });
    console.log(`✅ Verified: "${fullName}" is displayed in Employee Hub`);
  }
}