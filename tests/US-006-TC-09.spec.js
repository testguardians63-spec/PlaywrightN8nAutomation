import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const testData = JSON.parse(readFileSync(join(__dirname, '../fixtures/test-data.json'), 'utf8'));

/**
 * @tcId US-006-TC-09
 * @requirement US-006
 * @priority Medium
 */
test.describe('Login Page', () => {
  test('US-006-TC-09 - Verify Username input is present and enabled', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Preconditions: User is on the Login Page
    await loginPage.goto(testData.navigationUrl);
    await expect(loginPage.isLoaded()).toBe(true);

    // Steps: Verify Username input (#username) is present
    const usernameInput = loginPage.getUsernameInput();
    await expect(usernameInput).toBeVisible();

    // Verify Username input (#username) is enabled
    await expect(usernameInput).toBeEnabled();
  });
});