import { flushPromises } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import DocsView from '@/views/DocsView.vue';
import HomeView from '@/views/HomeView.vue';
import InstallView from '@/views/InstallView.vue';
import PrivacyView from '@/views/PrivacyView.vue';
import { mountWithRouter } from '../helpers';

describe('the start page', () => {
  it('has the four anchored sections', async () => {
    const { wrapper } = await mountWithRouter(HomeView, { route: '/' });
    await flushPromises();
    const ids = wrapper.findAll('section[id]').map((section) => section.attributes('id'));
    expect([...ids].sort()).toEqual(['cautions', 'how', 'private', 'scanner']);
  });

  it('opens with the mirror headline and the extension popup', async () => {
    const { wrapper } = await mountWithRouter(HomeView, { route: '/' });
    await flushPromises();
    expect(wrapper.find('#hero-title .cb-runhead__land').text().replace(/\s+/g, ' ')).toBe('Your wallet is public.');
    expect(wrapper.find('#hero-title .cb-runhead__water').element.firstChild?.textContent).toBe('The Enclaven is not.');
    expect(wrapper.find('.cb-popup .cb-device').exists()).toBe(true);
    expect(wrapper.find('.cb-popup .cb-figcaption').text()).toContain('The extension’s popup, drawn here with example figures.');
  });

  it('draws the three-step story and the caution list', async () => {
    const { wrapper } = await mountWithRouter(HomeView, { route: '/' });
    await flushPromises();
    expect(wrapper.findAll('.cb-steps .cb-step')).toHaveLength(3);
    expect(wrapper.find('#how').text()).toContain('Dive in, send privately, surface.');
    expect(wrapper.find('#private').text()).toContain('What keeps it private.');
    expect(wrapper.find('#cautions').text()).toContain('Read the cautions before you dive.');
    expect(wrapper.find('#cautions').text()).toContain('Withdrawals can never be paused');
    expect(wrapper.find('#cautions').text()).toContain('$ENCLAVEN token');
  });

  it('carries the example leak report and its figures', async () => {
    const { wrapper } = await mountWithRouter(HomeView, { route: '/' });
    await flushPromises();
    expect(wrapper.find('#scan-report .cb-rep-example').exists()).toBe(true);
    expect(wrapper.findAll('#scan-report .cb-rep-fit svg').length).toBe(17);
  });
});

describe('the docs page', () => {
  it('has the caution notice and a contents list of every section', async () => {
    const { wrapper } = await mountWithRouter(DocsView, { route: '/docs' });
    await flushPromises();
    expect(wrapper.find('h1').text()).toBe('How the Enclaven keeps a payment private.');
    const toc = wrapper.findAll('.cb-outline__list a').map((link) => link.attributes('href'));
    expect(toc).toHaveLength(18);
    expect(toc[0]).toBe('#model');
    expect(toc[17]).toBe('#site');
    for (const href of toc) {
      expect(wrapper.find(`article ${href}`).exists()).toBe(true);
    }
  });

  it('shows the seven public inputs and the numbers table', async () => {
    const { wrapper } = await mountWithRouter(DocsView, { route: '/docs' });
    expect(wrapper.find('#proof').text()).toContain('It has seven public inputs, in this order.');
    expect(wrapper.find('#numbers').text()).toContain('Compute units for one transact');
    expect(wrapper.find('#numbers').text()).toContain('159');
  });

  it('links back to the start page', async () => {
    const { wrapper } = await mountWithRouter(DocsView, { route: '/docs' });
    expect(wrapper.find('a.cb-btn--outline').attributes('href')).toBe('/');
  });
});

describe('the install page', () => {
  it('marks the store release as coming soon and keeps the manual install and checksum', async () => {
    const { wrapper } = await mountWithRouter(InstallView, { route: '/install' });
    expect(wrapper.find('.cb-btn--soft').text()).toBe('Coming soon to the Chrome Web Store');
    expect(wrapper.find('a[href*="chromewebstore"]').exists()).toBe(false);
    const loadFolder = wrapper.findAll('.cb-procedure__entry').find((entry) => {
      const title = entry.find('.cb-procedure__title');
      return title.exists() && title.text() === 'Load the folder';
    });
    expect(loadFolder).toBeDefined();
    expect(loadFolder!.find('.cb-procedure__body').text()).toContain('Load unpacked');
    expect(wrapper.find('#download-sha256').text()).toBe('0ee00e059e175874e1b0a4f30f7abcd73f12607d6091d89d2fed06f9d341791e');
  });
});

describe('the privacy page', () => {
  it('answers the questions the reference page answers', async () => {
    const { wrapper } = await mountWithRouter(PrivacyView, { route: '/privacy' });
    expect(wrapper.find('h1').text()).toBe('What this site keeps.');
    const text = wrapper.text();
    expect(text).toContain('Cookies');
    expect(text).toContain('Analytics and third parties');
    expect(text).toContain('The leak scanner');
    expect(text).toContain('The waitlist');
    expect(text).toContain('No analytics, no telemetry, no advertising.');
  });
});
