import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4318/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
const info = await page.evaluate(() => {
  const el = document.querySelector('.bp-mirror__water');
  if (!el) return { missing: true };
  const cs = getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  const parent = el.parentElement;
  return {
    text: el.textContent,
    innerText: el.innerText,
    display: cs.display,
    visibility: cs.visibility,
    opacity: cs.opacity,
    fontSize: cs.fontSize,
    color: cs.color,
    rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
    parentTag: parent?.tagName,
    parentDisplay: parent ? getComputedStyle(parent).display : null,
    parentRect: parent ? (({ x, y, width, height }) => ({ x, y, width, height }))(parent.getBoundingClientRect()) : null,
    bodyHasText: document.body.innerText.includes('The Miston is not.'),
    h1Text: document.querySelector('h1')?.innerText,
  };
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
