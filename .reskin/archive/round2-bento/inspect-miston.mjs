import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4318/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
const rows = await page.evaluate(() => {
  const out = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    if (!parent || !/Miston/.test(node.nodeValue || '')) continue;
    const cs = getComputedStyle(parent);
    const rect = parent.getBoundingClientRect();
    const visible = cs.display !== 'none' && cs.visibility !== 'hidden' && Number.parseFloat(cs.opacity) >= 0.06 && rect.width > 0 && rect.height > 0;
    out.push({
      visible,
      text: (node.nodeValue || '').trim().slice(0, 120),
      parent: parent.tagName + '.' + String(parent.className).slice(0, 50),
      section: parent.closest('section')?.className.slice(0, 40) || '',
    });
  }
  return out;
});
console.log(JSON.stringify(rows, null, 1));
await browser.close();
