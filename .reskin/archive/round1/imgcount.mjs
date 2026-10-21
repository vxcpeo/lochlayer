import fs from 'node:fs/promises';
import path from 'node:path';

async function walk(dir, acc = []) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, acc);
    else if (/\.(vue|html)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

for (const f of await walk('src')) {
  const text = await fs.readFile(f, 'utf8');
  for (const m of text.matchAll(/<img\b[^>]*?>/g)) {
    const bare = !m[0].endsWith('/>');
    console.log(`${bare ? 'BARE' : 'self'} ${f}: ${m[0].slice(0, 90)}`);
  }
}
