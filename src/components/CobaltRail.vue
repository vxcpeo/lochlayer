<template>
  <nav class="cb-spine" aria-label="Site">
    <span class="cb-spine__seal" aria-hidden="true">
      <img src="/media/mark.svg" width="26" height="26" alt="" />
    </span>

    <ul class="cb-spine__routes">
      <li>
        <RouterLink class="cb-nav__link" to="/docs" aria-label="Docs">
          <svg class="cb-nav__glyph" focusable="false" aria-hidden="true"><use href="#i-docs"></use></svg>
        </RouterLink>
      </li>
      <li>
        <RouterLink class="cb-nav__link" to="/install" aria-label="Install">
          <svg class="cb-nav__glyph" focusable="false" aria-hidden="true"><use href="#i-install"></use></svg>
        </RouterLink>
      </li>
      <li>
        <RouterLink class="cb-nav__link" to="/privacy" aria-label="Privacy">
          <svg class="cb-nav__glyph" focusable="false" aria-hidden="true"><use href="#i-privacy"></use></svg>
        </RouterLink>
      </li>
      <li>
        <RouterLink class="cb-nav__link" to="/verify" aria-label="Check a receipt">
          <svg class="cb-nav__glyph" focusable="false" aria-hidden="true"><use href="#i-verify"></use></svg>
        </RouterLink>
      </li>
    </ul>

    <span class="cb-spine__rule" aria-hidden="true"></span>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
