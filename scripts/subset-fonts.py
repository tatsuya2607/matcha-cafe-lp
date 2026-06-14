#!/usr/bin/env python
"""Subset the CJK web fonts to only the glyphs this site actually renders.

The LP uses fixed Japanese copy, so loading the full Noto Serif/Sans JP (split
by next/font into 600+ unicode-range @font-face chunks) is wasteful and tanks
the mobile Lighthouse score. This script collects every character used across
the message catalogs, components and CSS, then subsets the variable source
fonts down to that glyph set (plus safe baseline ranges) as single woff2 files.

Re-run after changing site copy:  python scripts/subset-fonts.py
"""
from __future__ import annotations

import io
import re
import subprocess
import sys
import urllib.request
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / ".fontcache"
OUT = ROOT / "src" / "app" / "fonts"

# Variable source fonts (wght axis) from the google/fonts repo, with the static
# weights we actually use. Instancing to static weights drops the heavy gvar
# data, so each subset woff2 stays tiny.
SOURCES = {
    "NotoSerifJP": (
        "https://github.com/google/fonts/raw/main/ofl/notoserifjp/NotoSerifJP%5Bwght%5D.ttf",
        [300, 400, 500],
    ),
    "NotoSansJP": (
        "https://github.com/google/fonts/raw/main/ofl/notosansjp/NotoSansJP%5Bwght%5D.ttf",
        [300, 400],
    ),
}

# Baseline ranges kept regardless of detected text, so no Latin/kana/punctuation
# can ever go missing if copy changes slightly.
# Baseline kept regardless of detected text. Kept lean: Latin + kana + CJK
# punctuation are universally needed; any fullwidth / general-punctuation glyphs
# that actually appear are picked up from the text scan, so we don't carry the
# whole blanket blocks (which would add hundreds of unused CJK-width glyphs).
UNICODE_RANGES = ",".join([
    "U+0020-007E",   # Basic Latin
    "U+00A0-00FF",   # Latin-1 Supplement (incl. ¥ U+00A5, © U+00A9)
    "U+2014-2015",   # — ―
    "U+2018-201D",   # ‘ ’ “ ”
    "U+2022",        # •
    "U+2026",        # …
    "U+2103",        # ℃
    "U+2190-2193",   # arrows
    "U+2605",        # ★
    "U+2713",        # ✓
    "U+25CF",        # ●
    "U+3000-303F",   # CJK Symbols and Punctuation (、。「」)
    "U+3040-309F",   # Hiragana
    "U+30A0-30FF",   # Katakana
])


def collect_text() -> str:
    chars: set[str] = set()
    globs = ["messages/*.json", "src/**/*.tsx", "src/**/*.ts", "src/**/*.css"]
    for pattern in globs:
        for path in ROOT.glob(pattern):
            chars.update(path.read_text(encoding="utf-8"))
    # Drop control chars and anything in the astral plane (emoji) — those render
    # via the system emoji font, not these families.
    return "".join(c for c in sorted(chars) if ord(c) >= 0x20 and ord(c) <= 0xFFFF)


def fetch(name: str, url: str) -> Path:
    CACHE.mkdir(exist_ok=True)
    dst = CACHE / f"{name}.ttf"
    if dst.exists():
        return dst
    print(f"  downloading {name} …")
    req = urllib.request.Request(url, headers={"User-Agent": "subset-fonts"})
    data = urllib.request.urlopen(req, timeout=120).read()
    dst.write_bytes(data)
    return dst


def instance(src: Path, weight: int) -> Path:
    out = CACHE / f"{src.stem}-{weight}.ttf"
    subprocess.run([
        sys.executable, "-m", "fontTools.varLib.instancer", str(src),
        f"wght={weight}", "-o", str(out),
    ], check=True, stdout=subprocess.DEVNULL)
    return out


def subset(src: Path, text_file: Path, out: Path) -> None:
    out.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run([
        sys.executable, "-m", "fontTools.subset", str(src),
        f"--text-file={text_file}",
        f"--unicodes={UNICODE_RANGES}",
        "--flavor=woff2",
        "--no-hinting",
        "--desubroutinize",
        "--output-file=" + str(out),
    ], check=True, stdout=subprocess.DEVNULL)


def main() -> None:
    text = collect_text()
    print(f"collected {len(text)} unique glyphs")
    CACHE.mkdir(exist_ok=True)
    text_file = CACHE / "glyphs.txt"
    text_file.write_text(text, encoding="utf-8")
    for name, (url, weights) in SOURCES.items():
        src = fetch(name, url)
        for w in weights:
            static = instance(src, w)
            out = OUT / f"{name}-{w}.woff2"
            subset(static, text_file, out)
            kb = out.stat().st_size / 1024
            print(f"  -> {out.relative_to(ROOT)}  ({kb:.0f} KB)")


if __name__ == "__main__":
    main()
