import fs from 'node:fs';

const c = JSON.parse(fs.readFileSync('.reskin/baseline/content-contract.json', 'utf8'));
const show = (label, arr, fmt) => {
  console.log(`\n===== ${label} (${arr.length})`);
  for (const x of arr) console.log(' ', fmt(x));
};
show('assets', c.assets, (x) => `${x.count}x ${x.kind}=${x.value}`);
show('attributes', c.attributes, (x) => `${x.count}x ${x.name}=${x.value}`);
show('bindings', c.bindings, (x) => `${x.count}x ${x.kind}:${x.expr}`);
show('events', c.events, (x) => `${x.count}x @${x.event}=${x.handler}`);
show('forms', c.forms, (x) => `${x.count}x ${x.tag}:${x.name}:${x.type}`);
show('hiddenText', c.hiddenText, (x) => `${x.count}x ${x.value}`);
show('links', c.links, (x) => `${x.count}x ${x.kind}:${x.target}`);
console.log('\nmeta', JSON.stringify(c.meta));
