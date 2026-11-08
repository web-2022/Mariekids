/* Tema 20 · Sumandos desconocidos e igualdades · Lula */
const GEN = [
  [
    () => { const a = between(2, 12), b = between(1, 8), c = a + b;
      return { prompt: `${a} + ⬜ = ${c}`, say: `${a} más cuánto es igual a ${c}?`, scene: "", ans: b, opts: numOpts(b, [c, a + c, b + 1], 0), why: `${a} + ${b} = ${c}.`, hint: `Cuenta desde ${a} hasta ${c}.`,
        steps: T => [
          { t: `Buscamos qué número le falta a ${a} para llegar a ${c}. Es como completar: <b>contamos desde ${a} hasta ${c}</b>.` },
          { t: `Damos saltos de 1 desde ${a} hasta llegar a ${c}:`, b: BOARD.jumps(a, Array(b).fill(1), { step: .35 }) },
          { t: `Dimos ${b} saltos. Comprobamos: ${a} + ${b} = ${c}. ✅ El número que falta es <b>${b}</b>.`, bAdd: BOARD.lines([`${c} − ${a} = ${b}`]) }
        ],
        err: w => w === c ? `${c} es el resultado; buscamos lo que se suma a ${a}.` : w === a + c ? "Sumaste los dos números; hay que buscar cuánto falta." : "" }; },
  ],
  [
    () => { const a = between(1, 9), b = between(5, 15), c = a + b;
      return { prompt: `⬜ + ${b} = ${c}`, say: `¿Qué número más ${b} es igual a ${c}?`, scene: "", ans: a, opts: numOpts(a, [c, b, a + 1], 0), why: `${a} + ${b} = ${c}.`, hint: `¿Cuánto le falta a ${b} para llegar a ${c}?`,
        steps: T => [
          { t: `¿Qué número más ${b} da ${c}? Es lo mismo que preguntar: ¿cuánto le falta a ${b} para llegar a ${c}?` },
          { t: `Contamos desde ${b} hasta ${c}:`, b: BOARD.jumps(b, Array(a).fill(1), { step: .35 }) },
          { t: `Dimos ${a} saltos: ${c} − ${b} = ${a}. Comprobamos: ${a} + ${b} = ${c}. ✅ El número es <b>${a}</b>.` }
        ],
        err: w => w === b ? `${b} ya está escrito; buscamos el otro número.` : "" }; },
    () => { const a = between(2, 9), b = between(2, 9), c = between(1, a + b - 1), ans = a + b - c;
      return { prompt: `${a} + ${b} = ${c} + ⬜`, say: `${a} más ${b} es igual a ${c} más ¿cuánto?`, scene: `<div class="legend">Los dos lados deben valer lo mismo</div>`, ans, opts: numOpts(ans, [a + b, a + b + c, ans + 1], 0), why: `${a} + ${b} = ${a + b} y ${c} + ${ans} = ${a + b}.`, hint: "Primero resuelve el lado izquierdo.",
        steps: T => [
          { t: `El signo <b>=</b> es como una balanza: los dos lados deben valer <b>lo mismo</b>.` },
          { t: `Resolvemos el lado izquierdo: ${a} + ${b} = <b>${a + b}</b>. Entonces el lado derecho también debe dar ${a + b}.`, b: BOARD.lines([`${a} + ${b} = ${a + b}`, `${c} + ⬜ = ${a + b}`]) },
          { t: `¿Cuánto le falta a ${c} para llegar a ${a + b}? ${a + b} − ${c} = <b>${ans}</b>.`, bAdd: BOARD.lines([`${a + b} − ${c} = ${ans}`]) }
        ],
        err: w => w === a + b ? `${a + b} es lo que vale cada lado; falta restarle ${c}.` : "" }; },
  ],
  [
    () => { const x = between(4, 10), a = between(1, x - 1), b = 2 * x - a, k = 3, ans = k * x;
      return { prompt: `Si 🐶 − ${a} = ${b} − 🐶, halla 🐶 + 🐶 + 🐶.`, say: `Si perrito menos ${a} es igual a ${b} menos perrito, ¿cuánto es perrito más perrito más perrito?`, scene: "", ans, opts: numOpts(ans, [x, 2 * x, ans + 3], 0),
        why: `Si 🐶 = ${x}: ${x} − ${a} = ${x - a} y ${b} − ${x} = ${b - x}. Entonces 3 × ${x} = ${ans}.`, hint: "Prueba valores para 🐶 hasta que los dos lados sean iguales.",
        steps: T => [
          { t: `🐶 es un número escondido. Los dos lados del = deben dar lo mismo. Probamos valores para 🐶:` },
          { t: `Si 🐶 = ${x}: ${x} − ${a} = ${x - a} y ${b} − ${x} = ${b - x}. ¡Iguales! ✅`, b: BOARD.lines([x > 2 ? `🐶 = ${x - 1}: ${x - 1 - a} y ${b - x + 1} ❌` : "", `🐶 = ${x}: ${x - a} y ${b - x} ✅`].filter(Boolean)) },
          { t: `Entonces 🐶 = ${x}, y 🐶 + 🐶 + 🐶 = ${x} + ${x} + ${x} = <b>${ans}</b>.`, bAdd: BOARD.lines([`${x} + ${x} + ${x} = ${ans}`]) }
        ],
        err: w => w === x ? `${x} es lo que vale un solo 🐶; piden tres.` : w === 2 * x ? "Esos son dos perritos; piden tres." : "" }; },
    () => { const v = between(1, 6), t = v + 3;
      return { prompt: `¿Qué valor debe tomar el círculo? ● + 3 = ${t}`, say: `Círculo más 3 es igual a ${t}. ¿Cuánto vale el círculo?`, scene: "", ans: v, opts: numOpts(v, [t, t + 3, v + 1], 0), why: `${v} + 3 = ${t}.`, hint: `¿Qué número más 3 da ${t}?`,
        steps: T => [
          { t: `● es un número escondido. ¿Qué número más 3 da ${t}?` },
          { t: `Contamos desde 3 hasta ${t}:`, b: BOARD.jumps(3, Array(v).fill(1), { step: .4, min: 0 }) },
          { t: `${t} − 3 = ${v}. Comprobamos: ${v} + 3 = ${t}. ✅ El círculo vale <b>${v}</b>.` }
        ],
        err: w => w === t ? `${t} es el resultado; el círculo es lo que se suma a 3.` : "" }; },
  ]
];
lesson({ n: 20, title: "Sumandos desconocidos e igualdades", short: "¿Qué número falta?", char: "lula", music: "misterio", deco: ["⬜", "=", "🐶", "➕"],
  hello: "¡Hola! Soy <b>Lula</b> 🦊. A veces en una suma falta un número. ¡Vamos a descubrirlo como detectives!",
  levels: LEVELS3(["Falta el segundo", "a + ⬜ = c"], ["Falta el primero e igualdades", "Los dos lados valen igual"], ["", "Figuras con valor"]) }, GEN);
