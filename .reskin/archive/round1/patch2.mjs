import fs from 'node:fs';

const edits = [
  ['src/views/DocsView.vue', [
    ['<p class="page__actions"><router-link class="btn btn--quiet" to="/">Back to the start page</router-link></p>',
      '<p class="tw-actions"><RouterLink class="tw-btn tw-btn--line" to="/">Back to the start page</RouterLink></p>'],
  ]],
  ['src/components/SiteIcons.vue', [
    ['class="sprite"', 'class="tw-sprite"'],
  ]],
  ['tests/components/views.test.ts', [
    ["wrapper.findAll('main, section')", "wrapper.findAll('main > section')"],
  ]],
];

for (const [file, pairs] of edits) {
  let text = fs.readFileSync(file, 'utf8');
  for (const [from, to] of pairs) {
    if (!text.includes(from)) throw new Error(`missing in ${file}: ${from.slice(0, 60)}`);
    text = text.split(from).join(to);
  }
  fs.writeFileSync(file, text, 'utf8');
  console.log('patched', file);
}
