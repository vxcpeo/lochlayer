<template>
  <nav class="sn-index" aria-label="Page sections">
    <ul class="sn-index__list">
      <li>
        <RouterLink class="sn-index__link" :to="isHome ? '#how' : '/#how'">How it works</RouterLink>
      </li>
      <li>
        <RouterLink class="sn-index__link" :to="isHome ? '#scanner' : '/#scanner'">Leak scanner</RouterLink>
      </li>
      <li>
        <RouterLink class="sn-index__link" to="/docs" :aria-current="route.path === '/docs' ? 'page' : undefined">Docs</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const isHome = computed(() => route.path === '/');
</script>
