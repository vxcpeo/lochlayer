// Full-page capture probe, to see which chrome elements survive the capture.
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(new URL('./package.json', import.meta.url));
const { chromium } = require('playwright-core');
const port = 4398;
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

const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
// Same scroll dance the verifier does.
await page.evaluate(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const step = Math.max(300, Math.floor(window.innerHeight * 0.8));
  for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await sleep(60);
  }
  window.scrollTo(0, 0);
  await sleep(120);
  if (document.fonts?.ready) await document.fonts.ready;
});
await page.screenshot({ path: process.argv[2] || '.reskin/review/full.png', fullPage: true });
console.log('scrollY', await page.evaluate(() => window.scrollY));
await browser.close();
server.kill();
