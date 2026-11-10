<template>
  <section class="cb-chapter" id="how" aria-labelledby="how-title">
    <header class="cb-chapter__head">
      <p class="cb-panel__label"><span class="cb-depth">60 m</span></p>
      <h2 class="cb-chapter__title" id="how-title">Dive in, send privately, surface.</h2>
      <p class="cb-chapter__lede">Three steps, inside the wallet you already have. Its keys come from one message that wallet signs, so there is no new seed phrase.</p>
    </header>

    <div class="cb-steps__strip" aria-hidden="true">
      <img src="/media/enclaven-plate.svg" width="2400" height="909" alt="" loading="lazy" decoding="async">
    </div>

    <ol class="cb-steps">
      <li class="cb-step">
        <div class="cb-step__plate" aria-hidden="true">
          <img src="/media/enclaven-plate.svg" width="1000" height="800" alt="" loading="lazy" decoding="async">
        </div>
        <p class="cb-step__num">1</p>
        <div class="cb-step__copy">
          <h3 class="cb-step__title">Dive in</h3>
          <p class="cb-step__text">Move SOL from your public wallet into the Enclaven. A screening authority checks where it came from and co-signs the deposit.</p>
          <p class="cb-observe"><span class="cb-observe__tag">An observer sees</span> your address, the amount, the time, and that it went into the Enclaven.</p>
        </div>
        <dl class="cb-record">
          <div class="cb-record__cell">
            <dt class="cb-record__key">From</dt>
            <dd class="cb-record__val cb-num">Fh3q…Tz8K</dd>
          </div>
          <div class="cb-record__cell">
            <dt class="cb-record__key">To</dt>
            <dd class="cb-record__val">The Enclaven</dd>
          </div>
          <div class="cb-record__cell">
            <dt class="cb-record__key">Amount</dt>
            <dd class="cb-record__val"><span class="cb-num">5.000</span><span class="cb-unit">SOL</span></dd>
          </div>
          <div class="cb-record__cell">
            <dt class="cb-record__key">Time</dt>
            <dd class="cb-record__val"><span class="cb-num">14:02</span> UTC</dd>
          </div>
        </dl>
      </li>

      <li class="cb-step">
        <div class="cb-step__plate" aria-hidden="true">
          <img src="/media/enclaven-plate.svg" width="1000" height="800" alt="" loading="lazy" decoding="async">
        </div>
        <p class="cb-step__num">2</p>
        <div class="cb-step__copy">
          <h3 class="cb-step__title">Send privately</h3>
          <p class="cb-step__text">Pay any other Enclaven balance. A zero-knowledge proof shows the payment is valid without showing who paid whom, or how much.</p>
          <p class="cb-observe"><span class="cb-observe__tag">An observer sees</span> a proof, two nullifiers, two new commitments and the relayer’s fee. No sender, no recipient, no amount.</p>
        </div>
        <dl class="cb-record">
          <div class="cb-record__cell">
            <dt class="cb-record__key">From</dt>
            <dd class="cb-record__val"><span class="cb-seal cb-seal--l"></span><span class="visually-hidden">Not on the chain</span></dd>
          </div>
          <div class="cb-record__cell">
            <dt class="cb-record__key">To</dt>
            <dd class="cb-record__val"><span class="cb-seal cb-seal--l"></span><span class="visually-hidden">Not on the chain</span></dd>
          </div>
          <div class="cb-record__cell">
            <dt class="cb-record__key">Amount</dt>
            <dd class="cb-record__val"><span class="cb-seal cb-seal--m"></span><span class="visually-hidden">Not on the chain</span></dd>
          </div>
          <div class="cb-record__cell">
            <dt class="cb-record__key">Relayer’s fee</dt>
            <dd class="cb-record__val"><span class="cb-num">0.0025</span><span class="cb-unit">SOL</span></dd>
          </div>
        </dl>
      </li>

      <li class="cb-step">
        <div class="cb-step__plate" aria-hidden="true">
          <img src="/media/enclaven-plate.svg" width="1000" height="800" alt="" loading="lazy" decoding="async">
        </div>
        <p class="cb-step__num">3</p>
        <div class="cb-step__copy">
          <h3 class="cb-step__title">Surface</h3>
          <p class="cb-step__text">Withdraw to any Solana address, yours or someone else’s. Nothing ties it to a particular deposit.</p>
          <p class="cb-observe"><span class="cb-observe__tag">An observer sees</span> an address receive an amount from the Enclaven, and when. Not which deposit it came from.</p>
        </div>
        <dl class="cb-record">
          <div class="cb-record__cell">
            <dt class="cb-record__key">From</dt>
            <dd class="cb-record__val">The Enclaven</dd>
          </div>
          <div class="cb-record__cell">
            <dt class="cb-record__key">To</dt>
            <dd class="cb-record__val cb-num">9fRk…2mVd</dd>
          </div>
          <div class="cb-record__cell">
            <dt class="cb-record__key">Amount</dt>
            <dd class="cb-record__val"><span class="cb-num">2.000</span><span class="cb-unit">SOL</span></dd>
          </div>
          <div class="cb-record__cell">
            <dt class="cb-record__key">Which deposit</dt>
            <dd class="cb-record__val"><span class="cb-seal cb-seal--l"></span><span class="visually-hidden">Not on the chain</span></dd>
          </div>
        </dl>
      </li>
    </ol>

    <p class="cb-keynote">Each record is an example of what the chain keeps at that step. <span class="cb-seal cb-seal--s" aria-hidden="true"></span> A bar stands for something the chain is never given.</p>
  </section>
</template>

<script setup lang="ts">
// Static markup from the reference page; no component state.
</script>
