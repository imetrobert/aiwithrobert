#!/usr/bin/env python3
"""Keep the dates search engines read honest, with nothing to bump by hand.

  * sitemap.xml <lastmod> of "/" and "/fr/" = date of the last real edit to the home page sources.
  * DATE in the page builder (used for <lastmod> and dateModified of generated guide/service pages)
    = date of the last real edit to the pages data file.
"Real" means a commit that is not the bot's "chore:" rebuild. Needs full git history (the workflow uses fetch-depth 0).
If git has no answer (shallow clone, new file) it changes nothing. Run: python3 scripts/stamp_dates.py
"""
import re, subprocess, sys, os

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
HOME_FILES = ["index.html", "js/i18n.js"]
# (page builder, its data file): whichever exists in this repo
BUILDERS = [("scripts/build_pages.py", "scripts/pages_data.py"), ("scripts/build_articles.py", "scripts/articles_data.py")]


def last_edit(paths):
    paths = [p for p in paths if os.path.exists(os.path.join(ROOT, p))]
    if not paths:
        return None
    out = subprocess.run(["git", "log", "-1", "--format=%cs", "--invert-grep", "--grep=^chore:", "--"] + paths,
                         cwd=ROOT, capture_output=True, text=True).stdout.strip()
    return out if re.fullmatch(r"\d{4}-\d{2}-\d{2}", out) else None


def sub_file(path, fn):
    full = os.path.join(ROOT, path)
    if not os.path.exists(full):
        return False
    s = open(full, encoding="utf-8").read()
    new = fn(s)
    if new != s:
        open(full, "w", encoding="utf-8").write(new)
        return True
    return False


def main():
    changed = []
    home = last_edit(HOME_FILES)
    if home:
        def sm(s):
            def one(m):
                blk = m.group(0)
                if re.search(r"<loc>https://[^/<]+/(fr/)?</loc>", blk):
                    blk = re.sub(r"<lastmod>[^<]*</lastmod>", f"<lastmod>{home}</lastmod>", blk)
                return blk
            return re.sub(r"<url>.*?</url>", one, s, flags=re.S)
        if sub_file("sitemap.xml", sm):
            changed.append(f"sitemap home lastmod -> {home}")
    for builder, data in BUILDERS:
        d = last_edit([data])
        if d and sub_file(builder, lambda s: re.sub(r'^DATE = "[^"]*"', f'DATE = "{d}"', s, count=1, flags=re.M)):
            changed.append(f"{builder} DATE -> {d}")
    print("stamp_dates:", "; ".join(changed) if changed else "nothing to change")


if __name__ == "__main__":
    sys.exit(main())
