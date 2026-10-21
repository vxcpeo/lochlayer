import fs from 'node:fs';

const widths = [280, 318, 360, 400, 440, 480, 520, 568, 612, 656, 704, 757];
const lines = [];
lines.push('.rd-fit {');
lines.push('  min-width: 0;');
lines.push('  container-type: inline-size;');
lines.push('}');
lines.push('');
lines.push('.rd-fit > [data-w] {');
lines.push('  display: none;');
lines.push('}');
lines.push('');
lines.push('.rd-fit > svg[data-w] {');
lines.push('  width: 100%;');
lines.push('  height: auto;');
lines.push('}');
lines.push('');
lines.push('.rd-fit > [data-w]:first-child {');
lines.push('  display: block;');
lines.push('}');
lines.push('');
lines.push('@supports selector(:has(a)) {');
for (const w of widths.slice(1)) {
  lines.push(`  @container (min-width: ${w}px) {`);
  lines.push(`    .rd-fit:has(> [data-w="${w}"]) > [data-w] { display: none; }`);
  lines.push(`    .rd-fit > [data-w][data-w="${w}"] { display: block; }`);
  lines.push('  }');
}
lines.push('}');

const marker = '.rd-fit {\n  display: none;\n}\n\n.rd-fit.is-on {\n  display: block;\n}\n';
const css = fs.readFileSync('src/assets/tide.css', 'utf8');
if (!css.includes(marker)) {
  console.error('marker not found');
  process.exit(1);
}
fs.writeFileSync('src/assets/tide.css', css.replace(marker, `${lines.join('\n')}\n`), 'utf8');
console.log('patched; css bytes', fs.statSync('src/assets/tide.css').size);
