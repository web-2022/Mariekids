/* Tema 32 · Problemas sencillos de multiplicación · Rayo */
const GEN = [
  [
    () => { const k = between(2, 5), g = between(2, 6), e = pick(["🍬", "🍪", "🍓"]), ans = k * g;
      return { prompt: `Hay <b>${k}</b> bolsas con <b>${g}</b> ${e} cada una. ¿Cuántos hay en total?`, say: `${k} bolsas con ${g} cada una. ¿Cuántos hay en total?`, scene: line(em("🛍️", k)), ans, opts: numOpts(ans, [k + g, ans + g, ans - 1], 1), why: `${k} × ${g} = ${ans}.`, hint: `Suma ${g} tantas veces como bolsas hay.` }; },
  ],
  [
    () => { const p = between(2, 5), q = between(2, 5), ans = p * q;
      return { prompt: `Cada chupete cuesta <b>S/ ${p}</b>. ¿Cuánto pago por <b>${q}</b> chupetes?`, say: `Cada chupete cuesta ${p} soles. ¿Cuánto pago por ${q}?`, scene: line(em("🍭", q)), ans, opts: numOpts(ans, [p + q, ans + p, ans - p], 1), why: `${q} × ${p} = ${ans} soles.`, hint: "Suma el precio una vez por cada chupete." }; },
  ],
  [
    () => { const n = between(3, 6), c = between(2, 3), ans = n * c;
      return { prompt: `Si cada niño y niña compra <b>${c}</b> chupetes, ¿cuántos chupetes vendió en total la señora Tita?`, say: `Cada niño compra ${c} chupetes. ¿Cuántos vendió en total la señora Tita?`, scene: line([...sample(["👧", "👦", "🧒", "👧🏽", "👦🏻", "🧒🏾"], n), "🛒"]), ans, opts: numOpts(ans, [n + c, n, ans + c], 1),
        why: `Hay ${n} niños: ${n} × ${c} = ${ans}.`, hint: "Primero cuenta a los niños (¡no a la vendedora!)." }; },
    () => { const s = between(2, 4), m = between(3, 5), ans = s * m;
      return { prompt: `María tiene <b>${s}</b> blusas y <b>${m}</b> faldas. ¿De cuántas maneras diferentes se puede vestir con una blusa y una falda?`, say: `Tiene ${s} blusas y ${m} faldas. ¿De cuántas maneras se puede vestir?`, scene: line([...em("👚", s), "·", ...em("👗", m)]), ans, opts: numOpts(ans, [s + m, ans + 1, ans - 1], 1),
        why: `Cada blusa con cada falda: ${s} × ${m} = ${ans}.`, hint: "Para cada blusa hay varias faldas posibles." }; },
  ]
];
lesson({ n: 32, title: "Problemas sencillos de multiplicación", short: "Problemas de ×", char: "rayo", music: "aventura", deco: ["✖️", "🛍️", "🍭", "👗"],
  hello: "¡Hola! Soy <b>Rayo</b> 🐉. Cuando hay <b>grupos iguales</b> en un problema, ¡multiplicamos!",
  levels: LEVELS3(["Bolsas iguales", "¿Cuántos en total?"], ["Precios", "Cuánto pago"], ["", "Ventas y combinaciones"]) }, GEN);
