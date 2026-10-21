#!/usr/bin/env node
/**
 * Moves the four secondary views from the old aside shell into the new bento
 * page bands. Copy, attributes, bindings and handlers are carried through as
 * whole substrings; only wrappers and class lists change.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '.');
const read = (name) => fs.readFileSync(path.join(root, 'src', 'views', name), 'utf8');
const write = (name, text) => fs.writeFileSync(path.join(root, 'src', 'views', name), text);

const thesisBlock = /\n    <template #thesis>([\s\S]*?)\n    <\/template>/;
const importLine = /import MistonLayout from '\.\.\/components\/MistonLayout\.vue';/;

function common(text, name) {
  const match = thesisBlock.exec(text);
  if (!match) throw new Error(`${name}: thesis block not found`);
  if (!importLine.test(text)) throw new Error(`${name}: old layout import not found`);
  return {
    text,
    thesis: match[1],
    withoutThesis: text.replace(thesisBlock, ''),
  };
}

function finish(text, name) {
  const next = text
    .replace('<MistonLayout>', '<BlueprintShell>')
    .replace(importLine, "import BlueprintShell from '../components/BlueprintShell.vue';")
    .replace('</MistonLayout>', '</section>\n  </BlueprintShell>');
  if (next.includes('MistonLayout')) throw new Error(`${name}: old layout still referenced`);
  return next;
}

// ---------- install ----------
{
  const name = 'InstallView.vue';
  const { text, thesis } = common(read(name), name);
  const cta = /(\n\s*<p class="bp-actions">[\s\S]*?<\/p>)\s*$/.exec(thesis);
  if (!cta) throw new Error(`${name}: CTA paragraph not found`);
  const head = thesis.slice(0, cta.index);
  let next = text
    .replace(thesisBlock, `\n    <section class="bp-page bp-page--install" aria-labelledby="page-title">\n      <header class="bp-tile bp-tile--8 bp-pagehead">${head}\n      </header>\n      <div class="bp-tile bp-tile--4 bp-pagehead__aside">${cta[1]}\n      </div>`)
    .replace(/\n?\s*<div class="bp-chapter__head">\s*<div class="bp-chapter__kicker"><\/div>\s*<\/div>/, '')
    .replace('<section class="bp-chapter" aria-labelledby="page-title">', '<div class="bp-chapter" aria-labelledby="page-title">')
    .replace('      </div>\n    </section>\n  </MistonLayout>', '      </div>\n    </div>\n  </MistonLayout>');
  next = finish(next, name);
  write(name, next);
}

// ---------- privacy ----------
{
  const name = 'PrivacyView.vue';
  const { text, thesis } = common(read(name), name);
  let next = text
    .replace(thesisBlock, `\n    <section class="bp-page bp-page--privacy" aria-labelledby="page-title">\n      <header class="bp-tile bp-tile--12 bp-pagehead">${thesis}\n      </header>`)
    .replace(/\n?\s*<div class="bp-chapter__head">\s*<div class="bp-chapter__kicker"><\/div>\s*<\/div>/, '')
    .replace('<section class="bp-chapter" aria-labelledby="page-title">', '<div class="bp-chapter" aria-labelledby="page-title">')
    .replace('      </div>\n    </section>\n  </MistonLayout>', '      </div>\n    </div>\n  </MistonLayout>');
  next = finish(next, name);
  write(name, next);
}

// ---------- verify ----------
{
  const name = 'VerifyView.vue';
  const { text, thesis } = common(read(name), name);
  let next = text
    .replace(thesisBlock, `\n    <section class="bp-page bp-page--verify" aria-labelledby="page-title">\n      <header class="bp-tile bp-tile--5 bp-pagehead">${thesis}\n      </header>`)
    .replace('<section class="bp-verify" aria-labelledby="page-title">', '<div class="bp-verify" aria-labelledby="page-title">')
    .replace('<form class="bp-verify__form"', '<form class="bp-tile bp-tile--7 bp-verify__form"')
    .replace('<div class="bp-verify__result"', '<div class="bp-tile bp-tile--12 bp-verify__result"')
    .replace('<dl class="bp-ledger bp-ledger--wide">', '<dl class="bp-tile bp-tile--12 bp-ledger bp-ledger--wide">')
    .replace(
      '<p class="bp-actions">\n        <RouterLink class="bp-btn bp-btn--line" to="/">Back to the start page</RouterLink>',
      '<p class="bp-tile bp-tile--12 bp-actions">\n        <RouterLink class="bp-btn bp-btn--line" to="/">Back to the start page</RouterLink>',
    )
    .replace('    </section>\n  </MistonLayout>', '    </div>\n  </MistonLayout>');
  next = finish(next, name);
  write(name, next);
}

// ---------- docs ----------
{
  const name = 'DocsView.vue';
  const { text, thesis } = common(read(name), name);
  let next = text
    // Each documentation block becomes an article, before the page's own section exists.
    .replace(/<section class="bp-doc__section"/g, '<article class="bp-doc__section"')
    .replace(/<\/section>/g, '</article>')
    .replace(thesisBlock, `\n    <section class="bp-page bp-page--docs" aria-labelledby="page-title">\n      <header class="bp-tile bp-tile--8 bp-pagehead">${thesis}\n      </header>`)
    // The rail becomes the contents tile, the whole page is the band.
    .replace('    <div class="bp-doc">\n      <div class="bp-doc__rail">', '      <nav class="bp-tile bp-tile--4 bp-doc__rail" aria-labelledby="contents-title">')
    .replace('      </div>\n\n      <div class="bp-doc__sections">', '      </nav>\n\n      <div class="bp-doc__sections">')
    .replace('      </div>\n    </div>\n  </MistonLayout>', '      </div>\n  </MistonLayout>');
  // Wide sheets: every section that carries a table gets the whole row.
  for (const id of ['model', 'proof', 'leaks', 'observer', 'numbers']) {
    const before = `<article class="bp-doc__section" id="${id}"`;
    if (!next.includes(before)) throw new Error(`${name}: section #${id} not found`);
    next = next.replace(before, `<article class="bp-doc__section bp-doc__section--wide" id="${id}"`);
  }
  next = finish(next, name);
  write(name, next);
}

console.log('Views restructured.');
