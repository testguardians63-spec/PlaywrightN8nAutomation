import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const testData = JSON.parse(readFileSync(join(__dirname, '../fixtures/test-data.json'), 'utf8'));

/**
 * @tcId US-005-TC-05
 * @requirement US-005
 * @priority Medium
 */
test.describe('Success Page', () => {
  test('US-005-TC-05 - Log out control is visible with minimum length username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Step 1: Navigate to the login page
    await loginPage.goto(testData.navigationUrl);

    // Step 2: Enter minimum length username and password
    await loginPage.login(testData.testDataRows[0].testValue, testData.testDataRows[1].testValue);

    // Step 3: Verify that the 'Log out' button is visible
    expect(await loginPage.isLogoutButtonVisible()).toBe(true);
  });
});