import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const testData = JSON.parse(readFileSync(join(__dirname, '../fixtures/test-data.json'), 'utf8'));

/**
 * @tcId US-005-TC-04
 * @requirement US-005
 * @priority High
 */
test.describe('Success Page', () => {
  test('US-005-TC-04 - Clicking Log out from the login page does not navigate to the success page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Preconditions: User is on the login page
    await loginPage.goto();
    await expect(loginPage.isLoaded()).toBe(true);

    // Steps: Navigate to the login page | Click the 'Log out' button
    await loginPage.login(testData.credentialsUsed.username, testData.credentialsUsed.password);
    await loginPage.logout();

    // Expected: The user remains on the login page with username and password fields visible and empty
    await expect(loginPage.isLoaded()).toBe(true);
    await expect(loginPage.getUsernameField()).toBeVisible();
    await expect(loginPage.getPasswordField()).toBeVisible();
    await expect(loginPage.getUsernameField()).toBeEmpty();
    await expect(loginPage.getPasswordField()).toBeEmpty();
  });
});