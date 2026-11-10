import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { applyTheme } from '@/lib/theme';
import CobaltBar from '@/components/CobaltBar.vue';
import CobaltRail from '@/components/CobaltRail.vue';
import CobaltStatus from '@/components/CobaltStatus.vue';
import { mountWithRouter } from '../helpers';

beforeEach(() => {
  applyTheme('night', { save: false });
});

describe('the glyph rail', () => {
  it('is a navigation spine with the four routes and no sidebar labels', async () => {
    const home = await mountWithRouter(CobaltRail, { route: '/' });
    expect(home.wrapper.find('nav.cb-spine').exists()).toBe(true);
    expect(home.wrapper.find('aside').exists()).toBe(false);
    expect(home.wrapper.findAll('.cb-nav__link')).toHaveLength(4);
  });

  it('links to each page from the rail', async () => {
    const docs = await mountWithRouter(CobaltRail, { route: '/docs' });
    const routes = docs.wrapper.findAll('.cb-nav__link').map((link) => [link.attributes('href'), link.attributes('aria-label')]);
    expect(routes).toEqual([
      ['/docs', 'Docs'],
      ['/install', 'Install'],
      ['/privacy', 'Privacy'],
      ['/verify', 'Check a receipt'],
    ]);
    expect(docs.wrapper.find('.cb-nav__link[href="/docs"]').attributes('aria-current')).toBe('page');
  });
});

describe('the command bar', () => {
  it('holds the brand, the section links and the palette', async () => {
    const home = await mountWithRouter(CobaltBar, { route: '/' });
    expect(home.wrapper.find('header.cb-bar').exists()).toBe(true);
    expect(home.wrapper.find('.cb-brand').exists()).toBe(true);
    expect(home.wrapper.find('.cb-brand__word').text()).toBe('Enclaven');
    expect(home.wrapper.findAll('.cb-sections a')).toHaveLength(3);
  });

  it('shows the install button except on the install page itself', async () => {
    expect((await mountWithRouter(CobaltBar, { route: '/' })).wrapper.find('.cb-cta').exists()).toBe(true);
    expect((await mountWithRouter(CobaltBar, { route: '/verify' })).wrapper.find('.cb-cta').exists()).toBe(true);
    expect((await mountWithRouter(CobaltBar, { route: '/docs' })).wrapper.find('.cb-cta').exists()).toBe(true);
    expect((await mountWithRouter(CobaltBar, { route: '/install' })).wrapper.find('.cb-cta').exists()).toBe(false);
  });

  it('switches the palette and remembers it', async () => {
    const { wrapper } = await mountWithRouter(CobaltBar, { route: '/' });
    const radios = wrapper.findAll('button[role="radio"]');
    expect(radios[0]!.attributes('aria-checked')).toBe('false');
    await radios[0]!.trigger('click');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dusk');
    expect(localStorage.getItem('enclaven:theme')).toBe('dusk');
    expect(wrapper.findAll('button[role="radio"]')[0]!.attributes('aria-checked')).toBe('true');
    expect(wrapper.findAll('button[role="radio"]')[1]!.attributes('tabindex')).toBe('-1');
  });

  it('moves between the two palettes with the arrow keys', async () => {
    const { wrapper } = await mountWithRouter(CobaltBar, { route: '/' });
    const group = wrapper.find('[role="radiogroup"]');
    await group.trigger('keydown', { key: 'ArrowRight' });
    expect(document.documentElement.getAttribute('data-theme')).toBe('dusk');
    await group.trigger('keydown', { key: 'ArrowRight' });
    expect(document.documentElement.getAttribute('data-theme')).toBe('night');
    await group.trigger('keydown', { key: 'ArrowLeft' });
    expect(document.documentElement.getAttribute('data-theme')).toBe('dusk');
    await group.trigger('keydown', { key: 'Enter' });
    expect(document.documentElement.getAttribute('data-theme')).toBe('dusk');
  });

  it('keeps a two-option radiogroup for the palette', async () => {
    const { wrapper } = await mountWithRouter(CobaltBar, { route: '/' });
    expect(wrapper.find('[role="radiogroup"]').classes()).toContain('cb-palette');
    expect(wrapper.findAll('button[role="radio"]')).toHaveLength(2);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
});

describe('the section links in the bar', () => {
  it('link to the sections on the start page and to the pages elsewhere', async () => {
    const home = await mountWithRouter(CobaltBar, { route: '/' });
    const links = home.wrapper.findAll('.cb-sections a').map((link) => [link.text(), link.attributes('href')]);
    expect(links).toEqual([
      ['How it works', '/#how'],
      ['Leak scanner', '/#scanner'],
      ['Docs', '/docs'],
    ]);
    const docs = await mountWithRouter(CobaltBar, { route: '/docs' });
    expect(docs.wrapper.findAll('.cb-sections a').map((link) => link.attributes('href'))).toEqual(['/#how', '/#scanner', '/docs']);
    expect(docs.wrapper.find('.cb-sections a[href="/docs"]').attributes('aria-current')).toBe('page');
  });
});

describe('the status strip', () => {
  it('carries the identity, the phase and the link rail', async () => {
    const { wrapper } = await mountWithRouter(CobaltStatus, { route: '/' });
    expect(wrapper.find('footer.cb-status').exists()).toBe(true);
    expect(wrapper.find('.cb-status__name').text()).toBe('Enclaven');
    expect(wrapper.find('.cb-status__phase').text()).toBe('v0.1, on mainnet.');
    const links = wrapper.findAll('.cb-status__links a').map((link) => link.text());
    expect(links).toEqual([
      'Install the extension',
      'Leak scanner',
      'Cautions',
      'Check a receipt',
      'Docs',
      'Privacy',
      'Extension source',
      'Enclaven on X',
    ]);
    expect(wrapper.find('.cb-status__links a[href="https://x.com/enclaven"]').exists()).toBe(true);
  });
});
