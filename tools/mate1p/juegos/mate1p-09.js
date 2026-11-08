/* Tema 9 · Orden de números · Lula */
const NIN = ["Carmen", "César", "Patrick", "Daniel", "Lucía", "Mateo"];
const GEN = [
  [
    () => { const ns = sample([...Array(60).keys()].map(x => x + 1), 4), big = rnd(2) === 0, ans = big ? Math.max(...ns) : Math.min(...ns);
      return { prompt: `¿Cuál es el número <b>${big ? "mayor" : "menor"}</b>?`, say: `¿Cuál es el número ${big ? "mayor" : "menor"}?`, scene: "", ans, opts: ns, cols: 4, why: `${ans} es el ${big ? "mayor" : "menor"}.`, hint: "Compara primero las decenas.",
        steps: T => { const D = ns.map(x => Math.floor(x / 10));
          return [
            { t: `Para comparar, miramos primero las <b>decenas</b> (la cifra de la izquierda). Más decenas = número más grande.`, b: BOARD.table([["Número", ...ns], ["Decenas", ...D]]) },
            { t: `En la recta numérica: el <b>mayor</b> queda más a la derecha y el <b>menor</b> más a la izquierda.`, b: BOARD.marks(ns, { min: 0, max: 60 }) },
            { t: `El ${big ? "mayor" : "menor"} es <b>${ans}</b>.` }
          ]; },
        err: o => `${o} no es el ${big ? "mayor" : "menor"}. Compara primero las decenas.` }; },
  ],
  [
    () => { const ns = sample([...Array(90).keys()].map(x => x + 5), 4), asc = rnd(2) === 0, ok = [...ns].sort((a, b) => asc ? a - b : b - a);
      const f = a => a.join(" , "); const wrong = [];
      while (wrong.length < 3) { const p = f(shuffle(ns)); if (p !== f(ok) && !wrong.includes(p)) wrong.push(p); }
      return { prompt: `¿Qué fila está ordenada de <b>${asc ? "menor a mayor" : "mayor a menor"}</b>?`, say: `¿Qué fila está ordenada de ${asc ? "menor a mayor" : "mayor a menor"}?`, scene: "", ans: f(ok), opts: shuffle([f(ok), ...wrong]), cols: 1, cls: "grp",
        why: `Bien ordenado: ${f(ok)}.`, hint: asc ? "Empieza por el más pequeño." : "Empieza por el más grande.",
        steps: T => [
          { t: `Ubicamos los cuatro números en la recta numérica:`, b: BOARD.marks(ns, { min: 0, max: 100 }) },
          { t: `${asc ? "De menor a mayor: leemos la recta de <b>izquierda a derecha</b>." : "De mayor a menor: leemos la recta de <b>derecha a izquierda</b>."}`, bAdd: BOARD.seq(ok, { diffs: Array(3).fill(null) }) },
          { t: `La fila bien ordenada es <b>${f(ok)}</b>.`, bAdd: BOARD.lines([ok.join(asc ? " < " : " > ")]) }
        ] }; },
  ],
  [
    () => { const ns = sample([...Array(80).keys()].map(x => x + 10), 5), asc = rnd(2) === 0, pos = between(2, 4), ord = [...ns].sort((a, b) => asc ? a - b : b - a), ans = ord[pos - 1];
      return { prompt: `Si ordenamos de <b>${asc ? "menor a mayor" : "mayor a menor"}</b>, ¿qué número queda en el lugar <b>${pos}</b>?`, say: `Si ordenamos de ${asc ? "menor a mayor" : "mayor a menor"}, ¿qué número queda en el lugar ${pos}?`,
        scene: `<div class="seq">${ns.join(" ; ")}</div>`, ans, opts: shuffle([ans, ...sample(ns.filter(x => x !== ans), 3)]), cols: 4, why: `Ordenados: ${ord.join(", ")}. En el lugar ${pos} está ${ans}.`, hint: "Ordénalos todos primero.",
        steps: T => [
          { t: `Primero ordenamos todos los números de ${asc ? "menor a mayor" : "mayor a menor"}, comparando las decenas:`, b: BOARD.seq(ord, { diffs: Array(4).fill(null) }) },
          { t: `Ahora contamos los lugares: 1.º, 2.º, 3.º… hasta el lugar <b>${pos}</b>.`, b: BOARD.seq(ord.map((x, i) => `${x}<sup>${i + 1}</sup>`), { diffs: Array(4).fill(null), hl: pos - 1 }) },
          { t: `En el lugar ${pos} está <b>${ans}</b>.` }
        ] }; },
    () => { const ks = sample(NIN, 3), p = sample([12, 14, 15, 16, 17, 18, 19, 20], 3), ord = [0, 1, 2].sort((i, j) => p[j] - p[i]), f = o => o.map(i => ks[i]).join(" – "), ans = f(ord);
      const perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]].map(f).filter(x => x !== ans);
      return { prompt: "En la evaluación, ¿cuál es el orden de <b>mayor a menor</b> puntaje?", say: "¿Cuál es el orden de mayor a menor puntaje?", scene: `<div class="story">${ks.map((k, i) => `${k} obtuvo <b>${p[i]}</b> puntos.`).join("<br>")}</div>`,
        ans, opts: shuffle([ans, ...sample(perms, 3)]), cols: 1, cls: "grp", why: ks.map((k, i) => `${k}: ${p[i]}`).join(" · "), hint: "Primero va el que tiene más puntos.",
        steps: T => [
          { t: `Anotamos los puntos de cada uno en una tabla:`, b: BOARD.table([["Nombre", ...ks], ["Puntos", ...p]]) },
          { t: `De mayor a menor: primero va quien tiene <b>más</b> puntos.`, bAdd: BOARD.lines(ord.map((i, k) => `${k + 1}.º ${ks[i]} (${p[i]})`), { step: .7 }) },
          { t: `El orden es <b>${ans}</b>.` }
        ] }; },
  ]
];
lesson({ n: 9, title: "Orden de números de menor a mayor y de mayor a menor", short: "Ordenar", char: "lula", music: "aventura", deco: ["📶", "1️⃣", "2️⃣", "3️⃣"],
  hello: "¡Hola! Soy <b>Lula</b> 🦊. Los números se pueden ordenar como una <b>escalera</b>: de menor a mayor o de mayor a menor.",
  levels: LEVELS3(["Mayor y menor", "¿Cuál es el más grande?"], ["Filas ordenadas", "¿Cuál está bien ordenada?"], ["", "Lugares y puntajes"]) }, GEN);
