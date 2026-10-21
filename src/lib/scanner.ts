/**
 * The leak scan as the page runs it: one address, one endpoint, progress as it
 * goes, and every failure turned into the sentence the page shows.
 *
 * The analysis itself is the vendored scanner-core (`src/lib/scanner-core`),
 * shared with the extension and the command-line scanner. This module adds the
 * page's retry policy, its stage progress, and the copy for what went wrong.
 */

import { Connection } from '@solana/web3.js';
import { scanAddressDetailed, type FetchProgress, type ScanResult } from './scanner-core';

/** The pieces of the scanner-core API the page reads. */
export type { ScanResult };

export type ScanStage = 'balance' | 'history' | 'transactions' | 'report';

export type ScanProgress = {
  stage: ScanStage;
  fetched: number;
  total: number;
  skipped: number;
  slowed: boolean;
};

export type FailureReason =
  | 'rate-limited'
  | 'transactions-refused'
  | 'forbidden'
  | 'server-error'
  | 'unreachable'
  | 'blocked'
  | 'unguarded'
  | 'rpc-error'
  | 'not-loaded';

export type Failure = {
  reason: FailureReason;
  title: string;
  body: string;
  detail?: string;
  offerOwnRpc: boolean;
};

export type ScanOutcome =
  | { kind: 'report'; result: ScanResult; asked: number }
  | { kind: 'invalid-address' }
  | { kind: 'cancelled' }
  | { kind: 'empty' }
  | { kind: 'failed'; failure: Failure };

export const EMPTY_ADDRESS_MESSAGE = 'Paste the address of the wallet to scan. Nothing has been sent.';
export const INVALID_ADDRESS_MESSAGE =
  'That is not a Solana address. An address is 32 to 44 letters and digits, with no 0, O, I or l. Nothing was sent. Paste the address again.';

/** The scanner's own test for a Solana address, before the RPC learns anything. */
export function isAddress(value: string): boolean {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value);
}

/** The time a scan has taken, as the page's clock writes it: `1:37`. */
export function formatElapsed(ms: number): string {
  const seconds = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

/** The notes a failure may carry, taken out of an RPC's error text. */
export type FailureState = {
  status: number;
  noAnswer: boolean;
  blocked: boolean;
  historyRead: boolean;
  detail?: string;
};

const ENDPOINT = /https?:\/\/\S+/g;
const ADDRESS = /\b[1-9A-HJ-NP-Za-km-z]{32,88}\b/g;

/** Turns an RPC's error message into something short and free of addresses. */
export function scrubDetail(message: string | undefined): string | undefined {
  if (!message) return undefined;
  const head = message.slice(0, 500);
  const quoted = /"message"\s*:\s*"((?:[^"\\]|\\.)*)"/.exec(head)?.[1];
  let text = quoted ? quoted.replace(/\\(.)/g, '$1') : head;
  if (!quoted) {
    // Drop the status line and any error class; keep the provider's sentence.
    text = text.replace(/^failed to [^:]*:\s*/i, '').replace(/^(?:\w*Error:\s*)+/, '');
    const cut = text.search(/[<{]/);
    if (cut >= 0) text = text.slice(0, cut);
  }
  text = text.replace(ENDPOINT, 'the endpoint').replace(ADDRESS, 'the address').replace(/\s+/g, ' ').trim();
  if (text.endsWith(':')) text = text.slice(0, -1).trimEnd();
  return text === '' ? undefined : text.length > 160 ? `${text.slice(0, 159)}…` : text;
}

/**
 * What went wrong, in the page's words. `host` is the endpoint's host;
 * `own` says whether it is the visitor's own endpoint.
 */
export function failureFor(state: FailureState, host: string, own: boolean): Failure {
  const kept = 'No report was made and nothing was kept.';
  const offerOwnRpc = !own;
  const offer = own ? '' : ', or use your own RPC';
  const withDetail = (failure: Failure): Failure => (state.detail ? { ...failure, detail: state.detail } : failure);
  switch (failureReason(state)) {
    case 'rate-limited':
      return withDetail({
        reason: 'rate-limited',
        title: 'The RPC is turning requests away',
        body: own
          ? `${host} answered 429, too many requests. ${kept} Wait a minute, then scan again.`
          : `${host} answered 429, too many requests. It, or the RPC provider behind it, is limiting how many it takes. ${kept} Wait a minute and scan again${offer}.`,
        offerOwnRpc,
      });
    case 'transactions-refused':
      return withDetail({
        reason: 'transactions-refused',
        title: 'The RPC stopped answering part-way',
        body: `${host} returned the balance and the list of transactions, then refused the transactions themselves (429, too many requests). A score from a partial read would mislead, so none was made. ${
          own ? 'Wait a minute, then scan again with fewer transactions.' : 'Wait a minute and scan again with fewer transactions, or use your own RPC.'
        }`,
        offerOwnRpc,
      });
    case 'forbidden':
      return withDetail({
        reason: 'forbidden',
        title: 'The RPC refused the request',
        body: own
          ? `${host} answered ${state.status || 403}, not allowed. ${kept} Check the endpoint’s address and its key, and that it accepts requests from a web page.`
          : `${host} answered ${state.status || 403}, not allowed. ${kept} ${offerOwnRpc ? 'Use your own RPC, or run the scanner from the command line.' : 'Scan again later, or run the scanner from the command line.'}`,
        offerOwnRpc,
      });
    case 'server-error':
      return withDetail({
        reason: 'server-error',
        title: 'The RPC failed',
        body: `${host} answered ${state.status || 500}, a fault on its side. ${kept} Scan again in a minute${offer}.`,
        offerOwnRpc,
      });
    case 'unreachable':
      return withDetail({
        reason: 'unreachable',
        title: 'The RPC did not answer',
        body: own
          ? `No reply came back from ${host}. ${kept} Check your connection and the endpoint’s address. A node of your own must also allow requests from this site (CORS).`
          : `No reply came back from ${host}. ${kept} Check your connection and scan again${offer}.`,
        offerOwnRpc,
      });
    case 'blocked':
      return withDetail({
        reason: 'blocked',
        title: 'This page may not connect to that endpoint',
        body: `The page’s security policy allows one RPC endpoint, fixed when the page loads, and ${host} is not it. ${kept} Reload the page and scan again.`,
        offerOwnRpc: false,
      });
    case 'unguarded':
      return withDetail({
        reason: 'unguarded',
        title: 'The scanner did not start',
        body: 'This page holds itself to one RPC endpoint with a rule the browser enforces, and that rule could not be put in place. The scanner does not run without it. Nothing was sent to any RPC. Reload the page and scan again.',
        offerOwnRpc: false,
      });
    case 'not-loaded':
      return withDetail({
        reason: 'not-loaded',
        title: 'The scanner could not be loaded',
        body: 'The scanner’s code is loaded from this site when you first scan, and that request failed. Nothing was sent to any RPC. Check your connection and scan again.',
        offerOwnRpc: false,
      });
    case 'rpc-error':
      return withDetail({
        reason: 'rpc-error',
        title: 'The RPC returned an error',
        body: own
          ? `${host} answered, but not with what the scan asked for. ${kept} Check that the endpoint is a Solana mainnet RPC.`
          : `${host} answered, but not with what the scan asked for. ${kept} Scan again in a minute${offer}.`,
        offerOwnRpc,
      });
  }
}

function failureReason(state: FailureState): FailureReason {
  if (state.blocked) return 'blocked';
  if (state.noAnswer) return 'unreachable';
  const status = state.status;
  if (status === 429) return state.historyRead ? 'transactions-refused' : 'rate-limited';
  if (status === 401 || status === 403) return 'forbidden';
  if (status >= 500) return 'server-error';
  return 'rpc-error';
}

/** A fetch that answers a 429 by waiting and asking again, at most four times. */
const RETRY_DELAYS = [1000, 2000, 4000, 8000];

function sleep(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(signal.reason);
      return;
    }
    const onAbort = (): void => {
      clearTimeout(timer);
      reject(signal.reason);
    };
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    signal.addEventListener('abort', onAbort, { once: true });
  });
}

/**
 * Scans a wallet with stage progress. The connection is wrapped so each RPC
 * method reports the stage it belongs to; everything else is scanner-core.
 */
export async function scanWallet(options: {
  address: string;
  rpcUrl: string;
  limit?: number;
  signal: AbortSignal;
  onProgress?: (progress: ScanProgress) => void;
}): Promise<ScanOutcome> {
  const { address, rpcUrl, limit, signal, onProgress } = options;
  if (!isAddress(address)) return { kind: 'invalid-address' };
  if (signal.aborted) return { kind: 'cancelled' };

  const inner = new AbortController();
  const abortInner = (): void => inner.abort(signal.reason);
  signal.addEventListener('abort', abortInner, { once: true });

  const state: FailureState = { status: 0, noAnswer: false, blocked: false, historyRead: false };
  const progress: ScanProgress = { stage: 'balance', fetched: 0, total: 0, skipped: 0, slowed: false };
  const emit = (): void => onProgress?.({ ...progress });
  let batchRefused = false;

  const onPolicyViolation = (event: SecurityPolicyViolationEvent): void => {
    if (event.effectiveDirective === 'connect-src') state.blocked = true;
  };
  if (typeof document !== 'undefined') document.addEventListener('securitypolicyviolation', onPolicyViolation);

  const doFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const body = init?.body;
    const bodyIsBatch = typeof body === 'string' && body.trimStart().startsWith('[');
    for (let attempt = 0; ; attempt++) {
      const response = await fetch(input, {
        method: 'POST',
        body: typeof body === 'string' ? body : undefined,
        headers: { 'Content-Type': 'application/json' },
        signal: inner.signal,
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        cache: 'no-store',
      });
      state.status = response.status;
      state.noAnswer = false;
      if (response.status === 429 && !progress.slowed) {
        progress.slowed = true;
        emit();
      }
      const delay = RETRY_DELAYS[attempt];
      if (response.status !== 429 || bodyIsBatch || delay === undefined) return response;
      const retryAfter = Number(response.headers.get('retry-after') ?? '');
      await sleep(Number.isInteger(retryAfter) && retryAfter >= 1 ? Math.min(retryAfter * 1000, 20000) : delay, inner.signal);
    }
  };

  const transport = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    try {
      return await doFetch(input, init);
    } catch (error) {
      if (!inner.signal.aborted) {
        state.status = 0;
        state.noAnswer = true;
      }
      throw error;
    }
  };

  const connection = new Connection(rpcUrl, { commitment: 'confirmed', disableRetryOnRateLimit: true, fetch: transport });
  const stage = (next: ScanStage): void => {
    if (progress.stage === next) return;
    progress.stage = next;
    emit();
  };

  const wrapped = {
    getBalance: (...args: Parameters<Connection['getBalance']>) => {
      stage('balance');
      return connection.getBalance(...args);
    },
    getParsedTokenAccountsByOwner: (...args: Parameters<Connection['getParsedTokenAccountsByOwner']>) => connection.getParsedTokenAccountsByOwner(...args),
    getSignaturesForAddress: (...args: Parameters<Connection['getSignaturesForAddress']>) => {
      stage('history');
      return connection.getSignaturesForAddress(...args);
    },
    getParsedTransactions: (...args: Parameters<Connection['getParsedTransactions']>) => {
      stage('transactions');
      if (batchRefused) return Promise.reject(new Error('The endpoint did not accept a batch earlier in this scan.'));
      return connection.getParsedTransactions(...args).catch((error: unknown) => {
        if (!state.noAnswer && state.status > 0 && state.status < 500) batchRefused = true;
        throw error;
      });
    },
    getParsedTransaction: (...args: Parameters<Connection['getParsedTransaction']>) => {
      stage('transactions');
      return connection.getParsedTransaction(...args);
    },
  };

  try {
    emit();
    const result = await scanAddressDetailed(wrapped, address, {
      limit,
      signal: inner.signal,
      onProgress: (update: FetchProgress) => {
        progress.stage = 'transactions';
        progress.fetched = update.fetched;
        progress.total = update.total;
        progress.skipped = update.skipped;
        emit();
      },
    });
    stage('report');
    const asked = progress.total;
    if (asked > 0 && result.skipped >= asked) {
      state.historyRead = true;
      return { kind: 'failed', failure: failureFor(state, hostOnly(rpcUrl), isOwn(rpcUrl)) };
    }
    if (asked === 0 && result.report.findings.length === 0) return { kind: 'empty' };
    return { kind: 'report', result, asked };
  } catch (error) {
    if (signal.aborted) return { kind: 'cancelled' };
    if (inner.signal.aborted) return { kind: 'cancelled' };
    state.historyRead = progress.stage === 'transactions' || progress.stage === 'report';
    state.detail = scrubDetail(error instanceof Error ? error.message : String(error));
    return { kind: 'failed', failure: failureFor(state, hostOnly(rpcUrl), isOwn(rpcUrl)) };
  } finally {
    signal.removeEventListener('abort', abortInner);
    if (typeof document !== 'undefined') document.removeEventListener('securitypolicyviolation', onPolicyViolation);
  }
}

function hostOnly(value: string): string {
  try {
    return new URL(value).host;
  } catch {
    return value;
  }
}

function isOwn(rpcUrl: string): boolean {
  try {
    const meta = document.querySelector('meta[name="miston:rpc"]')?.getAttribute('content') ?? '';
    return new URL(rpcUrl).origin !== new URL(meta).origin;
  } catch {
    return false;
  }
}

export type { FetchProgress };
