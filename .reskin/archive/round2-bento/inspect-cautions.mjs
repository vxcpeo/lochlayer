import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4318/', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
const info = await page.evaluate(() => {
  const rect = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      tag: el.tagName,
      cls: String(el.className).slice(0, 80),
      x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
      display: cs.display,
      gridTemplateColumns: cs.gridTemplateColumns,
      gridArea: cs.gridArea,
      gridColumn: cs.gridColumn,
    };
  };
  const section = document.querySelector('#cautions');
  const head = section?.querySelector('.bp-chapter__head');
  const title = section?.querySelector('.bp-chapter__title');
  const lede = section?.querySelector('.bp-chapter__lede');
  const kicker = section?.querySelector('.bp-chapter__kicker');
  return {
    section: rect(section),
    head: rect(head),
    headChildren: [...(head?.children || [])].map(rect),
    title: rect(title),
    lede: rect(lede),
    kicker: rect(kicker),
    body: rect(section?.querySelector('.bp-chapter__body')),
  };
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
