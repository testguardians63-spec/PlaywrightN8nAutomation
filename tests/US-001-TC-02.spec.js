import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const testData = JSON.parse(readFileSync(join(__dirname, '../fixtures/test-data.json'), 'utf8'));

/**
 * @tcId US-001-TC-02
 * @requirement US-001
 * @priority High
 */
test.describe('Login Page', () => {
  test('US-001-TC-02 - User cannot log in with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Step 1: Navigate to /practice-test-login/
    await loginPage.goto(testData.navigationUrl);

    // Step 2: Type 'student' into the Username field
    await loginPage.login(testData.testDataRows[0].testValue, testData.testDataRows[1].testValue);

    // Step 3: Type 'wrongpassword' into the Password field
    // Step 4: Click the Submit button
    // These steps are handled by the login method in the POM

    // Expected: User remains on the Login Page. An error message is displayed indicating 'Invalid username or password'.
    await expect(page.locator('text=Invalid username or password')).toBeVisible();
  });
});