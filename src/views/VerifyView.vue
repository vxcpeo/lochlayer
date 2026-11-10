<template>
  <section class="cb-page-head" aria-labelledby="page-title">
    <h1 class="cb-page-title" id="page-title">Check what you were given.</h1>
    <p class="cb-lede">
      An Enclaven user can hand you three things: a receipt for one payment, a report on where a withdrawal came from, or a viewing key. Paste it here. The
      check runs in your browser against the public chain; nobody has to be taken at their word.
    </p>
  </section>

  <div class="cb-verify-stage">
  <div class="cb-verify__lead">
  <div class="cb-panel cb-verify">
    <div class="cb-verify__gauge" aria-hidden="true">
      <svg viewBox="0 0 320 320" focusable="false">
        <g fill="none" stroke="currentColor" stroke-width="1">
          <circle cx="160" cy="160" r="154" opacity="0.18" />
          <circle cx="160" cy="160" r="118" opacity="0.26" stroke-dasharray="2 7" />
          <circle cx="160" cy="160" r="82" opacity="0.38" />
          <circle cx="160" cy="160" r="46" opacity="0.5" stroke-dasharray="2 5" />
          <circle cx="160" cy="160" r="13" opacity="0.8" />
          <path d="M160 6v44M160 270v44M6 160h44M270 160h44" opacity="0.4" />
          <path d="M160 160 258 70" opacity="0.45" />
        </g>
        <g fill="currentColor">
          <circle cx="258" cy="70" r="3" opacity="0.85" />
        </g>
      </svg>
    </div>

    <div class="cb-console">
      <form class="cb-console__form" id="verify-form" novalidate @submit.prevent="submit">
        <div class="cb-field">
          <label class="cb-field__label" for="verify-input">Receipt, report or viewing key</label>
          <div class="cb-field__line">
            <textarea
              ref="inputEl"
              v-model="documentText"
              class="cb-input cb-input--mono"
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
          </div>

          <p class="cb-err" id="verify-error" :hidden="!error">{{ error }}</p>

          <p class="cb-hint" id="verify-hint">
            What you paste stays in this page. To check it, the page reads the transactions it names from
            <span class="cb-num" data-rpc-host="">{{ host }}</span>, and that endpoint learns which transactions were asked about. A viewing key is not
            sent anywhere: the page downloads the pool’s whole history and reads it here.
          </p>

          <noscript>
            <p class="cb-note cb-note--inline">
              <svg class="cb-glyph" aria-hidden="true" focusable="false"><use href="#i-info"></use></svg>
              <span>The check needs JavaScript, because it runs in your browser.</span>
            </p>
          </noscript>
        </div>

        <p class="cb-actions">
          <button class="cb-btn cb-btn--solid cb-btn--lg" type="submit" id="verify-submit" :aria-busy="busy ? 'true' : undefined">{{ busy ? 'Checking' : 'Check it' }}</button>
        </p>
      </form>

      <div class="cb-verify" id="verify-result" role="status" aria-live="polite">
        <template v-if="result">
          <div :class="result.ok ? 'cb-verdict-ok' : 'cb-fail'">
            <p class="cb-result__title">{{ result.title }}</p>
            <p v-for="(line, index) in result.lines" :key="index" class="cb-result__body">{{ line }}</p>
          </div>

          <div v-if="result.rows.length > 0">
            <dl class="cb-result">
              <div v-for="row in result.rows" :key="row.label">
                <dt class="cb-result__meta">{{ row.label }}</dt>
                <dd class="cb-result__body"><span :class="rowClass(row)">{{ row.value }}</span></dd>
              </div>
            </dl>
          </div>

          <template v-for="section in result.sections" :key="section.title">
            <section class="cb-result__section">
              <h2 class="cb-result__title">{{ section.title }}</h2>
              <dl class="cb-result">
                <div v-for="row in section.rows" :key="row.label + row.value">
                  <dt class="cb-result__meta">{{ row.label }}</dt>
                  <dd class="cb-result__body"><span :class="rowClass(row)">{{ row.value }}</span></dd>
                </div>
              </dl>
            </section>
          </template>
        </template>
      </div>
    </div>
  </div>

  <section class="cb-panel cb-verify__limits">
    <h2 class="cb-panel__title">What a check cannot tell you</h2>
    <div class="cb-panel__body">
      <p>
        Whether the person in front of you is the one the document is about. And nothing here changes what Enclaven is: unaudited software.
        <RouterLink class="cb-link" to="/#cautions">Read the cautions.</RouterLink>
      </p>
    </div>
  </section>
  </div>

  <div class="cb-panel cb-panel--side cb-verify__aside">
    <section class="cb-sheet">
      <h2 class="cb-panel__title">A receipt</h2>
      <div class="cb-panel__body">
        <p>
          Shows that one transaction created a payment of a stated amount that only the holder of a stated shielded address can spend. Compare that
          address with the one you expect. It does not show who paid: the payer and the recipient can both make the same receipt, and nobody else
          can.
        </p>
      </div>
    </section>

    <section class="cb-sheet">
      <h2 class="cb-panel__title">A source-of-funds report</h2>
      <div class="cb-panel__body">
        <p>
          Shows where the money behind one withdrawal entered the pool. It opens the wallet’s own transactions on that path, back to the deposits, and
          each step is checked against the chain. Where the path reaches money that came from another wallet, it stops, and this page says so.
        </p>
        <p>It does not divide the withdrawn amount among the deposits. Payments are merged and split on the way.</p>
      </div>
    </section>

    <section class="cb-sheet">
      <h2 class="cb-panel__title">A viewing key</h2>
      <div class="cb-panel__body">
        <p>
          Lists every payment a wallet has received, with its amount: from others, and its own deposits and change. It cannot show which of them were
          spent, so it gives neither a balance nor what was paid out. Whoever gave it to you cannot take it back, so keep it as carefully as they
          would.
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
import { Connection } from '@solana/web3.js';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
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
  return `cb-num ${row.role === 'shielded' ? 'cb-sealed' : 'cb-exposed'}`;
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
