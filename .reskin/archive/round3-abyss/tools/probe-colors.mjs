import fs from 'node:fs';

const file = process.argv[2];
const t = fs.readFileSync(file, 'utf8');
const colors = process.argv.slice(3);
for (const color of colors) {
  const re = new RegExp(`[^<>]{0,160}(?:fill|stroke|stop-color)="${color}"[^<>]{0,80}`, 'gi');
  const hits = [...t.matchAll(re)].slice(0, 4).map((m) => m[0].trim());
  console.log(`\n== ${color} (${(t.match(new RegExp(color, 'gi')) || []).length} total)`);
  for (const h of hits) console.log('   ', h.slice(0, 220));
}
