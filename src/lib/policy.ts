/**
 * The second Content-Security-Policy a page adds once it knows which endpoint
 * it uses. `public/boot.js` does the same thing before the page is drawn; the
 * rules are repeated here so they can be tested, and the site's own script does
 * it too if the boot script did not load.
 *
 * The policy in the page has to admit any https endpoint, because a visitor may
 * name their own. This narrows `connect-src` to this origin, the endpoint in
 * use and the waitlist. A policy cannot be loosened again until the page is
 * reloaded.
 */

import { WAITLIST_URL, activeEndpoint, plainOrigin, usingOwnEndpoint } from './endpoint';

/** The `connect-src` sources, in order: this origin, the endpoint, the waitlist. */
export function connectSources(options: { rpc: string; waitlist: string; pageOrigin: string }): string[] {
  const sources = ["'self'"];
  for (const candidate of [options.rpc, options.waitlist]) {
    const origin = plainOrigin(candidate);
    if (origin === null || origin === options.pageOrigin || sources.includes(origin)) continue;
    sources.push(origin);
  }
  return sources;
}

/** The `connect-src` directive of a policy, split into sources; null when it has none. */
export function readConnectSrc(policy: string): string[] | null {
  for (const directive of String(policy ?? '').split(';')) {
    const parts = directive.trim().split(/\s+/);
    if (parts[0] === 'connect-src') return parts.slice(1);
  }
  return null;
}

/** The page's policy with `connect-src` replaced by the narrow one. */
export function narrowedPolicy(pagePolicy: string, endpoint: { rpc: string; waitlist: string; pageOrigin: string }): string {
  const narrow = `connect-src ${connectSources(endpoint).join(' ')}`;
  const directives = String(pagePolicy ?? '')
    .split(';')
    .map((directive) => directive.trim())
    .filter((directive) => directive !== '');
  let replaced = false;
  for (let i = 0; i < directives.length; i++) {
    const name = directives[i]!.split(/\s+/)[0];
    if (name === 'connect-src') {
      directives[i] = narrow;
      replaced = true;
    }
  }
  if (!replaced) directives.push(narrow);
  return directives.join('; ');
}

/**
 * Installs the narrow policy as a second meta element, in the browser. Returns
 * the policy string it installed, or null when the page had no policy of its
 * own to narrow (the boot script adds it in that case).
 */
export function installNarrowedPolicy(): string | null {
  if (typeof document === 'undefined') return null;
  if (document.querySelector('meta[data-miston-policy]')) return null;
  const page = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  if (!page) return null;
  const policy = narrowedPolicy(page.getAttribute('content') ?? '', {
    rpc: activeEndpoint(),
    waitlist: WAITLIST_URL,
    pageOrigin: window.location.origin,
  });
  const meta = document.createElement('meta');
  meta.setAttribute('http-equiv', 'Content-Security-Policy');
  meta.setAttribute('content', policy);
  meta.setAttribute('data-miston-policy', '');
  document.head.appendChild(meta);
  return policy;
}

/** True when the page is using an RPC endpoint the visitor saved. */
export { usingOwnEndpoint };
