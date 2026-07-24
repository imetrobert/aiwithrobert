#!/usr/bin/env python3
"""
check_content_sync.py — verifies index.html and js/i18n.js agree with each other.

Why this exists: visible text on this site lives in TWO places that must stay
in sync — index.html (hardcoded English, shown to no-JS visitors/crawlers
before language.js runs) and js/i18n.js (the `en`/`fr` translation tables
that JS uses to render/swap text at runtime). Editing only one of them is a
common mistake that silently produces wrong output for either JS or no-JS
visitors. This script catches that without a human (or an LLM) having to
read both files end-to-end.

Usage:  python3 scripts/check_content_sync.py
Exit code 0 = clean, 1 = problems found.
"""
import html
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INDEX_HTML = ROOT / "index.html"
I18N_JS = ROOT / "js" / "i18n.js"

KEY_RE = re.compile(r'data-i18n(?:-placeholder)?="([a-z0-9-]+)"')
# key: 'value'  or  key: "value"  or  key: `value`  (value may span lines)
ENTRY_RE = re.compile(
    r"""'([a-z0-9-]+)':\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`)"""
)


def parse_i18n_block(block: str) -> dict:
    out = {}
    for m in ENTRY_RE.finditer(block):
        key = m.group(1)
        val = next(g for g in (m.group(2), m.group(3), m.group(4)) if g is not None)
        out[key] = val.replace("\\'", "'").replace('\\"', '"').replace("\\`", "`")
    return out


def norm(s: str) -> str:
    """Collapse whitespace and unescape HTML entities so cosmetic
    differences (&bull; vs •, &amp; vs &) don't count as drift."""
    return re.sub(r"\s+", " ", html.unescape(s)).strip()


def main() -> int:
    html_text = INDEX_HTML.read_text(encoding="utf-8")
    i18n_text = I18N_JS.read_text(encoding="utf-8")

    html_keys = set(KEY_RE.findall(html_text))

    en_start = i18n_text.index("en: {")
    fr_start = i18n_text.index("\n  fr: {")
    en_map = parse_i18n_block(i18n_text[en_start:fr_start])
    fr_map = parse_i18n_block(i18n_text[fr_start:])

    problems = []

    missing_en = sorted(html_keys - en_map.keys())
    missing_fr = sorted(html_keys - fr_map.keys())
    en_only = sorted(en_map.keys() - fr_map.keys())
    fr_only = sorted(fr_map.keys() - en_map.keys())
    unused = sorted(en_map.keys() - html_keys)

    if missing_en:
        problems.append(f"data-i18n keys used in index.html but missing from i18n.js `en`: {missing_en}")
    if missing_fr:
        problems.append(f"data-i18n keys used in index.html but missing from i18n.js `fr`: {missing_fr}")
    if en_only:
        problems.append(f"keys present in `en` but missing from `fr`: {en_only}")
    if fr_only:
        problems.append(f"keys present in `fr` but missing from `en`: {fr_only}")
    if unused:
        print(f"NOTE: {len(unused)} i18n key(s) defined but not referenced in index.html (not an error, just fyi): {unused}")

    # Text-drift check: for keys whose HTML element has no nested tags,
    # compare the HTML fallback text to the i18n.js `en` value.
    drift = []
    for key, en_val in en_map.items():
        m = re.search(r'data-i18n(?:-placeholder)?="' + re.escape(key) + r'"[^>]*>([^<]*)<', html_text)
        if not m:
            continue
        html_val = m.group(1)
        # Skip elements whose HTML content is empty/whitespace-only (e.g. an
        # <aside> whose real text is nested markup we can't cheaply extract)
        # or that contain a nested tag right after the key (our regex only
        # grabs the text up to the first '<', which under-reads those cases).
        if not html_val.strip():
            continue
        if "<" in en_val and norm(html_val) == norm(en_val).split("<")[0].strip():
            # HTML text matches the start of an i18n value that has nested
            # markup after it — not real drift, just our simple parser
            # stopping early. Skip.
            continue
        if norm(html_val) != norm(en_val) and "<" not in en_val:
            drift.append((key, html_val.strip(), en_val.strip()))

    if drift:
        problems.append(f"{len(drift)} key(s) where index.html text differs from i18n.js `en` text:")
        for key, a, b in drift:
            problems.append(f"    [{key}]\n      index.html: {a!r}\n      i18n.js en: {b!r}")

    if problems:
        print("CONTENT SYNC ISSUES FOUND:\n")
        for p in problems:
            print("- " + p)
        print(f"\n{len(html_keys)} data-i18n keys checked. See CLAUDE.md for the content-editing map.")
        return 1

    print(f"OK — {len(html_keys)} data-i18n keys in sync across index.html, i18n.js en, and i18n.js fr.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
