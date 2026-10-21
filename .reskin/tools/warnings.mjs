import fs from 'node:fs';

const v = JSON.parse(fs.readFileSync('.reskin/verification.json', 'utf8'));
const groups = new Map();
for (const warning of v.warnings) {
  const key = warning
    .replace(/^\/[^:]*: /, '')
    .replace(/"[^"]*"/g, '"…"')
    .replace(/\d+/g, 'N')
    .slice(0, 150);
  groups.set(key, (groups.get(key) || 0) + 1);
}
console.log('warnings', v.warnings.length);
for (const [key, count] of [...groups].sort((a, b) => b[1] - a[1])) console.log(String(count).padStart(3), key);
console.log('\n-- first 12 raw --');
for (const w of v.warnings.slice(0, 12)) console.log(' ', w);
