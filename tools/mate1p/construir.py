#!/usr/bin/env python3
"""Arma cada lección de Matemática 1.º de primaria como un solo archivo HTML.

Uso:  python3 tools/mate1p/construir.py              (todas)
      python3 tools/mate1p/construir.py mate1p-01

Usa el motor de Ejercicios mentales (tools/ejercicios-mentales) +
comun.js / comun.css de esta carpeta + juegos/<archivo>.js (y .css opcional).
El resultado se guarda en 1primary/mate1p/<archivo>.html
"""
import re, sys, pathlib

AQUI = pathlib.Path(__file__).resolve().parent
RAIZ = AQUI.parent.parent
MOTOR = RAIZ / "tools" / "ejercicios-mentales"
SALIDA = RAIZ / "1primary" / "mate1p"
leer = lambda p: p.read_text(encoding="utf-8")

PLANTILLA = """<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>MK • {titulo}</title>
    <meta name="apple-mobile-web-app-title" content="MK" />
    <link rel="manifest" href="../../manifest.json">
    <meta name="theme-color" content="#1976d2">
    <!-- Generado por tools/mate1p/construir.py: edita los archivos de esa carpeta -->
    <style>
{css}
    </style>
    <script>
{personajes}
    </script>
    <script>
{motor}
    </script>
    <script>
document.addEventListener("DOMContentLoaded", function () {{
{comun}
{juego}
window.MKT = {{ ask, ansTxt, BOARD, get GEN() {{ try {{ return GEN; }} catch (e) {{ return null; }} }} }};   // para las pruebas automáticas
}});
    </script>
    <script>
      if ("serviceWorker" in navigator) {{
        window.addEventListener("load", () => {{ navigator.serviceWorker.register("../../service-worker.js").catch(() => {{ }}); }});
      }}
    </script>
  </head>
  <body></body>
</html>
"""

def construir(nombre):
    js = leer(AQUI / "juegos" / f"{nombre}.js")
    # «// @incluir archivo.js» agrega generadores compartidos (por ejemplo, los de olimpiada)
    for inc in re.findall(r"//\s*@incluir\s+(\S+)", js):
        js = leer(AQUI / inc) + "\n" + js
    extra = AQUI / "juegos" / f"{nombre}.css"
    titulo = re.search(r'title:\s*"([^"]+)"', js).group(1)
    html = PLANTILLA.format(
        titulo=titulo,
        css=leer(MOTOR / "motor.css") + "\n" + leer(AQUI / "comun.css") + ("\n" + leer(extra) if extra.exists() else ""),
        personajes=leer(MOTOR / "personajes.js"), motor=leer(MOTOR / "motor.js"),
        comun=leer(AQUI / "comun.js"), juego=js)
    SALIDA.mkdir(parents=True, exist_ok=True)
    (SALIDA / f"{nombre}.html").write_text(html, encoding="utf-8")
    return nombre

if __name__ == "__main__":
    for n in (sys.argv[1:] or sorted(p.stem for p in (AQUI / "juegos").glob("*.js"))):
        print("✔", construir(n) + ".html")
