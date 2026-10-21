import fs from 'node:fs';

const p = 'src/views/VerifyView.vue';
let t = fs.readFileSync(p, 'utf8');
t = t.replace(
  '      <p class="bp-actions">\n        <RouterLink class="bp-btn bp-btn--line" to="/">Back to the start page</RouterLink>',
  '      <p class="bp-tile bp-tile--12 bp-actions">\n        <RouterLink class="bp-btn bp-btn--line" to="/">Back to the start page</RouterLink>',
);
t = t.replace('      </p>\n    </div>\n  </section>', '      </p>\n  </section>');
fs.writeFileSync(p, t);
console.log('back tile:', t.includes('bp-tile bp-tile--12 bp-actions'));
console.log('orphan div:', /\n    <\/div>\n  <\/section>/.test(t));
