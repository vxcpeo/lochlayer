import fs from 'node:fs';

const h = fs.readFileSync('src/data/example-report.html', 'utf8');
const styleAttrs = (h.match(/ style="/g) || []).length;
const styleBlocks = (h.match(/<style/g) || []).length;
const svgs = (h.match(/<svg/g) || []).length;
console.log('bytes', h.length, 'style attrs', styleAttrs, 'style blocks', styleBlocks, 'svg', svgs);

const cls = new Set();
for (const m of h.matchAll(/class="([^"]+)"/g)) for (const c of m[1].split(/\s+/)) cls.add(c);
console.log('unique classes', cls.size);
console.log([...cls].sort().join(' '));

const pages = JSON.parse(fs.readFileSync('.reskin/baseline/pages.json', 'utf8'));
for (const route of ['/', '/docs', '/install', '/privacy', '/verify']) {
  const entry = Object.values(pages.pages).find((x) => x.route === route);
  const tokens = entry.desktop.classTokens;
  console.log(`\n== ${route} classTokens ${tokens.length}`);
  console.log(tokens.join(' '));
}
