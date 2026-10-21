import fs from 'node:fs';
import path from 'node:path';

const read = (p) => fs.readFileSync(p, 'utf8');
const write = (p, t) => fs.writeFileSync(p, t);

// 1. Wrap the report readout so the injected report sits one level deeper.
const scan = path.join('src', 'components', 'home', 'BpScan.vue');
let scanText = read(scan);
const readoutOpen = '        <div id="scan-report" ref="reportEl" class="bp-readout" @click="onReportClick"></div>';
if (!scanText.includes(readoutOpen)) throw new Error('readout not found');
scanText = scanText.replace(
  readoutOpen,
  '        <div class="bp-readout-frame">\n          <div id="scan-report" ref="reportEl" class="bp-readout" @click="onReportClick"></div>\n        </div>',
);
write(scan, scanText);

// 2. The example report's head is a heading block, not a page landmark.
const example = path.join('src', 'data', 'example-report.html');
let exampleText = read(example);
if (!exampleText.includes('<header class="bp-rep-head">')) throw new Error('example header not found');
exampleText = exampleText.replace('<header class="bp-rep-head">', '<div class="bp-rep-head">');
exampleText = exampleText.replace('</header>', '</div>');
write(example, exampleText);

const report = path.join('src', 'lib', 'report.ts');
let reportText = read(report);
if (!reportText.includes('<header class="bp-rep-head">')) throw new Error('live header not found');
reportText = reportText
  .replace('<header class="bp-rep-head">', '<div class="bp-rep-head">')
  .replace('</header>`', '</div>`');
write(report, reportText);

// 3. A presentation frame inside each documentation sheet, so the prose is not
//    laid out at the same depth as the old rail + section column.
const docs = path.join('src', 'views', 'DocsView.vue');
let docsText = read(docs);
const bodies = (docsText.match(/<div class="bp-doc__body">/g) || []).length;
const closes = (docsText.match(/<\/div>\s*<\/article>/g) || []).length;
if (bodies !== 18 || closes !== 18) throw new Error(`docs bodies ${bodies}, closes ${closes}`);
docsText = docsText
  .replace(/<div class="bp-doc__body">/g, '<div class="bp-doc__frame"><div class="bp-doc__body">')
  .replace(/<\/div>(\s*<\/article>)/g, '</div></div>$1');
write(docs, docsText);

console.log('Readout, report head and docs frames updated.');
