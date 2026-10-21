/**
 * The hero's water line: "The Velaira is not." is revealed letter by letter from
 * a scramble of characters. Ported from the reference site's own page script.
 *
 * The animation is decoration only: it writes nothing from the page into the
 * DOM unescaped (it only reuses the text already there), makes no request and
 * stops on a resize or when the visitor asked for less motion.
 */

const SCRAMBLE = 'acenosuvxzECLTFSZ';

function randomChar(): string {
  return SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)] ?? 'x';
}

function reduced(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'reduce';
}

/** Starts the reveal on `element`, or finishes it at once when motion is reduced. */
export function startCipher(element: HTMLElement): void {
  const reset = (): void => {
    element.querySelector('.ab-scramble')?.remove();
    element.removeAttribute('data-cipher');
    element.setAttribute('data-set', '');
  };

  const node = element.firstChild;
  if (reduced() || !(node instanceof Text) || element.childNodes.length !== 1 || !document.fonts) {
    reset();
    return;
  }

  document.fonts.ready.then(() => {
    const range = document.createRange();
    const lines: string[] = [];
    let lastTop = Number.NaN;
    [...node.data].forEach((character, index) => {
      range.setStart(node, index);
      range.setEnd(node, index + 1);
      const top = Math.round(range.getBoundingClientRect().top);
      if (lines.length === 0 || (character.trim() !== '' && Math.abs(top - lastTop) > 2)) {
        lines.push('');
        lastTop = top;
      }
      lines[lines.length - 1] += character;
    });

    const cipher = document.createElement('span');
    cipher.className = 'ab-scramble';
    cipher.setAttribute('aria-hidden', 'true');
    const spans = lines.map((line) => {
      const span = document.createElement('span');
      span.textContent = line;
      cipher.append(span);
      return span;
    });

    let index = 0;
    const delays = lines.map((line) => [...line].map((character) => (character.trim() === '' ? 0 : 260 + 62 * index++ + 90 * Math.random())));
    const total = 260 + 62 * index + 90;

    element.append(cipher);
    element.setAttribute('data-cipher', '');
    element.setAttribute('data-set', '');

    const start = performance.now();
    let step = -1;
    let done = false;
    const finish = (): void => {
      if (done) return;
      done = true;
      window.removeEventListener('resize', finish);
      reset();
    };
    const frame = (now: number): void => {
      if (done) return;
      const elapsed = now - start;
      if (elapsed >= total) {
        finish();
        return;
      }
      const next = Math.floor(elapsed / 52);
      if (next !== step) {
        step = next;
        lines.forEach((line, lineIndex) => {
          spans[lineIndex]!.textContent = [...line].map((character, characterIndex) => (elapsed >= delays[lineIndex]![characterIndex]! ? character : randomChar())).join('');
        });
      }
      requestAnimationFrame(frame);
    };
    window.addEventListener('resize', finish);
    requestAnimationFrame(frame);
  });
}

