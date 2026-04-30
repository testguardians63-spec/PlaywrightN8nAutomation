import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const testData = JSON.parse(readFileSync(join(__dirname, '../fixtures/test-data.json'), 'utf8'));

/**
 * @tcId US-005-TC-02
 * @requirement US-005
 * @priority High
 */
test.describe('Success Page', () => {
  test('US-005-TC-02 - Clicking Log out returns the user to the login form', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Step 1: Navigate to the login page
    await loginPage.goto();

    // Step 2: Enter valid username and password
    await loginPage.login(testData.credentialsUsed.username, testData.credentialsUsed.password);

    // Step 3: Navigate to the success page (Assuming there's a method to navigate to the success page)
    // await successPage.goto();

    // Step 4: Click the 'Log out' button
    await loginPage.logout();

    // Expected: The user is redirected to the login form with username and password fields visible and empty
    expect(await loginPage.isLoginFormVisible()).toBe(true);
    expect(await loginPage.getUsernameField().isVisible()).toBe(true);
    expect(await loginPage.getPasswordField().isVisible()).toBe(true);
    expect(await loginPage.getUsernameField().inputValue()).toBe('');
    expect(await loginPage.getPasswordField().inputValue()).toBe('');
  });
});