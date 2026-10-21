import { chromium } from 'playwright-core';
import fs from 'node:fs';

fs.mkdirSync('.reskin/review', { recursive: true });

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});

async function shot(path, file, viewport = { width: 1440, height: 900 }, selector = null) {
  const page = await browser.newPage({ viewport });
  await page.goto(`http://localhost:4318${path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  if (selector) {
    await page.locator(selector).first().screenshot({ path: file });
  } else {
    await page.screenshot({ path: file, fullPage: true });
  }
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    height: document.documentElement.scrollHeight,
  }));
  console.log(file, metrics);
  await page.close();
}

await shot('/', '.reskin/review/home-full.png');
await shot('/verify', '.reskin/review/verify.png');
await shot('/install', '.reskin/review/install.png');
await shot('/privacy', '.reskin/review/privacy.png');
await shot('/', '.reskin/review/home-mobile.png', { width: 390, height: 844 });
await shot('/verify', '.reskin/review/verify-mobile.png', { width: 390, height: 844 });
await shot('/', '.reskin/review/cautions.png', { width: 1440, height: 900 }, '#cautions');
await shot('/docs', '.reskin/review/docs-full.png');
await browser.close();
