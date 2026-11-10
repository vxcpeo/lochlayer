import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto('http://localhost:4273/privacy', { waitUntil: 'networkidle' });
await p.locator('.cb-bar__inner').screenshot({ path: '.reskin/review/bar.png' });
await p.locator('.cb-spine').screenshot({ path: '.reskin/review/rail.png' });
const tools = await p.evaluate(() => {
  const t = document.querySelector('.cb-tools');
  return t ? Array.from(t.children).map((c) => c.tagName + '.' + c.className + ' :: ' + (c.textContent || '').trim().slice(0, 40)) : null;
});
console.log(JSON.stringify(tools, null, 1));
await b.close();
