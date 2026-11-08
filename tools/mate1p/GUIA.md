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
20 stages y 64 temas (ver `ruta-mate.html`). Los temas 62 (Sumas con letras, Stage 14), 64 (Ecuaciones de primer grado, Stage 14) y 63 (Medida de segmentos, Stage 15) se añadieron después: su archivo tiene número alto, pero en el menú van en su stage y `next:` encadena el «Siguiente tema». El Stage 20 es de Olimpiadas:
59 Retos olímpicos (números), 60 Retos olímpicos (figuras y lógica) y 61 Simulacro (12 preguntas, aprueba con 9).
Los temas 59-61 usan `olimpiada.js` (se incluye con la línea `// @incluir olimpiada.js`).

## Archivos
- `juegos/mate1p-NN.js` (+ `.css` opcional): generadores de preguntas por nivel.
- `comun.js` / `comun.css`: `lesson()` (lección de 3 niveles), alternativas A-D, `numOpts`, `scatter`, `gridSvg`, `dieSvg`, `fishSvg`, `tenFrame`, `venn`, `abacus`, `numberLine`, `pyramid`, `balance`, `isoCubes`, `coordGrid`, `barChart`, `calendar`, monedas/billetes, `triFan`, `rectGrid`, `squareGrid`, `segPoints`…
- Motor y personajes: `tools/ejercicios-mentales/`.
- Construir: `python3 tools/mate1p/construir.py` → `1primary/mate1p/mate1p-NN.html`.
- Probar: `node tools/ejercicios-mentales/probar.js 1primary/mate1p/mate1p-NN` (servidor en :8765).
- Cada generador se valida: una sola respuesta correcta y opciones distintas (`check`).
