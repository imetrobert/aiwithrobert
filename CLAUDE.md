# aiwithrobert.com — content editing guide

Static site (no framework, no server). Written to be edited in small,
cheap, surgical diffs — read this file first instead of exploring the repo.

**Only two files ever need editing for a content change: `index.html` and
`js/i18n.js`.** Prices, phone number, hours and copy live in those two.
Everything else is either generated from them or infrastructure.

**Never open, read, or edit these — they are generated, and reading them
burns a large amount of context for zero benefit:**

| Generated file    | Built from                       |
|-------------------|----------------------------------|
| `fr/index.html`   | `index.html` + `js/i18n.js` (fr) |
| `js/bundle.js`    | the five `js/*.js` sources       |
| `css/styles.css`  | the six `css/*.css` sources      |
| `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` | `logo.PNG` |

To refresh them after an edit: `python3 scripts/build_fr_page.py`
(the GitHub workflow also does this automatically on push to `main`).

If something breaks (red check, wrong result, no access): `docs/if-something-breaks.md` (open it first).

**Freshness dates are automatic:** `scripts/stamp_dates.py` (run by CI) sets the home-page `lastmod` in `sitemap.xml` and the guide/service pages' `lastmod` and `dateModified` from the date of the last real edit (git history, ignoring the bot's `chore:` commits). `PUBLISHED` in the page builder is the fixed first-publication date. Never edit these dates by hand.

## After any edit (automatic)

Run `python3 scripts/check_site.py` and `python3 scripts/check_content_sync.py` (each prints OK or the exact problem). Push to `main`
and CI does the rest: rebuilds `js/bundle.js` and `css/styles.css`, stamps the `?v=` cache versions (`scripts/stamp_assets.py`, content
hash, never bump by hand), regenerates `fr/index.html` and all guide pages, runs both checks and commits the result.
Step-by-step recipes for the likely edits (change a price or hours, new testimonial, FAQ, guide, wording) are in `docs/common-edits.md`: read that instead of exploring.

## Where content actually lives

**Visible on-page text is split across two files that must always agree:**

1. **`index.html`** — hardcoded English text inside each element. This is
   what search engine crawlers and no-JS visitors see, and what renders for
   a split second before JS runs.
2. **`js/i18n.js`** — the `en:` and `fr:` translation tables. On page load,
   `js/language.js` reads every `[data-i18n="KEY"]` element and overwrites
   its content with `translations[lang][KEY]`. **This is what every
   JS-enabled visitor actually sees, in both languages.**

The file header of `js/i18n.js` calls it "your editorial file" — treat it
as the source of truth for wording. `index.html`'s inline text is a copy
of the `en` block kept in sync for SEO/no-JS purposes only.

**Golden rule: a text change to anything with a `data-i18n="key"` attribute
must be made in BOTH files, or the two will silently diverge** — crawlers/
no-JS visitors will see old text while JS visitors see new text (or vice
versa). This has happened before (see git history) and is easy to miss
because the live JS-rendered page looks correct even when only one file
was edited.

Run this after any text edit — it's cheap and catches drift automatically
so you don't have to re-read both files by eye:

```
python3 scripts/check_content_sync.py
```

It checks: every `data-i18n`/`data-i18n-placeholder` key in `index.html`
exists in both `en` and `fr`, `en`/`fr` have the same key set, and flags
any key whose `index.html` text no longer matches the `en` value.

## Gotchas that break things (detail in the longer notes)
- Phone, email, prices and hours repeat in many places (meta, 6 JSON-LD blocks, `index.html`, `js/i18n.js` en+fr, `js/language.js`, `llms.txt`). Change them everywhere: `grep -rn "514-250-8491" index.html js/i18n.js js/language.js llms.txt`.
- `js/bundle.js`, `css/styles.css`, `fr/index.html` and guide pages are generated: edit the sources and `scripts/articles_data.py`, never the output.
- New inbound button or phone number: add a `data-cap` attribute (at-capacity mode).

## Longer notes (read only when needed): `docs/reference.md`

Sections there: Editing without Claude Code (small copy-paste edits on GitHub from a phone), The French page (`/fr/`, how it is built and
what makes the build fail), Logo, tagline and favicons, Other files (manifest, robots, sitemap, llms.txt).
Short version of the French page: `fr/index.html` is generated, so edit the `fr` strings in `js/i18n.js` and run `python3 scripts/build_fr_page.py` (CI does it on push).

## Longer notes: `docs/reference.md`
Read only the section you need (`grep -n '^## ' docs/reference.md`):
- Facts repeated for SEO (NAP consistency) — update ALL locations
- Build pipeline — never hand-edit generated files
- Guides (articles) — generated, edit the data file
- At-capacity mode (waitlist instead of inbound requests)
- Contact form: saved copy (Inquiries)
- Finding the right key fast
