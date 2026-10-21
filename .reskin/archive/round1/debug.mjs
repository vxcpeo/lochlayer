import { chromium } from 'playwright-core';

const exe = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
import fs from 'node:fs';
const candidates = [exe, 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'];
const found = candidates.find((p) => fs.existsSync(p));
const browser = await chromium.launch({ headless: true, executablePath: found, args: ['--no-sandbox', '--hide-scrollbars'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('console', (m) => { if (m.type() === 'error') console.log('CONSOLE', m.text()); });
await page.goto('http://127.0.0.1:4319/', { waitUntil: 'networkidle' });

const info = await page.evaluate(() => {
  const isVisible = (el) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const buttons = [...document.querySelectorAll('button')]
    .filter(isVisible)
    .map((b) => ({ text: (b.innerText || '').trim().slice(0, 30), cls: b.className, label: b.getAttribute('aria-label'), html: b.innerHTML.slice(0, 90) }))
    .filter((b) => !b.text && !b.label);
  const fits = [...document.querySelectorAll('.rd-fit')].slice(0, 6).map((f) => ({
    cls: f.className,
    display: getComputedStyle(f).display,
    width: Math.round(f.getBoundingClientRect().width),
    kids: f.children.length,
    visible: [...f.children].filter(isVisible).map((c) => c.getAttribute('data-w')),
    kidDisplay: [...f.children].slice(0, 3).map((c) => getComputedStyle(c).display),
  }));
  const summary = document.querySelector('.rd-example > summary');
  const sumStyle = summary ? { color: getComputedStyle(summary).color, bg: getComputedStyle(summary.parentElement).backgroundColor } : null;
  return { buttons, fits, sumStyle, scanReportWidth: Math.round(document.querySelector('#scan-report')?.getBoundingClientRect().width || 0) };
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
