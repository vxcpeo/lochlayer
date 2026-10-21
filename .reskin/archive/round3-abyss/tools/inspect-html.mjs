import fs from 'node:fs';

const file = process.argv[2];
const t = fs.readFileSync(file, 'utf8');
const n = Number(process.argv[3] || 1800);
console.log('bytes', t.length);
console.log(t.slice(0, n));
console.log('--- style tags:', (t.match(/<style/g) || []).length, '| style attrs:', (t.match(/style=/g) || []).length);
const classes = new Set();
for (const m of t.matchAll(/class="([^"]*)"/g)) for (const c of m[1].split(/\s+/)) classes.add(c);
console.log('--- classes:', [...classes].sort().join(' '));
