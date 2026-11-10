import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
for (const [route, name, h] of [['/docs','docs-top',1500], ['/install','install-top',1300], ['/privacy','privacy-top',1200]]) {
  await p.goto('http://localhost:4273' + route, { waitUntil: 'networkidle' });
  await p.waitForTimeout(300);
  await p.screenshot({ path: `.reskin/review/${name}.png`, clip: { x: 0, y: 0, width: 1440, height: h }, fullPage: true });
  console.log(name);
}
await b.close();
