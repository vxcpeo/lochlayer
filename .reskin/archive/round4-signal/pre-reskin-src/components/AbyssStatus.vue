<template>
  <footer class="ab-status">
    <div class="ab-status__gauge">
      <span class="ab-status__depth">230 m</span>
      <span class="ab-status__line" aria-hidden="true"></span>
    </div>

    <div class="ab-status__band">
      <div class="ab-status__id">
        <img class="ab-status__mark" src="/media/mark.svg" width="44" height="44" alt="" />
        <div class="ab-status__words">
          <p class="ab-status__name">Velaira</p>
          <p class="ab-status__phase">v0.1, on mainnet.</p>
        </div>
      </div>

      <div class="ab-status__rail">
        <ul class="ab-status__links">
          <li><RouterLink to="/install" :aria-current="current('/install')">Install the extension</RouterLink></li>
          <li><RouterLink :to="isHome ? '#scanner' : '/#scanner'">Leak scanner</RouterLink></li>
          <li><RouterLink :to="isHome ? '#cautions' : '/#cautions'">Cautions</RouterLink></li>
          <li><RouterLink to="/verify" :aria-current="current('/verify')">Check a receipt</RouterLink></li>
          <li><RouterLink to="/docs" :aria-current="current('/docs')">Docs</RouterLink></li>
          <li><RouterLink to="/privacy" :aria-current="current('/privacy')">Privacy</RouterLink></li>
          <li><a href="https://github.com/lochlayer/loch-extension">Extension source</a></li>
          <li><a href="https://x.com/velaira">Velaira on X</a></li>
        </ul>
      </div>
    </div>

    <div class="ab-status__fine">
      <p class="ab-status__note">No cookies. No analytics. No request to anyone else until you start a scan.</p>
      <p class="ab-status__token">
        $VELAIRA token:
        <code class="ab-token">CYGidBuS8WwUXfZCmb98LnLGL9Mx8SvhdqA6t3xTLoch</code>
      </p>
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
