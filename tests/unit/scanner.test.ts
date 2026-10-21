import { describe, expect, it } from 'vitest';
import {
  EMPTY_ADDRESS_MESSAGE,
  INVALID_ADDRESS_MESSAGE,
  failureFor,
  formatElapsed,
  isAddress,
  scrubDetail,
  type FailureState,
} from '@/lib/scanner';

const state = (over: Partial<FailureState> = {}): FailureState => ({
  status: 0,
  noAnswer: false,
  blocked: false,
  historyRead: false,
  ...over,
});

describe('the scanner form', () => {
  it('accepts base58 addresses of 32 to 44 characters and nothing else', () => {
    expect(isAddress('11111111111111111111111111111111')).toBe(true);
    expect(isAddress('Fh3qJ5iBgbd24itfu7gbvo8XVHLjnNhA6aNEPnnNTz8K')).toBe(true);
    expect(isAddress('miston1qw50someaddress')).toBe(false);
    expect(isAddress('0OIl')).toBe(false);
    expect(isAddress('')).toBe(false);
    expect(isAddress('a'.repeat(31))).toBe(false);
    expect(isAddress('a'.repeat(45))).toBe(false);
  });

  it('has the two sentences the reference page shows', () => {
    expect(EMPTY_ADDRESS_MESSAGE).toBe('Paste the address of the wallet to scan. Nothing has been sent.');
    expect(INVALID_ADDRESS_MESSAGE).toBe(
      'That is not a Solana address. An address is 32 to 44 letters and digits, with no 0, O, I or l. Nothing was sent. Paste the address again.',
    );
  });

  it('writes a clock as minutes and seconds', () => {
    expect(formatElapsed(0)).toBe('0:00');
    expect(formatElapsed(9_500)).toBe('0:09');
    expect(formatElapsed(97_000)).toBe('1:37');
    expect(formatElapsed(-5)).toBe('0:00');
  });
});

describe('an RPC error, cleaned up', () => {
  it('keeps the provider sentence and drops the URL and any address', () => {
    const text = scrubDetail(
      'failed to get balance: 429 Too Many Requests: {"jsonrpc":"2.0","error":{"code":-32005,"message":"Rate limited for Fh3qJ5iBgbd24itfu7gbvo8XVHLjnNhA6aNEPnnNTz8K at https://rpc.example.com/key"}}',
    );
    expect(text).toBe('Rate limited for the address at the endpoint');
  });

  it('returns nothing for an empty message and truncates a long one', () => {
    expect(scrubDetail('')).toBeUndefined();
    expect(scrubDetail(undefined)).toBeUndefined();
    const long = 'x'.repeat(500);
    const text = scrubDetail(long);
    expect(text).toHaveLength(160);
    expect(text?.endsWith('…')).toBe(true);
  });
});

describe('what the page says when a scan fails', () => {
  const host = 'rpc.example.com';

  it('blames a 429 before the history was read on rate limiting', () => {
    const failure = failureFor(state({ status: 429 }), host, false);
    expect(failure.reason).toBe('rate-limited');
    expect(failure.title).toBe('The RPC is turning requests away');
    expect(failure.body).toContain('It, or the RPC provider behind it, is limiting how many it takes.');
    expect(failure.body).toContain('or use your own RPC');
    expect(failure.offerOwnRpc).toBe(true);
  });

  it('blames a 429 after the history was read on the transactions being refused', () => {
    const failure = failureFor(state({ status: 429, historyRead: true }), host, false);
    expect(failure.reason).toBe('transactions-refused');
    expect(failure.title).toBe('The RPC stopped answering part-way');
    expect(failure.body).toContain('A score from a partial read would mislead');
    expect(failure.offerOwnRpc).toBe(true);
    const own = failureFor(state({ status: 429, historyRead: true }), host, true);
    expect(own.body).toContain('Wait a minute, then scan again with fewer transactions.');
    expect(own.offerOwnRpc).toBe(false);
  });

  it('reads 401 and 403 as a refusal', () => {
    const forbidden = failureFor(state({ status: 403 }), host, false);
    expect(forbidden.reason).toBe('forbidden');
    expect(forbidden.title).toBe('The RPC refused the request');
    expect(forbidden.body).toContain('403, not allowed');
    expect(failureFor(state({ status: 401 }), host, true).body).toContain('401');
  });

  it('reads 500 and up as a fault on the RPC side', () => {
    const failure = failureFor(state({ status: 503 }), host, true);
    expect(failure.reason).toBe('server-error');
    expect(failure.title).toBe('The RPC failed');
    expect(failure.body).toContain('503');
    expect(failure.body).toContain('a fault on its side');
  });

  it('reads no answer at all as unreachable', () => {
    const failure = failureFor(state({ noAnswer: true }), host, false);
    expect(failure.reason).toBe('unreachable');
    expect(failure.title).toBe('The RPC did not answer');
    expect(failure.body).toContain('No reply came back from rpc.example.com.');
    expect(failure.body).toContain('or use your own RPC');
    expect(failureFor(state({ noAnswer: true }), host, true).body).toContain('CORS');
  });

  it('puts a blocked connection-policy violation first', () => {
    const failure = failureFor(state({ blocked: true, status: 429 }), host, false);
    expect(failure.reason).toBe('blocked');
    expect(failure.title).toBe('This page may not connect to that endpoint');
    expect(failure.offerOwnRpc).toBe(false);
  });

  it('has copy for the page that could not guard itself, or load the scanner', () => {
    expect(failureFor(state(), host, false).reason).toBe('rpc-error');
    expect(failureFor(state(), host, false).title).toBe('The RPC returned an error');
  });

  it('passes a scrubbed detail through, and leaves it out when there is none', () => {
    expect(failureFor(state({ status: 500 }), host, true).detail).toBeUndefined();
    const withDetail = failureFor({ ...state({ status: 500 }), detail: 'boom' }, host, true);
    expect(withDetail.detail).toBe('boom');
  });
});
