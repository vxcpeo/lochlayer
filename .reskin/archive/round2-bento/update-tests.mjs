import fs from 'node:fs';

function edit(file, pairs) {
  let text = fs.readFileSync(file, 'utf8');
  for (const [from, to] of pairs) {
    if (!text.includes(from)) throw new Error(`${file}: missing ${from.slice(0, 70)}`);
    text = text.split(from).join(to);
  }
  fs.writeFileSync(file, text);
}

edit('tests/components/layout.test.ts', [
  ["import MistonLayout from '@/components/MistonLayout.vue';", "import BlueprintShell from '@/components/BlueprintShell.vue';"],
  ["describe('the spine', () => {", "describe('the masthead', () => {"],
  ["it('holds the narrative column, the stage and the footer on every page', async () => {", "it('holds the masthead, the canvas and the footer on every page', async () => {"],
  ["const home = await mountWithRouter(MistonLayout, { route: '/' });\n    expect(home.wrapper.find('aside.tw-spine').exists()).toBe(true);\n    expect(home.wrapper.find('main#main').exists()).toBe(true);\n    expect(home.wrapper.find('footer.tw-foot').exists()).toBe(true);\n    expect(home.wrapper.find('header').exists()).toBe(false);",
   "const home = await mountWithRouter(BlueprintShell, { route: '/' });\n    expect(home.wrapper.find('header.bp-masthead').exists()).toBe(true);\n    expect(home.wrapper.find('main#main').exists()).toBe(true);\n    expect(home.wrapper.find('footer.bp-foot').exists()).toBe(true);\n    expect(home.wrapper.find('aside').exists()).toBe(false);"],
  ["const links = home.wrapper.findAll('nav a')", "const links = home.wrapper.findAll('.bp-index a')"],
  ["const docs = await mountWithRouter(MistonLayout, { route: '/docs' });\n    expect(docs.wrapper.findAll('nav a')", "const docs = await mountWithRouter(BlueprintShell, { route: '/docs' });\n    expect(docs.wrapper.findAll('.bp-index a')"],
  ["expect(docs.wrapper.find('nav a[href=\"/docs\"]')", "expect(docs.wrapper.find('.bp-index a[href=\"/docs\"]')"],
  ["expect((await mountWithRouter(MistonLayout, { route: '/' })).wrapper.find('.tw-cta')", "expect((await mountWithRouter(BlueprintShell, { route: '/' })).wrapper.find('.bp-cta')"],
  ["expect((await mountWithRouter(MistonLayout, { route: '/verify' })).wrapper.find('.tw-cta')", "expect((await mountWithRouter(BlueprintShell, { route: '/verify' })).wrapper.find('.bp-cta')"],
  ["expect((await mountWithRouter(MistonLayout, { route: '/docs' })).wrapper.find('.tw-cta')", "expect((await mountWithRouter(BlueprintShell, { route: '/docs' })).wrapper.find('.bp-cta')"],
  ["expect((await mountWithRouter(MistonLayout, { route: '/install' })).wrapper.find('.tw-cta')", "expect((await mountWithRouter(BlueprintShell, { route: '/install' })).wrapper.find('.bp-cta')"],
  ["const { wrapper } = await mountWithRouter(MistonLayout, { route: '/' });", "const { wrapper } = await mountWithRouter(BlueprintShell, { route: '/' });"],
  ["it('is a radiogroup only where scripts run, as the reference page is', async () => {", "it('keeps a two-option radiogroup for the palette', async () => {"],
  ["expect(wrapper.find('[role=\"radiogroup\"]').classes()).toContain('js-only');", "expect(wrapper.find('[role=\"radiogroup\"]').classes()).toContain('bp-pal');"],
]);

edit('tests/components/scanner.test.ts', [
  ["import TwScan from '@/components/home/TwScan.vue';", "import BpScan from '@/components/home/BpScan.vue';"],
  ["mount(TwScan", "mount(BpScan"],
  ["details.rd-example", "details.bp-rep-example"],
  [".rd-sheet .rd-flag", ".bp-rep-sheet .bp-rep-flag"],
  ["rdc-bed", "bp-plot-bed"],
  ["rdc-hours", "bp-plot-hours"],
  ["rdc-who", "bp-plot-who"],
  [".rd-name", ".bp-rep-name"],
  [".rd-example", ".bp-rep-example"],
  [".tw-fail__title", ".bp-fail__title"],
  [".tw-fail", ".bp-fail"],
  [".tw-cluster", ".bp-cluster"],
  [".tw-none__title", ".bp-none__title"],
]);

edit('tests/components/verify.test.ts', [
  [".tw-verify__band--ok", ".bp-verify__band--ok"],
  [".tw-verify__band--warn", ".bp-verify__band--warn"],
  [".tw-verify__band-title", ".bp-verify__band-title"],
  [".tw-ledger__row", ".bp-ledger__row"],
  [".tw-ledger", ".bp-ledger"],
  [".tw-verify__value", ".bp-verify__value"],
  ["tag-sealed", "bp-shielded"],
  [".tw-verify__section", ".bp-verify__section"],
]);

edit('tests/components/views.test.ts', [
  [".tw-mirror__land", ".bp-mirror__land"],
  ["expect(wrapper.find('#hero-title .tw-mirror__water').text()).toBe('The Miston is not.');", "expect(wrapper.find('#hero-title .bp-mirror__water').element.firstChild?.textContent).toBe('The Miston is not.');"],
  [".tw-plate .tw-device", ".bp-plate .bp-device"],
  [".tw-plate__figure", ".bp-plate__figure"],
  [".tw-steps .tw-step", ".bp-steps .bp-step"],
  [".rd-example", ".bp-rep-example"],
  [".rd-fit svg", ".bp-rep-fit svg"],
  [".tw-doc__toc a", ".bp-doc__toc a"],
  ["wrapper.find(`section${href}`)", "wrapper.find(`article${href}`)"],
  ["a.tw-btn--line", "a.bp-btn--line"],
  ["a.tw-btn--fill", "a.bp-btn--fill"],
  [".tw-ledger", ".bp-ledger"],
]);

edit('tests/unit/report.test.ts', [
  ['class="rd-row rd-row-open"', 'class="bp-rep-row bp-rep-row-open"'],
  ['<span class="rd-figure tnum">100</span>', '<span class="bp-rep-figure bp-num">100</span>'],
  ['rd-row-total', 'bp-rep-row-total'],
  ['<span class="tnum-sign">−</span>16', '<span class="bp-sign">−</span>16'],
  ['<span class="rd-sev" data-sev="medium">Medium</span>', '<span class="bp-rep-sev" data-sev="medium">Medium</span>'],
  ['<span class="rd-sev" data-sev="low">Low</span>', '<span class="bp-rep-sev" data-sev="low">Low</span>'],
  ['<article class="rd-sheet wet" data-depth="120"', '<article class="bp-rep-sheet bp-wet" data-depth="120"'],
  ['<span class="tnum">Fh3q…Tz8K</span>', '<span class="bp-num">Fh3q…Tz8K</span>'],
  ['<span class="digit digit-xl tag-open">49</span>', '<span class="bp-figure bp-figure--xl bp-exposed">49</span>'],
  ["toContain('rdc-bed')", "toContain('bp-plot-bed')"],
  ["toContain('rdc-hours')", "toContain('bp-plot-hours')"],
  ["toContain('rdc-who')", "toContain('bp-plot-who')"],
  ['<details class="rd-fold rd-example"', '<details class="bp-rep-fold bp-rep-example"'],
  ['/rdc rdc-bed/g', '/bp-plot bp-plot-bed/g'],
  ['/rdc rdc-hours/g', '/bp-plot bp-plot-hours/g'],
  ['/rdc rdc-who/g', '/bp-plot bp-plot-who/g'],
]);

console.log('Tests updated for the new presentation.');
