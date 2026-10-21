<template>
  <AbyssRail>
    <section class="ab-procedure" aria-labelledby="page-title">
      <header class="ab-runhead">
        <h1 class="ab-runhead__title" id="page-title">Install Velaira.</h1>
        <p class="ab-runhead__lede">Velaira is a browser extension that works beside the wallet you already have. It is coming soon to the Chrome Web Store, in Chrome, Brave or Edge. Until then, it can be loaded by hand.</p>
        <AbyssIndex />
      </header>

      <p class="ab-runhead__action">
        <span class="ab-btn ab-btn--soon ab-btn--lg">Coming soon<span class="visually-hidden"> to the Chrome Web Store</span></span>
        <span class="ab-fine">The store listing is not live yet.</span>
      </p>

        <dl class="ab-ledger ab-ledger--wide">
          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">Before you start</dt>
            <dd class="ab-ledger__def">
              <p>You need Chrome, Brave or Edge on a computer, and a Solana wallet extension in the same browser. Velaira has been tried with Phantom. Solflare and Backpack should work and have not been tried yet.</p>
              <p>Velaira runs on Solana mainnet, with real SOL. <RouterLink class="ab-link" to="/#cautions">Read the cautions</RouterLink> before you put anything in.</p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">1. Add it</dt>
            <dd class="ab-ledger__def">
              <p>The Chrome Web Store listing is coming soon. When it is live, this page will link to it, and Chrome, Brave and Edge will install from the same page (Edge asks you once to allow extensions from other stores).</p>
              <p>Until then, load the extension by hand from the zip file below.</p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">2. Connect your wallet</dt>
            <dd class="ab-ledger__def">
              <p>Open Velaira from the toolbar and press <strong>Connect wallet</strong>. A page at <code>connect.velaira.xyz</code> opens and your wallet asks you to sign one message, “Velaira key derivation v1”. That signature is what your shielded keys are made from. No new seed phrase is created and no transaction is sent.</p>
              <p>Sign that message nowhere else. Anyone who gets that signature gets your shielded balance.</p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">3. Set an RPC endpoint</dt>
            <dd class="ab-ledger__def">
              <p>Velaira reads the chain through an RPC endpoint. It starts with Velaira’s own, <code>rpc.velaira.xyz</code>. If Velaira says it cannot reach the chain or stays behind, or you would rather use a node you chose, open <strong>Settings</strong> in Velaira and put in the address of your own endpoint; the free plan of any Solana RPC provider is enough.</p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">Updating</dt>
            <dd class="ab-ledger__def">
              <p>Once Velaira is on the Chrome Web Store, it will update itself. Loaded by hand (below), it does not: download the new version here, put the new folder in place of the old one, and press the reload arrow on Velaira’s card on the extensions page. Your shielded balance is in neither: it comes back from your wallet’s signature.</p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">Removing</dt>
            <dd class="ab-ledger__def">
              <p>Surface what you have in the Velaira first. Then press <strong>Remove</strong> on Velaira’s card on the extensions page. If you loaded it by hand, delete the folder too.</p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">Or load it by hand</dt>
            <dd class="ab-ledger__def">
              <p>The extension is here as a zip file, for a browser without the store, for anyone who wants the file in hand, or for anyone who would rather not wait for the Chrome Web Store listing. Loaded this way it does not update itself.</p>
              <p class="ab-download">
                <a class="ab-btn ab-btn--line" download href="/download/velaira-extension-0.1.0.zip">Download Velaira 0.1.0</a> <span class="ab-fine">A zip file, <span class="ab-num">6.7</span>&nbsp;MB. Most of that is the two files your browser uses to build proofs on your own machine.</span>
              </p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">Unzip it</dt>
            <dd class="ab-ledger__def">
              <p>Open the zip file and move the folder inside it, <code>velaira-extension-0.1.0</code>, somewhere it can stay, such as your Documents folder. The browser runs Velaira from that folder, so if you delete or move it later, Velaira stops working.</p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">Open the extensions page</dt>
            <dd class="ab-ledger__def">
              <p>Type <code>chrome://extensions</code> into the address bar and press Enter. In Brave it is <code>brave://extensions</code>, in Edge <code>edge://extensions</code>.</p>
              <p>Turn on <strong>Developer mode</strong>. The switch is in the top right corner (in Edge, on the left). It only allows extensions to be loaded from a folder.</p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">Load the folder</dt>
            <dd class="ab-ledger__def">
              <p>Press <strong>Load unpacked</strong> and choose the folder you unzipped: the one that has <code>manifest.json</code> directly inside it. Velaira appears in the list of extensions.</p>
              <p>Press the puzzle-piece button in the toolbar and pin Velaira, so that it is one press away.</p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">Check the file</dt>
            <dd class="ab-ledger__def">
              <p>If you want to be sure the file arrived whole, compare its SHA-256 with this one. On macOS and Linux: <code>shasum -a 256 velaira-extension-0.1.0.zip</code>. On Windows: <code>certutil -hashfile velaira-extension-0.1.0.zip SHA256</code>.</p>
              <div class="ab-sha">
                <pre tabindex="0" role="group" aria-label="SHA-256 of the download"><code id="download-sha256">0ee00e059e175874e1b0a4f30f7abcd73f12607d6091d89d2fed06f9d341791e</code></pre>
              </div>
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
