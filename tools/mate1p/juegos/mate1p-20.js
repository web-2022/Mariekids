/* Tema 20 · Sumandos desconocidos e igualdades · Lula */
const GEN = [
  [
    () => { const a = between(2, 12), b = between(1, 8), c = a + b;
      return { prompt: `${a} + ⬜ = ${c}`, say: `${a} más cuánto es igual a ${c}?`, scene: "", ans: b, opts: numOpts(b, [c, a + c, b + 1], 0), why: `${a} + ${b} = ${c}.`, hint: `Cuenta desde ${a} hasta ${c}.` }; },
  ],
  [
    () => { const a = between(1, 9), b = between(5, 15), c = a + b;
      return { prompt: `⬜ + ${b} = ${c}`, say: `¿Qué número más ${b} es igual a ${c}?`, scene: "", ans: a, opts: numOpts(a, [c, b, a + 1], 0), why: `${a} + ${b} = ${c}.`, hint: `¿Cuánto le falta a ${b} para llegar a ${c}?` }; },
    () => { const a = between(2, 9), b = between(2, 9), c = between(1, a + b - 1), ans = a + b - c;
      return { prompt: `${a} + ${b} = ${c} + ⬜`, say: `${a} más ${b} es igual a ${c} más ¿cuánto?`, scene: `<div class="legend">Los dos lados deben valer lo mismo</div>`, ans, opts: numOpts(ans, [a + b, a + b + c, ans + 1], 0), why: `${a} + ${b} = ${a + b} y ${c} + ${ans} = ${a + b}.`, hint: "Primero resuelve el lado izquierdo." }; },
  ],
  [
    () => { const x = between(4, 10), a = between(1, x - 1), b = 2 * x - a, k = 3, ans = k * x;
      return { prompt: `Si 🐶 − ${a} = ${b} − 🐶, halla 🐶 + 🐶 + 🐶.`, say: `Si perrito menos ${a} es igual a ${b} menos perrito, ¿cuánto es perrito más perrito más perrito?`, scene: "", ans, opts: numOpts(ans, [x, 2 * x, ans + 3], 0),
        why: `Si 🐶 = ${x}: ${x} − ${a} = ${x - a} y ${b} − ${x} = ${b - x}. Entonces 3 × ${x} = ${ans}.`, hint: "Prueba valores para 🐶 hasta que los dos lados sean iguales." }; },
    () => { const v = between(1, 6), t = v + 3;
      return { prompt: `¿Qué valor debe tomar el círculo? ● + 3 = ${t}`, say: `Círculo más 3 es igual a ${t}. ¿Cuánto vale el círculo?`, scene: "", ans: v, opts: numOpts(v, [t, t + 3, v + 1], 0), why: `${v} + 3 = ${t}.`, hint: `¿Qué número más 3 da ${t}?` }; },
  ]
];
lesson({ n: 20, title: "Sumandos desconocidos e igualdades", short: "¿Qué número falta?", char: "lula", music: "misterio", deco: ["⬜", "=", "🐶", "➕"],
  hello: "¡Hola! Soy <b>Lula</b> 🦊. A veces en una suma falta un número. ¡Vamos a descubrirlo como detectives!",
  levels: LEVELS3(["Falta el segundo", "a + ⬜ = c"], ["Falta el primero e igualdades", "Los dos lados valen igual"], ["", "Figuras con valor"]) }, GEN);
