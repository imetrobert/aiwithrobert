# Common edits — recipes (seniors.aiwithrobert.com)

Every recipe ends the same way: run `python3 scripts/check_site.py` and `python3 scripts/check_content_sync.py`
(or just push to `main`: CI rebuilds the bundle, CSS, `?v=` versions, French page and guide pages, runs both checks and
commits the result). Never hand-edit `fr/index.html`, `js/bundle.js`, `css/styles.css`, `articles/`, `fr/articles/`,
and never touch the `?v=` numbers.

Rule for any visible text with `data-i18n="key"`: change the SAME English text in `index.html` AND in `js/i18n.js` (en),
and write the French in `js/i18n.js` (fr). Find a key fast: `grep -n "key-name" index.html js/i18n.js`.

## Change a price ($60 online, $65 in-home, $275 Starter, $500 Complete, $35 group)
Pricing cards are `pricing-*` (rates `pricing-starter-rate`, `pricing-complete-rate`, savings in `pricing-*-details`). Edit in `index.html` + `js/i18n.js`
(en + fr), then ALSO every other place the number appears: grep the OLD number itself (`grep -rn '\$275' index.html js/i18n.js js/language.js llms.txt scripts/articles_data.py`, or `\$60` for hourly rates). Derived text must be recomputed by hand: "Save $25" (Starter), "Save $100" (Complete), per-hour figures like "$55/hr". Group workshop is $35 per person, a different price from the $275 Starter: confirm which one is meant. The invoicing app keeps its own copy of the Seniors rates in `src/lib/services.js` (repo Ai-with-Robert-Invoicing-System; starter-package 275, complete-package 500, with the "save" text in the description): change it too. Never open `index.html` or `js/i18n.js` whole; use grep. Places:
meta description and og/twitter tags, the 6 JSON-LD blocks (LocalBusiness, Person, FAQPage, WebPage, WebSite, Review: `"price"`, `"priceRange"`),
`#entity-aside`, `#geo-summary`, `#about` summary, FAQ answers, hidden NAP block before `</footer>`, `js/language.js` title/description
strings (must match `<head>`), `llms.txt` Pricing block, and guide pages (`scripts/articles_data.py`). `check_site.py` fails if a price in
`llms.txt` is missing from the home page. If you reword a JSON-LD string also update `FR_SUBS` in `scripts/build_fr_page.py`.

## Change the phone, email or hours
Phone 514-250-8491 and `seniors@aiwithrobert.com` repeat in the same places as prices plus the nav link and contact section
(`grep -rn "514-250-8491" index.html js/i18n.js js/language.js llms.txt`). `check_site.py` fails on any other phone or email
(form placeholders are allowed).

## Add or change a testimonial
Keys `testimonial1-*` (`-quote`, `-name`, `-role`, `-org`, `-context`, `-gbp-link`) in `index.html` and `js/i18n.js` (en + fr). The Google Business Profile
badge is part of the card. Only add `aggregateRating` to the JSON-LD after at least three real Google reviews. Use a generic word like "bookings",
not "students".

## Swap a photo (profile.jpg, users.jpg)
Two photos sit in the repo root: `profile.jpg` (your portrait, About section, 892x910) and `users.jpg` (hero picture of seniors learning, 1024x1024). Each has a `.webp` twin that browsers show first. On GitHub: open the file, Upload files, upload the new photo with the SAME name (`profile.jpg` or `users.jpg`), keep the same width and height (or edit `width`/`height` on the `<img>` in `index.html`), aim for under 300 KB. The "Make WebP copies" workflow then rebuilds the `.webp` by itself in about a minute; do not upload the .webp by hand. Alt text is hardcoded English in `index.html` (`grep -n 'profile.jpg\|users.jpg' index.html`), not in `js/i18n.js`; the French page is generated and reuses the same files. `users.jpg` is also the share image named near line 100 of `index.html` (JSON-LD), so changing it changes the social preview. Logo files come from `logo.PNG`, not these.

## Add an FAQ
Add `faq-q-<name>` and `faq-a-<name>` in `index.html` (FAQ section), `js/i18n.js` (en + fr) and the FAQPage JSON-LD in `index.html`
(the French JSON-LD is rebuilt from i18n). Answers that print the phone number need `data-cap="hide"` (capacity mode).
Keys are short words, not numbers (existing: `who`, `chatgpt`, `areas`, `cost`, `experience`, `safe`, `home`, `group`, `what`, `free`): pick a new word such as `faq-q-privacy`. Copy the last `<div class="faq-qa" ...>` block in `index.html` (`grep -n 'faq-qa' index.html`), keep its microdata attributes, and add one `Question` entry at the end of the FAQPage JSON-LD in `<head>` with the same English text. Do not edit `sitemap.xml` dates (stamp_dates.py sets them). Then run both checks.

## Reword the hero, a title or a button
`grep -n 'data-i18n="hero-' index.html` (prefixes: `nav-`, `hero-`/`stat-`, `entity-aside`/`geo-summary`, `service1-3-`, `pricing-`/`badge-`, `about-`/`exp-`,
`testimonial1-`, `contact-`/`form-`/`free-call-`/`success-`, `faq-q-`/`faq-a-`, `footer-`). Meta title/description also live in `js/language.js`.

## Add or edit a guide
Edit `scripts/articles_data.py` only (EN and FR blocks), then `python3 scripts/build_articles.py` (CI also runs it). It rebuilds the pages, the
`GUIDES:START/END` block in `sitemap.xml` and `## Guides` in `llms.txt`. Independence wording (Bell Canada) and the Person id are set in `build_articles.py`.

## Capacity (waitlist) mode wording
Inside `js/capacity.js` (CONFIG/COMMON, EN + FR). On/off and schedule are in the toolkit's Site availability. A new inbound button or phone link needs a `data-cap` attribute.

## Logo / favicons
`logo.svg` is the source, `logo.PNG` the 512x512 picture-only export; icons come from `scripts/build_favicons.py` (needs Pillow; only if the artwork changes).

## After any content change
Bump `<lastmod>` for `/` and `/fr/` in `sitemap.xml`. The IndexNow workflow pings search engines on push.

### Published testimonials (added from the toolkit)
`js/testimonials.js` (separate file, NOT in bundle.js, home page only) calls the public Supabase RPC `public_testimonials(site)` and appends the testimonials Robert published in the toolkit's "Testimonials" screen as extra cards in the existing testimonials container (same classes, so styling is inherited).
Only consented, approved wording is ever returned (checked by the database). To remove one, unpublish it in the toolkit, not here. The hand-written testimonial cards in index.html and i18n.js are unchanged. The `?v=` stamp is automatic (scripts/stamp_assets.py).

### Testimonials are no longer hand-written here (2026-11-17)
The hand-written testimonial cards and their i18n keys were removed. The section starts hidden (`display:none` in index.html) and `js/testimonials.js` reveals it when at least one testimonial is published in the toolkit's Testimonials screen. Do not add testimonial text to index.html or i18n.js; add it in the toolkit.
Still hand-written on purpose (AI-facing copies): the Review JSON-LD and the quote in llms.txt on the Seniors site; update them if the wording of a published testimonial changes.

### Google review link on a testimonial (Seniors only)
Each published testimonial can carry an optional Google review link (set in the toolkit's Testimonials screen, field "Google review link"). `js/testimonials.js` (`reviewLinks: true` here only; the Business site has no Google profile) shows it as the "See this review on Google" button (`.testimonial-gbp-link`, EN/FR by page path). Only https links on Google domains are accepted.

### Testimonials are baked into the page every morning (2026-11-17)
`scripts/sync_testimonials.py` (workflow "Sync testimonials", daily 09:17 UTC and on demand) reads the public RPC `public_testimonials`, writes the cards between `<!-- TESTIMONIALS:START/END -->` in index.html, shows or hides the `#testimonials` section, and rewrites the Review JSON-LD and the "## Testimonials" section of llms.txt (anonymous testimonials are left out of the JSON-LD). `fr/index.html` is rebuilt from it.
Right after publishing or unpublishing in the toolkit: Actions > Sync testimonials > Run workflow. Until then `js/testimonials.js` adds new ones live (it skips quotes already in the page). Never edit the baked cards or those blocks by hand. Offline test: `TESTIMONIALS_JSON=rows.json python3 scripts/sync_testimonials.py`.
The Google button label is i18n key `testimonial-gbp-link`.

### Testimonial language (2026-11-17)
Each testimonial says which language it was written in (`lang`) and may carry an approved translation (`text_alt`, `context_alt`), both set in the toolkit's Testimonials screen. The English page shows English wording and /fr/ shows French. With no translation the original is shown with a small label ("Testimonial in its original language (French)" / "Témoignage dans sa langue d’origine (anglais)", CSS `.testimonial-original`). Same rule in `js/testimonials.js` (`wording()`) and `scripts/sync_testimonials.py` (`pick()`); the sync stores the French cards in a comment after `TESTIMONIALS:END` and `scripts/build_fr_page.py` (`swap_testimonials`) moves them into /fr/. Never edit those by hand; change the label wording in both files.

## Place names: Montreal leads, Côte Saint-Luc is the home base
Since 2026-11-23 headlines, titles, meta tags, hero, subtitles, FAQ questions and the footer say Montreal (Montréal in French) so the service reads as island-wide. Côte Saint-Luc stays only where it is a fact: `addressLocality` in the JSON-LD (the Google Business Profile address), the "based in Côte Saint-Luc" lines, the `areaServed` list (Montreal first, then Côte Saint-Luc, Hampstead, NDG, Westmount), the testimonial source and the CSL referral options. New copy: lead with Montreal, mention Côte Saint-Luc as home base. After a wording change run `python3 scripts/build_fr_page.py`, `python3 scripts/check_site.py` and `python3 scripts/check_content_sync.py`; keep `FR_TITLE`/`FR_DESC` in `scripts/build_fr_page.py` equal to the French strings in `js/language.js`.
