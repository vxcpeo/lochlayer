<template>

<section class="band water" data-depth="180" id="cautions" aria-labelledby="cautions-title">

<div class="contour" aria-hidden="true">
<span>180 m</span>
</div>

<div class="wrap">

<div class="section-head chapter">

<h2 class="t-display-2 chapter__title" id="cautions-title">Read the cautions before you dive.</h2>

<p class="t-lede">A chart prints its warnings in magenta, where the navigator cannot miss them. These are ours, followed by what we have committed to.</p>
</div>

<div class="notes">

<section class="deflist deflist--caution" aria-labelledby="caution-list-title">

<h3 class="deflist__title" id="caution-list-title">Cautions</h3>

<dl>

<div class="deflist__row">

<dt>On mainnet, with real SOL</dt>

<dd>Loch v0.1 runs on Solana mainnet. What you dive in with is real SOL. One deposit can be at most 10 SOL.</dd>
</div>

<div class="deflist__row">

<dt>Unaudited</dt>

<dd>Neither the circuit nor the program has had an external audit. A flaw in either could lose everything in the pool.</dd>
</div>

<div class="deflist__row">

<dt>A one-person setup</dt>

<dd>The proving key comes from a development setup with a single contributor. Whoever ran it could forge proofs and drain the pool. A public ceremony with many contributors has not replaced it yet.</dd>
</div>

<div class="deflist__row">

<dt>Deposits are screened</dt>

<dd>A screening authority must co-sign every deposit and can refuse one. It sees the address you deposit from. If you want a pool with nobody at the door, this is not it.</dd>
</div>

<div class="deflist__row">

<dt>One signature holds your keys</dt>

<dd>Your shielded keys come from your wallet’s signature on one message, “Loch key derivation v1”. Anyone who gets you to sign that message gets the same keys, and with them your shielded balance. Sign it nowhere but in Loch.</dd>
</div>

<div class="deflist__row">

<dt>A small crowd</dt>

<dd>A pool hides you only among the other people using it, and today that is a small crowd. If you surface the exact amount you dived in with, soon afterwards, anyone can pair the two and most of the benefit is gone. Leave time between them, and surface a different amount.</dd>
</div>

<div class="deflist__row">

<dt>Diving in and surfacing are public</dt>

<dd>Every deposit and every withdrawal is an ordinary public transaction: the address, the amount and the time. Only what happens between them is shielded.</dd>
</div>
</dl>
</section>

<section class="deflist" aria-labelledby="kept-list-title">

<h3 class="deflist__title" id="kept-list-title">Commitments</h3>

<dl>

<div class="deflist__row">

<dt>Withdrawals can never be paused</dt>

<dd>The program’s pause switch stops new deposits and nothing else. It has no instruction that stops you surfacing. The program itself can still be upgraded by its admin key.</dd>
</div>

<div class="deflist__row">

<dt>Open source</dt>
<dd>The extension is open source, under the GNU General Public License, at <a href="https://github.com/lochlayer/loch-extension">github.com/lochlayer/loch-extension</a>: you can read it, build it yourself and change it. The circuit, the program, the services and this site are not published yet. Until you can read them, you are taking them on trust.</dd>
</div>

<div class="deflist__row">

<dt>No analytics</dt>

<dd>This site sets no cookies and loads nothing from anyone else’s server: no trackers, no scripts, no fonts. The only request that leaves it is the one you start: a scan. The extension sends no telemetry.</dd>
</div>

<div class="deflist__row">

<dt>The $LOCH token</dt>

<dd>This is our token’s contract address: <code class="code-address" id="token-address">CYGidBuS8WwUXfZCmb98LnLGL9Mx8SvhdqA6t3xTLoch</code>. A token at any other address is not ours.</dd>
</div>

<div class="deflist__row">

<dt>Product before token</dt>

<dd>The work in front of us is a wallet that keeps a balance private, then two audits. That comes first.</dd>
</div>
</dl>
</section>
</div>
</div>
</section>
</template>

<script setup lang="ts">
// Static markup from the reference page; no component state.
</script>
