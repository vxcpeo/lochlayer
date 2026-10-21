<template>
  <AbyssRail>
    <section class="ab-procedure" aria-labelledby="page-title">
      <header class="ab-runhead">
        <h1 class="ab-runhead__title" id="page-title">Install Miston.</h1>
        <p class="ab-runhead__lede">Miston is a browser extension that works beside the wallet you already have. Add it from the Chrome Web Store, in Chrome, Brave or Edge. It takes about two minutes.</p>
        <AbyssIndex />
      </header>

      <p class="ab-runhead__action">
        <a class="ab-btn ab-btn--fill ab-btn--lg" href="https://chromewebstore.google.com/detail/loch/cholegglblkeacfdjnnogaohmkogmckf">Add to Chrome</a>
      </p>

        <dl class="ab-ledger ab-ledger--wide">
          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">Before you start</dt>
            <dd class="ab-ledger__def">
              <p>You need Chrome, Brave or Edge on a computer, and a Solana wallet extension in the same browser. Miston has been tried with Phantom. Solflare and Backpack should work and have not been tried yet.</p>
              <p>Miston runs on Solana mainnet, with real SOL. <RouterLink class="ab-link" to="/#cautions">Read the cautions</RouterLink> before you put anything in.</p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">1. Add it</dt>
            <dd class="ab-ledger__def">
              <p>Press <strong>Add to Chrome</strong> at the top of this page. It opens the extension’s page on the <a class="ab-link" href="https://chromewebstore.google.com/detail/loch/cholegglblkeacfdjnnogaohmkogmckf">Chrome Web Store</a>; press <strong>Add to Chrome</strong> there and confirm. Brave and Edge install from the same page (Edge asks you once to allow extensions from other stores).</p>
              <p>Press the puzzle-piece button in the toolbar and pin Miston, so that it is one press away.</p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">2. Connect your wallet</dt>
            <dd class="ab-ledger__def">
              <p>Open Miston from the toolbar and press <strong>Connect wallet</strong>. A page at <code>connect.miston.xyz</code> opens and your wallet asks you to sign one message, “Miston key derivation v1”. That signature is what your shielded keys are made from. No new seed phrase is created and no transaction is sent.</p>
              <p>Sign that message nowhere else. Anyone who gets that signature gets your shielded balance.</p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">3. Set an RPC endpoint</dt>
            <dd class="ab-ledger__def">
              <p>Miston reads the chain through an RPC endpoint. It starts with Miston’s own, <code>rpc.miston.xyz</code>. If Miston says it cannot reach the chain or stays behind, or you would rather use a node you chose, open <strong>Settings</strong> in Miston and put in the address of your own endpoint; the free plan of any Solana RPC provider is enough.</p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">Updating</dt>
            <dd class="ab-ledger__def">
              <p>Added from the Chrome Web Store, Miston updates itself. Loaded by hand (below), it does not: download the new version here, put the new folder in place of the old one, and press the reload arrow on Miston’s card on the extensions page. Your shielded balance is in neither: it comes back from your wallet’s signature.</p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">Removing</dt>
            <dd class="ab-ledger__def">
              <p>Surface what you have in the Miston first. Then press <strong>Remove</strong> on Miston’s card on the extensions page. If you loaded it by hand, delete the folder too.</p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">Or load it by hand</dt>
            <dd class="ab-ledger__def">
              <p>The same extension is here as a zip file, for a browser without the store or for anyone who wants the file in hand. Loaded this way it does not update itself.</p>
              <p class="ab-download">
                <a class="ab-btn ab-btn--line" download href="/download/miston-extension-0.1.0.zip">Download Miston 0.1.0</a> <span class="ab-fine">A zip file, <span class="ab-num">6.7</span>&nbsp;MB. Most of that is the two files your browser uses to build proofs on your own machine.</span>
              </p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">Unzip it</dt>
            <dd class="ab-ledger__def">
              <p>Open the zip file and move the folder inside it, <code>miston-extension-0.1.0</code>, somewhere it can stay, such as your Documents folder. The browser runs Miston from that folder, so if you delete or move it later, Miston stops working.</p>
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
              <p>Press <strong>Load unpacked</strong> and choose the folder you unzipped: the one that has <code>manifest.json</code> directly inside it. Miston appears in the list of extensions.</p>
              <p>Press the puzzle-piece button in the toolbar and pin Miston, so that it is one press away.</p>
            </dd>
          </div>

          <div class="ab-ledger__row">
            <dt class="ab-ledger__term">Check the file</dt>
            <dd class="ab-ledger__def">
              <p>If you want to be sure the file arrived whole, compare its SHA-256 with this one. On macOS and Linux: <code>shasum -a 256 miston-extension-0.1.0.zip</code>. On Windows: <code>certutil -hashfile miston-extension-0.1.0.zip SHA256</code>.</p>
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
