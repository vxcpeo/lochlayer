import fs from 'node:fs/promises';
import path from 'node:path';

const dry = process.argv.includes('--dry');

const MAP = {
  // chart primitives
  lc: 'rdc',
  'lc-bed': 'rdc-bed',
  'lc-bedline': 'rdc-bedline',
  'lc-caution': 'rdc-warn',
  'lc-col': 'rdc-col',
  'lc-ground': 'rdc-ground',
  'lc-hatch-line': 'rdc-hatch',
  'lc-hours': 'rdc-hours',
  'lc-label': 'rdc-label',
  'lc-link': 'rdc-link',
  'lc-link-faint': 'rdc-link-faint',
  'lc-node': 'rdc-node',
  'lc-node-caution': 'rdc-node-warn',
  'lc-note-caution': 'rdc-note-warn',
  'lc-quiet': 'rdc-quiet',
  'lc-rule': 'rdc-rule',
  'lc-sounding': 'rdc-sounding',
  'lc-station': 'rdc-station',
  'lc-strong': 'rdc-strong',
  'lc-surface': 'rdc-surface',
  'lc-water': 'rdc-water',
  'lc-who': 'rdc-who',
  // report sheet
  report: 'rd-sheet',
  report__head: 'rd-head',
  report__name: 'rd-name',
  report__clear: 'rd-clear',
  report__body: 'rd-body',
  report__section: 'rd-section',
  report__title: 'rd-title',
  report__figures: 'rd-figures',
  chart: 'rd-fig',
  chart__caption: 'rd-caption',
  score: 'rd-score',
  score__label: 'rd-score-label',
  score__figure: 'rd-score-figure',
  score__of: 'rd-score-of',
  score__verdict: 'rd-score-verdict',
  sev: 'rd-sev',
  statement: 'rd-list',
  statement__row: 'rd-row',
  'statement__row--open': 'rd-row-open',
  'statement__row--total': 'rd-row-total',
  statement__what: 'rd-what',
  statement__fig: 'rd-figure',
  'statement__fig--less': 'rd-figure-less',
  // numerals
  fig: 'tnum',
  'fig-sign': 'tnum-sign',
  'fig-unit': 'tnum-unit',
  figure: 'digit',
  'figure--xl': 'digit-xl',
  sounding: 'bath',
  'sounding__frac': 'bath-frac',
  'sounding__less': 'bath-less',
  // layout of the fitted charts
  fit: 'rd-fit',
  'fit--bed': 'rd-fit-bed',
  'fit--hours': 'rd-fit-hours',
  'fit--who': 'rd-fit-who',
  // misc
  flag: 'rd-flag',
  icon: 'sym',
  'icon--sm': 'sym-sm',
  'is-public': 'tag-open',
  'is-shielded': 'tag-sealed',
  't-fine': 'rd-fine',
  water: 'wet',
  disclosure: 'rd-fold',
  disclosure__body: 'rd-fold-body',
  'scan-example': 'rd-example',
  'scan-example__body': 'rd-example-body',
};

const KEYS = new Set(Object.keys(MAP));

const files = [
  'src/data/example-report.html',
  'src/lib/report.ts',
  'src/lib/design/numerals.ts',
  'src/lib/design/charts/by-hour.ts',
  'src/lib/design/charts/counterparties.ts',
  'src/lib/design/charts/fit.ts',
  'src/lib/design/charts/shared.ts',
  'src/lib/design/charts/statement.ts',
  'src/lib/design/charts/stepped-bed.ts',
];

function mapTokens(text) {
  const tokens = text.trim().length ? text.trim().split(/\s+/) : [];
  if (!tokens.length) return null;
  if (!tokens.every((t) => KEYS.has(t))) return null;
  return tokens.map((t) => MAP[t]).join(' ');
}

function passQuoted(text, log) {
  return text.replace(/(["'`])((?:(?!\1)[\s\S])*?)\1/g, (whole, quote, body) => {
    const mapped = mapTokens(body);
    if (!mapped || mapped === body) return whole;
    log.push(`${quote}${body}${quote} -> ${quote}${mapped}${quote}`);
    return `${quote}${mapped}${quote}`;
  });
}

function passClassAttr(text, log) {
  return text.replace(/class="([^"]*)"/g, (whole, body) => {
    const mapped = body
      .split(/(\s+)/)
      .map((part) => (KEYS.has(part) ? MAP[part] : part))
      .join('');
    if (mapped !== body) log.push(`class="${body}" -> class="${mapped}"`);
    return `class="${mapped}"`;
  });
}

for (const rel of files) {
  const p = path.resolve(rel);
  const text = await fs.readFile(p, 'utf8');
  const log = [];
  const quoted = passQuoted(text, log);
  const out = passClassAttr(quoted, log);
  console.log(`\n== ${rel}  (${log.length} edits)`);
  for (const line of log.slice(0, 40)) console.log('  ', line);
  if (log.length > 40) console.log(`   ... ${log.length - 40} more`);
  if (!dry) await fs.writeFile(p, out, 'utf8');
}
