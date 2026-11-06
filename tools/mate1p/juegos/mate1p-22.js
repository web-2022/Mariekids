/* Tema 22 · Restas de una y dos cifras · Tito */
const vert = (a, b) => `<div class="eqs" style="font-family:monospace;align-items:flex-end"><div>${a}</div><div>− ${b}</div><div style="border-top:3px solid #1e293b;min-width:90px;text-align:right">?</div></div>`;
const GEN = [
  [
    () => { const a = between(5, 18), b = between(1, Math.min(9, a - 1)), ans = a - b;
      return { prompt: `${a} − ${b} = ?`, say: `¿Cuánto es ${a} menos ${b}?`, scene: "", ans, opts: numOpts(ans, [a + b, ans + 1, ans - 1], 0), why: `${a} − ${b} = ${ans}.`, hint: `Cuenta hacia atrás ${b} veces desde ${a}.` }; },
  ],
  [
    () => { const a = between(30, 99), b = between(11, a - 10), ans = a - b;
      return { prompt: "Resuelve la resta:", say: `¿Cuánto es ${a} menos ${b}?`, scene: vert(a, b), ans, opts: numOpts(ans, [ans + 10, ans - 10, a + b > 99 ? ans + 2 : a + b], 0), why: `${a} − ${b} = ${ans}.`, hint: "Resta primero las unidades. Si no alcanza, pide prestado 1 decena." }; },
  ],
  [
    () => { const a = between(10, 20), b = between(2, 9), c = between(2, 9), ans = a - b + c;
      return { prompt: `Resuelve: <b>${a} − ${b} + ${c}</b>`, say: `Resuelve ${a} menos ${b} más ${c}.`, scene: `<div class="legend">De izquierda a derecha</div>`, ans, opts: numOpts(ans, [a - b - c, a + b + c, a - (b + c)].filter(x => x !== ans), 0), why: `${a} − ${b} = ${a - b}; ${a - b} + ${c} = ${ans}.`, hint: "Haz las operaciones en orden, de izquierda a derecha." }; },
    () => { const a = between(15, 45), b = between(a + 5, 60), ans = b - a;
      return { prompt: `¿Cuánto le falta a <b>${a}</b> para llegar a <b>${b}</b>?`, say: `¿Cuánto le falta a ${a} para llegar a ${b}?`, scene: "", ans, opts: numOpts(ans, [a + b, ans + 10, ans + 1], 0), why: `${b} − ${a} = ${ans}.`, hint: "Resta el número mayor menos el menor." }; },
  ]
];
lesson({ n: 22, title: "Restas de una y dos cifras", short: "Restas", char: "tito", music: "electro", deco: ["➖", "🔢", "🧮", "✨"],
  hello: "¡Bip bup! Soy <b>Tito</b> 🤖. Vamos a <b>restar</b> números de una y dos cifras.",
  levels: LEVELS3(["Una cifra", "Restas hasta 18"], ["Dos cifras", "Restas en columna"], ["", "Operaciones en orden y cuánto falta"]) }, GEN);
