import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { applyTheme } from '@/lib/theme';
import SignalFoot from '@/components/SignalFoot.vue';
import SignalIndex from '@/components/SignalIndex.vue';
import SignalTop from '@/components/SignalTop.vue';
import { mountWithRouter } from '../helpers';

beforeEach(() => {
  applyTheme('night', { save: false });
});

describe('the slim top index', () => {
  it('holds the brand, the route chips and the palette, with no sidebar', async () => {
    const home = await mountWithRouter(SignalTop, { route: '/' });
    expect(home.wrapper.find('header.sn-top').exists()).toBe(true);
    expect(home.wrapper.find('nav.sn-routes').exists()).toBe(true);
    expect(home.wrapper.find('.sn-brand').exists()).toBe(true);
    expect(home.wrapper.find('.sn-brand__word').text()).toBe('Velaira');
    expect(home.wrapper.find('aside').exists()).toBe(false);
  });

  it('links to each page from the index strip', async () => {
    const docs = await mountWithRouter(SignalTop, { route: '/docs' });
    const routes = docs.wrapper.findAll('.sn-route').map((link) => [link.attributes('href'), link.attributes('aria-label')]);
    expect(routes).toEqual([
      ['/docs', 'Docs'],
      ['/install', 'Install'],
      ['/privacy', 'Privacy'],
      ['/verify', 'Check a receipt'],
    ]);
    expect(docs.wrapper.find('.sn-route[href="/docs"]').attributes('aria-current')).toBe('page');
  });

  it('shows the install button except on the install page itself', async () => {
    expect((await mountWithRouter(SignalTop, { route: '/' })).wrapper.find('.sn-cta').exists()).toBe(true);
    expect((await mountWithRouter(SignalTop, { route: '/verify' })).wrapper.find('.sn-cta').exists()).toBe(true);
    expect((await mountWithRouter(SignalTop, { route: '/docs' })).wrapper.find('.sn-cta').exists()).toBe(true);
    expect((await mountWithRouter(SignalTop, { route: '/install' })).wrapper.find('.sn-cta').exists()).toBe(false);
  });

  it('switches the palette and remembers it', async () => {
    const { wrapper } = await mountWithRouter(SignalTop, { route: '/' });
    const radios = wrapper.findAll('button[role="radio"]');
    expect(radios[0]!.attributes('aria-checked')).toBe('false');
    await radios[0]!.trigger('click');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dusk');
    expect(localStorage.getItem('velaira:theme')).toBe('dusk');
    expect(wrapper.findAll('button[role="radio"]')[0]!.attributes('aria-checked')).toBe('true');
    expect(wrapper.findAll('button[role="radio"]')[1]!.attributes('tabindex')).toBe('-1');
  });

  it('moves between the two palettes with the arrow keys', async () => {
    const { wrapper } = await mountWithRouter(SignalTop, { route: '/' });
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
    const { wrapper } = await mountWithRouter(SignalTop, { route: '/' });
    expect(wrapper.find('[role="radiogroup"]').classes()).toContain('sn-pal');
    expect(wrapper.findAll('button[role="radio"]')).toHaveLength(2);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
});

describe('the page index line', () => {
  it('links to the sections on the start page and to the pages elsewhere', async () => {
    const home = await mountWithRouter(SignalIndex, { route: '/' });
    const links = home.wrapper.findAll('.sn-index a').map((link) => [link.text(), link.attributes('href')]);
    expect(links).toEqual([
      ['How it works', '/#how'],
      ['Leak scanner', '/#scanner'],
      ['Docs', '/docs'],
    ]);
    const docs = await mountWithRouter(SignalIndex, { route: '/docs' });
    expect(docs.wrapper.findAll('.sn-index a').map((link) => link.attributes('href'))).toEqual(['/#how', '/#scanner', '/docs']);
    expect(docs.wrapper.find('.sn-index a[href="/docs"]').attributes('aria-current')).toBe('page');
  });
});

describe('the footer line', () => {
  it('carries the identity, the phase and the link rail', async () => {
    const { wrapper } = await mountWithRouter(SignalFoot, { route: '/' });
    expect(wrapper.find('footer.sn-foot').exists()).toBe(true);
    expect(wrapper.find('.sn-foot__name').text()).toBe('Velaira');
    expect(wrapper.find('.sn-foot__phase').text()).toBe('v0.1, on mainnet.');
    const links = wrapper.findAll('.sn-foot__links a').map((link) => link.text());
    expect(links).toEqual([
      'Install the extension',
      'Leak scanner',
      'Cautions',
      'Check a receipt',
      'Docs',
      'Privacy',
      'Extension source',
      'Velaira on X',
    ]);
    expect(wrapper.find('.sn-foot__links a[href="https://x.com/velaira"]').exists()).toBe(true);
  });
});
