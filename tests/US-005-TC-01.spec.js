import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const testData = JSON.parse(readFileSync(join(__dirname, '../fixtures/test-data.json'), 'utf8'));

/**
 * @tcId US-005-TC-01
 * @requirement US-005
 * @priority High
 */
test.describe('Success Page', () => {
  test('US-005-TC-01 - Log out control is visible on the success page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Preconditions: User is logged in and on the success page
    await loginPage.goto(testData.navigationUrl);
    await loginPage.login(testData.credentialsUsed.username, testData.credentialsUsed.password);

    // Steps: Navigate to the success page | Verify that the 'Log out' button is visible
    await page.goto(testData.navigationUrl);
    await expect(page.locator('button:has-text("Log out")')).toBeVisible();
  });
});