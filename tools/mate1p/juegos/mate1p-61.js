// @incluir olimpiada.js
/* Tema 61 · Simulacro de Olimpiadas de Matemáticas 1.º de primaria · Rayo y todos */
const EXTRA = [
  d => { const e = pick(["🧦", "👟", "🥚"]), n = 2 * between(4, 9), ans = n / 2; return { prompt: `¿Cuántos <b>pares</b> de ${e} hay?`, say: "¿Cuántos pares hay?", scene: scatter(em(e, n)), ans, opts: numOpts(ans, [n, ans + 1, ans - 1], 1), why: `${n} ÷ 2 = ${ans} pares.`, hint: "Un par son 2.",
    steps: T => [
      { t: `Un <b>par</b> son 2. Formamos grupos de 2:`, go: T.pairs(T.its(), { near: true, both: true, say: k => "par " + k }) },
      { t: `Hay ${n} y formamos ${ans} pares.` },
      { t: `Son <b>${ans}</b> pares.` }
    ],
    err: w => w === n ? "Esas son las cosas sueltas; piden pares." : "" }; },
  d => { const n = between(4, 6), ans = n * n - n, p = new Set(Array.from({ length: n }, (_, i) => i * n + i)); return { prompt: "¿Cuántos cuadritos del mismo tamaño <b>no</b> están pintados?", say: "¿Cuántos cuadritos no están pintados?", scene: gridSvg(n, n, p, { cell: 30 }), ans, opts: numOpts(ans, [n * n, n, ans + 1], 1), why: `${n * n} − ${n} = ${ans}.`, hint: "Todos menos los pintados.",
    steps: T => [
      { t: `Primero todos: ${n} filas de ${n} = ${n * n} cuadritos.`, go: T.count(T.its("rect").filter(x => +x.dataset.c === n - 1), { label: i => String(i * n), say: i => String(i * n), ms: 1000 }) },
      { t: `Los pintados forman una diagonal: ${n}.`, go: d2 => { T.paint(T.of("P", "rect"), "#f59e0b"); setTimeout(d2, 700); } },
      { t: `${n * n} − ${n} = <b>${ans}</b>.`, b: BOARD.lines([`${n * n} − ${n} = ${ans}`]) }
    ] }; },
  d => { const h = between(4, 9), ans = 12 - h; return { prompt: `¿Cuántos lápices le faltan a Sophia para completar <b>una docena</b>?`, say: "¿Cuántos lápices le faltan para completar una docena?", scene: line(em("✏️", h)), ans, opts: numOpts(ans, [h, 10 - h, ans + 1], 0), why: `12 − ${h} = ${ans}.`, hint: "Una docena = 12.",
    steps: T => [
      { t: `Una docena son <b>12</b>. Sophia tiene ${h}. Contamos desde ${h} hasta 12:`, b: BOARD.jumps(h, Array(ans).fill(1), { step: .35 }) },
      { t: `Dimos ${ans} saltos: 12 − ${h} = ${ans}.` },
      { t: `Le faltan <b>${ans}</b>.` }
    ],
    err: w => w === 10 - h ? "Una docena son 12, no 10." : "" }; },
  d => { const w = "concurso", L = [..."concurso"], ans = new Set(L).size; return { prompt: "¿Cuántos elementos tiene el conjunto E?", say: "¿Cuántos elementos tiene el conjunto E?", scene: setTxt("E", L), ans, opts: numOpts(ans, [L.length, ans + 1, ans - 1], 1), why: `Sin repetir: ${[...new Set(L)].join(", ")} → ${ans}.`, hint: "Las letras repetidas cuentan una vez.",
    steps: T => { const els = T.its(), seen = new Set(), firsts = [], reps = [];
      els.forEach(x => { const l = x.textContent.trim(); if (seen.has(l)) reps.push(x); else { seen.add(l); firsts.push(x); } });
      return [
        { t: `En un conjunto, cada elemento va una sola vez. Apagamos las letras repetidas:`, go: d2 => { T.dim(reps); setTimeout(d2, 700); } },
        { t: `Contamos las letras distintas:`, go: T.count(firsts) },
        { t: `${[...seen].join(", ")}: <b>${ans}</b> elementos.` }
      ]; } }; },
];
const ALL = [...OLI_NUM, ...OLI_FIG, ...EXTRA];
const GEN = [0, 1, 2].map(d => ALL.map(g => () => g(d)));
lesson({ n: 61, title: "Simulacro de Olimpiadas de Matemáticas 1.º de primaria", short: "Simulacro", char: "rayo", music: "epica", rounds: 12, deco: ["🏆", "🥇", "📝", "⭐"],
  hello: "¡Hola! Soy <b>Rayo</b> 🐉. Este es un <b>simulacro</b>: preguntas variadas como en el día del concurso. ¡Lee con calma y piensa antes de responder!",
  intro: "Son 12 preguntas por simulacro. Aprueba con 9 a la primera.",
  champion: "¡Estás listo para la olimpiada! 🏆",
  levels: [{ title: "Simulacro 1", icon: "📝", desc: "Nivel inicial" }, { title: "Simulacro 2", icon: "📝", desc: "Nivel intermedio" }, { title: "Simulacro 3", icon: "🏆", desc: "Nivel concurso" }] }, GEN);
