import { describe, expect, it } from 'vitest';
import { applyTheme, initialTheme, nextTheme, theme, themeFromQuery } from '@/lib/theme';

describe('the palette', () => {
  it('reads ?theme= only in its two spellings', () => {
    expect(themeFromQuery('?theme=dusk')).toBe('dusk');
    expect(themeFromQuery('?a=1&theme=night')).toBe('night');
    expect(themeFromQuery('?theme=night&a=1')).toBe('night');
    expect(themeFromQuery('?theme=blue')).toBeNull();
    expect(themeFromQuery('')).toBeNull();
  });

  it('starts from the query, then from storage, then from night', () => {
    expect(initialTheme()).toBe('night');
    localStorage.setItem('velaira:theme', 'dusk');
    expect(initialTheme()).toBe('dusk');
    window.history.replaceState(null, '', '/?theme=night');
    expect(initialTheme()).toBe('night');
    window.history.replaceState(null, '', '/');
  });

  it('applies the palette and remembers it', () => {
    applyTheme('dusk');
    expect(theme.value).toBe('dusk');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dusk');
    expect(localStorage.getItem('velaira:theme')).toBe('dusk');
    applyTheme('night', { save: false });
    expect(theme.value).toBe('night');
    expect(localStorage.getItem('velaira:theme')).toBe('dusk');
  });

  it('moves between the two with the arrow keys, wrapping around', () => {
    expect(nextTheme('dusk', 'ArrowRight')).toBe('night');
    expect(nextTheme('night', 'ArrowRight')).toBe('dusk');
    expect(nextTheme('dusk', 'ArrowLeft')).toBe('night');
    expect(nextTheme('night', 'ArrowUp')).toBe('dusk');
    expect(nextTheme('night', 'Enter')).toBeNull();
    expect(nextTheme('night', 'a')).toBeNull();
  });
});
