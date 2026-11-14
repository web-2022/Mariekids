/* Tema 45 · Valores ocultos, igualdades y balanzas · Rayo */
const W = n => `<span class="weight">${n} kg</span>`;
const GEN = [
  [
    () => { const v = between(2, 6), k = between(1, 3), ans = v;
      return { prompt: "La balanza está en <b>equilibrio</b>. ¿Cuánto pesa una 🍎?", say: "La balanza está en equilibrio. ¿Cuánto pesa cada manzana?", scene: balance(em("🍎", k).join(""), Array(k).fill(W(v)).join("")), ans, opts: numOpts(ans, [k * v, ans + 1, k], 1), why: `Cada 🍎 equilibra una pesa de ${v} kg.`, hint: "En equilibrio, los dos lados pesan igual.",
        steps: T => [
          { t: `Una balanza en <b>equilibrio</b> (derechita) tiene el mismo peso a los dos lados.` },
          { t: `Hay ${k} manzana${k > 1 ? "s" : ""} a un lado y ${k} pesa${k > 1 ? "s" : ""} de ${v} kg al otro. Cada 🍎 se equilibra con una pesa.`, b: BOARD.lines(Array.from({ length: k }, () => `🍎 = ${v} kg`), { step: .6 }) },
          { t: `Una manzana pesa <b>${v}</b> kg.` }
        ],
        err: w => w === k * v ? "Ese es el peso de todas las manzanas juntas; piden una." : w === k ? "Ese es el número de manzanas, no su peso." : "" }; },
    () => { const v = between(2, 6), k = between(2, 4), ans = v;
      return { prompt: `Si ${"⭐ + ".repeat(k - 1)}⭐ = ${k * v}, ¿cuánto vale ⭐?`, say: `${k} estrellas suman ${k * v}. ¿Cuánto vale una estrella?`, scene: "", ans, opts: numOpts(ans, [k * v, ans + 1, ans - 1], 1), why: `${Array(k).fill(v).join(" + ")} = ${k * v}.`, hint: "Busca el número que sumado varias veces da el total.",
        steps: T => [
          { t: `${k} estrellas iguales suman ${k * v}. Buscamos qué número, sumado ${k} veces, da ${k * v}.` },
          { t: `Repartimos ${k * v} en ${k} partes iguales:`, b: BOARD.share(k * v, k, "●", { names: Array(k).fill("⭐") }) },
          { t: `Cada estrella vale <b>${v}</b>: ${Array(k).fill(v).join(" + ")} = ${k * v}. ✅` }
        ],
        err: w => w === k * v ? "Ese es el total de todas las estrellas." : "" }; },
  ],
  [
    () => { const s = between(2, 6), a = between(1, 8), ans = a;
      return { prompt: `Si ⭐ + ⭐ = ${2 * s} y ⭐ + 🍎 = ${s + a}, ¿cuánto vale 🍎?`, say: `Dos estrellas suman ${2 * s}. Una estrella y una manzana suman ${s + a}. ¿Cuánto vale la manzana?`, scene: "", ans, opts: numOpts(ans, [s, s + a, ans + 1], 0), why: `⭐ = ${s}. 🍎 = ${s + a} − ${s} = ${a}.`, hint: "Primero descubre la estrella.",
        steps: T => [
          { t: `Primero descubrimos la ⭐: ⭐ + ⭐ = ${2 * s}, así que ⭐ es la mitad de ${2 * s}: <b>${s}</b>.`, b: BOARD.lines([`⭐ + ⭐ = ${2 * s} → ⭐ = ${s}`]) },
          { t: `Ahora cambiamos ⭐ por ${s} en la segunda: ${s} + 🍎 = ${s + a}.`, bAdd: BOARD.lines([`${s} + 🍎 = ${s + a}`]) },
          { t: `🍎 = ${s + a} − ${s} = <b>${a}</b>.`, bAdd: BOARD.lines([`🍎 = ${a}`]) }
        ],
        err: w => w === s ? "Ese es el valor de la estrella; piden la manzana." : w === s + a ? "Ese es el total de ⭐ + 🍎." : "" }; },
    () => { const b = between(2, 4), k = between(2, 3), tot = b * k, x = between(1, tot - 1), ans = b;
      return { prompt: "La balanza está en equilibrio. ¿Cuánto pesa una botella 🍼?", say: "La balanza está en equilibrio. ¿Cuánto pesa una botella?", scene: balance(em("🍼", k).join(""), W(x) + W(tot - x)), ans, opts: numOpts(ans, [tot, x, ans + 1], 1), why: `Del otro lado hay ${x} + ${tot - x} = ${tot} kg, repartidos en ${k} botellas: ${ans} kg cada una.`, hint: "Suma las pesas y reparte entre las botellas.",
        steps: T => [
          { t: `Balanza en equilibrio: las botellas pesan lo mismo que las pesas. Sumamos las pesas: ${x} + ${tot - x} = <b>${tot}</b> kg.` },
          { t: `Esos ${tot} kg se reparten entre ${k} botellas iguales:`, b: BOARD.share(tot, k, "●", { names: Array(k).fill("🍼") }) },
          { t: `Cada botella pesa <b>${ans}</b> kg.` }
        ],
        err: w => w === tot ? "Ese es el peso de todas las botellas juntas." : w === x ? "Solo miraste una pesa." : "" }; },
  ],
  [
    () => { const s = between(3, 7), m = between(3, 7), f = between(2, 9), ans = f + 1;
      return { prompt: "Halla el <b>sucesor</b> del valor de la 🍓:", say: "Descubre el valor de cada figura y halla el sucesor de la fresita.", scene: `<div class="eqs"><div>⭐ + ⭐ + ⭐ + ⭐ = ${4 * s}</div><div>🍎 + 🍎 + 🍎 = ${3 * m}</div><div>🍎 + ⭐ + 🍓 = ${m + s + f}</div></div>`, ans, opts: numOpts(ans, [f, ans + 1, f - 1], 0),
        why: `⭐ = ${s}, 🍎 = ${m}, 🍓 = ${m + s + f} − ${m} − ${s} = ${f}. Sucesor: ${ans}.`, hint: "Resuelve de arriba hacia abajo.",
        steps: T => [
          { t: `Resolvemos de arriba hacia abajo. 4 estrellas = ${4 * s} → cada ⭐ = <b>${s}</b>.`, b: BOARD.lines([`⭐ = ${4 * s} ÷ 4 = ${s}`]) },
          { t: `3 manzanas = ${3 * m} → cada 🍎 = <b>${m}</b>.`, bAdd: BOARD.lines([`🍎 = ${3 * m} ÷ 3 = ${m}`]) },
          { t: `${m} + ${s} + 🍓 = ${m + s + f} → 🍓 = ${m + s + f} − ${m + s} = <b>${f}</b>.`, bAdd: BOARD.lines([`🍓 = ${f}`]) },
          { t: `El sucesor de ${f} es ${f} + 1 = <b>${ans}</b>.` }
        ],
        err: w => w === f ? "Ese es el valor de la fresa; piden su sucesor (+1)." : "" }; },
    () => { const a = between(2, 6), c = between(1, 5), b = a + c, ans = 2 * b - a;
      return { prompt: `Si 🐝 + 🐝 = ${2 * a} y 🧸 = 🐝 + ${c}, ¿cuál es el <b>doble</b> del valor de 🧸, menos 🐝?`, say: "Halla el valor de la abeja y del osito. Luego el doble del osito menos la abeja.", scene: "", ans, opts: numOpts(ans, [2 * b, b, 2 * a], 0), why: `🐝 = ${a}, 🧸 = ${b}. 2 × ${b} − ${a} = ${ans}.`, hint: "Paso a paso: abeja, osito y al final la operación.",
        steps: T => [
          { t: `Paso 1: 🐝 + 🐝 = ${2 * a} → 🐝 = <b>${a}</b>.`, b: BOARD.lines([`🐝 = ${a}`]) },
          { t: `Paso 2: 🧸 = 🐝 + ${c} = ${a} + ${c} = <b>${b}</b>.`, bAdd: BOARD.lines([`🧸 = ${b}`]) },
          { t: `Paso 3: el doble de 🧸 menos 🐝: ${b} + ${b} − ${a} = ${2 * b} − ${a} = <b>${ans}</b>.`, bAdd: BOARD.lines([`2 × ${b} − ${a} = ${ans}`]) }
        ],
        err: w => w === 2 * b ? "Falta restar la abeja." : w === b ? "Ese es el osito; falta el doble y restar." : "" }; },
  ]
];
lesson({ n: 45, next: 67, title: "Valores ocultos, igualdades y balanzas", short: "Balanzas", char: "rayo", music: "aventura", deco: ["⚖️", "⭐", "🍎", "🍓"],
  hello: "¡Hola! Soy <b>Rayo</b> 🐉. Cada figura esconde un <b>valor</b>. ¡Usa las igualdades y las balanzas para descubrirlo!",
  levels: LEVELS3(["Balanzas y estrellas", "Lados iguales"], ["Dos pistas", "Figura por figura"], ["", "Tres igualdades"]) }, GEN);
