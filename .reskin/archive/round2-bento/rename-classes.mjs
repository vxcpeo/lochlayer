#!/usr/bin/env node
/**
 * Renames every presentation class in the current UI into the new namespace.
 * Text, attributes, bindings and handlers are untouched: only token strings that
 * are class names are replaced.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '.');
const files = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules') continue;
      walk(p);
    } else if (/\.(vue|ts|html)$/.test(entry.name)) files.push(p);
  }
};
walk(path.join(root, 'src'));

const replacements = [
  [/\btnum-unit\b/g, 'bp-unit'],
  [/\btnum-sign\b/g, 'bp-sign'],
  [/\btnum\b/g, 'bp-num'],
  [/\bdigit-xl\b/g, 'bp-figure--xl'],
  [/\bdigit\b/g, 'bp-figure'],
  [/\bsym-sm\b/g, 'bp-glyph--sm'],
  [/\bsym\b/g, 'bp-glyph'],
  [/\btag-open\b/g, 'bp-exposed'],
  [/\btag-sealed\b/g, 'bp-shielded'],
  [/\bwet\b/g, 'bp-wet'],
  [/\brdc-/g, 'bp-plot-'],
  [/\brd-/g, 'bp-rep-'],
  [/\btw-/g, 'bp-'],
];

let changed = 0;
for (const file of files) {
  if (file.endsWith(path.join('lib', 'design', 'numerals.ts'))) continue;
  const before = fs.readFileSync(file, 'utf8');
  let after = before;
  for (const [pattern, replacement] of replacements) after = after.replace(pattern, replacement);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
  }
}
console.log(`Renamed classes in ${changed} source file(s).`);
