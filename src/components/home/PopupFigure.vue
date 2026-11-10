<template>
  <figure class="cb-popup">
    <div class="cb-popup__plate" aria-hidden="true">
      <img src="/media/enclaven-plate.svg" width="1700" height="900" alt="" decoding="async" />
    </div>

    <div class="cb-device" data-density="compact" inert aria-hidden="true">
      <div class="cb-device__top">
        <span class="cb-device__brand">
          <img src="/media/mark-small.svg" width="24" height="24" alt="" />
          <span>Enclaven</span>
        </span>
        <button class="cb-device__chip" type="button">
          <span>Phantom</span>
          <span class="cb-num">Fh3q…Tz8K</span>
          <svg class="cb-glyph cb-glyph--sm" focusable="false"><use href="#i-chevron"></use></svg>
        </button>
      </div>

      <div class="cb-device__pane cb-device__pane--open">
        <div>
          <p class="cb-device__label">Public balance</p>
          <p class="cb-device__amount">
            <span class="cb-figure cb-exposed">41.207</span>
            <span class="cb-unit">SOL</span>
          </p>
        </div>
        <a class="cb-device__score" href="#scan-report">
          <span class="cb-device__label">Privacy score</span>
          <span class="cb-device__score-value">
            <span class="cb-figure cb-exposed">49</span>
            <span class="cb-device__score-of">of 100</span>
            <span class="cb-device__score-link">Leak report</span>
          </span>
        </a>
      </div>

      <hr />

      <div class="cb-device__over">
        <div>
          <p class="cb-device__label">Shielded balance</p>
          <p class="cb-device__amount">
            <span class="cb-device__bath"><span>12</span><small>.480</small></span>
            <span class="cb-unit">SOL</span>
          </p>
          <p class="cb-device__note">In the Enclaven. Visible only to you.</p>
        </div>

        <div class="cb-device__actions">
          <button class="cb-btn cb-btn--outline cb-btn--sm" type="button"><svg class="cb-glyph" focusable="false"><use href="#i-dive"></use></svg>Dive in</button>
          <button class="cb-btn cb-btn--solid cb-btn--sm" type="button"><svg class="cb-glyph" focusable="false"><use href="#i-send"></use></svg>Send privately</button>
          <button class="cb-btn cb-btn--outline cb-btn--sm" type="button"><svg class="cb-glyph" focusable="false"><use href="#i-surface"></use></svg>Surface</button>
        </div>
      </div>

      <div class="cb-device__activity">
        <div class="cb-device__rowhead">
          <h2>Recent activity</h2>
          <a href="#scan-report">All activity</a>
        </div>
        <ul>
          <li class="cb-device__row">
            <svg class="cb-glyph" focusable="false"><use href="#i-dive"></use></svg>
            <span class="cb-device__rowmain">
              <span class="cb-device__rowtitle">Dived in</span>
              <span class="cb-device__rowmeta">From Fh3q…Tz8K, today 14:02</span>
            </span>
            <span class="cb-device__delta cb-num"><span class="cb-sign">+</span>5.000</span>
          </li>
          <li class="cb-device__row">
            <svg class="cb-glyph" focusable="false"><use href="#i-send"></use></svg>
            <span class="cb-device__rowmain">
              <span class="cb-device__rowtitle">Sent privately</span>
              <span class="cb-device__rowmeta">Yesterday 19:40</span>
            </span>
            <span class="cb-device__delta cb-num"><span class="cb-sign">−</span>1.250</span>
          </li>
          <li class="cb-device__row">
            <svg class="cb-glyph" focusable="false"><use href="#i-receive"></use></svg>
            <span class="cb-device__rowmain">
              <span class="cb-device__rowtitle">Received privately</span>
              <span class="cb-device__rowmeta">28 Sep</span>
            </span>
            <span class="cb-device__delta cb-num"><span class="cb-sign">+</span>0.730</span>
          </li>
          <li class="cb-device__row">
            <svg class="cb-glyph" focusable="false"><use href="#i-surface"></use></svg>
            <span class="cb-device__rowmain">
              <span class="cb-device__rowtitle">Surfaced</span>
              <span class="cb-device__rowmeta">To 9fRk…2mVd, 26 Sep</span>
            </span>
            <span class="cb-device__delta cb-num"><span class="cb-sign">−</span>2.000</span>
          </li>
        </ul>
        <p class="cb-device__legend">
          <span>Upright is public on-chain.</span>
          <span class="cb-sealed">Italic is shielded.</span>
        </p>
      </div>
    </div>

    <figcaption class="cb-figcaption">The extension’s popup, drawn here with example figures. The extension is an early alpha. It is coming soon to the Chrome Web Store.</figcaption>

    <a class="cb-scroll-cue" href="#how"><span aria-hidden="true"></span> Scroll</a>
  </figure>
</template>

<script setup lang="ts">
// Static markup from the reference page; no component state.
</script>
