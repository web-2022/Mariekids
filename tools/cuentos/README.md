# Cuentos: cómo agregar uno nuevo

## Carpetas (según la edad para la que se escribió el cuento)
```
Cuentos/
 ├── 3-anios/        cuentoNN.html + img/cNN-1..6.svg
 ├── 4-5-anios/
 ├── primaria-1-2/
 ├── primaria-3-4/
 ├── primaria-5-6/
 ├── secundaria/
 └── mini/           miniaturas cNN.webp (240×240) para los menús
```
La carpeta solo ordena: Crece y el menú de cuentos de cada grado pueden mostrar cuentos de otras carpetas.
En la raíz quedan `cuentoNN.html` pequeños que redirigen a la carpeta (para no romper enlaces antiguos).

## Pasos
1. Escribe la historia en `historias_f.py` (o un archivo nuevo, agregado a la lista de `build.py`):
   `STORIES[NN] = {"title", "emoji", "category", "scenes": [{img, alt, p, d}], "msg", "extra": [(título, [líneas])]}`.
   `extra` son las tarjetas finales (Conversemos, Practiquemos en casa, Para papá y mamá).
   Los dibujos se arman con `ilustra.py` (fondos, personajes con emociones, globos de diálogo).
2. Pon el número en su carpeta en `carpetas.py` (y en `FOLDER` de las páginas `ruta-crece*.html`).
3. Construye: `python3 tools/cuentos/build.py . NN` → `Cuentos/<carpeta>/cuentoNN.html` y sus imágenes.
4. Miniatura: `thumbs.js` → `Cuentos/mini/cNN.webp`.
5. Agrega el cuento a `const stories` en `ruta-cuentos.html` (href `Cuentos/<carpeta>/cuentoNN.html`) y,
   si es de Crece, ponle `n: NN` en la página de Crece de su edad. Sube `CACHE_VERSION`.

Textos en borrador de 3 años: `3anos/*.txt`.
