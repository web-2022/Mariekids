/* Tema 31 · Suma repetida y multiplicación gráfica · Tito */
const GEN = [
  [
    () => { const k = between(2, 4), g = between(2, 5), e = pick(["🍎", "⭐", "🌸", "🍪"]), ans = k * g;
      return { prompt: `${Array(k).fill(g).join(" + ")} = ?`, say: `¿Cuánto es ${Array(k).fill(g).join(" más ")}?`, scene: `<div class="boxes">${Array.from({ length: k }, () => `<div class="box" style="--bc:${Math.min(g, 3)}">${em(`<span class="it">${e}</span>`, g).join("")}</div>`).join("")}</div>`, ans, opts: numOpts(ans, [k + g, ans + g, ans - g], 1),
        why: `${k} grupos de ${g} = ${ans}.`, hint: "Suma de a poco: ve sumando cada grupo.",
        steps: T => { const bx = T.its(".box");
          return [
            { t: `Hay ${k} grupos iguales y cada uno tiene ${g}. Sumamos grupo por grupo:`, go: T.count(bx, { label: i => String(i * g), say: i => String(i * g), cls: "t-big", ms: 1100 }) },
            { t: `${Array(k).fill(g).join(" + ")} = <b>${ans}</b>.`, b: BOARD.lines([`${Array(k).fill(g).join(" + ")} = ${ans}`, `${k} grupos de ${g} = ${ans}`]) },
            { t: `El resultado es <b>${ans}</b>.` }
          ]; },
        err: w => w === k + g ? `Sumaste ${k} + ${g}, pero son ${k} grupos de ${g}.` : "" }; },
  ],
  [
    () => { const r = between(2, 4), c = between(2, 5), e = pick(["🟣", "🔵", "🟢"]), ans = r * c;
      return { prompt: `${r} × ${c} = ?`, say: `¿Cuánto es ${r} por ${c}?`, scene: `<div class="rowsbox">${Array.from({ length: r }, () => line(em(e, c), "small")).join("")}</div><div class="legend">${r} filas de ${c}</div>`, ans, opts: numOpts(ans, [r + c, ans + 1, ans + c], 1),
        why: `${r} × ${c} = ${Array(r).fill(c).join(" + ")} = ${ans}.`, hint: "Multiplicar es sumar el mismo número varias veces.",
        steps: T => { const rows = T.its(".line"), last = rows.map(l => [...l.querySelectorAll(".it")].pop());
          return [
            { t: `<b>${r} × ${c}</b> se lee «${r} por ${c}»: son <b>${r} filas de ${c}</b>. Multiplicar es sumar el mismo número varias veces.` },
            { t: `Sumamos fila por fila:`, go: T.count(last, { label: i => String(i * c), say: i => String(i * c), cls: "t-big", ms: 1100 }) },
            { t: `${r} × ${c} = ${Array(r).fill(c).join(" + ")} = <b>${ans}</b>.`, b: BOARD.lines([`${r} × ${c} = ${Array(r).fill(c).join(" + ")} = ${ans}`]) }
          ]; },
        err: w => w === r + c ? "Sumaste los dos números; × es «grupos de»." : "" }; },
    () => { const k = between(2, 5), g = between(2, 5), ans = `${k} × ${g}`;
      return { prompt: `¿Qué multiplicación es igual a ${Array(k).fill(g).join(" + ")}?`, say: "¿Qué multiplicación es igual a esta suma?", scene: "", ans, opts: shuffle([...new Set([ans, `${k} + ${g}`, `${k + 1} × ${g}`, `${k} × ${g + 1}`])]), cols: 2, why: `${g} sumado ${k} veces = ${k} × ${g}.`, hint: "Cuenta cuántas veces se repite el número.",
        steps: T => [
          { t: `Contamos cuántas veces se repite el ${g}: <b>${k} veces</b>.`, b: BOARD.lines([Array(k).fill(g).map((x, i) => `${x}<sup style="color:#e11d48">${i + 1}</sup>`).join(" + ")]) },
          { t: `«${g} repetido ${k} veces» se escribe <b>${k} × ${g}</b> (${k} grupos de ${g}).` },
          { t: `La multiplicación es <b>${ans}</b> = ${k * g}.` }
        ],
        err: w => w === `${k} + ${g}` ? "Eso es una suma de dos números; la multiplicación es «grupos de»." : "" }; },
  ],
  [
    () => { const b = between(2, 5), a = between(1, 3), ans = 2 * b + 4 * a;
      return { prompt: `¿Cuántas <b>ruedas</b> hay en total en <b>${b}</b> bicicletas y <b>${a}</b> auto${a > 1 ? "s" : ""}?`, say: `¿Cuántas ruedas hay en ${b} bicicletas y ${a} autos?`, scene: line([...em("🚲", b), ...em("🚗", a)]), ans, opts: numOpts(ans, [b + a, 2 * (b + a), 4 * (b + a)], 1), why: `Bicis: ${b} × 2 = ${2 * b}. Autos: ${a} × 4 = ${4 * a}. Total: ${ans}.`, hint: "La bici tiene 2 ruedas y el auto 4.",
        steps: T => [
          { t: `Una 🚲 tiene <b>2</b> ruedas y un 🚗 tiene <b>4</b>.` },
          { t: `Contamos las ruedas vehículo por vehículo:`, go: T.count(T.its(), { label: (i, el) => String(T.its().slice(0, i).reduce((p, x) => p + (x.textContent.includes("🚲") ? 2 : 4), 0)), say: (i, el) => String(T.its().slice(0, i).reduce((p, x) => p + (x.textContent.includes("🚲") ? 2 : 4), 0)), cls: "t-big", ms: 1100 }) },
          { t: `Bicis: ${b} × 2 = ${2 * b}. Autos: ${a} × 4 = ${4 * a}. Total: ${2 * b} + ${4 * a} = <b>${ans}</b>.`, b: BOARD.lines([`${b} × 2 = ${2 * b}`, `${a} × 4 = ${4 * a}`, `${2 * b} + ${4 * a} = ${ans}`]) }
        ],
        err: w => w === b + a ? "Contaste vehículos, no ruedas." : w === 2 * (b + a) ? "Los autos tienen 4 ruedas, no 2." : w === 4 * (b + a) ? "Las bicis tienen 2 ruedas, no 4." : "" }; },
  ]
];
lesson({ n: 31, title: "Suma repetida y multiplicación gráfica", short: "Multiplicar", char: "tito", music: "chiptune", deco: ["✖️", "🔁", "🚲", "🍎"],
  hello: "¡Bip bup! Soy <b>Tito</b> 🤖. Cuando sumamos el <b>mismo número</b> varias veces, ¡podemos <b>multiplicar</b>!",
  levels: LEVELS3(["Suma repetida", "Grupos iguales"], ["Multiplicación gráfica", "Filas y × "], ["", "Ruedas y patas"]) }, GEN);
