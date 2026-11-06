/* Tema 45 · Valores ocultos, igualdades y balanzas · Rayo */
const W = n => `<span class="weight">${n} kg</span>`;
const GEN = [
  [
    () => { const v = between(2, 6), k = between(1, 3), ans = v;
      return { prompt: "La balanza está en <b>equilibrio</b>. ¿Cuánto pesa una 🍎?", say: "La balanza está en equilibrio. ¿Cuánto pesa cada manzana?", scene: balance(em("🍎", k).join(""), Array(k).fill(W(v)).join("")), ans, opts: numOpts(ans, [k * v, ans + 1, k], 1), why: `Cada 🍎 equilibra una pesa de ${v} kg.`, hint: "En equilibrio, los dos lados pesan igual." }; },
    () => { const v = between(2, 6), k = between(2, 4), ans = v;
      return { prompt: `Si ${"⭐ + ".repeat(k - 1)}⭐ = ${k * v}, ¿cuánto vale ⭐?`, say: `${k} estrellas suman ${k * v}. ¿Cuánto vale una estrella?`, scene: "", ans, opts: numOpts(ans, [k * v, ans + 1, ans - 1], 1), why: `${Array(k).fill(v).join(" + ")} = ${k * v}.`, hint: "Busca el número que sumado varias veces da el total." }; },
  ],
  [
    () => { const s = between(2, 6), a = between(1, 8), ans = a;
      return { prompt: `Si ⭐ + ⭐ = ${2 * s} y ⭐ + 🍎 = ${s + a}, ¿cuánto vale 🍎?`, say: `Dos estrellas suman ${2 * s}. Una estrella y una manzana suman ${s + a}. ¿Cuánto vale la manzana?`, scene: "", ans, opts: numOpts(ans, [s, s + a, ans + 1], 0), why: `⭐ = ${s}. 🍎 = ${s + a} − ${s} = ${a}.`, hint: "Primero descubre la estrella." }; },
    () => { const b = between(2, 4), k = between(2, 3), tot = b * k, x = between(1, tot - 1), ans = b;
      return { prompt: "La balanza está en equilibrio. ¿Cuánto pesa una botella 🍼?", say: "La balanza está en equilibrio. ¿Cuánto pesa una botella?", scene: balance(em("🍼", k).join(""), W(x) + W(tot - x)), ans, opts: numOpts(ans, [tot, x, ans + 1], 1), why: `Del otro lado hay ${x} + ${tot - x} = ${tot} kg, repartidos en ${k} botellas: ${ans} kg cada una.`, hint: "Suma las pesas y reparte entre las botellas." }; },
  ],
  [
    () => { const s = between(3, 7), m = between(3, 7), f = between(2, 9), ans = f + 1;
      return { prompt: "Halla el <b>sucesor</b> del valor de la 🍓:", say: "Descubre el valor de cada figura y halla el sucesor de la fresita.", scene: `<div class="eqs"><div>⭐ + ⭐ + ⭐ + ⭐ = ${4 * s}</div><div>🍎 + 🍎 + 🍎 = ${3 * m}</div><div>🍎 + ⭐ + 🍓 = ${m + s + f}</div></div>`, ans, opts: numOpts(ans, [f, ans + 1, f - 1], 0),
        why: `⭐ = ${s}, 🍎 = ${m}, 🍓 = ${m + s + f} − ${m} − ${s} = ${f}. Sucesor: ${ans}.`, hint: "Resuelve de arriba hacia abajo." }; },
    () => { const a = between(2, 6), c = between(1, 5), b = a + c, ans = 2 * b - a;
      return { prompt: `Si 🐝 + 🐝 = ${2 * a} y 🧸 = 🐝 + ${c}, ¿cuál es el <b>doble</b> del valor de 🧸, menos 🐝?`, say: "Halla el valor de la abeja y del osito. Luego el doble del osito menos la abeja.", scene: "", ans, opts: numOpts(ans, [2 * b, b, 2 * a], 0), why: `🐝 = ${a}, 🧸 = ${b}. 2 × ${b} − ${a} = ${ans}.`, hint: "Paso a paso: abeja, osito y al final la operación." }; },
  ]
];
lesson({ n: 45, title: "Valores ocultos, igualdades y balanzas", short: "Balanzas", char: "rayo", music: "aventura", deco: ["⚖️", "⭐", "🍎", "🍓"],
  hello: "¡Hola! Soy <b>Rayo</b> 🐉. Cada figura esconde un <b>valor</b>. ¡Usa las igualdades y las balanzas para descubrirlo!",
  levels: LEVELS3(["Balanzas y estrellas", "Lados iguales"], ["Dos pistas", "Figura por figura"], ["", "Tres igualdades"]) }, GEN);
