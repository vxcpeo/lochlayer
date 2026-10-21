import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4318/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
const result = await page.evaluate(() => {
  const norm = (value) => (value || '').replace(/\s+/g, ' ').trim();
  const isVisible = (el) => {
    if (!el || el.nodeType !== 1) return false;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.visibility === 'collapse') return false;
    if (Number.parseFloat(cs.opacity) < 0.06) return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  };
  const words = new Map();
  const add = (key) => { if (key) words.set(key, (words.get(key) || 0) + 1); };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    if (!parent) continue;
    if (/^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/i.test(parent.tagName)) continue;
    const text = norm(node.nodeValue);
    if (!text || !/[\p{L}\p{N}]/u.test(text)) continue;
    if (!isVisible(parent)) continue;
    for (let token of text.split(/\s+/)) {
      token = token.replace(/^[^\p{L}\p{N}$€£¥#]+/u, '').replace(/[^\p{L}\p{N}%]+$/u, '');
      if (!token || !/[\p{L}\p{N}]/u.test(token)) continue;
      add(token);
    }
  }
  const get = (w) => words.get(w) || 0;
  return {
    The: get('The'), Miston: get('Miston'), is: get('is'), not: get('not'),
    water: (() => {
      const el = document.querySelector('.bp-mirror__water');
      return el ? { visible: isVisible(el), rect: el.getBoundingClientRect().toJSON(), text: el.textContent } : null;
    })(),
    total: [...words.values()].reduce((a, b) => a + b, 0),
  };
});
console.log(JSON.stringify(result, null, 1));
await browser.close();
