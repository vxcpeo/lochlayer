import { flushPromises } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import DocsView from '@/views/DocsView.vue';
import HomeView from '@/views/HomeView.vue';
import InstallView from '@/views/InstallView.vue';
import PrivacyView from '@/views/PrivacyView.vue';
import { mountWithRouter } from '../helpers';

describe('the start page', () => {
  it('has the five sections, in the order the reference page has them', async () => {
    const { wrapper } = await mountWithRouter(HomeView, { route: '/' });
    await flushPromises();
    const ids = wrapper.findAll('main > section').map((section) => section.attributes('id')).filter(Boolean);
    expect(ids).toEqual(['how', 'scanner', 'private', 'cautions']);
  });

  it('opens with the mirror headline and the extension popup', async () => {
    const { wrapper } = await mountWithRouter(HomeView, { route: '/' });
    await flushPromises();
    expect(wrapper.find('#hero-title .ab-mirror__land').text().replace(/\s+/g, ' ')).toBe('Your wallet is public.');
    expect(wrapper.find('#hero-title .ab-mirror__water').element.firstChild?.textContent).toBe('The Miston is not.');
    expect(wrapper.find('.ab-plate .ab-device').exists()).toBe(true);
    expect(wrapper.find('.ab-plate__figure figcaption').text()).toContain('The extension’s popup, drawn here with example figures.');
  });

  it('draws the three-step story and the caution list', async () => {
    const { wrapper } = await mountWithRouter(HomeView, { route: '/' });
    await flushPromises();
    expect(wrapper.findAll('.ab-steps .ab-step')).toHaveLength(3);
    expect(wrapper.find('#how').text()).toContain('Dive in, send privately, surface.');
    expect(wrapper.find('#private').text()).toContain('What keeps it private.');
    expect(wrapper.find('#cautions').text()).toContain('Read the cautions before you dive.');
    expect(wrapper.find('#cautions').text()).toContain('Withdrawals can never be paused');
    expect(wrapper.find('#cautions').text()).toContain('$MISTON token');
  });

  it('carries the example leak report and its figures', async () => {
    const { wrapper } = await mountWithRouter(HomeView, { route: '/' });
    await flushPromises();
    expect(wrapper.find('#scan-report .ab-rep-example').exists()).toBe(true);
    expect(wrapper.findAll('#scan-report .ab-rep-fit svg').length).toBe(17);
  });
});

describe('the docs page', () => {
  it('has the caution notice and a contents list of every section', async () => {
    const { wrapper } = await mountWithRouter(DocsView, { route: '/docs' });
    await flushPromises();
    expect(wrapper.find('h1').text()).toBe('How the Miston keeps a payment private.');
    const toc = wrapper.findAll('.ab-doc__toc a').map((link) => link.attributes('href'));
    expect(toc).toHaveLength(18);
    expect(toc[0]).toBe('#model');
    expect(toc[17]).toBe('#site');
    for (const href of toc) {
      expect(wrapper.find(`article${href}`).exists()).toBe(true);
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
    expect(wrapper.find('a.ab-btn--line').attributes('href')).toBe('/');
  });
});

describe('the install page', () => {
  it('marks the store release as coming soon and keeps the manual install and checksum', async () => {
    const { wrapper } = await mountWithRouter(InstallView, { route: '/install' });
    expect(wrapper.find('.ab-btn--soon').text()).toBe('Coming soon to the Chrome Web Store');
    expect(wrapper.find('a[href*="chromewebstore"]').exists()).toBe(false);
    expect(wrapper.find('.ab-ledger').text()).toContain('Load unpacked');
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
