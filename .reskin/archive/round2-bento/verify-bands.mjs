import fs from 'node:fs';

const view = 'src/views/VerifyView.vue';
let text = fs.readFileSync(view, 'utf8');
text = text.replace(
  '<section class="bp-verify" aria-labelledby="page-title">\n',
  '<section class="bp-verify" aria-labelledby="page-title">\n      <div class="bp-verify__lead">\n',
);
text = text.replace(
  '      <form class="bp-tile bp-tile--7 bp-verify__form" id="verify-form" novalidate @submit.prevent="submit">',
  '      <div class="bp-tile bp-tile--7 bp-verify__panel">\n        <form class="bp-verify__form" id="verify-form" novalidate @submit.prevent="submit">',
);
text = text.replace(
  '      </form>\n\n      <div class="bp-tile bp-tile--12 bp-verify__result"',
  '      </form>\n      </div>\n      </div>\n\n      <div class="bp-verify__body">\n\n      <div class="bp-tile bp-tile--12 bp-verify__result"',
);
text = text.replace(
  '      </p>\n  </section>',
  '      </p>\n      </div>\n  </section>',
);
fs.writeFileSync(view, text);

const css = 'src/assets/blueprint.css';
let styles = fs.readFileSync(css, 'utf8');
styles = styles.replace(
  '.bp-verify {\n  grid-column: span 12;\n  display: grid;\n  grid-template-columns: repeat(12, minmax(0, 1fr));\n  gap: var(--bp-gap);\n  align-items: start;\n}',
  '.bp-verify {\n  grid-column: span 12;\n  display: grid;\n  grid-template-columns: repeat(12, minmax(0, 1fr));\n  gap: var(--bp-gap);\n  align-items: start;\n}\n\n.bp-verify__lead,\n.bp-verify__body {\n  grid-column: span 12;\n  display: grid;\n  grid-template-columns: repeat(12, minmax(0, 1fr));\n  gap: var(--bp-gap);\n  align-items: start;\n}\n\n.bp-verify__panel {\n  padding: var(--bp-pad);\n}',
);
styles = styles.replace(
  '.bp-verify__form {\n  grid-column: span 7;\n  display: grid;\n  gap: 14px;\n  align-content: start;\n}',
  '.bp-verify__form {\n  display: grid;\n  gap: 14px;\n  align-content: start;\n}',
);
styles = styles.replaceAll('.bp-verify > .bp-ledger.bp-tile', '.bp-verify__body > .bp-ledger.bp-tile');
styles = styles.replaceAll('.bp-verify > .bp-ledger.bp-tile > .bp-ledger__row', '.bp-verify__body > .bp-ledger.bp-tile > .bp-ledger__row');
styles = styles.replace('.bp-verify > .bp-tile.bp-actions', '.bp-verify__body > .bp-tile.bp-actions');
styles = styles.replace(
  '  .bp-scan__form,\n  .bp-scan__side,\n  .bp-verify__form {\n    grid-column: span 12;\n  }',
  '  .bp-scan__form,\n  .bp-scan__side,\n  .bp-verify__panel {\n    grid-column: span 12;\n  }',
);
fs.writeFileSync(css, styles);
console.log('Verify lead/body bands added.');
