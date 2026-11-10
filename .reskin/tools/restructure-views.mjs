import fs from 'node:fs';

const read = (p) => fs.readFileSync(p, 'utf8');
const write = (p, t) => fs.writeFileSync(p, t, 'utf8');
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function rep(hay, from, to, label) {
  const pattern = from.split('\n').map(escapeRegex).join('\\r?\\n');
  const re = new RegExp(pattern, 'g');
  if (!re.test(hay)) throw new Error(`missing ${label}: ${from.slice(0, 70)}`);
  return hay.replace(re, () => to);
}

/* ---- chart palette fallbacks ---- */
{
  const p = 'src/lib/design/charts/shared.ts';
  let t = read(p);
  const inks = {
    buff: '#12141A',
    enclaven: '#0000FF',
    paper: '#12141A',
    paper2: '#5F636B',
    water: '#DDE0FF',
    bed: '#F2EFE6',
    magenta: '#B3007A',
    rule: '#BFB8A7',
  };
  for (const [key, value] of Object.entries(inks)) {
    const re = new RegExp(`(${key}:\\s*")#[0-9A-Fa-f]{6}(")`);
    if (!re.test(t)) throw new Error(`no ink ${key}`);
    t = t.replace(re, `$1${value}$2`);
  }
  t = t.replace(`'Bahnschrift', 'Segoe UI', Arial, sans-serif`, `'Libre Franklin', 'Segoe UI', Arial, sans-serif`);
  t = t.replace(`'Bahnschrift', 'Segoe UI', Georgia, serif`, `'Libre Franklin', 'Segoe UI', Georgia, serif`);
  write(p, t);
  console.log('re-inked', p);
}

/* ---- privacy: page head + policy ledger ---- */
{
  const p = 'src/views/PrivacyView.vue';
  let t = read(p);
  if (t.includes('cb-policy__entry')) {
    console.log('privacy already restructured');
  } else {
    t = rep(t, '<header class="cb-panel cb-panel--lead cb-page-head" aria-labelledby="page-title">', '<section class="cb-page-head" aria-labelledby="page-title">', 'privacy head');
    t = rep(t, '  </header>', '  </section>', 'privacy head close');
    t = rep(t, '<section class="cb-panel cb-panel--half">', '<section class="cb-policy__entry">', 'privacy half');
    t = rep(t, '<section class="cb-panel cb-panel--wide" id="extension">', '<section class="cb-policy__entry" id="extension">', 'privacy extension');
    t = rep(t, '<section class="cb-panel cb-panel--wide">', '<section class="cb-policy__entry">', 'privacy wide');
    t = rep(t, '<h2 class="cb-panel__title">', '<h2 class="cb-policy__title">', 'privacy title');
    t = rep(t, '<div class="cb-panel__body">', '<div class="cb-policy__body">', 'privacy body');
    t = rep(t, '  </section>\n\n  <section class="cb-policy__entry">', '  </section>\n\n  <div class="cb-policy">\n  <section class="cb-policy__entry">', 'privacy open');
    t = rep(t, '  <p class="cb-actions">', '  </div>\n  <p class="cb-actions">', 'privacy actions');
    write(p, t);
    console.log('restructured', p);
  }
}

/* ---- verify: page head + console stage ---- */
{
  const p = 'src/views/VerifyView.vue';
  let t = read(p);
  if (t.includes('cb-verify-stage')) {
    console.log('verify already restructured');
  } else {
    t = rep(t, '<header class="cb-panel cb-panel--wide cb-page-head" aria-labelledby="page-title">', '<section class="cb-page-head" aria-labelledby="page-title">', 'verify head');
    t = rep(t, '  </header>', '  </section>', 'verify head close');
    t = rep(t, '<div class="cb-panel cb-panel--lead cb-verify">', '<div class="cb-verify-stage">\n  <div class="cb-panel cb-verify">', 'verify stage');
    t = rep(t, '<section class="cb-panel__body">', '<section class="cb-result__section">', 'verify result section');
    t = rep(
      t,
      '  </div>\n\n  <p class="cb-actions">\n    <RouterLink class="cb-btn cb-btn--outline" to="/">Back to the start page</RouterLink>',
      '  </div>\n  </div>\n\n  <p class="cb-actions">\n    <RouterLink class="cb-btn cb-btn--outline" to="/">Back to the start page</RouterLink>',
      'verify actions',
    );
    write(p, t);
    console.log('restructured', p);
  }
}
