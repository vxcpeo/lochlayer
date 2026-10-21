import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4318/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
const result = await page.evaluate(() => {
  const h1 = document.querySelector('h1');
  const nodes = [];
  const walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    const cs = getComputedStyle(parent);
    const rect = parent.getBoundingClientRect();
    nodes.push({
      text: node.nodeValue,
      parent: parent.tagName + '.' + parent.className,
      display: cs.display,
      visibility: cs.visibility,
      opacity: cs.opacity,
      rect: { width: rect.width, height: rect.height },
    });
  }
  return nodes;
});
console.log(JSON.stringify(result, null, 1));
await browser.close();
