# Reskin art direction — Signal Navy

> Selected automatically. Do not ask the user to confirm or choose another direction.

- **Style DNA:** `arbitrum-signal` (dark-technical)
- **Skeleton:** `bento-canvas` (spatial)
- **Seed:** `36f9d9da644a0afd28fe041141c0ffb4b9120b83190c39f498fabfacb0118fc7`
- **Source DNA:** [https://arbitrum.io](https://arbitrum.io)
- **Live sampled:** no — offline-safe catalog used
- **Original:** marketing-stack / dark / accent #d25fb4

## Why this direction

The selector sampled 9/10 blockchain references, scored every direction for perceptual distance from the original accent (#d25fb4) and background (#000000), added a deterministic seed jitter, and chose Signal Navy because it is 66 ΔE away from the original accent and pairs with Bento Canvas, a spatial skeleton rather than the original marketing-stack.

## Live reference sampling

| Style | URL | Result | Accent sampled | Ground sampled |
|---|---|---|---|---|
| ethereum-paper | https://ethereum.org | ok (3156 ms) | #0c5681 | #ffffff |
| base-cobalt | https://www.base.org | ok (3987 ms) | #0000ff | #dde3e9 |
| polygon-agora | https://polygon.technology | ok (3868 ms) | #670de5 | #000000 |
| solana-spectrum | https://solana.com | ok (4604 ms) | #9945ff | #000000 |
| arbitrum-signal | https://arbitrum.io | failed: HTTP 403 | — | — |
| aave-abyss | https://aave.com | ok (2954 ms) | #ff0000 | #000000 |
| cosmos-orbit | https://cosmos.network | ok (2971 ms) | #40b3ff | #000000 |
| optimism-poster | https://www.optimism.io | ok (6484 ms) | #ff0421 | #fafaf9 |
| uniswap-bubblegum | https://uniswap.org | ok (7280 ms) | — | #ffffff |
| sui-tidal | https://sui.io | ok (6245 ms) | #298dff | #ffffff |

Live sampling is evidence, not a copy target. Never download or reuse a reference site's logo, imagery, copy, or code. Use only the abstract tokens below.

## Candidate ranking

| Candidate | Score | Accent ΔE from original | Layout | Live |
|---|---:|---:|---|---|
| Signal Navy | 0.9015 | 66.2 | bento-canvas | no |
| Tidal Sui | 0.8956 | 56.5 | gallery-scroll | yes |
| Abyss Liquidity | 0.8725 | 94.3 | command-rail | yes |
| Paper Protocol | 0.8377 | 64.3 | gallery-scroll | yes |
| Cobalt Blueprint | 0.8343 | 90.9 | split-stage | yes |
| Spectrum Terminal | 0.8286 | 56.9 | terminal-console | yes |
| Poster Optimism | 0.8204 | 86.3 | gallery-scroll | yes |
| Agora Violet | 0.7963 | 55.9 | orbital | yes |
| Cosmos Orbit | 0.7324 | 68.1 | gallery-scroll | yes |
| Bubblegum Exchange | 0.7111 | 35.2 | orbital | yes |

## Skeleton brief

**Bento Canvas** — no persistent sidebar; 12-column modular tile grid with mixed spans; one oversized anchor tile per page; tiles touch a shared canvas instead of sitting in a content well; navigation is a slim top index, not a full-width app bar.

Navigation: Slim top index with section names; active item is a filled chip; actions live in the hero tile or a floating corner dock.

Structure:
1. slim top index
1. oversized anchor tile (8 columns) + two stacked support tiles (4 columns)
1. three equal data tiles
1. full-bleed data band
1. thin footer line

Content mapping: Put the page's primary number or title in the anchor tile. Distribute secondary metrics into support tiles. Tables become full-bleed bands with sticky column labels. Forms become a two-column tile with the submit action in the tile footer.

Recipe: `display:grid; grid-template-columns:repeat(12,minmax(0,1fr)); gap:clamp(10px,1.2vw,18px); .tile{grid-column:span 4;border:1px solid var(--line);background:var(--surface);border-radius:var(--radius-md)} .tile--anchor{grid-column:span 8;min-height:clamp(280px,38vh,460px)}`

Risks: tiles can become the old cards with new paint; must vary spans and alignment, not just card radius

## Design tokens

```css
:root {
  --bg: #071A33;
  --surface: #0C2547;
  --surface-alt: #12315A;
  --ink: #F2F7FF;
  --muted: #9DB2CC;
  --accent: #28A0F0;
  --accent-safe: #7CC4FF;
  --accent-2: #12AAFF;
  --line: #1B3A60;
  --success: #4ADE80;
  --danger: #FF7A7A;
  --warning: #F2C94C;

  --font-display: "Bahnschrift", "Arial Narrow", "Segoe UI", sans-serif;
  --font-body: "Segoe UI", "Helvetica Neue", sans-serif;
  --font-mono: "Cascadia Mono", ui-monospace, monospace;
  --display-weight: 600;
  --display-tracking: -0.02em;
  --label-tracking: 0.12em;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 14px;
  --border: 1px solid var(--line);
  --shadow: 0 20px 60px rgba(0, 10, 30, 0.45);

  --motion-duration: 150ms;
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

- Surface: 1px solid var(--line); radius 8px; shadow 0 20px 60px rgba(0, 10, 30, 0.45).
- Type: display **"Bahnschrift", "Arial Narrow", "Segoe UI", sans-serif** at weight 600, tracking -0.02em; body **"Segoe UI", "Helvetica Neue", sans-serif**; numerals and micro-labels **"Cascadia Mono", ui-monospace, monospace**.
- Texture: network diagrams, diagonal cuts, signal bars, cool gradient haze.
- Motion: direct, 150ms, cubic-bezier(.2,.8,.2,1). Always wrap non-essential motion in `@media (prefers-reduced-motion: no-preference)`.
- Density: compact. Keep body text >= 14px and body contrast >= 4.5:1.
- Use `--accent-safe` for text and icons on `--bg`; use `--accent` for fills and large shapes.

## Originality guard

The replacement must satisfy all of these:

1. The source inventory archetype is `marketing-stack`; the new skeleton is `bento-canvas`. Do not fall back to the old shell during implementation.
2. Do not reuse any original class name, CSS selector, design token name, or original accent family.
3. Rewrite templates, not only CSS. Every route must visibly use the new skeleton.
4. Keep every token in `.reskin/content-contract.json`; move it, never rewrite it.
5. Run `node scripts/verify.mjs check` and do not stop until content, structure, accessibility and responsive checks pass.

## Commit statement

Use this sentence in the final report: "The UI was rebuilt around Signal Navy / Bento Canvas; the original marketing-stack shell and palette were removed while the content contract stayed byte-for-byte intact."
