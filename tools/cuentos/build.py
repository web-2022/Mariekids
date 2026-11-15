"""Genera ilustraciones (SVG) y páginas HTML de los cuentos.

Uso: python3 build.py <repo> <número> [<número> ...]
Cada historia está en historias_*.py como STORIES[n] = {...}.
"""
import sys, os, html, importlib

sys.path.insert(0, os.path.dirname(__file__))
STORIES = {}
for mod in ("historias_a", "historias_b", "historias_c", "historias_d", "historias_e", "historias_f"):
    try:
        STORIES.update(importlib.import_module(mod).STORIES)
    except ModuleNotFoundError:
        pass

REPO = sys.argv[1]
from carpetas import CARPETA
# plantilla: el cuento 01 ya en su carpeta (rutas relativas ../../)
TEMPLATE = open(os.path.join(REPO, "Cuentos", CARPETA[1], "cuento01.html"), encoding="utf-8").read()
HEAD_END = TEMPLATE.index("            <!-- ESCENA 1 -->")
TAIL_START = TEMPLATE.index("            <div class=\"actions\">")


def esc(t):
    return html.escape(t, quote=False)


def build(n):
    st = STORIES[n]
    nn = f"{n:02d}"
    # ilustraciones
    folder = st.get("folder") or CARPETA.get(n)
    assert folder, f"cuento {nn}: falta su carpeta en carpetas.py"
    DIR = os.path.join(REPO, "Cuentos", folder)
    os.makedirs(os.path.join(DIR, "img"), exist_ok=True)
    for k, sc in enumerate(st["scenes"], 1):
        open(os.path.join(DIR, "img", f"c{nn}-{k}.svg"), "w", encoding="utf-8").write(sc["img"])
    # página
    head = TEMPLATE[:HEAD_END]
    head = head.replace("<title>Marie Kids • La Paloma y el Árbol Seco</title>", f"<title>Marie Kids • {esc(st['title'])}</title>")
    head = head.replace('<div class="logo">🕊️</div>', f'<div class="logo">{st["emoji"]}</div>')
    head = head.replace("<span>Cuentos con valores</span>", f"<span>{esc(st.get('category', 'Cuentos con valores'))}</span>")
    assert st["title"] in html.unescape(head)
    body = []
    for k, sc in enumerate(st["scenes"], 1):
        h2 = f'                <h2>{st["emoji"]} {esc(st["title"])}</h2>\n' if k == 1 else ""
        dialogs = "".join(f'                <p class="dialogue">{esc(d)}</p>\n' for d in sc.get("d", []))
        body.append(f'''            <!-- ESCENA {k} -->
            <div class="scene-card{' active' if k == 1 else ''}">
{h2}                <img src="img/c{nn}-{k}.svg" class="scene-img" alt="{html.escape(sc['alt'])}">
                <button class="readBtn">🔊 Leer</button>
                <p>
                    {esc(sc['p'])}
                </p>
{dialogs}            </div>
''')
    body.append(f'''            <!-- FINAL -->
            <div class="scene-card">
                <h3>✨ Mensaje</h3>
                <button class="readBtn">🔊 Leer</button>
                <p class="dialogue">
                    {esc(st['msg'])}
                </p>
            </div>

''')
    for tit, lines in st.get("extra", []):   # tarjetas finales (para conversar en familia)
        ps = "".join(f'                <p class="dialogue">{esc(t)}</p>\n' for t in lines)
        body.append(f'''            <div class="scene-card">
                <h3>{esc(tit)}</h3>
                <button class="readBtn">🔊 Leer</button>
{ps}            </div>

''')
    open(os.path.join(DIR, f"cuento{nn}.html"), "w", encoding="utf-8").write(head + "\n".join(body) + TAIL_START_TEXT)
    print("ok", nn, st["title"])


TAIL_START_TEXT = TEMPLATE[TAIL_START:]

for arg in sys.argv[2:]:
    build(int(arg))
