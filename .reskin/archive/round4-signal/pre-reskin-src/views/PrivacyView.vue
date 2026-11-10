<template>
  <AbyssRail>
    <section class="ab-policy" aria-labelledby="page-title">
      <header class="ab-runhead">
        <h1 class="ab-runhead__title" id="page-title">What this site keeps.</h1>
        <p class="ab-runhead__lede">Nothing, unless you give it an email address. This page says what that means, line by line, and what the Velaira extension keeps and sends.</p>
        <AbyssIndex />
      </header>

        <dl class="ab-ledger ab-ledger--wide">
          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">What is stored</dt>
            <dd class="ab-ledger__def">
              <p>Nothing about you, with one exception: if you joined the waitlist while it was open, your email address and the day you joined. No time of day, no IP address, no browser details.</p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">In your own browser</dt>
            <dd class="ab-ledger__def">
              <p>What you choose on this site is kept in your browser’s localStorage, on your device, and is never sent anywhere: the palette you picked (dusk or night), and the address of your own RPC endpoint if you saved one. Clearing this site’s data in your browser removes it.</p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">Cookies</dt>
            <dd class="ab-ledger__def">
              <p>None. The site sets no cookies and reads none.</p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">Analytics and third parties</dt>
            <dd class="ab-ledger__def">
              <p>None. Every file a page loads comes from this site: no analytics, no trackers, no scripts, fonts or images from anyone else’s server. Each page carries a security policy that allows nothing else. That much is a rule the browser enforces, not a promise.</p>
              <p>Where a page may connect is a second rule. Because you can point the scanner at an RPC endpoint of your own, the policy sent with the page has to allow a connection to any https address. As a page loads, this site’s own script adds a narrower rule: this site, the one RPC endpoint in use and the waitlist, nothing else. The browser enforces that rule too, it cannot be loosened again until the page is reloaded, and the scanner does not start without it. It is put there by the site’s own script, so it guards against a mistake in this site, not against a copy of the site that someone has changed.</p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">The server</dt>
            <dd class="ab-ledger__def">
              <p>Like any web server, the one that sends you these pages sees your IP address and which page you asked for. The site adds nothing to that: no identifiers, no scripts that report back.</p>
              <p>Behind it, a program of ours puts each page together. It is told which page was asked for and is not told your IP address. It sets no cookie and keeps no record of what it is asked.</p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">The leak scanner</dt>
            <dd class="ab-ledger__def">
              <p>The scan runs in your browser. When you start one, your browser asks a Solana RPC endpoint for the public history of the address you pasted. By default that endpoint is <span class="ab-num">rpc.velaira.xyz</span>, the Velaira RPC proxy, which this project runs.</p>
              <p>The proxy sees the address together with your IP address for as long as it takes to answer, and writes neither down: it keeps no logs. That is a statement about software we run, and you cannot check it from where you are. The proxy passes the question on to an RPC provider. The provider sees which address was looked up, coming from the proxy, and does not see your IP address. It can keep what it sees.</p>
              <p>The web server that sends you these pages is not sent the address, and the page does not put it in its URL or in storage. The request carries no cookies and no referrer.</p>
              <p>To tell nobody but a node you trust, save your own RPC endpoint on the scanner. Once the source code is published, you will be able to run the scanner on your own machine.</p>
            </dd>
          </div>

          <div class="ab-ledger__row" id="extension">
            <dt class="ab-ledger__term">The Velaira extension</dt>
            <dd class="ab-ledger__def">
              <p>The extension keeps what it needs on your device, and we have no copy of it. In the clear: its settings, and your wallet’s public address and name. Encrypted, under a key that only your wallet’s signature opens: your shielded notes, your activity list and your last leak report. The signature itself is held in the browser’s memory and is gone when the browser closes. There is no account. “Forget this wallet on this device”, or removing the extension, deletes it all.</p>
              <p>It sends requests to the three addresses in its settings and to nothing else. You can change each of them.</p>
              <p>The RPC endpoint, <span class="ab-num">rpc.velaira.xyz</span>, reads the chain and sends your deposits. It sees your IP address, and your public address when you dive in, read your public balance or run a leak scan. A sync does not name your address. It passes each question on to an RPC provider, which does not see your IP address.</p>
              <p>The relayer, <span class="ab-num">relayer-mainnet.velaira.xyz</span>, sends your private transfers and withdrawals to Solana and is paid a fee from the shielded amount. It sees your IP address, the proof, and for a withdrawal the address it goes to.</p>
              <p>The screening service, <span class="ab-num">screener-mainnet.velaira.xyz</span>, sees the public address you dive in from and the amount. It refuses addresses on the US Treasury’s sanctions list and co-signs the rest.</p>
              <p>To reach your wallet the extension opens one page, <span class="ab-num">connect.velaira.xyz</span>, where your wallet is asked for its signature. The page runs no script of ours; its server sees your IP address.</p>
              <p>These services are run by this project and keep no logs. That is a statement about software we run, and you cannot check it from where you are.</p>
              <p>On the websites you visit, the extension offers the Velaira wallet to sites that look for Solana wallets, and warns you before a public transfer gives something away. It looks only at what a site asks your wallet to do through Velaira, and at the addresses your wallet gives the site. That stays in the browser’s memory until it closes and is never sent. It reads nothing else from the page.</p>
              <p>No analytics, no telemetry, no advertising. Nothing is sold, and nothing is shared beyond what this section lists.</p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">The waitlist</dt>
            <dd class="ab-ledger__def">
              <p>The waitlist is closed: the site no longer takes addresses. If you joined, your email address is with the waitlist service, which stores it with the day. It is used for two messages: one when the extension is ready to try, and one when the audited release is. No newsletter, no sharing, no tracking pixels and no tracked links.</p>
              <p>The service keeps no access log. To slow down abuse it counts requests per network for a few minutes, in memory only, under a salted hash it cannot turn back into an address. Nothing of that is written to disk.</p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">Being removed</dt>
            <dd class="ab-ledger__def">
              <p>To be removed, reply to either message. The address is then deleted. Nothing else is held, so nothing else needs deleting.</p>
            </dd>
          </div>
        </dl>

        <p class="ab-actions">
          <RouterLink class="ab-btn ab-btn--line" to="/">Back to the start page</RouterLink>
        </p>
  </section>
  </AbyssRail>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import AbyssIndex from '../components/AbyssIndex.vue';
import AbyssRail from '../components/AbyssRail.vue';
</script>
