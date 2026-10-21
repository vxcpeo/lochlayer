<template>

<header class="masthead land" :class="{ 'masthead--sky': isHome }" data-theme="night">

<div class="wrap masthead__row">
      <RouterLink class="brand" :to="isHome ? '#top' : '/'" :aria-label="isHome ? 'Loch, top of the page' : 'Loch, start page'">
        <img class="mark--dusk" src="/media/mark-on-land.svg" width="30" height="30" alt="" />
        <img class="mark--night" src="/media/mark-night.svg" width="30" height="30" alt="" />
        <span class="brand__name">Loch</span>
      </RouterLink>

<nav class="nav" :aria-label="isHome ? 'Sections' : 'Site'">
        <RouterLink :to="isHome ? '#how' : '/#how'">How it works</RouterLink>
        <RouterLink :to="isHome ? '#scanner' : '/#scanner'">Leak scanner</RouterLink>
        <RouterLink to="/docs" :aria-current="route.path === '/docs' ? 'page' : undefined">Docs</RouterLink>
      </nav>

<div class="segmented palette js-only" role="radiogroup" aria-label="Palette" data-switch="theme" @keydown="onKeydown">
        <button
          v-for="option in OPTIONS"
          :key="option"
          ref="buttons"
          type="button"
          role="radio"
          :aria-checked="theme === option ? 'true' : 'false'"
          :data-value="option"
          :tabindex="theme === option ? 0 : -1"
          @click="choose(option)"
        >
          {{ option === 'dusk' ? 'Dusk' : 'Night' }}
        </button>
      </div>
      <RouterLink v-if="showInstall" class="btn btn--secondary btn--sm masthead__cta" to="/install">Install</RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { applyTheme, nextTheme, theme, type Theme } from '../lib/theme';

const OPTIONS: Theme[] = ['dusk', 'night'];
const route = useRoute();
const buttons = ref<HTMLButtonElement[]>([]);

const isHome = computed(() => route.path === '/');
// The reference page has the Install button on every page but the install
// page itself; its server-rendered header for /docs omits it, and the client
// puts it back, which is what a visitor actually sees.
const showInstall = computed(() => route.path !== '/install');

function choose(next: Theme): void {
  applyTheme(next);
  const index = OPTIONS.indexOf(theme.value);
  buttons.value[index]?.focus();
}

function onKeydown(event: KeyboardEvent): void {
  const next = nextTheme(theme.value, event.key);
  if (!next) return;
  event.preventDefault();
  applyTheme(next);
  const index = OPTIONS.indexOf(next);
  buttons.value[index]?.focus();
}

// The boot script picked the palette before the page was drawn; keep the
// reactive value and the document in step when a test or another tab changes it.
watch(theme, (value) => {
  if (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') !== value) {
    document.documentElement.setAttribute('data-theme', value);
  }
});
</script>
