<template>
  <section class="cb-chapter" id="private" aria-labelledby="private-title">
    <header class="cb-chapter__head">
      <h2 class="cb-chapter__title" id="private-title">What keeps it private.</h2>
      <p class="cb-chapter__lede">Six ideas do the work. Each sets what anyone can see beside what only you can.</p>
    </header>

    <figure class="cb-ideas__figure">
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
    </figure>

    <ul class="cb-ideas">
      <li class="cb-idea">
        <h3 class="cb-idea__title">Sealed notes</h3>
        <p class="cb-idea__text">Your shielded balance is a handful of notes. The chain is given a fingerprint of each note, never the note.</p>
        <p class="cb-panel__body">
          <RouterLink class="cb-link" to="/docs#notes">In the docs: notes and commitments</RouterLink>
        </p>
        <p class="cb-observe"><span class="cb-observe__tag">An observer sees</span> one fingerprint for each note. It says nothing about the amount or the owner.</p>
        <p class="cb-idea__kept"><span class="cb-observe__tag">Only you see</span> <span class="cb-sealed">what each note holds, and that it is yours.</span></p>
      </li>

      <li class="cb-idea">
        <h3 class="cb-idea__title">A proof in place of the details</h3>
        <p class="cb-idea__text">Your device proves the notes you spend exist, are yours and add up. Solana checks the proof and learns nothing more.</p>
        <p class="cb-panel__body">
          <RouterLink class="cb-link" to="/docs#proof">In the docs: the proof</RouterLink>
        </p>
        <p class="cb-observe"><span class="cb-observe__tag">An observer sees</span> a proof, <span class="cb-num">256</span> bytes long, and that the program accepted it.</p>
        <p class="cb-idea__kept"><span class="cb-observe__tag">Only you see</span> <span class="cb-sealed">which notes you spent, who you paid and how much.</span></p>
      </li>

      <li class="cb-idea">
        <h3 class="cb-idea__title">A tag for every spent note</h3>
        <p class="cb-idea__text">Spending a note publishes a tag, and a tag is refused the second time, so no note is spent twice.</p>
        <p class="cb-panel__body">
          <RouterLink class="cb-link" to="/docs#nullifiers">In the docs: nullifiers</RouterLink>
        </p>
        <p class="cb-observe"><span class="cb-observe__tag">An observer sees</span> two tags with every payment.</p>
        <p class="cb-idea__kept"><span class="cb-observe__tag">Only you see</span> <span class="cb-sealed">which of your notes each tag cancels.</span></p>
      </li>

      <li class="cb-idea">
        <h3 class="cb-idea__title">Sealed for the recipient</h3>
        <p class="cb-idea__text">A new note travels with the payment, encrypted so that only the person it is for can open it.</p>
        <p class="cb-panel__body">
          <RouterLink class="cb-link" to="/docs#encryption">In the docs: encrypted notes</RouterLink>
        </p>
        <p class="cb-observe"><span class="cb-observe__tag">An observer sees</span> <span class="cb-num">87</span> bytes they cannot read, beside each new fingerprint.</p>
        <p class="cb-idea__kept"><span class="cb-observe__tag">Only the recipient sees</span> <span class="cb-sealed">the amount they were sent.</span></p>
      </li>

      <li class="cb-idea">
        <h3 class="cb-idea__title">Carried by a relayer</h3>
        <p class="cb-idea__text">A relayer puts the payment on Solana and pays the network fee, so your public wallet is not on it. It does see your IP address and when you sent.</p>
        <p class="cb-panel__body">
          <RouterLink class="cb-link" to="/docs#relayer">In the docs: the relayer</RouterLink>
        </p>
        <p class="cb-observe"><span class="cb-observe__tag">An observer sees</span> the relayer’s address and its fee.</p>
        <p class="cb-idea__kept"><span class="cb-observe__tag">Only you see</span> <span class="cb-sealed">which wallet is behind the payment.</span></p>
      </li>

      <li class="cb-idea">
        <h3 class="cb-idea__title">Keys from the wallet you have</h3>
        <p class="cb-idea__text">Your wallet signs one message, and your shielded keys are made from it. Sign that message nowhere but in Enclaven.</p>
        <p class="cb-panel__body">
          <RouterLink class="cb-link" to="/docs#keys">In the docs: keys</RouterLink>
        </p>
        <p class="cb-observe"><span class="cb-observe__tag">An observer sees</span> nothing. Signing a message is not a transaction.</p>
        <p class="cb-idea__kept"><span class="cb-observe__tag">Only you see</span> <span class="cb-sealed">the keys, and with them your shielded balance.</span></p>
      </li>
    </ul>

    <p class="cb-actions">
      <RouterLink class="cb-btn cb-btn--outline" to="/docs">Read the technical docs</RouterLink>
    </p>
  </section>
</template>

<script setup lang="ts">
// Static markup from the reference page; no component state.
</script>
