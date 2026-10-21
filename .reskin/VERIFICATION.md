# Reskin verification — PASS

Generated: 2026-10-21T17:40:27.647Z

- Project: **velaira-website**
- URL: http://127.0.0.1:4400/
- Original skeleton: `marketing-stack` (editorial)
- New skeleton: `bento-canvas` (spatial)
- Accent: #d25fb4 -> #1f8fe0 (62.05 ΔE; min 30)
- Source contract: intact (`c9f4ef9fdbad`)

| Route | Result | DOM similarity | Landmark similarity | Axe serious | Screenshot |
|---|---|---:|---:|---:|---|
| `/` | PASS | 0.199 | 0.667 | 0 | [desktop](current/home-desktop.png) |
| `/docs` | PASS | 0.114 | 0.2 | 0 | [desktop](current/docs-desktop.png) |
| `/download/velaira-extension-0.1.0.zip` | PASS | 0.199 | 0.667 | 0 | [desktop](current/download-velaira-extension-0-1-0-zip-desktop.png) |
| `/install` | PASS | 0.183 | 0.667 | 0 | [desktop](current/install-desktop.png) |
| `/privacy` | PASS | 0.141 | 0.667 | 0 | [desktop](current/privacy-desktop.png) |
| `/verify` | PASS | 0.152 | 0.667 | 0 | [desktop](current/verify-desktop.png) |

## Blocking issues

- None.

## Warnings

- None.

## Thresholds

- DOM fingerprint similarity <= 0.5
- Landmark sequence similarity <= 0.68
- CSS class overlap <= 0.1
- Accent distance >= 30 ΔE
- Contrast failures <= 0
- Axe serious/critical <= 0

All content is compared as a multiset of visible words plus rendered attribute values. Reordering is allowed, rewriting/removing/adding visible copy is not. Dynamic numeric values are reported as warnings, never silently accepted.
