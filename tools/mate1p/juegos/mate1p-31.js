/* Tema 31 · Suma repetida y multiplicación gráfica · Tito */
const GEN = [
  [
    () => { const k = between(2, 4), g = between(2, 5), e = pick(["🍎", "⭐", "🌸", "🍪"]), ans = k * g;
      return { prompt: `${Array(k).fill(g).join(" + ")} = ?`, say: `¿Cuánto es ${Array(k).fill(g).join(" más ")}?`, scene: `<div class="boxes">${Array.from({ length: k }, () => `<div class="box" style="--bc:${Math.min(g, 3)}">${em(e, g).join("")}</div>`).join("")}</div>`, ans, opts: numOpts(ans, [k + g, ans + g, ans - g], 1),
        why: `${k} grupos de ${g} = ${ans}.`, hint: "Suma de a poco: ve sumando cada grupo." }; },
  ],
  [
    () => { const r = between(2, 4), c = between(2, 5), e = pick(["🟣", "🔵", "🟢"]), ans = r * c;
      return { prompt: `${r} × ${c} = ?`, say: `¿Cuánto es ${r} por ${c}?`, scene: `<div class="rowsbox">${Array.from({ length: r }, () => line(em(e, c), "small")).join("")}</div><div class="legend">${r} filas de ${c}</div>`, ans, opts: numOpts(ans, [r + c, ans + 1, ans + c], 1),
        why: `${r} × ${c} = ${Array(r).fill(c).join(" + ")} = ${ans}.`, hint: "Multiplicar es sumar el mismo número varias veces." }; },
    () => { const k = between(2, 5), g = between(2, 5), ans = `${k} × ${g}`;
      return { prompt: `¿Qué multiplicación es igual a ${Array(k).fill(g).join(" + ")}?`, say: "¿Qué multiplicación es igual a esta suma?", scene: "", ans, opts: shuffle([...new Set([ans, `${k} + ${g}`, `${k + 1} × ${g}`, `${k} × ${g + 1}`])]), cols: 2, why: `${g} sumado ${k} veces = ${k} × ${g}.`, hint: "Cuenta cuántas veces se repite el número." }; },
  ],
  [
    () => { const b = between(2, 5), a = between(1, 3), ans = 2 * b + 4 * a;
      return { prompt: `¿Cuántas <b>ruedas</b> hay en total en <b>${b}</b> bicicletas y <b>${a}</b> auto${a > 1 ? "s" : ""}?`, say: `¿Cuántas ruedas hay en ${b} bicicletas y ${a} autos?`, scene: line([...em("🚲", b), ...em("🚗", a)]), ans, opts: numOpts(ans, [b + a, 2 * (b + a), 4 * (b + a)], 1), why: `Bicis: ${b} × 2 = ${2 * b}. Autos: ${a} × 4 = ${4 * a}. Total: ${ans}.`, hint: "La bici tiene 2 ruedas y el auto 4." }; },
  ]
];
lesson({ n: 31, title: "Suma repetida y multiplicación gráfica", short: "Multiplicar", char: "tito", music: "chiptune", deco: ["✖️", "🔁", "🚲", "🍎"],
  hello: "¡Bip bup! Soy <b>Tito</b> 🤖. Cuando sumamos el <b>mismo número</b> varias veces, ¡podemos <b>multiplicar</b>!",
  levels: LEVELS3(["Suma repetida", "Grupos iguales"], ["Multiplicación gráfica", "Filas y × "], ["", "Ruedas y patas"]) }, GEN);
