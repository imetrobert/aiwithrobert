# Common edits — recipes (seniors.aiwithrobert.com)

Every recipe ends the same way: run `python3 scripts/check_site.py` and `python3 scripts/check_content_sync.py`
(or just push to `main`: CI rebuilds the bundle, CSS, `?v=` versions, French page and guide pages, runs both checks and
commits the result). Never hand-edit `fr/index.html`, `js/bundle.js`, `css/styles.css`, `articles/`, `fr/articles/`,
and never touch the `?v=` numbers.

Rule for any visible text with `data-i18n="key"`: change the SAME English text in `index.html` AND in `js/i18n.js` (en),
and write the French in `js/i18n.js` (fr). Find a key fast: `grep -n "key-name" index.html js/i18n.js`.

## Change a price ($60 online, $65 in-home, $275 Starter, $500 Complete, $35 group)
Pricing cards are `pricing-*` (rates `pricing-starter-rate`, `pricing-complete-rate`, savings in `pricing-*-details`). Edit in `index.html` + `js/i18n.js`
(en + fr), then ALSO every other place the number appears: `grep -rn '\$60' index.html js/i18n.js js/language.js llms.txt`:
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

## Add an FAQ
Add `faq-q-<name>` and `faq-a-<name>` in `index.html` (FAQ section), `js/i18n.js` (en + fr) and the FAQPage JSON-LD in `index.html`
(the French JSON-LD is rebuilt from i18n). Answers that print the phone number need `data-cap="hide"` (capacity mode).

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
