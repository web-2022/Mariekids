#!/usr/bin/env python3
"""Arma cada juego de Ejercicios mentales como un solo archivo HTML.

Uso:  python3 tools/ejercicios-mentales/construir.py            (todos)
      python3 tools/ejercicios-mentales/construir.py EM-Adivinanzas

Cada juego está en juegos/<archivo>.js (y opcionalmente juegos/<archivo>.css).
El resultado se guarda en la raíz del sitio: <archivo>.html
"""
import re, sys, pathlib

AQUI = pathlib.Path(__file__).resolve().parent
RAIZ = AQUI.parent.parent
leer = lambda p: p.read_text(encoding="utf-8")

PLANTILLA = """<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>MK • {titulo}</title>
    <!-- PWA -->
    <meta name="apple-mobile-web-app-title" content="MK" />
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#1976d2">
    <!-- Generado por tools/ejercicios-mentales/construir.py: edita los archivos de esa carpeta -->
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
{juego}
}});
    </script>
    <script>
      if ("serviceWorker" in navigator) {{
        window.addEventListener("load", () => {{ navigator.serviceWorker.register("./service-worker.js").catch(() => {{ }}); }});
      }}
    </script>
  </head>
  <body></body>
</html>
"""

def construir(nombre):
    js = leer(AQUI / "juegos" / f"{nombre}.js")
    css_extra = AQUI / "juegos" / f"{nombre}.css"
    titulo = re.search(r'title:\s*"([^"]+)"', js).group(1)
    html = PLANTILLA.format(
        titulo=titulo,
        css=leer(AQUI / "motor.css") + ("\n" + leer(css_extra) if css_extra.exists() else ""),
        personajes=leer(AQUI / "personajes.js"),
        motor=leer(AQUI / "motor.js"),
        juego=js,
    )
    (RAIZ / f"{nombre}.html").write_text(html, encoding="utf-8")
    return nombre

if __name__ == "__main__":
    nombres = sys.argv[1:] or sorted(p.stem for p in (AQUI / "juegos").glob("*.js"))
    for n in nombres:
        print("✔", construir(n) + ".html")
