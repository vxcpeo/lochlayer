/**
 * Dusk and night: the two palettes. The choice is kept in localStorage under
 * `loch:theme`; `?theme=dusk` or `?theme=night` shows a palette without saving
 * it, exactly as public/boot.js does before the page is drawn.
 */

import { ref } from 'vue';
import { THEME_STORAGE_KEY } from './endpoint';

export type Theme = 'dusk' | 'night';

/** The palette on screen. Starts from what the boot script already applied. */
export const theme = ref<Theme>(initialTheme());

/** The palette named in the query string, if any. Not saved until the visitor picks one. */
export function themeFromQuery(search: string = typeof location === 'undefined' ? '' : location.search): Theme | null {
  const match = /[?&]theme=(dusk|night)(?:&|$)/.exec(search);
  return match ? (match[1] as Theme) : null;
}

/** The palette the page should start with: the query first, then the saved one, then night. */
export function initialTheme(): Theme {
  const asked = themeFromQuery();
  if (asked) return asked;
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dusk' || stored === 'night') return stored;
  } catch {
    // A browser that refuses storage gets the default.
  }
  const applied = typeof document === 'undefined' ? null : document.documentElement.getAttribute('data-theme');
  return applied === 'dusk' ? 'dusk' : 'night';
}

/** Applies a palette to the document, and saves it unless told not to. */
export function applyTheme(next: Theme, options: { save?: boolean } = {}): void {
  theme.value = next;
  if (typeof document !== 'undefined') document.documentElement.setAttribute('data-theme', next);
  if (options.save === false) return;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // The palette still changes on this page; it is just not remembered.
  }
}

/** The palette switch's keyboard rule: arrows move to the next or previous option. */
export function nextTheme(current: Theme, key: string): Theme | null {
  if (key === 'ArrowRight' || key === 'ArrowDown') return current === 'dusk' ? 'night' : 'dusk';
  if (key === 'ArrowLeft' || key === 'ArrowUp') return current === 'night' ? 'dusk' : 'night';
  return null;
}
