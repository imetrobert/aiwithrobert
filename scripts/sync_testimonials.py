#!/usr/bin/env python3
"""Bake the testimonials published in the toolkit into the static pages, so search engines and AI crawlers that do not run
JavaScript can read them. Reads the public Supabase RPC public_testimonials (only consented, approved wording is ever returned).
Updates, between markers / in place:
  - the testimonial cards in index.html (fr/index.html is rebuilt from it by scripts/build_fr_page.py),
  - whether the section is shown (hidden when nothing is published),
  - Seniors only: the Review JSON-LD in index.html and the "## Testimonials" section of llms.txt.
Run by .github/workflows/sync-testimonials.yml (daily and on demand). Offline test: TESTIMONIALS_JSON=rows.json python3 scripts/sync_testimonials.py
js/testimonials.js still adds newly published ones live between runs (it skips any quote already in the page).
Exit code 1 if the data could not be fetched (nothing is changed then)."""
import html
import json
import os
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONFIG = {
    "site": "seniors",
    "url": "https://ipnajvgwtjrlecbqfwrh.supabase.co",
    "key": "sb_publishable_oPa7fZdSTeXKuCwpOF338Q_PcXS57go",
    "hidden": '<section id="testimonials" style="display:none">',
    "shown": '<section id="testimonials">',
    "review_links": True, "jsonld": True, "llms": True,
}
START, END = "<!-- TESTIMONIALS:START -->", "<!-- TESTIMONIALS:END -->"
GOOGLE = re.compile(r"(^|\.)(google\.com|google\.ca|goo\.gl|g\.page|share\.google)$")
G_PATHS = [("#4285F4", "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"),
           ("#34A853", "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23z"),
           ("#FBBC05", "M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.85z"),
           ("#EA4335", "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.05l3.66 2.85C6.71 7.31 9.14 5.38 12 5.38z")]


def fetch():
    if os.environ.get("TESTIMONIALS_JSON"):
        return json.loads(Path(os.environ["TESTIMONIALS_JSON"]).read_text(encoding="utf-8"))
    req = urllib.request.Request(CONFIG["url"] + "/rest/v1/rpc/public_testimonials", data=json.dumps({"p_site": CONFIG["site"]}).encode(),
                                 headers={"apikey": CONFIG["key"], "Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


def clean(rows):
    out = []
    for t in rows if isinstance(rows, list) else []:
        if not isinstance(t, dict) or not isinstance(t.get("text"), str) or len(t["text"].strip()) < 20:
            continue
        g = lambda k, n: str(t.get(k) or "").strip()[:n]
        url = g("review_url", 300)
        try:
            from urllib.parse import urlparse
            u = urlparse(url)
            url = url if (u.scheme == "https" and GOOGLE.search(u.hostname or "")) else ""
        except Exception:
            url = ""
        lang = "fr" if str(t.get("lang") or "").lower() == "fr" else "en"   # language the quote was written in
        alt = str(t.get("text_alt") or "").strip()[:1200]
        out.append({"name": g("name", 80), "role": g("role", 120), "org": g("org", 120), "context": g("context", 160), "text": t["text"].strip()[:1200],
                    "lang": lang, "text_alt": alt if len(alt) >= 20 else "", "context_alt": g("context_alt", 160) if len(alt) >= 20 else "",
                    "review_url": url if CONFIG["review_links"] else ""})
    return out[:12]


def esc(s):
    return html.escape(s, quote=True)


LANGNAME = {"en": {"en": "English", "fr": "French"}, "fr": {"en": "anglais", "fr": "fran\u00e7ais"}}
ORIG_LABEL = {"en": "Testimonial in its original language (%s)", "fr": "T\u00e9moignage dans sa langue d\u2019origine (%s)"}


def pick(t, page):
    """Which wording this page shows: the quote if it is in the page language, else its approved translation, else the original (labelled)."""
    if t["lang"] == page:
        return t["text"], t["context"], page, None
    if t["text_alt"]:
        return t["text_alt"], t["context_alt"] or t["context"], page, None
    return t["text"], t["context"], t["lang"], t["lang"]


def card(t, page="en"):
    text, context, tlang, orig = pick(t, page)
    body = "<br><br>".join(esc(p.strip()) for p in re.split(r"\n\s*\n", text) if p.strip())
    vals = dict(t, context=context)
    cap = "".join('<span class="%s">%s</span>' % (c, esc(vals[k])) for c, k in (("testimonial-name", "name"), ("testimonial-role", "role"), ("testimonial-org", "org"), ("testimonial-context", "context")) if vals[k])
    label = '<p class="testimonial-original">%s</p>' % esc(ORIG_LABEL[page] % LANGNAME[page][orig]) if orig else ""
    link = ""
    if t["review_url"]:
        link = ('<a class="testimonial-gbp-link" href="%s" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">%s</svg>'
                '<span data-i18n="testimonial-gbp-link">See this review on Google</span></a>') % (esc(t["review_url"]), "".join('<path fill="%s" d="%s"/>' % p for p in G_PATHS))
    return ('<figure class="testimonial-card" data-published="1"><span class="testimonial-quote-mark" aria-hidden="true">&#8220;</span>'
            '<blockquote class="testimonial-quote" lang="%s">%s</blockquote>%s%s%s</figure>') % (tlang, body, label, '<figcaption class="testimonial-author">%s</figcaption>' % cap if cap else "", link)


def update_index(rows):
    p = ROOT / "index.html"
    s = p.read_text(encoding="utf-8")
    a, b = s.find(START), s.find(END)
    if a < 0 or b < a:
        sys.exit("index.html has no TESTIMONIALS:START / TESTIMONIALS:END markers inside the testimonials container")
    s = s[:a + len(START)] + "".join(card(t, "en") for t in rows) + s[b:]
    # French cards travel in an invisible comment right after the END marker; scripts/build_fr_page.py moves them into /fr/.
    s = re.sub(r"<!--TESTIMONIALS_FR:.*?:TESTIMONIALS_FR-->", "", s, flags=re.S)
    fr_html = "".join(card(t, "fr") for t in rows).replace("--", "-&#45;")
    i = s.find(END) + len(END)
    s = s[:i] + "<!--TESTIMONIALS_FR:" + fr_html + ":TESTIMONIALS_FR-->" + s[i:]
    hidden, shown = CONFIG["hidden"], CONFIG["shown"]
    want, other = (shown, hidden) if rows else (hidden, shown)
    if other in s:
        s = s.replace(other, want, 1)
    elif want not in s:
        sys.exit("cannot find the testimonials section/container tag to show or hide: " + hidden)
    nav_h, nav_s = '<li id="nav-testimonials" style="display:none">', '<li id="nav-testimonials">'
    nw, no = (nav_s, nav_h) if rows else (nav_h, nav_s)
    if no in s:
        s = s.replace(no, nw, 1)
    elif nw not in s:
        sys.exit("cannot find the nav-testimonials list item to show or hide")
    p.write_text(s, encoding="utf-8")


def update_jsonld(rows):
    p = ROOT / "index.html"
    s = p.read_text(encoding="utf-8")
    m = None
    for x in re.finditer(r'(<script type="application/ld\+json">)(.*?)(</script>)', s, re.S):
        if '"review"' in x.group(2) and '"LocalBusiness"' in x.group(2):
            m = x
    if not m:
        print("note: no Review JSON-LD block found, skipped")
        return
    data = json.loads(m.group(2))
    old = {re.sub(r"\s+", " ", r.get("reviewBody", ""))[:80]: r.get("datePublished") for r in data.get("review", []) if isinstance(r, dict)}
    reviews = []
    for t in rows:
        if not t["name"]:
            continue   # anonymous: no author to name, skip
        body = re.sub(r"\s+", " ", t["text"])
        r = {"@type": "Review", "itemReviewed": {"@id": "https://seniors.aiwithrobert.com/#business"}}
        if t["context"]:
            r["name"] = re.sub(r'^Workshop:\s*["“]?|["”]$', "", t["context"])
        r["reviewBody"] = body
        author = {"@type": "Person", "name": t["name"]}
        if t["role"]:
            author["jobTitle"] = t["role"]
        if t["org"]:
            author["worksFor"] = {"@type": "Organization", "name": t["org"]}
        r["author"] = author
        d = old.get(body[:80])
        if d:
            r["datePublished"] = d
        reviews.append(r)
    data["review"] = reviews
    text = json.dumps(data, indent=2, ensure_ascii=False)
    s = s[:m.start(2)] + "\n" + "\n".join("    " + ln for ln in text.splitlines()) + "\n    " + s[m.end(2):]
    p.write_text(s, encoding="utf-8")


def update_llms(rows):
    p = ROOT / "llms.txt"
    s = p.read_text(encoding="utf-8")
    parts = []
    for t in rows:
        who = ", ".join(x for x in (t["name"], t["role"], t["org"]) if x)
        parts.append('"%s"\n%s%s' % (re.sub(r"\s+", " ", t["text"]), "— " + who if who else "— a client", "\n(%s)" % t["context"] if t["context"] else ""))
    block = "## Testimonials\n" + ("\n\n".join(parts) if parts else "No published testimonials yet.") + "\n"
    new, n = re.subn(r"## Testimonials\n.*?(?=\n## )", lambda _m: block, s, count=1, flags=re.S)
    if n:
        p.write_text(new, encoding="utf-8")
    else:
        print("note: no '## Testimonials' section in llms.txt, skipped")


def main():
    try:
        rows = clean(fetch())
    except Exception as e:   # network or Supabase problem: change nothing
        print("could not fetch testimonials:", e)
        sys.exit(1)
    update_index(rows)
    if CONFIG["jsonld"]:
        update_jsonld(rows)
    if CONFIG["llms"]:
        update_llms(rows)
    print("synced %d testimonial(s) for %s" % (len(rows), CONFIG["site"]))


if __name__ == "__main__":
    main()
