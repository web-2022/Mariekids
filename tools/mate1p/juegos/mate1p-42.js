/* Tema 42 · Analogías numéricas y gráficas · Mika */
const PARES = [["🐶", "🦴"], ["🐱", "🐟"], ["🐝", "🌸"], ["🐵", "🍌"], ["🐰", "🥕"], ["🐦", "🪺"], ["🐟", "🌊"], ["👟", "🧦"], ["✏️", "📒"], ["🔑", "🔒"], ["☀️", "🌞"], ["🌧️", "☂️"]];
const fila = (a, c, b) => `<div class="seq">${a} &nbsp;<span class="card-op">${c}</span>&nbsp; ${b}</div>`;
const GEN = [
  [
    () => { const [p, q] = sample(PARES, 2), ans = q[1];
      return { prompt: `${p[0]} es a ${p[1]} como ${q[0]} es a…`, say: "Descubre la relación y completa la analogía.", scene: `<div class="seq">${p[0]} → ${p[1]}<br>${q[0]} → ❓</div>`, ans, opts: shuffle([ans, ...sample(PARES.filter(x => x !== q && x !== p).map(x => x[1]), 3)]), cols: 4, why: `${p[0]} va con ${p[1]}, y ${q[0]} va con ${ans}.`, hint: "¿Qué relación hay entre los dos primeros?",
        steps: T => [
          { t: `Una <b>analogía</b> es una relación que se repite. Primero descubrimos la relación de los dos primeros: ¿por qué ${p[0]} va con ${p[1]}?` },
          { t: `${p[0]} va con ${p[1]} porque los dos «van juntos» (uno usa, come o necesita al otro). Buscamos lo que va con ${q[0]} de la misma forma.`, b: BOARD.lines([`${p[0]} → ${p[1]}`, `${q[0]} → ?`]) },
          { t: `${q[0]} va con <b>${ans}</b>.`, b: BOARD.lines([`${p[0]} → ${p[1]}`, `${q[0]} → ${ans}`]) }
        ] }; },
  ],
  [
    () => { const r = pick([["el doble", x => 2 * x], ["+3", x => x + 3], ["+10", x => x + 10], ["−2", x => x - 2]]), xs = sample([3, 4, 5, 6, 7, 8, 9], 3), ans = r[1](xs[2]);
      return { prompt: "Completa la analogía numérica:", say: "Mira la regla de los dos primeros y completa.", scene: `<div class="seq">${xs[0]} → ${r[1](xs[0])}<br>${xs[1]} → ${r[1](xs[1])}<br>${xs[2]} → ❓</div>`, ans, opts: numOpts(ans, [ans + 1, ans - 1, xs[2] + 2], 0), why: `La regla es «${r[0]}»: ${xs[2]} → ${ans}.`, hint: "¿Qué le pasa al primer número para obtener el segundo?",
        steps: T => [
          { t: `Miramos qué le pasa al primer número para obtener el segundo, en las dos primeras filas:`, b: BOARD.lines([`${xs[0]} → ${r[1](xs[0])}`, `${xs[1]} → ${r[1](xs[1])}`]) },
          { t: `La regla es «<b>${r[0]}</b>»: funciona en las dos filas.` },
          { t: `Aplicamos la regla a ${xs[2]}: <b>${ans}</b>.`, b: BOARD.lines([`${xs[0]} → ${r[1](xs[0])} ✅`, `${xs[1]} → ${r[1](xs[1])} ✅`, `${xs[2]} → ${ans}`]) }
        ] }; },
  ],
  [
    () => { const op = pick(["+", "−"]), mk = () => { const a = between(2, 9), b = between(1, a - 1); return [a, op === "+" ? a + b : a - b, b]; }, rows = [mk(), mk(), mk()], ans = rows[2][1];
      return { prompt: "¿Qué número va en el centro de la tercera fila?", say: "Descubre la regla de las dos primeras filas y halla el número del centro.", scene: rows.map((r, i) => fila(r[0], i < 2 ? r[1] : "?", r[2])).join(""), ans, opts: numOpts(ans, [op === "+" ? rows[2][0] - rows[2][2] : rows[2][0] + rows[2][2], ans + 1, ans - 1].filter(x => x !== ans), 0),
        why: `En el centro va la ${op === "+" ? "suma" : "resta"} de los de los lados: ${rows[2][0]} ${op} ${rows[2][2]} = ${ans}.`, hint: "Prueba sumar o restar los números de los lados.",
        steps: T => [
          { t: `Buscamos la regla en las dos primeras filas: ¿cómo se obtiene el número del centro con los de los lados?` },
          { t: `Probamos:`, b: BOARD.lines(rows.slice(0, 2).map(r2 => `${r2[0]} + ${r2[2]} = ${r2[0] + r2[2]} ${op === "+" ? "✅" : "❌"} · ${r2[0]} − ${r2[2]} = ${r2[0] - r2[2]} ${op === "−" ? "✅" : "❌"}`), { step: .9 }) },
          { t: `La regla es <b>${op === "+" ? "sumar" : "restar"}</b>: ${rows[2][0]} ${op} ${rows[2][2]} = <b>${ans}</b>.` }
        ] }; },
  ]
];
lesson({ n: 42, title: "Analogías numéricas y gráficas", short: "Analogías", char: "mika", music: "misterio", deco: ["🪞", "🐶", "🦴", "❓"],
  hello: "¡Hola! Soy <b>Mika</b> 🦉. Una <b>analogía</b> es una relación: «el perro es al hueso como el gato es al pez».",
  levels: LEVELS3(["Analogías con dibujos", "¿Qué va con qué?"], ["Analogías con números", "Descubre la regla"], ["", "El número del centro"]) }, GEN);
