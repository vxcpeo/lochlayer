/**
 * `@loch/sdk/verify`: what it takes to check a disclosure somebody was handed,
 * and nothing that makes one. A payment receipt, a source-of-funds report, a
 * viewing key, and reading a claim code. No keys of a wallet, no prover: a
 * page that only checks does not load the proving code.
 */

export { VelairaError } from "./errors";
export { PROGRAM_ID } from "./constants";
export { decodeReceipt, decodeSourceReport, verifyReceipt, verifySourceReport } from "./disclosure";
export type { DisclosureConnection, FundsOrigin, PaymentReceipt, Rejected, SourceReport, VerifiedReceipt, VerifiedSource, VerifyOptions } from "./disclosure";
export { decodeViewingKey, isViewingKey, viewNotes } from "./viewing";
export type { ViewedNote, ViewingKey } from "./viewing";
export { decodeClaim, isClaim } from "./claim";
export type { Claim } from "./claim";
export { fetchEvents } from "./sync";
export type { FetchEventsOptions, FetchedEvents } from "./sync";
