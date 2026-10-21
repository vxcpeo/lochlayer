<template>

<section class="hero hero--deep hero--surface water" data-depth="60" data-theme="night" aria-labelledby="hero-title">

<div class="hero__surface">

<div ref="deep" class="hero__deep" aria-hidden="true">

<div class="hero__stars">
</div>

<div class="hero__above">
</div>
        <img class="hero__under" src="/media/nessie-under.webp" width="1700" height="900" alt="" decoding="async" fetchpriority="high" />
      </div>
    </div>

<div class="wrap hero__grid">

<h1 class="mirror" id="hero-title">
        <span class="mirror__land">
<span class="rise" data-i="0">Your </span>
<span class="rise" data-i="1">wallet </span>
<span class="rise" data-i="2">is </span>
<span class="rise" data-i="3">public.</span>
</span>
        <span ref="water" class="mirror__water">The Loch is not.</span>
      </h1>

<div class="hero__body">

<p class="t-lede">A shielded balance inside Phantom, Solflare or Backpack. Pay from it, and your history stays behind.</p>

<div class="hero__actions">
          <a class="btn btn--primary btn--lg" href="https://chromewebstore.google.com/detail/loch/cholegglblkeacfdjnnogaohmkogmckf">Add to Chrome</a>
          <a class="hero__alt" href="#scanner">Scan a wallet address</a>
        </div>

<p class="t-small t-caution">
<strong>v0.1, on mainnet.</strong> <a href="#cautions">Read the cautions</a> before you dive in.</p>
      </div>
    </div>

<figure class="hero__popup">

<div class="popup" data-density="compact" inert aria-hidden="true">

<div class="popup__land land">

<div class="popup__head">
            <span class="brand brand--sm">
              <img src="/media/mark-small.svg" width="24" height="24" alt="" />
              <span class="brand__name">Loch</span>
            </span>
            <button class="address-chip" type="button">
              <span class="address-chip__name">Phantom</span>
              <span class="address-chip__text fig">Fh3q…Tz8K</span>
              <svg class="icon icon--sm" focusable="false">
<use href="#i-chevron">
</use>
</svg>
            </button>
          </div>

<div class="popup__public">

<div class="balance balance--public">

<p class="balance__label">Public balance</p>

<p class="balance__figure">
<span class="figure is-public">41.207</span>
<span class="fig-unit">SOL</span>
</p>
            </div>
            <a class="score score--inline" href="#scan-report">
              <span class="score__label">Privacy score</span>
              <span class="score__figure">
                <span class="figure is-public">49</span>
                <span class="score__of">of 100</span>
                <span class="score__link">Leak report</span>
              </span>
            </a>
          </div>
        </div>
        <hr class="waterline" />

<div class="popup__water water" data-depth="60">

<div class="balance balance--shielded">

<p class="balance__label">Shielded balance</p>

<p class="balance__figure">
              <span class="sounding">
<span>12</span>
<span class="sounding__frac">.480</span>
</span>
              <span class="fig-unit">SOL</span>
            </p>

<p class="balance__note">In the Loch. Visible only to you.</p>
          </div>

<div class="popup__actions">
            <button class="btn btn--secondary btn--stacked" type="button">
<svg class="icon" focusable="false">
<use href="#i-dive">
</use>
</svg> Dive in</button>
            <button class="btn btn--primary btn--stacked" type="button">
<svg class="icon" focusable="false">
<use href="#i-send">
</use>
</svg> Send privately</button>
            <button class="btn btn--secondary btn--stacked" type="button">
<svg class="icon" focusable="false">
<use href="#i-surface">
</use>
</svg> Surface</button>
          </div>
        </div>

<div class="popup__deep water" data-depth="120">

<div class="popup__deep-head">

<h2>Recent activity</h2>
            <a href="#scan-report">All activity</a>
          </div>

<ul class="activity">

<li class="activity__row is-public">
              <svg class="icon" focusable="false">
<use href="#i-dive">
</use>
</svg>
              <span class="activity__main">
<span class="activity__title">Dived in</span>
<span class="activity__meta">From Fh3q…Tz8K, today 14:02</span>
</span>
              <span class="activity__amount fig">
<span class="fig-sign">+</span>5.000</span>
            </li>

<li class="activity__row is-shielded">
              <svg class="icon" focusable="false">
<use href="#i-send">
</use>
</svg>
              <span class="activity__main">
<span class="activity__title">Sent privately</span>
<span class="activity__meta">Yesterday 19:40</span>
</span>
              <span class="activity__amount fig">
<span class="fig-sign">−</span>1.250</span>
            </li>

<li class="activity__row is-shielded">
              <svg class="icon" focusable="false">
<use href="#i-receive">
</use>
</svg>
              <span class="activity__main">
<span class="activity__title">Received privately</span>
<span class="activity__meta">28 Sep</span>
</span>
              <span class="activity__amount fig">
<span class="fig-sign">+</span>0.730</span>
            </li>

<li class="activity__row is-public">
              <svg class="icon" focusable="false">
<use href="#i-surface">
</use>
</svg>
              <span class="activity__main">
<span class="activity__title">Surfaced</span>
<span class="activity__meta">To 9fRk…2mVd, 26 Sep</span>
</span>
              <span class="activity__amount fig">
<span class="fig-sign">−</span>2.000</span>
            </li>
          </ul>

<p class="popup__foot legend">
<span>Upright is public on-chain.</span> <span class="is-shielded">Italic is shielded.</span>
</p>
        </div>
      </div>

<figcaption>The extension’s popup, drawn here with example figures. The extension is an early alpha. It is on the Chrome Web Store.</figcaption>
    </figure>
    <a class="cue" href="#how">
<span aria-hidden="true">
</span> Scroll</a>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { startCipher } from '../../lib/cipher';

const water = ref<HTMLElement | null>(null);
const deep = ref<HTMLElement | null>(null);

onMounted(() => {
  // The reference site draws the underwater scene with WebGL and falls back to
  // the still drawings when it cannot. Without a GPU context here, the stills
  // are the scene: mark them, so the late fade does not hide them.
  deep.value?.setAttribute('data-still', '');
  if (water.value) startCipher(water.value);
});
</script>
