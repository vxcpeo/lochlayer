import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.argv[2] || 'src';
const out = path.resolve('.reskin/original-pretty');

async function walk(dir, acc = []) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, acc);
    else if (/\.(vue|html)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

function reflow(text) {
  // Put a newline before every tag boundary so long minified lines become readable.
  let s = text.replace(/></g, '>\n<');
  s = s.replace(/<(section|div|ul|ol|li|nav|h[1-6]|p|dl|dt|dd|footer|header|main|figure|figcaption)\b/g, '\n<$1');
  return s.split('\n').map((l) => l.trimEnd()).filter((l, i, a) => l.length || (a[i - 1] || '').length).join('\n');
}

const files = await walk(root);
for (const f of files) {
  const text = await fs.readFile(f, 'utf8');
  const dest = path.join(out, path.relative('.', f));
  await fs.mkdir(path.dirname(dest), { recursive: true });
  const body = reflow(text);
  await fs.writeFile(dest, body, 'utf8');
  console.log(`${f} -> ${body.split('\n').length} lines`);
}
