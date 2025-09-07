import { test, expect } from '@playwright/test';

test('filters are present and can switch views', async ({ page }) => {
  await page.goto('#/', { waitUntil: 'networkidle' });
  const input = page.locator('input.new-todo');
  await input.waitFor({ state: 'visible', timeout: 15000 });
  await input.fill('Task A'); await page.keyboard.press('Enter');
  await input.fill('Task B'); await page.keyboard.press('Enter');
  const list = page.locator('.todo-list li');
  await expect(list).toHaveCount(2);
  await list.nth(0).locator('input.toggle').check();
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.locator('.todo-list li')).toHaveCount(1);
  await expect(page.locator('.todo-list li')).toHaveClass(/completed/);
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.locator('.todo-list li')).toHaveCount(1);
  await page.getByRole('link', { name: 'All' }).click();
  await expect(page.locator('.todo-list li')).toHaveCount(2);
});
