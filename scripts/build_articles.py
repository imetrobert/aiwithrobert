#!/usr/bin/env python3
"""build_articles.py — generates the guide pages from scripts/articles_data.py.

Outputs (committed; do not hand-edit):
  articles/<slug>/index.html       English
  fr/articles/<slug>/index.html    French (Quebec French, written natively)
and refreshes the generated block in sitemap.xml and the Guides block in llms.txt.
Run:  python3 scripts/build_articles.py
"""
import html, json, re, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
from articles_data import ARTICLES, GBP

ROOT = Path(__file__).resolve().parent.parent
BASE = "https://seniors.aiwithrobert.com"
PERSON = "https://www.imetrobert.com/#robert-simon"
BIZ = BASE + "/#business"
DATE = "2026-11-10"
PHONE, TEL, EMAIL = "514-250-8491", "+15142508491", "seniors@aiwithrobert.com"
E = html.escape

UI = {
 "en": dict(lang="en", home="/", tag="for Seniors", guides="Guides", back="← Back to the main page",
            related="Related guides", call="Call", write="Write", switch="Français", sitename="AI with Robert for Seniors",
            indep="AI with Robert for Seniors is an independent practice of Robert Simon. It is not affiliated with, sponsored by or endorsed by any employer, including Bell Canada.",
            byline="By Robert Simon · Côte Saint-Luc, Montréal", updated="Updated", home_label="AI with Robert for Seniors — home", bc_home="Home"),
 "fr": dict(lang="fr", home="/fr/", tag="pour aînés", guides="Guides", back="← Retour à la page principale",
            related="Guides connexes", call="Appeler", write="Écrire", switch="English", sitename="AI with Robert pour aînés",
            indep="AI with Robert pour aînés est une pratique indépendante de Robert Simon. Elle n’est affiliée à aucun employeur, ni commanditée ou approuvée par aucun d’eux, y compris Bell Canada.",
            byline="Par Robert Simon · Côte Saint-Luc, Montréal", updated="Mis à jour le", home_label="AI with Robert pour aînés — accueil", bc_home="Accueil"),
}
CSS = """*{box-sizing:border-box}body{margin:0;font:18px/1.65 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:#11304c;background:#fff}
a{color:#1f77ae}header{background:#eaf5fc;border-bottom:1px solid #cfe8f7}.bar{max-width:46rem;margin:0 auto;padding:.7rem 1.1rem;display:flex;align-items:center;justify-content:space-between;gap:1rem}
.brand{display:flex;align-items:center;gap:.6rem;text-decoration:none;color:#11304c;font-weight:700}.brand img{width:44px;height:44px}.brand small{display:block;color:#1f77ae;font-weight:600;font-size:.8rem}
.lang{font-size:.95rem;font-weight:600}main{max-width:46rem;margin:0 auto;padding:1.6rem 1.1rem 2.5rem}
h1{font-size:1.9rem;line-height:1.25;margin:.2rem 0 .8rem}h2{font-size:1.3rem;margin:1.8rem 0 .5rem;color:#11304c}.meta{color:#5b6b7b;font-size:.9rem;margin:0 0 1rem}
.lead{font-size:1.15rem}li{margin:.3rem 0}.cta{background:#eaf5fc;border:1px solid #cfe8f7;border-radius:12px;padding:1.1rem 1.2rem;margin:2rem 0}
.cta p{margin:0 0 .7rem;font-weight:600}.btn{display:inline-block;background:#1f77ae;color:#fff;text-decoration:none;font-weight:700;padding:.65rem 1.1rem;border-radius:8px;margin:.2rem .4rem .2rem 0}
.btn.alt{background:#fff;color:#1f77ae;border:2px solid #1f77ae}.rel ul{padding-left:1.1rem}footer{border-top:1px solid #cfe8f7;background:#f7fbfe;padding:1.2rem 1.1rem;text-align:center;font-size:.85rem;color:#5b6b7b}footer p{max-width:40rem;margin:.3rem auto}
@media(max-width:480px){body{font-size:17px}h1{font-size:1.6rem}}"""

def url(lang, a):
    return f"{BASE}/articles/{a['en']['slug']}/" if lang == "en" else f"{BASE}/fr/articles/{a['fr']['slug']}/"

def render(lang, a):
    d, u = a[lang], UI[lang]
    other = "fr" if lang == "en" else "en"
    here, there = url(lang, a), url(other, a)
    body = d["body"].replace("__GBP__", GBP)
    rel = "".join(f'<li><a href="{url(lang, b)}">{E(b[lang]["h1"])}</a></li>' for b in ARTICLES if b["id"] in d["related"])
    faq = [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": t}} for q, t in d["faq"]]
    graph = [
      {"@type": "Article", "@id": here + "#article", "headline": d["h1"], "description": d["desc"], "inLanguage": "en-CA" if lang == "en" else "fr-CA",
       "datePublished": DATE, "dateModified": DATE, "mainEntityOfPage": here,
       "author": {"@id": PERSON}, "publisher": {"@id": BIZ}, "about": {"@id": BIZ}},
      {"@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": u["bc_home"], "item": BASE + u["home"]},
        {"@type": "ListItem", "position": 2, "name": d["h1"], "item": here}]},
      {"@type": "FAQPage", "mainEntity": faq}]
    ld = json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False, indent=1)
    return f"""<!DOCTYPE html>
<html lang="{u['lang']}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#1f77ae">
<title>{E(d['title'])}</title>
<meta name="description" content="{E(d['desc'])}">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<link rel="canonical" href="{here}">
<link rel="alternate" hreflang="{lang}" href="{here}">
<link rel="alternate" hreflang="{other}" href="{there}">
<link rel="alternate" hreflang="x-default" href="{url('en', a)}">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="article">
<meta property="og:site_name" content="{E(u['sitename'])}">
<meta property="og:title" content="{E(d['title'])}">
<meta property="og:description" content="{E(d['desc'])}">
<meta property="og:url" content="{here}">
<meta property="og:image" content="{BASE}/og-share-1200x630.png">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">
{ld}
</script>
<style>{CSS}</style>
</head>
<body>
<header><div class="bar">
<a class="brand" href="{u['home']}" aria-label="{E(u['home_label'])}"><img src="/logo.PNG" alt="" width="44" height="44"><span>AI with Robert<small>{u['tag']}</small></span></a>
<a class="lang" href="{there}" hreflang="{other}" lang="{other}">{u['switch']}</a>
</div></header>
<main>
<p class="meta">{u['byline']}</p>
<h1>{E(d['h1'])}</h1>
<p class="lead">{d['intro']}</p>
{body}
<div class="cta" data-cap="swap"><p>{d['cta']}</p>
<a class="btn" href="tel:{TEL}">{u['call']} {PHONE}</a><a class="btn alt" href="mailto:{EMAIL}">{u['write']} {EMAIL}</a></div>
<nav class="rel" aria-label="{u['related']}"><h2>{u['related']}</h2><ul>{rel}</ul></nav>
<p><a href="{u['home']}">{u['back']}</a></p>
</main>
<footer><p>{u['indep']}</p><p data-cap="hide">{PHONE} · <a href="mailto:{EMAIL}">{EMAIL}</a></p></footer>
<script defer src="/js/capacity.js?v=20261112f"></script>
</body>
</html>
"""

def write_pages():
    for a in ARTICLES:
        for lang in ("en", "fr"):
            d = a[lang]
            out = ROOT / ("articles" if lang == "en" else "fr/articles") / d["slug"] / "index.html"
            out.parent.mkdir(parents=True, exist_ok=True)
            out.write_text(render(lang, a), encoding="utf-8")
            assert len(d["desc"]) <= 200, (d["slug"], len(d["desc"]))

def sitemap():
    p = ROOT / "sitemap.xml"; s = p.read_text(encoding="utf-8")
    s = re.sub(r"\n?\s*<!-- GUIDES:START -->.*?<!-- GUIDES:END -->", "", s, flags=re.S)
    blocks = []
    for a in ARTICLES:
        for lang in ("en", "fr"):
            blocks.append(f"""  <url>
    <loc>{url(lang, a)}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="{url('en', a)}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="{url('fr', a)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="{url('en', a)}"/>
    <lastmod>{DATE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>""")
    block = "\n  <!-- GUIDES:START -->\n" + "\n\n".join(blocks) + "\n  <!-- GUIDES:END -->\n"
    s = s.replace("</urlset>", block + "\n</urlset>")
    p.write_text(s, encoding="utf-8")

def llms():
    p = ROOT / "llms.txt"; s = p.read_text(encoding="utf-8")
    s = re.sub(r"\n## Guides\n.*?<!-- GUIDES:END -->\n", "\n", s, flags=re.S)
    lines = ["\n## Guides", "Short, practical guides, each in English and in French:"]
    for a in ARTICLES:
        lines.append(f"- {a['en']['h1']}: {url('en', a)} (French: {url('fr', a)})")
    lines.append("<!-- GUIDES:END -->")
    marker = "\n## Usage"
    assert marker in s
    s = s.replace(marker, "\n".join(lines) + "\n" + marker, 1)
    p.write_text(s, encoding="utf-8")

if __name__ == "__main__":
    write_pages(); sitemap(); llms()
    print("OK — wrote", len(ARTICLES) * 2, "guide pages, sitemap.xml and llms.txt updated")
