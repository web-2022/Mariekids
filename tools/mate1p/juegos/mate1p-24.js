/* Tema 24 · Problemas de suma · Bimba */
const N = ["Luchito", "Sophia", "Mateo", "Valeria", "Gabriel", "Camila"];
const GEN = [
  [
    () => { const [a, b] = sample(N, 2), x = between(3, 12), y = between(2, 9), ans = x + y, e = pick(["🍬", "🎈", "🧸", "🍪"]);
      return { prompt: `${a} tiene <b>${x}</b> ${e}. ${b} le regala <b>${y}</b> más. ¿Cuántos tiene ahora ${a}?`, say: `${a} tiene ${x}. Le regalan ${y} más. ¿Cuántos tiene ahora?`, scene: "", ans, opts: numOpts(ans, [Math.abs(x - y), ans + 1, ans - 1], 0), why: `${x} + ${y} = ${ans}.`, hint: "«Le regalan más» → sumamos." }; },
  ],
  [
    () => { const [a, b] = sample(N, 2), x = between(4, 15), y = between(2, 8), ans = x + y;
      return { prompt: `${a} tiene <b>${x}</b> canicas. ${b} tiene <b>${y} más</b> que ${a}. ¿Cuántas canicas tiene ${b}?`, say: `${a} tiene ${x} canicas. ${b} tiene ${y} más que ${a}. ¿Cuántas tiene ${b}?`, scene: "", ans, opts: numOpts(ans, [x - y >= 0 ? x - y : x + 1, y, x], 0), why: `${x} + ${y} = ${ans}.`, hint: "«Más que» → a lo que tiene el primero le sumas." }; },
    () => { const x = between(10, 30), y = between(10, 30), z = between(5, 20), ans = x + y + z;
      return { prompt: `En la fiesta hay <b>${x}</b> niños, <b>${y}</b> niñas y <b>${z}</b> adultos. ¿Cuántas personas hay en total?`, say: `Hay ${x} niños, ${y} niñas y ${z} adultos. ¿Cuántas personas hay en total?`, scene: "", ans, opts: numOpts(ans, [x + y, ans - 10, ans + 10], 0), why: `${x} + ${y} + ${z} = ${ans}.`, hint: "Suma las tres cantidades." }; },
  ],
  [
    () => { const m = between(5, 15), r = between(8, 15), ans = m + r;
      return { prompt: `Luchito tiene esta colección de <b>${m}</b> monedas y le regalaron <b>${r}</b> monedas más. ¿Cuántas monedas tiene ahora?`, say: `Tenía ${m} monedas y le regalaron ${r} más. ¿Cuántas tiene ahora?`, scene: line(em("🪙", m)), ans, opts: numOpts(ans, [r, m + r + 1, m + r - 1], 0), why: `${m} + ${r} = ${ans}.`, hint: "Primero cuenta las monedas del dibujo." }; },
    () => { const a = 10 * between(5, 9), b = 10 * between(8, 13), ans = a + b;
      return { prompt: `Una persona pesa <b>${a} kg</b> y otra <b>${b} kg</b>. ¿Cuántos kg pesan las dos juntas?`, say: `Una persona pesa ${a} kilos y otra ${b}. ¿Cuánto pesan juntas?`, scene: line(["🧍", "⚖️", "🧍‍♂️"]), ans, opts: numOpts(ans, [b - a, ans + 10, ans - 10], 0), why: `${a} + ${b} = ${ans} kg.`, hint: "«Juntas» → sumar." }; },
  ]
];
lesson({ n: 24, title: "Problemas de suma", short: "Problemas de suma", char: "bimba", music: "pop", deco: ["➕", "📖", "🍬", "🎈"],
  hello: "¡Hola! Soy <b>Bimba</b> 🐘. En los problemas, palabras como <b>juntos, más, en total</b> nos dicen que hay que sumar.",
  levels: LEVELS3(["Agregar", "Le regalan más"], ["Más que… y en total", "Problemas con tres números"], ["", "Monedas y kilos"]) }, GEN);
