import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:4273/', { waitUntil: 'networkidle' });
console.log(await p.evaluate(() => Array.from(document.querySelectorAll('section[id]')).map((s) => s.id)));
await b.close();
