/* Tema 55 · Peso y comparación de medidas · Bimba */
const W = n => `<span class="weight">${n} kg</span>`;
const PES = [["🍉", 5], ["🍎", 1], ["🐘", 9], ["🐭", 1], ["🎈", 0], ["🧱", 4], ["🪶", 0], ["🐶", 3]];
const GEN = [
  [
    () => { const [a, b] = sample(PES, 2).map(x => [...x]); if (a[1] === b[1]) b[1] = a[1] + 2; const heavy = a[1] > b[1] ? a[0] : b[0], tilt = a[1] > b[1] ? -8 : 8, ask = rnd(2) === 0;
      return { prompt: `¿Qué pesa <b>${ask ? "más" : "menos"}</b>?`, say: `¿Qué pesa ${ask ? "más" : "menos"}?`, scene: balance(a[0], b[0], tilt), ans: ask ? heavy : (heavy === a[0] ? b[0] : a[0]), opts: [a[0], b[0]], cols: 2, min: 2, why: "El lado que baja es el más pesado.", hint: "En la balanza, lo más pesado baja." }; },
  ],
  [
    () => { const v = between(2, 9), x = between(1, v - 1), ans = v;
      return { prompt: "La balanza está en equilibrio. ¿Cuánto pesa la 🍉?", say: "La balanza está en equilibrio. ¿Cuánto pesa la sandía?", scene: balance("🍉", W(x) + W(v - x)), ans, opts: numOpts(ans, [x, v - x, ans + 1].filter(y => y !== ans), 1), why: `${x} + ${v - x} = ${ans} kg.`, hint: "Suma las pesas del otro lado." }; },
    () => { const L = sample([3, 4, 5, 6, 7, 8], 3), names = ["A", "B", "C"], long = rnd(2) === 0, i = L.indexOf(long ? Math.max(...L) : Math.min(...L));
      return { prompt: `¿Qué lápiz es el más <b>${long ? "largo" : "corto"}</b>?`, say: `¿Qué lápiz es el más ${long ? "largo" : "corto"}?`, scene: names.map((n, k) => `<div style="display:flex;align-items:center;gap:6px;margin:4px 0"><b>${n}</b><span style="display:inline-block;height:16px;width:${L[k] * 30}px;background:linear-gradient(90deg,#fde047 90%,#334155 90%);border-radius:4px"></span></div>`).join(""), ans: names[i], opts: names, cols: 3, why: `El lápiz ${names[i]} es el más ${long ? "largo" : "corto"}.`, hint: "Compara dónde termina cada lápiz." }; },
  ],
  [
    () => { const a = 10 * between(5, 9), b = 10 * between(10, 13), ans = a + b;
      return { prompt: `Los pesos de dos personas son <b>${a} kg</b> y <b>${b} kg</b>. ¿Cuántos kg pesan juntas?`, say: `Pesan ${a} kilos y ${b} kilos. ¿Cuánto pesan juntas?`, scene: line(["🧍", "🧍‍♂️"]), ans, opts: numOpts(ans, [b - a, ans + 10, ans - 10], 0), why: `${a} + ${b} = ${ans} kg.`, hint: "Suma los dos pesos." }; },
    () => { const b = between(2, 4), k = 3, x = between(1, 3 * b - 1), ans = 2 * b;
      return { prompt: "La balanza está en equilibrio. ¿Cuánto pesa un <b>par</b> de botellas?", say: "Si la balanza está en equilibrio, ¿cuánto pesan dos botellas?", scene: balance(em("🍼", k).join(""), W(x) + W(k * b - x)), ans, opts: numOpts(ans, [b, k * b, ans + 2], 1), why: `3 botellas = ${k * b} kg → 1 botella = ${b} kg → 2 botellas = ${ans} kg.`, hint: "Primero averigua cuánto pesa una sola botella." }; },
  ]
];
lesson({ n: 55, title: "Peso y comparación de medidas", short: "Peso y medidas", char: "bimba", music: "lofi", deco: ["⚖️", "🍉", "📏", "🪶"],
  hello: "¡Hola! Soy <b>Bimba</b> 🐘. ¿Qué pesa más? ¿Qué es más largo? Con la <b>balanza</b> y la regla, ¡lo descubrimos!",
  levels: LEVELS3(["Pesado y liviano", "¿Qué baja en la balanza?"], ["Kilos y longitudes", "Pesas y lápices"], ["", "Personas y botellas"]) }, GEN);
