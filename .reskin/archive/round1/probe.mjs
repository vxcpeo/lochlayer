import { analyzeProject } from 'file:///C:/Users/Administrator/.dsh/skills/reskin/scripts/inventory.mjs';

const inv = await analyzeProject('.');
console.log('assets', JSON.stringify(inv.contentContract.assets, null, 1));
console.log('files scanned', inv.stats.filesScanned, 'vue', inv.stats.vueFiles);
console.log('designSignals colorVars', JSON.stringify((inv.designSignals?.colorVars || []).slice(0, 8)));
