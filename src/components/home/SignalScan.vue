<template>
  <section class="sn-band" id="scanner" aria-labelledby="scanner-title">
    <div class="sn-band__head">
      <p class="sn-tile__label"><span class="sn-depth">120 m</span></p>
      <h2 class="sn-band__title" id="scanner-title">Take a sounding of your own wallet.</h2>
      <p class="sn-band__lede">Paste any Solana address. The leak scanner reads the history anyone can read, and tells you what it gives away. You get a privacy score out of 100.</p>
    </div>

    <div class="sn-scan__grid">
      <div class="sn-tile sn-scan__console">
        <form class="sn-console__form" id="scan-form" novalidate @submit.prevent="submit">
          <div class="sn-field">
            <label class="sn-field__label" for="address">Solana wallet address</label>
            <div class="sn-field__line">
              <input
                ref="addressInput"
                v-model="address"
                class="sn-input sn-input--lg sn-input--mono"
                id="address"
                type="text"
                inputmode="text"
                autocomplete="off"
                autocapitalize="off"
                autocorrect="off"
                spellcheck="false"
                maxlength="64"
                placeholder="Paste an address"
                aria-describedby="address-error address-hint"
                name="address"
                :aria-invalid="addressError ? 'true' : undefined"
                @input="addressError = ''"
              />
              <button class="sn-btn sn-btn--fill sn-btn--lg" type="submit" id="scan-submit" :disabled="!jsReady || framed || scanning">Scan this address</button>
            </div>

            <p class="sn-err" id="address-error" :hidden="!addressError">{{ addressError }}</p>

            <p class="sn-hint" id="address-hint">
              The scan runs in your browser and reads public chain data from <span class="sn-num" data-rpc-host="">{{ host }}</span>. That endpoint learns which address you looked up. Nothing asks you to connect a wallet, sign anything or type a seed phrase.
            </p>

            <noscript>
              <p class="sn-callout sn-callout--inline">
                <svg class="sn-glyph" aria-hidden="true" focusable="false"><use href="#i-info"></use></svg>
                <span>The live scan needs JavaScript, because it runs in your browser. With JavaScript off, the report below is an example.</span>
              </p>
            </noscript>

            <p class="sn-callout sn-callout--inline sn-callout--framed">
              <span>This page is being shown inside another page, so the live scan is switched off. Open it in a tab of its own.</span>
            </p>
          </div>

          <div class="sn-console__set">
            <div class="sn-field">
              <label class="sn-field__label" for="scan-limit">Transactions to read</label>
              <select v-model.number="limit" class="sn-select sn-num" id="scan-limit" name="limit" aria-describedby="scan-limit-hint">
                <option :value="100">The latest 100</option>
                <option :value="250">The latest 250</option>
                <option :value="500">The latest 500</option>
                <option :value="1000">The latest 1000</option>
              </select>
              <p class="sn-hint" id="scan-limit-hint">More takes longer: on a slow endpoint about two minutes for 100.</p>
            </div>

            <details ref="rpcDetails" class="sn-fold" id="rpc-own">
              <summary>
                <span>Use your own RPC</span>
                <small id="rpc-current">{{ rpcCurrent }}</small>
              </summary>

              <div class="sn-fold__body">
                <p>Point the scan at a node or a provider you trust. Its address is kept in this browser only, in localStorage, and is sent to nobody.</p>

                <div class="sn-field">
                  <label class="sn-field__label" for="rpc-url">RPC endpoint</label>
                  <div class="sn-field__line">
                    <input
                      ref="rpcInput"
                      v-model="rpcUrl"
                      class="sn-input sn-input--mono"
                      id="rpc-url"
                      type="url"
                      inputmode="url"
                      autocomplete="off"
                      autocapitalize="off"
                      spellcheck="false"
                      placeholder="https://"
                      aria-describedby="rpc-error rpc-hint"
                      name="rpc"
                      :aria-invalid="rpcError ? 'true' : undefined"
                      @input="rpcError = ''"
                      @keydown.enter.prevent="saveRpc"
                    />
                    <button class="sn-btn sn-btn--line" type="button" id="rpc-save" aria-label="Save and reload" @click="saveRpc">Save and reload</button>
                  </div>

                  <p class="sn-err" id="rpc-error" :hidden="!rpcError">
                    <svg class="sn-glyph" aria-hidden="true" focusable="false"><use href="#i-caution"></use></svg>
                    <span>{{ rpcError }}</span>
                  </p>

                  <p class="sn-hint" id="rpc-hint">The page reloads so that its security policy allows this endpoint and no other. Use https, or http for a node on this machine.</p>
                </div>

                <p>
                  <button class="sn-btn sn-btn--quiet" type="button" id="rpc-reset" :hidden="!hasStoredRpc" @click="resetRpc">Go back to the default endpoint</button>
                </p>
              </div>
            </details>
          </div>
        </form>
      </div>

      <div class="sn-tile sn-scan__aside">
        <div class="sn-scan__status" id="scan-status">
          <template v-if="scanning">
            <div class="sn-meter" role="group" aria-label="Scan in progress">
              <div class="sn-meter__track" aria-hidden="true">
                <span class="sn-meter__fill" :style="progressStyle()"></span>
              </div>
              <ol class="sn-meter__stages">
                <li v-for="(item, index) in STAGES" :key="item.stage" :data-state="stageState(index)" :aria-current="stageState(index) === 'now' ? 'step' : undefined">{{ item.label }}</li>
              </ol>
              <p class="sn-meter__status">
                <span>{{ statusText }}</span>
                <span class="sn-num" aria-hidden="true">{{ elapsed }}</span>
              </p>
            </div>
            <button class="sn-btn sn-btn--line sn-btn--sm" type="button" id="scan-cancel" @click="cancel">Cancel the scan</button>
            <p class="visually-hidden" role="status">{{ liveMessage }}</p>
          </template>

          <div v-else-if="failure" class="sn-fail" role="alert" id="scan-failure" :data-reason="failure.reason">
            <p class="sn-fail__title">
              <svg class="sn-glyph" aria-hidden="true" focusable="false"><use href="#i-caution"></use></svg>{{ failure.title }}
            </p>
            <p>{{ failure.body }}</p>
            <p v-if="failure.detail" class="sn-fail__detail">Detail: {{ failure.detail }}</p>
            <div class="sn-cluster">
              <button class="sn-btn sn-btn--line sn-btn--sm" type="button" @click="retry">Scan again</button>
              <button v-if="failure.offerOwnRpc" class="sn-btn sn-btn--quiet" type="button" @click="openOwnRpc">Use your own RPC</button>
            </div>
          </div>

          <div v-else-if="emptyReport" class="sn-none" role="status" id="scan-empty">
            <p class="sn-none__title">Nothing found for this address</p>
            <p>{{ host }} has no transactions and no balance for it. Check that the address is right. If it is, it has given nothing away yet.</p>
          </div>

          <p v-else-if="note" class="sn-note-inline" role="status" id="scan-note">
            <svg class="sn-glyph" aria-hidden="true" focusable="false"><use href="#i-info"></use></svg>
            <span>{{ note }}</span>
          </p>
        </div>

        <details class="sn-fold sn-scan__fold" id="run-locally">
          <summary>
            <span>Who learns which address you looked up</span>
          </summary>
          <div class="sn-fold__body">
            <p>
              By default, the Velaira RPC proxy, which this project runs, and the RPC provider behind it. The proxy sees the address together with your
              IP address while it answers, and keeps no log of either. The provider sees the address, coming from the proxy, and not your IP
              address. It can keep what it sees.
            </p>
            <p>If that is more than you want to tell anyone, use your own RPC. Once the source code is published, you will be able to run the same scanner on your own machine.</p>
          </div>
        </details>
      </div>

      <div class="sn-tile sn-scan__report">
        <div class="sn-readout__frame">
          <div id="scan-report" ref="reportEl" class="sn-readout" @click="onReportClick"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import exampleHtml from '../../data/example-report.html?raw';
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { activeEndpoint, endpointMessage, hostOf, readChoice, saveEndpoint, validateEndpoint, usingOwnEndpoint } from '../../lib/endpoint';
import { buildLiveReportHtml, mountReportCharts } from '../../lib/report';
import {
  EMPTY_ADDRESS_MESSAGE,
  INVALID_ADDRESS_MESSAGE,
  formatElapsed,
  isAddress,
  scanWallet,
  type Failure,
  type ScanProgress,
  type ScanResult,
} from '../../lib/scanner';

const STAGES = [
  { stage: 'balance', label: 'Balance' },
  { stage: 'history', label: 'History' },
  { stage: 'transactions', label: 'Transactions' },
  { stage: 'report', label: 'Report' },
] as const;

/** Tests and stories can run a fake scan; the page uses the real one. */
const props = defineProps<{ scan?: typeof scanWallet }>();
const runScan = props.scan ?? scanWallet;

const PROGRESS_BASE: Record<string, number> = { balance: 0.1, history: 0.25, transactions: 0.4, report: 1 };

const choice = readChoice();
const endpoint = activeEndpoint(choice);
const host = hostOf(endpoint);
const own = usingOwnEndpoint(choice);

const addressInput = ref<HTMLInputElement | null>(null);
const rpcInput = ref<HTMLInputElement | null>(null);
const rpcDetails = ref<HTMLDetailsElement | null>(null);
const reportEl = ref<HTMLElement | null>(null);

const address = ref('');
const addressError = ref('');
const limit = ref(100);
const rpcUrl = ref(choice.stored ?? '');
const rpcError = ref('');
const hasStoredRpc = ref(choice.stored !== null);
const rpcCurrent = computed(() => `${usingOwnEndpoint(choice) ? 'Yours' : 'Default'}: ${host}`);

const jsReady = ref(false);
const framed = ref(false);
const scanning = ref(false);
const progress = ref<ScanProgress>({ stage: 'balance', fetched: 0, total: 0, skipped: 0, slowed: false });
const elapsed = ref('0:00');
const liveMessage = ref('');
const failure = ref<Failure | null>(null);
const emptyReport = ref(false);
const note = ref('');

let controller: AbortController | null = null;
let timer: ReturnType<typeof setInterval> | null = null;
let startedAt = 0;
let disposeCharts: (() => void) | null = null;

const statusText = computed(() => {
  const current = progress.value;
  if (current.stage === 'balance') return `Asking ${host} for the balance.`;
  if (current.stage === 'history') return `Asking ${host} for the list of recent transactions.`;
  if (current.stage === 'report') return 'Working out the report.';
  if (current.total === 0) return `Reading transactions from ${host}.`;
  const skipped = current.skipped > 0 ? ` ${current.skipped} could not be read.` : '';
  const slowed = current.slowed ? ' It is limiting requests, so the scan has slowed down.' : '';
  return `Read ${current.fetched} of ${current.total} transactions from ${host}.${skipped}${slowed}`;
});

function progressStyle(): Record<string, string> {
  const current = progress.value;
  const base = PROGRESS_BASE[current.stage] ?? 0.1;
  const ratio = current.stage === 'transactions' && current.total > 0 ? current.fetched / current.total : 0;
  const value = current.stage === 'transactions' ? base + ratio * (0.97 - base) : base;
  return { '--progress': String(Math.min(0.97, value)) };
}

function stageState(index: number): 'done' | 'now' | undefined {
  const current = STAGES.findIndex((item) => item.stage === progress.value.stage);
  if (index < current) return 'done';
  if (index === current) return 'now';
  return undefined;
}

/** Runs one scan, from the address currently in the form. */
async function run(): Promise<void> {
  if (scanning.value) return;
  failure.value = null;
  emptyReport.value = false;
  note.value = '';
  addressError.value = '';
  liveMessage.value = `Scanning through ${host}.`;
  progress.value = { stage: 'balance', fetched: 0, total: 0, skipped: 0, slowed: false };
  scanning.value = true;
  startedAt = Date.now();
  elapsed.value = '0:00';
  timer = setInterval(() => {
    elapsed.value = formatElapsed(Date.now() - startedAt);
  }, 1000);
  const local = new AbortController();
  controller = local;
  try {
    const outcome = await runScan({
      address: address.value.trim(),
      rpcUrl: endpoint,
      limit: limit.value,
      signal: local.signal,
      onProgress: (update) => {
        progress.value = update;
        if (update.stage === 'transactions' && update.total > 0) liveMessage.value = `Read ${update.fetched} of ${update.total} transactions.`;
      },
    });
    if (outcome.kind === 'report') {
      renderLive(outcome.result, outcome.asked);
    } else if (outcome.kind === 'empty') {
      emptyReport.value = true;
    } else if (outcome.kind === 'cancelled') {
      note.value = 'Scan cancelled. Nothing was kept.';
      addressInput.value?.focus();
    } else if (outcome.kind === 'invalid-address') {
      addressError.value = INVALID_ADDRESS_MESSAGE;
    } else {
      failure.value = outcome.failure;
    }
  } finally {
    scanning.value = false;
    controller = null;
    if (timer) clearInterval(timer);
    timer = null;
  }
}

function submit(): void {
  if (!jsReady.value || framed.value || scanning.value) return;
  const value = address.value.trim();
  failure.value = null;
  emptyReport.value = false;
  note.value = '';
  if (value === '') {
    addressError.value = EMPTY_ADDRESS_MESSAGE;
    addressInput.value?.focus();
    return;
  }
  if (!isAddress(value)) {
    addressError.value = INVALID_ADDRESS_MESSAGE;
    addressInput.value?.focus();
    return;
  }
  void run();
}

function retry(): void {
  void run();
}

function cancel(): void {
  controller?.abort();
}

function openOwnRpc(): void {
  if (!rpcDetails.value) return;
  rpcDetails.value.open = true;
  rpcInput.value?.focus();
}

function saveRpc(): void {
  const result = validateEndpoint(rpcUrl.value);
  if (!result.ok) {
    rpcError.value = endpointMessage(result.reason);
    rpcInput.value?.focus();
    return;
  }
  if (!saveEndpoint(result.url)) {
    rpcError.value = 'This browser would not store the endpoint, so the default stays in use. Allow storage for this site and save again.';
    return;
  }
  window.location.hash = 'scanner';
  window.location.reload();
}

function resetRpc(): void {
  saveEndpoint(null);
  window.location.hash = 'scanner';
  window.location.reload();
}

function renderExample(): void {
  disposeCharts?.();
  disposeCharts = null;
  if (reportEl.value) reportEl.value.innerHTML = exampleHtml;
}

function renderLive(result: ScanResult, asked: number): void {
  if (!reportEl.value) return;
  disposeCharts?.();
  disposeCharts = null;
  reportEl.value.innerHTML = buildLiveReportHtml({
    report: result.report,
    flows: result.flows,
    host,
    skipped: result.skipped,
    asked,
    own,
  });
  nextTick(() => {
    if (!reportEl.value) return;
    disposeCharts = mountReportCharts(reportEl.value, result.report, result.flows);
    reportEl.value.querySelector<HTMLElement>('#scan-title')?.focus({ preventScroll: true });
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    reportEl.value.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' });
  });
}

function clearReport(): void {
  renderExample();
  disposeCharts?.();
  disposeCharts = null;
  address.value = '';
  failure.value = null;
  emptyReport.value = false;
  note.value = 'Report cleared. The example is back in its place.';
  void nextTick(() => addressInput.value?.focus());
}

function onReportClick(event: MouseEvent): void {
  const target = event.target as HTMLElement | null;
  if (target?.closest('[data-clear-report]')) clearReport();
}

onMounted(() => {
  jsReady.value = true;
  framed.value = document.documentElement.hasAttribute('data-framed');
  renderExample();
  const problem = (() => {
    if (choice.stored === null) return null;
    const result = validateEndpoint(choice.stored);
    if (result.ok) return null;
    const detail = result.reason === 'empty' ? '' : ` ${endpointMessage(result.reason)}`;
    return `The address saved in this browser cannot be used, so scans go to the default endpoint, ${hostOf(choice.defaultRpc)}.${detail} Save another address, or go back to the default endpoint.`;
  })();
  if (problem) {
    rpcError.value = problem;
    if (rpcDetails.value) rpcDetails.value.open = true;
  }
});

onBeforeUnmount(() => {
  controller?.abort();
  if (timer) clearInterval(timer);
  disposeCharts?.();
});
</script>
