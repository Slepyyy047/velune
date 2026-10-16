"""Package the source and static export without dependencies or local caches."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import sys

root = Path(__file__).resolve().parent.parent
output = Path(sys.argv[1]) if len(sys.argv) > 1 else root.parent / 'velune-delivery'
output.mkdir(parents=True, exist_ok=True)
folders = ['app', 'components', 'data', 'public', 'assets', 'scripts', 'tests']
files = ['README.md', 'package.json', 'package-lock.json', 'tsconfig.json',
         'next.config.ts', 'next-env.d.ts', 'playwright.config.ts', '.gitignore', '.env.example', 'vercel.json']
with ZipFile(output / 'velune-source.zip', 'w', ZIP_DEFLATED, compresslevel=6) as archive:
    for folder in folders:
        for path in sorted((root / folder).rglob('*')):
            if path.is_file(): archive.write(path, 'velune/' + str(path.relative_to(root)))
    for filename in files:
        archive.write(root / filename, 'velune/' + filename)
    for path in sorted((root / 'docs').glob('*')):
        if path.is_file() and path.suffix in ['.md', '.json']:
            archive.write(path, 'velune/' + str(path.relative_to(root)))
with ZipFile(output / 'velune-static.zip', 'w', ZIP_DEFLATED, compresslevel=6) as archive:
    for path in sorted((root / 'out').rglob('*')):
        if path.is_file(): archive.write(path, path.relative_to(root / 'out'))
with ZipFile(output / 'velune-qa.zip', 'w', ZIP_DEFLATED, compresslevel=6) as archive:
    for path in sorted((root / 'docs').rglob('*')):
        if path.is_file(): archive.write(path, path.relative_to(root))
for path in output.glob('*.zip'):
    with ZipFile(path) as archive:
        error = archive.testzip()
        if error: raise RuntimeError(f'Archive integrity failure: {error}')
    print(f'{path}: {path.stat().st_size:,} bytes; integrity OK')
