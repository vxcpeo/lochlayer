/* Build side-by-side comparison sheets: baseline (left) vs reskinned (right). */
import { chromium } from 'playwright-core';
import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = path.resolve('.reskin/review');
await fs.mkdir(outDir, { recursive: true });

const routes = [
  ['home', 'home-desktop.png'],
  ['docs', 'docs-desktop.png'],
  ['install', 'install-desktop.png'],
  ['privacy', 'privacy-desktop.png'],
  ['verify', 'verify-desktop.png'],
];

const fileUrl = (p) => `file:///${process.cwd().replace(/\\/g, '/')}/${p}`;

const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage({ viewport: { width: 1680, height: 2200 }, deviceScaleFactor: 1 });

for (const [name, file] of routes) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    * { box-sizing: border-box; }
    body { margin: 0; background: #d8d2c4; font: 12px/1.3 "Segoe UI", sans-serif; }
    .sheet { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; padding: 18px; }
    .col { display: grid; gap: 8px; }
    .cap { display: flex; justify-content: space-between; color: #12141a; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; padding-inline: 2px; }
    .cap span:last-child { color: #0000ff; }
    .shot { height: 2040px; overflow: hidden; border: 1px solid #9c9481; background: #fbfaf6; }
    .shot img { display: block; width: 100%; }
  </style></head><body>
    <div class="sheet">
      <div class="col"><div class="cap"><span>Before · ${name}</span><span>Bento canvas</span></div>
        <div class="shot"><img src="${fileUrl('.reskin/baseline/' + file)}"></div></div>
      <div class="col"><div class="cap"><span>After · ${name}</span><span>Cobalt blueprint</span></div>
        <div class="shot"><img src="${fileUrl('.reskin/current/' + file)}"></div></div>
    </div>
  </body></html>`;

  const tmp = path.join(outDir, `_${name}.html`);
  await fs.writeFile(tmp, html, 'utf8');
  await page.goto(`file:///${tmp.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(outDir, `compare-${name}.png`), fullPage: true });
  console.log(`compare-${name}.png`);
  await fs.unlink(tmp);
}

await browser.close();
