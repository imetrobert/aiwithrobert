#!/usr/bin/env python3
"""
stamp_assets.py — cache-busting versions without anyone remembering to bump them.

Sets the `?v=` on css/styles.css, js/bundle.js and js/capacity.js to a short hash of each
file's CONTENT, in index.html and in scripts/build_articles.py (which writes the capacity.js
link into every guide page). A changed file gets a new version automatically; an unchanged
file keeps its old one. CI runs this after bundling (.github/workflows/build-assets.yml).
Locally:  python3 scripts/stamp_assets.py
"""
import hashlib
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ["css/styles.css", "js/bundle.js", "js/capacity.js"]
TARGETS = ["index.html", "scripts/build_articles.py"]


def stamp(name: str) -> str:
    return hashlib.sha1((ROOT / name).read_bytes()).hexdigest()[:8]


def main() -> None:
    for t in TARGETS:
        p = ROOT / t
        text = p.read_text(encoding="utf-8")
        new = text
        for a in ASSETS:
            new = re.sub(r"(%s\?v=)[A-Za-z0-9]+" % re.escape(a), r"\g<1>" + stamp(a), new)
        if new != text:
            p.write_text(new, encoding="utf-8")
            print("stamped", t)
    print({a: stamp(a) for a in ASSETS})


if __name__ == "__main__":
    main()
