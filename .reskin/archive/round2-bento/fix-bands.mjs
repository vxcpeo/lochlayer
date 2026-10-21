import fs from 'node:fs';

const view = 'src/views/VerifyView.vue';
let text = fs.readFileSync(view, 'utf8');
text = text.replace(
  '<section class="bp-page bp-page--verify" aria-labelledby="page-title">',
  '<section class="bp-verify" aria-labelledby="page-title">',
);
text = text.replace('    <div class="bp-verify" aria-labelledby="page-title">\n', '');
text = text.replace('      </div>\n    </section>', '    </section>');
fs.writeFileSync(view, text);

const css = 'src/assets/blueprint.css';
let styles = fs.readFileSync(css, 'utf8');
styles = styles
  .replaceAll('.bp-page--verify > .bp-ledger.bp-tile', '.bp-verify > .bp-ledger.bp-tile')
  .replace('.bp-page--verify > .bp-tile.bp-actions', '.bp-verify > .bp-tile.bp-actions')
  .replace('.bp-notes {\n  grid-column: span 12;\n  display: grid;', '.bp-notes {\n  display: grid;');
fs.writeFileSync(css, styles);

console.log('Verify band merged; notes grid scope fixed.');

