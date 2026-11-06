/* Tema 28 · La mitad de una cantidad · Lula */
const GEN = [
  [
    () => { const e = pick(["🍪", "🍓", "⚽", "🌸"]), n = 2 * between(1, 6), ans = n / 2;
      return { prompt: `¿Cuál es la <b>mitad</b> de ${n}?`, say: `¿Cuál es la mitad de ${n}?`, scene: line(em(e, n)), ans, opts: numOpts(ans, [n, 2 * n, ans + 1], 0), why: `${n} repartido en 2 grupos iguales: ${ans} y ${ans}.`, hint: "Reparte en 2 grupos iguales." }; },
  ],
  [
    () => { const n = 10 * between(2, 9) * (rnd(2) ? 1 : 1), ans = n / 2;
      return { prompt: `Karina dice: «Yo tengo <b>${n}</b> muñecas». Margie responde: «Pues yo tengo la <b>mitad</b>». ¿Cuántas muñecas tiene Margie?`, say: `Karina tiene ${n} muñecas y Margie la mitad. ¿Cuántas tiene Margie?`, scene: "", ans, opts: numOpts(ans, [n, 2 * n, ans + 10], 0), why: `La mitad de ${n} es ${ans}.`, hint: "La mitad de 10 es 5, la mitad de 20 es 10…" }; },
  ],
  [
    () => { const n = 4 * between(2, 6), ans = n / 4;
      return { prompt: `¿Cuál es la <b>mitad de la mitad</b> de ${n}?`, say: `¿Cuál es la mitad de la mitad de ${n}?`, scene: "", ans, opts: numOpts(ans, [n / 2, n, ans + 1], 0), why: `La mitad de ${n} es ${n / 2}; la mitad de ${n / 2} es ${ans}.`, hint: "Dos pasos: primero la mitad, luego otra vez la mitad." }; },
    () => { const d = 2 * between(2, 6), o = between(2, 4), ans = d / 2;
      return { prompt: "La mitad de los dados 🎲 que hay es:", say: "Cuenta solo los dados. ¿Cuál es la mitad?", scene: `<div class="dice">${shuffle([...Array(d).fill(0).map(() => dieSvg(between(1, 6), 42)), ...em("<span style='font-size:34px'>⚫</span>", o)]).join("")}</div>`, ans, opts: numOpts(ans, [d, d + o, (d + o) >> 1 !== ans ? (d + o) >> 1 : ans + 1], 0), why: `Hay ${d} dados. La mitad es ${ans}.`, hint: "¡Las bolitas negras no son dados!" }; },
  ]
];
lesson({ n: 28, title: "La mitad de una cantidad", short: "La mitad", char: "lula", music: "calma", deco: ["🍕", "½", "🍪", "🎲"],
  hello: "¡Hola! Soy <b>Lula</b> 🦊. La <b>mitad</b> es repartir en <b>dos partes iguales</b>.",
  levels: LEVELS3(["¿Cuál es la mitad?", "Dos grupos iguales"], ["Problemas de la mitad", "Muñecas y más"], ["", "Mitad de la mitad y dados"]) }, GEN);
