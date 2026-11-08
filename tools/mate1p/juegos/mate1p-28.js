/* Tema 28 · La mitad de una cantidad · Lula */
const GEN = [
  [
    () => { const e = pick(["🍪", "🍓", "⚽", "🌸"]), n = 2 * between(1, 6), ans = n / 2;
      return { prompt: `¿Cuál es la <b>mitad</b> de ${n}?`, say: `¿Cuál es la mitad de ${n}?`, scene: line(em(e, n)), ans, opts: numOpts(ans, [n, 2 * n, ans + 1], 0), why: `${n} repartido en 2 grupos iguales: ${ans} y ${ans}.`, hint: "Reparte en 2 grupos iguales.",
        steps: T => [
          { t: `La <b>mitad</b> es repartir en <b>2 grupos iguales</b>. Repartimos de uno en uno: uno al azul, uno al naranja…`, go: T.split(T.its()) },
          { t: `Cada grupo tiene ${ans}. La mitad de ${n} es <b>${ans}</b>.`, b: BOARD.lines([`${ans} + ${ans} = ${n}`]) },
          { t: `Comprobamos: el doble de ${ans} es ${n}. ✅` }
        ],
        err: w => w === 2 * n ? "Ese es el doble; la mitad es más pequeña." : w === n ? "Ese es el total; hay que repartirlo en 2." : "" }; },
  ],
  [
    () => { const n = 10 * between(2, 9) * (rnd(2) ? 1 : 1), ans = n / 2;
      return { prompt: `Karina dice: «Yo tengo <b>${n}</b> muñecas». Margie responde: «Pues yo tengo la <b>mitad</b>». ¿Cuántas muñecas tiene Margie?`, say: `Karina tiene ${n} muñecas y Margie la mitad. ¿Cuántas tiene Margie?`, scene: "", ans, opts: numOpts(ans, [n, 2 * n, ans + 10], 0), why: `La mitad de ${n} es ${ans}.`, hint: "La mitad de 10 es 5, la mitad de 20 es 10…",
        steps: T => [
          { t: `La mitad de ${n}: pensamos en decenas. ${n} son ${n / 10} decenas.`, b: BOARD.du(n, { total: false }) },
          { t: `Repartimos las decenas en 2 grupos iguales${(n / 10) % 2 ? ": una decena se cambia por 10 unidades para poder partirla" : ""}.`, b: BOARD.lines([`${ans} + ${ans} = ${n}`]) },
          { t: `La mitad de ${n} es <b>${ans}</b>. Margie tiene ${ans} muñecas.` }
        ],
        err: w => w === 2 * n ? "Ese es el doble." : w === n ? "Esas son las de Karina." : "" }; },
  ],
  [
    () => { const n = 4 * between(2, 6), ans = n / 4;
      return { prompt: `¿Cuál es la <b>mitad de la mitad</b> de ${n}?`, say: `¿Cuál es la mitad de la mitad de ${n}?`, scene: "", ans, opts: numOpts(ans, [n / 2, n, ans + 1], 0), why: `La mitad de ${n} es ${n / 2}; la mitad de ${n / 2} es ${ans}.`, hint: "Dos pasos: primero la mitad, luego otra vez la mitad.",
        steps: T => [
          { t: `Son <b>dos pasos</b>: primero la mitad de ${n}, y después la mitad de ese resultado.` },
          { t: `Mitad de ${n} = <b>${n / 2}</b>.`, b: BOARD.share(n, 2, "●", { names: ["mitad", "mitad"] }) },
          { t: `Mitad de ${n / 2} = <b>${ans}</b>.`, b: BOARD.share(n / 2, 2, "●", { names: ["mitad", "mitad"] }) + BOARD.lines([`${n} → ${n / 2} → ${ans}`]) }
        ],
        err: w => w === n / 2 ? "Esa es solo la primera mitad; falta partirla otra vez." : "" }; },
    () => { const d = 2 * between(2, 6), o = between(2, 4), ans = d / 2;
      return { prompt: "La mitad de los dados 🎲 que hay es:", say: "Cuenta solo los dados. ¿Cuál es la mitad?", scene: `<div class="dice">${shuffle([...Array(d).fill(0).map(() => `<span class="it" data-k="D">${dieSvg(between(1, 6), 42)}</span>`), ...em("<span class='it' data-k='O' style='font-size:34px'>⚫</span>", o)]).join("")}</div>`, ans, opts: numOpts(ans, [d, d + o, (d + o) >> 1 !== ans ? (d + o) >> 1 : ans + 1], 0), why: `Hay ${d} dados. La mitad es ${ans}.`, hint: "¡Las bolitas negras no son dados!",
        steps: T => { const dd = T.of("D");
          return [
            { t: `Solo cuentan los <b>dados</b> 🎲. Las bolitas ⚫ no son dados: las apagamos.`, go: d2 => { T.dim(T.of("O")); setTimeout(d2, 600); } },
            { t: `Contamos los dados:`, go: T.count(dd) },
            { t: `Hay ${d} dados. Los repartimos en 2 grupos iguales:`, go: d2 => { T.clear(); T.dim(T.of("O")); T.split(dd)(d2); } },
            { t: `Cada grupo tiene ${ans}: la mitad de ${d} es <b>${ans}</b>.` }
          ]; },
        err: w => w === d ? "Ese es el total de dados; piden la mitad." : w === d + o ? "¡Contaste las bolitas como si fueran dados!" : "" }; },
  ]
];
lesson({ n: 28, title: "La mitad de una cantidad", short: "La mitad", char: "lula", music: "calma", deco: ["🍕", "½", "🍪", "🎲"],
  hello: "¡Hola! Soy <b>Lula</b> 🦊. La <b>mitad</b> es repartir en <b>dos partes iguales</b>.",
  levels: LEVELS3(["¿Cuál es la mitad?", "Dos grupos iguales"], ["Problemas de la mitad", "Muñecas y más"], ["", "Mitad de la mitad y dados"]) }, GEN);
