# The Miston website, rebuilt in Vue

A Vue 3 single-page application that reproduces <https://miston.xyz> — the
five pages, the two palettes, the scroll story, the leak scanner and its report,
and the receipt verifier — with the reference site's own CSS, fonts, marks and
copy.

```sh
npm install
npm run dev        # http://localhost:5173
npm run build      # vue-tsc, then a production build in dist/
npm run preview    # http://localhost:4273
npm test           # Vitest: unit and component tests
npm run test:e2e   # Playwright against the built site, in Chrome
npm run typecheck
```

## How it is put together

| Path | What it is |
| --- | --- |
| `src/assets/site.css` | The reference site's stylesheet; only its media URLs are made absolute (`/media/…`) |
| `public/boot.js` | Runs before the page: `data-js`, the saved palette, the narrowed CSP |
| `public/media/` | Fonts, the M marks, the tide-line plate, the star field, favicon |
| `src/App.vue` | The icon sprite, skip link, masthead, `<main id="main">`, footer |
| `src/router.ts` | Five routes, the per-page title/description, hash scrolling |
| `src/views/` | `HomeView`, `DocsView`, `InstallView`, `PrivacyView`, `VerifyView` |
| `src/components/home/` | `HeroSection` (cipher reveal), `HowSection` (pinned story), `ScannerSection`, `KeepsSection`, `CautionsSection` |
| `src/lib/` | Endpoint rules, CSP, theme, cipher, story, scanner wrapper, report builder, verifier, and the vendored reference packages |
| `src/data/example-report.html` | The example report exactly as the reference server renders it (17 inline figures) |
| `tests/` | Vitest unit and component tests |
| `e2e/` | Playwright tests |

### The scanner

`src/lib/scanner.ts` wraps the vendored `scanner-core` (the same analysis the
reference site and its extension use) in the reference page's retry policy,
stage progress and failure copy. A successful scan builds the live report in
`src/lib/report.ts` and draws its three figures at their containers' widths with
the vendored `@loch/design` chart helpers. The example report is the pre-rendered
fragment, so it matches the reference page to the SVG.

Both the scanner and the verifier accept an injected function
(`<ScannerSection :scan="…">`, `<VerifyView :check="…">`) so component tests can
drive their states without a chain.

### Security policy

`index.html` carries the development policy (it admits Vite's socket while
`npm run dev`). A build plugin replaces it with the production one; `boot.js`
then adds a second policy that narrows `connect-src` to this origin, the RPC
endpoint in use and the waitlist — the same rule the reference site explains on
its privacy page. `src/lib/policy.ts` is the same rule in TypeScript, and
`tests/unit/policy.test.ts` runs both implementations side by side.

### What is not identical

The reference hero draws its underwater scene with WebGL. Here the still
drawings are used directly — the reference site's own fallback when WebGL is
unavailable. Everything else (layout, type, colour, breakpoints, figures,
animations, copy) follows the reference.

This is a single-page application, where the reference is server-rendered: a
static host must send `index.html` for the four content routes, and the copy is
not readable with JavaScript off.

## Licence

The vendored packages and the modifications to them are GPL-3.0-only. See
`../NOTICE.md` for the attribution and for the marks, which are Miston's.
