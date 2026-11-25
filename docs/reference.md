# Reference: longer notes moved out of CLAUDE.md (read only the section you need)

CLAUDE.md is read on every task, so these long sections live here. Use `grep -n '^##' docs/reference.md` to find one.

## Editing without Claude Code (plain claude.ai chat, no repo access)

If you're pasting snippets into a regular chat rather than running an
agent against the repo, the goal is the same — never paste more than the
one section you need:

1. Use the prefix table below to know which file(s)/key(s) you need.
2. On GitHub, open the file, click "Raw" (or just the file view), and use
   your browser's find (Ctrl/Cmd+F) for the `data-i18n` key name or the
   fact (e.g. `514-250-8491`) — copy only that line or the small block
   around it.
3. Paste just that snippet into the chat with your requested change.
4. Paste the returned snippet back via GitHub's web editor (pencil icon),
   commit directly or via a PR.
5. If the change touches a `data-i18n` key, repeat for **both**
   `index.html` and `js/i18n.js` (see "golden rule" below) — two small
   snippets, not two full files.
6. If it's a repeated fact (phone/price/hours), see the checklist further
   down for every location — each is a separate small paste, not one big
   one, since the JSON-LD blocks are now one field per line.

## The French page (`/fr/`)

`fr/index.html` is **generated** — treat it exactly like `bundle.js`.

Previously `/fr/` was a JavaScript redirect to `/?lang=fr`, which meant no
crawler ever saw any French: JS-rendering crawlers index the *default*
state (English), non-rendering crawlers (ChatGPT/OAI-SearchBot,
PerplexityBot, and most AI answer engines) saw only a redirect stub, and
`?lang=fr` canonicalised back to `/` anyway. Now `/fr/` is a real static
page with ~11k characters of crawlable French.

To change French text: edit the `fr` strings in `js/i18n.js`, then run

```
python3 scripts/build_fr_page.py
```

The script replaces each `[data-i18n]` element's inner HTML with its `fr`
string — the same thing `language.js` does at runtime — so the static page
and the JS-rendered page can never disagree. It also rebuilds the FAQPage
JSON-LD in French, rewrites relative asset paths to root-absolute (they'd
404 one directory down), and flips the canonical/hreflang/og tags.

It fails loudly rather than emitting a broken page if: a `fr` translation
is missing, a relative asset path isn't in its rewrite list, or the
`<title>`/`<meta description>` in `index.html` and `js/language.js` have
drifted apart.

**Language routing:** `/` serves English, `/fr/` serves French, and
`js/language.js` treats the URL path as authoritative. Switching language
in the dropdown navigates between the two URLs rather than swapping text
in place — two distinct indexable URLs is what makes the `hreflang` pair
valid.

## Logo, tagline and favicons

`logo.PNG` is a **picture-only** 512×512 transparent mark (lightbulb +
speech bubble, seniors sky-blue variant). It contains no words: the site
name ("AI with Robert") is live text in the nav (`.brand-name`) and the
tagline is `data-i18n="brand-tagline"` ("for Seniors" / "pour aînés"), so it
stays bilingual and crisp. `logo.svg` is the editable vector source of the
mark — change colours/shape there, export a 512×512 transparent PNG over
`logo.PNG`, then regenerate icons.

All six icon files are generated from `logo.PNG`. Only re-run this if the
logo artwork changes — it is **not** part of the CI build (needs Pillow):

```
pip install Pillow && python3 scripts/build_favicons.py
```

The script finds the artwork box from the alpha channel, flattens onto
white, and at 16px keeps only the bulb (bubble pixels painted white) so the
tab icon stays legible. It sanity-checks the crop and fails rather than
emitting bad icons.

## Other files

- `fr/index.html` — **generated, never hand-edit.** It is a real, fully
  static French page (not a redirect stub any more), built from
  `index.html` + the `fr` table in `js/i18n.js` by
  `scripts/build_fr_page.py`. To change French wording, edit the `fr`
  strings in `js/i18n.js` and re-run the script. See "The French page"
  below.
- `manifest.json`, `robots.txt`, `sitemap.xml`, `CNAME` — infra, rarely
  touched by content edits.
- `llms.txt` — freestanding plain-text business summary for AI search
  engines; not templated from anything, update by hand when facts change.

