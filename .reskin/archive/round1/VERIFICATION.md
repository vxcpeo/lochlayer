# Reskin verification — FAIL

Generated: 2026-10-19T16:49:55.940Z

- Project: **loch-website**
- URL: http://127.0.0.1:4317/
- Original skeleton: `marketing-stack` (editorial)
- New skeleton: `sidebar-workspace` (shell)
- Accent: #a8d0e0 -> #298dff (60.95 ΔE; min 30)
- Source contract: intact (`98613a9ccf96`)

| Route | Result | DOM similarity | Landmark similarity | Axe serious | Screenshot |
|---|---|---:|---:|---:|---|
| `/` | FAIL | 0.277 | 0.667 | 0 | [desktop](current/home-desktop.png) |
| `/docs` | PASS | 0.164 | 0.5 | 0 | [desktop](current/docs-desktop.png) |
| `/download/loch-extension-0.1.0.zip` | FAIL | 0.277 | 0.667 | 0 | [desktop](current/download-loch-extension-0-1-0-zip-desktop.png) |
| `/install` | PASS | 0.485 | 0.6 | 0 | [desktop](current/install-desktop.png) |
| `/privacy` | PASS | 0.39 | 0.6 | 0 | [desktop](current/privacy-desktop.png) |
| `/verify` | PASS | 0.3 | 0.6 | 0 | [desktop](current/verify-desktop.png) |

## Blocking issues

- /: content removed/changed: "a" (33 -> 30)
- /: content removed/changed: "able" (1 -> 0)
- /: content removed/changed: "address" (22 -> 17)
- /: content removed/changed: "allows" (1 -> 0)
- /: content removed/changed: "and" (46 -> 40)
- /: content removed/changed: "answers" (1 -> 0)
- /: content removed/changed: "anyone" (6 -> 5)
- /: content removed/changed: "at" (6 -> 5)
- /: content removed/changed: "be" (5 -> 4)
- /: content removed/changed: "behind" (3 -> 2)
- /: content removed/changed: "browser" (2 -> 1)
- /: content removed/changed: "By" (1 -> 0)
- /: content removed/changed: "can" (15 -> 14)
- /: content removed/changed: "code" (1 -> 0)
- /: content removed/changed: "coming" (1 -> 0)
- /: content removed/changed: "default" (1 -> 0)
- /: content removed/changed: "either" (2 -> 1)
- /: content removed/changed: "endpoint" (4 -> 2)
- /: content removed/changed: "for" (10 -> 9)
- /: content removed/changed: "from" (16 -> 15)
- /: attribute content removed/changed: placeholder=https://
- /: form field removed/changed: input:rpc:url
- /download/loch-extension-0.1.0.zip: content removed/changed: "a" (33 -> 30)
- /download/loch-extension-0.1.0.zip: content removed/changed: "able" (1 -> 0)
- /download/loch-extension-0.1.0.zip: content removed/changed: "address" (22 -> 17)
- /download/loch-extension-0.1.0.zip: content removed/changed: "allows" (1 -> 0)
- /download/loch-extension-0.1.0.zip: content removed/changed: "and" (46 -> 40)
- /download/loch-extension-0.1.0.zip: content removed/changed: "answers" (1 -> 0)
- /download/loch-extension-0.1.0.zip: content removed/changed: "anyone" (6 -> 5)
- /download/loch-extension-0.1.0.zip: content removed/changed: "at" (6 -> 5)
- /download/loch-extension-0.1.0.zip: content removed/changed: "be" (5 -> 4)
- /download/loch-extension-0.1.0.zip: content removed/changed: "behind" (3 -> 2)
- /download/loch-extension-0.1.0.zip: content removed/changed: "browser" (2 -> 1)
- /download/loch-extension-0.1.0.zip: content removed/changed: "By" (1 -> 0)
- /download/loch-extension-0.1.0.zip: content removed/changed: "can" (15 -> 14)
- /download/loch-extension-0.1.0.zip: content removed/changed: "code" (1 -> 0)
- /download/loch-extension-0.1.0.zip: content removed/changed: "coming" (1 -> 0)
- /download/loch-extension-0.1.0.zip: content removed/changed: "default" (1 -> 0)
- /download/loch-extension-0.1.0.zip: content removed/changed: "either" (2 -> 1)
- /download/loch-extension-0.1.0.zip: content removed/changed: "endpoint" (4 -> 2)
- /download/loch-extension-0.1.0.zip: content removed/changed: "for" (10 -> 9)
- /download/loch-extension-0.1.0.zip: content removed/changed: "from" (16 -> 15)
- /download/loch-extension-0.1.0.zip: attribute content removed/changed: placeholder=https://
- /download/loch-extension-0.1.0.zip: form field removed/changed: input:rpc:url

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
