/* Tema 14 · Antecesor, sucesor y recta numérica · Lula */
const GEN = [
  [
    () => { const n = between(2, 60), s = rnd(2) === 0, ans = s ? n + 1 : n - 1;
      return { prompt: `¿Cuál es el <b>${s ? "sucesor" : "antecesor"}</b> de ${n}?`, say: `¿Cuál es el ${s ? "sucesor" : "antecesor"} de ${n}?`, scene: `<div class="seq">${s ? `${n} → ⬜` : `⬜ ← ${n}`}</div><div class="legend">${s ? "sucesor = el que viene después (+1)" : "antecesor = el que va antes (−1)"}</div>`,
        ans, opts: numOpts(ans, [s ? n - 1 : n + 1, n, s ? n + 2 : n - 2], 0), why: `El ${s ? "sucesor" : "antecesor"} de ${n} es ${ans}.`, hint: s ? "Suma 1." : "Resta 1.",
        steps: T => [
          { t: s ? `El <b>sucesor</b> es el número que viene <b>después</b>: le sumamos 1.` : `El <b>antecesor</b> es el número que va <b>antes</b>: le restamos 1.` },
          { t: `En la recta damos un salto ${s ? "hacia adelante" : "hacia atrás"} desde ${n}:`, b: BOARD.jumps(n, [s ? 1 : -1], { pad: 2 }) },
          { t: `${n} ${s ? "+" : "−"} 1 = <b>${ans}</b>.` }
        ],
        err: o => o === (s ? n - 1 : n + 1) ? (s ? "Ese es el antecesor (el de antes). El sucesor va después." : "Ese es el sucesor (el de después). El antecesor va antes.") : "" }; },
  ],
  [
    () => { const step = pick([1, 2, 5]), a = between(1, 20) * (step === 5 ? 1 : 1), vals = Array.from({ length: 6 }, (_, i) => a + i * step), h = between(2, 4), ans = vals[h];
      return { prompt: "¿Qué número representa la abejita 🐝 en la recta numérica?", say: "¿Qué número representa la abejita en la recta?", scene: numberLine(vals, { [h]: "🐝" }), ans, opts: numOpts(ans, [ans + step, ans - step, ans + 1], 0),
        why: `Los números van de ${step} en ${step}: la abejita está en ${ans}.`, hint: "Mira de cuánto en cuánto avanzan los números.",
        steps: T => [
          { t: `Primero vemos de cuánto en cuánto avanzan los números: de ${vals[0]} a ${vals[1]} hay <b>+${step}</b>.`, b: BOARD.seq(vals.map((v, i) => i === h ? "🐝" : v)) },
          { t: `La 🐝 está justo después de ${vals[h - 1]}. Damos un salto de ${step}:`, b: BOARD.jumps(vals[h - 1], [step], { pad: step }) },
          { t: `${vals[h - 1]} + ${step} = <b>${ans}</b>. Comprobamos: después viene ${vals[h + 1]}. ✅` }
        ],
        err: o => Math.abs(o - ans) === step ? "Te corriste un lugar en la recta. Cuenta los saltos con cuidado." : "" }; },
    () => { const step = pick([1, 2]), a = between(5, 30), vals = Array.from({ length: 6 }, (_, i) => a + i * step), h = between(2, 4), b = vals[h], ans = b - 1;
      return { prompt: "¿Cuál es el <b>antecesor</b> del número que representa la 🐝?", say: "¿Cuál es el antecesor del número de la abejita?", scene: numberLine(vals, { [h]: "🐝" }), ans, opts: numOpts(ans, [b, b + 1, b - step === ans ? b - 2 : b - step], 0),
        why: `La 🐝 está en ${b}; su antecesor es ${ans}.`, hint: "Primero descubre el número de la abejita y luego réstale 1.",
        steps: T => [
          { t: `Primero descubrimos el número de la 🐝. Avanzan de ${step} en ${step}, y la 🐝 está después de ${vals[h - 1]}: es <b>${b}</b>.`, b: BOARD.seq(vals.map((v, i) => i === h ? `🐝=${v}` : v)) },
          { t: `El <b>antecesor</b> es el que va justo antes: ${b} − 1.`, b: BOARD.jumps(b, [-1], { pad: 2 }) },
          { t: `${b} − 1 = <b>${ans}</b>.` }
        ],
        err: o => o === b ? "Ese es el número de la abejita; piden su antecesor." : o === b + 1 ? "Ese es el sucesor; el antecesor va antes." : "" }; },
  ],
  [
    () => { const n = between(101, 189), s = n + 1, ans = String(s).split("").reduce((a, b) => a + +b, 0);
      return { prompt: `Tu hermano tiene el asiento <b>${n}</b> en el cine. El tuyo es el <b>sucesor</b>. ¿Cuánto suman las cifras de tu número?`, say: `Tu hermano tiene el asiento ${n}. El tuyo es el sucesor. ¿Cuánto suman las cifras de tu número?`, scene: `<div class="card-op">🎬 Asiento ${n}</div>`,
        ans, opts: numOpts(ans, [s, String(n).split("").reduce((a, b) => a + +b, 0), ans + 1].filter(x => x !== ans), 0), why: `Tu número: ${s}. ${String(s).split("").join(" + ")} = ${ans}.`, hint: "Primero halla el sucesor; después suma sus cifras.",
        steps: T => [
          { t: `Tu asiento es el <b>sucesor</b> de ${n}: ${n} + 1 = <b>${s}</b>.`, b: BOARD.jumps(n, [1], { pad: 2 }) },
          { t: `Ahora sumamos las cifras de ${s}: ${String(s).split("").join(", ")}.`, b: BOARD.lines([`${String(s).split("").join(" + ")} = ${ans}`]) },
          { t: `Las cifras suman <b>${ans}</b>.` }
        ],
        err: o => o === s ? "Ese es tu número de asiento; piden la suma de sus cifras." : o === String(n).split("").reduce((p, q) => p + +q, 0) ? "Sumaste las cifras del asiento de tu hermano." : "" }; },
    () => { const n = between(10, 80), t = pick(["as", "sa", "ss", "aa"]), ans = { as: n, sa: n, ss: n + 2, aa: n - 2 }[t], txt = { as: "antecesor del sucesor", sa: "sucesor del antecesor", ss: "sucesor del sucesor", aa: "antecesor del antecesor" }[t];
      return { prompt: `¿Cuál es el <b>${txt}</b> de ${n}?`, say: `¿Cuál es el ${txt} de ${n}?`, scene: "", ans, opts: numOpts(ans, [n + 1, n - 1, n + 2, n - 2].filter(x => x !== ans), 0), why: `Hazlo paso a paso desde el final: queda ${ans}.`, hint: "Empieza por la última palabra.",
        steps: T => { const [w1, w2] = { as: ["sucesor", "antecesor"], sa: ["antecesor", "sucesor"], ss: ["sucesor", "sucesor"], aa: ["antecesor", "antecesor"] }[t], j = w => w === "sucesor" ? 1 : -1, m = n + j(w1);
          return [
            { t: `Se resuelve <b>desde el final</b>: primero el ${w1} de ${n}, y después el ${w2} de ese resultado.` },
            { t: `${w1} de ${n} = <b>${m}</b>. Luego, ${w2} de ${m} = <b>${ans}</b>.`, b: BOARD.jumps(n, [j(w1), j(w2)], { pad: 2 }) },
            { t: `El ${txt} de ${n} es <b>${ans}</b>.` }
          ]; } }; },
  ]
];
lesson({ n: 14, title: "Antecesor, sucesor y recta numérica", short: "Antecesor y sucesor", char: "lula", music: "aventura", deco: ["⬅️", "➡️", "🐝", "📏"],
  hello: "¡Hola! Soy <b>Lula</b> 🦊. El <b>antecesor</b> va antes y el <b>sucesor</b> va después. ¡Y la recta numérica nos ayuda!",
  levels: LEVELS3(["Antes y después", "Antecesor y sucesor"], ["Recta numérica", "¿Dónde está la abejita?"], ["", "Asientos y dobles pasos"]) }, GEN);
