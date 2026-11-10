import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
for (const [route, name, chunks] of [['/', 'home', [[0,4200],[4200,8870]]], ['/docs','docs',[[0,4200]]], ['/install','install',[[0,3934]]]]) {
  await page.goto('http://localhost:4273' + route, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  for (const [i, [y0, y1]] of chunks.entries()) {
    await page.screenshot({ path: `.reskin/review/m-${name}-${i}.png`, clip: { x: 0, y: y0, width: 390, height: y1 - y0 }, fullPage: true });
    console.log(`m-${name}-${i}.png`, y0, y1);
  }
}
await b.close();
