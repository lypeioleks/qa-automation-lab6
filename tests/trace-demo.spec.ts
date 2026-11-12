import { test, expect } from '@playwright/test';
import { USERS } from './data';

test('Trace Viewer demonstration', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-test="username"]').fill(USERS.standard.username);
  await page.locator('[data-test="password"]').fill(USERS.standard.password);
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory/);

  // Навмисно неправильна перевірка для демонстрації помилки
  await expect(page.locator('.title')).toHaveText('Products');
});