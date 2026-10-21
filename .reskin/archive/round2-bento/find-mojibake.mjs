import fs from 'node:fs';
import path from 'node:path';

const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(vue|ts|html|css)$/.test(entry.name)) {
      const t = fs.readFileSync(p, 'utf8');
      const bad = t.match(/[\u4e00-\u9fff]/g);
      if (bad) console.log(p, bad.length, [...new Set(bad)].slice(0, 12).join(''));
    }
  }
};
walk(path.resolve('src'));
