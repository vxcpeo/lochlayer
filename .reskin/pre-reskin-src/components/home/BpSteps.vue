<template>
  <section class="ab-band" id="how" aria-labelledby="how-title">
    <div class="ab-band__head">
      <p class="ab-band__gauge"><span class="ab-depth">60 m</span></p>
      <h2 class="ab-band__title" id="how-title">Dive in, send privately, surface.</h2>
      <p class="ab-band__lede">Three steps, inside the wallet you already have. Its keys come from one message that wallet signs, so there is no new seed phrase.</p>
    </div>

    <div class="ab-band__body">
      <div class="ab-steps__strip" aria-hidden="true">
        <img src="/media/velaira-plate.svg" width="2400" height="909" alt="" loading="lazy" decoding="async">
      </div>

      <ol class="ab-steps">
        <li class="ab-step ab-step--dive">
          <div class="ab-step__rail">
            <span class="ab-step__n">1</span>
            <span class="ab-step__plate" aria-hidden="true">
              <img src="/media/velaira-plate.svg" width="1000" height="1330" alt="" loading="lazy" decoding="async">
            </span>
          </div>
          <div class="ab-step__body">
            <h3 class="ab-step__title">Dive in</h3>
            <p class="ab-step__text">Move SOL from your public wallet into the Velaira. A screening authority checks where it came from and co-signs the deposit.</p>
            <p class="ab-observe"><span class="ab-observe__tag">An observer sees</span> your address, the amount, the time, and that it went into the Velaira.</p>
            <dl class="ab-record">
              <div class="ab-record__cell">
                <dt class="ab-record__key">From</dt>
                <dd class="ab-record__val ab-num">Fh3q…Tz8K</dd>
              </div>
              <div class="ab-record__cell">
                <dt class="ab-record__key">To</dt>
                <dd class="ab-record__val">The Velaira</dd>
              </div>
              <div class="ab-record__cell">
                <dt class="ab-record__key">Amount</dt>
                <dd class="ab-record__val"><span class="ab-num">5.000</span><span class="ab-unit">SOL</span></dd>
              </div>
              <div class="ab-record__cell">
                <dt class="ab-record__key">Time</dt>
                <dd class="ab-record__val"><span class="ab-num">14:02</span> UTC</dd>
              </div>
            </dl>
          </div>
        </li>

        <li class="ab-step ab-step--move">
          <div class="ab-step__rail">
            <span class="ab-step__n">2</span>
            <span class="ab-step__plate" aria-hidden="true">
              <img src="/media/velaira-plate.svg" width="1000" height="1000" alt="" loading="lazy" decoding="async">
            </span>
          </div>
          <div class="ab-step__body">
            <h3 class="ab-step__title">Send privately</h3>
            <p class="ab-step__text">Pay any other Velaira balance. A zero-knowledge proof shows the payment is valid without showing who paid whom, or how much.</p>
            <p class="ab-observe"><span class="ab-observe__tag">An observer sees</span> a proof, two nullifiers, two new commitments and the relayer’s fee. No sender, no recipient, no amount.</p>
            <dl class="ab-record">
              <div class="ab-record__cell">
                <dt class="ab-record__key">From</dt>
                <dd class="ab-record__val"><span class="ab-seal ab-seal--l"></span><span class="visually-hidden">Not on the chain</span></dd>
              </div>
              <div class="ab-record__cell">
                <dt class="ab-record__key">To</dt>
                <dd class="ab-record__val"><span class="ab-seal ab-seal--l"></span><span class="visually-hidden">Not on the chain</span></dd>
              </div>
              <div class="ab-record__cell">
                <dt class="ab-record__key">Amount</dt>
                <dd class="ab-record__val"><span class="ab-seal ab-seal--m"></span><span class="visually-hidden">Not on the chain</span></dd>
              </div>
              <div class="ab-record__cell">
                <dt class="ab-record__key">Relayer’s fee</dt>
                <dd class="ab-record__val"><span class="ab-num">0.0025</span><span class="ab-unit">SOL</span></dd>
              </div>
            </dl>
          </div>
        </li>

        <li class="ab-step ab-step--surface">
          <div class="ab-step__rail">
            <span class="ab-step__n">3</span>
            <span class="ab-step__plate" aria-hidden="true">
              <img src="/media/velaira-plate.svg" width="1100" height="1211" alt="" loading="lazy" decoding="async">
            </span>
          </div>
          <div class="ab-step__body">
            <h3 class="ab-step__title">Surface</h3>
            <p class="ab-step__text">Withdraw to any Solana address, yours or someone else’s. Nothing ties it to a particular deposit.</p>
            <p class="ab-observe"><span class="ab-observe__tag">An observer sees</span> an address receive an amount from the Velaira, and when. Not which deposit it came from.</p>
            <dl class="ab-record">
              <div class="ab-record__cell">
                <dt class="ab-record__key">From</dt>
                <dd class="ab-record__val">The Velaira</dd>
              </div>
              <div class="ab-record__cell">
                <dt class="ab-record__key">To</dt>
                <dd class="ab-record__val ab-num">9fRk…2mVd</dd>
              </div>
              <div class="ab-record__cell">
                <dt class="ab-record__key">Amount</dt>
                <dd class="ab-record__val"><span class="ab-num">2.000</span><span class="ab-unit">SOL</span></dd>
              </div>
              <div class="ab-record__cell">
                <dt class="ab-record__key">Which deposit</dt>
                <dd class="ab-record__val"><span class="ab-seal ab-seal--l"></span><span class="visually-hidden">Not on the chain</span></dd>
              </div>
            </dl>
          </div>
        </li>
      </ol>

      <p class="ab-keynote">Each record is an example of what the chain keeps at that step. <span class="ab-seal ab-seal--s" aria-hidden="true"></span> A bar stands for something the chain is never given.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
// Static markup from the reference page; no component state.
</script>
