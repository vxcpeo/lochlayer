import fs from 'node:fs';
import path from 'node:path';

const read = (p) => fs.readFileSync(p, 'utf8');
const write = (p, t) => fs.writeFileSync(p, t);

for (const name of ['BpDeck.vue', 'BpKeeps.vue', 'BpScan.vue', 'TwDeck.vue', 'TwKeeps.vue', 'TwScan.vue']) {
  const p = path.join('src', 'components', 'home', name);
  write(p, read(p).replace(/bp-bp-glyph/g, 'bp-glyph'));
}
for (const name of ['DocsView.vue', 'VerifyView.vue']) {
  const p = path.join('src', 'views', name);
  write(p, read(p).replace(/bp-bp-glyph/g, 'bp-glyph'));
}

const numerals = path.join('src', 'lib', 'design', 'numerals.ts');
write(
  numerals,
  read(numerals)
    .replace(/\btnum-unit\b/g, 'bp-unit')
    .replace(/\btnum-sign\b/g, 'bp-sign')
    .replace(/\btnum\b/g, 'bp-num')
    .replace(/\btag-open\b/g, 'bp-exposed')
    .replace(/\btag-sealed\b/g, 'bp-shielded'),
);

const shared = path.join('src', 'lib', 'design', 'charts', 'shared.ts');
write(shared, read(shared).replace(/class="rdc /g, 'class="bp-plot '));

const example = path.join('src', 'data', 'example-report.html');
write(example, read(example).replace(/\brdc\b/g, 'bp-plot'));

const report = path.join('src', 'lib', 'report.ts');
write(
  report,
  read(report)
    .replace('class="btn btn--quiet btn--sm bp-rep-clear"', 'class="bp-btn bp-btn--quiet bp-btn--sm bp-rep-clear"')
    .replace('class="notice notice--caution"', 'class="bp-callout bp-callout--warn"')
    .replace('class="notice__title"', 'class="bp-callout__title"'),
);

console.log('Leftover presentation hooks renamed.');
