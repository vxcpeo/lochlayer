import fs from 'node:fs';
import path from 'node:path';

const pats = ['tnum', 'tag-open', 'tag-sealed', 'visually-hidden', 'js-only', 'framed-only', 'rdc', 'btn', 'notice', 'bp-bp-'];
const roots = path.resolve('src');
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(vue|ts|html)$/.test(entry.name)) {
      const t = fs.readFileSync(p, 'utf8');
      for (const pat of pats) {
        const re = new RegExp(`\\b${pat}\\b`, 'g');
        const n = (t.match(re) || []).length;
        if (n) console.log(p, n, pat);
      }
    }
  }
};
walk(roots);
