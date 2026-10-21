// Side-by-side comparison sheets: baseline | current, scaled to a common height.
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(new URL('./package.json', import.meta.url));
const { chromium } = require('playwright-core');

const pairs = process.argv.slice(2); // name:baseline:current ...
const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
const page = await browser.newPage({ viewport: { width: 2400, height: 1400 } });

for (const pair of pairs) {
  const [name, basePath, curPath] = pair.split('|');
  const base = (await fs.readFile(basePath)).toString('base64');
  const cur = (await fs.readFile(curPath)).toString('base64');
  await page.setContent(`
    <style>
      body{margin:0;background:#0b0f14;font:600 22px/1.2 "Segoe UI",sans-serif;color:#dbe4ee}
      .row{display:flex;gap:18px;padding:18px;align-items:flex-start}
      figure{margin:0;display:flex;flex-direction:column;gap:8px;width:50%}
      figcaption{color:#9fb2c6;font:600 18px/1.2 "Segoe UI",sans-serif;letter-spacing:.08em;text-transform:uppercase}
      img{width:100%;display:block;border:1px solid #263747}
    </style>
    <div class="row">
      <figure><figcaption>Before — bento canvas</figcaption><img src="data:image/png;base64,${base}"></figure>
      <figure><figcaption>After — command rail</figcaption><img src="data:image/png;base64,${cur}"></figure>
    </div>`);
  await page.waitForTimeout(200);
  const out = path.join('.reskin', 'review', `compare-${name}.png`);
  await page.screenshot({ path: out, fullPage: true });
  console.log('wrote', out);
}
await browser.close();
