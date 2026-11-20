#!/usr/bin/env python3
"""Genera los juegos de 3 años (3years/juegos/*.html) desde tools/juegos3/<juego>.{css,js}.
Plantilla común: barra, HUD, menú de niveles y pantalla final (assets/mk-peques.js)."""
import os
AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.abspath(os.path.join(AQUI, "..", ".."))
V = "2"
JUEGOS = [
    ("pesca", "🐟", "Pesca de números", "Toca o arrastra el pez que tiene el número que escuchas.", "#bdeaff"),
    ("canasta", "🧺", "Llena la canasta", "Arrastra con el dedo tantas frutas como dice el número.", "#e3f8d4"),
    ("tren", "🚂", "El tren ordenado", "Arrastra los vagones y ordénalos: 1, 2, 3…", "#fff1d6"),
    ("rana", "🐸", "La rana saltarina", "Haz saltar a la rana por los números.", "#d7f5e8"),
    ("globos", "🎈", "Revienta globos", "Revienta el globo con el número que escuchas.", "#e0f2fe"),
    ("nido", "🐣", "Nido de pollitos", "Lleva a cada mamá gallina tantos pollitos como dice su número.", "#fefce8"),
    ("medias", "🧦", "Parejas de medias", "Junta cada media con su pareja.", "#f5f3ff"),
    ("galletas", "🍪", "¿Dónde hay más?", "Mira los platos y toca donde hay más (o menos).", "#fff7ed"),
    ("pinta", "🎨", "Pinta por número", "Pinta cada parte del dibujo con el color de su número.", "#fdf4ff"),
    ("dinos", "🦖", "Dinosaurios por tamaño", "Ordena los dinosaurios de pequeño a grande.", "#f7fee7"),
    ("figuras", "🔷", "Clasifica figuras", "Guarda cada figura en su caja.", "#eff6ff"),
    ("gusano", "🐛", "Gusano de patrones", "Completa el patrón del gusano.", "#f0fdf4"),
    ("monedas", "💰", "Monedas", "Conoce las monedas y paga el precio justo.", "#fefce8"),
    ("rutina", "🌅", "Mi día", "Ordena lo que pasa primero, después y al final.", "#f5f3ff"),
]
PLANTILLA = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no" />
    <title>MK {titulo} · 3 años</title>
    <meta name="theme-color" content="#0b73ff" />
    <meta name="apple-mobile-web-app-title" content="MK" />
    <link rel="manifest" href="../../manifest.json" />
    <link rel="apple-touch-icon" href="../../icons/icon-192.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@700;800;900&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="../../assets/mk-juegos.css" />
    <link rel="stylesheet" href="../../assets/mk-peques.css?v={v}" />
    <style>
        body {{ background: {fondo}; }}
{css}
    </style>
</head>
<body>
    <!-- GENERADO por tools/juegos3/build.py — edita tools/juegos3/{id}.css / {id}.js -->
    <div class="bar">
        <a class="pill" href="../juegos3Y.html" aria-label="Volver a los juegos">⬅<span class="txt"> Juegos</span></a>
        <h1>{emoji} {titulo}</h1>
        <button class="pill" id="soundBtn" type="button" aria-label="Sonido">🔊</button>
    </div>
    <div class="hud" aria-live="polite"><span id="hudLevel">Nivel 1</span><span id="hudQ"></span><span id="hudOk">⭐ 0</span></div>
    <main class="stage"><div class="card" id="card"></div></main>
    <div class="overlay show" id="startScreen">
        <div class="panel">
            <h2>{emoji} {titulo}</h2>
            <p>{intro}</p>
            <div class="levels" id="levels"></div>
        </div>
    </div>
    <div class="overlay" id="endScreen">
        <div class="panel">
            <h2>¡Muy bien! 🎉</h2>
            <div class="stars-big" id="endStars">⭐⭐⭐</div>
            <p id="endText"></p>
            <div class="row">
                <button class="big-btn alt" id="menuBtn" type="button">📋 Niveles</button>
                <button class="big-btn" id="nextBtn" type="button">▶ Siguiente</button>
            </div>
        </div>
    </div>
    <script src="../../assets/mk-juegos.js?v=2"></script>
    <script src="../../assets/mk-peques.js?v={v}"></script>
    <script>
{js}
    </script>
</body>
</html>
"""
for jid, emoji, titulo, intro, fondo in JUEGOS:
    css = open(os.path.join(AQUI, jid + ".css"), encoding="utf-8").read()
    js = open(os.path.join(AQUI, jid + ".js"), encoding="utf-8").read()
    html = PLANTILLA.format(titulo=titulo, emoji=emoji, intro=intro, fondo=fondo, css=css, js=js, id=jid, v=V)
    open(os.path.join(RAIZ, "3years", "juegos", jid + ".html"), "w", encoding="utf-8").write(html)
    print("ok", jid)
