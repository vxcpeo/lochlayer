<template>
  <footer class="sn-foot">
    <div class="sn-foot__inner">
      <div class="sn-foot__id">
        <img class="sn-brand__mark" src="/media/mark.svg" width="34" height="34" alt="" />
        <p class="sn-foot__name">Velaira</p>
        <p class="sn-foot__phase">v0.1, on mainnet.</p>
        <span class="sn-depth">230 m</span>
      </div>

      <ul class="sn-foot__links">
        <li><RouterLink to="/install" :aria-current="current('/install')">Install the extension</RouterLink></li>
        <li><RouterLink :to="isHome ? '#scanner' : '/#scanner'">Leak scanner</RouterLink></li>
        <li><RouterLink :to="isHome ? '#cautions' : '/#cautions'">Cautions</RouterLink></li>
        <li><RouterLink to="/verify" :aria-current="current('/verify')">Check a receipt</RouterLink></li>
        <li><RouterLink to="/docs" :aria-current="current('/docs')">Docs</RouterLink></li>
        <li><RouterLink to="/privacy" :aria-current="current('/privacy')">Privacy</RouterLink></li>
        <li><a href="https://github.com/lochlayer/loch-extension">Extension source</a></li>
        <li><a href="https://x.com/velaira">Velaira on X</a></li>
      </ul>

      <div class="sn-foot__fine">
        <p>No cookies. No analytics. No request to anyone else until you start a scan.</p>
        <p class="sn-foot__token">
          $VELAIRA token:
          <code class="sn-foot__code">CYGidBuS8WwUXfZCmb98LnLGL9Mx8SvhdqA6t3xTLoch</code>
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
