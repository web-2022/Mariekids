// @incluir olimpiada.js
/* Tema 61 · Simulacro de Olimpiadas de Matemáticas 1.º de primaria · Rayo y todos */
const EXTRA = [
  d => { const e = pick(["🧦", "👟", "🥚"]), n = 2 * between(4, 9), ans = n / 2; return { prompt: `¿Cuántos <b>pares</b> de ${e} hay?`, say: "¿Cuántos pares hay?", scene: scatter(em(e, n)), ans, opts: numOpts(ans, [n, ans + 1, ans - 1], 1), why: `${n} ÷ 2 = ${ans} pares.`, hint: "Un par son 2." }; },
  d => { const n = between(4, 6), ans = n * n - n, p = new Set(Array.from({ length: n }, (_, i) => i * n + i)); return { prompt: "¿Cuántos cuadritos del mismo tamaño <b>no</b> están pintados?", say: "¿Cuántos cuadritos no están pintados?", scene: gridSvg(n, n, p, { cell: 30 }), ans, opts: numOpts(ans, [n * n, n, ans + 1], 1), why: `${n * n} − ${n} = ${ans}.`, hint: "Todos menos los pintados." }; },
  d => { const h = between(4, 9), ans = 12 - h; return { prompt: `¿Cuántos lápices le faltan a Sophia para completar <b>una docena</b>?`, say: "¿Cuántos lápices le faltan para completar una docena?", scene: line(em("✏️", h)), ans, opts: numOpts(ans, [h, 10 - h, ans + 1], 0), why: `12 − ${h} = ${ans}.`, hint: "Una docena = 12." }; },
  d => { const w = "concurso", L = [..."concurso"], ans = new Set(L).size; return { prompt: "¿Cuántos elementos tiene el conjunto E?", say: "¿Cuántos elementos tiene el conjunto E?", scene: setTxt("E", L), ans, opts: numOpts(ans, [L.length, ans + 1, ans - 1], 1), why: `Sin repetir: ${[...new Set(L)].join(", ")} → ${ans}.`, hint: "Las letras repetidas cuentan una vez." }; },
];
const ALL = [...OLI_NUM, ...OLI_FIG, ...EXTRA];
const GEN = [0, 1, 2].map(d => ALL.map(g => () => g(d)));
lesson({ n: 61, title: "Simulacro de Olimpiadas de Matemáticas 1.º de primaria", short: "Simulacro", char: "rayo", music: "epica", rounds: 12, deco: ["🏆", "🥇", "📝", "⭐"],
  hello: "¡Hola! Soy <b>Rayo</b> 🐉. Este es un <b>simulacro</b>: preguntas variadas como en el día del concurso. ¡Lee con calma y piensa antes de responder!",
  intro: "Son 12 preguntas por simulacro. Aprueba con 9 a la primera.",
  champion: "¡Estás listo para la olimpiada! 🏆",
  levels: [{ title: "Simulacro 1", icon: "📝", desc: "Nivel inicial" }, { title: "Simulacro 2", icon: "📝", desc: "Nivel intermedio" }, { title: "Simulacro 3", icon: "🏆", desc: "Nivel concurso" }] }, GEN);
