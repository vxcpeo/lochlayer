import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:4273/install', { waitUntil: 'networkidle' });
const info = await p.evaluate(() => {
  const stage = document.querySelector('.cb-install-stage');
  const proc = document.querySelector('.cb-procedure');
  const entry = document.querySelector('.cb-procedure__entry');
  const content = document.querySelector('.cb-procedure__content');
  const cs = (el) => el ? { w: Math.round(el.getBoundingClientRect().width), x: Math.round(el.getBoundingClientRect().x), display: getComputedStyle(el).display, cols: getComputedStyle(el).gridTemplateColumns, gc: getComputedStyle(el).gridColumn, minw: getComputedStyle(el).minWidth } : null;
  return { stage: cs(stage), proc: cs(proc), entry: cs(entry), content: cs(content), procClass: proc?.className, parentClass: proc?.parentElement?.className };
});
console.log(JSON.stringify(info, null, 1));
await b.close();
