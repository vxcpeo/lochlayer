# Reskin inventory — velaira-website

Generated: 2026-10-21T17:00:37.888Z

## Project

| Field | Value |
|---|---|
| Root | `E:/workspace/chuangye/solana/lochlayer/website` |
| Vue | ^3.5.44 |
| Package manager | npm |
| Nuxt | no |
| CSS frameworks | none detected |
| Files scanned | 65 (15 SFCs) |

## Original skeleton

- Archetype: **marketing-stack** (editorial)
- Traits: cards, hero, table, grid, tabs, modal, charts, sticky, terminal
- Max template depth: 12
- Top-level tags: siteicons, a, routerview, nav, div, footer, svg, section, section, section, section, section, abyssrail, abyssrail, abyssrail, abyssrail, abyssrail

The replacement skeleton must not be `marketing-stack` and must not be in the same family (`editorial`).

## Routes

- `/`
- `/docs`
- `/download/velaira-extension-0.1.0.zip`
- `/install`
- `/privacy`
- `/verify`

## Palette (most used first)

`#000000` (5) · `#ffffff` (4) · `#0a121b` (3) · `#1a0f1b` (3) · `#e7a9df` (3) · `#b6509e` (2) · `#f2c94c` (2) · `#080d14` (1) · `#0e1722` (1) · `#101c28` (1)

## Content lock

- Static visible text tokens: **735**
- Binding expressions: **42**
- Event handlers: **14**
- Contract hash: `c9f4ef9fdbad77d738d0f7c65d99785740143b4e2f2d8d3cdc1a12112060671c`

Everything in `.reskin/content-contract.json` is immutable: visible copy, placeholders, labels, routes, link targets, asset sources, bindings, handlers, API endpoints and i18n values. A reskin may move these tokens to new markup but may not rewrite, remove or hide them.

## Next

```bash
node scripts/choose-style.mjs --project "E:/workspace/chuangye/solana/lochlayer/website" --out .reskin
node scripts/verify.mjs baseline --project "E:/workspace/chuangye/solana/lochlayer/website" --out .reskin
```

Then rewrite the UI and run `verify.mjs check`.
