import { test, expect } from '@playwright/test';

test('landing page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/dice/i);
});

test('navigates to game board', async ({ page }) => {
  await page.goto('/');
  const playButton = page.getByRole('link', { name: /play|start|game/i }).first();
  await playButton.click();
  await expect(page).toHaveURL(/\/game/);
});
