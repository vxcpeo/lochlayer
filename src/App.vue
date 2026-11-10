<template>
  <SiteIcons />
  <a class="cb-skip" href="#main">Skip to content</a>

  <CobaltRail />

  <div class="cb-shell">
    <CobaltBar />

    <main id="main" class="cb-main">
      <div class="cb-page">
        <RouterView />
      </div>
    </main>

    <CobaltStatus />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import CobaltBar from './components/CobaltBar.vue';
import CobaltRail from './components/CobaltRail.vue';
import CobaltStatus from './components/CobaltStatus.vue';
import SiteIcons from './components/SiteIcons.vue';
import { installNarrowedPolicy } from './lib/policy';

onMounted(() => {
  // boot.js already put the narrow policy in place before the page was drawn.
  // If it did not load, this is the second line of defence the reference site has.
  installNarrowedPolicy();
});
</script>
