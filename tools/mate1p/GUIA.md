# Matemática 1.º de primaria — guía para crear las lecciones

Las lecciones replican el estilo de los concursos de 1.º grado que envió el autor
(Auno 2023-2025, LiderMat A1, Prolog, Tesla, TalentGo, Pre Mar, Academia 369).

## Cómo son las preguntas de los concursos
- Una pregunta corta + **un dibujo que hay que observar** + **alternativas A) B) C) D)** (a veces E).
- Personajes con nombre ("Normita", "Luchito", "Panchito"): aquí usamos a los Mentecitos (Tito, Bimba, Kiki, Lula…).
- Las alternativas son números ordenados de menor a mayor e incluyen **errores típicos**
  (contar todo en vez de solo lo pedido, el total en vez de los pares, sumar en vez de restar…).
- Temas que más aparecen: conteo con condición (izquierda/derecha, que miran a la derecha, pares, mitad),
  conjuntos (diagrama de Venn, {c;o;n;c;u;r;s;o}), docena/decena, ábaco D-U, recta numérica (antecesor/sucesor),
  sucesiones (+2, cuadrados 1-4-9-16), operadores con figuras (⭐+⭐=…), balanzas, pirámides numéricas,
  distribuciones/analogías numéricas (números alrededor de un cuadrado/triángulo), conteo de triángulos,
  cuadrados y segmentos, cubos, coordenadas y recorridos con flechas, calendario, monedas/vuelto (S/),
  gráficos de barras, parentescos, problemas de dos pasos.

## Estructura de cada lección (3 niveles × 10 preguntas)
1. **Básico**: el concepto con apoyo visual.
2. **Intermedio**: con una condición o un paso más.
3. **Reto concurso**: preguntas como las del examen.

Se aprueba con 7 de 10 a la primera; el tema queda ✅ en el menú (`mk_topic_mate1p-NN_complete`).

## Temas
20 stages y 69 temas (ver `ruta-mate.html`). Temas 65-69 (añadidos después): 65 Fracciones (Stage 9), 66 Áreas y 68 Trazos de figuras (Stage 15), 67 Criptoaritmética y 69 Inecuaciones (Stage 14). En 1.º primaria los 3 niveles están abiertos (`openLevels`). Los temas 62 (Sumas con letras, Stage 14), 64 (Ecuaciones de primer grado, Stage 14) y 63 (Medida de segmentos, Stage 15) se añadieron después: su archivo tiene número alto, pero en el menú van en su stage y `next:` encadena el «Siguiente tema». El Stage 20 es de Olimpiadas:
59 Retos olímpicos (números), 60 Retos olímpicos (figuras y lógica) y 61 Simulacro (12 preguntas, aprueba con 9).
Los temas 59-61 usan `olimpiada.js` (se incluye con la línea `// @incluir olimpiada.js`).

## Archivos
- `juegos/mate1p-NN.js` (+ `.css` opcional): generadores de preguntas por nivel.
- `comun.js` / `comun.css`: `lesson()` (lección de 3 niveles), alternativas A-D, `numOpts`, `scatter`, `gridSvg`, `dieSvg`, `fishSvg`, `tenFrame`, `venn`, `abacus`, `numberLine`, `pyramid`, `balance`, `isoCubes`, `coordGrid`, `barChart`, `calendar`, monedas/billetes, `triFan`, `rectGrid`, `squareGrid`, `segPoints`…
- Motor y personajes: `tools/ejercicios-mentales/`.
- Construir: `python3 tools/mate1p/construir.py` → `1primary/mate1p/mate1p-NN.html`.
- Probar: `node tools/ejercicios-mentales/probar.js 1primary/mate1p/mate1p-NN` (servidor en :8765).
- Cada generador se valida: una sola respuesta correcta y opciones distintas (`check`).

## Tutor «🙋 No entiendo, ¡ayúdame a resolver!» (todas las preguntas de los 64 temas)
Cada generador devuelve `steps` (y opcionalmente `err`). Aparece el botón debajo del dibujo y explica como un profesor:
**comprender → plan → hacer (en el dibujo o en la pizarra) → comprobar → «La respuesta es N, búscala»**.
El tutor nunca toca la respuesta. Usarlo marca la pregunta como «con ayuda» (no cuenta «a la primera»).

    steps: T => [
      { t: "Texto del paso (se lee en voz alta)", s: "texto distinto para la voz (opcional)" },
      { t: "Contamos:", go: T.count(T.its()) },                 // animación en el dibujo; al terminar se habilita «Siguiente paso»
      { t: "En la recta:", b: BOARD.jumps(7, [1, 1, 1]) },       // b = pizarra (reemplaza) · bAdd = agrega a la pizarra
    ],
    err: w => w === 16 ? "Esos son los zapatos sueltos; piden pares." : ""   // primer paso si ya marcó una alternativa equivocada
    ansTxt: "el grupo que tiene 6"                              // solo si la respuesta no es un número o texto simple

- **Cierre automático**: si el último paso no dice la respuesta, se agrega «La respuesta es N. 👇 Búscala…».
- **Ayuda según el error**: si el niño ya marcó una alternativa, el primer paso es «Elegiste X…» + `err(X)`.
- **Animaciones en el dibujo (`T`)**: `its(sel)`, `of(emoji o data-k, sel)`, `dim`, `badge`, `count(els, {label, say, from, cls, ms})`,
  `pairs(els, {near, both})`, `chunks(els, g)`, `split(els)` (2 grupos iguales), `paint(els, color)`, `cell(fila, col)` (tablas),
  `edges(forma, {vertices, label, say})` (recorre lados), `strokes(svg, [[x1,y1,x2,y2]…])`, `dots(svg, [[x,y]…])`, `flash(FIG.x(...))`, `clear()`.
- **Figuras escondidas (`FIG`)**: `triFan(m,h)`, `rects(r,c)`, `squares(n)`, `segs(p)`. Ayudas: `isoTops(H)`, `coordXY(w,h,x,y)`, `barGuide(vals,i)`.
- **Pizarra (`BOARD`)**: `jumps(a, saltos)`, `marks(vals)`, `groups([{n|items, e, c, lab}])`, `share(n, k, e)`, `du(n)`, `op([a,b,…], "+"|"-")`
  (en columna con «llevo»), `lines([...])`, `seq(terms, {diffs, hl})`, `table(rows, {hl})`, `big(html)`. `colTxt(nums, sign)` explica cada columna.
  `saltosHasta(a, b)` da los saltos «completando» (1 en 1 hasta la decena, luego de 10 en 10).
- Para animar un dibujo, cada objeto debe ir en `<span class="it" data-k="…">` (o tener `class="it"` en el SVG).
- Herramientas: `scratchpad/ins.py NN pasos.txt` inserta bloques `### nivel.generador`; `tutall.js` recorre el tutor de todos los
  generadores y comprueba que termine con la respuesta correcta.

## Pantallas
`comun.css` adapta la lección: celular pequeño (≤340 px), celular horizontal (dibujo a la izquierda, ayuda y alternativas a la derecha),
tablet y computadora (ancho 680–760 px y dibujos más grandes con `zoom`). Revisado sin scroll horizontal en 8 tamaños.
