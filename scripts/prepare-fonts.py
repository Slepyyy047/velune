"""Optional: reproduce WOFF2 assets from the retained licensed TTF masters.
Requires: pip install fonttools brotli
Prebuilt WOFF2 files are included; normal npm builds do not require Python.
"""
from pathlib import Path
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parent.parent
for source in (root / 'public/fonts').glob('*.ttf'):
    font = TTFont(source)
    font.flavor = 'woff2'
    target = source.with_suffix('.woff2')
    font.save(target)
    print(f'{source.name}: {source.stat().st_size} -> {target.stat().st_size} bytes')
