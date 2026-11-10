# Wireframe — Cobalt Blueprint / Command Rail

Committed before any template edit. The selected direction is `base-cobalt` (optimistic-modern)
with the `command-rail` skeleton; the old shell was `bento-canvas` (spatial). Everything below is
presentation only: every word, attribute, binding, handler, route, id and media source is moved,
never rewritten.

## 1. New shell

```
<nav class="cb-spine">                 fixed 96 px glyph rail, left edge, full height
  4 route glyphs (Docs, Install, Privacy, Check a receipt) — aria-labels kept
    ↑ mark at top, palette stays in the bar
</nav>
<div class="cb-shell">
  <header class="cb-bar">              floating pill command bar, detached from the top edge
    brand link (mark + "Enclaven")
    section links (How it works · Leak scanner · Docs) — plain list, not a second nav landmark
    palette radiogroup (Dusk / Night)  +  Install CTA
  </header>
  <main id="main" class="cb-main">
    <RouterView />                     each route renders a fragment
  </main>
  <footer class="cb-status">           bottom status strip (brand, links, fine print, token)
</div>
```

- The 76 px icon spine of the *first* rebuild generation does not return as a labelled sidebar:
  the rail carries glyphs only, the brand and every word live in the command bar and the strip.
- Landmark sequence becomes `nav → header → main → footer` (docs adds its outline `nav`), which is
  a different order and depth from the old `header → nav → main → nav → footer`.
- Mobile: the rail becomes a fixed bottom dock (44 px targets), the bar collapses to brand +
  Install and the section links scroll horizontally; nothing is hidden.

## 2. Route compositions

| Route | Composition |
|---|---|
| `/` | Full-bleed running head (h1 oversize, lede, hero actions, v0.1 note) → asymmetric stage: left wide column holds the three-step chapter, right margin holds the extension popup figure (sticky) → full-width scanner chapter (console sheet + status margin, example report sheet below) → ideas chapter as a ruled two-column index → cautions/commitments as two ruled registers |
| `/docs` | Running head → two-column article stage: wide prose column (18 sheet sections) + sticky right margin for the "On this page" outline |
| `/install` | Running head → procedure register (numbered field-manual rows, hairline rules) with a sticky right margin holding the "Coming soon" panel and the "Or load it by hand" download panel; the checksum row spans full width |
| `/privacy` | Running head → policy ledger: each section is a ruled row with its heading in a narrow term column and the paragraphs in the wide column; the scanner and extension entries span both |
| `/verify` | Running head → console sheet (form + live result) in the wide column + margin column of four explanation sheets → back action |

## 3. Components: kept as content children vs deleted

Deleted from the render path:

- `SignalTop.vue`, `SignalIndex.vue`, `SignalFoot.vue` (the bento shell)
- the `sn-*` class vocabulary, `signal.css`, `signal-report.css`

Kept, renamed and re-presented (logic untouched):

- `home/SignalDeck.vue` → `home/PopupFigure.vue`
- `home/SignalSteps.vue` → `home/StepsChapter.vue`
- `home/SignalScan.vue` → `home/ScanChapter.vue`
- `home/SignalKeeps.vue` → `home/IdeasChapter.vue`
- `home/SignalCautions.vue` → `home/RegistersChapter.vue`
- `SiteIcons.vue` (sprite), all `lib/**` logic, `data/example-report.html`

New presentational components: `CobaltRail.vue`, `CobaltBar.vue`, `CobaltStatus.vue`.

## 4. Tokens, type, breakpoints

- `src/styles/cobalt.css` — tokens (`--bg #dde3e9`, `--surface #fff`, `--ink #0a0b0d`,
  `--muted #6f6f6f`, `--accent #0000ff`, `--accent-safe #0000ff`, `--line #e2e2dc`), reset, rail,
  command bar, running head, stage grid, panels/sheets, registers, forms, console, device popup,
  strip, responsive rules. `[data-theme="night"]` is the deep cobalt-navy variant of the same skin.
- `src/styles/cobalt-report.css` — the leak report and chart ink on the same palette.
- Type: Libre Franklin (local woff2, already in `public/media`) for display and body, Cascadia
  Mono for instrument labels; no third-party fonts.
- Breakpoints: 1080 px (rail stays, stage becomes one column), 720 px (rail becomes bottom dock,
  margin columns stack below their lead column, type scale drops).

## 5. Content-lock rules for the build

Every token in `.reskin/content-contract.json` stays byte-identical and at the same multiplicity:
visible copy, `placeholder`/`alt`/`title`/`name`/`href`, `v-model` bindings, handlers, form fields,
`role`/`aria-describedby` wiring. Only element wrapping, class names, order and CSS change. No new
visible or screen-reader copy; no numbers added.
