// tests/api/contracts.spec.ts
import { test, expect } from '@playwright/test';
const API = process.env.API_BASE_URL || 'https://dummyjson.com';

test('contracts API shape is valid', async ({ request }) => {
  const res = await request.get(`${API}/todos?limit=2`);
  expect(res.ok()).toBeTruthy();

  const data = await res.json();
  expect(Array.isArray(data.todos)).toBeTruthy();
  const item = data.todos[0];
  expect.soft(item).toHaveProperty('id');
  expect.soft(item).toHaveProperty('todo');
  expect.soft(item).toHaveProperty('completed');
  expect.soft(item).toHaveProperty('userId');
});
