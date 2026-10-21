# Reskin inventory — miston-website

Generated: 2026-10-20T16:01:45.189Z

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

- Archetype: **bento-canvas** (spatial)
- Traits: cards, hero, table, grid, tabs, modal, charts, sticky, bento
- Max template depth: 11
- Top-level tags: siteicons, a, routerview, footer, div, svg, section, section, section, section, section, blueprintshell, blueprintshell, blueprintshell, blueprintshell, blueprintshell

The replacement skeleton must not be `bento-canvas` and must not be in the same family (`spatial`).

## Routes

- `/`
- `/docs`
- `/download/miston-extension-0.1.0.zip`
- `/install`
- `/privacy`
- `/verify`

## Palette (most used first)

`#ffffff` (16) · `#0000cc` (1) · `#0000ff` (1) · `#006b47` (1) · `#0a0b0d` (1) · `#12100c` (1) · `#4c5259` (1) · `#514a3f` (1) · `#646b73` (1) · `#6a6255` (1)

## Content lock

- Static visible text tokens: **740**
- Binding expressions: **42**
- Event handlers: **14**
- Contract hash: `35d14de5664f9502fcbb561dc837a56e1aa858d1f3c8d6116b767c6c0845b4fd`

Everything in `.reskin/content-contract.json` is immutable: visible copy, placeholders, labels, routes, link targets, asset sources, bindings, handlers, API endpoints and i18n values. A reskin may move these tokens to new markup but may not rewrite, remove or hide them.

## Next

```bash
node scripts/choose-style.mjs --project "E:/workspace/chuangye/solana/lochlayer/website" --out .reskin
node scripts/verify.mjs baseline --project "E:/workspace/chuangye/solana/lochlayer/website" --out .reskin
```

Then rewrite the UI and run `verify.mjs check`.
