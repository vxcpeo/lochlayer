import { expect, test } from '@playwright/test';

const SECTIONS = ['#how', '#scanner', '#private', '#cautions'];
const ADDRESS = 'Fh3qJ5iBgbd24itfu7gbvo8XVHLjnNhA6aNEPnnNTz8K';

test.describe('the start page', () => {
  test('is the page the reference serves: title, headline, sections, footer', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Miston: a shielded balance inside your Solana wallet');
    await expect(page.locator('h1')).toContainText('Your wallet is public.');
    await expect(page.locator('h1')).toContainText('The Miston is not.');
    for (const section of SECTIONS) await expect(page.locator(section)).toBeVisible();
    await expect(page.locator('.ab-btn--soon')).toContainText('Coming soon');
    await expect(page.locator('a[href*="chromewebstore"]')).toHaveCount(0);
    await expect(page.locator('footer .tw-foot__token')).toContainText('CYGidBuS8WwUXfZCmb98LnLGL9Mx8SvhdqA6t3xTLoch');
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', '/media/favicon.svg');
  });

  test('shows the extension popup with the example balance', async ({ page }) => {
    await page.goto('/');
    const popup = page.locator('.tw-plate .tw-device');
    await expect(popup).toContainText('Public balance');
    await expect(popup).toContainText('41.207');
    await expect(popup).toContainText('Shielded balance');
    await expect(popup.locator('.tw-device__bath')).toContainText('12.480');
    await expect(popup).toContainText('Dived in');
  });

  test('opens the example leak report with its figures', async ({ page }) => {
    await page.goto('/');
    await page.locator('.rd-example summary').click();
    const report = page.locator('.rd-example .rd-sheet');
    await expect(report).toBeVisible();
    await expect(report.locator('.rd-flag')).toHaveText('Example report');
    await expect(report.locator('.rd-score-figure')).toContainText('49');
    await expect(report.locator('.rd-row')).toHaveCount(7);
    await expect(report.locator('.rd-fit svg')).toHaveCount(17);
    // The container query shows exactly one drawing per figure.
    const visible = await report.locator('.rd-fit-bed > svg:visible').count();
    expect(visible).toBe(1);
  });

  test('keeps the palette the visitor picked, across a reload', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'night');
    await page.locator('[data-switch="theme"] button[data-value="dusk"]').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dusk');
    expect(await page.evaluate(() => localStorage.getItem('miston:theme'))).toBe('dusk');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dusk');
    await expect(page.locator('[data-switch="theme"] button[data-value="dusk"]')).toHaveAttribute('aria-checked', 'true');
  });

  test('serves ?theme= without saving it', async ({ page }) => {
    await page.goto('/?theme=dusk');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dusk');
    expect(await page.evaluate(() => localStorage.getItem('miston:theme'))).toBeNull();
  });

  test('has one narrowed security policy, put there by the page itself', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('meta[http-equiv="Content-Security-Policy"]')).toHaveCount(2);
    const narrow = await page.locator('meta[http-equiv="Content-Security-Policy"][data-miston-policy]').getAttribute('content');
    expect(narrow).toContain("connect-src 'self' https://rpc.miston.xyz https://waitlist.miston.xyz");
    expect(narrow).toContain("default-src 'self'");
    expect(narrow).not.toContain('https: http://localhost');
    await expect(page.locator('html')).toHaveAttribute('data-js', '');
  });

  test('loads nothing from anyone else', async ({ page }) => {
    const foreign: string[] = [];
    page.on('request', (request) => {
      const url = request.url();
      if (!url.startsWith('http://localhost:4273') && !url.startsWith('data:')) foreign.push(url);
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(foreign).toEqual([]);
  });

  test('has no console errors and no horizontal overflow', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});

test.describe('the leak scanner', () => {
  test('refuses an address that is not one, before sending anything', async ({ page }) => {
    const requests: string[] = [];
    page.on('request', (request) => {
      if (request.url().includes('rpc.miston.xyz')) requests.push(request.url());
    });
    await page.goto('/');
    await page.fill('#address', 'not-an-address');
    await page.click('#scan-submit');
    await expect(page.locator('#address-error')).toHaveText(/That is not a Solana address/);
    await expect(page.locator('#address')).toHaveAttribute('aria-invalid', 'true');
    expect(requests).toEqual([]);
  });

  test('asks for an address first', async ({ page }) => {
    await page.goto('/');
    await page.click('#scan-submit');
    await expect(page.locator('#address-error')).toHaveText('Paste the address of the wallet to scan. Nothing has been sent.');
  });

  test('says the RPC did not answer when the endpoint is unreachable, and offers the next step', async ({ page }) => {
    await page.route('https://rpc.miston.xyz/**', (route) => route.abort());
    await page.goto('/');
    await page.fill('#address', ADDRESS);
    await page.click('#scan-submit');
    const failure = page.locator('#scan-failure');
    await expect(failure).toBeVisible({ timeout: 30_000 });
    await expect(failure.locator('.tw-fail__title')).toContainText('The RPC did not answer');
    await expect(failure).toContainText('No reply came back from rpc.miston.xyz.');
    await expect(failure.locator('.tw-cluster')).toContainText('Scan again');
    await expect(failure.locator('.tw-cluster')).toContainText('Use your own RPC');
    expect(await failure.getAttribute('data-reason')).toBe('unreachable');
  });

  test('validates a saved endpoint before it takes it', async ({ page }) => {
    await page.goto('/');
    await page.locator('#rpc-own summary').click();
    await page.fill('#rpc-url', 'http://remote.example.com');
    await page.click('#rpc-save');
    await expect(page.locator('#rpc-error')).toContainText('Use an https address.');
    expect(await page.evaluate(() => localStorage.getItem('miston:rpc'))).toBeNull();
  });
});
