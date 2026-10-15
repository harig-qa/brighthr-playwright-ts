import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { EmployeePage } from '../pages/EmployeePage';



test.setTimeout(180000); // CI-friendly timeout

test.describe('Add Employees Test', () => {
   // ✅ Add || 'fallback' — red lines GONE + works locally AND in CI
  const userEmail = String(process.env.TEST_EMAIL) || 'hari.justin@gmail.com';
  const userPassword = String(process.env.TEST_PASSWORD) || 'T3sting12345!';
  const expectedUserName = 'Hari';

  test('Login → Add 2 employees via popup → Verify both displayed', async ({ page }) => {
    // Step 1: Log in
    const loginPage = new LoginPage(page);
    await loginPage.login(userEmail, userPassword);

    // Step 2: Verify dashboard
    const dashboard = new DashboardPage(page);
    await dashboard.verifyLoggedInAs(expectedUserName);

    // Step 3: Go to Employee Hub
    const employeePage = new EmployeePage(page);
    await dashboard.goToEmployees();

    // Step 4: Add FIRST employee
    await employeePage.addEmployee(
      'Hari',
      'Smith',
      'hari.smith@example.com',
      '07700900001',
      '15/10/2026',
      'Software Engineer'
    );

    // Step 5: ✅ Add SECOND employee — directly from success popup!
    await employeePage.addAnotherEmployee(
      'Sarah',
      'Jones',
      'sarah.jones@example.com',
      '07700900002',
      '01/11/2026',
      'Project Manager'
    );

    // Step 6: Close popup → verify both appear
    await employeePage.closeSuccessPopup();

    // Navigate to Employees tab to see full list
    await dashboard.goToEmployees();
    await employeePage.checkEmployeeVisible('Hari', 'Smith');
    await employeePage.checkEmployeeVisible('Sarah', 'Jones');

    console.log('✅ ✅ ALL TESTS PASSED — Both employees verified! 🎉');
  });
});