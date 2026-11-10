<template>
  <section class="cb-runhead" aria-labelledby="hero-title">
    <div class="cb-runhead__plate" aria-hidden="true">
      <img src="/media/enclaven-plate.svg" width="1700" height="900" alt="" decoding="async">
    </div>

    <h1 id="hero-title" class="cb-runhead__title">
      <span class="cb-runhead__land"><span class="cb-rise" data-i="0">Your</span> <span class="cb-rise" data-i="1">wallet</span> <span class="cb-rise" data-i="2">is</span> <span class="cb-rise" data-i="3">public.</span></span>
      <span ref="water" class="cb-runhead__water">The Enclaven is not.</span>
    </h1>

    <div class="cb-runhead__body">
      <p class="cb-lede">A shielded balance inside Phantom, Solflare or Backpack. Pay from it, and your history stays behind.</p>

      <div class="cb-runhead__foot">
        <div class="cb-actions">
          <span class="cb-btn cb-btn--soft cb-btn--lg">Coming soon<span class="visually-hidden"> to the Chrome Web Store</span></span>
          <a class="cb-btn cb-btn--outline" href="#scanner">Scan a wallet address</a>
        </div>

        <p class="cb-runhead__note"><strong>v0.1, on mainnet.</strong> <a href="#cautions">Read the cautions</a> before you dive in.</p>
      </div>
    </div>

    <div class="cb-runhead__gauge" aria-hidden="true">
      <svg viewBox="0 0 320 320" focusable="false">
        <g fill="none" stroke="currentColor" stroke-width="1">
          <circle cx="160" cy="160" r="154" opacity="0.2" />
          <circle cx="160" cy="160" r="118" opacity="0.26" stroke-dasharray="2 7" />
          <circle cx="160" cy="160" r="82" opacity="0.4" />
          <circle cx="160" cy="160" r="46" opacity="0.55" stroke-dasharray="2 5" />
          <circle cx="160" cy="160" r="13" opacity="0.9" />
          <path d="M160 6v52M160 262v52M6 160h52M262 160h52" opacity="0.45" />
          <path d="M160 160 264 66" opacity="0.5" />
          <path d="M160 160 96 250" opacity="0.28" />
        </g>
        <g fill="currentColor">
          <circle cx="264" cy="66" r="3.5" opacity="0.9" />
          <circle cx="96" cy="250" r="2.5" opacity="0.55" />
          <circle cx="222" cy="228" r="2" opacity="0.4" />
        </g>
      </svg>
    </div>
  </section>

  <div class="cb-stage">
    <div class="cb-stage__lead">
      <StepsChapter />
    </div>
    <div class="cb-stage__margin">
      <PopupFigure />
    </div>
  </div>

  <ScanChapter />
  <IdeasChapter />
  <RegistersChapter />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import IdeasChapter from '../components/home/IdeasChapter.vue';
import PopupFigure from '../components/home/PopupFigure.vue';
import RegistersChapter from '../components/home/RegistersChapter.vue';
import ScanChapter from '../components/home/ScanChapter.vue';
import StepsChapter from '../components/home/StepsChapter.vue';

const water = ref<HTMLElement | null>(null);

onMounted(() => {
  // The reveal effect's final state: the line is drawn once by a copy of itself,
  // generated from the text already on the page. The original stays in place, inset.
  const el = water.value;
  if (!el) return;
  const overlay = document.createElement('span');
  overlay.className = 'cb-reveal';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.textContent = el.textContent ?? '';
  el.setAttribute('data-set', '');
  el.append(overlay);
});
</script>
