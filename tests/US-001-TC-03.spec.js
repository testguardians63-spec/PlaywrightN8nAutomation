import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const testData = JSON.parse(readFileSync(join(__dirname, '../fixtures/test-data.json'), 'utf8'));

/**
 * @tcId US-001-TC-03
 * @requirement US-001
 * @priority High
 */
test.describe('Login Page', () => {
  test('US-001-TC-03 - User cannot log in with empty credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Step 1: Navigate to /practice-test-login/
    await loginPage.goto(testData.navigationUrl);

    // Step 2: Leave the Username field empty
    await loginPage.login('', '');

    // Step 3: Leave the Password field empty
    // Step 4: Click the Submit button
    // This is handled by the login method which already clicks the submit button

    // Expected: User remains on the Login Page. An error message is displayed indicating 'Please enter your username and password'.
    await expect(page.locator('text=Please enter your username and password')).toBeVisible();
  });
});