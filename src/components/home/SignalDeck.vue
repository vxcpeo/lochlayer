<template>
  <figure class="sn-tile sn-tile--support sn-deck">
    <div class="sn-deck__plate" aria-hidden="true">
      <img src="/media/velaira-plate.svg" width="1700" height="900" alt="" decoding="async" />
    </div>

    <div class="sn-device" data-density="compact" inert aria-hidden="true">
      <div class="sn-device__top">
        <span class="sn-device__brand">
          <img src="/media/mark-small.svg" width="24" height="24" alt="" />
          <span>Velaira</span>
        </span>
        <button class="sn-device__chip" type="button">
          <span>Phantom</span>
          <span class="sn-num">Fh3q…Tz8K</span>
          <svg class="sn-glyph sn-glyph--sm" focusable="false"><use href="#i-chevron"></use></svg>
        </button>
      </div>

      <div class="sn-device__pane sn-device__pane--open">
        <div>
          <p class="sn-device__label">Public balance</p>
          <p class="sn-device__amount">
            <span class="sn-figure sn-exposed">41.207</span>
            <span class="sn-unit">SOL</span>
          </p>
        </div>
        <a class="sn-device__score" href="#scan-report">
          <span class="sn-device__label">Privacy score</span>
          <span class="sn-device__score-value">
            <span class="sn-figure sn-exposed">49</span>
            <span class="sn-device__score-of">of 100</span>
            <span class="sn-device__score-link">Leak report</span>
          </span>
        </a>
      </div>

      <hr />

      <div class="sn-device__over">
        <div>
          <p class="sn-device__label">Shielded balance</p>
          <p class="sn-device__amount">
            <span class="sn-device__bath"><span>12</span><small>.480</small></span>
            <span class="sn-unit">SOL</span>
          </p>
          <p class="sn-device__note">In the Velaira. Visible only to you.</p>
        </div>

        <div class="sn-device__actions">
          <button class="sn-btn sn-btn--line sn-btn--sm" type="button"><svg class="sn-glyph" focusable="false"><use href="#i-dive"></use></svg>Dive in</button>
          <button class="sn-btn sn-btn--fill sn-btn--sm" type="button"><svg class="sn-glyph" focusable="false"><use href="#i-send"></use></svg>Send privately</button>
          <button class="sn-btn sn-btn--line sn-btn--sm" type="button"><svg class="sn-glyph" focusable="false"><use href="#i-surface"></use></svg>Surface</button>
        </div>
      </div>

      <div class="sn-device__activity">
        <div class="sn-device__rowhead">
          <h2>Recent activity</h2>
          <a href="#scan-report">All activity</a>
        </div>
        <ul>
          <li class="sn-device__row">
            <svg class="sn-glyph" focusable="false"><use href="#i-dive"></use></svg>
            <span class="sn-device__rowmain">
              <span class="sn-device__rowtitle">Dived in</span>
              <span class="sn-device__rowmeta">From Fh3q…Tz8K, today 14:02</span>
            </span>
            <span class="sn-device__delta sn-num"><span class="sn-sign">+</span>5.000</span>
          </li>
          <li class="sn-device__row">
            <svg class="sn-glyph" focusable="false"><use href="#i-send"></use></svg>
            <span class="sn-device__rowmain">
              <span class="sn-device__rowtitle">Sent privately</span>
              <span class="sn-device__rowmeta">Yesterday 19:40</span>
            </span>
            <span class="sn-device__delta sn-num"><span class="sn-sign">−</span>1.250</span>
          </li>
          <li class="sn-device__row">
            <svg class="sn-glyph" focusable="false"><use href="#i-receive"></use></svg>
            <span class="sn-device__rowmain">
              <span class="sn-device__rowtitle">Received privately</span>
              <span class="sn-device__rowmeta">28 Sep</span>
            </span>
            <span class="sn-device__delta sn-num"><span class="sn-sign">+</span>0.730</span>
          </li>
          <li class="sn-device__row">
            <svg class="sn-glyph" focusable="false"><use href="#i-surface"></use></svg>
            <span class="sn-device__rowmain">
              <span class="sn-device__rowtitle">Surfaced</span>
              <span class="sn-device__rowmeta">To 9fRk…2mVd, 26 Sep</span>
            </span>
            <span class="sn-device__delta sn-num"><span class="sn-sign">−</span>2.000</span>
          </li>
        </ul>
        <p class="sn-device__legend">
          <span>Upright is public on-chain.</span>
          <span class="sn-shielded">Italic is shielded.</span>
        </p>
      </div>
    </div>

    <figcaption class="sn-plate__caption">The extension’s popup, drawn here with example figures. The extension is an early alpha. It is coming soon to the Chrome Web Store.</figcaption>

    <a class="sn-cue" href="#how"><span aria-hidden="true"></span> Scroll</a>
  </figure>
</template>

<script setup lang="ts">
// Static markup from the reference page; no component state.
</script>
