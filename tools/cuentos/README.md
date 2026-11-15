# Cuentos: cómo agregar uno nuevo

1. Escribe la historia en `historias_e.py` (o un archivo nuevo `historias_f.py` y agrégalo a la lista de `build.py`):
   `STORIES[NN] = {"title", "emoji", "category", "scenes": [6 escenas {img, alt, p, d}], "msg"}`.
   Los dibujos se arman con las funciones de `ilustra.py` (fondos, personajes con emociones, globos de diálogo).
2. Construye: `python3 tools/cuentos/build.py . NN` → crea `cuentoNN.html` y `Cuentos/cNN-1..6.svg`.
3. Miniatura: `thumbs.js` con `{"NN": ["cNN-6.svg", cx, cy, tamaño]}` → guardar como `Cuentos/mini/cNN.webp` (240×240).
4. Agrega el cuento a `const stories` en `ruta-cuentos.html` y sube `CACHE_VERSION` en `service-worker.js`.

Cuentos 31-38 (módulo «Crece»): perseverancia, nervios y miedo, frustración ante el error, hábitos,
pedir ayuda, emociones básicas, familia que cambia y duelo.
