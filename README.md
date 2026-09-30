# madebykunal

Personal site for Kunal Singh, built with the App Router.

## Stack

| Piece      | Version | Notes                                       |
| ---------- | ------- | ------------------------------------------- |
| Next.js    | 16.3.7  | App Router, Turbopack (default bundler)     |
| React      | 19.3.0  |                                             |
| TypeScript | 7.0.2   | Go-native compiler                          |
| Tailwind   | 4.3.3   | CSS-first, via `@tailwindcss/postcss`       |
| Biome      | 2.5.15  | Lint + format                               |

Every dependency is pinned to an exact version — no `^` ranges — so a clean
install reproduces the build that was tested. The runtime dependencies are
`next`, `react`, `react-dom` and `@vercel/analytics`; there is no icon library.

## Commands

```bash
npm run dev        # dev server
npm run build      # production build
npm start          # serve the build
npm run lint       # biome check
npm run format     # biome check --write
npm run typecheck  # tsc --noEmit
```

## PostCSS

Tailwind is wired the way the Next.js 16 docs prescribe — `@tailwindcss/postcss`
in a four-line `postcss.config.mjs`:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

This replaced an earlier setup that registered `@tailwindcss/webpack` as a
Turbopack `rules` entry in `next.config.ts` to avoid a PostCSS config
altogether. That worked, but it traded four lines of standard config for nine
lines of non-standard config plus a loader whose interaction with Turbopack's
built-in CSS pipeline is not a documented combination. The supported path is
cheaper to keep working across upgrades.

## Configuration

There is no `tailwind.config.js` — Tailwind v4 is CSS-first. Design
tokens live in the `@theme` block in `src/app/globals.css`.

The theme is dark only — no toggle, and `viewport` declares
`colorScheme: 'dark'` with a matching `themeColor`. The look takes its cue from
[ladybird.org](https://ladybird.org): a true-black page, one slightly lifted
band, hairlines between sections, off-white text:

| Token                   | Value                     | Use                                     |
| ----------------------- | ------------------------- | --------------------------------------- |
| `--color-page`          | `#000000`                 | background                              |
| `--color-band`          | `#111112`                 | the Projects band                       |
| `--color-ink`           | `#e8e8e6`                 | headings, titles, primary button        |
| `--color-muted`         | `#9a9ba0`                 | body copy, labels, primary button edge  |
| `--color-faint`         | `#6b6c71`                 | decoration only — arrows                |
| `--color-line`          | `rgb(255 255 255 / 0.12)` | hairlines                               |
| `--color-edge`          | `rgb(255 255 255 / 0.22)` | secondary button edge                   |
| `--color-accent`        | `#8fa8d6`                 | inline links, focus ring, cursor        |
| `--color-accent-strong` | `#a9bee4`                 | link hover                              |

Contrast against black, WCAG 2 relative luminance: ink 17.1:1, muted 7.6:1,
accent 8.7:1, faint 4.0:1 (decoration, not text). On the band, muted is 6.8:1
and faint 3.6:1.

Type is on fixed steps: `text-hero` (fluid, 44–60px, set light) for the name,
`text-heading` for section titles, `text-lead` (19px) for the tagline and About,
`text-title` for project and work titles, `text-body` for their descriptions,
`text-label` for the mono work labels, `text-button` for the pill buttons, and
`text-meta` / `text-foot` for the hero facts and footer.

`--container-column` is 53rem (848px, 800px of text inside the 24px gutters) —
a little wider than Ladybird's column. `wide:` (640px) is where the Work rows go
side by side; the Projects grid goes to three columns at `md:` (768px).

Two type families, both OFL and both self-hosted via `next/font/google`: Figtree
for everything readable, JetBrains Mono for the buttons and the work labels.

`next/font` writes its CSS variables as `--font-figtree` and
`--font-jetbrains` — deliberately **not** `--font-sans` and `--font-mono`. Those
two are Tailwind's own theme keys, so reusing the name produces a
self-referential `--font-mono: var(--font-mono), …` inside `@layer theme`. It
appears to work, because unlayered font CSS outranks the layer, but the whole
`ui-monospace, SFMono-Regular, Menlo` fallback chain is silently discarded.

## Linting

Biome rather than ESLint: `typescript-eslint` does not yet support TypeScript 7
([issue #10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940)),
and Biome doesn't use the TypeScript compiler API, so it runs against TS 7
without a side-by-side TS 6 install. Biome is one of the linters
`create-next-app` offers in Next.js 16, now that `next lint` has been removed.

## Layout

The site is a single page. Application code sits under `src/`, leaving the
repository root to configuration alone; `src/app/` holds routes only, and
everything else is imported through the `@/` alias, which maps to `src/`.

```
src/
  app/
    layout.tsx            root layout, Figtree + JetBrains Mono, metadata, viewport
    page.tsx              hero, About, Projects, Work, footer
    globals.css           @theme tokens, base layer, inline-link underlines
    icon.svg              favicon
  components/
    arrow-up-right.tsx    the one icon, inlined as an SVG
    copy-mail.tsx         "Copy email" button with a live-region status
    ist-time.tsx          Clock (hero) and Today (footer), both in IST
    scroll-activity.tsx   marks <html> active/idle so the scrollbar hides at rest
  content/
    home.tsx              every word on the page, and the project and work data
    profile.ts            address and outbound links
  lib/
    security-headers.ts   the header list next.config.ts serves
    use-minute.ts         one shared minute timer for Clock and Today
public/
  kunal-singh-resume.pdf  linked from About — not checked in yet
```

`content/home.tsx` holds all the copy, so the writing can change without
touching layout. `profile.ts` stays separate because it is what a Client
Component (`copy-mail.tsx`) imports.

### Sections

There is no navbar. The page reads top to bottom in one centred column:

- **Hero** — the name as the `h1` in a large light weight, a one-line tagline
  about the person rather than the work, two facts in Ladybird's
  `Status:` / `Target:` style (*Based in*, *Local time* with the live clock), and
  two pill buttons: **Mail me** (`mailto:`) and **Copy email**. A full-bleed
  hairline closes the hero.
- **About** — three paragraphs in `text-lead`, muted, with underlined accent
  links (the `.prose-links` component class).
- **Projects** — a full-bleed `band` section, the counterpart of Ladybird's
  "What makes Ladybird different": PlayZ, Plus Compiler and Noteiler side by
  side from 768px, stacked below it. Each name links out with an up-right arrow
  that nudges on hover.
- **Work** — Calxmap and Calxbook laid out like Ladybird's News list: a mono
  label (the domain) in a fixed left column, then an underlined title and a
  muted description. The label and title share a baseline; below 640px the label
  sits above the title.
- **Footer** — a hairline, the closing line on the left and today's date on
  the right (for example *Wednesday, September 30, 2026*), in IST like the hero
  clock, inside a `<time>` with a machine-readable `dateTime`. On a narrow
  screen the date wraps under the closing line.

Each section is a `<section>` labelled by its `h2`, with its own `id`
(`#about`, `#projects`, `#work`) so it can still be linked to directly.

The two buttons are two targets for two intentions. **Copy email** swaps its
label to "Copied" for 2.4s; both labels are stacked in one grid cell so the
button never changes width, and the swap is announced through a `role="status"`
region. A failed copy announces the address instead of failing silently.

## Images

The page has no raster images. The Work list is text-only, like Ladybird's news
list, so the product marks and the card screenshots are gone.

## Selection and cursor

`::selection` is the accent at 30% alpha with the text left at `--color-ink`,
rather than a solid accent fill with reversed-out text. The wash reads as brand
without restyling the type, and matches what the OS already does. On the dark
page, 30% keeps ink on the selected ground at about 8:1.

The cursor is a Valorant-style crosshair: four 2×5px ticks around a 4px centre
gap, on a 24px canvas with the hotspot at `12 12`. Links and buttons get the
same crosshair with a centre dot added — the gap closing on a target is
Valorant's own idiom for "on it", so the interactive state is a variant of the
cursor rather than an unrelated second icon.

Valorant's form, this site's colour: the crosshair is filled with
`--color-accent`, and each tick carries a 1px `--color-page` stroke via
`paint-order: stroke`, so the fill stays a full 2px and the stroke sits behind
it, keeping the ticks crisp over text.

Both crosshairs are inline `data:` SVGs held in custom properties at the top of
the base layer. Inline rather than files in `public/` so there is no request and
no flash of the fallback cursor before the image arrives; `img-src` in the CSP
already allows `data:`. The trade-off is that `#8fa8d6` and `#000000` are
hardcoded in the two URIs — a data URI is an opaque string, so `var()` cannot
reach inside it. **Changing `--color-accent` or `--color-page` means changing
them in the cursors too** — and in `icon.svg`, whose dot is the accent.

Every `cursor` declaration ends in a real keyword — `crosshair` and `pointer` —
so a browser that refuses the SVG still gets sensible behaviour. Note that this
replaces the I-beam over prose: text is still selectable, but the cursor no
longer advertises it. `body { cursor: text }` on the prose column would put it
back if that trade reads wrong in use.

### Scrollbar

The scrollbar is a 1px rounded `--color-ink` thumb on a transparent track, going
to pure white on hover, and it only shows while the page is scrolling.

CSS cannot tell when scrolling stops, so `scroll-activity.tsx` (rendered once in
the layout) listens for `scroll` passively and sets `data-scrollbar="active"` on
`<html>`, flipping it to `"idle"` 900ms after the last scroll event. CSS makes
the thumb transparent under `[data-scrollbar="idle"]`. The attribute is only
ever written by the script, so without JS it never appears and the scrollbar
simply stays visible. The show and hide are instant: scrollbar pseudo-elements
don't transition. The script only writes the attribute when the state actually
changes, not on every scroll event, so scrolling never triggers a stream of
attribute mutations and style recalculations.

Chromium and Safari get the styling from the `::-webkit-scrollbar`
pseudo-elements, which allow an exact width. Firefox has no such pseudo-elements,
so it gets `scrollbar-width: thin` and `scrollbar-color` instead, behind
`@supports not selector(::-webkit-scrollbar)`. The guard matters: Chromium 121+
supports the standard properties too, and once either is set it ignores the
`::-webkit-scrollbar` rules entirely, which would fall back to its wider `thin`
gutter.

## Security

Response headers are set for every path from `src/lib/security-headers.ts`:
a Content Security Policy, `Strict-Transport-Security`,
`Referrer-Policy: strict-origin-when-cross-origin`, `X-Content-Type-Options:
nosniff`, `Cross-Origin-Opener-Policy: same-origin` (so a page this site opens,
or one that opens it, cannot reach back through `window.opener`) and a
`Permissions-Policy` that denies camera, microphone, geolocation and Topics. `poweredByHeader: false` drops `X-Powered-By`. Outbound links carry
`rel="noopener noreferrer"`, so the destination is not handed the referring URL.

The CSP is dev-aware — `'unsafe-eval'` and `ws:` are added under `next dev`,
where React evaluates code to reconstruct server stack traces and HMR needs a
socket, and `upgrade-insecure-requests` is omitted so localhost still works.

`script-src` has to include `'unsafe-inline'`. A statically prerendered page
carries React's hydration payload in inline `<script>` tags, and the nonce
that would replace `'unsafe-inline'` can only be generated per request, which
means opting the page into dynamic rendering. Trading static generation for a
stricter CSP is a bad deal for a page with no user input, no forms and no third-party scripts beyond
Vercel Analytics. The policy still does the useful part: it confines scripts,
styles, images, fonts and connections to this origin, blocks framing, and blocks
`<object>` and `<base>` outright.

What the CSP cannot do is hide the page. Everything this site renders — the
markup, the stylesheet, the email address, the résumé URL — is public by
construction and readable in DevTools. There is nothing else to leak: the site
has no API, no database, no authentication, and no environment variables reach
the client. Production builds ship no source maps (Next.js omits them unless
`productionBrowserSourceMaps` is set), so the bundle is minified and the
original TypeScript is not reconstructable from it.

## Notes

The source carries no comments by request. Two things that would otherwise be
worth a comment:

- `src/app/icon.svg` is parsed as XML, so its markup must be well formed. In
  particular an XML comment may never contain a double hyphen — one there
  silently breaks the whole favicon.
- Tailwind v4 scans raw source text for class candidates, so any class name
  written inside a comment still ships as real CSS. Removing this project's
  comments dropped three dead rules from the stylesheet.

`Clock` and `Today` read the time from `useMinute`, a tiny
`useSyncExternalStore` store with **one** timer for the whole page, aligned to
the next minute boundary rather than firing every second, since nothing shows
seconds. The timer starts when the first component subscribes and is cleared
when the last one unsubscribes, so nothing runs on the server and nothing leaks
after unmount. IST is a whole number of minutes from UTC, so the minute tick
that follows midnight IST is also the one that rolls the footer date over. The
server snapshot is `null` — `Clock` renders a `--:-- --` placeholder and `Today`
renders nothing — so the prerendered HTML and the first client render agree.
The `Intl.DateTimeFormat` instances are created once at module level rather
than on every render.

`CopyMail` and `ScrollActivity` each own a timer and clear it — `CopyMail` from
a ref, `ScrollActivity` in its effect cleanup — and `ScrollActivity` also
removes its passive listener and the `data-scrollbar` attribute.

`AGENTS.md` and `CLAUDE.md` are generated by `next dev` and are safe to commit.

`CopyMail` used to fall back to `document.execCommand('copy')` behind a hidden
`<textarea>` when the async Clipboard API was unavailable. That path is gone:
`execCommand` is deprecated, the Clipboard API is available in every browser
this site targets, and `localhost` counts as a secure context, so the fallback
was only reachable on a plain-HTTP deployment. A failed copy still reports the
address through the live region rather than failing silently.

## Weight

The up-right arrow on the project names is Phosphor's regular `ArrowUpRight`
path, inlined as a Server Component, so there is no icon package to install and
no `optimizePackageImports` entry to keep.

`experimental.inlineCss` is on: the Tailwind stylesheet (about 20KB raw) ships
inside a `<style>` tag in the HTML rather than as a render-blocking `<link>`,
which saves a round trip before first paint. The docs recommend it for exactly
this case — a single page styled with atomic CSS, where there is no cross-page
cache to lose. It only applies to production builds.

The prerendered page is about 11KB gzipped. Almost all the JavaScript is the
framework — React DOM and the App Router runtime — which every App Router page
ships; this site's own client code is about 3KB. The legacy polyfill chunk is
loaded with `noModule`, so modern browsers never fetch it.
