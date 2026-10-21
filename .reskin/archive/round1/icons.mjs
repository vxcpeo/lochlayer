import fs from 'node:fs/promises';
import path from 'node:path';

async function walk(dir, acc = []) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, acc);
    else if (/\.(vue|html|ts)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

const files = await walk('src');
const ids = ['i-caution', 'i-chevron', 'i-dive', 'i-info', 'i-receive', 'i-send', 'i-surface'];
for (const id of ids) {
  const hits = [];
  for (const f of files) {
    const text = await fs.readFile(f, 'utf8');
    const n = (text.match(new RegExp(`href="#${id}"`, 'g')) || []).length;
    if (n) hits.push(`${f}:${n}`);
  }
  console.log(id, '=', hits.join(' '));
}
