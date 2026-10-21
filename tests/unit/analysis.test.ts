import { describe, expect, it } from 'vitest';
import { buildReport } from '@/lib/scanner-core/analyse';
import type { Flow } from '@/lib/scanner-core/types';

const ME = 'Fh3qJ5iBgbd24itfu7gbvo8XVHLjnNhA6aNEPnnNTz8K';
const FUNDER = '5tzFvgZoiXzNoHthSU8f84Fhx6vEKD3mJ5eg4w7yuAi9';
const PAYEE = '9fRkKDnqdWUjjiQF3wfLNfpjDjUQAXxFf3oeFEPV2mVd';
const OTHER = 'Bq7TdQ9pWjvWZq3nQ4Xo8kY1cV5mS2rH7uL6aN3fG8eD';
const T0 = 1_785_542_400;

function wallet(): Flow[] {
  const flows: Flow[] = [{ sig: 'in-1', time: T0 + 8 * 3600, dir: 'in', counterparty: FUNDER, amount: 40, asset: 'SOL' }];
  for (let day = 0; day < 3; day++) {
    for (const hour of [9, 10, 11, 12, 13, 15, 16, 18, 20]) {
      flows.push({
        sig: `out-${day}-${hour}`,
        time: T0 + day * 86_400 + hour * 3600,
        dir: 'out',
        counterparty: PAYEE,
        amount: 0.1 + day + hour / 100,
        asset: 'SOL',
      });
    }
  }
  // An exact amount that arrived and left again within ten minutes.
  flows.push({ sig: 'pass-in', time: T0 + 30 * 86_400 + 10 * 3600, dir: 'in', counterparty: OTHER, amount: 3, asset: 'SOL' });
  flows.push({ sig: 'pass-out', time: T0 + 30 * 86_400 + 10 * 3600 + 120, dir: 'out', counterparty: PAYEE, amount: 3, asset: 'SOL' });
  return flows;
}

describe('the scanner analysis, as the site runs it', () => {
  it('finds the six things a public wallet gives away', () => {
    const report = buildReport({
      address: ME,
      scannedTransactions: 42,
      flows: wallet(),
      solBalance: 41.207,
      tokenAccountCount: 6,
    });
    const ids = report.findings.map((finding) => finding.id);
    expect(report.transfers).toBe(30);
    expect(report.scannedTransactions).toBe(42);
    expect(ids).toContain('funding-source');
    expect(ids).toContain('recurring-counterparties');
    expect(ids).toContain('time-zone');
    expect(ids).toContain('pass-through');
    expect(ids).toContain('balance-visible');
    expect(report.score).toBeLessThan(100);
    expect(report.score).toBe(Math.max(0, 100 - report.findings.reduce((sum, finding) => sum + finding.penalty, 0)));
    // The findings come most severe first.
    const rank = { high: 0, medium: 1, low: 2 } as const;
    const order = report.findings.map((finding) => rank[finding.severity]);
    expect(order).toEqual([...order].sort((a, b) => a - b));
  });

  it('scores a wallet with nothing to show at 100', () => {
    const report = buildReport({ address: ME, scannedTransactions: 0, flows: [], solBalance: 0, tokenAccountCount: 0 });
    expect(report.score).toBe(100);
    expect(report.findings).toEqual([]);
  });
});
