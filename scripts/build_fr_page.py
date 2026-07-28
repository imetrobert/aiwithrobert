#!/usr/bin/env python3
"""
build_fr_page.py — generates fr/index.html from index.html + the `fr` table
in js/i18n.js.

WHY THIS EXISTS
───────────────
Until now the French "page" was a JavaScript redirect stub pointing at
`/?lang=fr`, and the French text only ever existed inside js/i18n.js, applied
to the DOM at runtime. That meant:

  * No crawler ever saw a single word of French. Googlebot renders JS, but it
    renders the DEFAULT state — nothing in the page tells it to click the
    language selector, so it indexed the English text and nothing else.
  * ChatGPT/OAI-SearchBot, PerplexityBot and most AI answer engines do not
    execute JavaScript at all. They saw a redirect stub with zero content.
  * `/?lang=fr` canonicalised to `/`, so even if it had been crawled it would
    have been folded into the English page as a duplicate.

Net effect: a bilingual business in a bilingual city had no French search
presence whatsoever. This script fixes that by emitting a real, static,
fully-French HTML page at /fr/ that needs no JavaScript to be readable.

DESIGN
──────
The generated page is a faithful translation of index.html, not a rewrite:
for every element carrying data-i18n="key", the element's inner HTML is
replaced with translations.fr[key] — exactly what language.js does at runtime,
just done ahead of time. So the French page can never drift from the French a
JS visitor sees; both come from the same source strings.

Run after any content change:  python3 scripts/build_fr_page.py
The build-assets GitHub workflow runs this automatically on push to main.
"""
import html
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INDEX_HTML = ROOT / "index.html"
I18N_JS = ROOT / "js" / "i18n.js"
OUT_HTML = ROOT / "fr" / "index.html"

# Void elements have no inner HTML to replace.
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input",
        "link", "meta", "param", "source", "track", "wbr"}

ENTRY_RE = re.compile(
    r"""'([a-z0-9-]+)':\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`)"""
)

# Keep FR_TITLE <= 60 chars and FR_DESC <= 155. Both are hard SERP limits:
# past them Bing/Google truncate mid-sentence, and Bing Webmaster Tools raises
# them as SEO errors. The originals (83 and 221 chars) predate this file — they
# lived only in js/language.js, where no crawler ever saw them because /fr/ was
# a redirect stub. Making /fr/ a real page exposed them. check_metadata_agrees()
# keeps these byte-identical to the copies in js/language.js.
FR_TITLE = "Tutoriel IA pour Aînés — Côte Saint-Luc | AI with Robert"
FR_DESC = ("Tutoriel IA pour aînés à Côte Saint-Luc et Montréal. Apprenez ChatGPT "
           "et la sécurité en ligne, à votre rythme. Appel découverte gratuit. "
           "514-250-8491.")
FR_KEYWORDS = ("tutoriel IA Côte Saint-Luc, formation IA Côte Saint-Luc, ateliers IA "
               "Côte Saint-Luc, aide technologique aînés Côte Saint-Luc, cours ChatGPT "
               "aînés, tuteur IA Montréal, soutien technique aînés CSL, cours IA aînés "
               "Montréal, sécurité en ligne aînés, formation sécurité courriel, "
               "instructeur technologie aînés Québec")
FR_OG_TITLE = ("Tutoriel IA et Formation Technologique pour Aînés à Côte Saint-Luc "
               "| AI with Robert")
FR_OG_DESC = ("Tutoriel IA patient et personnalisé pour aînés à Côte Saint-Luc. Robert "
              "Simon enseigne ChatGPT, la sécurité en ligne et les compétences "
              "numériques. Appel découverte gratuit. 514-250-8491.")


# ── HTML scanning helpers (stdlib only — no bs4/lxml dependency) ────────────

def tag_end(s: str, i: int) -> int:
    """Index just past the '>' closing the tag that starts at s[i] == '<'.
    Quote-aware so a '>' inside an attribute value doesn't end the tag early."""
    quote = None
    j = i
    while j < len(s):
        c = s[j]
        if quote:
            if c == quote:
                quote = None
        elif c in "\"'":
            quote = c
        elif c == ">":
            return j + 1
        j += 1
    raise ValueError(f"unterminated tag at offset {i}")


def matching_close(s: str, tag: str, pos: int) -> tuple:
    """(start, end) of the </tag> matching an open tag whose content starts at
    pos. Tracks nesting of the same tag name."""
    depth = 1
    i = pos
    open_re = re.compile(r"<" + re.escape(tag) + r"(?=[\s/>])", re.I)
    close_re = re.compile(r"</" + re.escape(tag) + r"\s*>", re.I)
    while i < len(s):
        mo = open_re.search(s, i)
        mc = close_re.search(s, i)
        if not mc:
            raise ValueError(f"no closing </{tag}> after offset {pos}")
        if mo and mo.start() < mc.start():
            depth += 1
            i = tag_end(s, mo.start())
        else:
            depth -= 1
            if depth == 0:
                return mc.start(), mc.end()
            i = mc.end()
    raise ValueError(f"unbalanced <{tag}> after offset {pos}")


def open_tag_start(s: str, attr_pos: int) -> int:
    """Walk back from an attribute position to the '<' that opens its tag."""
    i = s.rfind("<", 0, attr_pos)
    if i == -1:
        raise ValueError("attribute outside any tag")
    return i


def parse_fr_table(js: str) -> dict:
    fr_start = js.index("\n  fr: {")
    out = {}
    for m in ENTRY_RE.finditer(js[fr_start:]):
        val = next(g for g in (m.group(2), m.group(3), m.group(4)) if g is not None)
        out[m.group(1)] = (val.replace("\\'", "'")
                              .replace('\\"', '"')
                              .replace("\\`", "`"))
    return out


# ── Translation pass ───────────────────────────────────────────────────────

def apply_translations(doc: str, fr: dict) -> tuple:
    """Replace inner HTML of every [data-i18n] element with its French string.
    Returns (translated_doc, missing_keys)."""
    edits = []
    missing = []

    for m in re.finditer(r'data-i18n="([a-z0-9-]+)"', doc):
        key = m.group(1)
        if key not in fr:
            missing.append(key)
            continue
        start = open_tag_start(doc, m.start())
        name = re.match(r"<([a-zA-Z][a-zA-Z0-9]*)", doc[start:]).group(1)
        if name.lower() in VOID:
            continue
        inner_start = tag_end(doc, start)
        inner_end, _ = matching_close(doc, name, inner_start)
        edits.append((inner_start, inner_end, fr[key]))

    # placeholder attributes are set, not replaced as inner HTML
    for m in re.finditer(r'data-i18n-placeholder="([a-z0-9-]+)"', doc):
        key = m.group(1)
        if key not in fr:
            missing.append(key)
            continue
        start = open_tag_start(doc, m.start())
        end = tag_end(doc, start)
        ph = re.search(r'placeholder="([^"]*)"', doc[start:end])
        if ph:
            edits.append((start + ph.start(1), start + ph.end(1),
                          html.escape(fr[key], quote=True)))

    edits.sort()
    for (a1, b1, _), (a2, _, _) in zip(edits, edits[1:]):
        if b1 > a2:
            raise ValueError("overlapping/nested data-i18n elements — "
                             "generator cannot safely rewrite these")

    for a, b, text in reversed(edits):
        doc = doc[:a] + text + doc[b:]

    return doc, sorted(set(missing))


# ── Head / metadata rewrites ───────────────────────────────────────────────

def rewrite_head(doc: str) -> str:
    def sub1(pattern, repl, s, what):
        s2, n = re.subn(pattern, lambda _: repl, s, count=1)
        if n != 1:
            raise ValueError(f"head rewrite failed ({n} matches): {what}")
        return s2

    doc = sub1(r'<html lang="en">', '<html lang="fr">', doc, "html lang")
    doc = sub1(r"<title>.*?</title>",
               f"<title>{FR_TITLE}</title>", doc, "title")
    doc = sub1(r'<meta name="description" content="[^"]*">',
               f'<meta name="description" content="{FR_DESC}">', doc, "description")
    doc = sub1(r'<meta name="keywords" content="[^"]*">',
               f'<meta name="keywords" content="{FR_KEYWORDS}">', doc, "keywords")
    doc = sub1(r'<link rel="canonical" href="[^"]*">',
               '<link rel="canonical" href="https://aiwithrobert.com/fr/">',
               doc, "canonical")

    doc = sub1(r'<meta property="og:url" content="[^"]*">',
               '<meta property="og:url" content="https://aiwithrobert.com/fr/">',
               doc, "og:url")
    doc = sub1(r'<meta property="og:title" content="[^"]*">',
               f'<meta property="og:title" content="{FR_OG_TITLE}">', doc, "og:title")
    doc = sub1(r'<meta property="og:description" content="[^"]*">',
               f'<meta property="og:description" content="{FR_OG_DESC}">',
               doc, "og:description")
    doc = sub1(r'<meta property="og:locale" content="[^"]*">',
               '<meta property="og:locale" content="fr_CA">', doc, "og:locale")
    doc = sub1(r'<meta property="og:locale:alternate" content="[^"]*">',
               '<meta property="og:locale:alternate" content="en_CA">',
               doc, "og:locale:alternate")

    doc = sub1(r'<meta property="twitter:url" content="[^"]*">',
               '<meta property="twitter:url" content="https://aiwithrobert.com/fr/">',
               doc, "twitter:url")
    doc = sub1(r'<meta property="twitter:title" content="[^"]*">',
               f'<meta property="twitter:title" content="{FR_OG_TITLE}">',
               doc, "twitter:title")
    doc = sub1(r'<meta property="twitter:description" content="[^"]*">',
               f'<meta property="twitter:description" content="{FR_OG_DESC}">',
               doc, "twitter:description")

    # WebPage schema: this URL, in French.
    doc = sub1(r'"@type": "WebPage",\n      "@id": "https://aiwithrobert\.com/",\n'
               r'      "url": "https://aiwithrobert\.com/",',
               '"@type": "WebPage",\n      "@id": "https://aiwithrobert.com/fr/",\n'
               '      "url": "https://aiwithrobert.com/fr/",',
               doc, "WebPage @id/url")
    doc = sub1(r'"inLanguage": "en",', '"inLanguage": "fr",', doc, "WebPage inLanguage")

    # Footer cross-language anchor points the other way on this page.
    doc = sub1(r'<p style="margin-top:0\.75rem;font-size:0\.95rem;" id="lang-alternate-link">.*?</p>',
               '<p style="margin-top:0.75rem;font-size:0.95rem;" id="lang-alternate-link">'
               '<a href="/" rel="alternate" hreflang="en" lang="en" '
               'style="color:rgba(255,255,255,0.85);">This page in English</a></p>',
               doc, "footer language link")
    return doc


def rewrite_paths(doc: str) -> str:
    """The French page lives one directory down, so document-relative asset
    references would resolve to /fr/... and 404. Make them root-absolute."""
    assets = ["css/styles.css", "js/bundle.js", "logo.PNG", "users.jpg",
              "users.webp", "profile.jpg", "profile.webp", "favicon.ico",
              "favicon-32x32.png", "favicon-16x16.png", "apple-touch-icon.png",
              "icon-192.png", "icon-512.png", "manifest.json"]
    for a in assets:
        # srcset included deliberately: a <picture><source srcset> that 404s
        # fails silently (the browser just falls back to <img src>), so a miss
        # here costs the WebP optimisation without any visible breakage.
        doc = re.sub(r'((?:href|src|srcset)=")' + re.escape(a) + r'(")',
                     r"\1/" + a + r"\2", doc)

    leftover = set(re.findall(r'(?:href|src|srcset)="((?!https?:|/|#|tel:|mailto:|data:)[^"]+)"', doc))
    if leftover:
        raise ValueError(
            "relative asset path(s) would 404 from /fr/ — add to the assets "
            f"list in rewrite_paths(): {sorted(leftover)}")
    return doc


def build_fr_faq_schema(doc: str, fr: dict) -> str:
    """Rebuild the FAQPage block in French, using the same question order the
    page itself uses so the markup matches the visible content (a Google
    requirement for FAQ structured data)."""
    order = []
    for m in re.finditer(r'data-i18n="faq-q-([a-z0-9-]+)"', doc):
        if m.group(1) not in order:
            order.append(m.group(1))
    if not order:
        raise ValueError("no faq-q-* keys found in page")

    def plain(s: str) -> str:
        s = re.sub(r"<[^>]+>", "", s)
        return html.unescape(s).replace('"', "'").strip()

    items = []
    for slug in order:
        q, a = fr.get(f"faq-q-{slug}"), fr.get(f"faq-a-{slug}")
        if not q or not a:
            continue
        items.append(
            '        {\n'
            '          "@type": "Question",\n'
            f'          "name": "{plain(q)}",\n'
            '          "acceptedAnswer": {\n'
            '            "@type": "Answer",\n'
            f'            "text": "{plain(a)}"\n'
            '          }\n'
            '        }'
        )

    block = (
        '    <script type="application/ld+json">\n'
        '    {\n'
        '      "@context": "https://schema.org",\n'
        '      "@type": "FAQPage",\n'
        '      "inLanguage": "fr",\n'
        '      "mainEntity": [\n'
        + ",\n".join(items) + "\n"
        '      ]\n'
        '    }\n'
        '    </script>'
    )

    pattern = re.compile(
        r'<script type="application/ld\+json">\s*\{\s*"@context": "https://schema\.org",'
        r'\s*"@type": "FAQPage".*?</script>', re.S)
    doc, n = pattern.subn(lambda _: block, doc, count=1)
    if n != 1:
        raise ValueError(f"FAQPage schema block not found (matches={n})")
    return doc


def insert_hreflang_and_banner(doc: str) -> str:
    """Reciprocal hreflang (each page must list the whole set, itself included)
    plus a generated-file warning at the very top."""
    doc = re.sub(
        r'<link rel="alternate" hreflang="en"[^>]*>\s*'
        r'<link rel="alternate" hreflang="fr"[^>]*>\s*'
        r'<link rel="alternate" hreflang="x-default"[^>]*>',
        '<link rel="alternate" hreflang="en" href="https://aiwithrobert.com/">\n'
        '    <link rel="alternate" hreflang="fr" href="https://aiwithrobert.com/fr/">\n'
        '    <link rel="alternate" hreflang="x-default" href="https://aiwithrobert.com/">',
        doc, count=1)

    banner = (
        "<!--\n"
        "  ╔══════════════════════════════════════════════════════════════════╗\n"
        "  ║  GENERATED FILE — DO NOT EDIT BY HAND.                           ║\n"
        "  ║  Built from index.html + the `fr` table in js/i18n.js by         ║\n"
        "  ║  scripts/build_fr_page.py. Edit the French strings in            ║\n"
        "  ║  js/i18n.js and re-run the script; hand edits here are lost on   ║\n"
        "  ║  the next build.                                                 ║\n"
        "  ╚══════════════════════════════════════════════════════════════════╝\n"
        "-->\n"
    )
    return doc.replace("<!DOCTYPE html>\n", "<!DOCTYPE html>\n" + banner, 1)


def check_metadata_agrees(lang_js: str) -> list:
    """language.js swaps <title>/<meta description> at runtime. Those strings
    must match what this script bakes into /fr/ and what sits in index.html's
    <head>, otherwise JS-rendering crawlers and plain-HTML crawlers see two
    different sets of metadata for the same page."""
    problems = []
    for label, expected in (("French title", FR_TITLE), ("French description", FR_DESC)):
        if expected not in lang_js:
            problems.append(
                f"{label} in scripts/build_fr_page.py does not appear in "
                f"js/language.js — update whichever is stale:\n      {expected!r}")

    head = INDEX_HTML.read_text(encoding="utf-8")
    en_title = re.search(r"<title>(.*?)</title>", head).group(1)
    en_desc = re.search(r'<meta name="description" content="([^"]*)">', head).group(1)
    for label, expected in (("English title", en_title), ("English description", en_desc)):
        if expected not in lang_js:
            problems.append(
                f"{label} in index.html <head> does not appear in "
                f"js/language.js — they must match exactly:\n      {expected!r}")

    # Hard SERP limits. Past these, engines truncate mid-sentence and Bing
    # Webmaster Tools reports an SEO error — which is exactly how the original
    # 83-char French title and 221-char description were caught.
    for label, text, limit in (("English title", en_title, 60),
                               ("English description", en_desc, 160),
                               ("French title", FR_TITLE, 60),
                               ("French description", FR_DESC, 160)):
        if len(text) > limit:
            problems.append(
                f"{label} is {len(text)} chars, over the {limit}-char limit — "
                f"search engines will truncate it:\n      {text!r}")
    return problems


def main() -> int:
    doc = INDEX_HTML.read_text(encoding="utf-8")
    i18n_src = I18N_JS.read_text(encoding="utf-8")
    fr = parse_fr_table(i18n_src)

    meta_problems = check_metadata_agrees(
        (ROOT / "js" / "language.js").read_text(encoding="utf-8"))
    if meta_problems:
        print("METADATA DRIFT:\n")
        for p in meta_problems:
            print("  - " + p)
        return 1

    doc = build_fr_faq_schema(doc, fr)
    doc, missing = apply_translations(doc, fr)
    doc = rewrite_head(doc)
    doc = rewrite_paths(doc)
    doc = insert_hreflang_and_banner(doc)

    if missing:
        print("ERROR — no French translation for: " + ", ".join(missing))
        return 1

    OUT_HTML.parent.mkdir(exist_ok=True)
    OUT_HTML.write_text(doc, encoding="utf-8")
    print(f"OK — wrote {OUT_HTML.relative_to(ROOT)} "
          f"({len(doc):,} bytes, {len(fr)} French strings applied)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
