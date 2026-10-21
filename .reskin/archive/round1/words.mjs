import fs from 'node:fs';

const pages = JSON.parse(fs.readFileSync('.reskin/baseline/pages.json', 'utf8'));
const home = Object.values(pages.pages).find((x) => x.route === '/').desktop;
const map = new Map(home.words.map((w) => [w.word, w.count]));
for (const w of ['Public', 'balance', '41.207', 'Shielded', '12', 'Recent', 'activity', 'Dive', 'in', 'Surface', 'Loch', 'Privacy', 'score', '49', '100', 'an', 'example', 'report', 'See', 'start', '24', 'UTC', 'Upright', 'is', 'public']) {
  console.log(w, map.get(w) ?? 0);
}
