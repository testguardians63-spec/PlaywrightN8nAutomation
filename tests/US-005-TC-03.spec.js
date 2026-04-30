import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const testData = JSON.parse(readFileSync(join(__dirname, '../fixtures/test-data.json'), 'utf8'));

test.describe('Success Page', () => {
  test('US-005-TC-03 - Log out control is not visible on the login page', async ({ page }) => {
    const data = testData['US-005-TC-03'];
    const loginPage = new LoginPage(page);

    // Preconditions: User is on the login page
    await loginPage.goto(data.navigationUrl);
    await expect(loginPage.isLoaded()).toBe(true);

    // Steps: Navigate to the login page | Verify that the 'Log out' button is not visible
    await loginPage.login(data.credentialsUsed.username, data.credentialsUsed.password);

    // Expected: The 'Log out' button is not visible on the login page
    await expect(loginPage.isLogoutButtonVisible()).toBe(false);
  });
});
