import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const testData = JSON.parse(readFileSync(join(__dirname, '../fixtures/test-data.json'), 'utf8'));

/**
 * @tcId US-001-TC-01
 * @requirement US-001
 * @priority High
 */
test.describe('Login Page', () => {
  test('US-001-TC-01 - User can log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Step 1: Navigate to /practice-test-login/
    await loginPage.goto(testData.navigationUrl);

    // Step 2: Type 'student' into the Username field
    await loginPage.login(testData.credentialsUsed.username, testData.credentialsUsed.password);

    // Expected: User is redirected to the Success Page
    await expect(page).toHaveURL(/practicetestautomation\.com\/logged-in-successfully\//);

    // Expected: The page body contains the word 'Congratulations' and the phrase 'successfully logged in'
    await expect(page).toContainText('Congratulations');
    await expect(page).toContainText('successfully logged in');

    // Expected: A Log out button is visible
    await expect(page.locator('button:has-text("Log out")')).toBeVisible();
  });
});
