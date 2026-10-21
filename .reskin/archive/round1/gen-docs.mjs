import fs from 'node:fs/promises';

const src = await fs.readFile('.reskin/original-src/views/DocsView.vue', 'utf8');

const MAP = {
  'doc__body': 'tw-doc__body',
  'doc__list': 'tw-doc__list',
  'doc__status': '',
  'doc__section': 'tw-doc__section',
  'doc__label': 'tw-doc__rail-title',
  'doc__toc': 'tw-doc__toc',
  'table-scroll': 'tw-tablewrap',
  table: 'tw-table',
  num: 'tw-qty',
  fig: 'tnum',
  'fig-unit': 'tnum-unit',
  'is-shielded': 'tag-sealed',
  'is-public': 'tag-open',
  deflist: 'tw-ledger',
  'deflist--caution': 'tw-ledger--alarm',
  'deflist__row': 'tw-ledger__row',
  notice: 'tw-callout',
  'notice--caution': '',
  'notice__title': 'tw-callout__title',
  'notice--inline': 'tw-callout--inline',
  icon: 'tw-sym',
  link: 'tw-link',
  code: 'tw-code',
  't-display-3': '',
  't-display-1': '',
  't-lede': '',
  'waterline': '',
  'doc__contents': '',
};

function remapClasses(html) {
  return html.replace(/class="([^"]*)"/g, (whole, body) => {
    const out = body
      .split(/\s+/)
      .filter(Boolean)
      .map((token) => (token in MAP ? MAP[token] : token))
      .filter(Boolean)
      .join(' ');
    return out ? `class="${out}"` : '';
  });
}

const grab = (re, label) => {
  const m = re.exec(src);
  if (!m) throw new Error(`missing ${label}`);
  return m;
};

const h1 = grab(/<h1 class="t-display-1" id="page-title">([\s\S]*?)<\/h1>/, 'h1')[1];
const lede = grab(/<p class="t-lede">([\s\S]*?)<\/p>/, 'lede')[1];
const notice = grab(/<div class="notice notice--caution doc__status">([\s\S]*?)<\/div>/, 'notice')[1];
const toc = grab(/<ol class="doc__toc">([\s\S]*?)<\/ol>/, 'toc')[1];

const sectionRe = /<section class="doc__section" id="([\w-]+)" aria-labelledby="([\w-]+)">([\s\S]*?)<\/section>/g;
const sections = [...src.matchAll(sectionRe)];
if (sections.length !== 18) throw new Error(`expected 18 sections, found ${sections.length}`);

const tocItems = [...toc.matchAll(/<li>\s*<a class="link" href="([^"]+)">([\s\S]*?)<\/a>\s*<\/li>/g)];
if (tocItems.length !== 18) throw new Error(`expected 18 toc items, found ${tocItems.length}`);

const out = [];
out.push('<template>');
out.push('  <TideLayout>');
out.push('    <template #thesis>');
out.push(`      <h1 class="tw-thesis__title" id="page-title">${h1}</h1>`);
out.push(`      <p class="tw-thesis__lede">${lede}</p>`);
out.push('    </template>');
out.push('');
out.push('    <div class="tw-doc">');
out.push('      <div class="tw-doc__rail">');
out.push('        <h2 class="tw-doc__rail-title" id="contents-title">On this page</h2>');
out.push('        <ol class="tw-doc__toc">');
for (const item of tocItems) {
  out.push(`          <li><a href="${item[1]}">${item[2].trim()}</a></li>`);
}
out.push('        </ol>');
out.push('      </div>');
out.push('');
out.push('      <div class="tw-doc__sections">');
out.push(`        <div class="tw-callout tw-callout--top">${remapClasses(notice).trim()}</div>`);
for (const section of sections) {
  const [, id, labelledBy, inner] = section;
  const heading = /<h2 class="t-display-3" id="([\w-]+)">([\s\S]*?)<\/h2>/.exec(inner);
  if (!heading) throw new Error(`missing heading in ${id}`);
  const body = inner.slice(heading.index + heading[0].length);
  out.push('');
  out.push(`        <section class="tw-doc__section" id="${id}" aria-labelledby="${labelledBy}">`);
  out.push(`          <h2 id="${heading[1]}">${heading[2]}</h2>`);
  out.push(`          ${remapClasses(body).trim()}`);
  out.push('        </section>');
}
out.push('      </div>');
out.push('    </div>');
out.push('  </TideLayout>');
out.push('</template>');
out.push('');
out.push('<script setup lang="ts">');
out.push("import TideLayout from '../components/TideLayout.vue';");
out.push('</script>');
out.push('');

const text = out.join('\n');
await fs.writeFile('.reskin/DocsView.new.vue', text, 'utf8');
console.log('wrote .reskin/DocsView.new.vue', text.length, 'bytes');
console.log(text.slice(0, 2200));
