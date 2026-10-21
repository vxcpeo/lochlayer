# Wiring plan — Tidal Sui / Split Stage

Committed direction (from `.reskin/style.json`). Nothing below is optional.

## Shell

- New shell: `src/components/TideLayout.vue` (`TideLayout`) — the only route layout.
- Old shell `src/components/SiteHeader.vue` is deleted; `src/assets/site.css` is deleted; new tokens live in `src/assets/tide.css`.
- `App.vue` renders `SiteIcons`, the skip link and `RouterView` only. Every view instantiates `TideLayout` with two slots:
  - `#thesis` — the page's `h1` and lede, in the sticky narrative column;
  - default — the scrolling stage.
- Landmarks, in DOM order: `aside` (narrative column) → `nav` (route index) → `main` → `footer`.
  No top bar and no banner landmark: the original `header > nav + main + footer` silhouette is gone.
- Mobile: one linear column — crest and a horizontally scrollable index strip, then the thesis,
  then the stage, then the footer. The split is never reproduced on small screens.

## Route → composition

| Route | Narrative column (slot `#thesis`) | Stage (default slot) |
|---|---|---|
| `/` | `h1` (Your wallet is public. / The Loch is not.), lede, Add to Chrome + scan link, caution line | `TwDeck` (device panel over the nessie plate) → `TwSteps` ledger → `TwScan` panel (form + readout) → `TwKeeps` rows → `TwCautions` ledger |
| `/docs` | `h1`, lede | status callout → contents rail (own nav is *not* a landmark: it is a `div`) → 18 annotated section panels, tables and code as ledger sheets |
| `/install` | `h1`, lede, Add to Chrome | ledger of the ten install steps, download sheet with checksum |
| `/privacy` | `h1`, lede | one ledger, one row per promise |
| `/verify` | `h1`, lede | paste panel with the check form, result band, and the three what-it-means rows |

## Content movement rules used while rebuilding

- Every text node, content attribute, binding, handler and asset keeps its exact value and count.
  Text is moved into new elements, never retyped.
- The wallet popup markup stays duplicated (hero + keeps), exactly as in the source, because the
  content contract counts both copies. The keeps copy keeps the `display:none` treatment at
  desktop widths so the rendered word counts still match the baseline.
- The example report fragment is injected unchanged except for renamed presentation classes.
- `visually-hidden` is kept as a utility name because the contract classifies those strings as
  hidden text.

## Tokens and breakpoints

- Tokens: `--t-*` in `src/assets/tide.css`. Accent `#298dff` (`--t-accent`); ground `#f1f7ff`;
  ink `#081b2b`; the readout panel is the only dark surface (`--t-deep` `#061b29`) and it exists
  to carry the chart inks, which are re-coloured in CSS.
- Two palettes, same light brand, different temperature: `night` (cool aqua, default) and `dusk`
  (warm paper). The palette switch keeps its radio-group semantics and its saved preference.
- Breakpoints: `68rem` (split → linear), `48rem` (stage padding and two-column rows collapse),
  `30rem` (buttons full width).
- No `content:` strings with words, no new visible copy, in CSS or markup.
