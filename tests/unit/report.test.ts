import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import type { Flow, LeakReport } from '@/lib/scanner-core/types';
import { buildLiveReportHtml, esc, mountReportCharts, plural, shortAddress, statementHtml, verdictFor } from '@/lib/report';

const ME = 'Fh3qJ5iBgbd24itfu7gbvo8XVHLjnNhA6aNEPnnNTz8K';

const findings: LeakReport['findings'] = [
  { id: 'funding-source', severity: 'medium', title: 'Funding source is public', detail: 'First funds came from 5tzF…Ai9. Anyone can follow this link back.', penalty: 10 },
  {
    id: 'recurring-counterparties',
    severity: 'medium',
    title: 'Recurring counterparties',
    detail: '4 addresses interact with you 3 or more times (top: 9fRk…mVd ×14, Bq7T…1Lw ×9, H2xD…K4s ×6). Regular payments reveal employers, clients or friends.',
    penalty: 16,
  },
  { id: 'time-zone', severity: 'medium', title: 'Your time zone is guessable', detail: 'Almost no activity between 22:00 and 04:00 UTC. That is likely your sleep window.', penalty: 10 },
  { id: 'pass-through', severity: 'medium', title: 'Exact amounts passed straight through', detail: '2 outgoing transfers matched an incoming amount within 10 minutes.', penalty: 10 },
  { id: 'balance-visible', severity: 'low', title: 'Balance is visible to everyone', detail: '41.207 SOL and 6 token accounts are public. Anyone you pay can look.', penalty: 5 },
];

const report: LeakReport = {
  address: ME,
  scannedTransactions: 300,
  transfers: 412,
  score: 49,
  findings,
};

const T0 = 1_785_542_400;
const flows: Flow[] = Array.from({ length: 40 }, (_, index) => ({
  sig: `sig-${index}`,
  time: T0 + (index % 20) * 3600,
  dir: index % 2 === 0 ? 'in' : 'out',
  counterparty: index % 5 === 0 ? '5tzFvgZoiXzNoHthSU8f84Fhx6vEKD3mJ5eg4w7yuAi9' : `Other${index}`.padEnd(44, 'x'),
  amount: 1 + index,
  asset: 'SOL',
}));

describe('the words around a report', () => {
  it('scores into three verdicts, at 49, 50 and 80', () => {
    expect(verdictFor(49)).toBe('Shallow water. Most of this wallet’s story can be read from the surface.');
    expect(verdictFor(50)).toBe('Mid water. Parts of this wallet’s story can be read from the surface.');
    expect(verdictFor(79)).toBe('Mid water. Parts of this wallet’s story can be read from the surface.');
    expect(verdictFor(80)).toBe('Deep water. The transactions read give away little.');
  });

  it('pluralises as the scanner does', () => {
    expect(plural(0, 'transaction')).toBe('0 transactions');
    expect(plural(1, 'transaction')).toBe('1 transaction');
    expect(plural(1_234, 'transfer')).toBe('1,234 transfers');
  });

  it('shortens an address to four and four, and escapes markup', () => {
    expect(shortAddress(ME)).toBe('Fh3q…Tz8K');
    expect(shortAddress('abc')).toBe('abc');
    expect(esc('<script>&"')).toBe('&lt;script&gt;&amp;&quot;');
  });
});

describe('the statement of account', () => {
  const html = statementHtml(report);

  it('starts at 100, takes each finding away and ends at the score', () => {
    expect(html).toContain('class="sn-rep-row sn-rep-row-open"');
    expect(html).toContain('<span class="sn-rep-figure sn-num">100</span>');
    for (const finding of findings) expect(html).toContain(finding.title);
    expect(html).toContain('sn-rep-row-total');
    expect(html).toContain('49<small>of 100</small>');
    expect(html).toContain('<span class="sn-sign">−</span>16');
  });

  it('labels severity and adds the advice note', () => {
    expect(html).toContain('<span class="sn-rep-sev" data-sev="medium">Medium</span>');
    expect(html).toContain('<span class="sn-rep-sev" data-sev="low">Low</span>');
    expect(html).toContain('What helps: a fresh address for each payer');
  });

  it('says nothing stood out when there are no findings', () => {
    expect(statementHtml({ address: ME, scannedTransactions: 0, transfers: 0, score: 100, findings: [] })).toContain('Nothing stood out in the transactions read.');
  });
});

describe('the live report article', () => {
  const html = buildLiveReportHtml({ report, flows, host: 'rpc.velaira.xyz', skipped: 0, asked: 300, own: false });

  it('is the same article the reference page draws', () => {
    expect(html.startsWith('<article class="sn-rep-sheet sn-wet" data-depth="120"')).toBe(true);
    expect(html).toContain('Leak report for <span class="sn-num">Fh3q…Tz8K</span>');
    expect(html).toContain('Read from rpc.velaira.xyz, in this browser.');
    expect(html).toContain('data-clear-report');
    expect(html).toContain('<span class="sn-figure sn-figure--xl sn-exposed">49</span>');
    expect(html).toContain('Shallow water.');
    expect(html).toContain('300 transactions scanned, 412 transfers.');
    expect(html).toContain('data-chart="bed"');
    expect(html).toContain('data-chart="hours"');
    expect(html).toContain('data-chart="who"');
    expect(html).toContain('This page has no list of known services');
    expect(html).not.toContain('data-example');
  });

  it('carries a note when the read was partial, and says how to fix it', () => {
    const partial = buildLiveReportHtml({ report, flows, host: 'rpc.example.com', skipped: 12, asked: 300, own: false });
    expect(partial).toContain('This score is from a partial read');
    expect(partial).toContain('would not return 12 transactions of the 300 asked for');
    expect(partial).toContain('or use your own RPC');
    const own = buildLiveReportHtml({ report, flows, host: 'rpc.example.com', skipped: 12, asked: 300, own: true });
    expect(own).not.toContain('or use your own RPC');
  });

  it('leaves out the two figures when there are no flows', () => {
    const empty = buildLiveReportHtml({ report: { ...report, transfers: 0 }, flows: [], host: 'rpc.example.com', skipped: 0, asked: 0, own: false });
    expect(empty).not.toContain('data-chart="hours"');
    expect(empty).not.toContain('data-chart="who"');
    expect(empty).toContain('data-chart="bed"');
  });

  it('picks the caption that matches whether a quiet window is guessable', () => {
    const quiet = Array.from({ length: 24 }, () => ({ ...flows[0]!, time: T0 + 12 * 3600 }));
    expect(buildLiveReportHtml({ report, flows: quiet, host: 'h', skipped: 0, asked: 24, own: true })).toContain(
      'The hatched shoal, where almost nothing happens, is likely when the owner sleeps.',
    );
    const busy = Array.from({ length: 24 }, (_, hour) => ({ ...flows[0]!, time: T0 + hour * 3600 }));
    expect(buildLiveReportHtml({ report, flows: busy, host: 'h', skipped: 0, asked: 24, own: true })).toContain('No quiet stretch stands out here.');
  });
});

describe('drawing the figures', () => {
  it('fills each placeholder with the SVG at the width it has, and can be disposed', () => {
    const root = document.createElement('div');
    root.innerHTML = '<div data-chart="bed"></div><div data-chart="hours"></div><div data-chart="who"></div>';
    const dispose = mountReportCharts(root, report, flows);
    const bed = root.querySelector('[data-chart="bed"]')?.innerHTML ?? '';
    expect(bed).toContain('sn-plot-bed');
    expect(bed).toContain('Privacy score 49 of 100');
    expect(root.querySelector('[data-chart="hours"]')?.innerHTML).toContain('sn-plot-hours');
    expect(root.querySelector('[data-chart="who"]')?.innerHTML).toContain('sn-plot-who');
    dispose();
  });

  it('does not draw into a column too narrow for a figure', () => {
    const root = document.createElement('div');
    root.innerHTML = '<div data-chart="bed"></div>';
    const target = root.querySelector('[data-chart="bed"]') as HTMLElement;
    Object.defineProperty(target, 'clientWidth', { configurable: true, get: () => 100 });
    mountReportCharts(root, report, flows)();
    expect(target.innerHTML).toBe('');
  });
});

describe('the example report', () => {
  const example = readFileSync(resolve(process.cwd(), 'src/data/example-report.html'), 'utf8');

  it('is the pre-rendered article, with all seventeen stepped figures', () => {
    expect(example.startsWith('<details class="sn-rep-fold sn-rep-example"')).toBe(true);
    expect((example.match(/sn-plot sn-plot-bed/g) ?? [])).toHaveLength(7);
    expect((example.match(/sn-plot sn-plot-hours/g) ?? [])).toHaveLength(5);
    expect((example.match(/sn-plot sn-plot-who/g) ?? [])).toHaveLength(5);
    expect(example).toContain('An invented wallet, scored 49 of 100');
    expect(example).toContain('data-example=""');
  });
});
