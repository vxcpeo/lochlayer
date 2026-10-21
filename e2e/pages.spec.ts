import { expect, test } from '@playwright/test';

const PAGES = [
  { path: '/docs', title: 'Technical docs: how the Velaira keeps a payment private', heading: 'How the Velaira keeps a payment private.' },
  { path: '/install', title: 'Install Velaira: get the extension', heading: 'Install Velaira.' },
  { path: '/privacy', title: 'Privacy: what the Velaira site and extension keep', heading: 'What this site keeps.' },
  { path: '/verify', title: 'Check a Velaira receipt, report or viewing key', heading: 'Check what you were given.' },
];

test.describe('the pages', () => {
  for (const item of PAGES) {
    test(`${item.path} has its title, one heading and its main landmark`, async ({ page }) => {
      await page.goto(item.path);
      await expect(page).toHaveTitle(item.title);
      await expect(page.locator('h1')).toHaveText(item.heading);
      await expect(page.locator('main#main')).toBeVisible();
      await expect(page.locator('a.tw-jump')).toHaveAttribute('href', '#main');
      const h1s = await page.locator('h1').count();
      expect(h1s).toBe(1);
    });
  }

  test('the docs page has a contents list that reaches every section', async ({ page }) => {
    await page.goto('/docs');
    const toc = page.locator('.tw-doc__toc a');
    await expect(toc).toHaveCount(18);
    for (const href of await toc.evaluateAll((links) => links.map((link) => link.getAttribute('href')))) {
      await expect(page.locator(`section${href}`)).toHaveCount(1);
    }
    await page.locator('.tw-doc__toc a[href="#nullifiers"]').click();
    await expect(page.locator('#nullifiers')).toBeInViewport();
  });

  test('the install page marks the store release as coming soon and keeps the zip checksum', async ({ page }) => {
    await page.goto('/install');
    await expect(page.locator('.sn-btn--soon')).toContainText('Coming soon');
    await expect(page.locator('a[href*="chromewebstore"]')).toHaveCount(0);
    await expect(page.locator('#download-sha256')).toHaveText('0ee00e059e175874e1b0a4f30f7abcd73f12607d6091d89d2fed06f9d341791e');
  });

  test('the footer carries every way onward, and marks the page you are on', async ({ page }) => {
    await page.goto('/privacy');
    const links = page.locator('.tw-foot__links a');
    await expect(links).toHaveCount(8);
    await expect(page.locator('.tw-foot__links a[href="/privacy"]')).toHaveAttribute('aria-current', 'page');
    await expect(page.locator('.tw-foot__links a[href="/docs"]')).not.toHaveAttribute('aria-current', 'page');
  });
});

test.describe('navigation', () => {
  test('the spine moves between pages without a reload', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => ((window as unknown as { __kept: boolean }).__kept = true));
    await page.locator('.tw-index a[href="/docs"]').click();
    await expect(page).toHaveURL(/\/docs$/);
    await expect(page).toHaveTitle('Technical docs: how the Velaira keeps a payment private');
    expect(await page.evaluate(() => (window as unknown as { __kept?: boolean }).__kept)).toBe(true);
  });

  test('a nav item on a content page goes home to the section', async ({ page }) => {
    await page.goto('/docs');
    await page.locator('.tw-index a[href="/#scanner"]').click();
    await expect(page).toHaveURL(/\/#scanner$/);
    await expect(page.locator('#scanner')).toBeInViewport();
  });

  test('the brand returns to the start page', async ({ page }) => {
    await page.goto('/privacy');
    await page.locator('.tw-crest').click();
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe('the verify page', () => {
  test('asks for a document first', async ({ page }) => {
    await page.goto('/verify');
    await page.click('#verify-submit');
    await expect(page.locator('#verify-error')).toHaveText('Paste a receipt, a report or a viewing key first. Nothing has been sent.');
  });

  test('recognises something that is not a document without asking the chain', async ({ page }) => {
    const rpcCalls: string[] = [];
    page.on('request', (request) => {
      if (request.url().includes('rpc.velaira.xyz')) rpcCalls.push(request.url());
    });
    await page.goto('/verify');
    await page.fill('#verify-input', 'hello');
    await page.click('#verify-submit');
    await expect(page.locator('#verify-result .tw-verify__band-title')).toHaveText('This is not something this page can check.');
    expect(rpcCalls).toEqual([]);
  });

  test('treats a claim link as money, not as something to check', async ({ page }) => {
    await page.goto('/verify');
    await page.fill('#verify-input', 'velairaclaim1abcdef');
    await page.click('#verify-submit');
    await expect(page.locator('#verify-result .tw-verify__band-title')).toHaveText('That is a claim link, not something to check.');
    await expect(page.locator('#verify-result .tw-verify__band')).toContainText('A claim link is money');
  });

  test('says when a receipt cannot be read', async ({ page }) => {
    await page.goto('/verify');
    await page.fill('#verify-input', '{"velaira":"receipt"}');
    await page.click('#verify-submit');
    await expect(page.locator('#verify-result .tw-verify__band-title')).toHaveText('This could not be read.');
  });
});
