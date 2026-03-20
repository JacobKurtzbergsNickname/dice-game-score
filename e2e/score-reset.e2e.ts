import { expect, test } from '@playwright/test';

test.describe('Score reset logic', () => {
  test.beforeEach(async ({ page }) => {
    // Block external fonts that are unreachable in CI/offline environments
    await page.route('**/fonts.googleapis.com/**', (route) => route.abort());
    await page.route('**/fonts.gstatic.com/**', (route) => route.abort());
    await page.goto('/game', { waitUntil: 'commit' });
    await page.waitForSelector('pairodice-actual-score');
  });

  async function enterScore(page: import('@playwright/test').Page, value: number) {
    const input = page.locator('pairodice-actual-score input[type="number"]').first();
    await input.fill(String(value));
    await input.press('Enter');
    // Wait for the input to clear after score is processed
    await input.waitFor({ state: 'attached' });
    await page.waitForTimeout(50);
  }

  async function getScore(page: import('@playwright/test').Page): Promise<number> {
    const scoreText = await page.locator('pairodice-actual-score .text-2xl').first().textContent();
    return parseInt(scoreText?.trim() ?? '0', 10);
  }

  async function getChips(page: import('@playwright/test').Page): Promise<string[]> {
    const chips = page.locator('pairodice-actual-score .score-chip');
    const count = await chips.count();
    const texts: string[] = [];
    for (let i = 0; i < count; i++) {
      texts.push((await chips.nth(i).textContent())?.trim() ?? '');
    }
    return texts;
  }

  test('score accumulates for non-zero entries', async ({ page }) => {
    await enterScore(page, 5);
    await enterScore(page, 10);
    await enterScore(page, 3);

    expect(await getScore(page)).toBe(18);
  });

  test('three consecutive zeros reset score to zero', async ({ page }) => {
    await enterScore(page, 10);
    await enterScore(page, 5);
    await enterScore(page, 0);
    await enterScore(page, 0);
    await enterScore(page, 0);

    expect(await getScore(page)).toBe(0);
  });

  test('score continues after reset when non-zero entry is added', async ({ page }) => {
    await enterScore(page, 10);
    await enterScore(page, 0);
    await enterScore(page, 0);
    await enterScore(page, 0);
    await enterScore(page, 7);

    expect(await getScore(page)).toBe(7);
  });

  test('one zero after a reset does not cause a second reset', async ({ page }) => {
    await enterScore(page, 5);
    await enterScore(page, 0);
    await enterScore(page, 0);
    await enterScore(page, 0);
    // score is now reset to 0; rebuild
    await enterScore(page, 8);
    expect(await getScore(page)).toBe(8);

    // one zero after rebuild — must NOT reset
    await enterScore(page, 0);
    expect(await getScore(page)).toBe(8);
  });

  test('two zeros after a reset do not cause a second reset', async ({ page }) => {
    await enterScore(page, 5);
    await enterScore(page, 0);
    await enterScore(page, 0);
    await enterScore(page, 0);
    await enterScore(page, 8);

    await enterScore(page, 0);
    await enterScore(page, 0);
    expect(await getScore(page)).toBe(8);
  });

  test('three zeros after a reset cause a second reset', async ({ page }) => {
    await enterScore(page, 5);
    await enterScore(page, 0);
    await enterScore(page, 0);
    await enterScore(page, 0);
    await enterScore(page, 8);

    await enterScore(page, 0);
    await enterScore(page, 0);
    await enterScore(page, 0);
    expect(await getScore(page)).toBe(0);
  });

  test('two zeros separated by non-zero do not accumulate for reset', async ({ page }) => {
    await enterScore(page, 10);
    await enterScore(page, 0);
    await enterScore(page, 0);
    await enterScore(page, 5); // breaks the streak
    await enterScore(page, 0);
    await enterScore(page, 0);

    // only 2 consecutive zeros — no reset
    expect(await getScore(page)).toBe(15);
  });

  test('"NIX! NIX! NIX!" chip only appears on the third consecutive zero', async ({ page }) => {
    await enterScore(page, 5);
    await enterScore(page, 0);
    await enterScore(page, 0);
    await enterScore(page, 0); // third zero — reset chip expected

    const chips = await getChips(page);
    // last chip (the third zero) should be the critical reset chip
    expect(chips.at(-1)).toContain('NIX');
    // the first two zero-chips should not say NIX
    expect(chips[1]).not.toContain('NIX');
    expect(chips[2]).not.toContain('NIX');
  });

  test('first zero after rebuild does not show reset chip', async ({ page }) => {
    await enterScore(page, 5);
    await enterScore(page, 0);
    await enterScore(page, 0);
    await enterScore(page, 0);
    // rebuild
    await enterScore(page, 7);
    // first zero in new sequence
    await enterScore(page, 0);

    const chips = await getChips(page);
    // the last chip (single zero after rebuild) must NOT say NIX
    expect(chips.at(-1)).not.toContain('NIX');
  });
});
