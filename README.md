# The Enclaven website, rebuilt in Vue

A Vue 3 single-page application that reproduces <https://enclaven.xyz> — the
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
| `src/styles/cobalt.css` | The Cobalt Blueprint presentation layer: tokens for the two palettes, the glyph rail, the pill command bar, running heads, the stage grid, rules, forms, console and the status strip |
| `src/styles/cobalt-report.css` | The leak report, its plots and its sheets, on the same token set |
| `public/boot.js` | Runs before the page: `data-js`, the saved palette, the narrowed CSP |
| `public/media/` | The marks, the blueprint plate, the fonts, favicon |
| `src/App.vue` | The icon sprite, skip link, glyph rail, command bar, page column and status strip |
| `src/components/Cobalt*.vue` | The shell: the rail (`Rail`), the command bar (`Bar`) and the status strip (`Status`) |
| `src/components/home/*.vue` | The home chapters: the popup figure, the three steps, the scanner, the six ideas and the registers |
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
presentation does not: it was reskinned around **Cobalt Blueprint / Command
Rail** — a pale blueprint ground ruled with a fine cobalt grid, white sheets that
butt against hairlines, one electric cobalt for rules, marks, fills and links, a
fixed glyph rail down the left edge, a pill command bar floating under the top
edge and oversized running heads — so the layout, type and colour are this
site's own. The two temperatures are `dusk` (the default: warm paper) and
`night` (deep ink blue). The old underwater plate survives as a low-contrast
blueprint watermark in the running head and the step rows. `.reskin/REPORT.md`
holds the reskin's evidence.

This is a single-page application, where the reference is server-rendered: a
static host must send `index.html` for the four content routes, and the copy is
not readable with JavaScript off.

## Licence

The vendored packages and the modifications to them are GPL-3.0-only. See the
repository README for the attribution; the marks are Enclaven's.
