/**
 * What someone can check about a Loch document, in the page's own words. The
 * verification itself is the vendored `@loch/sdk/verify` surface: a receipt,
 * a source-of-funds report and a viewing key, each read against the chain.
 *
 * Nothing here signs anything, holds a key or writes a document. A viewing key
 * is read in this tab: its notes are fetched from the pool's events and
 * decrypted locally.
 */

import type { Connection } from '@solana/web3.js';
import { formatSol } from './design/numerals';
import { decodeReceipt, decodeSourceReport, verifyReceipt, verifySourceReport, type FundsOrigin, type VerifiedReceipt, type VerifiedSource } from './sdk/disclosure';
import { LochError } from './sdk/errors';
import { decodeViewingKey, viewNotes, type ViewedNote } from './sdk/viewing';
import { fetchEvents } from './sdk/sync';

export type VerifyRow = {
  label: string;
  value: string;
  role: 'plain' | 'public' | 'shielded';
};

export type VerifySection = {
  title: string;
  rows: VerifyRow[];
};

export type VerifyResult = {
  ok: boolean;
  title: string;
  lines: string[];
  rows: VerifyRow[];
  sections: VerifySection[];
};

export type DocumentKind = 'receipt' | 'report' | 'viewing-key' | 'claim' | 'unknown';

/** Which of the four things someone pasted, read from its first characters. */
export function classifyDocument(text: string): DocumentKind {
  const trimmed = text.trim();
  if (/^lochview1/i.test(trimmed)) return 'viewing-key';
  if (/lochclaim1[a-z0-9]+$/i.test(trimmed)) return 'claim';
  if (!trimmed.startsWith('{')) return 'unknown';
  try {
    const parsed = JSON.parse(trimmed) as { loch?: unknown };
    if (parsed.loch === 'receipt') return 'receipt';
    if (parsed.loch === 'source-report') return 'report';
    return 'unknown';
  } catch {
    return 'unknown';
  }
}

/** Lamports as the design system writes SOL: at least three decimals, up to nine. */
export function formatAmount(lamports: bigint | number): string {
  return `${formatSol(lamports, { exact: true }).text} SOL`;
}

/** A transaction's time, or the slot, or the endpoint's silence. */
export function formatWhen(time: { blockTime?: number; slot?: number }): string {
  if (time.blockTime !== undefined) {
    const date = new Date(time.blockTime * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const pad = (value: number): string => String(value).padStart(2, '0');
    return `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}, ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())} UTC`;
  }
  if (time.slot !== undefined) return `Slot ${time.slot}`;
  return 'Not reported by the endpoint';
}

/** The rows a funds origin is shown as: a deposit, or a payment the report stops at. */
export function originRows(origin: FundsOrigin, index: number): VerifyRow[] {
  if (origin.kind === 'deposit') {
    return [
      { label: `Deposit ${index + 1}`, value: formatAmount(origin.amount), role: 'public' },
      { label: 'From', value: origin.depositor ?? 'Deposited through another program', role: 'public' },
      { label: 'Transaction', value: origin.signature, role: 'public' },
      { label: 'When', value: formatWhen(origin), role: 'public' },
    ];
  }
  return [
    { label: 'Not traced', value: formatAmount(origin.amount), role: 'shielded' },
    {
      label: 'Why',
      value: 'The report opens this payment and goes no further. It came from another wallet, or the wallet kept no record of where it came from.',
      role: 'plain',
    },
  ];
}

const NOTE_SOURCE = {
  address: 'Paid to the address by someone',
  self: 'The wallet’s own: a deposit or change',
} as const;

export function receiptResult(receipt: VerifiedReceipt): VerifyResult {
  return {
    ok: true,
    title: 'This receipt checks out.',
    lines: [
      'The transaction below created a payment of this amount that only the holder of this shielded address can spend.',
      'Compare the address with the one you expect. The receipt does not show who paid.',
    ],
    rows: [
      { label: 'Amount', value: formatAmount(receipt.amount), role: 'shielded' },
      { label: 'Paid to', value: receipt.recipient, role: 'shielded' },
      { label: 'Transaction', value: receipt.signature, role: 'public' },
      { label: 'When', value: formatWhen(receipt), role: 'public' },
    ],
    sections: [],
  };
}

export function reportResult(source: VerifiedSource): VerifyResult {
  const deposits = source.origins.filter((origin) => origin.kind === 'deposit');
  const untraced = source.origins.length - deposits.length;
  return {
    ok: true,
    title: source.complete ? 'This report checks out, and every path ends at a deposit.' : 'This report checks out, and part of the path is not traced.',
    lines: [
      `${source.transactions} ${source.transactions === 1 ? 'transaction was' : 'transactions were'} checked against the chain.`,
      source.complete
        ? `The money behind this withdrawal entered the pool in ${deposits.length === 1 ? 'the deposit' : `the ${deposits.length} deposits`} listed below.`
        : `${untraced} ${untraced === 1 ? 'payment on the path is' : 'payments on the path are'} opened but not traced to a deposit. What is listed below is true as far as it goes; it is not the whole origin.`,
      'The withdrawn amount is not divided among the origins: payments are merged and split on the way.',
    ],
    rows: [
      { label: 'Withdrawn', value: formatAmount(source.withdrawal.amount), role: 'public' },
      { label: 'To', value: source.withdrawal.recipient, role: 'public' },
      { label: 'Transaction', value: source.withdrawal.signature, role: 'public' },
      { label: 'When', value: formatWhen(source.withdrawal), role: 'public' },
    ],
    sections: [{ title: 'Where it came from', rows: source.origins.flatMap(originRows) }],
  };
}

export function viewingKeyResult(notes: ViewedNote[], entries: number): VerifyResult {
  const total = notes.reduce((sum, note) => sum + note.amount, 0n);
  return {
    ok: true,
    title: notes.length === 0 ? 'This key reads no payments in the pool.' : `This key reads ${notes.length} ${notes.length === 1 ? 'payment' : 'payments'}.`,
    lines: [
      `The pool holds ${entries} entries on the chain this page reads; the key opens ${notes.length} of them.`,
      'These are payments the wallet received, its own deposits and change among them. The key cannot show which were spent since, so the sum below is not a balance.',
    ],
    rows: notes.length === 0 ? [] : [{ label: 'Received in all', value: formatAmount(total), role: 'shielded' }],
    sections: notes.map((note, index) => ({
      title: `Payment ${index + 1}`,
      rows: [
        { label: 'Amount', value: formatAmount(note.amount), role: 'shielded' },
        {
          label: 'Kind',
          value: typeof note.source === 'object' ? `Paid to payment code number ${note.source.code + 1}` : NOTE_SOURCE[note.source],
          role: 'plain',
        },
        { label: 'When', value: formatWhen(note), role: 'public' },
      ],
    })),
  };
}

/** A document that is what it claims to be but does not check out. */
function rejected(kind: string, problem: string): VerifyResult {
  return {
    ok: false,
    title: `This ${kind} does not check out.`,
    lines: [
      `${problem.charAt(0).toUpperCase()}${problem.slice(1)}.`,
      'Either it was altered, or it is for another network than the one this page reads, or the endpoint no longer has the transaction. Ask for it again before you rely on it.',
    ],
    rows: [],
    sections: [],
  };
}

function refusal(title: string, line: string): VerifyResult {
  return { ok: false, title, lines: [line], rows: [], sections: [] };
}

const UNKNOWN = (): VerifyResult =>
  refusal(
    'This is not something this page can check.',
    'Paste a receipt or a report exactly as it was copied from Loch, from the first brace to the last, or a viewing key, which starts with lochview1.',
  );

const CLAIM = (): VerifyResult =>
  refusal(
    'That is a claim link, not something to check.',
    'A claim link is money: do not paste it into pages. Open it in your browser, or paste it into Loch under Receive, to collect it.',
  );

const UNREADABLE = (): VerifyResult =>
  refusal('This could not be read.', 'It is cut short or was changed on the way. Copy it again from Loch, all of it, and paste it here.');

/** Checks one document against the chain. Never throws. */
export async function checkDocument(text: string, connection: Connection, host: string): Promise<VerifyResult> {
  const kind = classifyDocument(text);
  if (kind === 'unknown') return UNKNOWN();
  if (kind === 'claim') return CLAIM();
  try {
    if (kind === 'receipt') {
      const result = await verifyReceipt(connection, decodeReceipt(text.trim()));
      return result.ok ? receiptResult(result) : rejected('receipt', result.problem);
    }
    if (kind === 'report') {
      const result = await verifySourceReport(connection, decodeSourceReport(text.trim()));
      return result.ok ? reportResult(result) : rejected('report', result.problem);
    }
    const key = decodeViewingKey(text.trim());
    const { events } = await fetchEvents(connection);
    return viewingKeyResult(viewNotes(events, key), events.length);
  } catch (error) {
    if (error instanceof LochError && (error.code === 'DECODE_FAILED' || error.code === 'INVALID_ADDRESS')) return UNREADABLE();
    return refusal(
      `${host} did not answer.`,
      'The check reads the chain through that endpoint, and it failed or refused. Nothing is wrong with what you pasted as far as this page can tell. Try again in a moment.',
    );
  }
}
