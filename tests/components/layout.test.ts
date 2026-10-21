import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { applyTheme } from '@/lib/theme';
import AbyssIndex from '@/components/AbyssIndex.vue';
import AbyssRail from '@/components/AbyssRail.vue';
import { mountWithRouter } from '../helpers';

beforeEach(() => {
  applyTheme('night', { save: false });
});

describe('the command rail', () => {
  it('holds the spine, the command bar, the stage and the status strip on every page', async () => {
    const home = await mountWithRouter(AbyssRail, { route: '/' });
    expect(home.wrapper.find('nav.ab-spine').exists()).toBe(true);
    expect(home.wrapper.find('header.ab-bar').exists()).toBe(true);
    expect(home.wrapper.find('main#main').exists()).toBe(true);
    expect(home.wrapper.find('footer.ab-status').exists()).toBe(true);
    expect(home.wrapper.find('aside').exists()).toBe(false);
  });

  it('links to each page from the spine', async () => {
    const docs = await mountWithRouter(AbyssRail, { route: '/docs' });
    const routes = docs.wrapper.findAll('.ab-spine__route').map((link) => [link.attributes('href'), link.attributes('aria-label')]);
    expect(routes).toEqual([
      ['/docs', 'Docs'],
      ['/install', 'Install'],
      ['/privacy', 'Privacy'],
      ['/verify', 'Check a receipt'],
    ]);
    expect(docs.wrapper.find('.ab-spine__route[href="/docs"]').attributes('aria-current')).toBe('page');
  });

  it('shows the install button except on the install page itself', async () => {
    expect((await mountWithRouter(AbyssRail, { route: '/' })).wrapper.find('.ab-cta').exists()).toBe(true);
    expect((await mountWithRouter(AbyssRail, { route: '/verify' })).wrapper.find('.ab-cta').exists()).toBe(true);
    expect((await mountWithRouter(AbyssRail, { route: '/docs' })).wrapper.find('.ab-cta').exists()).toBe(true);
    expect((await mountWithRouter(AbyssRail, { route: '/install' })).wrapper.find('.ab-cta').exists()).toBe(false);
  });

  it('switches the palette and remembers it', async () => {
    const { wrapper } = await mountWithRouter(AbyssRail, { route: '/' });
    const radios = wrapper.findAll('button[role="radio"]');
    expect(radios[0]!.attributes('aria-checked')).toBe('false');
    await radios[0]!.trigger('click');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dusk');
    expect(localStorage.getItem('miston:theme')).toBe('dusk');
    expect(wrapper.findAll('button[role="radio"]')[0]!.attributes('aria-checked')).toBe('true');
    expect(wrapper.findAll('button[role="radio"]')[1]!.attributes('tabindex')).toBe('-1');
  });

  it('moves between the two palettes with the arrow keys', async () => {
    const { wrapper } = await mountWithRouter(AbyssRail, { route: '/' });
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
    const { wrapper } = await mountWithRouter(AbyssRail, { route: '/' });
    expect(wrapper.find('[role="radiogroup"]').classes()).toContain('ab-pal');
    expect(wrapper.findAll('button[role="radio"]')).toHaveLength(2);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
});

describe('the page index line', () => {
  it('links to the sections on the start page and to the pages elsewhere', async () => {
    const home = await mountWithRouter(AbyssIndex, { route: '/' });
    const links = home.wrapper.findAll('.ab-indexline a').map((link) => [link.text(), link.attributes('href')]);
    expect(links).toEqual([
      ['How it works', '/#how'],
      ['Leak scanner', '/#scanner'],
      ['Docs', '/docs'],
    ]);
    const docs = await mountWithRouter(AbyssIndex, { route: '/docs' });
    expect(docs.wrapper.findAll('.ab-indexline a').map((link) => link.attributes('href'))).toEqual(['/#how', '/#scanner', '/docs']);
    expect(docs.wrapper.find('.ab-indexline a[href="/docs"]').attributes('aria-current')).toBe('page');
  });
});
