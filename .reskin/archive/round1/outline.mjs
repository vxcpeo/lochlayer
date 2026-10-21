import fs from 'node:fs';

const h = fs.readFileSync('src/data/example-report.html', 'utf8');
const tags = [...h.matchAll(/<(\/?)([a-zA-Z][\w-]*)([^>]*)>/g)];
let depth = 0;
const out = [];
for (const m of tags) {
  const [full, close, name, attrs] = m;
  const lower = name.toLowerCase();
  if (close) { depth = Math.max(0, depth - 1); continue; }
  const selfClose = /\/$/.test(full) || ['br', 'hr', 'img', 'input', 'meta', 'link', 'use', 'path', 'circle', 'rect', 'line', 'text', 'tspan', 'symbol', 'pattern', 'defs'].includes(lower);
  const cls = (attrs.match(/class="([^"]*)"/) || [, ''])[1];
  const id = (attrs.match(/id="([^"]*)"/) || [, ''])[1];
  const rest = attrs.replace(/class="[^"]*"/, '').replace(/id="[^"]*"/, '').replace(/data-[\w-]+="[^"]*"/g, '').replace(/\s+/g, ' ').trim().slice(0, 60);
  out.push(`${'  '.repeat(depth)}${lower}${id ? '#' + id : ''}${cls ? '.' + cls.split(/\s+/).join('.') : ''}${rest ? ' [' + rest + ']' : ''}`);
  if (!selfClose) depth += 1;
}
fs.writeFileSync('.reskin/example-outline.txt', out.join('\n'));
console.log(out.length, 'elements');
