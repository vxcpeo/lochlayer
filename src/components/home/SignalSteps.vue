<template>
  <section class="sn-band" id="how" aria-labelledby="how-title">
    <div class="sn-band__head">
      <p class="sn-tile__label"><span class="sn-depth">60 m</span></p>
      <h2 class="sn-band__title" id="how-title">Dive in, send privately, surface.</h2>
      <p class="sn-band__lede">Three steps, inside the wallet you already have. Its keys come from one message that wallet signs, so there is no new seed phrase.</p>
    </div>

    <div class="sn-steps__strip" aria-hidden="true">
      <img src="/media/velaira-plate.svg" width="2400" height="909" alt="" loading="lazy" decoding="async">
    </div>

    <ol class="sn-steps">
      <li class="sn-step">
        <div class="sn-step__plate" aria-hidden="true">
          <img src="/media/velaira-plate.svg" width="1000" height="800" alt="" loading="lazy" decoding="async">
        </div>
        <p class="sn-step__num">1</p>
        <h3 class="sn-step__title">Dive in</h3>
        <p class="sn-step__text">Move SOL from your public wallet into the Velaira. A screening authority checks where it came from and co-signs the deposit.</p>
        <p class="sn-observe"><span class="sn-observe__tag">An observer sees</span> your address, the amount, the time, and that it went into the Velaira.</p>
        <dl class="sn-record">
          <div class="sn-record__cell">
            <dt class="sn-record__key">From</dt>
            <dd class="sn-record__val sn-num">Fh3q…Tz8K</dd>
          </div>
          <div class="sn-record__cell">
            <dt class="sn-record__key">To</dt>
            <dd class="sn-record__val">The Velaira</dd>
          </div>
          <div class="sn-record__cell">
            <dt class="sn-record__key">Amount</dt>
            <dd class="sn-record__val"><span class="sn-num">5.000</span><span class="sn-unit">SOL</span></dd>
          </div>
          <div class="sn-record__cell">
            <dt class="sn-record__key">Time</dt>
            <dd class="sn-record__val"><span class="sn-num">14:02</span> UTC</dd>
          </div>
        </dl>
      </li>

      <li class="sn-step">
        <div class="sn-step__plate" aria-hidden="true">
          <img src="/media/velaira-plate.svg" width="1000" height="800" alt="" loading="lazy" decoding="async">
        </div>
        <p class="sn-step__num">2</p>
        <h3 class="sn-step__title">Send privately</h3>
        <p class="sn-step__text">Pay any other Velaira balance. A zero-knowledge proof shows the payment is valid without showing who paid whom, or how much.</p>
        <p class="sn-observe"><span class="sn-observe__tag">An observer sees</span> a proof, two nullifiers, two new commitments and the relayer’s fee. No sender, no recipient, no amount.</p>
        <dl class="sn-record">
          <div class="sn-record__cell">
            <dt class="sn-record__key">From</dt>
            <dd class="sn-record__val"><span class="sn-seal sn-seal--l"></span><span class="visually-hidden">Not on the chain</span></dd>
          </div>
          <div class="sn-record__cell">
            <dt class="sn-record__key">To</dt>
            <dd class="sn-record__val"><span class="sn-seal sn-seal--l"></span><span class="visually-hidden">Not on the chain</span></dd>
          </div>
          <div class="sn-record__cell">
            <dt class="sn-record__key">Amount</dt>
            <dd class="sn-record__val"><span class="sn-seal sn-seal--m"></span><span class="visually-hidden">Not on the chain</span></dd>
          </div>
          <div class="sn-record__cell">
            <dt class="sn-record__key">Relayer’s fee</dt>
            <dd class="sn-record__val"><span class="sn-num">0.0025</span><span class="sn-unit">SOL</span></dd>
          </div>
        </dl>
      </li>

      <li class="sn-step">
        <div class="sn-step__plate" aria-hidden="true">
          <img src="/media/velaira-plate.svg" width="1000" height="800" alt="" loading="lazy" decoding="async">
        </div>
        <p class="sn-step__num">3</p>
        <h3 class="sn-step__title">Surface</h3>
        <p class="sn-step__text">Withdraw to any Solana address, yours or someone else’s. Nothing ties it to a particular deposit.</p>
        <p class="sn-observe"><span class="sn-observe__tag">An observer sees</span> an address receive an amount from the Velaira, and when. Not which deposit it came from.</p>
        <dl class="sn-record">
          <div class="sn-record__cell">
            <dt class="sn-record__key">From</dt>
            <dd class="sn-record__val">The Velaira</dd>
          </div>
          <div class="sn-record__cell">
            <dt class="sn-record__key">To</dt>
            <dd class="sn-record__val sn-num">9fRk…2mVd</dd>
          </div>
          <div class="sn-record__cell">
            <dt class="sn-record__key">Amount</dt>
            <dd class="sn-record__val"><span class="sn-num">2.000</span><span class="sn-unit">SOL</span></dd>
          </div>
          <div class="sn-record__cell">
            <dt class="sn-record__key">Which deposit</dt>
            <dd class="sn-record__val"><span class="sn-seal sn-seal--l"></span><span class="visually-hidden">Not on the chain</span></dd>
          </div>
        </dl>
      </li>
    </ol>

    <p class="sn-keynote">Each record is an example of what the chain keeps at that step. <span class="sn-seal sn-seal--s" aria-hidden="true"></span> A bar stands for something the chain is never given.</p>
  </section>
</template>

<script setup lang="ts">
// Static markup from the reference page; no component state.
</script>
