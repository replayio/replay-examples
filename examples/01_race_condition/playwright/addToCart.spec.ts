import { test, expect } from '@playwright/test';

test('adds a product to cart (failed)', async ({ page }) => {
  
  await page.goto('/');
  await page.getByText('Add to Cart').click()
  const message = page.getByText('Product added to cart!')
  await expect(message).toBeVisible()

});