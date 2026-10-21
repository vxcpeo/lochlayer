import fs from 'node:fs';

const path = 'src/views/DocsView.vue';
let s = fs.readFileSync(path, 'utf8');
const pairs = [
  ['<span class="tnum">114</span> characters', '<span class="tnum">117</span> characters'],
  ['<span class="tnum">168</span> characters', '<span class="tnum">171</span> characters'],
  ['Shielded address, characters</th><td class="qty tnum">114</td>', 'Shielded address, characters</th><td class="qty tnum">117</td>'],
  ['Payment code, characters</th><td class="qty tnum">168</td>', 'Payment code, characters</th><td class="qty tnum">171</td>'],
];
for (const [a, b] of pairs) {
  if (!s.includes(a)) {
    console.log('MISS', a.slice(0, 50));
    continue;
  }
  s = s.split(a).join(b);
}
fs.writeFileSync(path, s, 'utf8');
console.log('patched lengths');
