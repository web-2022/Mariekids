/* Tema 22 · Restas de una y dos cifras · Tito */
const vert = (a, b) => `<div class="eqs" style="font-family:monospace;align-items:flex-end"><div>${a}</div><div>− ${b}</div><div style="border-top:3px solid #1e293b;min-width:90px;text-align:right">?</div></div>`;
const GEN = [
  [
    () => { const a = between(5, 18), b = between(1, Math.min(9, a - 1)), ans = a - b;
      return { prompt: `${a} − ${b} = ?`, say: `¿Cuánto es ${a} menos ${b}?`, scene: "", ans, opts: numOpts(ans, [a + b, ans + 1, ans - 1], 0), why: `${a} − ${b} = ${ans}.`, hint: `Cuenta hacia atrás ${b} veces desde ${a}.`,
        steps: T => [
          { t: `Restar es <b>quitar</b>. En la recta numérica, quitar es <b>saltar hacia atrás</b>.` },
          { t: `Empezamos en ${a} y damos ${b} saltos hacia atrás:`, b: BOARD.jumps(a, Array(b).fill(-1), { step: .35 }) },
          { t: `Llegamos a ${ans}: ${a} − ${b} = <b>${ans}</b>. Comprobamos sumando: ${ans} + ${b} = ${a}. ✅` }
        ],
        err: w => w === a + b ? "Sumaste; el signo − significa quitar." : "" }; },
  ],
  [
    () => { const a = between(30, 99), b = between(11, a - 10), ans = a - b;
      return { prompt: "Resuelve la resta:", say: `¿Cuánto es ${a} menos ${b}?`, scene: vert(a, b), ans, opts: numOpts(ans, [ans + 10, ans - 10, a + b > 99 ? ans + 2 : a + b], 0), why: `${a} − ${b} = ${ans}.`, hint: "Resta primero las unidades. Si no alcanza, pide prestado 1 decena.",
        steps: T => { const L = colTxt([a, b], "-").lines;
          return [
            { t: `Escribimos en columna: unidades debajo de unidades. Siempre empezamos por las <b>unidades</b>.`, b: BOARD.op([a, b], "-") },
            { t: L[0] },
            { t: L[1] || "Listo." },
            { t: `${a} − ${b} = <b>${ans}</b>. Comprobamos: ${ans} + ${b} = ${a}. ✅` }
          ]; },
        err: w => Math.abs(w - ans) === 10 ? "Revisa la decena que pediste prestada." : "" }; },
  ],
  [
    () => { const a = between(10, 20), b = between(2, 9), c = between(2, 9), ans = a - b + c;
      return { prompt: `Resuelve: <b>${a} − ${b} + ${c}</b>`, say: `Resuelve ${a} menos ${b} más ${c}.`, scene: `<div class="legend">De izquierda a derecha</div>`, ans, opts: numOpts(ans, [a - b - c, a + b + c, a - (b + c)].filter(x => x !== ans), 0), why: `${a} − ${b} = ${a - b}; ${a - b} + ${c} = ${ans}.`, hint: "Haz las operaciones en orden, de izquierda a derecha.",
        steps: T => [
          { t: `Con sumas y restas juntas, vamos <b>en orden, de izquierda a derecha</b>.` },
          { t: `Primero: ${a} − ${b} = <b>${a - b}</b>.`, b: BOARD.lines([`${a} − ${b} = ${a - b}`]) },
          { t: `Después: ${a - b} + ${c} = <b>${ans}</b>.`, bAdd: BOARD.lines([`${a - b} + ${c} = ${ans}`]) }
        ],
        err: w => w === a - b - c ? `El ${c} se <b>suma</b>, no se resta.` : w === a - (b + c) ? "Hay que ir en orden: primero la resta, después la suma." : "" }; },
    () => { const a = between(15, 45), b = between(a + 5, 60), ans = b - a;
      return { prompt: `¿Cuánto le falta a <b>${a}</b> para llegar a <b>${b}</b>?`, say: `¿Cuánto le falta a ${a} para llegar a ${b}?`, scene: "", ans, opts: numOpts(ans, [a + b, ans + 10, ans + 1], 0), why: `${b} − ${a} = ${ans}.`, hint: "Resta el número mayor menos el menor.",
        steps: T => [
          { t: `«¿Cuánto le falta a ${a} para llegar a ${b}?» Podemos <b>completar</b>: contar desde ${a} hasta ${b}.` },
          { t: `Saltamos de 10 en 10 y luego de 1 en 1:`, b: BOARD.jumps(a, [...Array(Math.floor(ans / 10)).fill(10), ...Array(ans % 10).fill(1)], { step: .45 }) },
          { t: `Saltamos ${Math.floor(ans / 10) ? Math.floor(ans / 10) * 10 + " y " : ""}${ans % 10}: en total <b>${ans}</b>. Es lo mismo que ${b} − ${a} = ${ans}.` }
        ],
        err: w => w === a + b ? "Sumaste; hay que buscar la diferencia." : "" }; },
  ]
];
lesson({ n: 22, title: "Restas de una y dos cifras", short: "Restas", char: "tito", music: "electro", deco: ["➖", "🔢", "🧮", "✨"],
  hello: "¡Bip bup! Soy <b>Tito</b> 🤖. Vamos a <b>restar</b> números de una y dos cifras.",
  levels: LEVELS3(["Una cifra", "Restas hasta 18"], ["Dos cifras", "Restas en columna"], ["", "Operaciones en orden y cuánto falta"]) }, GEN);
