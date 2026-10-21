# Reskin art direction — Abyss Liquidity

> Selected automatically. Do not ask the user to confirm or choose another direction.

- **Style DNA:** `aave-abyss` (dark-technical)
- **Skeleton:** `command-rail` (linear)
- **Seed:** `d8080b018197cf3877a01d7f08c46cda4c87bd3ebc7636f6303dc4acb583b159`
- **Source DNA:** [https://aave.com](https://aave.com)
- **Live sampled:** no — offline-safe catalog used
- **Original:** bento-canvas / light / accent #0000ff

## Why this direction

The selector sampled 4/10 blockchain references, scored every direction for perceptual distance from the original accent (#0000ff) and background (#e9e3d7), added a deterministic seed jitter, and chose Abyss Liquidity because it is 111 ΔE away from the original accent and pairs with Command Rail, a linear skeleton rather than the original bento-canvas.

## Live reference sampling

| Style | URL | Result | Accent sampled | Ground sampled |
|---|---|---|---|---|
| base-cobalt | https://www.base.org | ok (2226 ms) | #0000ff | #dde3e9 |
| polygon-agora | https://polygon.technology | ok (3814 ms) | #670de5 | #000000 |
| solana-spectrum | https://solana.com | failed: timeout | — | — |
| ethereum-paper | https://ethereum.org | failed: timeout | — | — |
| aave-abyss | https://aave.com | failed: fetch failed | — | — |
| arbitrum-signal | https://arbitrum.io | failed: HTTP 403 | — | — |
| optimism-poster | https://www.optimism.io | failed: timeout | — | — |
| sui-tidal | https://sui.io | ok (2677 ms) | #298dff | #ffffff |
| uniswap-bubblegum | https://uniswap.org | failed: timeout | — | — |
| cosmos-orbit | https://cosmos.network | ok (5362 ms) | #40b3ff | #000000 |

Live sampling is evidence, not a copy target. Never download or reuse a reference site's logo, imagery, copy, or code. Use only the abstract tokens below.

## Candidate ranking

| Candidate | Score | Accent ΔE from original | Layout | Live |
|---|---:|---:|---|---|
| Abyss Liquidity | 0.925 | 111.2 | command-rail | no |
| Signal Navy | 0.9039 | 120.4 | command-rail | no |
| Cosmos Orbit | 0.8907 | 112.4 | documentary | yes |
| Spectrum Terminal | 0.8119 | 90.1 | ticker-stage | no |
| Poster Optimism | 0.8094 | 149.7 | documentary | no |
| Agora Violet | 0.7476 | 36.7 | documentary | yes |
| Paper Protocol | 0.7155 | 73.7 | documentary | no |
| Tidal Sui | 0.6425 | 76.8 | gallery-scroll | yes |
| Bubblegum Exchange | 0.5847 | 113.7 | split-stage | no |
| Cobalt Blueprint | 0.3369 | 0 | command-rail | yes |

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
  --bg: #080D14;
  --surface: #111A24;
  --surface-alt: #182533;
  --ink: #F4F7FA;
  --muted: #8FA3B5;
  --accent: #B6509E;
  --accent-safe: #E3A6DA;
  --accent-2: #2EBAC6;
  --line: #1E2A36;
  --success: #5CE1A0;
  --danger: #FF7A7A;
  --warning: #F2C94C;

  --font-display: "Trebuchet MS", "Segoe UI", sans-serif;
  --font-body: "Segoe UI", "Helvetica Neue", sans-serif;
  --font-mono: "Cascadia Mono", ui-monospace, monospace;
  --display-weight: 650;
  --display-tracking: -0.035em;
  --label-tracking: 0.1em;

  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --border: 1px solid rgba(143, 163, 181, 0.18);
  --shadow: 0 26px 70px rgba(0, 0, 0, 0.5);

  --motion-duration: 240ms;
  --motion-ease: cubic-bezier(.22,1,.36,1);
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

- Surface: 1px solid rgba(143, 163, 181, 0.18); radius 16px; shadow 0 26px 70px rgba(0, 0, 0, 0.5).
- Type: display **"Trebuchet MS", "Segoe UI", sans-serif** at weight 650, tracking -0.035em; body **"Segoe UI", "Helvetica Neue", sans-serif**; numerals and micro-labels **"Cascadia Mono", ui-monospace, monospace**.
- Texture: liquid glass, teal-magenta glow, fine grid, data sparklines.
- Motion: fluid, 240ms, cubic-bezier(.22,1,.36,1). Always wrap non-essential motion in `@media (prefers-reduced-motion: no-preference)`.
- Density: comfortable. Keep body text >= 14px and body contrast >= 4.5:1.
- Use `--accent-safe` for text and icons on `--bg`; use `--accent` for fills and large shapes.

## Originality guard

The replacement must satisfy all of these:

1. The source inventory archetype is `bento-canvas`; the new skeleton is `command-rail`. Do not fall back to the old shell during implementation.
2. Do not reuse any original class name, CSS selector, design token name, or original accent family.
3. Rewrite templates, not only CSS. Every route must visibly use the new skeleton.
4. Keep every token in `.reskin/content-contract.json`; move it, never rewrite it.
5. Run `node scripts/verify.mjs check` and do not stop until content, structure, accessibility and responsive checks pass.

## Commit statement

Use this sentence in the final report: "The UI was rebuilt around Abyss Liquidity / Command Rail; the original bento-canvas shell and palette were removed while the content contract stayed byte-for-byte intact."
