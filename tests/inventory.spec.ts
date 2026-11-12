import { test, expect } from '@playwright/test';
import { USERS } from './data';

test.describe('Swag Labs - Inventory', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    await page.locator('[data-test="username"]').fill(USERS.standard.username);
    await page.locator('[data-test="password"]').fill(USERS.standard.password);
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory/);
  });

  test('should display six products', async ({ page }) => {
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test('should sort products by price from low to high', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    const prices = await page.locator('.inventory_item_price').allTextContents();

    const numericPrices = prices.map(price =>
      Number(price.replace('$', ''))
    );

    expect(numericPrices).toEqual([...numericPrices].sort((a, b) => a - b));
  });

  test('should add backpack to cart', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('should remove bike light from cart', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();

    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });
});