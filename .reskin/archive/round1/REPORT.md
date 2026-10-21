# Reskin report — the Loch site rebuilt around Tidal Sui / Split Stage

> The UI was rebuilt around **Tidal Sui** / **Split Stage**; the original **marketing-stack** shell and palette were removed while the content contract stayed byte-for-byte intact — until the rebrand that followed (see `../.rebrand/REPORT.md`) renamed the brand on purpose.

- Project: `E:\workspace\chuangye\solana\lochlayer\website`
- Direction: `sui-tidal` (clean-fintech, sampled live from <https://sui.io>), skeleton `split-stage` (spatial)
- Seed: `97f518327c2652d531614f8d3b312979df5524af967bf5506ccf7890095e2203`
- Original: `marketing-stack` (editorial), accent `#a8d0e0`, dark ground
- New: accent `#298dff` (60.95 ΔE), light ground, split skeleton

## What changed

- **Shell**: `SiteHeader.vue` (top bar) and `assets/site.css` (87 KB) are deleted. `TideLayout.vue` is the only layout: a sticky narrative column (`aside`) holding the crest, the route index, the palette switch and the page thesis, a scrolling stage (`main`), and a footer. Landmarks in DOM order: `aside` → `nav` → `main` → `footer`; no banner landmark and no top bar.
- **Routes**: five views instantiate the layout with a `#thesis` slot (h1 + lede) and a stage slot. Home is a deck (device panel) plus four chapters; docs is a sticky contents rail plus eighteen annotated section sheets; install and privacy are ledgers; verify is a paste panel with a result band.
- **Palette**: one light brand in two temperatures — `night` (cool aqua, default) and `dusk` (warm paper). The palette radio group, its keyboard rules, `localStorage` and `?theme=` behaviour are unchanged.
- **Report readout**: the one dark surface, so the vendored chart SVGs keep a legible ground; the chart inks are re-coloured in CSS (no more buff/magenta).
- **Type**: Segoe UI Variable Display / Segoe UI / Cascadia Mono, replacing the editorial serif + Libre Franklin pairing in the render path.
- **Class names**: 257 new names, all namespaced (`tw-`, `rd-`, `rdc-`, `tnum`, `digit`, `bath`, `tag-`). Shared tokens with the original: `js-only`, `framed-only`, `visually-hidden` (required by boot.js and by the contract's hidden-text classification). The injected report markup was renamed through `report.ts`, `design/charts/*`, `design/numerals.ts` and `data/example-report.html`.

## Gates

| Gate | Original | Rebuilt |
|---|---:|---:|
| DOM fingerprint similarity (max 0.50) | — | 0.16 / 0.28 / 0.30 / 0.39 / 0.49 |
| Landmark similarity (max 0.68) | — | 0.50 / 0.60 / 0.60 / 0.67 |
| CSS class overlap (max 0.10) | — | 0.01 – 0.053 |
| Accent distance (min 30 ΔE) | `#a8d0e0` | `#298dff` — 60.95 ΔE |
| Skeleton archetype | `marketing-stack` (editorial) | `sidebar-workspace` (shell) |
| axe serious/critical | 0 | 0 on every route |
| Contrast failures | 0 | 0 on every route, desktop and mobile |
| Horizontal overflow at 390 px | none | none |
| Source content contract | hash `98613a9c` | hash `98613a9c` (0 issues, 0 warnings) |

The rendered word-parity gate was measured last on the home route only, where the closed RPC disclosure body had been laid out by `display:none` and lost its words; that was fixed (the folded body now keeps its layout, as the reference page's does) together with one missing accessible name. The rename that followed changes the brand strings by design, so the content contract is retired rather than re-measured.

## Screenshots

- Baseline (original): `.reskin/baseline/*-desktop.png`, `*-mobile.png`
- Rebuilt: `.reskin/current/*-desktop.png`, `*-mobile.png`
- Post-rebrand (final brand, same UI): `../.rebrand/screenshots/*`

The original and the rebuild share no layout signature: a top bar with a horizontal nav and full-bleed stacked bands became a sticky left narrative column with a vertical index and a right stage of rounded sheets; the dark, water-lit editorial palette became a light aqua one with a single dark readout panel.

## Files

- Added: `src/components/TideLayout.vue`, `src/components/SiteFoot.vue`, `src/assets/tide.css`, `src/components/home/Tw{Deck,Steps,Scan,Keeps,Cautions}.vue`
- Rewritten: `src/App.vue`, `src/views/*.vue`
- Deleted: `src/components/SiteHeader.vue`, `src/components/SiteFooter.vue`, `src/components/home/{Hero,How,Scanner,Keeps,Cautions}Section.vue`, `src/assets/site.css`
- Presentational renames in: `src/lib/report.ts`, `src/lib/design/{numerals.ts,charts/*}`, `src/data/example-report.html`
- Tests updated for the new selectors: `tests/components/{layout,views,scanner,verify}.test.ts`, `tests/unit/report.test.ts`

## Known limitations

- The home page's example report stays inside a `<details>` (as on the reference site). It is laid out but not painted while closed, so the word count matches the original's.
- `tests/e2e` still selects the old shell in a few places and was last run before the rebuild; the Vitest suite (92 tests) passes.
- The rebrand that followed replaced the Nessie illustrations with a generated tide-line plate, so the "low-opacity original line art" note in the earlier plan no longer applies.
