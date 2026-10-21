import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { DEFAULT_RPC, WAITLIST_URL } from '@/lib/endpoint';
import { connectSources, installNarrowedPolicy, narrowedPolicy, readConnectSrc } from '@/lib/policy';

const PAGE_POLICY =
  "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self' https: http://localhost:* http://127.0.0.1:*; form-action 'self' https://waitlist.velaira.xyz; base-uri 'none'; object-src 'none'";

const boot = readFileSync(resolve(process.cwd(), 'public/boot.js'), 'utf8');

function pageMarkup(): void {
  document.head.innerHTML = [
    `<meta name="velaira:rpc" content="${DEFAULT_RPC}">`,
    `<meta name="velaira:waitlist" content="${WAITLIST_URL}">`,
    `<meta name="velaira:custom-rpc" content="any">`,
    `<meta http-equiv="Content-Security-Policy" content="${PAGE_POLICY}">`,
  ].join('');
}

describe('the narrowed policy', () => {
  it('names this origin, the endpoint and the waitlist, and nothing else', () => {
    const policy = narrowedPolicy(PAGE_POLICY, {
      rpc: 'https://my-node.example.com/rpc',
      waitlist: WAITLIST_URL,
      pageOrigin: 'https://velaira.xyz',
    });
    expect(readConnectSrc(policy)).toEqual(["'self'", 'https://my-node.example.com', 'https://waitlist.velaira.xyz']);
    expect(policy).toContain("default-src 'self'");
    expect(policy).toContain("script-src 'self'");
    expect(policy).not.toContain('https: http://localhost');
  });

  it('leaves a source out when it is this origin, and de-duplicates', () => {
    const sources = connectSources({
      rpc: 'https://velaira.xyz/rpc',
      waitlist: WAITLIST_URL,
      pageOrigin: 'https://velaira.xyz',
    });
    expect(sources).toEqual(["'self'", 'https://waitlist.velaira.xyz']);
  });

  it('adds connect-src when the page policy has none', () => {
    const policy = narrowedPolicy("default-src 'self'", { rpc: DEFAULT_RPC, waitlist: WAITLIST_URL, pageOrigin: 'https://example.com' });
    expect(readConnectSrc(policy)).toEqual(["'self'", 'https://rpc.velaira.xyz', 'https://waitlist.velaira.xyz']);
  });

  it('does not add a second policy when boot.js already did', () => {
    pageMarkup();
    installNarrowedPolicy();
    expect(document.querySelectorAll('meta[data-velaira-policy]')).toHaveLength(1);
    const installed = document.querySelector('meta[data-velaira-policy]')?.getAttribute('content');
    expect(readConnectSrc(installed ?? '')).toEqual(["'self'", 'https://rpc.velaira.xyz', 'https://waitlist.velaira.xyz']);
  });
});

describe('public/boot.js and src/lib/policy.ts agree', () => {
  it('installs the same policy our TypeScript builds, for the default endpoint', () => {
    pageMarkup();
    new Function(boot)();
    const installed = document.querySelector('meta[data-velaira-policy]')?.getAttribute('content') ?? '';
    const expected = narrowedPolicy(PAGE_POLICY, {
      rpc: DEFAULT_RPC,
      waitlist: WAITLIST_URL,
      pageOrigin: window.location.origin,
    });
    expect(installed).toBe(expected);
    expect(document.documentElement.hasAttribute('data-js')).toBe(true);
  });

  it('uses an endpoint saved in this browser', () => {
    localStorage.setItem('velaira:rpc', 'https://my-node.example.com/');
    pageMarkup();
    new Function(boot)();
    const installed = document.querySelector('meta[data-velaira-policy]')?.getAttribute('content') ?? '';
    expect(readConnectSrc(installed)).toEqual(["'self'", 'https://my-node.example.com', 'https://waitlist.velaira.xyz']);
  });

  it('ignores a saved endpoint that is not usable', () => {
    localStorage.setItem('velaira:rpc', 'http://remote.example.com/');
    pageMarkup();
    new Function(boot)();
    const installed = document.querySelector('meta[data-velaira-policy]')?.getAttribute('content') ?? '';
    expect(readConnectSrc(installed)).toEqual(["'self'", 'https://rpc.velaira.xyz', 'https://waitlist.velaira.xyz']);
  });

  it('applies ?theme= without saving it', () => {
    window.history.replaceState(null, '', '/?theme=dusk');
    pageMarkup();
    new Function(boot)();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dusk');
    expect(localStorage.getItem('velaira:theme')).toBeNull();
    window.history.replaceState(null, '', '/');
  });
});
