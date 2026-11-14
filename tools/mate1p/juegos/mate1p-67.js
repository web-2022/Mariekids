/* Tema 67 · Criptoaritmética (cifras ocultas) · Bimba */
// operación en columna; cada número es un texto («4□», «AB»); □ y letras se resaltan
function cripto(rows, sign = "+") {
  const w = Math.max(...rows.map(r => r.length));
  const cell = ch => /[□A-Z★]/.test(ch) ? `<span class="cx it" data-k="${ch}">${ch}</span>` : `<span>${ch}</span>`;
  const row = (t, op = "", cls = "") => `<div class="cr ${cls}"><span class="op">${op}</span>${t.padStart(w, " ").split("").map(c => c === " " ? "<span></span>" : cell(c)).join("")}</div>`;
  return `<div class="cripto" style="--w:${w}">` + rows.slice(0, -1).map((r, i) => row(r, i === rows.length - 2 ? sign : "")).join("") + row(rows[rows.length - 1], "", "res") + `</div>`;
}
const hide = (n, pos) => { const s = String(n).split(""); s[pos] = "□"; return s.join(""); };
const GEN = [
  [ // Básico: un casillero, sin llevar
    () => { let a, bb; do { a = between(11, 78); bb = between(10, 60); } while ((a % 10) + (bb % 10) > 9 || a + bb > 99);
      const pos = rnd(2), ans = +String(a)[pos], c = a + bb;
      return { prompt: `¿Qué cifra va en el <b>□</b>?`, say: "¿Qué cifra va en el cuadrito?",
        scene: cripto([hide(a, pos), String(bb), String(c)]), ans, opts: numOpts(ans, [+String(c)[pos], ans + 1, ans - 1].filter(x => x <= 9), 0),
        why: `${pos ? "Unidades" : "Decenas"}: □ + ${String(bb)[pos]} = ${String(c)[pos]} → □ = ${ans}.`, hint: pos ? "Mira la columna de las unidades." : "Mira la columna de las decenas.",
        steps: T => [
          { t: `El □ está en la columna de las <b>${pos ? "unidades" : "decenas"}</b>. Solo miramos esa columna.` },
          { t: `□ + ${String(bb)[pos]} = ${String(c)[pos]}. ¿Qué número más ${String(bb)[pos]} da ${String(c)[pos]}?`, b: BOARD.lines([`□ + ${String(bb)[pos]} = ${String(c)[pos]}`, `□ = ${String(c)[pos]} − ${String(bb)[pos]} = ${ans}`]) },
          { t: `□ = <b>${ans}</b>. Comprobamos:`, b: BOARD.op([a, bb], "+") }
        ],
        err: w => w === +String(c)[pos] ? "Ese es el resultado de la columna; falta quitar el otro número." : "" }; },
    () => { let a, bb; do { a = between(21, 98); bb = between(10, a - 10); } while ((a % 10) < (bb % 10) || a - bb < 10);
      const c = a - bb, pos = rnd(2), ans = +String(c).padStart(2, "0")[pos], cs = String(c).padStart(2, "0");
      return { prompt: `¿Qué cifra va en el <b>□</b>?`, say: "¿Qué cifra va en el cuadrito?",
        scene: cripto([String(a), String(bb), hide(c, pos)], "−"), ans, opts: numOpts(ans, [ans + 1, ans - 1, +String(a)[pos] + +String(bb)[pos]].filter(x => x <= 9), 0),
        why: `${String(a)[pos]} − ${String(bb)[pos]} = ${ans}.`, hint: "Haz la resta de esa columna.",
        steps: T => [
          { t: `Es una resta. El □ está en las <b>${pos ? "unidades" : "decenas"}</b>.` },
          { t: `Restamos esa columna:`, b: BOARD.lines([`${String(a)[pos]} − ${String(bb)[pos]} = ${ans}`]) },
          { t: `□ = <b>${ans}</b>.`, b: BOARD.op([a, bb], "-") }
        ],
        err: w => w === +String(a)[pos] + +String(bb)[pos] ? "Es una resta, no una suma." : "" }; },
    () => { const x = between(1, 9), k = pick([2, 3]), s = k * x, ans = x;
      return { prompt: `Si <b>${Array(k).fill("★").join(" + ")} = ${s}</b>, ¿cuánto vale ★?`, say: `Si ${Array(k).fill("estrella").join(" más ")} es igual a ${s}, ¿cuánto vale la estrella?`,
        scene: "", ans, opts: numOpts(ans, [s, s - k, ans + 1], 0),
        why: `${k} estrellas iguales suman ${s}: ★ = ${s} ÷ ${k} = ${ans}.`, hint: `¿Qué número repetido ${k} veces da ${s}?`,
        steps: T => [
          { t: `Todas las ★ valen <b>lo mismo</b>. Hay ${k} estrellas que juntas suman ${s}.` },
          { t: `Las ★ valen lo mismo. Repartimos ${s} en ${k} partes iguales:`, b: BOARD.share(s, k, "●", { names: Array(k).fill("★") }) },
          { t: `★ = <b>${ans}</b>. Comprobamos: ${Array(k).fill(ans).join(" + ")} = ${s}. ✅` }
        ],
        err: w => w === s ? "Ese es el total de las estrellas juntas." : "" }; },
  ],
  [ // Intermedio: con llevada y dos casilleros
    () => { let a, b; do { a = between(15, 69); b = between(15, 69); } while ((a % 10) + (b % 10) < 10 || a + b > 99);
      const c = a + b, ans = a % 10;
      return { prompt: `¿Qué cifra va en el <b>□</b>? (¡ojo con lo que se lleva!)`, say: "¿Qué cifra va en el cuadrito? Ojo con lo que se lleva.",
        scene: cripto([hide(a, 1), String(b), String(c)]), ans, opts: numOpts(ans, [(c % 10) - (b % 10) < 0 ? ans + 1 : ((c % 10) - (b % 10)), ans + 1, ans - 1].filter(x => x >= 0 && x <= 9), 0),
        why: `□ + ${b % 10} termina en ${c % 10}: □ + ${b % 10} = ${ans + b % 10} → □ = ${ans}.`, hint: `¿Qué número más ${b % 10} termina en ${c % 10}?`,
        steps: T => [
          { t: `Unidades: □ + ${b % 10} debe terminar en <b>${c % 10}</b>. Como ${c % 10} es menor que ${b % 10}, la suma pasó de 10: es <b>1${c % 10}</b> y se lleva 1.` },
          { t: `□ + ${b % 10} = ${10 + c % 10}`, b: BOARD.lines([`□ + ${b % 10} = ${10 + c % 10}`, `□ = ${10 + c % 10} − ${b % 10} = ${ans}`]) },
          { t: `□ = <b>${ans}</b>. Comprobamos:`, b: BOARD.op([a, b], "+") }
        ] }; },
    () => { let a, b; do { a = between(12, 59); b = between(12, 39); } while (a + b > 99);
      const c = a + b, ra = hide(a, 0), rb = hide(b, 1), ans = Math.floor(a / 10) + b % 10;
      return { prompt: `Hay dos □. ¿Cuánto suman las dos cifras escondidas?`, say: "Hay dos cuadritos. ¿Cuánto suman los dos?",
        scene: cripto([ra, rb, String(c)]), ans, opts: numOpts(ans, [ans + 1, ans - 1, Math.floor(a / 10)], 0),
        why: `Unidades: ${a % 10} + □ = ${c % 10}${(a % 10) + (b % 10) > 9 ? " (y se lleva 1)" : ""} → □ = ${b % 10}. Decenas: □ = ${Math.floor(a / 10)}. Suma: ${ans}.`, hint: "Empieza por las unidades.",
        steps: T => [
          { t: `Unidades: ${a % 10} + □ termina en ${c % 10}. Ese □ es <b>${b % 10}</b>${(a % 10) + (b % 10) > 9 ? " y se lleva 1" : ""}.` },
          { t: `Decenas: □ + ${Math.floor(b / 10)}${(a % 10) + (b % 10) > 9 ? " + 1 que llevo" : ""} = ${Math.floor(c / 10)}. Ese □ es <b>${Math.floor(a / 10)}</b>.`, b: BOARD.op([a, b], "+") },
          { t: `Los dos □ suman ${Math.floor(a / 10)} + ${b % 10} = <b>${ans}</b>.` }
        ] }; },
    () => { const x = between(1, 8), y = between(1, 9 - x), s = x + y, d = x * 2 + y;
      return { prompt: `Si <b>★ + ● = ${s}</b> y <b>★ + ★ + ● = ${d}</b>, ¿cuánto vale ★?`, say: `Si estrella más círculo es ${s}, y estrella más estrella más círculo es ${d}, ¿cuánto vale la estrella?`,
        scene: "", ans: x, opts: numOpts(x, [y, s, d - s + 1], 0),
        why: `La segunda tiene una ★ más y suma ${d - s} más: ★ = ${d} − ${s} = ${x}.`, hint: "Compara las dos igualdades: ¿qué tiene de más la segunda?",
        steps: T => [
          { t: `Comparamos: la segunda igualdad tiene <b>una ★ más</b> que la primera.`, b: BOARD.lines([`★ + ● = ${s}`, `★ + ★ + ● = ${d}`]) },
          { t: `Esa ★ de más hace que sume ${d} − ${s} = ${d - s} más.` },
          { t: `★ = <b>${x}</b>. Comprobamos: ● = ${s} − ${x} = ${y}; ${x} + ${x} + ${y} = ${d}. ✅` }
        ],
        err: w => w === y ? "Ese es el valor del círculo." : "" }; },
  ],
  [ // Reto concurso: letras
    () => { let A, B; do { A = between(1, 8); B = between(1, 8); } while (A === B || A + B > 9);
      const ab = 10 * A + B, ba = 10 * B + A, s = ab + ba, ans = A + B;
      return { prompt: `Cada letra es una cifra: <b>AB + BA = ${s}</b>. ¿Cuánto es <b>A + B</b>?`, say: `A B más B A es igual a ${s}. ¿Cuánto es A más B?`,
        scene: cripto(["AB", "BA", String(s)]), ans, opts: numOpts(ans, [s, ans + 1, A], 1),
        why: `En las unidades B + A = ${ans} (sin llevar), y en las decenas A + B = ${ans}: por eso el resultado es ${ans}${ans}.`, hint: "Mira la columna de las unidades: suma B + A.",
        steps: T => [
          { t: `Unidades: B + A. Decenas: A + B. ¡Las dos columnas suman lo mismo!` },
          { t: `El resultado es ${s}: las dos cifras son ${ans}. Entonces A + B = <b>${ans}</b>.` },
          { t: `Por ejemplo, A = ${A} y B = ${B}:`, b: BOARD.op([ab, ba], "+") }
        ],
        err: w => w === s ? "Ese es el resultado de la suma de números; piden A + B." : "" }; },
    () => { const A = between(1, 9), s = 11 * A, ans = A;
      return { prompt: `<b>A + AA = ${s + A}</b>, ¿cuánto vale A? (AA es un número de dos cifras iguales)`, say: `A más A A es igual a ${s + A}. ¿Cuánto vale A?`,
        scene: cripto(["A", "AA", String(s + A)]), ans, opts: numOpts(ans, [ans + 1, ans - 1, (s + A) % 10], 1),
        why: `AA = ${s}; ${s} + ${A} = ${s + A}. A = ${A}.`, hint: "Prueba con las alternativas.",
        steps: T => [
          { t: `AA es un número como 11, 22, 33… Probamos: ¿con qué A, A + AA da ${s + A}?` },
          { t: `Si A = ${A}: AA = ${s}, y ${A} + ${s} = ${s + A}. ✅`, b: BOARD.op([A, s], "+") },
          { t: `A = <b>${ans}</b>.` }
        ] }; },
    () => { const A = between(2, 4), r = 3 * A + 1, ans = A;
      return { prompt: `Si <b>A + A + A + 1 = ${r}</b>, ¿cuánto vale <b>A + A</b>?`, say: `Si A más A más A más 1 es igual a ${r}, ¿cuánto vale A más A?`,
        scene: "", ans: 2 * A, opts: numOpts(2 * A, [A, 3 * A, r - 1], 1),
        why: `3 veces A = ${r - 1} → A = ${A}. A + A = ${2 * A}.`, hint: "Primero quita el 1 y halla A.",
        steps: T => [
          { t: `Quitamos el 1: A + A + A = ${r - 1}.` },
          { t: `Tres A iguales suman ${r - 1}:`, b: BOARD.share(r - 1, 3, "●", { names: ["A", "A", "A"] }) },
          { t: `A = ${A}. Piden A + A = <b>${2 * A}</b>.` }
        ],
        err: w => w === A ? "Ese es A; piden A + A." : "" }; },
  ]
];
lesson({ n: 67, next: 62, title: "Criptoaritmética (cifras ocultas)", short: "Criptoaritmética", char: "bimba", music: "electro", deco: ["🔐", "❓", "🔢", "⭐"],
  hello: "¡Hola! Soy <b>Bimba</b>. En la <b>criptoaritmética</b> hay cifras escondidas en □ o en letras. Como un detective, miramos <b>columna por columna</b> (primero las unidades) y descubrimos qué número falta.",
  levels: LEVELS3(["Un □ escondido", "4□ + 23 = 68"], ["Llevadas y dos □", "□ que se lleva · ★ y ●"], ["", "AB + BA · letras"]) }, GEN);
