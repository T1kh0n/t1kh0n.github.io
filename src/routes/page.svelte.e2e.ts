import { expect, test } from '@playwright/test';

const BASE = process.env.BASE_PATH || '';

test('has expected h1', async ({ page }) => {
	await page.goto(`${BASE}/`);
	await expect(page.locator('h1')).toBeVisible();
});
