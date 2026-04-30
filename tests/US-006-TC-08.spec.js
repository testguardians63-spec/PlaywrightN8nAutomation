import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const testData = JSON.parse(readFileSync(join(__dirname, '../fixtures/test-data.json'), 'utf8'));

/**
 * @tcId US-006-TC-08
 * @requirement US-006
 * @priority Low
 */
test.describe('Login Page', () => {
  test('US-006-TC-08 - Verify Page title is correct', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Steps
    await loginPage.goto();
    await expect(page).toHaveTitle('Test Login');
  });
});