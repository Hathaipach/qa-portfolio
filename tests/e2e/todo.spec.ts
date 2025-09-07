import { test, expect } from '@playwright/test';

test('user can add and complete a todo', async ({ page }) => {
  await page.goto('#/', { waitUntil: 'domcontentloaded' });
  const input = page.locator('input.new-todo');
  await input.waitFor({ state: 'visible', timeout: 10000 }); // กัน DOM ช้า
  await expect(input).toBeVisible();
  await input.fill('Write portfolio project');
  await page.keyboard.press('Enter');
  const todo = page.locator('.todo-list li').last();
  await expect(todo).toContainText('Write portfolio project');
  await todo.locator('input.toggle').check();
  await expect(todo).toHaveClass(/completed/);
});
