// Re-inks the report figures: the old water palette becomes the abyss palette.
import fs from 'node:fs';
import path from 'node:path';

const MAP = {
  '#E4D8B4': '#EAF1F7',
  '#E9EEF0': '#EAF1F7',
  '#A8D0E0': '#B6509E',
  '#1F4B62': '#2A1630',
  '#9DB3BE': '#8496A7',
  '#050F15': '#101C28',
  '#E58ABB': '#F2C94C',
  '#557482': '#31465A',
  '#0A5FC4': '#B6509E',
};

const files = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(vue|ts|html|css)$/.test(entry.name)) files.push(p);
  }
})('src');

let changed = 0;
for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  let after = before;
  for (const [from, to] of Object.entries(MAP)) {
    after = after.replace(new RegExp(from, 'gi'), to);
  }
  if (after !== before) {
    fs.writeFileSync(file, after, 'utf8');
    changed += 1;
    console.log('re-inked', file);
  }
}
console.log('files', files.length, 'changed', changed);
