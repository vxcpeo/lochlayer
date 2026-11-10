<template>
  <section class="cb-page-head" aria-labelledby="page-title">
    <h1 class="cb-page-title" id="page-title">Install Enclaven.</h1>
    <p class="cb-lede">Enclaven is a browser extension that works beside the wallet you already have. It is coming soon to the Chrome Web Store, in Chrome, Brave or Edge. Until then, it can be loaded by hand.</p>
  </section>

  <div class="cb-install-stage">
    <div class="cb-procedure">
      <section class="cb-procedure__entry">
        <div class="cb-procedure__content">
          <h2 class="cb-procedure__title">Before you start</h2>
          <div class="cb-procedure__body">
            <p>You need Chrome, Brave or Edge on a computer, and a Solana wallet extension in the same browser. Enclaven has been tried with Phantom. Solflare and Backpack should work and have not been tried yet.</p>
            <p>Enclaven runs on Solana mainnet, with real SOL. <RouterLink class="cb-link" to="/#cautions">Read the cautions</RouterLink> before you put anything in.</p>
          </div>
        </div>
      </section>

      <section class="cb-procedure__entry">
        <div class="cb-procedure__content">
          <h2 class="cb-procedure__title">1. Add it</h2>
          <div class="cb-procedure__body">
            <p>The Chrome Web Store listing is coming soon. When it is live, this page will link to it, and Chrome, Brave and Edge will install from the same page (Edge asks you once to allow extensions from other stores).</p>
            <p>Until then, load the extension by hand from the zip file below.</p>
          </div>
        </div>
      </section>

      <section class="cb-procedure__entry">
        <div class="cb-procedure__content">
          <h2 class="cb-procedure__title">2. Connect your wallet</h2>
          <div class="cb-procedure__body">
            <p>Open Enclaven from the toolbar and press <strong>Connect wallet</strong>. A page at <code>connect.enclaven.xyz</code> opens and your wallet asks you to sign one message, “Enclaven key derivation v1”. That signature is what your shielded keys are made from. No new seed phrase is created and no transaction is sent.</p>
            <p>Sign that message nowhere else. Anyone who gets that signature gets your shielded balance.</p>
          </div>
        </div>
      </section>

      <section class="cb-procedure__entry">
        <div class="cb-procedure__content">
          <h2 class="cb-procedure__title">3. Set an RPC endpoint</h2>
          <div class="cb-procedure__body">
            <p>Enclaven reads the chain through an RPC endpoint. It starts with Enclaven’s own, <code>rpc.enclaven.xyz</code>. If Enclaven says it cannot reach the chain or stays behind, or you would rather use a node you chose, open <strong>Settings</strong> in Enclaven and put in the address of your own endpoint; the free plan of any Solana RPC provider is enough.</p>
          </div>
        </div>
      </section>

      <section class="cb-procedure__entry">
        <div class="cb-procedure__content">
          <h2 class="cb-procedure__title">Updating</h2>
          <div class="cb-procedure__body">
            <p>Once Enclaven is on the Chrome Web Store, it will update itself. Loaded by hand (below), it does not: download the new version here, put the new folder in place of the old one, and press the reload arrow on Enclaven’s card on the extensions page. Your shielded balance is in neither: it comes back from your wallet’s signature.</p>
          </div>
        </div>
      </section>

      <section class="cb-procedure__entry">
        <div class="cb-procedure__content">
          <h2 class="cb-procedure__title">Removing</h2>
          <div class="cb-procedure__body">
            <p>Surface what you have in the Enclaven first. Then press <strong>Remove</strong> on Enclaven’s card on the extensions page. If you loaded it by hand, delete the folder too.</p>
          </div>
        </div>
      </section>

      <section class="cb-procedure__entry">
        <div class="cb-procedure__content">
          <h2 class="cb-procedure__title">Unzip it</h2>
          <div class="cb-procedure__body">
            <p>Open the zip file and move the folder inside it, <code>enclaven-extension-0.1.0</code>, somewhere it can stay, such as your Documents folder. The browser runs Enclaven from that folder, so if you delete or move it later, Enclaven stops working.</p>
          </div>
        </div>
      </section>

      <section class="cb-procedure__entry">
        <div class="cb-procedure__content">
          <h2 class="cb-procedure__title">Open the extensions page</h2>
          <div class="cb-procedure__body">
            <p>Type <code>chrome://extensions</code> into the address bar and press Enter. In Brave it is <code>brave://extensions</code>, in Edge <code>edge://extensions</code>.</p>
            <p>Turn on <strong>Developer mode</strong>. The switch is in the top right corner (in Edge, on the left). It only allows extensions to be loaded from a folder.</p>
          </div>
        </div>
      </section>

      <section class="cb-procedure__entry">
        <div class="cb-procedure__content">
          <h2 class="cb-procedure__title">Load the folder</h2>
          <div class="cb-procedure__body">
            <p>Press <strong>Load unpacked</strong> and choose the folder you unzipped: the one that has <code>manifest.json</code> directly inside it. Enclaven appears in the list of extensions.</p>
            <p>Press the puzzle-piece button in the toolbar and pin Enclaven, so that it is one press away.</p>
          </div>
        </div>
      </section>

      <section class="cb-procedure__entry">
        <div class="cb-procedure__content">
          <h2 class="cb-procedure__title">Check the file</h2>
          <div class="cb-procedure__body">
            <p>If you want to be sure the file arrived whole, compare its SHA-256 with this one. On macOS and Linux: <code>shasum -a 256 enclaven-extension-0.1.0.zip</code>. On Windows: <code>certutil -hashfile enclaven-extension-0.1.0.zip SHA256</code>.</p>
            <div class="cb-sha">
              <pre tabindex="0" role="group" aria-label="SHA-256 of the download"><code id="download-sha256">0ee00e059e175874e1b0a4f30f7abcd73f12607d6091d89d2fed06f9d341791e</code></pre>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="cb-install__margin">
      <div class="cb-panel cb-install__cta">
        <div class="cb-actions">
          <span class="cb-btn cb-btn--soft cb-btn--lg">Coming soon<span class="visually-hidden"> to the Chrome Web Store</span></span>
          <span class="cb-fineprint">The store listing is not live yet.</span>
        </div>
      </div>

      <section class="cb-panel cb-install__download">
        <h2 class="cb-procedure__title">Or load it by hand</h2>
        <div class="cb-procedure__body">
          <p>The extension is here as a zip file, for a browser without the store, for anyone who wants the file in hand, or for anyone who would rather not wait for the Chrome Web Store listing. Loaded this way it does not update itself.</p>
          <p>
            <a class="cb-btn cb-btn--solid" download href="/download/enclaven-extension-0.1.0.zip">Download Enclaven 0.1.0</a> <span class="cb-fineprint">A zip file, <span class="cb-num">6.7</span>&nbsp;MB. Most of that is the two files your browser uses to build proofs on your own machine.</span>
          </p>
        </div>
      </section>
    </div>
  </div>

  <p class="cb-actions">
    <RouterLink class="cb-btn cb-btn--outline" to="/">Back to the start page</RouterLink>
  </p>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
