# Reskin inventory — enclaven-website

Generated: 2026-11-09T18:05:55.738Z

## Project

| Field | Value |
|---|---|
| Root | `E:/workspace/chuangye/solana/lochlayer/website` |
| Vue | ^3.5.44 |
| Package manager | pnpm |
| Nuxt | no |
| CSS frameworks | none detected |
| Files scanned | 66 (15 SFCs) |

## Original skeleton

- Archetype: **bento-canvas** (spatial)
- Traits: cards, hero, table, grid, tabs, modal, charts, sticky, terminal, bento
- Max template depth: 10
- Top-level tags: siteicons, a, signaltop, main, signalfoot, footer, nav, header, svg, section, figure, section, section, section, header, nav, article, section, signaldeck, signalsteps, signalscan, signalkeeps, signalcautions, header, div, section, section, section, section, section, section, section, section, section, section, section, p, header, section, section, section, section, section, section, section, section, section, p, header, div, div, p

The replacement skeleton must not be `bento-canvas` and must not be in the same family (`spatial`).

## Routes

- `/`
- `/docs`
- `/download/enclaven-extension-0.1.0.zip`
- `/install`
- `/privacy`
- `/verify`

## Palette (most used first)

`#04101f` (9) · `#0c2547` (8) · `#12315a` (8) · `#000000` (6) · `#04121f` (5) · `#7cc4ff` (4) · `#28a0f0` (3) · `#071a33` (2) · `#000a1e` (1) · `#060d1a` (1)

## Content lock

- Static visible text tokens: **735**
- Binding expressions: **42**
- Event handlers: **14**
- Contract hash: `c4ec5c7ba558322921cd7a3d0b92dad7b917668c7f5894e91b4d34cd1f581bb9`

Everything in `.reskin/content-contract.json` is immutable: visible copy, placeholders, labels, routes, link targets, asset sources, bindings, handlers, API endpoints and i18n values. A reskin may move these tokens to new markup but may not rewrite, remove or hide them.

## Next

```bash
node scripts/choose-style.mjs --project "E:/workspace/chuangye/solana/lochlayer/website" --out .reskin
node scripts/verify.mjs baseline --project "E:/workspace/chuangye/solana/lochlayer/website" --out .reskin
```

Then rewrite the UI and run `verify.mjs check`.
