# Conversación guiada: cómo agregar escenarios

Página: `conversacion.html` · Motor: `assets/conversacion.js` · Estilos: `assets/conversacion.css`.
Datos: un archivo por nivel en esta carpeta (`b0.js`, `b1.js`, `b2.js`, `b3.js`). Para agregar un escenario,
copia uno existente dentro de `escenarios: [ … ]` y cambia el `id` (único).

| Nivel | Curso | Temas |
|---|---|---|
| B0 | A0 | Saludos y presentaciones |
| B1 | A1–A2 | Situaciones cotidianas (tienda, colegio, familia) |
| B2 | B1–B2 | Contar experiencias y dar opiniones |
| B3 | C1 | Reuniones de trabajo, problemas y soluciones |

Campos de cada escenario: `id, emoji, titulo, intro, vocab [{en, es, ej}], clave [frases para escuchar y repetir],
pares [{palabras, es}] (pronunciación), turnos [...]`.

Campos de cada turno:
- `app` (pregunta en inglés) y `es` (traducción, oculta por defecto)
- `esperado`: respuesta modelo
- `variantes`: [{ t, nota }] otras respuestas correctas; `nota` explica cuál suena más natural
- `acepta`: expresiones regulares para respuestas abiertas (nombre, edad…), sobre el texto normalizado
  (minúsculas, sin signos, «I'm» → «i am», «don't» → «do not», números 0-20 en palabras)
- `errores`: [{ re, id, corr, exp }] errores frecuentes: expresión regular, código, corrección y explicación en español

El motor detecta además, sin configurar: falta de «the»/«a» y «didn't» en lugar de «don't».
Progreso: localStorage `mk_conv_v1` (estrellas, días, medallas y banco de errores con repetición espaciada).

## Conversaciones de cada clase (generadas)
Los archivos a0.js … c2.js se GENERAN con `python3 tools/ingles/conversaciones/construir.py`
a partir de `tools/ingles/conversaciones/<nivel>.txt` (formato compacto explicado al inicio de construir.py).
No edites a mano a0.js … c2.js: edita el .txt y vuelve a construir.
