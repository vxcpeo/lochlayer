<template>
  <section class="ab-band" id="cautions" aria-labelledby="cautions-title">
    <div class="ab-band__head">
      <p class="ab-band__gauge"><span class="ab-depth">180 m</span></p>
      <h2 class="ab-band__title" id="cautions-title">Read the cautions before you dive.</h2>
      <p class="ab-band__lede">A chart prints its warnings in magenta, where the navigator cannot miss them. These are ours, followed by what we have committed to.</p>
    </div>

    <div class="ab-band__body ab-notes">
      <section class="ab-sheet ab-sheet--alarm" aria-labelledby="caution-list-title">
        <div class="ab-sheet__head">
          <h3 class="ab-sheet__title" id="caution-list-title">Cautions</h3>
        </div>
        <div class="ab-sheet__body">
          <dl class="ab-ledger ab-ledger--alarm">
            <div class="ab-ledger__row">
              <dt class="ab-ledger__term">On mainnet, with real SOL</dt>
              <dd class="ab-ledger__def">Miston v0.1 runs on Solana mainnet. What you dive in with is real SOL. One deposit can be at most 10 SOL.</dd>
            </div>
            <div class="ab-ledger__row">
              <dt class="ab-ledger__term">Unaudited</dt>
              <dd class="ab-ledger__def">Neither the circuit nor the program has had an external audit. A flaw in either could lose everything in the pool.</dd>
            </div>
            <div class="ab-ledger__row">
              <dt class="ab-ledger__term">A one-person setup</dt>
              <dd class="ab-ledger__def">The proving key comes from a development setup with a single contributor. Whoever ran it could forge proofs and drain the pool. A public ceremony with many contributors has not replaced it yet.</dd>
            </div>
            <div class="ab-ledger__row">
              <dt class="ab-ledger__term">Deposits are screened</dt>
              <dd class="ab-ledger__def">A screening authority must co-sign every deposit and can refuse one. It sees the address you deposit from. If you want a pool with nobody at the door, this is not it.</dd>
            </div>
            <div class="ab-ledger__row">
              <dt class="ab-ledger__term">One signature holds your keys</dt>
              <dd class="ab-ledger__def">Your shielded keys come from your wallet’s signature on one message, “Miston key derivation v1”. Anyone who gets you to sign that message gets the same keys, and with them your shielded balance. Sign it nowhere but in Miston.</dd>
            </div>
            <div class="ab-ledger__row">
              <dt class="ab-ledger__term">A small crowd</dt>
              <dd class="ab-ledger__def">A pool hides you only among the other people using it, and today that is a small crowd. If you surface the exact amount you dived in with, soon afterwards, anyone can pair the two and most of the benefit is gone. Leave time between them, and surface a different amount.</dd>
            </div>
            <div class="ab-ledger__row">
              <dt class="ab-ledger__term">Diving in and surfacing are public</dt>
              <dd class="ab-ledger__def">Every deposit and every withdrawal is an ordinary public transaction: the address, the amount and the time. Only what happens between them is shielded.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section class="ab-sheet" aria-labelledby="kept-list-title">
        <div class="ab-sheet__head">
          <h3 class="ab-sheet__title" id="kept-list-title">Commitments</h3>
        </div>
        <div class="ab-sheet__body">
          <dl class="ab-ledger">
            <div class="ab-ledger__row">
              <dt class="ab-ledger__term">Withdrawals can never be paused</dt>
              <dd class="ab-ledger__def">The program’s pause switch stops new deposits and nothing else. It has no instruction that stops you surfacing. The program itself can still be upgraded by its admin key.</dd>
            </div>
            <div class="ab-ledger__row">
              <dt class="ab-ledger__term">Open source</dt>
              <dd class="ab-ledger__def">The extension is open source, under the GNU General Public License, at <a class="ab-link" href="https://github.com/lochlayer/loch-extension">github.com/lochlayer/loch-extension</a>: you can read it, build it yourself and change it. The circuit, the program, the services and this site are not published yet. Until you can read them, you are taking them on trust.</dd>
            </div>
            <div class="ab-ledger__row">
              <dt class="ab-ledger__term">No analytics</dt>
              <dd class="ab-ledger__def">This site sets no cookies and loads nothing from anyone else’s server: no trackers, no scripts, no fonts. The only request that leaves it is the one you start: a scan. The extension sends no telemetry.</dd>
            </div>
            <div class="ab-ledger__row">
              <dt class="ab-ledger__term">The $MISTON token</dt>
              <dd class="ab-ledger__def">This is our token’s contract address: <code class="ab-token" id="token-address">CYGidBuS8WwUXfZCmb98LnLGL9Mx8SvhdqA6t3xTLoch</code>. A token at any other address is not ours.</dd>
            </div>
            <div class="ab-ledger__row">
              <dt class="ab-ledger__term">Product before token</dt>
              <dd class="ab-ledger__def">The work in front of us is a wallet that keeps a balance private, then two audits. That comes first.</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
// Static markup from the reference page; no component state.
</script>
