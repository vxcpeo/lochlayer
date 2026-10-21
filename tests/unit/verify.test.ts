import type { Connection } from '@solana/web3.js';
import { describe, expect, it } from 'vitest';
import {
  checkDocument,
  classifyDocument,
  formatAmount,
  formatWhen,
  originRows,
  receiptResult,
  reportResult,
  viewingKeyResult,
  type VerifyResult,
} from '@/lib/verify';
import type { VerifiedReceipt, VerifiedSource } from '@/lib/sdk/disclosure';
import type { ViewedNote } from '@/lib/sdk/viewing';

const connection = {} as Connection;

const receipt: VerifiedReceipt = {
  ok: true,
  signature: '5VERYlongSignatureThatIsNotRealButHasTheRightShape000000000000000000000000000000',
  amount: 1_500_000_000n,
  recipient: 'miston1qy35w8v6c5d3j4k2m9n0p8r7s6t5u4v3w2x1y0z',
  blockTime: Date.UTC(2026, 9, 19, 8, 16) / 1000,
  slot: 350_000_000,
  commitment: 123n,
  leafIndex: 7,
};

const source: VerifiedSource = {
  ok: true,
  complete: true,
  transactions: 3,
  withdrawal: {
    signature: '4AnotherSignature000000000000000000000000000000000000000000000000000000000000',
    recipient: '9fRkKDnqdWUjjiQF3wfLNfpjDjUQAXxFf3oeFEPV2mVd',
    amount: 2_000_000_000n,
    fee: 2_500_000n,
    slot: 350_000_100,
  },
  origins: [
    {
      kind: 'deposit',
      signature: '3DepositSignature0000000000000000000000000000000000000000000000000000000000',
      depositor: 'Fh3qJ5iBgbd24itfu7gbvo8XVHLjnNhA6aNEPnnNTz8K',
      amount: 5_000_000_000n,
      blockTime: Date.UTC(2026, 8, 20, 14, 2) / 1000,
    },
    { kind: 'undisclosed', amount: 1_000_000_000n, leafIndex: 4, commitment: 9n },
  ],
};

describe('reading a document', () => {
  it('tells the four kinds apart by their first characters', () => {
    expect(classifyDocument('mistonview1qqqq')).toBe('viewing-key');
    expect(classifyDocument('mistonclaim1abcdef')).toBe('claim');
    expect(classifyDocument('{"miston":"receipt"}')).toBe('receipt');
    expect(classifyDocument('{"miston":"source-report"}')).toBe('report');
    expect(classifyDocument('{"miston":"something-else"}')).toBe('unknown');
    expect(classifyDocument('hello')).toBe('unknown');
    expect(classifyDocument('{not json')).toBe('unknown');
    expect(classifyDocument('  mistonview1qqq  ')).toBe('viewing-key');
  });

  it('writes lamports as the design system writes SOL', () => {
    expect(formatAmount(1_500_000_000n)).toBe('1.500 SOL');
    expect(formatAmount(0n)).toBe('0.000 SOL');
    expect(formatAmount(1n)).toBe('0.000000001 SOL');
    expect(formatAmount(1_234_567_890n)).toBe('1.23456789 SOL');
  });

  it('writes a time, a slot or the endpoint’s silence', () => {
    expect(formatWhen({ blockTime: Date.UTC(2026, 9, 19, 8, 16) / 1000 })).toBe('19 Oct 2026, 08:16 UTC');
    expect(formatWhen({ slot: 350_000_000 })).toBe('Slot 350000000');
    expect(formatWhen({})).toBe('Not reported by the endpoint');
  });
});

describe('what a receipt says', () => {
  it('sends the reader to compare the full shielded address', () => {
    const result = receiptResult(receipt);
    expect(result.ok).toBe(true);
    expect(result.title).toBe('This receipt checks out.');
    expect(result.rows).toEqual([
      { label: 'Amount', value: '1.500 SOL', role: 'shielded' },
      { label: 'Paid to', value: receipt.recipient, role: 'shielded' },
      { label: 'Transaction', value: receipt.signature, role: 'public' },
      { label: 'When', value: '19 Oct 2026, 08:16 UTC', role: 'public' },
    ]);
    expect(result.lines[1]).toContain('The receipt does not show who paid.');
  });
});

describe('what a source-of-funds report says', () => {
  it('says it ends at the deposits, and lists them', () => {
    const result = reportResult(source);
    expect(result.ok).toBe(true);
    expect(result.title).toBe('This report checks out, and every path ends at a deposit.');
    expect(result.lines[0]).toBe('3 transactions were checked against the chain.');
    expect(result.lines[1]).toBe('The money behind this withdrawal entered the pool in the deposit listed below.');
    expect(result.rows[0]).toEqual({ label: 'Withdrawn', value: '2.000 SOL', role: 'public' });
    expect(result.sections).toHaveLength(1);
    expect(result.sections[0]?.title).toBe('Where it came from');
    expect(result.sections[0]?.rows[0]).toEqual({ label: 'Deposit 1', value: '5.000 SOL', role: 'public' });
    expect(result.sections[0]?.rows[4]).toMatchObject({ label: 'Not traced', value: '1.000 SOL', role: 'shielded' });
  });

  it('says part of the path is not traced when it is not', () => {
    const partial = reportResult({ ...source, complete: false });
    expect(partial.title).toBe('This report checks out, and part of the path is not traced.');
    expect(partial.lines[1]).toBe('1 payment on the path is opened but not traced to a deposit. What is listed below is true as far as it goes; it is not the whole origin.');
  });

  it('shows each origin through originRows', () => {
    const depositRows = originRows(source.origins[0]!, 0);
    expect(depositRows[0]).toEqual({ label: 'Deposit 1', value: '5.000 SOL', role: 'public' });
    expect(depositRows[1]).toEqual({ label: 'From', value: 'Fh3qJ5iBgbd24itfu7gbvo8XVHLjnNhA6aNEPnnNTz8K', role: 'public' });
    expect(depositRows[2]?.value).toBe('3DepositSignature0000000000000000000000000000000000000000000000000000000000');
    expect(depositRows[3]?.label).toBe('When');
    const untracedRows = originRows(source.origins[1]!, 1);
    expect(untracedRows[0]).toEqual({ label: 'Not traced', value: '1.000 SOL', role: 'shielded' });
    expect(untracedRows[1]?.label).toBe('Why');
  });
});

describe('what a viewing key says', () => {
  const notes: ViewedNote[] = [
    { leafIndex: 0, amount: 1_500_000_000n, commitment: 1n, source: 'address', blockTime: Date.UTC(2026, 9, 19, 8, 16) / 1000 },
    { leafIndex: 1, amount: 500_000_000n, commitment: 2n, source: 'self' },
    { leafIndex: 2, amount: 1_000_000_000n, commitment: 3n, source: { code: 2 }, slot: 12 },
  ];

  it('lists every payment, says where each came from, and warns about the sum', () => {
    const result = viewingKeyResult(notes, 40);
    expect(result.title).toBe('This key reads 3 payments.');
    expect(result.lines[0]).toBe('The pool holds 40 entries on the chain this page reads; the key opens 3 of them.');
    expect(result.lines[1]).toContain('the sum below is not a balance');
    expect(result.rows).toEqual([{ label: 'Received in all', value: '3.000 SOL', role: 'shielded' }]);
    expect(result.sections).toHaveLength(3);
    expect(result.sections[0]?.title).toBe('Payment 1');
    expect(result.sections[1]?.rows[1]).toEqual({ label: 'Kind', value: 'The wallet’s own: a deposit or change', role: 'plain' });
    expect(result.sections[2]?.rows[1]).toEqual({ label: 'Kind', value: 'Paid to payment code number 3', role: 'plain' });
  });

  it('says so when the key opens nothing', () => {
    const result = viewingKeyResult([], 40);
    expect(result.title).toBe('This key reads no payments in the pool.');
    expect(result.rows).toEqual([]);
  });
});

describe('checking a document', () => {
  it('refuses what it cannot read, and says what it can', async () => {
    const unknown = await checkDocument('hello', connection, 'rpc.example.com');
    expect(unknown.title).toBe('This is not something this page can check.');
    expect(unknown.lines[0]).toContain('Paste a receipt or a report exactly as it was copied from Miston');
  });

  it('treats a claim link as money, not as a document', async () => {
    const claim = await checkDocument('mistonclaim1abcdef', connection, 'rpc.example.com');
    expect(claim.title).toBe('That is a claim link, not something to check.');
    expect(claim.lines[0]).toContain('A claim link is money');
  });

  it('calls a receipt too short to decode unreadable', async () => {
    const result: VerifyResult = await checkDocument('{"miston":"receipt"}', connection, 'rpc.example.com');
    expect(result.title).toBe('This could not be read.');
    expect(result.ok).toBe(false);
  });

  it('calls a report too short to decode unreadable', async () => {
    const result = await checkDocument('{"miston":"source-report"}', connection, 'rpc.example.com');
    expect(result.title).toBe('This could not be read.');
  });
});
