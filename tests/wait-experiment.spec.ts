import { test, expect } from '@playwright/test';
import { USERS } from './data';

test('login with automatic waiting', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-test="username"]').fill(USERS.slow.username);
  await page.locator('[data-test="password"]').fill(USERS.slow.password);
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory/);
});