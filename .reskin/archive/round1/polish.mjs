import fs from 'node:fs';

const path = 'src/assets/tide.css';
let css = fs.readFileSync(path, 'utf8');
const before = css.length;

function replaceOnce(from, to) {
  if (!css.includes(from)) throw new Error(`missing: ${from.slice(0, 70)}`);
  css = css.replace(from, to);
}

// The injected example report still names its icons sym / sym-sm.
replaceOnce('.tw-sprite {', `.sym {
  width: 1.2em;
  height: 1.2em;
  flex: 0 0 auto;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.sym-sm {
  width: 0.95em;
  height: 0.95em;
}

.tw-sprite {`);

// A word space between the rising words of the headline, whatever the line breaks do.
replaceOnce('.tw-rise {\n  display: inline-block;\n}', `.tw-rise {
  display: inline-block;
  padding-right: 0.24em;
}

.tw-rise:last-child {
  padding-right: 0;
}`);

// The plate's line art is texture, not a figure.
replaceOnce('.tw-plate__deep {\n  position: absolute;\n  inset: 0;\n  opacity: 0.5;\n}', `.tw-plate__deep {
  position: absolute;
  inset: 0;
  opacity: 0.14;
  filter: grayscale(1) contrast(0.9);
  mix-blend-mode: multiply;
}`);

// Panels are narrow: a ledger inside one reads better as term-over-definition.
replaceOnce('.tw-sheet--alarm {', `.tw-sheet .tw-ledger__row {
  grid-template-columns: minmax(0, 1fr);
  row-gap: 0.2rem;
}

.tw-sheet--alarm {`);

// The record beside a step is a four-row key/value list, not a card grid.
replaceOnce('  .tw-record {\n    grid-column: 2;\n    grid-row: 1 / span 4;\n    align-self: start;\n    margin-top: 0.2rem;\n  }', `  .tw-record {
    grid-column: 2;
    grid-row: 1 / span 4;
    align-self: start;
    margin-top: 0.2rem;
    grid-template-columns: minmax(0, 1fr);
  }

  .tw-record__cell {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    border-left: 0;
    border-top: 1px solid var(--t-line);
    padding: 0.55rem 0.75rem;
  }

  .tw-record__cell:first-child {
    border-top: 0;
  }

  .tw-record__val {
    margin: 0;
    justify-content: flex-end;
    text-align: right;
  }`);

// An entry and its button share one line.
replaceOnce('.tw-field__line {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}', `.tw-field__line {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.tw-field__line > .tw-input {
  flex: 1 1 13rem;
  width: auto;
}`);

fs.writeFileSync(path, css, 'utf8');
console.log('css', before, '->', css.length);
