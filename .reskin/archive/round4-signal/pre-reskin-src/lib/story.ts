/**
 * The pinned three-step story on the home page: the journey image pans as the
 * page scrolls past it, and the step being read fades in. The reference site
 * does this with a rule in an adopted stylesheet, so no inline style attribute
 * is written; this version sets two custom properties through the CSSOM, which
 * the same policy allows.
 */

const STOPS = [0.17, 0.5, 0.8];
const STEP_SHARE = 3;

function smooth(value: number): number {
  return value * value * (3 - 2 * value);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function focusAt(raw: number): number {
  const t = clamp(raw, 0, STEP_SHARE);
  let last = STOPS[0]!;
  for (let index = 1; index < STOPS.length; index++) {
    const from = index - 0.25;
    const to = index + 0.25;
    if (t <= from) break;
    if (t < to) return last + (STOPS[index]! - last) * smooth((t - from) / (to - from));
    last = STOPS[index]!;
  }
  return last;
}

/** Starts the story. Returns the function that removes every listener. */
export function attachStory(section: HTMLElement): () => void {
  const story = section.querySelector<HTMLElement>('.story');
  const pin = section.querySelector<HTMLElement>('.story__pin');
  const journey = section.querySelector<HTMLElement>('.journey');
  if (!story || !pin || !journey) return () => undefined;

  const root = document.documentElement;
  const wide = window.matchMedia('(min-width: 56rem) and (min-height: 40rem)');
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;

  const update = (): void => {
    frame = 0;
    if (section.dataset.story === undefined) return;
    const rect = story.getBoundingClientRect();
    const span = rect.height - pin.clientHeight;
    const raw = span > 0 ? STEP_SHARE * clamp(-rect.top / span, 0, 1) : 0;
    const step = Math.min(2, Math.floor(raw));
    const focus = focusAt(raw);
    const width = journey.offsetWidth;
    const pinWidth = pin.clientWidth;
    const pan = width <= pinWidth ? (pinWidth - width) / 2 : clamp(pinWidth / 2 - focus * width, pinWidth - width, 0);
    section.dataset.step = String(step);
    section.style.setProperty('--focus', focus.toFixed(4));
    section.style.setProperty('--pan', `${pan.toFixed(1)}px`);
  };

  const onScroll = (): void => {
    if (frame === 0) frame = window.requestAnimationFrame(update);
  };

  const enable = (): void => {
    if (wide.matches && !calm.matches && root.dataset.motion !== 'reduce') {
      section.dataset.story = '';
      onScroll();
      return;
    }
    delete section.dataset.story;
    delete section.dataset.step;
    section.style.removeProperty('--focus');
    section.style.removeProperty('--pan');
    if (frame !== 0) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  wide.addEventListener('change', enable);
  calm.addEventListener('change', enable);
  const observer = new MutationObserver(enable);
  observer.observe(root, { attributes: true, attributeFilter: ['data-motion'] });
  const image = journey.querySelector('img');
  image?.addEventListener('load', onScroll);
  enable();

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    wide.removeEventListener('change', enable);
    calm.removeEventListener('change', enable);
    image?.removeEventListener('load', onScroll);
    observer.disconnect();
    if (frame !== 0) cancelAnimationFrame(frame);
  };
}
