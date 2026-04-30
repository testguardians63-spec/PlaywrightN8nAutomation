import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const testData = JSON.parse(readFileSync(join(__dirname, '../fixtures/test-data.json'), 'utf8'));

/**
 * @tcId US-004-TC-01
 * @requirement US-004
 * @priority Medium
 */
test.describe('Login Page', () => {
  test('US-004-TC-01 - User submits login form with both fields empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Preconditions: User is on the Login Page
    await loginPage.goto(testData.navigationUrl);
    await expect(loginPage.isLoaded()).toBe(true);

    // Steps
    await loginPage.login('', '');

    // Expected
    await expect(page.url()).toBe(testData.navigationUrl);
    await expect(loginPage.isLoaded()).toBe(true);
  });
});