<template>
  <SiteIcons />
  <a class="ab-jump" href="#main">Skip to content</a>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import SiteIcons from './components/SiteIcons.vue';
import { installNarrowedPolicy } from './lib/policy';

onMounted(() => {
  // boot.js already put the narrow policy in place before the page was drawn.
  // If it did not load, this is the second line of defence the reference site has.
  installNarrowedPolicy();
});
</script>
