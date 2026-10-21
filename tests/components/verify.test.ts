import { flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import VerifyView from '@/views/VerifyView.vue';
import type { VerifyResult } from '@/lib/verify';
import { mountWithRouter } from '../helpers';

const result: VerifyResult = {
  ok: true,
  title: 'This receipt checks out.',
  lines: ['The transaction below created a payment of this amount that only the holder of this shielded address can spend.'],
  rows: [
    { label: 'Amount', value: '1.500 SOL', role: 'shielded' },
    { label: 'Paid to', value: 'miston1qy35w8v6c5d3j4k2m9n0p8r7s6t5u4v3w2x1y0z', role: 'shielded' },
    { label: 'Transaction', value: '5VERYlongSignature', role: 'public' },
    { label: 'When', value: '19 Oct 2026, 08:16 UTC', role: 'public' },
  ],
  sections: [],
};

describe('the verify page', () => {
  it('asks for something to check before sending anything', async () => {
    const check = vi.fn(async () => result);
    const { wrapper } = await mountWithRouter(VerifyView, { props: { check } });
    await flushPromises();
    await wrapper.find('#verify-form').trigger('submit');
    expect(wrapper.find('#verify-error').text()).toBe('Paste a receipt, a report or a viewing key first. Nothing has been sent.');
    expect(wrapper.find('#verify-input').attributes('aria-invalid')).toBe('true');
    expect(check).not.toHaveBeenCalled();
  });

  it('checks what was pasted, with a busy button, and draws the result', async () => {
    let resolve!: (value: VerifyResult) => void;
    const check = vi.fn(() => new Promise<VerifyResult>((done) => (resolve = done)));
    const { wrapper } = await mountWithRouter(VerifyView, { props: { check } });
    await flushPromises();
    await wrapper.find('#verify-input').setValue('{"miston":"receipt"}');
    await wrapper.find('#verify-form').trigger('submit');
    await nextTick();
    expect(wrapper.find('#verify-submit').text()).toBe('Checking');
    expect(wrapper.find('#verify-submit').attributes('aria-busy')).toBe('true');
    expect(wrapper.find('#verify-result').text()).toBe('');
    resolve(result);
    await flushPromises();
    expect(wrapper.find('#verify-submit').text()).toBe('Check it');
    expect(wrapper.find('.ab-verify__band--ok').exists()).toBe(true);
    expect(wrapper.find('.ab-verify__band-title').text()).toBe('This receipt checks out.');
    expect(wrapper.find('.ab-verify__band--ok').text()).toContain('only the holder of this shielded address can spend');
    expect(wrapper.findAll('#verify-result .ab-ledger__row')).toHaveLength(4);
    expect(wrapper.find('.ab-verify__value.ab-shielded').text()).toBe('1.500 SOL');
  });

  it('keeps the failure notice a caution, and shows rows without a figure class when they are plain', async () => {
    const check = vi.fn(
      async (): Promise<VerifyResult> => ({
        ok: false,
        title: 'This receipt does not check out.',
        lines: ['The transaction did not create the note this receipt describes.'],
        rows: [{ label: 'Why', value: 'The report opens this payment and goes no further.', role: 'plain' }],
        sections: [{ title: 'Where it came from', rows: [{ label: 'Not traced', value: '1.000 SOL', role: 'shielded' }] }],
      }),
    );
    const { wrapper } = await mountWithRouter(VerifyView, { props: { check } });
    await flushPromises();
    await wrapper.find('#verify-input').setValue('{"miston":"receipt"}');
    await wrapper.find('#verify-form').trigger('submit');
    await flushPromises();
    expect(wrapper.find('.ab-verify__band--warn').exists()).toBe(true);
    expect(wrapper.find('.ab-verify__band--ok').exists()).toBe(false);
    expect(wrapper.find('#verify-result .ab-ledger .ab-ledger__row dd span').classes()).toEqual([]);
    expect(wrapper.find('.ab-verify__section').text()).toBe('Where it came from');
    expect(wrapper.findAll('.ab-verify__value.ab-shielded')).toHaveLength(1);
  });

  it('shows the endpoint in use in its hint', async () => {
    const { wrapper } = await mountWithRouter(VerifyView, { props: { check: vi.fn() } });
    expect(wrapper.find('[data-rpc-host]').text()).toBe('rpc.miston.xyz');
  });
});
