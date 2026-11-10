<template>
  <header class="cb-bar">
    <div class="cb-bar__inner">
      <RouterLink
        class="cb-brand"
        :to="isHome ? '#top' : '/'"
        :aria-label="isHome ? 'Enclaven, top of the page' : 'Enclaven, start page'"
      >
        <img class="cb-brand__mark" src="/media/mark-on-land.svg" width="30" height="30" alt="" data-skin="land" />
        <img class="cb-brand__mark" src="/media/mark-night.svg" width="30" height="30" alt="" data-skin="night" />
        <span class="cb-brand__word">Enclaven</span>
      </RouterLink>

      <ul class="cb-sections" aria-label="Page sections">
        <li>
          <RouterLink class="cb-sections__link" :to="isHome ? '#how' : '/#how'">How it works</RouterLink>
        </li>
        <li>
          <RouterLink class="cb-sections__link" :to="isHome ? '#scanner' : '/#scanner'">Leak scanner</RouterLink>
        </li>
        <li>
          <RouterLink class="cb-sections__link" to="/docs" :aria-current="route.path === '/docs' ? 'page' : undefined">Docs</RouterLink>
        </li>
      </ul>

      <div class="cb-tools">
        <div class="cb-palette" role="radiogroup" aria-label="Palette" data-switch="theme" @keydown="onKeydown">
          <button
            v-for="option in OPTIONS"
            :key="option"
            ref="buttons"
            type="button"
            role="radio"
            class="cb-palette__btn"
            :aria-checked="theme === option ? 'true' : 'false'"
            :data-value="option"
            :tabindex="theme === option ? 0 : -1"
            @click="choose(option)"
          >{{ option === 'dusk' ? 'Dusk' : 'Night' }}</button>
        </div>

        <RouterLink v-if="showInstall" class="cb-cta" to="/install">Install</RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
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
