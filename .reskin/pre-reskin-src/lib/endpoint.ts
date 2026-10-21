/**
 * The RPC endpoint a page may connect to, and the copy the scanner's form
 * shows when an address is refused. The rules are the ones in public/boot.js,
 * which runs before the page is drawn; unit tests run both.
 */

/** The `<meta name="velaira:rpc">` default. */
export const DEFAULT_RPC = 'https://rpc.velaira.xyz/';

/** The `<meta name="velaira:waitlist">` address. Only the form may post to it. */
export const WAITLIST_URL = 'https://waitlist.velaira.xyz/v1/waitlist';

/** Where a visitor's own endpoint is kept. Browser only, sent to nobody. */
export const RPC_STORAGE_KEY = 'velaira:rpc';

export const THEME_STORAGE_KEY = 'velaira:theme';

export type EndpointFailure = 'empty' | 'not-https' | 'odd-host' | 'credentials' | 'not-a-url';

export type EndpointResult = { ok: true; url: string } | { ok: false; reason: EndpointFailure };

/** http or https, a host of letters, digits and hyphens in labels parted by dots, an optional port. */
const PLAIN_ORIGIN = /^https?:\/\/[a-z0-9-]+(?:\.[a-z0-9-]+)*(?::[0-9]{1,5})?$/;

/** True for an origin a policy can name: no path, no credentials, no quoting out of the directive. */
export function isPlainOrigin(origin: string): boolean {
  return origin.length <= 267 && PLAIN_ORIGIN.test(origin);
}

/** The origin of `value`, when it is plain enough to put in a policy; otherwise null. */
export function plainOrigin(value: string): string | null {
  try {
    const origin = new URL(value).origin;
    return isPlainOrigin(origin) ? origin : null;
  } catch {
    return null;
  }
}

/**
 * Validates an RPC endpoint a visitor typed. The same rule the form applies,
 * and the same one public/boot.js uses to decide what to put in the policy.
 */
export function validateEndpoint(value: string): EndpointResult {
  const text = String(value ?? '').trim();
  if (text === '') return { ok: false, reason: 'empty' };
  let url: URL;
  try {
    url = new URL(text);
  } catch {
    return { ok: false, reason: 'not-a-url' };
  }
  const local = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  const allowed = url.protocol === 'https:' || (url.protocol === 'http:' && local);
  if (!allowed) return { ok: false, reason: url.protocol === 'http:' ? 'not-https' : 'not-a-url' };
  if (url.username !== '' || url.password !== '') return { ok: false, reason: 'credentials' };
  if (!isPlainOrigin(url.origin)) return { ok: false, reason: 'odd-host' };
  return { ok: true, url: url.href };
}

/** The sentence the scanner's form shows under an endpoint that was refused. */
export function endpointMessage(reason: EndpointFailure): string {
  switch (reason) {
    case 'empty':
      return 'Type the endpoint’s address, starting with https://.';
    case 'not-https':
      return 'Use an https address. Plain http is accepted only for a node on this machine, at localhost or 127.0.0.1.';
    case 'odd-host':
      return 'That address has a character a host name cannot have here. Use letters, digits, dots and hyphens, as in https://rpc.example.com.';
    case 'credentials':
      return 'That address carries a user name or a password, and a web page cannot send a request to such an address. Put the key in the path or the query, where the provider’s own address has it.';
    case 'not-a-url':
      return 'That is not a web address. An RPC endpoint looks like https://rpc.example.com.';
  }
}

/** The host alone, for sentences such as "asks rpc.example.com for the balance". */
export function hostOf(value: string): string {
  try {
    return new URL(value).host;
  } catch {
    return value;
  }
}

/** What the site's own endpoint choices say, once localStorage and the meta tags are read. */
export type EndpointChoice = {
  defaultRpc: string;
  stored: string | null;
  customRpc: boolean;
};

/** Reads the meta tags and the saved endpoint. Browser only. */
export function readChoice(): EndpointChoice {
  const meta = (name: string): string => {
    if (typeof document === 'undefined') return '';
    return document.querySelector(`meta[name="${name}"]`)?.getAttribute('content') ?? '';
  };
  const stored = (() => {
    try {
      return window.localStorage.getItem(RPC_STORAGE_KEY);
    } catch {
      return null;
    }
  })();
  return {
    defaultRpc: meta('velaira:rpc') || DEFAULT_RPC,
    stored,
    customRpc: meta('velaira:custom-rpc') === 'any',
  };
}

/**
 * The endpoint a page uses: the saved one when it is usable and the site allows
 * one, the default otherwise. `boot.js` puts the same origin in the policy.
 */
export function activeEndpoint(choice: EndpointChoice = readChoice()): string {
  if (!choice.customRpc || choice.stored === null) return choice.defaultRpc;
  const result = validateEndpoint(choice.stored);
  return result.ok ? result.url : choice.defaultRpc;
}

/** True when the page is running with an endpoint the visitor saved. */
export function usingOwnEndpoint(choice: EndpointChoice = readChoice()): boolean {
  return activeEndpoint(choice) !== choice.defaultRpc;
}

/** Saves an endpoint (or forgets it, with null). Returns false when storage refused. */
export function saveEndpoint(value: string | null): boolean {
  try {
    if (value === null) window.localStorage.removeItem(RPC_STORAGE_KEY);
    else window.localStorage.setItem(RPC_STORAGE_KEY, value);
    return true;
  } catch {
    return false;
  }
}

/** The whole page's balance/history requests go through this origin. */
export function endpointProblem(choice: EndpointChoice = readChoice()): string | null {
  if (choice.stored === null) return null;
  const result = validateEndpoint(choice.stored);
  if (result.ok) return null;
  const detail = result.reason === 'empty' ? '' : ` ${endpointMessage(result.reason)}`;
  return `The address saved in this browser cannot be used, so scans go to the default endpoint, ${hostOf(choice.defaultRpc)}.${detail} Save another address, or go back to the default endpoint.`;
}
