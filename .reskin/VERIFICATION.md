# Reskin verification — PASS

Generated: 2026-11-09T18:45:44.031Z

- Project: **enclaven-website**
- URL: http://127.0.0.1:4400/
- Original skeleton: `bento-canvas` (spatial)
- New skeleton: `marketing-stack` (editorial)
- Accent: #1f8fe0 -> #0000ff (102.32 ΔE; min 30)
- Source contract: intact (`0edd38237bae`)

| Route | Result | DOM similarity | Landmark similarity | Axe serious | Screenshot |
|---|---|---:|---:|---:|---|
| `/` | PASS | 0.227 | 0.375 | 0 | [desktop](current/home-desktop.png) |
| `/docs` | PASS | 0.122 | 0.571 | 0 | [desktop](current/docs-desktop.png) |
| `/download/enclaven-extension-0.1.0.zip` | PASS | 0.227 | 0.375 | 0 | [desktop](current/download-enclaven-extension-0-1-0-zip-desktop.png) |
| `/install` | PASS | 0.155 | 0.5 | 0 | [desktop](current/install-desktop.png) |
| `/privacy` | PASS | 0.188 | 0.5 | 0 | [desktop](current/privacy-desktop.png) |
| `/verify` | PASS | 0.131 | 0.5 | 0 | [desktop](current/verify-desktop.png) |

## Blocking issues

- None.

## Warnings

- attributes: "src=/media/mark.svg" count increased 1 -> 2
- assets: "src:/media/mark.svg" count increased 1 -> 2
- /: aria attribute changed/removed: aria-label=Sections
- /: aria attribute added: aria-label=Site
- /download/enclaven-extension-0.1.0.zip: aria attribute changed/removed: aria-label=Sections
- /download/enclaven-extension-0.1.0.zip: aria attribute added: aria-label=Site

## Thresholds

- DOM fingerprint similarity <= 0.5
- Landmark sequence similarity <= 0.68
- CSS class overlap <= 0.1
- Accent distance >= 30 ΔE
- Contrast failures <= 0
- Axe serious/critical <= 0

All content is compared as a multiset of visible words plus rendered attribute values. Reordering is allowed, rewriting/removing/adding visible copy is not. Dynamic numeric values are reported as warnings, never silently accepted.
