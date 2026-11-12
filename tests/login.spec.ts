import { test, expect } from '@playwright/test';
import { USERS } from './data';

test.describe('Swag Labs - Login', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    await page.goto('/');

    await page.locator('[data-test="username"]').fill(USERS.standard.username);
    await page.locator('[data-test="password"]').fill(USERS.standard.password);
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('should show error for locked out user', async ({ page }) => {
    await page.goto('/');

    await page.locator('[data-test="username"]').fill(USERS.locked.username);
    await page.locator('[data-test="password"]').fill(USERS.locked.password);
    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Sorry, this user has been locked out');
  });

  test('should show error when credentials are empty', async ({ page }) => {
    await page.goto('/');

    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Username is required');
  });
});