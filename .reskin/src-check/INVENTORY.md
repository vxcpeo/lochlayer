# Reskin inventory — enclaven-website

Generated: 2026-11-09T18:23:08.374Z

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

- Archetype: **marketing-stack** (editorial)
- Traits: cards, hero, table, grid, tabs, modal, charts, sticky, terminal
- Max template depth: 10
- Top-level tags: siteicons, a, cobaltrail, div, header, nav, footer, svg, section, figure, section, section, section, section, div, section, div, scanchapter, ideaschapter, registerschapter, section, div, p, section, div, p, section, div, p

The replacement skeleton must not be `marketing-stack` and must not be in the same family (`editorial`).

## Routes

- `/`
- `/docs`
- `/download/enclaven-extension-0.1.0.zip`
- `/install`
- `/privacy`
- `/verify`

## Palette (most used first)

`#ffffff` (9) · `#000000` (7) · `#0000ff` (4) · `#111729` (2) · `#9aa2ff` (2) · `#fbfaf6` (2) · `#070b17` (1) · `#0a0f1f` (1) · `#0a6b41` (1) · `#12141a` (1)

## Content lock

- Static visible text tokens: **735**
- Binding expressions: **42**
- Event handlers: **14**
- Contract hash: `0edd38237bae0a2cd37372c1ffe0be5576dfe70eeebd0736f251a98e9786b5bd`

Everything in `.reskin/content-contract.json` is immutable: visible copy, placeholders, labels, routes, link targets, asset sources, bindings, handlers, API endpoints and i18n values. A reskin may move these tokens to new markup but may not rewrite, remove or hide them.

## Next

```bash
node scripts/choose-style.mjs --project "E:/workspace/chuangye/solana/lochlayer/website" --out .reskin
node scripts/verify.mjs baseline --project "E:/workspace/chuangye/solana/lochlayer/website" --out .reskin
```

Then rewrite the UI and run `verify.mjs check`.
