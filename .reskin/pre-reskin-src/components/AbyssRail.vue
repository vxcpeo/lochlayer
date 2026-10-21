<template>
  <div class="ab-frame">
    <nav class="ab-spine" :aria-label="isHome ? 'Sections' : 'Site'">
      <span class="ab-spine__mark" aria-hidden="true">
        <img src="/media/mark-small.svg" width="30" height="30" alt="" />
      </span>

      <ul class="ab-spine__routes">
        <li>
          <RouterLink class="ab-spine__route" to="/docs" aria-label="Docs">
            <svg class="ab-glyph" focusable="false" aria-hidden="true"><use href="#i-docs"></use></svg>
          </RouterLink>
        </li>
        <li>
          <RouterLink class="ab-spine__route" to="/install" aria-label="Install">
            <svg class="ab-glyph" focusable="false" aria-hidden="true"><use href="#i-install"></use></svg>
          </RouterLink>
        </li>
        <li>
          <RouterLink class="ab-spine__route" to="/privacy" aria-label="Privacy">
            <svg class="ab-glyph" focusable="false" aria-hidden="true"><use href="#i-privacy"></use></svg>
          </RouterLink>
        </li>
        <li>
          <RouterLink class="ab-spine__route" to="/verify" aria-label="Check a receipt">
            <svg class="ab-glyph" focusable="false" aria-hidden="true"><use href="#i-verify"></use></svg>
          </RouterLink>
        </li>
      </ul>

      <span class="ab-spine__tail" aria-hidden="true"></span>
    </nav>

    <div class="ab-column">
      <header class="ab-bar">
        <RouterLink
          class="ab-brand"
          :to="isHome ? '#top' : '/'"
          :aria-label="isHome ? 'Velaira, top of the page' : 'Velaira, start page'"
        >
          <img class="ab-brand__mark" src="/media/mark-on-land.svg" width="32" height="32" alt="" />
          <img class="ab-brand__mark ab-brand__mark--night" src="/media/mark-night.svg" width="32" height="32" alt="" />
          <span class="ab-brand__word">Velaira</span>
        </RouterLink>

        <div class="ab-bar__tools">
          <div class="ab-pal" role="radiogroup" aria-label="Palette" data-switch="theme" @keydown="onKeydown">
            <button
              v-for="option in OPTIONS"
              :key="option"
              ref="buttons"
              type="button"
              role="radio"
              class="ab-pal__btn"
              :aria-checked="theme === option ? 'true' : 'false'"
              :data-value="option"
              :tabindex="theme === option ? 0 : -1"
              @click="choose(option)"
            >{{ option === 'dusk' ? 'Dusk' : 'Night' }}</button>
          </div>

          <RouterLink v-if="showInstall" class="ab-cta" to="/install">Install</RouterLink>
        </div>
      </header>

      <main id="main" class="ab-stage">
        <slot />
      </main>

      <AbyssStatus />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import AbyssStatus from './AbyssStatus.vue';
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
