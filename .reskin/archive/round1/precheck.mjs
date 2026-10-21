import fs from 'node:fs/promises';
import { analyzeProject, contractDiff } from 'file:///C:/Users/Administrator/.dsh/skills/reskin/scripts/inventory.mjs';

const baseline = JSON.parse(await fs.readFile('.reskin/baseline/content-contract.json', 'utf8'));
const current = await analyzeProject('.');
const diff = contractDiff(baseline, current.contentContract, { allowAdditions: true });
const blocking = [];
for (const w of diff.warnings) {
  if (/^(visibleText|i18n|forms): (?:added|".*" count increased)/.test(w)) blocking.push(w);
}
console.log('routes', current.routes.map((r) => r.path).join(' '));
console.log('archetype', current.archetype?.id, current.archetype?.family);
console.log('contract hash', current.contentContractHash);
console.log('issues', diff.issues.length);
for (const i of diff.issues) console.log('  ISSUE', i);
console.log('additions(counts)', blocking.length);
for (const i of blocking.slice(0, 20)) console.log('  ADD', i);
console.log('other warnings', diff.warnings.length - blocking.length);
for (const w of diff.warnings.filter((x) => !blocking.includes(x)).slice(0, 12)) console.log('  warn', w);
