import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';

export type PageMeta = {
  title: string;
  description: string;
};

/** The title and description each page is served with, as the reference site has them. */
export const PAGE_META: Record<string, PageMeta> = {
  home: {
    title: 'Loch: a shielded balance inside your Solana wallet',
    description:
      'Loch is a privacy layer for Solana: a shielded balance inside Phantom, Solflare or Backpack, with no new seed phrase. v0.1, on mainnet.',
  },
  docs: {
    title: 'Technical docs: how the Loch keeps a payment private',
    description:
      'The technical version of how Loch works: notes and commitments, nullifiers, the Groth16 proof, note encryption, the relayer, and what v0.1 does not protect.',
  },
  install: {
    title: 'Install Loch: get the extension',
    description:
      'Add the Loch extension to Chrome, Brave or Edge from the Chrome Web Store, or download it and load it by hand, step by step.',
  },
  privacy: {
    title: 'Privacy: what the Loch site and extension keep',
    description:
      'What the Loch website and the Loch extension store, what they send and to whom, and how to be taken off the waitlist.',
  },
  verify: {
    title: 'Check a Loch receipt, report or viewing key',
    description:
      'Paste a payment receipt, a source-of-funds report or a viewing key someone gave you. This page checks it against the chain, in your browser.',
  },
};

/** Sets the document title and description for the page on screen. */
export function applyPageMeta(name: keyof typeof PAGE_META): void {
  if (typeof document === 'undefined') return;
  const meta = PAGE_META[name];
  document.title = meta.title;
  let description = document.querySelector('meta[name="description"]');
  if (!description) {
    description = document.createElement('meta');
    description.setAttribute('name', 'description');
    document.head.appendChild(description);
  }
  description.setAttribute('content', meta.description);
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { page: 'home' } },
    { path: '/docs', name: 'docs', component: () => import('./views/DocsView.vue'), meta: { page: 'docs' } },
    { path: '/install', name: 'install', component: () => import('./views/InstallView.vue'), meta: { page: 'install' } },
    { path: '/privacy', name: 'privacy', component: () => import('./views/PrivacyView.vue'), meta: { page: 'privacy' } },
    { path: '/verify', name: 'verify', component: () => import('./views/VerifyView.vue'), meta: { page: 'verify' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 0 };
    }
    return { top: 0 };
  },
});

router.afterEach((to) => {
  const page = (to.meta.page as keyof typeof PAGE_META | undefined) ?? 'home';
  applyPageMeta(page);
});

export default router;
