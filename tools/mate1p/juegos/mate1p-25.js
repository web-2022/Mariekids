/* Tema 25 · Problemas de resta y comparación · Coco */
const N = ["Luchito", "Sophia", "Mateo", "Valeria", "Gabriel", "Camila"];
const GEN = [
  [
    () => { const a = pick(N), x = between(8, 20), y = between(2, x - 2), ans = x - y;
      return { prompt: `${a} tenía <b>${x}</b> caramelos y se comió <b>${y}</b>. ¿Cuántos le quedan?`, say: `Tenía ${x} caramelos y se comió ${y}. ¿Cuántos le quedan?`, scene: "", ans, opts: numOpts(ans, [x + y, y, ans + 1], 0), why: `${x} − ${y} = ${ans}.`, hint: "«Le quedan» → restamos." }; },
  ],
  [
    () => { const [a, b] = sample(N, 2), x = between(10, 20), y = between(2, 7), ans = x - y;
      return { prompt: `${a} tiene <b>${x}</b> figuritas. ${b} tiene <b>${y} menos</b> que ${a}. ¿Cuántas tiene ${b}?`, say: `${a} tiene ${x}. ${b} tiene ${y} menos. ¿Cuántas tiene ${b}?`, scene: "", ans, opts: numOpts(ans, [x + y, y, x], 0), why: `${x} − ${y} = ${ans}.`, hint: "«Menos que» → restamos." }; },
    () => { const [a, b] = sample(N, 2), x = between(10, 25), y = between(3, x - 2), ans = x - y;
      return { prompt: `${a} tiene <b>${x}</b> soles y ${b} tiene <b>${y}</b>. ¿Cuántos soles <b>menos</b> tiene ${b}?`, say: `${a} tiene ${x} soles y ${b} tiene ${y}. ¿Cuántos menos tiene ${b}?`, scene: "", ans, opts: numOpts(ans, [x + y, x, y], 0), why: `${x} − ${y} = ${ans}.`, hint: "Busca la diferencia." }; },
  ],
  [
    () => { const t = between(15, 25), h = between(6, t - 4), ans = t - h;
      return { prompt: `Al comenzar el año, Luchito tenía <b>${t}</b> lápices y ha perdido algunos. Ahora tiene <b>${h}</b>. ¿Cuántos lápices ha perdido?`, say: `Tenía ${t} lápices y ahora tiene ${h}. ¿Cuántos perdió?`, scene: line(em("✏️", h)), ans, opts: numOpts(ans, [t + h, h, ans + 1], 0), why: `${t} − ${h} = ${ans}.`, hint: "Lo que tenía menos lo que tiene ahora." }; },
    () => { const b = between(150, 190), j = between(60, 99), ans = b - j;
      return { prompt: `Brenda lleva <b>${b}</b> giros con su hula hula y José lleva <b>${j}</b>. ¿Cuántos giros más lleva Brenda?`, say: `Brenda lleva ${b} giros y José ${j}. ¿Cuántos más lleva Brenda?`, scene: line(["👧", "⭕", "👦"]), ans, opts: numOpts(ans, [b + j, ans + 10, ans - 10], 0), why: `${b} − ${j} = ${ans}.`, hint: "Resta en columna: unidades, decenas y centenas." }; },
  ]
];
lesson({ n: 25, title: "Problemas de resta y comparación", short: "Problemas de resta", char: "coco", music: "funk", deco: ["➖", "📖", "✏️", "⚖️"],
  hello: "¡Hola! Soy <b>Coco</b> 🐵. Palabras como <b>quedan, perdió, menos que</b> nos avisan que hay que restar.",
  levels: LEVELS3(["Quitar", "¿Cuántos quedan?"], ["Comparar", "Menos que y diferencia"], ["", "¿Cuántos perdió? ¿Cuántos más?"]) }, GEN);
