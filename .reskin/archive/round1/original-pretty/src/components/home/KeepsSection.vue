<template>

<section class="band water keeps" data-depth="120" id="private" aria-labelledby="private-title">

<div class="wrap">

<div class="section-head chapter">

<h2 class="t-display-2 chapter__title" id="private-title">What keeps it private.</h2>

<p class="t-lede">Six ideas do the work. Each sets what anyone can see beside what only you can.</p>
</div>

<div class="keeps__grid">

<figure class="keeps__figure">

<div class="popup" data-density="compact" inert aria-hidden="true">

<div class="popup__land land">

<div class="popup__head">
<span class="brand brand--sm">
<img src="/media/mark-small.svg" width="24" height="24" alt="">
<span class="brand__name">Loch</span>
</span> <button class="address-chip" type="button">
<span class="address-chip__name">Phantom</span>
<span class="address-chip__text fig">Fh3q…Tz8K</span>
<svg class="icon icon--sm" focusable="false">
<use href="#i-chevron">
</use>
</svg>
</button>
</div>

<div class="popup__public">

<div class="balance balance--public">

<p class="balance__label">Public balance</p>

<p class="balance__figure">
<span class="figure is-public">41.207</span>
<span class="fig-unit">SOL</span>
</p>
</div>
<a class="score score--inline" href="#scan-report">
<span class="score__label">Privacy score</span> <span class="score__figure">
<span class="figure is-public">49</span>
<span class="score__of">of 100</span>
<span class="score__link">Leak report</span>
</span>
</a>
</div>
</div>
<hr class="waterline">

<div class="popup__water water" data-depth="60">

<div class="balance balance--shielded">

<p class="balance__label">Shielded balance</p>

<p class="balance__figure">
<span class="sounding">
<span>12</span>
<span class="sounding__frac">.480</span>
</span>
<span class="fig-unit">SOL</span>
</p>

<p class="balance__note">In the Loch. Visible only to you.</p>
</div>

<div class="popup__actions">
<button class="btn btn--secondary btn--stacked" type="button">
<svg class="icon" focusable="false">
<use href="#i-dive">
</use>
</svg>Dive in</button> <button class="btn btn--primary btn--stacked" type="button">
<svg class="icon" focusable="false">
<use href="#i-send">
</use>
</svg>Send privately</button> <button class="btn btn--secondary btn--stacked" type="button">
<svg class="icon" focusable="false">
<use href="#i-surface">
</use>
</svg>Surface</button>
</div>
</div>

<div class="popup__deep water" data-depth="120">

<div class="popup__deep-head">

<h2>Recent activity</h2>
<a href="#scan-report">All activity</a>
</div>

<ul class="activity">

<li class="activity__row is-public">
<svg class="icon" focusable="false">
<use href="#i-dive">
</use>
</svg>
<span class="activity__main">
<span class="activity__title">Dived in</span>
<span class="activity__meta">From Fh3q…Tz8K, today 14:02</span>
</span>
<span class="activity__amount fig">
<span class="fig-sign">+</span>5.000</span>
</li>

<li class="activity__row is-shielded">
<svg class="icon" focusable="false">
<use href="#i-send">
</use>
</svg>
<span class="activity__main">
<span class="activity__title">Sent privately</span>
<span class="activity__meta">Yesterday 19:40</span>
</span>
<span class="activity__amount fig">
<span class="fig-sign">−</span>1.250</span>
</li>

<li class="activity__row is-shielded">
<svg class="icon" focusable="false">
<use href="#i-receive">
</use>
</svg>
<span class="activity__main">
<span class="activity__title">Received privately</span>
<span class="activity__meta">28 Sep</span>
</span>
<span class="activity__amount fig">
<span class="fig-sign">+</span>0.730</span>
</li>

<li class="activity__row is-public">
<svg class="icon" focusable="false">
<use href="#i-surface">
</use>
</svg>
<span class="activity__main">
<span class="activity__title">Surfaced</span>
<span class="activity__meta">To 9fRk…2mVd, 26 Sep</span>
</span>
<span class="activity__amount fig">
<span class="fig-sign">−</span>2.000</span>
</li>
</ul>

<p class="popup__foot legend">
<span>Upright is public on-chain.</span>
<span class="is-shielded">Italic is shielded.</span>
</p>
</div>
</div>

<figcaption>The extension’s popup, drawn here with example figures. The extension is an early alpha. It is on the Chrome Web Store.</figcaption>
</figure>

<ul class="ideas">

<li class="idea">

<div class="idea__what">

<h3 class="t-display-3">Sealed notes</h3>

<p>Your shielded balance is a handful of notes. The chain is given a fingerprint of each note, never the note.</p>

<p class="idea__more">
<router-link class="link link--quiet" to="/docs#notes">In the docs: notes and commitments</router-link>
</p>
</div>

<div class="idea__pair">

<p class="observer">
<span class="observer__label">An observer sees</span> one fingerprint for each note. It says nothing about the amount or the owner.</p>

<p class="kept">
<span class="kept__label">Only you see</span> <span class="is-shielded">what each note holds, and that it is yours.</span>
</p>
</div>
</li>

<li class="idea">

<div class="idea__what">

<h3 class="t-display-3">A proof in place of the details</h3>

<p>Your device proves the notes you spend exist, are yours and add up. Solana checks the proof and learns nothing more.</p>

<p class="idea__more">
<router-link class="link link--quiet" to="/docs#proof">In the docs: the proof</router-link>
</p>
</div>

<div class="idea__pair">

<p class="observer">
<span class="observer__label">An observer sees</span> a proof, <span class="fig">256</span> bytes long, and that the program accepted it.</p>

<p class="kept">
<span class="kept__label">Only you see</span> <span class="is-shielded">which notes you spent, who you paid and how much.</span>
</p>
</div>
</li>

<li class="idea">

<div class="idea__what">

<h3 class="t-display-3">A tag for every spent note</h3>

<p>Spending a note publishes a tag, and a tag is refused the second time, so no note is spent twice.</p>

<p class="idea__more">
<router-link class="link link--quiet" to="/docs#nullifiers">In the docs: nullifiers</router-link>
</p>
</div>

<div class="idea__pair">

<p class="observer">
<span class="observer__label">An observer sees</span> two tags with every payment.</p>

<p class="kept">
<span class="kept__label">Only you see</span> <span class="is-shielded">which of your notes each tag cancels.</span>
</p>
</div>
</li>

<li class="idea">

<div class="idea__what">

<h3 class="t-display-3">Sealed for the recipient</h3>

<p>A new note travels with the payment, encrypted so that only the person it is for can open it.</p>

<p class="idea__more">
<router-link class="link link--quiet" to="/docs#encryption">In the docs: encrypted notes</router-link>
</p>
</div>

<div class="idea__pair">

<p class="observer">
<span class="observer__label">An observer sees</span> <span class="fig">87</span> bytes they cannot read, beside each new fingerprint.</p>

<p class="kept">
<span class="kept__label">Only the recipient sees</span> <span class="is-shielded">the amount they were sent.</span>
</p>
</div>
</li>

<li class="idea">

<div class="idea__what">

<h3 class="t-display-3">Carried by a relayer</h3>

<p>A relayer puts the payment on Solana and pays the network fee, so your public wallet is not on it. It does see your IP address and when you sent.</p>

<p class="idea__more">
<router-link class="link link--quiet" to="/docs#relayer">In the docs: the relayer</router-link>
</p>
</div>

<div class="idea__pair">

<p class="observer">
<span class="observer__label">An observer sees</span> the relayer’s address and its fee.</p>

<p class="kept">
<span class="kept__label">Only you see</span> <span class="is-shielded">which wallet is behind the payment.</span>
</p>
</div>
</li>

<li class="idea">

<div class="idea__what">

<h3 class="t-display-3">Keys from the wallet you have</h3>

<p>Your wallet signs one message, and your shielded keys are made from it. Sign that message nowhere but in Loch.</p>

<p class="idea__more">
<router-link class="link link--quiet" to="/docs#keys">In the docs: keys</router-link>
</p>
</div>

<div class="idea__pair">

<p class="observer">
<span class="observer__label">An observer sees</span> nothing. Signing a message is not a transaction.</p>

<p class="kept">
<span class="kept__label">Only you see</span> <span class="is-shielded">the keys, and with them your shielded balance.</span>
</p>
</div>
</li>
</ul>
</div>

<div class="keeps__more">

<p>
<router-link class="btn btn--secondary" to="/docs">Read the technical docs</router-link>
</p>
</div>
</div>
</section>
</template>

<script setup lang="ts">
// Static markup from the reference page; no component state.
</script>
