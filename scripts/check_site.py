#!/usr/bin/env python3
"""
check_site.py — one command that catches the mistakes a content edit usually makes.

Run after any edit (cheap, prints OK or the exact problem):
    python3 scripts/check_site.py
It checks: generated bundle/CSS match their sources; asset ?v= stamps are current; JSON-LD
blocks parse; every #anchor link has a target; phone and email are the same everywhere; every
price in llms.txt also appears on the home page. (Text agreement between index.html and
js/i18n.js is the job of scripts/check_content_sync.py; the CI also runs it.)
Exit code 0 = clean, 1 = problems.
"""
import hashlib
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
bad = []


def read(p):
    return (ROOT / p).read_text(encoding="utf-8")


def cat(files):
    return "".join(read(f) for f in files)


# 1. generated files match their sources (CI rebuilds them; locally run the build)
js_src = ["js/i18n.js", "js/language.js", "js/form.js", "js/ui.js", "js/main.js"]
css_src = ["css/base.css", "css/nav.css", "css/hero.css", "css/sections.css", "css/footer.css", "css/responsive.css"]
if cat(js_src) != read("js/bundle.js"):
    bad.append("js/bundle.js is out of date: cat the five js sources in order into js/bundle.js (CI does this on push)")
if cat(css_src) != read("css/styles.css"):
    bad.append("css/styles.css is out of date: cat the six css sources in order into css/styles.css (CI does this on push)")

# 2. cache-busting stamps current
idx = read("index.html")
for a in ["css/styles.css", "js/bundle.js", "js/capacity.js"]:
    h = hashlib.sha1((ROOT / a).read_bytes()).hexdigest()[:8]
    if a + "?v=" + h not in idx:
        bad.append(f"index.html: {a} version is not current ({h}); run python3 scripts/stamp_assets.py")

# 3. JSON-LD parses
for i, m in enumerate(re.finditer(r'<script type="application/ld\+json">(.*?)</script>', idx, re.S), 1):
    try:
        json.loads(m.group(1))
    except Exception as e:
        bad.append(f"index.html JSON-LD block {i} is not valid JSON: {e}")

# 4. anchors point somewhere
ids = set(re.findall(r'\bid="([^"]+)"', idx))
for a in sorted(set(re.findall(r'href="#([^"]+)"', idx))):
    if a not in ids:
        bad.append(f'index.html: link to #{a} but no element has id="{a}"')

# 5. contact facts identical everywhere (placeholders in the form are allowed)
OK_EMAIL = {"seniors@aiwithrobert.com", "forms@aiwithrobert.com", "john@example.com"}
OK_PHONE = {"5142508491", "5145551234"}
for p in ["index.html", "js/i18n.js", "js/language.js", "llms.txt"]:
    t = read(p)
    for ph in set(re.findall(r"\(?\b(\d{3})[\)\s.-]+(\d{3})[\s.-]+(\d{4})\b", t)):
        if "".join(ph) not in OK_PHONE:
            bad.append(f"{p}: unexpected phone number {'-'.join(ph)} (expected 514-250-8491)")
    for em in set(re.findall(r"[\w.+-]+@[\w-]+(?:\.[\w-]+)*\.[A-Za-z]+", t)):
        if em.lower() not in OK_EMAIL:
            bad.append(f"{p}: unexpected email {em} (expected seniors@aiwithrobert.com)")

# 6. every price in llms.txt's Pricing block is on the home page
m = re.search(r"## Pricing.*?(?=\n## )", read("llms.txt"), re.S)
if m:
    for pr in sorted(set(re.findall(r"\$\d+", m.group(0)))):
        if pr not in idx:
            bad.append(f"price {pr} is in llms.txt but not on the home page (index.html)")

if bad:
    print("PROBLEMS:")
    print("\n".join(" - " + b for b in bad))
    sys.exit(1)
print("OK: bundle/CSS current, versions stamped, JSON-LD valid, anchors resolve, phone/email/prices consistent")
