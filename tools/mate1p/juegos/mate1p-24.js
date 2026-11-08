/* Tema 24 · Problemas de suma · Bimba */
const N = ["Luchito", "Sophia", "Mateo", "Valeria", "Gabriel", "Camila"];
const GEN = [
  [
    () => { const [a, b] = sample(N, 2), x = between(3, 12), y = between(2, 9), ans = x + y, e = pick(["🍬", "🎈", "🧸", "🍪"]);
      return { prompt: `${a} tiene <b>${x}</b> ${e}. ${b} le regala <b>${y}</b> más. ¿Cuántos tiene ahora ${a}?`, say: `${a} tiene ${x}. Le regalan ${y} más. ¿Cuántos tiene ahora?`, scene: "", ans, opts: numOpts(ans, [Math.abs(x - y), ans + 1, ans - 1], 0), why: `${x} + ${y} = ${ans}.`, hint: "«Le regalan más» → sumamos.",
        steps: T => [
          { t: `Datos: ${a} tiene <b>${x}</b> ${e}. Le regalan <b>${y}</b> más.`, b: BOARD.groups([{ n: x, e, c: "#3b82f6", lab: `tenía ${x}` }, { n: y, e, c: "#22c55e", lab: `+ ${y}` }], { step: .12 }) },
          { t: `Si le <b>regalan más</b>, ahora tiene <b>más</b>: sumamos. Empezamos en ${x} y avanzamos ${y}:`, b: BOARD.jumps(x, Array(y).fill(1), { step: .3 }) },
          { t: `${x} + ${y} = <b>${ans}</b>. ${a} tiene ahora ${ans} ${e}.` }
        ],
        err: w => w === Math.abs(x - y) ? "Restaste; si le regalan, tiene más: hay que sumar." : "" }; },
  ],
  [
    () => { const [a, b] = sample(N, 2), x = between(4, 15), y = between(2, 8), ans = x + y;
      return { prompt: `${a} tiene <b>${x}</b> canicas. ${b} tiene <b>${y} más</b> que ${a}. ¿Cuántas canicas tiene ${b}?`, say: `${a} tiene ${x} canicas. ${b} tiene ${y} más que ${a}. ¿Cuántas tiene ${b}?`, scene: "", ans, opts: numOpts(ans, [x - y >= 0 ? x - y : x + 1, y, x], 0), why: `${x} + ${y} = ${ans}.`, hint: "«Más que» → a lo que tiene el primero le sumas.",
        steps: T => [
          { t: `Datos: ${a} tiene <b>${x}</b>. ${b} tiene <b>${y} más que</b> ${a}. Nos piden lo de ${b}.` },
          { t: `«${y} más que ${a}» quiere decir: lo de ${a} y ${y} más.`, b: BOARD.groups([{ n: x, e: "🔵", c: "#3b82f6", lab: a }, { n: x + y, e: "🟢", c: "#22c55e", lab: b }], { step: .08 }) },
          { t: `${x} + ${y} = <b>${ans}</b>. ${b} tiene ${ans} canicas.`, b: BOARD.lines([`${x} + ${y} = ${ans}`]) }
        ],
        err: w => w === x ? `${x} es lo de ${a}; ${b} tiene ${y} más.` : w === x - y ? "«Más que» significa sumar." : "" }; },
    () => { const x = between(10, 30), y = between(10, 30), z = between(5, 20), ans = x + y + z;
      return { prompt: `En la fiesta hay <b>${x}</b> niños, <b>${y}</b> niñas y <b>${z}</b> adultos. ¿Cuántas personas hay en total?`, say: `Hay ${x} niños, ${y} niñas y ${z} adultos. ¿Cuántas personas hay en total?`, scene: "", ans, opts: numOpts(ans, [x + y, ans - 10, ans + 10], 0), why: `${x} + ${y} + ${z} = ${ans}.`, hint: "Suma las tres cantidades.",
        steps: T => { const L = colTxt([x, y, z]).lines;
          return [
            { t: `Datos: ${x} niños, ${y} niñas y ${z} adultos. «En total» → sumamos los tres.`, b: BOARD.op([x, y, z]) },
            { t: L[0] },
            { t: L.slice(1).join(" ") },
            { t: `Hay <b>${ans}</b> personas.` }
          ]; },
        err: w => w === x + y ? "Te faltaron los adultos." : "" }; },
  ],
  [
    () => { const m = between(5, 15), r = between(8, 15), ans = m + r;
      return { prompt: `Luchito tiene esta colección de <b>${m}</b> monedas y le regalaron <b>${r}</b> monedas más. ¿Cuántas monedas tiene ahora?`, say: `Tenía ${m} monedas y le regalaron ${r} más. ¿Cuántas tiene ahora?`, scene: line(em("🪙", m)), ans, opts: numOpts(ans, [r, m + r + 1, m + r - 1], 0), why: `${m} + ${r} = ${ans}.`, hint: "Primero cuenta las monedas del dibujo.",
        steps: T => [
          { t: `Primero contamos las monedas del dibujo:`, go: T.count(T.its()) },
          { t: `Tenía <b>${m}</b> y le regalaron <b>${r}</b> más: sumamos.`, b: BOARD.op([m, r]) },
          { t: `${m} + ${r} = <b>${ans}</b> monedas.` }
        ],
        err: w => w === r ? "Esas son solo las que le regalaron." : "" }; },
    () => { const a = 10 * between(5, 9), b = 10 * between(8, 13), ans = a + b;
      return { prompt: `Una persona pesa <b>${a} kg</b> y otra <b>${b} kg</b>. ¿Cuántos kg pesan las dos juntas?`, say: `Una persona pesa ${a} kilos y otra ${b}. ¿Cuánto pesan juntas?`, scene: line(["🧍", "⚖️", "🧍‍♂️"]), ans, opts: numOpts(ans, [b - a, ans + 10, ans - 10], 0), why: `${a} + ${b} = ${ans} kg.`, hint: "«Juntas» → sumar.",
        steps: T => [
          { t: `Datos: ${a} kg y ${b} kg. «Juntas» → <b>sumamos</b>.` },
          { t: `Como son decenas exactas: ${a / 10} decenas + ${b / 10} decenas = ${(a + b) / 10} decenas.`, b: BOARD.op([a, b]) },
          { t: `${a} + ${b} = <b>${ans}</b> kg.` }
        ],
        err: w => w === b - a ? "Restaste; «juntas» significa sumar." : "" }; },
  ]
];
lesson({ n: 24, title: "Problemas de suma", short: "Problemas de suma", char: "bimba", music: "pop", deco: ["➕", "📖", "🍬", "🎈"],
  hello: "¡Hola! Soy <b>Bimba</b> 🐘. En los problemas, palabras como <b>juntos, más, en total</b> nos dicen que hay que sumar.",
  levels: LEVELS3(["Agregar", "Le regalan más"], ["Más que… y en total", "Problemas con tres números"], ["", "Monedas y kilos"]) }, GEN);
