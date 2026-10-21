// Lists every presentation class token referenced in src (templates, TS-generated HTML, CSS).
import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2] || 'src';
const files = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(vue|ts|html|css)$/.test(entry.name)) files.push(p);
  }
})(root);

const fromTemplates = new Set();
const fromCss = new Set();
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(/class(?:Name)?\s*=\s*(?:"([^"]*)"|'([^']*)'|`([^`]*)`)/g)) {
    for (const token of (m[1] ?? m[2] ?? m[3]).split(/\s+/)) {
      if (/^[a-z][\w-]*$/.test(token)) fromTemplates.add(token);
    }
  }
  for (const m of text.matchAll(/'([a-z][\w-]*(?:\s+[a-z][\w-]*)*)'/g)) {
    if (/^(?:ab|bp)-/.test(m[1])) for (const token of m[1].split(/\s+/)) fromTemplates.add(token);
  }
  if (file.endsWith('.css')) {
    for (const m of text.matchAll(/\.([a-z][\w-]*)/g)) fromCss.add(m[1]);
  }
}

const all = [...new Set([...fromTemplates, ...fromCss])].sort();
console.log(`files: ${files.length}, template classes: ${fromTemplates.size}, css classes: ${fromCss.size}, union: ${all.length}`);
console.log(all.join('\n'));
