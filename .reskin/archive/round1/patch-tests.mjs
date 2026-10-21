import fs from 'node:fs';

const edits = {
  'tests/components/scanner.test.ts': [
    ["'@/components/home/ScannerSection.vue'", "'@/components/home/TwScan.vue'"],
    ['ScannerSection', 'TwScan'],
    ['details.scan-example', 'details.rd-example'],
    ['.report .flag', '.rd-sheet .rd-flag'],
    ['.report__name', '.rd-name'],
    ['.scan-example', '.rd-example'],
    ["'lc-bed'", "'rdc-bed'"],
    ["'lc-hours'", "'rdc-hours'"],
    ["'lc-who'", "'rdc-who'"],
  ],
  'tests/components/views.test.ts': [
    ['.mirror__land', '.tw-mirror__land'],
    ['.mirror__water', '.tw-mirror__water'],
    ['.hero__popup .popup', '.tw-plate .tw-device'],
    ['.hero__popup figcaption', '.tw-plate__figure figcaption'],
    ['.steps .step', '.tw-steps .tw-step'],
    ['.doc__toc a', '.tw-doc__toc a'],
    ['a.btn--quiet', 'a.tw-btn--line'],
    ['a.btn--primary', 'a.tw-btn--fill'],
    ['.deflist', '.tw-ledger'],
    ['.scan-example', '.rd-example'],
    ['.fit svg', '.rd-fit svg'],
  ],
};

for (const [file, pairs] of Object.entries(edits)) {
  let text = fs.readFileSync(file, 'utf8');
  for (const [from, to] of pairs) text = text.split(from).join(to);
  fs.writeFileSync(file, text, 'utf8');
  console.log('patched', file);
}
