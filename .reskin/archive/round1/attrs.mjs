import fs from 'node:fs';

const pages = JSON.parse(fs.readFileSync('.reskin/baseline/pages.json', 'utf8'));
for (const route of ['/', '/docs', '/install', '/privacy', '/verify']) {
  const e = Object.values(pages.pages).find((x) => x.route === route).desktop;
  console.log(`\n===== ${route}`);
  console.log('attrs:'); for (const a of e.attrs) console.log('  ', a.count, a.key);
  console.log('forms:', JSON.stringify(e.forms));
  console.log('links:', e.links.map((l) => `${l.count}x ${l.href}`).join('  '));
  console.log('headings:'); for (const h of e.headings) console.log('  ', h.tag, h.text.slice(0, 70));
  console.log('navTargets:', e.navTargets.join(' '));
}
