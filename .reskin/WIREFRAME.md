# Wireframe commitment — Abyss Liquidity / Command Rail

Selected automatically by `choose-style.mjs` (seed `d8080b01…`). This file is the
commitment every route must honour. No route may fall back to the old
`bento-canvas` shell (masthead bar + slim index + mixed-span tiles).

## Shell

New shell: `src/components/AbyssRail.vue` (with `AbyssIndex.vue`, `AbyssStatus.vue`).

```
body > div#app
  nav.ab-rail                fixed 76px glyph spine, icon-only, aria-labels
  div.ab-column
    header.ab-command        floating command bar: brand, palette, install
    main#main.ab-stage       page: header.ab-runhead + bands
    footer.ab-status         bottom status strip
```

- Landmark order: `nav` → `header` → `main` → `footer`. The old order was
  `header` → `nav` → `main` → `footer` → `nav`; the footer `<nav>` is retired.
- The rail is the route navigation. On mobile it becomes a fixed bottom docks
  strip; the command bar stays a sticky top strip.
- `AbyssIndex.vue` is the page-level index line (`How it works`, `Leak scanner`,
  `Docs`) placed at the top of every route's content, under the running head.
  It carries the same `RouterLink` targets and `aria-current` as the old header
  index, which is the only way to keep those three labels in the content set
  without re-creating the old top nav.

## Route mapping

| Route | Composition |
|---|---|
| `/` | Running head (h1 mirror + lede + actions + note + index line); full-bleed plate band holding the device popup and its caption; `#how` as a numbered step register (3 rows, wide/narrow gutter); `#scanner` as a command console (command line + two-column status/method band + full-bleed readout); `#private` as a six-cell register (2 × 3, ruled, no cards); `#cautions` as two ruled ledgers (alarm + commitments) |
| `/docs` | Running head + index line; two-column stage: sticky margin contents (left, narrow) + running column of 18 section sheets (right, wide, rules between) |
| `/install` | Running head + action panel + index line; procedure register: one ruled row per step (term in a 3-column margin, def in the body), checksum in a full-width code band |
| `/privacy` | Running head + index line; policy register as a ruled definition ledger, terms in the left margin, one rule between rows |
| `/verify` | Running head + index line; console form (full-width command line, textarea, submit in the bar footer); result band (`role="status"`); four explanation rows as a ruled ledger |

## Class and token namespaces

- Classes: `ab-*` (renamed from every `bp-*` token, plus new shell classes).
- CSS custom properties: `--abyss-*`; no `--bp-*` token survives.
- Stylesheet: `src/assets/abyss.css` (replaces `blueprint.css`, which is deleted).
- Router link classes: `ab-route--active` / `ab-route--exact`.

## Kept vs deleted

Deleted from the render path (files removed):

- `src/components/BlueprintShell.vue`, `src/components/BlueprintFoot.vue`
- `src/assets/blueprint.css`

Kept as content-only children, re-presented:

- `src/components/home/Bp{Deck,Steps,Scan,Keeps,Cautions}.vue`
- `src/components/SiteIcons.vue` (class namespace and new rail glyph symbols only)

The keeps device figure stays in source, hidden with `display: none`, exactly as
the baseline rendered it (its words are not painted in the baseline either).

## Breakpoints

- `>= 1180px`: 76px rail + command bar + two-column stages.
- `760–1179px`: rail stays, stages become a single column, index line wraps.
- `< 760px`: rail is a bottom dock, command bar is sticky, everything linear.
