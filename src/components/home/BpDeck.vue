<template>
  <section class="ab-plate" aria-labelledby="hero-title">
    <div ref="deep" class="ab-plate__glass" aria-hidden="true">
      <img
        src="/media/miston-plate.svg"
        width="1700"
        height="900"
        alt=""
        decoding="async"
        fetchpriority="high"
      />
    </div>

    <figure class="ab-plate__figure">
      <div class="ab-device" data-density="compact" inert aria-hidden="true">
        <div class="ab-device__top">
          <span class="ab-device__brand">
            <img src="/media/mark-small.svg" width="24" height="24" alt="" />
            <span>Miston</span>
          </span>
          <button class="ab-device__chip" type="button">
            <span>Phantom</span>
            <span class="ab-num">Fh3q…Tz8K</span>
            <svg class="ab-glyph ab-glyph--sm" focusable="false"><use href="#i-chevron"></use></svg>
          </button>
        </div>

        <div class="ab-device__pane ab-device__pane--open">
          <div>
            <p class="ab-device__label">Public balance</p>
            <p class="ab-device__amount">
              <span class="ab-figure ab-exposed">41.207</span>
              <span class="ab-unit">SOL</span>
            </p>
          </div>
          <a class="ab-device__score" href="#scan-report">
            <span class="ab-device__label">Privacy score</span>
            <span class="ab-device__score-value">
              <span class="ab-figure ab-exposed">49</span>
              <span class="ab-device__score-of">of 100</span>
              <span class="ab-device__score-link">Leak report</span>
            </span>
          </a>
        </div>

        <hr />

        <div class="ab-device__over">
          <div>
            <p class="ab-device__label">Shielded balance</p>
            <p class="ab-device__amount">
              <span class="ab-device__bath"><span>12</span><small>.480</small></span>
              <span class="ab-unit">SOL</span>
            </p>
            <p class="ab-device__note">In the Miston. Visible only to you.</p>
          </div>

          <div class="ab-device__actions">
            <button class="ab-btn ab-btn--stack" type="button"><svg class="ab-glyph" focusable="false"><use href="#i-dive"></use></svg>Dive in</button>
            <button class="ab-btn ab-btn--stack ab-btn--hot" type="button"><svg class="ab-glyph" focusable="false"><use href="#i-send"></use></svg>Send privately</button>
            <button class="ab-btn ab-btn--stack" type="button"><svg class="ab-glyph" focusable="false"><use href="#i-surface"></use></svg>Surface</button>
          </div>
        </div>

        <div class="ab-device__activity">
          <div class="ab-device__rowhead">
            <h2>Recent activity</h2>
            <a href="#scan-report">All activity</a>
          </div>
          <ul>
            <li class="ab-device__row">
              <svg class="ab-glyph" focusable="false"><use href="#i-dive"></use></svg>
              <span class="ab-device__rowmain">
                <span class="ab-device__rowtitle">Dived in</span>
                <span class="ab-device__rowmeta">From Fh3q…Tz8K, today 14:02</span>
              </span>
              <span class="ab-device__delta ab-num"><span class="ab-sign">+</span>5.000</span>
            </li>
            <li class="ab-device__row">
              <svg class="ab-glyph" focusable="false"><use href="#i-send"></use></svg>
              <span class="ab-device__rowmain">
                <span class="ab-device__rowtitle">Sent privately</span>
                <span class="ab-device__rowmeta">Yesterday 19:40</span>
              </span>
              <span class="ab-device__delta ab-num"><span class="ab-sign">−</span>1.250</span>
            </li>
            <li class="ab-device__row">
              <svg class="ab-glyph" focusable="false"><use href="#i-receive"></use></svg>
              <span class="ab-device__rowmain">
                <span class="ab-device__rowtitle">Received privately</span>
                <span class="ab-device__rowmeta">28 Sep</span>
              </span>
              <span class="ab-device__delta ab-num"><span class="ab-sign">+</span>0.730</span>
            </li>
            <li class="ab-device__row">
              <svg class="ab-glyph" focusable="false"><use href="#i-surface"></use></svg>
              <span class="ab-device__rowmain">
                <span class="ab-device__rowtitle">Surfaced</span>
                <span class="ab-device__rowmeta">To 9fRk…2mVd, 26 Sep</span>
              </span>
              <span class="ab-device__delta ab-num"><span class="ab-sign">−</span>2.000</span>
            </li>
          </ul>
          <p class="ab-device__legend">
            <span>Upright is public on-chain.</span>
            <span class="ab-shielded">Italic is shielded.</span>
          </p>
        </div>
      </div>

      <figcaption class="ab-caption">The extension’s popup, drawn here with example figures. The extension is an early alpha. It is on the Chrome Web Store.</figcaption>
    </figure>

    <a class="ab-cue" href="#how"><span aria-hidden="true"></span> Scroll</a>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const deep = ref<HTMLElement | null>(null);

onMounted(() => {
  // The reference site draws the underwater scene with WebGL and falls back to
  // the still drawings when it cannot. Without a GPU context here, the stills
  // are the scene: mark them, so the late fade does not hide them.
  deep.value?.setAttribute('data-still', '');
});
</script>
