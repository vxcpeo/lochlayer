<template>
  <footer class="cb-status">
    <div class="cb-status__inner">
      <div class="cb-status__id">
        <img class="cb-status__mark" src="/media/mark.svg" width="34" height="34" alt="" />
        <p class="cb-status__name">Enclaven</p>
        <p class="cb-status__phase">v0.1, on mainnet.</p>
        <span class="cb-depth">230 m</span>
      </div>

      <ul class="cb-status__links">
        <li><RouterLink to="/install" :aria-current="current('/install')">Install the extension</RouterLink></li>
        <li><RouterLink :to="isHome ? '#scanner' : '/#scanner'">Leak scanner</RouterLink></li>
        <li><RouterLink :to="isHome ? '#cautions' : '/#cautions'">Cautions</RouterLink></li>
        <li><RouterLink to="/verify" :aria-current="current('/verify')">Check a receipt</RouterLink></li>
      </ul>

      <ul class="cb-status__links cb-status__links--quiet">
        <li><RouterLink to="/docs" :aria-current="current('/docs')">Docs</RouterLink></li>
        <li><RouterLink to="/privacy" :aria-current="current('/privacy')">Privacy</RouterLink></li>
        <li><a href="https://github.com/lochlayer/loch-extension">Extension source</a></li>
        <li><a href="https://x.com/enclaven">Enclaven on X</a></li>
      </ul>

      <div class="cb-status__fine">
        <p>No cookies. No analytics. No request to anyone else until you start a scan.</p>
        <p class="cb-status__token">
          $ENCLAVEN token:
          <code class="cb-status__code">CYGidBuS8WwUXfZCmb98LnLGL9Mx8SvhdqA6t3xTLoch</code>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const isHome = computed(() => route.path === '/');

function current(path: string): 'page' | undefined {
  return route.path === path ? 'page' : undefined;
}
</script>
