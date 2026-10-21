// Gives every docs section a heading header: <header><h2 id="...">...</h2></header>.
import fs from 'node:fs';

const file = 'src/views/DocsView.vue';
const lines = fs.readFileSync(file, 'utf8').split('\n');
let changed = 0;
const out = lines.map((line) => {
  const m = /^(\s*)<h2 id="([a-z-]+-title)">([^<]*)<\/h2>$/.exec(line);
  if (!m) return line;
  changed += 1;
  return `${m[1]}<header class="ab-doc__head"><h2 id="${m[2]}">${m[3]}</h2></header>`;
});
fs.writeFileSync(file, out.join('\n'), 'utf8');
console.log('wrapped headings:', changed);
