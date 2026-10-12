"""Remonta index.html a partir de design/template.html, design/photos.js, design/songs.js e design/app.js.

O index.html é o export autocontido do Claude Design. Este script troca só a
marcação das telas e o script do protótipo dentro do bundle, mantendo o resto
(runtime, React e fontes) intacto.

Uso: python3 tools/build.py
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INDEX = ROOT / 'index.html'
TEMPLATE_TAG = '<script type="__bundler/template">'
SCRIPT_RE = re.compile(r'(<script type="text/x-dc"[^>]*>)(.*?)(</script>)', re.S)

lines = INDEX.read_text(encoding='utf-8').split('\n')
i = lines.index('  ' + TEMPLATE_TAG) + 1
template = json.loads(lines[i])

body = (ROOT / 'design/template.html').read_text(encoding='utf-8')
js = '\n'.join((ROOT / f'design/{n}').read_text(encoding='utf-8') for n in ('photos.js', 'songs.js', 'app.js'))

start = template.index('</helmet>') + len('</helmet>')
m = SCRIPT_RE.search(template, start)
template = template[:start] + '\n' + body + m.group(1) + '\n' + js + '\n' + m.group(3) + template[m.end():]

lines[i] = json.dumps(template, ensure_ascii=False).replace('</', '<\\u002F')
INDEX.write_text('\n'.join(lines), encoding='utf-8')
print('index.html atualizado')
