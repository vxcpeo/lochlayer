import { createMemoryHistory, createRouter, type Router } from 'vue-router';
import { mount, type MountingOptions } from '@vue/test-utils';
import type { Component, Plugin } from 'vue';

const Blank = { template: '<div />' };

/** A router with every page of the site, for components that link or read the route. */
export function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: Blank },
      { path: '/docs', component: Blank },
      { path: '/install', component: Blank },
      { path: '/privacy', component: Blank },
      { path: '/verify', component: Blank },
      { path: '/:pathMatch(.*)*', component: Blank },
    ],
  });
}

/** Mounts a component with the site's router, at `route`. */
export async function mountWithRouter(
  component: Component,
  options: MountingOptions<Record<string, unknown>> & { route?: string } = {},
) {
  const router = makeRouter();
  await router.push(options.route ?? '/');
  await router.isReady();
  const { route: _route, ...mountOptions } = options;
  const wrapper = mount(component, {
    ...mountOptions,
    global: {
      ...mountOptions.global,
      plugins: [router, ...((mountOptions.global?.plugins as Plugin[]) ?? [])],
    },
  });
  return { wrapper, router };
}
