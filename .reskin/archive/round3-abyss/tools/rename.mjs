// Renames the presentation namespace: --bp-* tokens to --abyss-*, bp-* classes to ab-*.
import fs from 'node:fs';
import path from 'node:path';

const roots = process.argv.slice(2);
const files = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      walk(p);
    } else if (/\.(vue|ts|js|mjs|html|css)$/.test(entry.name)) files.push(p);
  }
})(roots[0] || 'src');

for (const root of roots.slice(1)) {
  (function walkAll(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) walkAll(p);
      else if (/\.(ts|vue|js)$/.test(entry.name)) files.push(p);
    }
  })(root);
}

let changed = 0;
let tokens = 0;
let classes = 0;
for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  let after = before;
  after = after.replace(/--bp-/g, () => { tokens += 1; return '--abyss-'; });
  after = after.replace(/\bbp-(?=[a-z])/g, () => { classes += 1; return 'ab-'; });
  if (after !== before) {
    fs.writeFileSync(file, after, 'utf8');
    changed += 1;
  }
}
console.log(`files scanned ${files.length}, rewritten ${changed}, tokens ${tokens}, classes ${classes}`);
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  if (/\bbp-|--bp-/.test(t)) console.log('LEFTOVER', f);
}
