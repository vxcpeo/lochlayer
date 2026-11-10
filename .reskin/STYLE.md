# Reskin art direction — Cobalt Blueprint

> Selected automatically. Do not ask the user to confirm or choose another direction.

- **Style DNA:** `base-cobalt` (optimistic-modern)
- **Skeleton:** `command-rail` (linear)
- **Seed:** `213a6ccae06bf5b5fbef6146a364dbccae7e0154404ef142a4867296f3929c8e`
- **Source DNA:** [https://www.base.org](https://www.base.org)
- **Live sampled:** yes — https://www.base.org (1206 ms)
- **Original:** bento-canvas / dark / accent #1f8fe0

## Why this direction

The selector sampled 8/10 blockchain references, scored every direction for perceptual distance from the original accent (#1f8fe0) and background (#0b1428), added a deterministic seed jitter, and chose Cobalt Blueprint because it is 102 ΔE away from the original accent and pairs with Command Rail, a linear skeleton rather than the original bento-canvas.

## Live reference sampling

| Style | URL | Result | Accent sampled | Ground sampled |
|---|---|---|---|---|
| solana-spectrum | https://solana.com | failed: HTTP 429 | — | — |
| ethereum-paper | https://ethereum.org | ok (745 ms) | #0c5681 | #ffffff |
| base-cobalt | https://www.base.org | ok (1206 ms) | #0000ff | #dde3e9 |
| polygon-agora | https://polygon.technology | ok (1168 ms) | #670de5 | #000000 |
| arbitrum-signal | https://arbitrum.io | failed: HTTP 403 | — | — |
| uniswap-bubblegum | https://uniswap.org | ok (1431 ms) | — | #ffffff |
| aave-abyss | https://aave.com | ok (1160 ms) | #ff0000 | #000000 |
| cosmos-orbit | https://cosmos.network | ok (1562 ms) | #40b3ff | #000000 |
| optimism-poster | https://www.optimism.io | ok (2922 ms) | #ff0421 | #fafaf9 |
| sui-tidal | https://sui.io | ok (1340 ms) | #298dff | #ffffff |

Live sampling is evidence, not a copy target. Never download or reuse a reference site's logo, imagery, copy, or code. Use only the abstract tokens below.

## Candidate ranking

| Candidate | Score | Accent ΔE from original | Layout | Live |
|---|---:|---:|---|---|
| Cobalt Blueprint | 0.9023 | 102.3 | command-rail | yes |
| Poster Optimism | 0.8934 | 132.8 | ticker-stage | yes |
| Agora Violet | 0.8149 | 76.5 | documentary | yes |
| Abyss Liquidity | 0.768 | 142.1 | command-rail | yes |
| Paper Protocol | 0.736 | 30.1 | documentary | yes |
| Bubblegum Exchange | 0.6246 | 89.7 | orbital | yes |
| Spectrum Terminal | 0.5912 | 36.8 | terminal-console | no |
| Signal Navy | 0.5239 | 24.2 | command-rail | no |
| Tidal Sui | 0.4802 | 25.7 | split-stage | yes |
| Cosmos Orbit | 0.445 | 14.3 | documentary | yes |

## Skeleton brief

**Command Rail** — 72-84px icon-only rail on one edge; floating command bar detached from the top edge; content is full-bleed with an asymmetric left margin; page title is set as a large running head, not a toolbar label; rail uses glyphs and rotated micro-labels instead of text menu rows.

Navigation: Icon rail with accessible names and a command bar (search + primary action). The rail is visually a spine, not a sidebar: no logo block, no long labels, no 240px panel.

Structure:
1. fixed 76px glyph rail
1. floating command bar offset 24px from the top
1. oversized running head
1. two-column data stage with an off-center gutter
1. bottom status strip

Content mapping: Keep every route label as the accessible name of a rail glyph and as the running head. Put page actions in the command bar. Main data gets the wide column; secondary data gets a narrow marginal column.

Recipe: `body{padding-left:76px}.rail{position:fixed;inset:0 auto 0 0;width:76px;display:flex;flex-direction:column;align-items:center;gap:12px}.command{position:sticky;top:18px;margin:18px 24px 0;display:flex;gap:12px;border:1px solid var(--line);border-radius:var(--radius-lg);backdrop-filter:blur(16px)}.stage{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(260px,.45fr);gap:clamp(24px,4vw,64px)}`

Risks: a 240px labelled sidebar is the old skeleton in disguise; rail icons need visible focus and accessible names

## Design tokens

```css
:root {
  --bg: #dde3e9;
  --surface: #FFFFFF;
  --surface-alt: #EFEFEA;
  --ink: #0A0B0D;
  --muted: #6F6F6F;
  --accent: #0000ff;
  --accent-safe: #0000ff;
  --accent-2: #7575FF;
  --line: #E2E2DC;
  --success: #00875A;
  --danger: #C4320A;
  --warning: #9A6700;

  --font-display: "Inter Tight", "Segoe UI", system-ui, sans-serif;
  --font-body: "Inter", "Segoe UI", system-ui, sans-serif;
  --font-mono: "Geist Mono", "Cascadia Mono", ui-monospace, monospace;
  --display-weight: 620;
  --display-tracking: -0.035em;
  --label-tracking: 0.08em;

  --radius-sm: 10px;
  --radius-md: 18px;
  --radius-lg: 30px;
  --border: 1px solid var(--line);
  --shadow: 0 24px 60px rgba(10, 11, 13, 0.08);

  --motion-duration: 170ms;
  --motion-ease: cubic-bezier(.2,.8,.2,1);
  --space-1: clamp(4px, .35vw, 6px);
  --space-2: clamp(8px, .7vw, 12px);
  --space-3: clamp(14px, 1.2vw, 20px);
  --space-4: clamp(22px, 2vw, 32px);
  --space-5: clamp(36px, 3.4vw, 56px);
  --space-6: clamp(56px, 5vw, 88px);
  --page-pad: clamp(18px, 4vw, 64px);
  --max-width: 1440px;
}
```

## Component grammar

- Surface: 1px solid var(--line); radius 18px; shadow 0 24px 60px rgba(10, 11, 13, 0.08).
- Type: display **"Inter Tight", "Segoe UI", system-ui, sans-serif** at weight 620, tracking -0.035em; body **"Inter", "Segoe UI", system-ui, sans-serif**; numerals and micro-labels **"Geist Mono", "Cascadia Mono", ui-monospace, monospace**.
- Texture: blueprint hairlines, cobalt focus rings, monochrome diagrams, large numeric counters.
- Motion: crisp, 170ms, cubic-bezier(.2,.8,.2,1). Always wrap non-essential motion in `@media (prefers-reduced-motion: no-preference)`.
- Density: airy. Keep body text >= 14px and body contrast >= 4.5:1.
- Use `--accent-safe` for text and icons on `--bg`; use `--accent` for fills and large shapes.

## Originality guard

The replacement must satisfy all of these:

1. The source inventory archetype is `bento-canvas`; the new skeleton is `command-rail`. Do not fall back to the old shell during implementation.
2. Do not reuse any original class name, CSS selector, design token name, or original accent family.
3. Rewrite templates, not only CSS. Every route must visibly use the new skeleton.
4. Keep every token in `.reskin/content-contract.json`; move it, never rewrite it.
5. Run `node scripts/verify.mjs check` and do not stop until content, structure, accessibility and responsive checks pass.

## Commit statement

Use this sentence in the final report: "The UI was rebuilt around Cobalt Blueprint / Command Rail; the original bento-canvas shell and palette were removed while the content contract stayed byte-for-byte intact."
