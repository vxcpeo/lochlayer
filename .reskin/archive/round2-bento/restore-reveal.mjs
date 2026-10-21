import fs from 'node:fs';

const home = 'src/views/HomeView.vue';
let text = fs.readFileSync(home, 'utf8');
text = text.replace(
  "<script setup lang=\"ts\">\nimport BlueprintShell",
  "<script setup lang=\"ts\">\nimport { onMounted, ref } from 'vue';\nimport BlueprintShell",
);
text = text.replace(
  'import BpSteps from \'../components/home/BpSteps.vue\';',
  'import BpSteps from \'../components/home/BpSteps.vue\';\n\nconst water = ref<HTMLElement | null>(null);\n\nonMounted(() => {\n  // The reveal effect\'s final state: the line is drawn once by a copy of itself,\n  // generated from the text already on the page. The original stays in place, inset.\n  const el = water.value;\n  if (!el) return;\n  const overlay = document.createElement(\'span\');\n  overlay.className = \'bp-scramble\';\n  overlay.setAttribute(\'aria-hidden\', \'true\');\n  overlay.textContent = el.textContent ?? \'\';\n  el.setAttribute(\'data-set\', \'\');\n  el.append(overlay);\n});',
);
text = text.replace('<span class="bp-mirror__water">The Miston is not.</span>', '<span ref="water" class="bp-mirror__water">The Miston is not.</span>');
fs.writeFileSync(home, text);

const css = 'src/assets/blueprint.css';
let styles = fs.readFileSync(css, 'utf8');
styles = styles.replace(
  '.bp-mirror__water {\n  display: block;\n  color: var(--bp-accent);\n}',
  '.bp-mirror__water {\n  position: relative;\n  display: block;\n  color: var(--bp-accent);\n}\n\n.bp-mirror__water[data-set] {\n  color: transparent;\n}\n\n.bp-mirror__water .bp-scramble {\n  position: absolute;\n  inset: 0;\n  display: block;\n  color: var(--bp-accent);\n}',
);
styles = styles.replace(
  '/* the cipher overlay, drawn by lib/cipher.ts */\n.bp-mirror__water .bp-scramble {\n  display: inline;\n}\n',
  '',
);
fs.writeFileSync(css, styles);
console.log('Static reveal overlay restored.');
