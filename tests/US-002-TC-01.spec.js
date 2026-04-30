import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const testData = JSON.parse(readFileSync(join(__dirname, '../fixtures/test-data.json'), 'utf8'));

/**
 * @tcId US-002-TC-01
 * @requirement US-002
 * @priority High
 */
test.describe('Login Page', () => {
  test('US-002-TC-01 - User cannot log in with an unknown username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Preconditions: User is on the Login Page
    await loginPage.goto();
    await expect(loginPage.isLoaded()).toBe(true);

    // Steps: 1. Enter username incorrectUser | 2. Enter password Password123 | 3. Click Submit
    await loginPage.login('incorrectUser', 'Password123');

    // Expected: An error message becomes visible and the page URL does not change
    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page.url()).toBe('https://practicetestautomation.com/practice-test-login/');
  });
});