import fs from 'node:fs';

const edits = [
  ['tests/components/scanner.test.ts', [
    ['.failure__title', '.tw-fail__title'],
    [".failure'", ".tw-fail'"],
    ['.failure .cluster', '.tw-fail .tw-cluster'],
    ['#scan-empty .empty__title', '#scan-empty .tw-none__title'],
  ]],
  ['tests/components/verify.test.ts', [
    ["'.notice--done'", "'.tw-verify__band--ok'"],
    ["'.notice__title'", "'.tw-verify__band-title'"],
    [".notice--done'", ".tw-verify__band--ok'"],
    ["'.deflist__row'", "'.tw-ledger__row'"],
    ["'.notice--caution'", "'.tw-verify__band--warn'"],
    ["'#verify-result > .deflist .deflist__row dd span'", "'#verify-result > .tw-ledger .tw-ledger__row dd span'"],
    ["'.verify__value.is-shielded'", "'#verify-result .tw-verify__value.tag-sealed'"],
    ["'.verify__section'", "'.tw-verify__section'"],
    [".verify__value.is-shielded'", ".#verify-result .tw-verify__value.tag-sealed'"],
  ]],
];

for (const [file, pairs] of edits) {
  let text = fs.readFileSync(file, 'utf8');
  for (const [from, to] of pairs) text = text.split(from).join(to);
  fs.writeFileSync(file, text, 'utf8');
  console.log('patched', file);
}
