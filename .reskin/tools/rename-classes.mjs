/**
 * One-shot class-vocabulary migration: the old sn-, ab- and bath tokens to cb-.
 * Presentation only: it rewrites class tokens in templates, TSX-free strings,
 * CSS selectors and test selectors. Visible copy, attributes and logic are
 * untouched because only class-name tokens match the pattern.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve('src');
const EXTRA_DIRS = ['tests', 'e2e'];

const EXACT = {
  'sn-tile': 'cb-panel',
  'sn-tile--anchor': 'cb-panel--lead',
  'sn-tile--support': 'cb-panel--side',
  'sn-tile--full': 'cb-panel--wide',
  'sn-tile--half': 'cb-panel--half',
  'sn-tile--third': 'cb-panel--third',
  'sn-tile__label': 'cb-panel__label',
  'sn-tile__title': 'cb-panel__title',
  'sn-tile__body': 'cb-panel__body',
  'sn-top': 'cb-bar',
  'sn-top__inner': 'cb-bar__inner',
  'sn-routes': 'cb-nav',
  'sn-route': 'cb-nav__link',
  'sn-route__glyph': 'cb-nav__glyph',
  'sn-route--active': 'cb-nav__link--active',
  'sn-route--exact': 'cb-nav__link--exact',
  'sn-index': 'cb-sections',
  'sn-index__list': 'cb-sections__list',
  'sn-index__link': 'cb-sections__link',
  'sn-bento': 'cb-shell',
  'sn-foot': 'cb-status',
  'sn-foot__inner': 'cb-status__inner',
  'sn-foot__id': 'cb-status__id',
  'sn-foot__name': 'cb-status__name',
  'sn-foot__phase': 'cb-status__phase',
  'sn-foot__links': 'cb-status__links',
  'sn-foot__fine': 'cb-status__fine',
  'sn-foot__token': 'cb-status__token',
  'sn-foot__code': 'cb-status__code',
  'sn-keep': 'cb-idea',
  'sn-keeps': 'cb-ideas',
  'sn-keeps__figure': 'cb-ideas__figure',
  'sn-keep__title': 'cb-idea__title',
  'sn-keep__text': 'cb-idea__text',
  'sn-keep__kept': 'cb-idea__kept',
  'sn-ledger': 'cb-register',
  'sn-ledger__row': 'cb-register__row',
  'sn-ledger__term': 'cb-register__term',
  'sn-ledger__def': 'cb-register__def',
  'sn-ledger-group': 'cb-register-set',
  'sn-ledger-group__title': 'cb-register-set__title',
  'sn-deck': 'cb-popup',
  'sn-deck__plate': 'cb-popup__plate',
  'sn-hero': 'cb-runhead',
  'sn-hero__plate': 'cb-runhead__plate',
  'sn-hero__body': 'cb-runhead__body',
  'sn-hero__title': 'cb-runhead__title',
  'sn-hero__land': 'cb-runhead__land',
  'sn-hero__water': 'cb-runhead__water',
  'sn-hero__gauge': 'cb-runhead__gauge',
  'sn-hero__foot': 'cb-runhead__foot',
  'sn-hero__note': 'cb-runhead__note',
  'sn-head': 'cb-page-head',
  'sn-head__title': 'cb-page-title',
  'sn-pal': 'cb-palette',
  'sn-pal__btn': 'cb-palette__btn',
  'sn-prose': 'cb-article',
  'sn-contents': 'cb-outline',
  'sn-contents__title': 'cb-outline__title',
  'sn-contents__list': 'cb-outline__list',
  'sn-contents__link': 'cb-outline__link',
  'sn-callout': 'cb-note',
  'sn-callout--inline': 'cb-note--inline',
  'sn-callout--framed': 'cb-note--framed',
  'sn-callout--warn': 'cb-note--warn',
  'sn-callout__title': 'cb-note__title',
  'sn-shielded': 'cb-sealed',
  'sn-wet': 'cb-inset',
  'sn-cue': 'cb-scroll-cue',
  'sn-scramble': 'cb-reveal',
  'sn-status': 'cb-verdict-ok',
  'sn-btn--fill': 'cb-btn--solid',
  'sn-btn--line': 'cb-btn--outline',
  'sn-btn--soon': 'cb-btn--soft',
  'sn-plate__caption': 'cb-figcaption',
  'ab-sprite': 'cb-sprite',
  bath: 'cb-bath',
  'bath-less': 'cb-bath-less',
  'bath-frac': 'cb-bath-frac',
};

const TOKEN = /\b(?:sn-[A-Za-z0-9_-]+|ab-[A-Za-z0-9_-]+|bath(?:-less|-frac)?)\b/g;

function migrate(text) {
  let changed = 0;
  const out = text.replace(TOKEN, (token) => {
    if (EXACT[token]) { changed += 1; return EXACT[token]; }
    if (token.startsWith('sn-')) { changed += 1; return `cb-${token.slice(3)}`; }
    changed += 1;
    return `cb-${token}`;
  });
  return { out, changed };
}

async function walk(dir, files = []) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      await walk(full, files);
    } else if (/\.(vue|ts|css|html|mjs|json)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

const targets = [];
for (const dir of [ROOT, ...EXTRA_DIRS.map((d) => path.resolve(d))]) {
  try { targets.push(...(await walk(dir))); } catch { /* missing dir */ }
}

let total = 0;
for (const file of targets) {
  const text = await fs.readFile(file, 'utf8');
  const { out, changed } = migrate(text);
  if (changed) {
    await fs.writeFile(file, out, 'utf8');
    total += changed;
    console.log(`rewrote ${changed.toString().padStart(3)} tokens in ${path.relative(process.cwd(), file)}`);
  }
}
console.log(`\n${total} class tokens renamed across ${targets.length} files`);
