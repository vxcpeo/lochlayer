<template>
  <section class="sn-tile sn-tile--anchor sn-hero" aria-labelledby="hero-title">
    <div class="sn-hero__plate" aria-hidden="true">
      <img src="/media/velaira-plate.svg" width="1700" height="900" alt="" decoding="async">
    </div>

    <div class="sn-hero__body">
      <h1 id="hero-title" class="sn-hero__title">
        <span class="sn-hero__land"><span class="sn-rise" data-i="0">Your</span> <span class="sn-rise" data-i="1">wallet</span> <span class="sn-rise" data-i="2">is</span> <span class="sn-rise" data-i="3">public.</span></span>
        <span ref="water" class="sn-hero__water">The Velaira is not.</span>
      </h1>

      <p class="sn-lede">A shielded balance inside Phantom, Solflare or Backpack. Pay from it, and your history stays behind.</p>
    </div>

    <div class="sn-hero__gauge" aria-hidden="true">
      <svg viewBox="0 0 320 320" focusable="false">
        <g fill="none" stroke="currentColor" stroke-width="1">
          <circle cx="160" cy="160" r="154" opacity="0.22" />
          <circle cx="160" cy="160" r="118" opacity="0.3" stroke-dasharray="2 7" />
          <circle cx="160" cy="160" r="82" opacity="0.45" />
          <circle cx="160" cy="160" r="46" opacity="0.6" stroke-dasharray="2 5" />
          <circle cx="160" cy="160" r="13" opacity="0.9" />
          <path d="M160 6v52M160 262v52M6 160h52M262 160h52" opacity="0.5" />
          <path d="M160 160 264 66" opacity="0.55" />
          <path d="M160 160 96 250" opacity="0.3" />
        </g>
        <g fill="currentColor">
          <circle cx="264" cy="66" r="3.5" opacity="0.9" />
          <circle cx="96" cy="250" r="2.5" opacity="0.6" />
          <circle cx="222" cy="228" r="2" opacity="0.45" />
        </g>
      </svg>
    </div>

    <div class="sn-hero__foot">
      <div class="sn-actions">
        <span class="sn-btn sn-btn--soon sn-btn--lg">Coming soon<span class="visually-hidden"> to the Chrome Web Store</span></span>
        <a class="sn-btn sn-btn--quiet" href="#scanner">Scan a wallet address</a>
      </div>

      <p class="sn-hero__note"><strong>v0.1, on mainnet.</strong> <a href="#cautions">Read the cautions</a> before you dive in.</p>
    </div>
  </section>

  <SignalDeck />
  <SignalSteps />
  <SignalScan />
  <SignalKeeps />
  <SignalCautions />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SignalCautions from '../components/home/SignalCautions.vue';
import SignalDeck from '../components/home/SignalDeck.vue';
import SignalKeeps from '../components/home/SignalKeeps.vue';
import SignalScan from '../components/home/SignalScan.vue';
import SignalSteps from '../components/home/SignalSteps.vue';

const water = ref<HTMLElement | null>(null);

onMounted(() => {
  // The reveal effect's final state: the line is drawn once by a copy of itself,
  // generated from the text already on the page. The original stays in place, inset.
  const el = water.value;
  if (!el) return;
  const overlay = document.createElement('span');
  overlay.className = 'sn-scramble';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.textContent = el.textContent ?? '';
  el.setAttribute('data-set', '');
  el.append(overlay);
});
</script>
