import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4318/', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
const info = await page.evaluate(() => {
  const section = document.querySelector('#cautions');
  const head = section.querySelector('.bp-chapter__head');
  const body = section.querySelector('.bp-chapter__body');
  const rules = [];
  for (const sheet of document.styleSheets) {
    let list;
    try { list = sheet.cssRules; } catch { continue; }
    for (const rule of list) {
      if (!rule.selectorText || !rule.style) continue;
      if (!/grid-template-columns|grid-column|display/.test(rule.cssText)) continue;
      for (const el of [section, head, body]) {
        try {
          if (el.matches(rule.selectorText)) {
            rules.push({ el: el.className, selector: rule.selectorText, css: rule.style.cssText.slice(0, 220) });
          }
        } catch { /* invalid selector */ }
      }
    }
  }
  const cs = getComputedStyle(section);
  return {
    sectionDisplay: cs.display,
    template: cs.gridTemplateColumns,
    autoFlow: cs.gridAutoFlow,
    autoRows: cs.gridAutoRows,
    headDisplay: getComputedStyle(head).display,
    headTemplate: getComputedStyle(head).gridTemplateColumns,
    bodyDisplay: getComputedStyle(body).display,
    bodyTemplate: getComputedStyle(body).gridTemplateColumns,
    rules,
  };
});
console.log(JSON.stringify(info, null, 1).slice(0, 6000));
await browser.close();
