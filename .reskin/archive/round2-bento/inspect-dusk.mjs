import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4318/?theme=dusk', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
const info = await page.evaluate(() => ({
  theme: document.documentElement.getAttribute('data-theme'),
  bodyBg: getComputedStyle(document.body).backgroundColor,
  canvasVar: getComputedStyle(document.documentElement).getPropertyValue('--bp-canvas'),
  checked: [...document.querySelectorAll('[role="radio"]')].map((el) => ({ text: el.textContent, checked: el.getAttribute('aria-checked') })),
}));
console.log(JSON.stringify(info, null, 1));
await browser.close();
