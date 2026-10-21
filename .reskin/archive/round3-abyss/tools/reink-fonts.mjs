import fs from 'node:fs';

const file = process.argv[2];
let t = fs.readFileSync(file, 'utf8');
t = t
  .replace(/'Libre Franklin', 'Helvetica Neue', Arial, sans-serif/g, "'Trebuchet MS', 'Segoe UI', Arial, sans-serif")
  .replace(/'Old Standard TT', Georgia, serif/g, "'Trebuchet MS', Georgia, serif");
fs.writeFileSync(file, t, 'utf8');
console.log('libre', (t.match(/Libre Franklin/g) || []).length, 'old-standard', (t.match(/Old Standard TT/g) || []).length);
