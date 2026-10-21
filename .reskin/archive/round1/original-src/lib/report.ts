/**
 * The leak report: the same article the reference site draws, from the
 * scanner's own data. The example report is served as it was pre-rendered
 * (src/data/example-report.html); a live report is built here and its three
 * figures are drawn at the width of the column they land in.
 */

import { byHourSvg, counterpartiesSvg, hourCounts, quietWindow, statementLines, steppedBedSvg } from './design/charts';
import type { Flow, LeakReport } from './scanner-core/types';

const MINUS = '−';

/** Escapes text that goes into the report's markup. */
export function esc(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** `1 transaction`, `2 transactions`. */
export function plural(count: number, one: string): string {
  return `${count.toLocaleString('en-US')} ${count === 1 ? one : `${one}s`}`;
}

/** Four characters, an ellipsis, four: `Fh3q…Tz8K`. */
export function shortAddress(address: string): string {
  return address.length <= 9 ? address : `${address.slice(0, 4)}…${address.slice(-4)}`;
}

/** The verdict the score earns. */
export function verdictFor(score: number): string {
  if (score >= 80) return 'Deep water. The transactions read give away little.';
  if (score >= 50) return 'Mid water. Parts of this wallet’s story can be read from the surface.';
  return 'Shallow water. Most of this wallet’s story can be read from the surface.';
}

const SEVERITY_WORD = { high: 'High', medium: 'Medium', low: 'Low' } as const;

export type LiveReportOptions = {
  report: LeakReport;
  flows: readonly Flow[];
  host: string;
  skipped: number;
  asked: number;
  own: boolean;
  id?: string;
};

/** The statement of account, as the report draws it. */
export function statementHtml(report: LeakReport): string {
  const totalNote =
    report.findings.length === 0
      ? 'Nothing stood out in the transactions read. That is not proof of privacy: older history was not looked at.'
      : 'What helps: a fresh address for each payer, no forwarding of exact amounts, and savings kept in a shielded balance.';
  const rows = statementLines(report).map((line) => {
    if (line.kind === 'open') {
      return '<li class="statement__row statement__row--open"><span class="statement__what"><strong>A wallet with no leaks</strong><span>Every scan starts here and loses depth for each thing the public history gives away.</span></span><span class="statement__fig fig">100</span></li>';
    }
    if (line.kind === 'total') {
      return `<li class="statement__row statement__row--total"><span class="statement__what"><strong>Privacy score</strong><span>${esc(totalNote)}</span></span><span class="statement__fig">${line.balance}<small>of 100</small></span></li>`;
    }
    const severity = line.severity ? `<span class="sev" data-sev="${esc(line.severity)}">${SEVERITY_WORD[line.severity]}</span>` : '';
    return `<li class="statement__row">${severity}<span class="statement__what"><strong>${esc(line.title)}</strong><span>${esc(line.detail ?? '')}</span></span><span class="statement__fig statement__fig--less fig"><span class="fig-sign">${MINUS}</span>${line.less}</span></li>`;
  });
  return `<ol class="statement">${rows.join('')}</ol>`;
}

/** The whole live report article, with empty placeholders for its figures. */
export function buildLiveReportHtml(options: LiveReportOptions): string {
  const { report, flows, host, skipped, asked, own, id = 'scan' } = options;
  const ownFlag = own;
  const hostText = esc(host);
  const header = `<h3 class="report__name" id="${id}-title" tabindex="-1">Leak report for <span class="fig">${esc(shortAddress(report.address))}</span></h3><p>Read from ${hostText}, in this browser.</p><button class="btn btn--quiet btn--sm report__clear" type="button" data-clear-report>Clear this report</button>`;
  const partial =
    skipped > 0
      ? `<div class="report__section"><div class="notice notice--caution" role="note"><p class="notice__title"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-caution"></use></svg>This score is from a partial read</p><p>${hostText} would not return ${plural(skipped, 'transaction')} of the ${asked.toLocaleString('en-US')} asked for, so ${skipped === 1 ? 'it is' : 'they are'} left out. With ${skipped === 1 ? 'it' : 'them'} the score could be lower. Scan again in a minute${ownFlag ? '' : ', or use your own RPC'}.</p></div></div>`
      : '';
  const fine = `${plural(report.scannedTransactions, 'transaction')} scanned, ${plural(report.transfers, 'transfer')}. Only the most recent transactions are read, so older history is not in this score.`;
  const quiet = quietWindow(hourCounts(flows));
  const hoursCaption = quiet?.guessable
    ? 'Transfers by hour of day, UTC. Deeper is busier. The hatched shoal, where almost nothing happens, is likely when the owner sleeps.'
    : 'Transfers by hour of day, UTC. Deeper is busier. No quiet stretch stands out here.';
  const figures =
    flows.length > 0
      ? `<div class="report__section"><h4 class="report__title">When it is active, and who it deals with</h4><div class="report__figures"><figure class="chart"><div data-chart="hours"></div><figcaption class="chart__caption">${hoursCaption}</figcaption></figure><figure class="chart"><div data-chart="who"></div><figcaption class="chart__caption">Who this wallet deals with. A heavier line is more transfers.</figcaption></figure></div></div>`
      : '';
  return (
    `<article class="report water" data-depth="120" aria-labelledby="${id}-title"><header class="report__head">${header}</header>` +
    partial +
    '<div class="report__body"><div class="score">' +
    '<p class="score__label">Privacy score</p>' +
    `<p class="score__figure"><span class="figure figure--xl is-public">${report.score}</span><span class="score__of">of 100</span></p>` +
    `<p class="score__verdict">${verdictFor(report.score)}</p>` +
    `<p class="t-fine">${fine}</p></div>` +
    '<figure class="chart"><div data-chart="bed"></div><figcaption class="chart__caption">A wallet with no leaks sits 100 deep, out of sight. Each finding takes depth away, and the hatching is what it cost. Where the bed ends up is the score.</figcaption></figure>' +
    '</div>' +
    `<div class="report__section"><h4 class="report__title">The same, as a statement</h4>${statementHtml(report)}</div>` +
    figures +
    '<div class="report__section"><p class="t-fine">This page has no list of known services, so it cannot tell you when a counterparty is an exchange or another identified service. The command-line scanner takes a labels file for that.</p></div>' +
    '</article>'
  );
}

/**
 * Draws the report's three figures into their containers at the width each
 * one has, and redraws them when the layout changes. Returns a disposer.
 */
export function mountReportCharts(root: HTMLElement, report: LeakReport, flows: readonly Flow[]): () => void {
  const targets = [...root.querySelectorAll<HTMLElement>('[data-chart]')];
  const drawnAt = new Map<HTMLElement, number>();
  const draw = (): void => {
    for (const el of targets) {
      const width = Math.floor(el.clientWidth);
      if (width < 240 || drawnAt.get(el) === width) continue;
      drawnAt.set(el, width);
      const kind = el.dataset.chart;
      try {
        el.innerHTML =
          kind === 'bed'
            ? steppedBedSvg(report, { width, id: 'scan-bed', animate: true })
            : kind === 'hours'
              ? byHourSvg(flows, { width, id: 'scan-hours' })
              : kind === 'who'
                ? counterpartiesSvg(flows, { width, id: 'scan-who' })
                : '';
      } catch {
        el.innerHTML = '';
      }
    }
  };
  const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(draw);
  for (const el of targets) observer?.observe(el);
  draw();
  return () => observer?.disconnect();
}
