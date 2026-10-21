import fs from 'node:fs';
import path from 'node:path';

const set = new Set();
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(vue|ts|html)$/.test(entry.name)) {
      const t = fs.readFileSync(p, 'utf8');
      for (const m of t.matchAll(/class="([^"]+)"/g)) {
        for (const c of m[1].split(/\s+/)) if (c && !c.includes('{')) set.add(c);
      }
      for (const m of t.matchAll(/'([^']+)'/g)) {
        for (const c of m[1].split(/\s+/)) if (/^bp-[a-z0-9_-]+$/.test(c)) set.add(c);
      }
    }
  }
};
walk(path.resolve('src'));
const arr = [...set].sort();
console.log(arr.length);
console.log(arr.join('\n'));
