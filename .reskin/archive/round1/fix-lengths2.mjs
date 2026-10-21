import fs from 'node:fs';

const path = 'src/views/DocsView.vue';
let s = fs.readFileSync(path, 'utf8');
const pairs = [
  ['Shielded address, characters</th><td class="tw-qty tnum">114</td>', 'Shielded address, characters</th><td class="tw-qty tnum">117</td>'],
  ['Payment code, characters</th><td class="tw-qty tnum">168</td>', 'Payment code, characters</th><td class="tw-qty tnum">171</td>'],
];
for (const [a, b] of pairs) {
  if (!s.includes(a)) throw new Error(`missing ${a.slice(0, 40)}`);
  s = s.split(a).join(b);
}
fs.writeFileSync(path, s, 'utf8');
console.log('patched table lengths');
