<template>
  <SiteIcons />
  <a class="sn-skip" href="#main">Skip to content</a>

  <SignalTop />

  <main id="main" class="sn-main">
    <div class="sn-bento">
      <SignalIndex />
      <RouterView />
    </div>
  </main>

  <SignalFoot />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import SignalFoot from './components/SignalFoot.vue';
import SignalIndex from './components/SignalIndex.vue';
import SignalTop from './components/SignalTop.vue';
import SiteIcons from './components/SiteIcons.vue';
import { installNarrowedPolicy } from './lib/policy';

onMounted(() => {
  // boot.js already put the narrow policy in place before the page was drawn.
  // If it did not load, this is the second line of defence the reference site has.
  installNarrowedPolicy();
});
</script>
