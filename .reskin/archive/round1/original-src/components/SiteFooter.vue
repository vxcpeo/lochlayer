<template>
  <footer class="footer band water" data-depth="bed">
    <div class="contour" aria-hidden="true"><span>230 m</span></div>
    <div class="wrap">
      <div class="footer__grid">
        <div class="footer__brand">
          <img src="/media/mark.svg" width="40" height="40" alt="" />
          <div>
            <p class="footer__name">Loch</p>
            <p class="footer__status">v0.1, on mainnet.</p>
          </div>
        </div>
        <nav class="footer__links" aria-label="Project">
          <RouterLink to="/install" :aria-current="current('/install')">Install the extension</RouterLink>
          <RouterLink :to="isHome ? '#scanner' : '/#scanner'">Leak scanner</RouterLink>
          <RouterLink :to="isHome ? '#cautions' : '/#cautions'">Cautions</RouterLink>
          <RouterLink to="/verify" :aria-current="current('/verify')">Check a receipt</RouterLink>
          <RouterLink to="/docs" :aria-current="current('/docs')">Docs</RouterLink>
          <RouterLink to="/privacy" :aria-current="current('/privacy')">Privacy</RouterLink>
          <a href="https://github.com/lochlayer/loch-extension">Extension source</a>
          <a href="https://x.com/lochlayer">Loch on X</a>
        </nav>
      </div>
      <div class="footer__end">
        <div class="footer__fine">
          <p class="t-fine">No cookies. No analytics. No request to anyone else until you start a scan.</p>
          <p class="t-fine footer__token">
            $LOCH token:
            <code class="code-address">CYGidBuS8WwUXfZCmb98LnLGL9Mx8SvhdqA6t3xTLoch</code>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isHome = computed(() => route.path === '/');

function current(path: string): 'page' | undefined {
  return route.path === path ? 'page' : undefined;
}
</script>
