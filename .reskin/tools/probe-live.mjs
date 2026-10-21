// Live probe: viewport screenshot plus geometry of the shell.
import fs from 'node:fs';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(new URL('./package.json', import.meta.url));
const { chromium } = require('playwright-core');
const port = 4399;
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
  cwd: process.cwd(),
  stdio: 'ignore',
  windowsHide: true,
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ready = false;
for (let i = 0; i < 40 && !ready; i += 1) {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/`);
    ready = res.status < 500;
  } catch {
    await sleep(400);
  }
}
if (!ready) throw new Error('server not ready');

const browser = await chromium.launch({ executablePath: process.env.RESKIN_CHROME || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const route = process.argv[2] || '/';
await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
const geometry = await page.evaluate(() => {
  const pick = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return `${sel}: MISSING`;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return `${sel}: x=${Math.round(r.x)} y=${Math.round(r.y)} w=${Math.round(r.width)} h=${Math.round(r.height)} pos=${cs.position} display=${cs.display} visibility=${cs.visibility} opacity=${cs.opacity} z=${cs.zIndex}`;
  };
  return ['.ab-spine', '.ab-bar', '.ab-stage', '.ab-runhead', '.ab-status', '.ab-jump'].map(pick).join('\n');
});
console.log(geometry);
const out = process.argv[3] || '.reskin/review/live.png';
await page.screenshot({ path: out });
console.log('shot', out);
await browser.close();
server.kill();
