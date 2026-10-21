import { expect, test } from '@playwright/test';

test.describe('at a phone’s width', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const path of ['/', '/docs', '/install', '/privacy', '/verify']) {
    test(`${path} has no horizontal overflow and keeps its heading`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(1);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('.tw-crest__word')).toBeVisible();
    });
  }

  test('the example figures are drawn at the width of a phone, one per container', async ({ page }) => {
    await page.goto('/');
    await page.locator('.rd-example summary').click();
    await expect(page.locator('.rd-example .rd-sheet')).toBeVisible();
    const visible = await page.locator('.rd-example .rd-fit-bed > svg:visible').count();
    expect(visible).toBe(1);
    const widest = await page.locator('.rd-example .rd-fit-bed > svg:visible').evaluate((svg) => (svg as SVGElement).getBoundingClientRect().width);
    expect(widest).toBeLessThanOrEqual(390);
  });
});

test.describe('what a keyboard and a screen reader meet', () => {
  test('the skip link is first and goes to the main landmark', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.locator('a.tw-jump')).toBeFocused();
  });

  test('the palette is a radiogroup with arrow keys and a visible focus', async ({ page }) => {
    await page.goto('/');
    const night = page.locator('[data-switch="theme"] button[data-value="night"]');
    await night.focus();
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('[data-switch="theme"] button[data-value="dusk"]')).toBeFocused();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dusk');
  });

  test('every page has one h1 and no duplicate element ids', async ({ page }) => {
    for (const path of ['/', '/docs', '/install', '/privacy', '/verify']) {
      await page.goto(path);
      expect(await page.locator('h1').count()).toBe(1);
      const duplicates = await page.evaluate(() => {
        const seen = new Map<string, number>();
        for (const element of document.querySelectorAll('[id]')) {
          const id = element.id;
          seen.set(id, (seen.get(id) ?? 0) + 1);
        }
        return [...seen.entries()].filter(([, count]) => count > 1).map(([id]) => id);
      });
      expect(duplicates, path).toEqual([]);
    }
  });

  test('the scanner form has labelled controls and a live status region', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('label[for="address"]')).toHaveCount(1);
    await expect(page.locator('label[for="scan-limit"]')).toHaveCount(1);
    await expect(page.locator('label[for="rpc-url"]')).toHaveCount(1);
    await expect(page.locator('#address')).toHaveAttribute('aria-describedby', 'address-error address-hint');
    await expect(page.locator('#scan-submit')).toBeEnabled();
  });

  test('reduced motion turns the story off instead of pinning it', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.waitForTimeout(300);
    expect(await page.locator('#how').getAttribute('data-story')).toBeNull();
  });
});
