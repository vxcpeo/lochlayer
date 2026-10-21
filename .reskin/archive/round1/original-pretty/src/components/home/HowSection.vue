<template>

<section class="band water how" data-depth="60" id="how" aria-labelledby="how-title">

<div class="contour" aria-hidden="true">
<span>60 m</span>
</div>

<div class="wrap">

<div class="section-head chapter">

<h2 class="t-display-2 chapter__title" id="how-title">Dive in, send privately, surface.</h2>

<p class="t-lede">Three steps, inside the wallet you already have. Its keys come from one message that wallet signs, so there is no new seed phrase.</p>
</div>
</div>

<div class="story">

<div class="story__pin">

<div class="journey" aria-hidden="true">
<img src="/media/journey.webp" width="2400" height="909" alt="" loading="lazy" decoding="async">
</div>

<div class="wrap story__beats">

<ol class="steps">

<li class="step step--dive">

<div class="step__plate" aria-hidden="true">
<img src="/media/journey-dive.webp" width="1000" height="1330" alt="" loading="lazy" decoding="async">
</div>

<h3 class="step__title t-display-3">
<span class="step__n">1</span>Dive in</h3>

<p>Move SOL from your public wallet into the Loch. A screening authority checks where it came from and co-signs the deposit.</p>

<p class="observer">
<span class="observer__label">An observer sees</span> your address, the amount, the time, and that it went into the Loch.</p>

<dl class="record">

<div>

<dt>From</dt>

<dd class="fig">Fh3q…Tz8K</dd>
</div>

<div>

<dt>To</dt>

<dd>The Loch</dd>
</div>

<div>

<dt>Amount</dt>

<dd>
<span class="fig">5.000</span>
<span class="fig-unit">SOL</span>
</dd>
</div>

<div>

<dt>Time</dt>

<dd>
<span class="fig">14:02</span> UTC</dd>
</div>
</dl>
</li>

<li class="step step--move">

<div class="step__plate" aria-hidden="true">
<img src="/media/journey-send.webp" width="1000" height="1000" alt="" loading="lazy" decoding="async">
</div>

<h3 class="step__title t-display-3">
<span class="step__n">2</span>Send privately</h3>

<p>Pay any other Loch balance. A zero-knowledge proof shows the payment is valid without showing who paid whom, or how much.</p>

<p class="observer">
<span class="observer__label">An observer sees</span> a proof, two nullifiers, two new commitments and the relayer’s fee. No sender, no recipient, no amount.</p>

<dl class="record">

<div>

<dt>From</dt>

<dd>
<span class="sealed sealed--l">
</span>
<span class="visually-hidden">Not on the chain</span>
</dd>
</div>

<div>

<dt>To</dt>

<dd>
<span class="sealed sealed--l">
</span>
<span class="visually-hidden">Not on the chain</span>
</dd>
</div>

<div>

<dt>Amount</dt>

<dd>
<span class="sealed sealed--m">
</span>
<span class="visually-hidden">Not on the chain</span>
</dd>
</div>

<div>

<dt>Relayer’s fee</dt>

<dd>
<span class="fig">0.0025</span>
<span class="fig-unit">SOL</span>
</dd>
</div>
</dl>
</li>

<li class="step step--surface">

<div class="step__plate" aria-hidden="true">
<img src="/media/journey-surface.webp" width="1100" height="1211" alt="" loading="lazy" decoding="async">
</div>

<h3 class="step__title t-display-3">
<span class="step__n">3</span>Surface</h3>

<p>Withdraw to any Solana address, yours or someone else’s. Nothing ties it to a particular deposit.</p>

<p class="observer">
<span class="observer__label">An observer sees</span> an address receive an amount from the Loch, and when. Not which deposit it came from.</p>

<dl class="record">

<div>

<dt>From</dt>

<dd>The Loch</dd>
</div>

<div>

<dt>To</dt>

<dd class="fig">9fRk…2mVd</dd>
</div>

<div>

<dt>Amount</dt>

<dd>
<span class="fig">2.000</span>
<span class="fig-unit">SOL</span>
</dd>
</div>

<div>

<dt>Which deposit</dt>

<dd>
<span class="sealed sealed--l">
</span>
<span class="visually-hidden">Not on the chain</span>
</dd>
</div>
</dl>
</li>
</ol>

<div class="story__ticks" aria-hidden="true">
<span>
</span>
<span>
</span>
<span>
</span>
</div>
</div>
</div>
</div>

<div class="wrap">

<p class="record-key">Each record is an example of what the chain keeps at that step. <span class="sealed sealed--s" aria-hidden="true">
</span> A bar stands for something the chain is never given.</p>
</div>
</section>
</template>

<script setup lang="ts">
// Static markup from the reference page; no component state.
</script>
