<template>
  <section class="ab-band" id="private" aria-labelledby="private-title">
    <div class="ab-band__head">
      <h2 class="ab-band__title" id="private-title">What keeps it private.</h2>
      <p class="ab-band__lede">Six ideas do the work. Each sets what anyone can see beside what only you can.</p>
    </div>

    <div class="ab-band__body">
      <figure class="ab-keeps__figure">
        <div class="ab-device" data-density="compact" inert aria-hidden="true">
          <div class="ab-device__top">
            <span class="ab-device__brand">
              <img src="/media/mark-small.svg" width="24" height="24" alt="">
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

          <hr>

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

      <ul class="ab-ideas">
        <li class="ab-idea">
          <div class="ab-idea__what">
            <h3>Sealed notes</h3>
            <p>Your shielded balance is a handful of notes. The chain is given a fingerprint of each note, never the note.</p>
            <p class="ab-idea__more">
              <RouterLink class="ab-link" to="/docs#notes">In the docs: notes and commitments</RouterLink>
            </p>
          </div>
          <div class="ab-idea__pair">
            <p class="ab-observe"><span class="ab-observe__tag">An observer sees</span> one fingerprint for each note. It says nothing about the amount or the owner.</p>
            <p class="ab-kept"><span class="ab-kept__tag">Only you see</span> <span class="ab-shielded">what each note holds, and that it is yours.</span></p>
          </div>
        </li>

        <li class="ab-idea">
          <div class="ab-idea__what">
            <h3>A proof in place of the details</h3>
            <p>Your device proves the notes you spend exist, are yours and add up. Solana checks the proof and learns nothing more.</p>
            <p class="ab-idea__more">
              <RouterLink class="ab-link" to="/docs#proof">In the docs: the proof</RouterLink>
            </p>
          </div>
          <div class="ab-idea__pair">
            <p class="ab-observe"><span class="ab-observe__tag">An observer sees</span> a proof, <span class="ab-num">256</span> bytes long, and that the program accepted it.</p>
            <p class="ab-kept"><span class="ab-kept__tag">Only you see</span> <span class="ab-shielded">which notes you spent, who you paid and how much.</span></p>
          </div>
        </li>

        <li class="ab-idea">
          <div class="ab-idea__what">
            <h3>A tag for every spent note</h3>
            <p>Spending a note publishes a tag, and a tag is refused the second time, so no note is spent twice.</p>
            <p class="ab-idea__more">
              <RouterLink class="ab-link" to="/docs#nullifiers">In the docs: nullifiers</RouterLink>
            </p>
          </div>
          <div class="ab-idea__pair">
            <p class="ab-observe"><span class="ab-observe__tag">An observer sees</span> two tags with every payment.</p>
            <p class="ab-kept"><span class="ab-kept__tag">Only you see</span> <span class="ab-shielded">which of your notes each tag cancels.</span></p>
          </div>
        </li>

        <li class="ab-idea">
          <div class="ab-idea__what">
            <h3>Sealed for the recipient</h3>
            <p>A new note travels with the payment, encrypted so that only the person it is for can open it.</p>
            <p class="ab-idea__more">
              <RouterLink class="ab-link" to="/docs#encryption">In the docs: encrypted notes</RouterLink>
            </p>
          </div>
          <div class="ab-idea__pair">
            <p class="ab-observe"><span class="ab-observe__tag">An observer sees</span> <span class="ab-num">87</span> bytes they cannot read, beside each new fingerprint.</p>
            <p class="ab-kept"><span class="ab-kept__tag">Only the recipient sees</span> <span class="ab-shielded">the amount they were sent.</span></p>
          </div>
        </li>

        <li class="ab-idea">
          <div class="ab-idea__what">
            <h3>Carried by a relayer</h3>
            <p>A relayer puts the payment on Solana and pays the network fee, so your public wallet is not on it. It does see your IP address and when you sent.</p>
            <p class="ab-idea__more">
              <RouterLink class="ab-link" to="/docs#relayer">In the docs: the relayer</RouterLink>
            </p>
          </div>
          <div class="ab-idea__pair">
            <p class="ab-observe"><span class="ab-observe__tag">An observer sees</span> the relayer’s address and its fee.</p>
            <p class="ab-kept"><span class="ab-kept__tag">Only you see</span> <span class="ab-shielded">which wallet is behind the payment.</span></p>
          </div>
        </li>

        <li class="ab-idea">
          <div class="ab-idea__what">
            <h3>Keys from the wallet you have</h3>
            <p>Your wallet signs one message, and your shielded keys are made from it. Sign that message nowhere but in Miston.</p>
            <p class="ab-idea__more">
              <RouterLink class="ab-link" to="/docs#keys">In the docs: keys</RouterLink>
            </p>
          </div>
          <div class="ab-idea__pair">
            <p class="ab-observe"><span class="ab-observe__tag">An observer sees</span> nothing. Signing a message is not a transaction.</p>
            <p class="ab-kept"><span class="ab-kept__tag">Only you see</span> <span class="ab-shielded">the keys, and with them your shielded balance.</span></p>
          </div>
        </li>
      </ul>

      <div class="ab-keeps__more">
        <p>
          <RouterLink class="ab-btn ab-btn--line" to="/docs">Read the technical docs</RouterLink>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Static markup from the reference page; no component state.
</script>
