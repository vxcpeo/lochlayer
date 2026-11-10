import fs from 'node:fs';

const file = 'src/views/VerifyView.vue';
let t = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');

if (t.includes('cb-verify__lead')) {
  console.log('already wrapped');
  process.exit(0);
}

const openMarker = '  <div class="cb-verify-stage">\n';
if (!t.includes(openMarker)) throw new Error('stage marker missing');

// 1. pull the limits panel out of the stage tail
const limitsStart = t.indexOf('  <section class="cb-panel cb-verify__limits">');
if (limitsStart < 0) throw new Error('limits missing');
const limitsEnd = t.indexOf('  </section>\n', limitsStart) + '  </section>\n'.length;
const limits = t.slice(limitsStart, limitsEnd);
t = t.slice(0, limitsStart) + t.slice(limitsEnd);

// 2. open the lead column
t = t.replace(openMarker, openMarker + '  <div class="cb-verify__lead">\n');

// 3. close the lead column after the limits panel, before the aside
const asideMarker = '  <div class="cb-panel cb-panel--side cb-verify__aside">';
if (!t.includes(asideMarker)) throw new Error('aside missing');
t = t.replace(asideMarker, `${limits}  </div>\n\n${asideMarker}`);

fs.writeFileSync(file, t, 'utf8');
console.log('verify wrapped');
