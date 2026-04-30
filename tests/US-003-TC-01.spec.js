import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const testData = JSON.parse(readFileSync(join(__dirname, '../fixtures/test-data.json'), 'utf8'));

/**
 * @tcId US-003-TC-01
 * @requirement US-003
 * @priority High
 */
test.describe('Login Page', () => {
  test('US-003-TC-01 - User cannot log in with an incorrect password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Preconditions: User is on the Login Page
    await loginPage.goto();
    await expect(loginPage.isLoaded()).toBe(true);

    // Steps
    await loginPage.login(testData['US-003-TC-01'].testDataRows[0].testValue, testData['US-003-TC-01'].testDataRows[1].testValue);

    // Expected
    await expect(page.locator('.error-message')).toHaveText('Your password is invalid!');
    await expect(page.url()).not.toContain('/dashboard');
  });
});