# The Velaira website, rebuilt in Vue

A Vue 3 single-page application that reproduces <https://velaira.xyz> — the
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
| `src/styles/signal.css` | The Signal Navy presentation layer: tokens, top index, bento canvas, tiles, prose, forms, console, footer |
| `src/styles/signal-report.css` | The leak report, its figures and the extension popup, on the same token set |
| `public/boot.js` | Runs before the page: `data-js`, the saved palette, the narrowed CSP |
| `public/media/` | The V marks, the depth plate, the star field, the fonts, favicon |
| `src/App.vue` | The icon sprite, skip link, top index, the 12-column canvas and the footer |
| `src/components/Signal*.vue` | The shell (`Top`, `Index`, `Foot`) and the home sections (`Deck`, `Steps`, `Scan`, `Keeps`, `Cautions`) |
| `src/router.ts` | Five routes, the per-page title/description, hash scrolling |
| `src/views/` | `HomeView`, `DocsView`, `InstallView`, `PrivacyView`, `VerifyView` |
| `src/lib/` | Endpoint rules, CSP, theme, cipher, story, scanner wrapper, report builder, verifier, and the vendored reference packages |
| `src/data/example-report.html` | The example report as the reference server renders it (17 inline figures) |
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

The copy, the routes, the behaviour and the figures follow the reference. The
presentation does not: it was reskinned around **Signal Navy / Bento Canvas** —
a deep navy canvas of touching tiles, a slim top index, a cyan signal accent and
a sonar motif — so the layout, type and colour are this site's own. The old
underwater scene's still drawings survive as the depth plate in the hero and the
step tiles. `.reskin/REPORT.md` holds the reskin's evidence.

This is a single-page application, where the reference is server-rendered: a
static host must send `index.html` for the four content routes, and the copy is
not readable with JavaScript off.

## Licence

The vendored packages and the modifications to them are GPL-3.0-only. See
`../NOTICE.md` for the attribution and for the marks, which are Velaira's.
