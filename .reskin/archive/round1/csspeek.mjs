import fs from 'node:fs';

const css = fs.readFileSync('src/assets/site.css', 'utf8');
for (const needle of ['keeps__figure', 'hero__popup', 'popup__water', 'popup__deep']) {
  console.log('\n######', needle);
  let i = -1;
  let n = 0;
  while ((i = css.indexOf(needle, i + 1)) !== -1 && n < 6) {
    n += 1;
    console.log('...', css.slice(Math.max(0, i - 200), i + 260).replace(/\s+/g, ' '));
  }
}
