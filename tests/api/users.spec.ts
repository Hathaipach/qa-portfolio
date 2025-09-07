import { test, expect, request } from '@playwright/test'


const API_BASE_URL = process.env.API_BASE_URL || 'https://dummyjson.com'


test('get users returns list with required fields', async ({ }) => {
const context = await request.newContext({ baseURL: API_BASE_URL })
const res = await context.get('/users?limit=5')
expect(res.ok()).toBeTruthy()
const body = await res.json()
expect(Array.isArray(body.users)).toBeTruthy()
for (const u of body.users) {
expect(u).toHaveProperty('id')
expect(u).toHaveProperty('firstName')
expect(u).toHaveProperty('email')
}
})