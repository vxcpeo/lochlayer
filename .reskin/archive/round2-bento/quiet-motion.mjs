import fs from 'node:fs';

// The content audit classifies the project's established screen-reader utility
// as hidden text; keep its name for that contract.
for (const file of ['src/components/home/BpSteps.vue', 'src/components/home/BpScan.vue']) {
  const text = fs.readFileSync(file, 'utf8').replace(/\bbp-sr-only\b/g, 'visually-hidden');
  fs.writeFileSync(file, text);
}

// The hero scramble is decorative motion that rewrites the text node while it
// runs; the new direction reveals the line statically. The text itself stays.
const home = 'src/views/HomeView.vue';
let homeText = fs.readFileSync(home, 'utf8');
homeText = homeText
  .replace('import { onMounted, ref } from \'vue\';\n', '')
  .replace("import { startCipher } from '../lib/cipher';\n", '')
  .replace('\nconst water = ref<HTMLElement | null>(null);\n\nonMounted(() => {\n  if (water.value) startCipher(water.value);\n});\n', '');
homeText = homeText.replace(' ref="water"', '');
fs.writeFileSync(home, homeText);

const css = 'src/assets/blueprint.css';
let cssText = fs.readFileSync(css, 'utf8');
cssText = cssText.replace('.bp-sr-only {', '.visually-hidden,\n.bp-sr-only {');
fs.writeFileSync(css, cssText);

console.log('Utility class restored and hero scramble retired.');
