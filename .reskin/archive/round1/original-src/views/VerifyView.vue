<template>
  <div class="land" data-theme="night">
    <div class="wrap page-head">
      <h1 class="t-display-1" id="page-title">Check what you were given.</h1>
      <p class="t-lede">
        A Loch user can hand you three things: a receipt for one payment, a report on where a withdrawal came from, or a viewing key. Paste it here. The
        check runs in your browser against the public chain; nobody has to be taken at their word.
      </p>
    </div>
  </div>
  <hr class="waterline" />
  <div class="water page" data-depth="0">
    <div class="wrap">
      <form class="verify" id="verify-form" novalidate @submit.prevent="submit">
        <div class="field">
          <label class="field__label" for="verify-input">Receipt, report or viewing key</label>
          <textarea
            ref="inputEl"
            v-model="documentText"
            class="input fig"
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
          <p class="field__error" id="verify-error" :hidden="!error">{{ error }}</p>
          <p class="field__hint" id="verify-hint">
            What you paste stays in this page. To check it, the page reads the transactions it names from
            <span class="fig" data-rpc-host="">{{ host }}</span>, and that endpoint learns which transactions were asked about. A viewing key is not
            sent anywhere: the page downloads the pool’s whole history and reads it here.
          </p>
          <noscript>
            <p class="notice notice--inline">
              <svg class="icon" aria-hidden="true" focusable="false"><use href="#i-info"></use></svg>
              <span>The check needs JavaScript, because it runs in your browser.</span>
            </p>
          </noscript>
        </div>
        <p class="page__actions">
          <button class="btn btn--primary btn--lg" type="submit" id="verify-submit" :aria-busy="busy ? 'true' : undefined">{{ busy ? 'Checking' : 'Check it' }}</button>
        </p>
      </form>
      <div id="verify-result" role="status" aria-live="polite">
        <template v-if="result">
          <div :class="['notice', result.ok ? 'notice--done' : 'notice--caution']">
            <p class="notice__title">{{ result.title }}</p>
            <p v-for="(line, index) in result.lines" :key="index">{{ line }}</p>
          </div>
          <div v-if="result.rows.length > 0" class="deflist">
            <dl>
              <div v-for="row in result.rows" :key="row.label" class="deflist__row">
                <dt>{{ row.label }}</dt>
                <dd><span :class="rowClass(row)">{{ row.value }}</span></dd>
              </div>
            </dl>
          </div>
          <template v-for="section in result.sections" :key="section.title">
            <h2 class="t-label verify__section">{{ section.title }}</h2>
            <div class="deflist">
              <dl>
                <div v-for="row in section.rows" :key="row.label + row.value" class="deflist__row">
                  <dt>{{ row.label }}</dt>
                  <dd><span :class="rowClass(row)">{{ row.value }}</span></dd>
                </div>
              </dl>
            </div>
          </template>
        </template>
      </div>
      <div class="deflist">
        <dl>
          <div class="deflist__row">
            <dt>A receipt</dt>
            <dd>
              <p>
                Shows that one transaction created a payment of a stated amount that only the holder of a stated shielded address can spend. Compare that
                address with the one you expect. It does not show who paid: the payer and the recipient can both make the same receipt, and nobody else
                can.
              </p>
            </dd>
          </div>
          <div class="deflist__row">
            <dt>A source-of-funds report</dt>
            <dd>
              <p>
                Shows where the money behind one withdrawal entered the pool. It opens the wallet’s own transactions on that path, back to the deposits, and
                each step is checked against the chain. Where the path reaches money that came from another wallet, it stops, and this page says so.
              </p>
              <p>It does not divide the withdrawn amount among the deposits. Payments are merged and split on the way.</p>
            </dd>
          </div>
          <div class="deflist__row">
            <dt>A viewing key</dt>
            <dd>
              <p>
                Lists every payment a wallet has received, with its amount: from others, and its own deposits and change. It cannot show which of them were
                spent, so it gives neither a balance nor what was paid out. Whoever gave it to you cannot take it back, so keep it as carefully as they
                would.
              </p>
            </dd>
          </div>
          <div class="deflist__row">
            <dt>What a check cannot tell you</dt>
            <dd>
              <p>
                Whether the person in front of you is the one the document is about. And nothing here changes what Loch is: unaudited software.
                <RouterLink to="/#cautions">Read the cautions.</RouterLink>
              </p>
            </dd>
          </div>
        </dl>
      </div>
      <p class="page__actions"><RouterLink class="btn btn--secondary" to="/">Back to the start page</RouterLink></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Connection } from '@solana/web3.js';
import { ref } from 'vue';
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
  return `fig verify__value ${row.role === 'shielded' ? 'is-shielded' : 'is-public'}`;
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
