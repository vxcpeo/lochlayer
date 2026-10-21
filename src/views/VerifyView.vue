<template>
  <AbyssRail>
    <section class="ab-check" aria-labelledby="page-title">
      <header class="ab-runhead">
        <h1 class="ab-runhead__title" id="page-title">Check what you were given.</h1>
        <p class="ab-runhead__lede">
          A Miston user can hand you three things: a receipt for one payment, a report on where a withdrawal came from, or a viewing key. Paste it here. The
          check runs in your browser against the public chain; nobody has to be taken at their word.
        </p>
        <AbyssIndex />
      </header>

      <div class="ab-check__console">
        <form class="ab-verify__form" id="verify-form" novalidate @submit.prevent="submit">
        <div class="ab-field">
          <label class="ab-field__label" for="verify-input">Receipt, report or viewing key</label>
          <textarea
            ref="inputEl"
            v-model="documentText"
            class="ab-area"
            id="verify-input"
            name="document"
            rows="6"
            autocomplete="off"
            autocapitalize="off"
            autocorrect="off"
            spellcheck="false"
            placeholder="Paste it here"
            aria-describedby="verify-error verify-hint"
            :aria-invalid="error ? 'true' : undefined"
            @input="error = ''"
          ></textarea>

          <p class="ab-field__err" id="verify-error" :hidden="!error">{{ error }}</p>

          <p class="ab-field__hint" id="verify-hint">
            What you paste stays in this page. To check it, the page reads the transactions it names from
            <span class="ab-num" data-rpc-host="">{{ host }}</span>, and that endpoint learns which transactions were asked about. A viewing key is not
            sent anywhere: the page downloads the pool’s whole history and reads it here.
          </p>

          <noscript>
            <p class="ab-callout ab-callout--inline">
              <svg class="ab-glyph" aria-hidden="true" focusable="false"><use href="#i-info"></use></svg>
              <span>The check needs JavaScript, because it runs in your browser.</span>
            </p>
          </noscript>
        </div>

        <p class="ab-actions">
          <button class="ab-btn ab-btn--fill ab-btn--lg" type="submit" id="verify-submit" :aria-busy="busy ? 'true' : undefined">{{ busy ? 'Checking' : 'Check it' }}</button>
        </p>
      </form>
      </div>

      <div class="ab-check__body">

      <div class="ab-check__result" id="verify-result" role="status" aria-live="polite">
        <template v-if="result">
          <div :class="['ab-verify__band', result.ok ? 'ab-verify__band--ok' : 'ab-verify__band--warn']">
            <p class="ab-verify__band-title">{{ result.title }}</p>
            <p v-for="(line, index) in result.lines" :key="index">{{ line }}</p>
          </div>

          <div v-if="result.rows.length > 0">
            <dl class="ab-ledger">
              <div v-for="row in result.rows" :key="row.label" class="ab-ledger__row">
                <dt class="ab-ledger__term">{{ row.label }}</dt>
                <dd class="ab-ledger__def"><span :class="rowClass(row)">{{ row.value }}</span></dd>
              </div>
            </dl>
          </div>

          <template v-for="section in result.sections" :key="section.title">
            <h2 class="ab-verify__section">{{ section.title }}</h2>
            <div>
              <dl class="ab-ledger">
                <div v-for="row in section.rows" :key="row.label + row.value" class="ab-ledger__row">
                  <dt class="ab-ledger__term">{{ row.label }}</dt>
                  <dd class="ab-ledger__def"><span :class="rowClass(row)">{{ row.value }}</span></dd>
                </div>
              </dl>
            </div>
          </template>
        </template>
      </div>

      <dl class="ab-ledger ab-ledger--wide">
        <div class="ab-ledger__row">
          <dt class="ab-ledger__term">A receipt</dt>
          <dd class="ab-ledger__def">
            <p>
              Shows that one transaction created a payment of a stated amount that only the holder of a stated shielded address can spend. Compare that
              address with the one you expect. It does not show who paid: the payer and the recipient can both make the same receipt, and nobody else
              can.
            </p>
          </dd>
        </div>

        <div class="ab-ledger__row">
          <dt class="ab-ledger__term">A source-of-funds report</dt>
          <dd class="ab-ledger__def">
            <p>
              Shows where the money behind one withdrawal entered the pool. It opens the wallet’s own transactions on that path, back to the deposits, and
              each step is checked against the chain. Where the path reaches money that came from another wallet, it stops, and this page says so.
            </p>
            <p>It does not divide the withdrawn amount among the deposits. Payments are merged and split on the way.</p>
          </dd>
        </div>

        <div class="ab-ledger__row">
          <dt class="ab-ledger__term">A viewing key</dt>
          <dd class="ab-ledger__def">
            <p>
              Lists every payment a wallet has received, with its amount: from others, and its own deposits and change. It cannot show which of them were
              spent, so it gives neither a balance nor what was paid out. Whoever gave it to you cannot take it back, so keep it as carefully as they
              would.
            </p>
          </dd>
        </div>

        <div class="ab-ledger__row">
          <dt class="ab-ledger__term">What a check cannot tell you</dt>
          <dd class="ab-ledger__def">
            <p>
              Whether the person in front of you is the one the document is about. And nothing here changes what Miston is: unaudited software.
              <RouterLink class="ab-link" to="/#cautions">Read the cautions.</RouterLink>
            </p>
          </dd>
        </div>
      </dl>

      <p class="ab-actions">
        <RouterLink class="ab-btn ab-btn--line" to="/">Back to the start page</RouterLink>
      </p>
      </div>
  </section>
  </AbyssRail>
</template>

<script setup lang="ts">
import { Connection } from '@solana/web3.js';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import AbyssIndex from '../components/AbyssIndex.vue';
import AbyssRail from '../components/AbyssRail.vue';
import { activeEndpoint, hostOf } from '../lib/endpoint';
import { checkDocument, type VerifyRow, type VerifyResult } from '../lib/verify';

/** Tests and stories can run a fake check; the page uses the real one. */
const props = defineProps<{ check?: typeof checkDocument }>();
const runCheck = props.check ?? checkDocument;

const endpoint = activeEndpoint();
const host = hostOf(endpoint);

const documentText = ref('');
const error = ref('');
const busy = ref(false);
const result = ref<VerifyResult | null>(null);
const inputEl = ref<HTMLTextAreaElement | null>(null);

const EMPTY = 'Paste a receipt, a report or a viewing key first. Nothing has been sent.';

function rowClass(row: VerifyRow): string {
  if (row.role === 'plain') return '';
  return `ab-num ab-verify__value ${row.role === 'shielded' ? 'ab-shielded' : 'ab-exposed'}`;
}

async function submit(): Promise<void> {
  if (busy.value) return;
  if (documentText.value.trim() === '') {
    error.value = EMPTY;
    inputEl.value?.focus();
    return;
  }
  error.value = '';
  busy.value = true;
  result.value = null;
  const connection = new Connection(endpoint, { commitment: 'confirmed', disableRetryOnRateLimit: true });
  try {
    result.value = await runCheck(documentText.value, connection, host);
  } finally {
    busy.value = false;
  }
}
</script>
