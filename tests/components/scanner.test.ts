import { flushPromises, mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import BpScan from '@/components/home/SignalScan.vue';
import type { ScanOutcome, ScanProgress } from '@/lib/scanner';
import type { LeakReport } from '@/lib/scanner-core/types';

const ME = 'Fh3qJ5iBgbd24itfu7gbvo8XVHLjnNhA6aNEPnnNTz8K';

const report: LeakReport = {
  address: ME,
  scannedTransactions: 300,
  transfers: 12,
  score: 74,
  findings: [
    {
      id: 'funding-source',
      severity: 'medium',
      title: 'Funding source is public',
      detail: 'First funds came from 5tzF…uAi9. Anyone can follow this link back.',
      penalty: 10,
    },
  ],
};

const flows = Array.from({ length: 12 }, (_, index) => ({
  sig: `sig-${index}`,
  time: 1_785_542_400 + index * 3600,
  dir: (index % 2 === 0 ? 'in' : 'out') as 'in' | 'out',
  counterparty: `Other${index}`.padEnd(44, 'x'),
  amount: 1,
  asset: 'SOL',
}));

function fakeScan(outcome: ScanOutcome, onProgress?: (progress: ScanProgress) => void) {
  return vi.fn(async (options: { onProgress?: (progress: ScanProgress) => void }) => {
    options.onProgress?.({ stage: 'balance', fetched: 0, total: 0, skipped: 0, slowed: false });
    options.onProgress?.({ stage: 'transactions', fetched: 5, total: 10, skipped: 0, slowed: false });
    options.onProgress?.({ stage: 'report', fetched: 10, total: 10, skipped: 0, slowed: false });
    onProgress?.({ stage: 'report', fetched: 10, total: 10, skipped: 0, slowed: false });
    return outcome;
  });
}

async function settle(): Promise<void> {
  await flushPromises();
  await nextTick();
  await flushPromises();
}

describe('the leak scanner on the start page', () => {
  it('shows the example report, collapsed, before any scan', async () => {
    const wrapper = mount(BpScan, { props: { scan: fakeScan({ kind: 'empty' }) } });
    await flushPromises();
    expect(wrapper.find('#scan-report details.sn-rep-example').exists()).toBe(true);
    expect(wrapper.find('#scan-report .sn-rep-sheet .sn-rep-flag').text()).toBe('Example report');
    expect(wrapper.find('#scan-report').html()).toContain('An invented wallet, scored 49 of 100');
  });

  it('asks for an address before sending anything', async () => {
    const { scan, wrapper } = (() => {
      const scan = fakeScan({ kind: 'empty' });
      return { scan, wrapper: mount(BpScan, { props: { scan } }) };
    })();
    await flushPromises();
    await wrapper.find('#scan-form').trigger('submit');
    expect(wrapper.find('#address-error').text()).toBe('Paste the address of the wallet to scan. Nothing has been sent.');
    expect(wrapper.find('#address').attributes('aria-invalid')).toBe('true');
    expect(scan).not.toHaveBeenCalled();
  });

  it('refuses something that is not a Solana address, before the RPC learns it', async () => {
    const scan = fakeScan({ kind: 'empty' });
    const wrapper = mount(BpScan, { props: { scan } });
    await flushPromises();
    await wrapper.find('#address').setValue('not-an-address');
    await wrapper.find('#scan-form').trigger('submit');
    expect(wrapper.find('#address-error').text()).toContain('That is not a Solana address.');
    expect(scan).not.toHaveBeenCalled();
    // Typing clears the refusal.
    await wrapper.find('#address').setValue('Fh3q');
    expect(wrapper.find('#address-error').attributes('hidden')).toBeDefined();
  });

  it('scans, then draws the live report and its three figures', async () => {
    const scan = fakeScan({ kind: 'report', result: { report, flows, skipped: 0 }, asked: 300 });
    const wrapper = mount(BpScan, { props: { scan } });
    await flushPromises();
    await wrapper.find('#address').setValue(ME);
    await wrapper.find('#scan-form').trigger('submit');
    await settle();
    expect(scan).toHaveBeenCalledTimes(1);
    const call = scan.mock.calls[0]![0] as unknown as { address: string; limit: number };
    expect(call.address).toBe(ME);
    expect(call.limit).toBe(100);

    const reportHtml = wrapper.find('#scan-report').html();
    expect(reportHtml).toContain('Leak report for');
    expect(reportHtml).toContain('74');
    expect(reportHtml).toContain('data-clear-report');
    expect(wrapper.findAll('#scan-report [data-chart]')).toHaveLength(3);
    expect(wrapper.find('#scan-report [data-chart="bed"]').html()).toContain('sn-plot-bed');
    expect(wrapper.find('#scan-report [data-chart="hours"]').html()).toContain('sn-plot-hours');
    expect(wrapper.find('#scan-report [data-chart="who"]').html()).toContain('sn-plot-who');
  });

  it('puts the example back when the live report is cleared', async () => {
    const wrapper = mount(BpScan, { props: { scan: fakeScan({ kind: 'report', result: { report, flows, skipped: 0 }, asked: 300 }) } });
    await flushPromises();
    await wrapper.find('#address').setValue(ME);
    await wrapper.find('#scan-form').trigger('submit');
    await settle();
    expect(wrapper.find('#scan-report .sn-rep-name').exists()).toBe(true);
    await wrapper.find('[data-clear-report]').trigger('click');
    await nextTick();
    expect(wrapper.find('#scan-report .sn-rep-example').exists()).toBe(true);
    expect(wrapper.find('#scan-note').text()).toContain('Report cleared.');
    expect((wrapper.find('#address').element as HTMLInputElement).value).toBe('');
  });

  it('says what went wrong, and offers the scans the reference page offers', async () => {
    const scan = fakeScan({
      kind: 'failed',
      failure: {
        reason: 'rate-limited',
        title: 'The RPC is turning requests away',
        body: 'rpc.example.com answered 429, too many requests.',
        offerOwnRpc: true,
      },
    });
    const wrapper = mount(BpScan, { props: { scan } });
    await flushPromises();
    await wrapper.find('#address').setValue(ME);
    await wrapper.find('#scan-form').trigger('submit');
    await settle();
    expect(wrapper.find('.sn-fail__title').text()).toContain('The RPC is turning requests away');
    expect(wrapper.find('.sn-fail').attributes('data-reason')).toBe('rate-limited');
    expect(wrapper.find('.sn-fail .sn-cluster').text()).toContain('Scan again');
    expect(wrapper.find('.sn-fail .sn-cluster').text()).toContain('Use your own RPC');
    expect(wrapper.find('.sn-fail').attributes('role')).toBe('alert');
  });

  it('says when an address has no history at all', async () => {
    const wrapper = mount(BpScan, { props: { scan: fakeScan({ kind: 'empty' }) } });
    await flushPromises();
    await wrapper.find('#address').setValue(ME);
    await wrapper.find('#scan-form').trigger('submit');
    await settle();
    expect(wrapper.find('#scan-empty .sn-none__title').text()).toBe('Nothing found for this address');
    expect(wrapper.find('#scan-empty').text()).toContain('rpc.velaira.xyz has no transactions and no balance for it.');
  });

  it('validates an endpoint before saving it, in the reference words', async () => {
    const wrapper = mount(BpScan, { props: { scan: fakeScan({ kind: 'empty' }) } });
    await flushPromises();
    await wrapper.find('#rpc-url').setValue('http://remote.example.com');
    await wrapper.find('#rpc-save').trigger('click');
    expect(wrapper.find('#rpc-error').text()).toContain('Use an https address.');
    expect(wrapper.find('#rpc-url').attributes('aria-invalid')).toBe('true');
  });
});
