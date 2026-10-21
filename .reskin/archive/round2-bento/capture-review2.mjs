import { chromium } from 'playwright-core';
import fs from 'node:fs';

fs.mkdirSync('.reskin/review', { recursive: true });
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});
async function shot(url, file, viewport = { width: 1440, height: 900 }, selector = null, wait = 500) {
  const page = await browser.newPage({ viewport });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(wait);
  if (selector) await page.locator(selector).first().screenshot({ path: file });
  else await page.screenshot({ path: file, fullPage: true });
  console.log(file);
  await page.close();
}
await shot('http://localhost:4318/', '.reskin/review/home-top.png', { width: 1440, height: 900 }, '.bp-lead');
await shot('http://localhost:4318/install', '.reskin/review/install.png');
await shot('http://localhost:4318/privacy', '.reskin/review/privacy.png');
await shot('http://localhost:4318/?theme=dusk', '.reskin/review/home-dusk.png', { width: 1440, height: 900 }, '.bp-lead');
await shot('http://localhost:4318/', '.reskin/review/home-mobile-top.png', { width: 390, height: 844 }, '.bp-lead');
await browser.close();
