# Wireframe commitment — Cobalt Blueprint / Bento Canvas

The selector chose **Cobalt Blueprint** (`base-cobalt`, live from <https://www.base.org>) and proposed
`split-stage`. `split-stage` is the **same composition the baseline already has** (a sticky
left narrative column beside a scrolling stage, i.e. the `aside` + 90 px gutter measured at
1440×900). Reusing it would fail both the “skeleton must change” rule and the landmark gate, so
the direction is kept and the skeleton is taken from the same style’s first layout affinity:
**Bento Canvas** (`bento-canvas`, spatial). No style token changes.

## Shell

New shell: `BlueprintShell.vue` + `BlueprintFoot.vue`.

```
header.bp-masthead        ← banner landmark, 1px hairline base, no sidebar
  a.bp-masthead__brand    ← crest + wordmark
  nav.bp-index            ← slim top index: How it works · Leak scanner · Docs
  div.bp-tools            ← Dusk/Night radiogroup + Install CTA
main#main.bp-canvas       ← 12-column bento grid, full-bleed canvas
footer.bp-foot            ← thin footer line with nav.bp-foot__links
```

Landmarks in DOM order: `header` → `nav` → `main` → `footer` → `nav`. The old `aside` narrative
column, vertical index and sticky thesis panel are gone. Mobile becomes one linear column; the
top index stays reachable as a horizontal rail (no second hidden menu, no duplicated copy).

## Route → bento map

| Route | Anchor tile | Support / bands |
|---|---|---|
| `/` | hero (h1 + lede + actions + note) spans 5 | device deck spans 7; steps band (3 × 4 cols); scanner form 7 + disclosure 5, readout 12; six “keeps” tiles 4 × 2 rows; cautions 7 + commitments 5 |
| `/docs` | masthead h1 + lede spans 8 | contents index tile spans 4; notice band 12; eighteen section sheets 12 / 6 / 6 with wide sheets for tables and code; closing back tile |
| `/install` | masthead h1 + lede spans 8 | Add-to-Chrome tile spans 4; eleven ledger rows as 6-col step tiles (last row 12); back tile |
| `/privacy` | masthead spans 12 | nine policy rows as 6-col tiles; back tile |
| `/verify` | form spans 7 (anchor) | thesis spans 5; result band 12; four explanation rows as 6-col tiles; back tile |

## Content handling

No copy is retyped. Existing blocks are moved as whole nodes; every `{{ }}`, `v-model`,
`@click`, `:aria-*`, `id`, `name`, `href`, `to`, `src` and conditional branch is kept. The
`#thesis` slot disappears: each view carries its own `h1` inside `main` instead of the old aside.
Only presentational wrappers and class names change. Accessibility-only names may be adjusted
where the old name described the old shape; none adds visible text.

## Removed / kept

- Deleted from the render path: `MistonLayout.vue`, `SiteFoot.vue`, `assets/miston.css`, the
  `Tw*` home components (replaced by `Bp*` components), the old `tw-*` / `rd-*` / `rdc-*`
  class names and every old CSS token.
- Kept as content-only children: the device popup markup, the docs section bodies, the install
  and privacy ledgers, the verify result markup, the pre-rendered example report markup and the
  generated live report markup. Their class names are renamed to the new namespace, nothing else.

## Tokens and breakpoints

`src/assets/blueprint.css`: `--bp-canvas #dde3e9`, `--bp-surface #ffffff`, `--bp-ink #0a0b0d`,
`--bp-muted #5f6368`, `--bp-accent #0000ff`, `--bp-line #e2e2dc`, hairline 1px rules, radius
2/6/10px (not the old 22/36px pills), mono micro-labels. Breakpoints at 1180px (grid 6),
820px (linear), 520px (compact); no horizontal page overflow at 390px.
