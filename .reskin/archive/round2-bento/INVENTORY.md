# Reskin inventory — miston-website

Generated: 2026-10-19T18:48:30.972Z

## Project

| Field | Value |
|---|---|
| Root | `E:/workspace/chuangye/solana/lochlayer/website` |
| Vue | ^3.5.44 |
| Package manager | npm |
| Nuxt | no |
| CSS frameworks | none detected |
| Files scanned | 94 (43 SFCs) |

## Original skeleton

- Archetype: **sidebar-workspace** (shell)
- Traits: sidebar, cards, hero, table, grid, tabs, modal, charts, sticky
- Max template depth: 11
- Top-level tags: tidelayout, siteicons, a, siteheader, main, sitefooter, footer, header, svg, section, section, section, section, section, div, hr, div, herosection, howsection, scannersection, keepssection, cautionssection, div, hr, div, div, hr, div, div, hr, div, siteicons, a, siteheader, main, sitefooter, footer, header, svg, section, section, section, section, section, div, hr, div, herosection, howsection, scannersection, keepssection, cautionssection, div, hr, div, div, hr, div, div, hr, div, siteicons, a, routerview, div, footer, svg, section, section, section, section, section, mistonlayout, mistonlayout, mistonlayout, mistonlayout, mistonlayout

The replacement skeleton must not be `sidebar-workspace` and must not be in the same family (`shell`).

## Routes

- `/`
- `/docs`
- `/download/loch-extension-0.1.0.zip`
- `/download/miston-extension-0.1.0.zip`
- `/install`
- `/privacy`
- `/verify`

## Palette (most used first)

`#000000` (19) · `#a6c8da` (8) · `#d8ecf7` (8) · `#a8d0e0` (5) · `#050f15` (4) · `#061b29` (4) · `#0b1820` (4) · `#e4d8b4` (4) · `#eaf8ff` (4) · `#f2fbff` (4)

## Content lock

- Static visible text tokens: **2568**
- Binding expressions: **126**
- Event handlers: **42**
- Contract hash: `f7bee500e66454d3912d01429fcc82d39f1287edafe73a0721d034fecda6f81d`

Everything in `.reskin/content-contract.json` is immutable: visible copy, placeholders, labels, routes, link targets, asset sources, bindings, handlers, API endpoints and i18n values. A reskin may move these tokens to new markup but may not rewrite, remove or hide them.

## Next

```bash
node scripts/choose-style.mjs --project "E:/workspace/chuangye/solana/lochlayer/website" --out .reskin
node scripts/verify.mjs baseline --project "E:/workspace/chuangye/solana/lochlayer/website" --out .reskin
```

Then rewrite the UI and run `verify.mjs check`.
