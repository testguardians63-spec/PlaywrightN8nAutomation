import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const testData = JSON.parse(readFileSync(join(__dirname, '../fixtures/test-data.json'), 'utf8'));

/**
 * @tcId US-004-TC-02
 * @requirement US-004
 * @priority Medium
 */
test.describe('Login Page', () => {
  test('US-004-TC-02 - User submits login form with only the username filled', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Preconditions: User is on the Login Page
    await loginPage.goto();
    await expect(loginPage.isLoaded()).toBe(true);

    // Steps: 1. Type 'student' into the username field | 2. Leave the password field empty | 3. Click Submit
    await loginPage.login('student', '');

    // Expected: The error element becomes visible with text 'Your password is invalid!'
    await expect(loginPage.getErrorElement()).toBeVisible();
    await expect(loginPage.getErrorElement()).toHaveText('Your password is invalid!');
  });
});