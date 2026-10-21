import { describe, expect, it } from 'vitest';
import {
  DEFAULT_RPC,
  activeEndpoint,
  endpointMessage,
  hostOf,
  isPlainOrigin,
  plainOrigin,
  saveEndpoint,
  usingOwnEndpoint,
  validateEndpoint,
  type EndpointChoice,
} from '@/lib/endpoint';

const choice = (over: Partial<EndpointChoice> = {}): EndpointChoice => ({
  defaultRpc: DEFAULT_RPC,
  stored: null,
  customRpc: true,
  ...over,
});

describe('endpoint validation', () => {
  it('accepts https anywhere, and http only on this machine', () => {
    expect(validateEndpoint('https://rpc.example.com')).toEqual({ ok: true, url: 'https://rpc.example.com/' });
    expect(validateEndpoint('https://rpc.example.com/key?x=1').ok).toBe(true);
    expect(validateEndpoint('http://localhost:8899')).toEqual({ ok: true, url: 'http://localhost:8899/' });
    expect(validateEndpoint('http://127.0.0.1')).toEqual({ ok: true, url: 'http://127.0.0.1/' });
    expect(validateEndpoint('http://rpc.example.com')).toEqual({ ok: false, reason: 'not-https' });
  });

  it('gives each refusal its own reason', () => {
    expect(validateEndpoint('')).toEqual({ ok: false, reason: 'empty' });
    expect(validateEndpoint('   ')).toEqual({ ok: false, reason: 'empty' });
    expect(validateEndpoint('rpc.example.com')).toEqual({ ok: false, reason: 'not-a-url' });
    expect(validateEndpoint('ftp://rpc.example.com')).toEqual({ ok: false, reason: 'not-a-url' });
    expect(validateEndpoint('https://user:pass@rpc.example.com')).toEqual({ ok: false, reason: 'credentials' });
    expect(validateEndpoint('https://under_score.example.com')).toEqual({ ok: false, reason: 'odd-host' });
  });

  it('writes the sentence for each refusal, as the scanner does', () => {
    expect(endpointMessage('empty')).toBe('Type the endpoint’s address, starting with https://.');
    expect(endpointMessage('not-https')).toContain('Plain http is accepted only for a node on this machine');
    expect(endpointMessage('odd-host')).toContain('letters, digits, dots and hyphens');
    expect(endpointMessage('credentials')).toContain('user name or a password');
    expect(endpointMessage('not-a-url')).toContain('That is not a web address');
  });

  it('only lets a plain origin into a policy', () => {
    expect(isPlainOrigin('https://rpc.example.com')).toBe(true);
    expect(isPlainOrigin('https://rpc.example.com:8899')).toBe(true);
    expect(isPlainOrigin('https://rpc.example.com/key')).toBe(false);
    expect(isPlainOrigin('https://rpc.example.com;script-src *')).toBe(false);
    expect(isPlainOrigin('https://user@rpc.example.com')).toBe(false);
    expect(plainOrigin('https://rpc.example.com/key?x=1')).toBe('https://rpc.example.com');
    expect(plainOrigin('nonsense')).toBeNull();
  });
});

describe('the endpoint in use', () => {
  it('is the saved one when it is usable', () => {
    const saved = choice({ stored: 'https://my-node.example.com' });
    expect(activeEndpoint(saved)).toBe('https://my-node.example.com/');
    expect(usingOwnEndpoint(saved)).toBe(true);
  });

  it('falls back to the default when the saved one is unusable or the site does not allow one', () => {
    expect(activeEndpoint(choice({ stored: 'http://remote.example.com' }))).toBe(DEFAULT_RPC);
    expect(activeEndpoint(choice({ stored: 'https://my-node.example.com', customRpc: false }))).toBe(DEFAULT_RPC);
    expect(usingOwnEndpoint(choice())).toBe(false);
  });

  it('stores and forgets a saved endpoint', () => {
    expect(saveEndpoint('https://my-node.example.com/')).toBe(true);
    expect(localStorage.getItem('velaira:rpc')).toBe('https://my-node.example.com/');
    expect(saveEndpoint(null)).toBe(true);
    expect(localStorage.getItem('velaira:rpc')).toBeNull();
  });

  it('shows the host alone in a sentence', () => {
    expect(hostOf('https://rpc.example.com/key?x=1')).toBe('rpc.example.com');
    expect(hostOf('not a url')).toBe('not a url');
  });
});
