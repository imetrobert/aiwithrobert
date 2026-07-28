#!/usr/bin/env python3
"""
build_favicons.py — regenerates every favicon/app-icon from logo.PNG.

WHY THIS EXISTS
───────────────
The previous icons were logo.PNG squashed whole into a square, wordmark and
all. At 180px that is merely cramped; at 32px and 16px the words "AI with
Robert" collapse into an unreadable smudge and the icon reads as a grey blob
in the browser tab.

A favicon is a 16-pixel-wide identity badge. Text never survives at that size,
so this script crops logo.PNG down to just the icon mark — the lightbulb with
the maple leaf plus the teal speech bubble — which stays recognisable when
tiny, and drops the wordmark entirely. The full logo with text is still used
on the page itself, where there is room to read it.

Run after changing logo.PNG:  python3 scripts/build_favicons.py

Requires Pillow:  pip install Pillow
"""
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is required: pip install Pillow")

ROOT = Path(__file__).resolve().parent.parent
LOGO = ROOT / "logo.PNG"

# Bounding box of the icon mark inside logo.PNG (excludes the wordmark).
# logo.PNG is 360x540; the mark occupies the top ~57%, separated from the
# "AI with Robert" text by a blank band at y=309..339. Recompute these if the
# logo artwork is ever redrawn — verify_crop() below will catch a bad box.
ICON_BOX = (15, 6, 351, 309)          # left, top, right, bottom

# At 16px the full mark gives the bulb and the speech bubble about 7px each,
# and both turn to mush. This box is the bulb alone, so it gets the whole
# 16px instead of half — the standard trick of simplifying a mark at its
# smallest size. Used for 16px only; 32px and up keep the full mark.
BULB_BOX = (16, 8, 233, 308)
TINY_MAX = 16

BACKGROUND = (255, 255, 255)          # matches manifest background_color
PAD_RATIO = 0.06                      # breathing room around the mark

# (filename, pixel size). 16/32 are browser tabs, 48 shows in Windows
# shortcuts and some bookmark views, 180 is iOS home screen, 192/512 are the
# PWA manifest sizes Lighthouse expects.
PNG_TARGETS = [
    ("favicon-16x16.png", 16),
    ("favicon-32x32.png", 32),
    ("apple-touch-icon.png", 180),
    ("icon-192.png", 192),
    ("icon-512.png", 512),
]
ICO_SIZES = [48, 32, 16]              # largest first — Pillow uses [0] as base


def verify_crop(mark: Image.Image) -> None:
    """Guard against a stale ICON_BOX after the logo is redrawn: if the crop
    still contains the wordmark, or clips the mark, the icons silently get
    worse and nobody notices until they look at a browser tab."""
    w, h = mark.size
    if w < 50 or h < 50:
        raise SystemExit(f"ICON_BOX crop is too small ({w}x{h}) — check the box")
    ratio = w / h
    if not 0.7 <= ratio <= 1.6:
        raise SystemExit(
            f"ICON_BOX crop is {w}x{h} (aspect {ratio:.2f}). A favicon mark "
            "should be roughly square — this looks like it still includes the "
            "wordmark, or clips the artwork. Recompute ICON_BOX.")

    # The mark must actually touch the edges of its box, or we are padding
    # dead space and the icon will render smaller than intended.
    px = mark.convert("RGB").load()

    def ink_in_row(y):
        return any(px[x, y] < (235, 235, 235) for x in range(0, w, 2))

    def ink_in_col(x):
        return any(px[x, y] < (235, 235, 235) for y in range(0, h, 2))

    if not (ink_in_row(0) or ink_in_row(h - 1)) and not (ink_in_col(0) or ink_in_col(w - 1)):
        raise SystemExit("ICON_BOX has slack on every side — tighten it")


def bulb_only(logo: Image.Image) -> Image.Image:
    """The bulb with the speech bubble removed, for the 16px icons.

    The bubble sits behind the bulb, so cropping alone still leaves teal
    slivers showing around the bulb's round edge. Those few stray pixels read
    as dirt at 16px, so paint them out rather than crop tighter (a tighter
    crop would clip the bulb itself)."""
    bulb = logo.convert("RGB").crop(BULB_BOX).copy()
    px = bulb.load()
    w, h = bulb.size
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            if g > 120 and b > 120 and r < 150 and g > r + 30:   # teal
                px[x, y] = BACKGROUND
    return bulb


def square(mark: Image.Image, size: int) -> Image.Image:
    """Fit the mark, preserving aspect ratio, centred on an opaque square.

    Opaque rather than transparent on purpose: the mark is dark navy, and a
    transparent favicon sitting on a dark-mode tab bar nearly disappears. A
    white plate keeps it legible in both light and dark browser chrome, and
    iOS composites apple-touch-icon over black if it has alpha anyway.
    """
    canvas = Image.new("RGB", (size, size), BACKGROUND)
    inner = max(1, int(size * (1 - 2 * PAD_RATIO)))

    w, h = mark.size
    scale = min(inner / w, inner / h)
    new = (max(1, round(w * scale)), max(1, round(h * scale)))

    resized = mark.resize(new, Image.LANCZOS)
    if resized.mode in ("RGBA", "LA", "P"):
        resized = resized.convert("RGBA")
        plate = Image.new("RGB", new, BACKGROUND)
        plate.paste(resized, mask=resized.split()[-1])
        resized = plate
    else:
        resized = resized.convert("RGB")

    canvas.paste(resized, ((size - new[0]) // 2, (size - new[1]) // 2))
    return canvas


def main() -> int:
    if not LOGO.exists():
        sys.exit(f"missing {LOGO}")

    logo = Image.open(LOGO)
    mark = logo.crop(ICON_BOX)
    verify_crop(mark)
    tiny = bulb_only(logo)
    print(f"icon mark {mark.size[0]}x{mark.size[1]} · "
          f"simplified 16px mark {tiny.size[0]}x{tiny.size[1]}")

    def art(size):
        return square(tiny if size <= TINY_MAX else mark, size)

    for name, size in PNG_TARGETS:
        art(size).save(ROOT / name, "PNG", optimize=True)
        note = "  (bulb only)" if size <= TINY_MAX else ""
        print(f"  wrote {name:<24} {size}x{size}{note}")

    # Multi-resolution .ico so Windows/legacy browsers pick the right frame
    # instead of badly downscaling a single large one. append_images lets each
    # frame carry its own artwork, so the 16px frame gets the simplified mark.
    frames = [art(s) for s in ICO_SIZES]
    frames[0].save(ROOT / "favicon.ico", "ICO",
                   sizes=[(s, s) for s in ICO_SIZES],
                   append_images=frames[1:])
    print(f"  wrote {'favicon.ico':<24} {ICO_SIZES} (16px frame = bulb only)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
