/* Tema 44 · Pirámides y distribuciones numéricas · Bimba */
const build = base => { const rows = [base]; while (rows[0].length > 1) { const r = rows[0]; rows.unshift(r.slice(1).map((v, i) => r[i] + v)); } return rows; };
const GEN = [
  [
    () => { const a = between(1, 9), b = between(1, 9), ans = a + b;
      return { prompt: "En la pirámide, cada bloque es la <b>suma</b> de los dos de abajo. ¿Qué número va arriba?", say: "Cada bloque es la suma de los dos de abajo. ¿Qué número va arriba?", scene: pyramid([["?"], [a, b]]), ans, opts: numOpts(ans, [ans + 1, ans - 1, Math.abs(a - b)], 0), why: `${a} + ${b} = ${ans}.`, hint: "Suma los dos bloques de abajo.",
        steps: T => [
          { t: `La regla: cada bloque es la <b>suma</b> de los dos que tiene debajo.` },
          { t: `Sumamos los de abajo: ${a} + ${b}.`, b: BOARD.big(pyramid([[ans], [a, b]], new Set(["1,0", "1,1"]))) },
          { t: `Arriba va <b>${ans}</b>.` }
        ],
        err: w => w === Math.abs(a - b) ? "Restaste; la regla es sumar." : "" }; },
  ],
  [
    () => { const rows = build([between(1, 6), between(1, 6), between(1, 6)]), ans = rows[0][0], show = rows.map((r, i) => i === 0 ? ["?"] : r);
      return { prompt: "Completa la pirámide. ¿Qué número va en la <b>punta</b>?", say: "Completa la pirámide sumando de abajo hacia arriba. ¿Qué número va en la punta?", scene: pyramid(show), ans, opts: numOpts(ans, [rows[1][0], rows[1][1], ans + 1], 0), why: `Fila del medio: ${rows[1].join(" y ")}. Punta: ${rows[1][0]} + ${rows[1][1]} = ${ans}.`, hint: "Primero completa la fila del medio.",
        steps: T => [
          { t: `Vamos <b>de abajo hacia arriba</b>. Primero completamos la fila del medio sumando de dos en dos.`, b: BOARD.big(pyramid([["?"], rows[1], rows[2]], new Set(["2,0", "2,1", "2,2"]))) },
          { t: `${rows[2][0]} + ${rows[2][1]} = ${rows[1][0]} y ${rows[2][1]} + ${rows[2][2]} = ${rows[1][1]}.` },
          { t: `Punta: ${rows[1][0]} + ${rows[1][1]} = <b>${ans}</b>.`, b: BOARD.big(pyramid(rows, new Set(["1,0", "1,1"]))) }
        ],
        err: w => w === rows[1][0] || w === rows[1][1] ? "Ese es un bloque del medio; falta sumar los dos para la punta." : "" }; },
  ],
  [
    () => { const rows = build([between(1, 6), between(1, 6), between(1, 6)]), h = between(0, 2), ans = rows[2][h], show = rows.map((r, i) => i === 2 ? r.map((v, j) => j === h ? "?" : v) : i === 1 ? r : [rows[0][0]]);
      return { prompt: "Halla el número que falta en la base de la pirámide.", say: "Cada bloque es la suma de los dos de abajo. Halla el número que falta en la base.", scene: pyramid(show), ans, opts: numOpts(ans, [ans + 1, ans - 1, rows[1][0]], 0), why: `Base: ${rows[2].join(", ")}. Comprueba: ${rows[1].join(" y ")}.`, hint: "Usa la fila del medio: ¿qué número sumado da ese resultado?",
        steps: T => { const j = h === 0 ? 0 : h - 1, other = h === 0 ? rows[2][1] : rows[2][h - 1], sum = h === 0 ? rows[1][0] : rows[1][h - 1];
          return [
            { t: `Usamos un bloque del medio que esté justo encima del espacio: ${sum}. Debajo tiene el «?» y el ${other}.`, b: BOARD.big(pyramid(show, new Set([`1,${j}`]))) },
            { t: `¿Qué número sumado con ${other} da ${sum}? ${sum} − ${other} = <b>${ans}</b>.`, b: BOARD.lines([`? + ${other} = ${sum}`, `${sum} − ${other} = ${ans}`]) },
            { t: `Comprobamos con la pirámide completa:`, b: BOARD.big(pyramid(rows, new Set([`2,${h}`]))) }
          ]; } }; },
    () => { const mk = () => { const a = between(1, 6), b = between(1, 6), c = between(1, 6), d = between(1, 6); return [a, b, c, d, a + b + c + d]; }, s = [mk(), mk(), mk()], ans = s[2][4];
      const box = (q, i) => `<div style="display:inline-grid;grid-template-columns:repeat(3,26px);grid-template-rows:repeat(3,26px);font:900 16px sans-serif;margin:4px 8px;text-align:center;align-items:center"><span>${q[0]}</span><span></span><span>${q[1]}</span><span></span><span class="card-op" style="padding:2px 4px">${i < 2 ? q[4] : "x"}</span><span></span><span>${q[2]}</span><span></span><span>${q[3]}</span></div>`;
      return { prompt: "Halla el valor de <b>x</b> en la distribución numérica.", say: "Mira los números de las esquinas y el del centro. Halla x.", scene: `<div class="line">${s.map(box).join("")}</div>`, ans, opts: numOpts(ans, [ans + 1, ans - 2, ans + 3], 0), why: `En el centro va la suma de las esquinas: ${s[2].slice(0, 4).join(" + ")} = ${ans}.`, hint: "Suma las cuatro esquinas de los primeros cuadros.",
        steps: T => [
          { t: `Buscamos la regla en los cuadros completos: ¿cómo se obtiene el del centro con las cuatro esquinas?` },
          { t: `Sumamos las esquinas:`, b: BOARD.lines(s.slice(0, 2).map(q => `${q.slice(0, 4).join(" + ")} = ${q[4]} ✅`)) },
          { t: `En el centro va la suma de las esquinas: ${s[2].slice(0, 4).join(" + ")} = <b>${ans}</b>.` }
        ] }; },
  ]
];
lesson({ n: 44, title: "Pirámides y distribuciones numéricas", short: "Pirámides", char: "bimba", music: "pop", deco: ["🔺", "🧱", "➕", "❓"],
  hello: "¡Hola! Soy <b>Bimba</b> 🐘. En una <b>pirámide numérica</b>, cada bloque es la suma de los dos que tiene debajo.",
  levels: LEVELS3(["Pirámide pequeña", "Sumar dos bloques"], ["Pirámide de 3 pisos", "¿Qué va en la punta?"], ["", "Bases escondidas y distribuciones"]) }, GEN);
