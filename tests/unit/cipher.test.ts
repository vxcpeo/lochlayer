import { afterEach, describe, expect, it, vi } from 'vitest';
import { startCipher } from '@/lib/cipher';

describe('the water line', () => {
  it('is finished at once when the visitor asked for less motion', () => {
    document.documentElement.setAttribute('data-motion', 'reduce');
    const element = document.createElement('span');
    element.textContent = 'The Velaira is not.';
    startCipher(element);
    expect(element.getAttribute('data-set')).toBe('');
    expect(element.querySelector('.cipher')).toBeNull();
  });

  it('is finished at once in a browser without the Font Loading API', () => {
    const element = document.createElement('span');
    element.textContent = 'The Velaira is not.';
    startCipher(element);
    expect(element.getAttribute('data-set')).toBe('');
  });

  it('is finished at once when the element has more than one text node', () => {
    const element = document.createElement('span');
    element.append(document.createTextNode('The Velaira'));
    element.append(document.createElement('b'));
    element.append(document.createTextNode(' is not.'));
    startCipher(element);
    expect(element.getAttribute('data-set')).toBe('');
  });

  it('leaves the text itself untouched', () => {
    const element = document.createElement('span');
    element.textContent = 'The Velaira is not.';
    startCipher(element);
    expect(element.textContent).toBe('The Velaira is not.');
    expect(element.innerHTML).toBe('The Velaira is not.');
  });

  afterEach(() => {
    document.documentElement.removeAttribute('data-motion');
    vi.restoreAllMocks();
  });
});
