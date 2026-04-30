import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const testData = JSON.parse(readFileSync(join(__dirname, '../fixtures/test-data.json'), 'utf8'));

/**
 * @tcId US-001-TC-04
 * @requirement US-001
 * @priority High
 */
test.describe('Success Page', () => {
  test('US-001-TC-04 - Success page URL is correct', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Preconditions: User is on the Success Page
    await loginPage.goto(testData.navigationUrl);
    await loginPage.login(testData.credentialsUsed.username, testData.credentialsUsed.password);

    // Steps: 1. Navigate to /logged-in-successfully/
    await loginPage.goto('/logged-in-successfully/');

    // Expected: The current URL contains 'practicetestautomation.com/logged-in-successfully/'
    expect(page.url()).toContain('practicetestautomation.com/logged-in-successfully/');
  });
});