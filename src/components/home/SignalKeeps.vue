<template>
  <section class="sn-band" id="private" aria-labelledby="private-title">
    <div class="sn-band__head">
      <h2 class="sn-band__title" id="private-title">What keeps it private.</h2>
      <p class="sn-band__lede">Six ideas do the work. Each sets what anyone can see beside what only you can.</p>
    </div>

    <figure class="sn-keeps__figure">
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
    </figure>

    <ul class="sn-keeps">
      <li class="sn-keep">
        <h3 class="sn-keep__title">Sealed notes</h3>
        <p class="sn-keep__text">Your shielded balance is a handful of notes. The chain is given a fingerprint of each note, never the note.</p>
        <p class="sn-tile__body">
          <RouterLink class="sn-link" to="/docs#notes">In the docs: notes and commitments</RouterLink>
        </p>
        <p class="sn-observe"><span class="sn-observe__tag">An observer sees</span> one fingerprint for each note. It says nothing about the amount or the owner.</p>
        <p class="sn-keep__kept"><span class="sn-observe__tag">Only you see</span> <span class="sn-shielded">what each note holds, and that it is yours.</span></p>
      </li>

      <li class="sn-keep">
        <h3 class="sn-keep__title">A proof in place of the details</h3>
        <p class="sn-keep__text">Your device proves the notes you spend exist, are yours and add up. Solana checks the proof and learns nothing more.</p>
        <p class="sn-tile__body">
          <RouterLink class="sn-link" to="/docs#proof">In the docs: the proof</RouterLink>
        </p>
        <p class="sn-observe"><span class="sn-observe__tag">An observer sees</span> a proof, <span class="sn-num">256</span> bytes long, and that the program accepted it.</p>
        <p class="sn-keep__kept"><span class="sn-observe__tag">Only you see</span> <span class="sn-shielded">which notes you spent, who you paid and how much.</span></p>
      </li>

      <li class="sn-keep">
        <h3 class="sn-keep__title">A tag for every spent note</h3>
        <p class="sn-keep__text">Spending a note publishes a tag, and a tag is refused the second time, so no note is spent twice.</p>
        <p class="sn-tile__body">
          <RouterLink class="sn-link" to="/docs#nullifiers">In the docs: nullifiers</RouterLink>
        </p>
        <p class="sn-observe"><span class="sn-observe__tag">An observer sees</span> two tags with every payment.</p>
        <p class="sn-keep__kept"><span class="sn-observe__tag">Only you see</span> <span class="sn-shielded">which of your notes each tag cancels.</span></p>
      </li>

      <li class="sn-keep">
        <h3 class="sn-keep__title">Sealed for the recipient</h3>
        <p class="sn-keep__text">A new note travels with the payment, encrypted so that only the person it is for can open it.</p>
        <p class="sn-tile__body">
          <RouterLink class="sn-link" to="/docs#encryption">In the docs: encrypted notes</RouterLink>
        </p>
        <p class="sn-observe"><span class="sn-observe__tag">An observer sees</span> <span class="sn-num">87</span> bytes they cannot read, beside each new fingerprint.</p>
        <p class="sn-keep__kept"><span class="sn-observe__tag">Only the recipient sees</span> <span class="sn-shielded">the amount they were sent.</span></p>
      </li>

      <li class="sn-keep">
        <h3 class="sn-keep__title">Carried by a relayer</h3>
        <p class="sn-keep__text">A relayer puts the payment on Solana and pays the network fee, so your public wallet is not on it. It does see your IP address and when you sent.</p>
        <p class="sn-tile__body">
          <RouterLink class="sn-link" to="/docs#relayer">In the docs: the relayer</RouterLink>
        </p>
        <p class="sn-observe"><span class="sn-observe__tag">An observer sees</span> the relayer’s address and its fee.</p>
        <p class="sn-keep__kept"><span class="sn-observe__tag">Only you see</span> <span class="sn-shielded">which wallet is behind the payment.</span></p>
      </li>

      <li class="sn-keep">
        <h3 class="sn-keep__title">Keys from the wallet you have</h3>
        <p class="sn-keep__text">Your wallet signs one message, and your shielded keys are made from it. Sign that message nowhere but in Velaira.</p>
        <p class="sn-tile__body">
          <RouterLink class="sn-link" to="/docs#keys">In the docs: keys</RouterLink>
        </p>
        <p class="sn-observe"><span class="sn-observe__tag">An observer sees</span> nothing. Signing a message is not a transaction.</p>
        <p class="sn-keep__kept"><span class="sn-observe__tag">Only you see</span> <span class="sn-shielded">the keys, and with them your shielded balance.</span></p>
      </li>
    </ul>

    <p class="sn-actions">
      <RouterLink class="sn-btn sn-btn--line" to="/docs">Read the technical docs</RouterLink>
    </p>
  </section>
</template>

<script setup lang="ts">
// Static markup from the reference page; no component state.
</script>
