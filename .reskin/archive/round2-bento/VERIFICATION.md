# Reskin verification — PASS

Generated: 2026-10-19T19:16:34.642Z

- Project: **miston-website**
- URL: http://127.0.0.1:4317/
- Original skeleton: `sidebar-workspace` (shell)
- New skeleton: `bento-canvas` (spatial)
- Accent: #298dff -> #0000ff (83.88 ΔE; min 30)
- Source contract: intact (`f7bee500e664`)

| Route | Result | DOM similarity | Landmark similarity | Axe serious | Screenshot |
|---|---|---:|---:|---:|---|
| `/` | PASS | 0.437 | 0.6 | 0 | [desktop](current/home-desktop.png) |
| `/docs` | PASS | 0.254 | 0.429 | 0 | [desktop](current/docs-desktop.png) |
| `/download/loch-extension-0.1.0.zip` | PASS | 0.437 | 0.6 | 0 | [desktop](current/download-loch-extension-0-1-0-zip-desktop.png) |
| `/download/miston-extension-0.1.0.zip` | PASS | 0.437 | 0.6 | 0 | [desktop](current/download-miston-extension-0-1-0-zip-desktop.png) |
| `/install` | PASS | 0.299 | 0.5 | 0 | [desktop](current/install-desktop.png) |
| `/privacy` | PASS | 0.355 | 0.5 | 0 | [desktop](current/privacy-desktop.png) |
| `/verify` | PASS | 0.296 | 0.5 | 0 | [desktop](current/verify-desktop.png) |

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
