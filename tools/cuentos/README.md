# Cuentos: cómo agregar uno nuevo

## Carpetas (según el grado para el que se escribió el cuento)
Las carpetas antiguas (4-5-anios, primaria-1-2, primaria-3-4) solo tienen páginas que redirigen.
```
Cuentos/
 ├── 3-anios/ 4-anios/ 5-anios/  cuentoNN.html + img/cNN-1..6.svg
 ├── primaria-1/ … primaria-6/
 ├── secundaria-1/ … secundaria-5/
 └── mini/           miniaturas cNN.webp (240×240) para los menús
```
La carpeta solo ordena: Crece y el menú de cuentos de cada grado pueden mostrar cuentos de otras carpetas.
En la raíz quedan `cuentoNN.html` pequeños que redirigen a la carpeta (para no romper enlaces antiguos).

## Pasos
1. Escribe la historia en `historias_f.py` (o un archivo nuevo, agregado a la lista de `build.py`; 40–49 de 1.º primaria están en `historias_g.py`):
   `STORIES[NN] = {"title", "emoji", "category", "scenes": [{img, alt, p, d}], "msg", "extra": [(título, [líneas])]}`.
   `extra` son las tarjetas finales (Conversemos, Practiquemos en casa, Para papá y mamá).
   Los dibujos se arman con `ilustra.py` (fondos, personajes con emociones, globos de diálogo).
2. Pon el número en su carpeta en `carpetas.py` (y en `FOLDER` de las páginas `ruta-crece*.html`).
3. Construye: `python3 tools/cuentos/build.py . NN` → `Cuentos/<carpeta>/cuentoNN.html` y sus imágenes.
4. Miniatura: `thumbs.js` → `Cuentos/mini/cNN.webp`.
5. Agrega el cuento a `const stories` en `ruta-cuentos.html` (href `Cuentos/<carpeta>/cuentoNN.html`) y,
   si es de Crece, ponle `n: NN` en la página de Crece de su edad. Sube `CACHE_VERSION`.

Textos en borrador de 3 años: `3anos/*.txt`.
