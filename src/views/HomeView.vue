<template>
  <AbyssRail>
    <header class="ab-runhead">
      <h1 id="hero-title" class="ab-mirror">
        <span class="ab-mirror__land"><span class="ab-rise" data-i="0">Your </span><span class="ab-rise" data-i="1">wallet </span><span class="ab-rise" data-i="2">is </span><span class="ab-rise" data-i="3">public.</span></span>
        <span ref="water" class="ab-mirror__water">The Miston is not.</span>
      </h1>

      <AbyssIndex />

      <div class="ab-runhead__say">
        <p class="ab-lead__lede">A shielded balance inside Phantom, Solflare or Backpack. Pay from it, and your history stays behind.</p>

        <div class="ab-actions">
          <a class="ab-btn ab-btn--fill ab-btn--lg" href="https://chromewebstore.google.com/detail/loch/cholegglblkeacfdjnnogaohmkogmckf">Add to Chrome</a>
          <a class="ab-link" href="#scanner">Scan a wallet address</a>
        </div>

        <p class="ab-lead__note"><strong>v0.1, on mainnet.</strong> <a href="#cautions">Read the cautions</a> before you dive in.</p>
      </div>
    </header>

    <BpDeck />
    <BpSteps />
    <BpScan />
    <BpKeeps />
    <BpCautions />
  </AbyssRail>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AbyssIndex from '../components/AbyssIndex.vue';
import AbyssRail from '../components/AbyssRail.vue';
import BpCautions from '../components/home/BpCautions.vue';
import BpDeck from '../components/home/BpDeck.vue';
import BpKeeps from '../components/home/BpKeeps.vue';
import BpScan from '../components/home/BpScan.vue';
import BpSteps from '../components/home/BpSteps.vue';

const water = ref<HTMLElement | null>(null);

onMounted(() => {
  // The reveal effect's final state: the line is drawn once by a copy of itself,
  // generated from the text already on the page. The original stays in place, inset.
  const el = water.value;
  if (!el) return;
  const overlay = document.createElement('span');
  overlay.className = 'ab-scramble';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.textContent = el.textContent ?? '';
  el.setAttribute('data-set', '');
  el.append(overlay);
});
</script>
