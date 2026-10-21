// Crops a rectangle out of a PNG: node crop.mjs <file> <x> <y> <w> <h> <out>
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(new URL('../tools/package.json', import.meta.url));
const [file, x, y, w, h, out] = process.argv.slice(2);
const { chromium } = require('playwright-core');
const browser = await chromium.launch({
  executablePath: process.env.RESKIN_CHROME || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
});
const data = fs.readFileSync(file).toString('base64');
const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) } });
await page.setContent(`<body style="margin:0"><img src="data:image/png;base64,${data}" style="position:absolute;left:-${x}px;top:-${y}px;width:auto"></body>`);
await page.screenshot({ path: out });
await browser.close();
console.log('cropped', out);
