import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4318/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
const buttons = await page.$$eval('button', (els) =>
  els.map((el) => {
    const style = getComputedStyle(el);
    return {
      text: el.innerText,
      aria: el.getAttribute('aria-label'),
      title: el.getAttribute('title'),
      visible: Boolean(el.offsetWidth || el.offsetHeight) && style.visibility !== 'hidden',
      cls: el.className,
      html: el.outerHTML.slice(0, 180),
    };
  }),
);
console.log(JSON.stringify(buttons, null, 1));
await page.screenshot({ path: '.reskin/current/inspect-home.png', fullPage: false });
await browser.close();

