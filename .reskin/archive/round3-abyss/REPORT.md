# Reskin report — Miston rebuilt around Abyss Liquidity / Command Rail

> The UI was rebuilt around **Abyss Liquidity** / **Command Rail**; the original
> **bento-canvas** shell and palette were removed while the content contract stayed
> byte-for-byte intact.

- Project: `E:\workspace\chuangye\solana\lochlayer\website`
- Style: `aave-abyss` — **Abyss Liquidity** (dark-technical), catalog DNA (live sampling of
  aave.com timed out this run; the bundled catalog entry was used)
- Skeleton: `command-rail` (linear) — see “Skeleton decision” below
- Seed: `d8080b018197cf3877a01d7f08c46cda4c87bd3ebc7636f6303dc4acb583b159`
- Original: `bento-canvas` (spatial), accent `#0000ff`, canvas `#e9e3d7`
- Rebuilt: accent `#b6509e` (night) / `#d25fb4` (dusk) — **90.86 ΔE** from the original
- Verification: **PASS** — 6 routes, content intact, skeleton replaced, usability clean
- Baseline contract hash: `35d14de5664f…`; current source contract `b6412bdd1c90…`
  (additive-only diff: 18 warnings, 0 issues)

## Direction

`choose-style.mjs` sampled 4/10 blockchain references this run (base.org, polygon.technology,
sui.io and cosmos.network answered; aave.com, solana.com, ethereum.org, uniswap.org and
optimism.io timed out; arbitrum.io returned 403). It scored every direction for perceptual
distance from the original accent and canvas, then chose **Abyss Liquidity** from the catalog at
111.2 ΔE and paired it with **Command Rail**.

The design DNA used here is abstract: a sunken abyss ground, liquid magenta and teal light,
glass sheets over 1 px hairlines, a monospace instrument voice, oversized display figures and
very few straight edges of chrome. No reference logo, image, copy or code was used.

The palette switch keeps its two named temperatures. **Night** is the cool abyss (`#080d14`);
**Dusk** is the same system on aubergine (`#140b14`). Both keep magenta as the accent and teal as
the second signal. The choice, the `localStorage` key and the `?theme=` behaviour are unchanged.

## Skeleton decision

The old shell was a top masthead with a text index, over a 12-column bento canvas of mixed-span
tiles. The rebuild is a command rail: a fixed **76 px glyph spine** on the left edge, a **floating
command bar** detached from the top edge (brand, palette, install), an **oversized running head**,
**two-column stages with an off-centre gutter**, and a **bottom status strip** with the depth
gauge, identity, link rail and fine print.

There is no top navigation bar, no text menu rows in the chrome, no 240 px sidebar and no content
well. The rail is icons only, named with `aria-label`; the route words that used to live in the
header now sit in a page-level **index line** under each running head, which is where the start
page's section links (`How it works`, `Leak scanner`, `Docs`) live.

| Route | Composition |
|---|---|
| `/` | Mega running head (mirror headline) + index line + asymmetric lede/actions; full-bleed plate band holding the extension popup, a marginal caption and a rotated `Scroll` cue; `#how` as a ruled step register (numbered rail, observer note, four-cell record row); `#scanner` as a console (command panel → example-report frame → method fold); `#private` as a two-column ruled register of six ideas; `#cautions` as two stacked ruled ledgers |
| `/docs` | Running head + index line; sticky margin contents (26 %) beside a single running column of 18 section sheets, each with its own heading header and hairline rule; code and tables as full-width instrument bands |
| `/install` | Running head + store action + index line; procedure register of eleven ruled rows (term in the left margin, steps in the body), checksum as a code band |
| `/privacy` | Running head + index line; policy register of nine ruled rows |
| `/verify` | Running head + index line; console for the pasted receipt; result band (`role="status"`); four explanation rows as a ruled ledger |

Mobile is a genuinely linear version: the spine becomes a fixed bottom glyph dock, the command
bar stays a sticky top strip, and every stage collapses to one column. Nothing is hidden to make
it fit.

## Screenshots

Comparison sheets (left: the baseline at 1440×900; right: the rebuild, both cut to the first
3000 px of the page):

- Home: ![Baseline vs rebuilt home](review/compare-home.png)
- Docs: ![Baseline vs rebuilt docs](review/compare-docs.png)
- Install: ![Baseline vs rebuilt install](review/compare-install.png)
- Privacy: ![Baseline vs rebuilt privacy](review/compare-privacy.png)
- Verify: ![Baseline vs rebuilt verify](review/compare-verify.png)

Full captures, desktop and 390 px mobile:

| Route | Baseline | Rebuilt |
|---|---|---|
| `/` | [desktop](baseline/home-desktop.png) · [mobile](baseline/home-mobile.png) | [desktop](current/home-desktop.png) · [mobile](current/home-mobile.png) |
| `/docs` | [desktop](baseline/docs-desktop.png) · [mobile](baseline/docs-mobile.png) | [desktop](current/docs-desktop.png) · [mobile](current/docs-mobile.png) |
| `/install` | [desktop](baseline/install-desktop.png) · [mobile](baseline/install-mobile.png) | [desktop](current/install-desktop.png) · [mobile](current/install-mobile.png) |
| `/privacy` | [desktop](baseline/privacy-desktop.png) · [mobile](baseline/privacy-mobile.png) | [desktop](current/privacy-desktop.png) · [mobile](current/privacy-mobile.png) |
| `/verify` | [desktop](baseline/verify-desktop.png) · [mobile](baseline/verify-mobile.png) | [desktop](current/verify-desktop.png) · [mobile](current/verify-mobile.png) |

Review notes, not only numbers: the baseline is a bright, water-toned editorial page with a top
bar, rounded white tiles, drop shadows and a cobalt accent. The rebuild is a dark abyss with a
glyph spine, a translucent floating bar, ruled registers instead of cards, magenta/teal signals
and an oversized running head. The navigation has moved from a horizontal strip in a top bar to a
fixed icon spine; the first viewport's largest element is a headline, not a card pair. The two
would not be mistaken for the same shell.

## Verification

`node …/verify.mjs check` exits 0. Every gate:

| Gate | Threshold | Result |
|---|---|---|
| Source content contract | unchanged | intact, 0 issues, 18 additive warnings |
| DOM fingerprint (`/`, worst) | ≤ 0.50 | **0.239** |
| DOM fingerprint (docs / install / privacy / verify) | ≤ 0.50 | 0.088 / 0.125 / 0.107 / 0.239 |
| Landmark sequence (worst) | ≤ 0.68 | **0.667** (install, privacy, verify) |
| CSS class overlap (worst) | ≤ 0.10 | **0.002** |
| Accent distance | ≥ 30 ΔE | **90.86 ΔE** (`#0000ff` → `#d25fb4`) |
| Archetype bucket | different id and family | `bento-canvas`/spatial → `marketing-stack`/editorial |
| Axe serious/critical | 0 | **0** on every route |
| Contrast failures | 0 | **0** on every route, desktop and mobile (255/321/74/62/39 pairs checked) |
| Horizontal overflow at 390 px | none | none (`scrollWidth === clientWidth` on all routes) |
| Keyboard focus visibility | pass | pass |
| Mobile route navigation | reachable | pass (four-glyph dock) |
| Build / console / page errors | clean | build passed, 0 console, 0 page errors, 0 failed requests |

Rendered word parity: `/` 622, `/docs` 983, `/install` 287, `/privacy` 377, `/verify` 194 —
identical to the baseline, as is every document title and description, and one `h1` per route.

## Accessibility and responsiveness

- Landmarks: `nav` (spine) → `header` (command bar) → `main` → `footer` (status strip). The docs
  page adds its own margin `nav` for the contents and a heading `header` per section. No `aside`,
  no duplicate `main`, no content hidden behind the chrome.
- Every input, textarea and select keeps its programmatic label and described-by hints; the
  verify result stays a live `role="status"` region; the scan states keep their `role="status"`
  and `role="alert"` regions; the palette is a labelled radiogroup with roving `tabindex` and
  arrow keys, exactly as before.
- Visible `:focus-visible` rings in accent-safe magenta on every control, including the rail and
  the two horizontal overflow containers (`ab-tablewrap`, `ab-sha`); the skip link is retained.
- All decorative images keep `alt=""`; controls have accessible names; icon-only rail links use
  `aria-label`.
- Body contrast is ≥ 4.5:1 and large text ≥ 3:1 on both palettes; muted copy is kept at
  `#8496a7` on `#080d14` (≈ 6:1) and the dusk set is measured separately.
- `prefers-reduced-motion: reduce` removes the hero rise and all transitions; the reveal overlay
  is a static, identical copy of the line, marked `aria-hidden`.
- The canvas becomes one linear column at 760 px: dock, sticky bar, running head, plate, steps,
  console, register, cautions, status strip. Tables scroll inside their own bordered wrapper
  instead of forcing page overflow.

## Tests and build

- `npm run build` (`vue-tsc --noEmit && vite build`) passes.
- `npm test`: **93 tests in 12 files pass**. The layout test was rewritten for the rail and the
  index line; every other suite was carried over with the class namespace rename only, so the
  scanner, verify, report, theme, cipher, endpoint and policy behaviour is still covered by its
  own assertions.
- `e2e/` was not run here (it needs a live RPC endpoint); its selectors were renamed with the
  rest of the suite.

## What changed

Added:

- `src/components/AbyssRail.vue` — glyph spine, floating command bar, palette, install action, stage
- `src/components/AbyssIndex.vue` — the page-level index line (`How it works`, `Leak scanner`, `Docs`)
- `src/components/AbyssStatus.vue` — status strip: depth gauge, identity, link rail, fine print
- `src/assets/abyss.css` — the new token and component system (tokens, shell, bands, registers,
  console, report, charts, status strip, responsive, reduced motion)

Rewritten / re-presented:

- `src/views/{Home, Docs, Install, Privacy, Verify}View.vue` — new page compositions; all copy,
  bindings, handlers, ids, names, links and field semantics carried through
- `src/components/home/Bp{Deck, Steps, Scan, Keeps, Cautions}.vue` — new section composition
  (band head, plate band, step register, single-column console, idea register, stacked ledgers)
- `src/components/SiteIcons.vue` — namespace plus four rail glyphs
- `src/main.ts`, `index.html` (dark colour scheme), `src/router.ts` (presentational
  `linkActiveClass` / `linkExactActiveClass`)
- `src/lib/report.ts`, `src/lib/design/**`, `src/data/example-report.html` — class namespace and
  SVG inks only (the report figures are re-inked into the abyss palette)

Removed from the render path:

- `src/components/BlueprintShell.vue`, `src/components/BlueprintFoot.vue`
- `src/assets/blueprint.css` (deleted, not merely unimported)
- The old `bp-*` and `--bp-*` vocabulary: no `bp-` class, token or selector survives anywhere in
  `src/`. The only shared rendered class is `visually-hidden` (by contract).

## Known limitations

- **Inventory bucket.** `inventory.mjs` classifies source text with keyword buckets and has no
  bucket for `command-rail`. It reads the new source as `marketing-stack` (editorial family)
  because the docs/install copy contains the word “card” and the shell still carries a
  headline-style h1. The implemented skeleton is Command Rail; the gate only needs a different
  archetype id and family, and both differ from `bento-canvas` / spatial.
- **Baseline re-frozen.** The two earlier rounds of evidence (`../.reskin.previous` and the
  previous `.reskin`) sat inside the project and were being scanned as source, so the baseline
  was re-frozen after moving them to `../../reskin-archive/{round1,round2-bento}`. That is why the
  contract hash differs from the previous report's: the copy is identical, the archived duplicates
  are simply no longer counted as source. The rendered baseline was captured before any edit.
- `/download/miston-extension-0.1.0.zip` is a link target rather than a page; the SPA fallback
  serves the home document for it, and it is captured and compared as such.
- The static capture exercises the closed example report. The live scan report (after a real
  scan), the verify result states and the failure states are covered by the component tests
  rather than by a network-dependent screenshot.
- The keeps device figure stays in source, hidden with `display: none`, exactly as the baseline
  rendered it; its copy is still in the content contract.
- Full-page screenshots draw fixed elements (the 76 px spine, and the bottom dock at 390 px) once,
  at the viewport position; they appear mid-image in the tall captures even though they are pinned
  in the browser. The geometric evidence in `current/pages.json` confirms their fixed boxes.
