import { test, expect } from '@playwright/test';
import { USERS } from './data';

test.describe('Variant 4 - Cart button state', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    await page.locator('[data-test="username"]').fill(USERS.standard.username);
    await page.locator('[data-test="password"]').fill(USERS.standard.password);
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory/);
  });

  test('Add to cart button changes to Remove', async ({ page }) => {
    const button = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    );

    await button.click();

    await expect(
      page.locator('[data-test="remove-sauce-labs-backpack"]')
    ).toHaveText('Remove');
  });

  test('Button remains Remove after returning from cart', async ({ page }) => {
    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    await page.locator('.shopping_cart_link').click();

    await expect(page).toHaveURL(/cart/);

    await page.locator('[data-test="continue-shopping"]').click();

    await expect(page).toHaveURL(/inventory/);

    await expect(
      page.locator('[data-test="remove-sauce-labs-backpack"]')
    ).toHaveText('Remove');
  });
});