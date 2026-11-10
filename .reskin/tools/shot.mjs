/* Quick visual capture: half-scale full-page shots for review. */
import { chromium } from 'playwright-core';
import fs from 'node:fs/promises';
import path from 'node:path';

const exe = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const base = process.argv[2] || 'http://127.0.0.1:4400';
const outDir = path.resolve('.reskin/review');
await fs.mkdir(outDir, { recursive: true });

const routes = [
  ['/', 'home'],
  ['/docs', 'docs'],
  ['/install', 'install'],
  ['/privacy', 'privacy'],
  ['/verify', 'verify'],
];

const browser = await chromium.launch({ executablePath: exe, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 0.5 });
for (const theme of ['dusk', 'night']) {
  const page = await context.newPage();
  for (const [route, name] of routes) {
    await page.goto(`${base}${route}?theme=${theme}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(450);
    await page.screenshot({ path: path.join(outDir, `${name}-${theme}.png`), fullPage: true });
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    console.log(`${name}-${theme}.png`, `${h}px`);
  }
  await page.close();
}
await browser.close();
