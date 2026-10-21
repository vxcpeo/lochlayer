<template>
  <header class="sn-top">
    <div class="sn-top__inner">
      <RouterLink
        class="sn-brand"
        :to="isHome ? '#top' : '/'"
        :aria-label="isHome ? 'Velaira, top of the page' : 'Velaira, start page'"
      >
        <img class="sn-brand__mark" src="/media/mark-on-land.svg" width="30" height="30" alt="" data-skin="land" />
        <img class="sn-brand__mark" src="/media/mark-night.svg" width="30" height="30" alt="" data-skin="night" />
        <span class="sn-brand__word">Velaira</span>
      </RouterLink>

      <nav class="sn-routes" :aria-label="isHome ? 'Sections' : 'Site'">
        <ul>
          <li>
            <RouterLink class="sn-route" to="/docs" aria-label="Docs">
              <svg class="sn-route__glyph" focusable="false" aria-hidden="true"><use href="#i-docs"></use></svg>
            </RouterLink>
          </li>
          <li>
            <RouterLink class="sn-route" to="/install" aria-label="Install">
              <svg class="sn-route__glyph" focusable="false" aria-hidden="true"><use href="#i-install"></use></svg>
            </RouterLink>
          </li>
          <li>
            <RouterLink class="sn-route" to="/privacy" aria-label="Privacy">
              <svg class="sn-route__glyph" focusable="false" aria-hidden="true"><use href="#i-privacy"></use></svg>
            </RouterLink>
          </li>
          <li>
            <RouterLink class="sn-route" to="/verify" aria-label="Check a receipt">
              <svg class="sn-route__glyph" focusable="false" aria-hidden="true"><use href="#i-verify"></use></svg>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="sn-tools">
        <div class="sn-pal" role="radiogroup" aria-label="Palette" data-switch="theme" @keydown="onKeydown">
          <button
            v-for="option in OPTIONS"
            :key="option"
            ref="buttons"
            type="button"
            role="radio"
            class="sn-pal__btn"
            :aria-checked="theme === option ? 'true' : 'false'"
            :data-value="option"
            :tabindex="theme === option ? 0 : -1"
            @click="choose(option)"
          >{{ option === 'dusk' ? 'Dusk' : 'Night' }}</button>
        </div>

        <RouterLink v-if="showInstall" class="sn-cta" to="/install">Install</RouterLink>
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
