import fs from 'node:fs';

const ink = [
  ['public/media/mark.svg', [['#1f8fe0', '#0000ff'], ['#071a33', '#0000ff'], ['#f2f7ff', '#fbfaf6'], ['#7cc4ff', '#c9ccff']]],
  ['public/media/mark-night.svg', [['#1f8fe0', '#0000ff'], ['#f2f7ff', '#fbfaf6'], ['#7cc4ff', '#c9ccff']]],
  ['public/media/mark-on-land.svg', [['#1f8fe0', '#0000ff'], ['#071a33', '#0000ff'], ['#f2f7ff', '#fbfaf6'], ['#7cc4ff', '#c9ccff']]],
  ['public/media/mark-small.svg', [['#1f8fe0', '#0000ff'], ['#f2f7ff', '#fbfaf6']]],
  ['public/media/favicon.svg', [['#1f8fe0', '#0000ff'], ['#f2f7ff', '#fbfaf6'], ['#7cc4ff', '#c9ccff']]],
  ['public/media/enclaven-plate.svg', [['#28a0f0', '#0000ff']]],
];

for (const [file, pairs] of ink) {
  let t = fs.readFileSync(file, 'utf8');
  for (const [from, to] of pairs) t = t.split(from).join(to);
  fs.writeFileSync(file, t, 'utf8');
  console.log('re-inked', file);
}
