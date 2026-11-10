/**
 * @loch/design/charts: the three figures of the leak report as accessible
 * inline SVG, and the statement of account that is their text equivalent.
 *
 * Plain data in, strings out. No DOM, no dependencies, no network. The same
 * functions run on the website, in the extension and in Node.
 *
 *   import { steppedBedSvg, statementHtml, byHourSvg, counterpartiesSvg } from "@loch/design/charts";
 *
 *   figure.innerHTML = steppedBedSvg(report, { width: figure.clientWidth });
 *   list.innerHTML = statementHtml(report);
 *
 * The SVG is lettered and inked by @loch/design/components.css (class `lc`),
 * so it follows the palette. Draw at the container's width.
 */
export type { FindingLike, FlowLike, LabelsLike, LeakReportLike, Severity } from "./types";
export { statementHtml, statementLines, statementText } from "./statement";
export type { StatementHtmlOptions, StatementLine } from "./statement";
export { FINDING_SHORT_LABELS, steppedBedSvg, steppedBedText } from "./stepped-bed";
export type { SteppedBedOptions } from "./stepped-bed";
export { byHourSvg, byHourText, hourCounts, quietWindow } from "./by-hour";
export type { ByHourOptions, QuietWindow } from "./by-hour";
export { counterpartiesSvg, counterpartiesText, counterpartyList } from "./counterparties";
export type { CounterpartiesOptions, Counterparty } from "./counterparties";
export { FIT_WIDTHS, fitHtml } from "./fit";
export type { FitOptions } from "./fit";
export { LIMITS } from "./shared";
