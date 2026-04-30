import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const testData = JSON.parse(readFileSync(join(__dirname, '../fixtures/test-data.json'), 'utf8'));

/**
 * @tcId US-006-TC-01
 * @requirement US-006
 * @priority Medium
 */
test.describe('Login Page', () => {
  test('US-006-TC-01 - Verify Username input is present and enabled', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Step: Navigate to the Login Page
    await loginPage.goto(testData.navigationUrl);

    // Step: Verify Username input (#username) is present
    await expect(loginPage.getUsernameInput()).toBeVisible();

    // Step: Verify Username input (#username) is enabled
    await expect(loginPage.getUsernameInput()).toBeEnabled();
  });
});