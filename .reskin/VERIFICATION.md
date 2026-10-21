# Reskin verification — PASS

Generated: 2026-10-20T16:32:17.185Z

- Project: **miston-website**
- URL: http://127.0.0.1:4317/
- Original skeleton: `bento-canvas` (spatial)
- New skeleton: `marketing-stack` (editorial)
- Accent: #0000ff -> #d25fb4 (90.86 ΔE; min 30)
- Source contract: intact (`b6412bdd1c90`)

| Route | Result | DOM similarity | Landmark similarity | Axe serious | Screenshot |
|---|---|---:|---:|---:|---|
| `/` | PASS | 0.239 | 0.5 | 0 | [desktop](current/home-desktop.png) |
| `/docs` | PASS | 0.088 | 0.2 | 0 | [desktop](current/docs-desktop.png) |
| `/download/miston-extension-0.1.0.zip` | PASS | 0.239 | 0.5 | 0 | [desktop](current/download-miston-extension-0-1-0-zip-desktop.png) |
| `/install` | PASS | 0.125 | 0.667 | 0 | [desktop](current/install-desktop.png) |
| `/privacy` | PASS | 0.107 | 0.667 | 0 | [desktop](current/privacy-desktop.png) |
| `/verify` | PASS | 0.239 | 0.667 | 0 | [desktop](current/verify-desktop.png) |

## Blocking issues

- None.

## Warnings

- attributes: "src=/media/mark-small.svg" count increased 1 -> 2
- attributes: "to=/docs" count increased 3 -> 4
- attributes: "to=/install" count increased 2 -> 3
- attributes: "to=/privacy" count increased 1 -> 2
- attributes: "to=/verify" count increased 2 -> 3
- attributes: added "href=#i-docs"
- attributes: added "href=#i-install"
- attributes: added "href=#i-privacy"
- attributes: added "href=#i-verify"
- links: "to:/docs" count increased 3 -> 4
- links: "to:/install" count increased 2 -> 3
- links: "to:/privacy" count increased 1 -> 2
- links: "to:/verify" count increased 2 -> 3
- links: added "href:#i-docs"
- links: added "href:#i-install"
- links: added "href:#i-privacy"
- links: added "href:#i-verify"
- assets: "src:/media/mark-small.svg" count increased 1 -> 2
- /: aria attribute changed/removed: aria-label=Project
- /: aria attribute added: aria-label=Check a receipt
- /: aria attribute added: aria-label=Docs
- /: aria attribute added: aria-label=Install
- /: aria attribute added: aria-label=Page sections
- /: aria attribute added: aria-label=Privacy
- /: link target added: /docs
- /: link target added: /install
- /: link target added: /privacy
- /: link target added: /verify
- /docs: aria attribute changed/removed: aria-label=Project
- /docs: aria attribute added: aria-label=Check a receipt
- /docs: aria attribute added: aria-label=Docs
- /docs: aria attribute added: aria-label=Install
- /docs: aria attribute added: aria-label=Page sections
- /docs: aria attribute added: aria-label=Privacy
- /docs: link target added: /docs
- /docs: link target added: /install
- /docs: link target added: /privacy
- /docs: link target added: /verify
- /download/miston-extension-0.1.0.zip: aria attribute changed/removed: aria-label=Project
- /download/miston-extension-0.1.0.zip: aria attribute added: aria-label=Check a receipt

## Thresholds

- DOM fingerprint similarity <= 0.5
- Landmark sequence similarity <= 0.68
- CSS class overlap <= 0.1
- Accent distance >= 30 ΔE
- Contrast failures <= 0
- Axe serious/critical <= 0

All content is compared as a multiset of visible words plus rendered attribute values. Reordering is allowed, rewriting/removing/adding visible copy is not. Dynamic numeric values are reported as warnings, never silently accepted.
