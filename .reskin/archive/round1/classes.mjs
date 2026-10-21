import fs from 'node:fs/promises';
import path from 'node:path';

const baseline = JSON.parse(await fs.readFile('.reskin/baseline/inventory.json', 'utf8'));
const baseTokens = new Set(baseline.classNames || []);

async function walk(dir, acc = []) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, acc);
    else if (/\.(vue|html)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

const seen = new Map();
for (const f of await walk('src')) {
  const text = await fs.readFile(f, 'utf8');
  for (const m of text.matchAll(/class="([^"]*)"/g)) {
    for (const token of m[1].split(/\s+/).filter(Boolean)) {
      if (token.includes('${')) continue;
      if (!seen.has(token)) seen.set(token, new Set());
      seen.get(token).add(f);
    }
  }
}

const shared = [...seen.keys()].filter((t) => baseTokens.has(t)).sort();
console.log('total class tokens', seen.size);
console.log('shared with baseline', shared.length, shared.join(' '));
const unknown = [...seen.keys()].filter((t) => !/^(tw-|rd-|rdc|tnum|tnum-|digit|bath|tag-|sym|visually-hidden|js-only|framed-only|router-link)/.test(t) && !t.startsWith('rd')).sort();
console.log('non-namespaced tokens', unknown.length);
for (const t of unknown) console.log('  ', t, [...seen.get(t)].slice(0, 2).join(','));
