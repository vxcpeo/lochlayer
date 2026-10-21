import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4318/verify', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
const info = await page.evaluate(() => {
  const rect = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      tag: el.tagName,
      cls: String(el.className).slice(0, 90),
      x: Math.round(r.x),
      y: Math.round(r.y),
      w: Math.round(r.width),
      h: Math.round(r.height),
      display: cs.display,
      gridColumn: cs.gridColumn,
      gridTemplateColumns: cs.gridTemplateColumns,
    };
  };
  const pageSection = document.querySelector('.bp-page--verify');
  const out = {
    pageSection: rect(pageSection),
    children: [...(pageSection?.children || [])].map(rect),
    backLink: rect(document.querySelector('.bp-verify__form')?.parentElement?.querySelector('.bp-actions')),
    backParents: [],
  };
  let node = document.querySelector('.bp-page--verify p.bp-actions:last-of-type');
  while (node && node !== document.body) {
    out.backParents.push(rect(node));
    node = node.parentElement;
  }
  return out;
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
