<template>
  <nav class="ab-indexline" aria-label="Page sections">
    <ul class="ab-indexline__list">
      <li class="ab-indexline__item">
        <RouterLink class="ab-indexline__link" :to="isHome ? '#how' : '/#how'">How it works</RouterLink>
      </li>
      <li class="ab-indexline__item">
        <RouterLink class="ab-indexline__link" :to="isHome ? '#scanner' : '/#scanner'">Leak scanner</RouterLink>
      </li>
      <li class="ab-indexline__item">
        <RouterLink class="ab-indexline__link" to="/docs" :aria-current="route.path === '/docs' ? 'page' : undefined">Docs</RouterLink>
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
