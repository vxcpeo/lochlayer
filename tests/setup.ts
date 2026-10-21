import { afterEach, beforeEach, vi } from 'vitest';

/** A window.matchMedia that answers as a desktop browser with no motion preference. */
function matchMedia(query: string): MediaQueryList {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const result = {
    matches: !/max-width|prefers-reduced-motion/.test(query),
    media: query,
    onchange: null,
    addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.add(listener),
    removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.delete(listener),
    addListener: (listener: (event: MediaQueryListEvent) => void) => listeners.add(listener),
    removeListener: (listener: (event: MediaQueryListEvent) => void) => listeners.delete(listener),
    dispatchEvent: (event: Event) => {
      for (const listener of listeners) listener(event as MediaQueryListEvent);
      return true;
    },
  };
  return result as unknown as MediaQueryList;
}

beforeEach(() => {
  document.documentElement.removeAttribute('data-theme');
  document.documentElement.removeAttribute('data-js');
  document.documentElement.removeAttribute('data-framed');
  document.documentElement.removeAttribute('data-motion');
  document.body.innerHTML = '';
  document.head.innerHTML = '';
  localStorage.clear();

  vi.stubGlobal('matchMedia', matchMedia);
  Object.defineProperty(window, 'matchMedia', { value: matchMedia, configurable: true, writable: true });

  // jsdom lays nothing out: give every element a column width so the report's
  // figures are drawn, and make scrollIntoView a no-op.
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, get: () => 640 });
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, get: () => 640 });
  Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, value: () => undefined });
  Object.defineProperty(window, 'requestAnimationFrame', {
    configurable: true,
    value: (callback: FrameRequestCallback) => setTimeout(() => callback(performance.now()), 0) as unknown as number,
  });
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
    },
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});
