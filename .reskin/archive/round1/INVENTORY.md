# Reskin inventory — loch-website

Generated: 2026-10-19T16:30:30.399Z

## Project

| Field | Value |
|---|---|
| Root | `E:/workspace/chuangye/solana/lochlayer/website` |
| Vue | ^3.5.44 |
| Package manager | npm |
| Nuxt | no |
| CSS frameworks | none detected |
| Files scanned | 64 (14 SFCs) |

## Original skeleton

- Archetype: **marketing-stack** (editorial)
- Traits: cards, hero, table, grid, tabs, modal, charts, sticky
- Max template depth: 11
- Top-level tags: siteicons, a, siteheader, main, sitefooter, footer, header, svg, section, section, section, section, section, div, hr, div, herosection, howsection, scannersection, keepssection, cautionssection, div, hr, div, div, hr, div, div, hr, div

The replacement skeleton must not be `marketing-stack` and must not be in the same family (`editorial`).

## Routes

- `/`
- `/docs`
- `/download/loch-extension-0.1.0.zip`
- `/install`
- `/privacy`
- `/verify`

## Palette (most used first)

`#000000` (19) · `#a8d0e0` (5) · `#050f15` (4) · `#0b1820` (4) · `#e4d8b4` (4) · `#e58abb` (2) · `#000a10` (1) · `#08161e` (1) · `#0a1420` (1) · `#0a1d27` (1)

## Content lock

- Static visible text tokens: **740**
- Binding expressions: **42**
- Event handlers: **14**
- Contract hash: `98613a9ccf963bfb9866153d2d67b2ac9eee056d5ca88b7d0ccf82623de137f6`

Everything in `.reskin/content-contract.json` is immutable: visible copy, placeholders, labels, routes, link targets, asset sources, bindings, handlers, API endpoints and i18n values. A reskin may move these tokens to new markup but may not rewrite, remove or hide them.

## Next

```bash
node scripts/choose-style.mjs --project "E:/workspace/chuangye/solana/lochlayer/website" --out .reskin
node scripts/verify.mjs baseline --project "E:/workspace/chuangye/solana/lochlayer/website" --out .reskin
```

Then rewrite the UI and run `verify.mjs check`.
