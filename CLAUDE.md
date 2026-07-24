# aiwithrobert.com — content editing guide

Static site (no framework, no server). One real page (`index.html`) plus
metadata files. Written to be edited in small, cheap, surgical diffs —
read this file first instead of exploring the repo.

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

## Finding the right key fast

`data-i18n` keys are namespaced by section — grep the prefix instead of
reading the whole file:

| Prefix              | Section                          |
|----------------------|-----------------------------------|
| `nav-`               | Top navigation                    |
| `hero-`, `stat-`      | Hero banner + stats row           |
| `entity-aside`, `geo-summary` | The two SEO/GEO summary blurbs below the hero |
| `service1-`..`service3-` | Services section (3 cards)    |
| `pricing-`, `badge-` | Pricing cards                     |
| `about-`, `exp-`     | About Robert section               |
| `testimonial1-`      | Testimonials                      |
| `contact-`, `form-`, `free-call-`, `success-` | Contact section + form |
| `faq-q-`, `faq-a-`   | FAQ questions/answers              |
| `footer-`            | Footer                            |

Example: to change a price, `grep -n "pricing-starter" index.html
js/i18n.js` and edit both occurrences.

## Facts repeated for SEO (NAP consistency) — update ALL locations

Phone (`514-250-8491`), email (`info@aiwithrobert.com`), prices ($60/$65/
$275/$500/$35), and hours are intentionally repeated across many places for
local-SEO/schema.org reasons (Google rewards consistent Name-Address-Phone
data). Changing any of these means touching **every** location below, not
just the visible ones:

- `index.html` `<meta name="description">` and `og:`/`twitter:` meta tags
- `index.html` **5 separate JSON-LD `<script type="application/ld+json">`
  blocks** in `<head>` (LocalBusiness, Person, FAQPage, WebPage, Review) —
  each is one long single-line JSON blob; grep the fact rather than reading
  the block
- `index.html` nav phone link, `#entity-aside`, `#geo-summary`, pricing
  cards, `#about` summary, contact section, FAQ answers, footer, and the
  hidden NAP `<div itemtype=".../LocalBusiness">` just before `</footer>`
  (marked "DO NOT REMOVE" — it's for crawlers, keep it but do update it)
- `js/i18n.js` — same facts appear inside `en` **and** `fr` string values
- `js/language.js` — has its own hardcoded `<title>`/meta-description
  strings for `fr` and `en` that it swaps in on language switch (separate
  from the ones in `index.html`'s `<head>`, which only apply pre-JS)
- `llms.txt` — plain-text business summary for AI answer engines

Fastest way to find every occurrence of a fact: `grep -rn "514-250-8491"
index.html js/i18n.js js/language.js llms.txt`.

## Build pipeline — never hand-edit generated files

`css/styles.css` and `js/bundle.js` are **generated**, not source. Edit the
real source files instead:

- CSS sources: `css/base.css`, `css/nav.css`, `css/hero.css`,
  `css/sections.css`, `css/footer.css`, `css/responsive.css`
- JS sources: `js/i18n.js`, `js/language.js`, `js/form.js`, `js/ui.js`,
  `js/main.js`

`.github/workflows/build-assets.yml` concatenates them into `css/styles.css`
and `js/bundle.js` automatically on every push to `main` that touches
`js/**` or `css/**`. `index.html` only loads the bundled files, never the
individual sources — so a source-only push looks like a no-op until it
reaches `main` and the workflow runs.

## Other files

- `fr/index.html` — a JS/meta-refresh redirect stub to `/?lang=fr`, not a
  real French page. No content to edit here.
- `manifest.json`, `robots.txt`, `sitemap.xml`, `CNAME` — infra, rarely
  touched by content edits.
- `llms.txt` — freestanding plain-text business summary for AI search
  engines; not templated from anything, update by hand when facts change.
