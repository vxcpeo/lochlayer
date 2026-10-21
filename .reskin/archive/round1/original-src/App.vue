<template>
  <SiteIcons />
  <a class="skip-link" href="#main">Skip to content</a>
  <SiteHeader />
  <main id="main">
    <RouterView />
  </main>
  <SiteFooter />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import SiteFooter from './components/SiteFooter.vue';
import SiteHeader from './components/SiteHeader.vue';
import SiteIcons from './components/SiteIcons.vue';
import { installNarrowedPolicy } from './lib/policy';

onMounted(() => {
  // boot.js already put the narrow policy in place before the page was drawn.
  // If it did not load, this is the second line of defence the reference site has.
  installNarrowedPolicy();
});
</script>
