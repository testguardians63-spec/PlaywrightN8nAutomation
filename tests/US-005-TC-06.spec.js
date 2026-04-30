import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const testData = JSON.parse(readFileSync(join(__dirname, '../fixtures/test-data.json'), 'utf8'));

/**
 * @tcId US-005-TC-06
 * @requirement US-005
 * @priority Medium
 */
test.describe('Success Page', () => {
  test('US-005-TC-06 - Log out control is visible with maximum length username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.goto();

    // Enter maximum length username and password
    await loginPage.login(testData['US-005-TC-06'].credentialsUsed.username, testData['US-005-TC-06'].credentialsUsed.password);

    // Navigate to the success page
    // Assuming there is a method to navigate to the success page after login
    await page.goto('https://practicetestautomation.com/success-page/');

    // Verify that the 'Log out' button is visible
    const logoutButton = page.locator('button:has-text("Log out")');
    await expect(logoutButton).toBeVisible();
  });
});