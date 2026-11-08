/* Tema 36 · Secuencias numéricas · Tito */
const seqTxt = a => `<div class="seq">${a.join(" ; ")}</div>`;
const GEN = [
  [
    () => { const d = pick([1, 2]), a = between(1, 20), s = [0, 1, 2, 3].map(i => a + d * i), ans = a + 4 * d;
      return { prompt: "¿Qué número <b>sigue</b>?", say: s.join(", ") + ". ¿Qué número sigue?", scene: seqTxt([...s, "?"]), ans, opts: numOpts(ans, [ans + 1, ans - 1, ans + d], 0), why: `Van de ${d} en ${d}: sigue ${ans}.`, hint: "¿Cuánto aumenta cada vez?",
        steps: T => [
          { t: `Para hallar la <b>regla</b>, miramos cuánto aumenta de un número al siguiente.`, b: BOARD.seq([...s, "?"], { diffs: [d, d, d, null] }) },
          { t: `Siempre aumenta <b>${d}</b>. Entonces al último (${s[3]}) le sumamos ${d}.`, b: BOARD.jumps(s[3], [d], { pad: 2 }) },
          { t: `${s[3]} + ${d} = <b>${ans}</b>.`, b: BOARD.seq([...s, ans], { diffs: [d, d, d, d], hl: 4 }) }
        ],
        err: w => w === ans - d + 1 || w === ans - 1 || w === ans + 1 ? `Revisa la regla: va de ${d} en ${d}.` : "" }; },
  ],
  [
    () => { const d = pick([5, 10, -2, 3, -3]), a = d < 0 ? between(20, 30) : between(0, 10), s = [0, 1, 2, 3].map(i => a + d * i), h = between(1, 2), ans = s[h];
      return { prompt: "¿Qué número <b>falta</b>?", say: "¿Qué número falta en la secuencia?", scene: seqTxt(s.map((x, i) => i === h ? "⬜" : x)), ans, opts: numOpts(ans, [ans + 1, ans - 1, ans + Math.abs(d)], 0), why: `La regla es ${d > 0 ? "+" : "−"}${Math.abs(d)}: falta ${ans}.`, hint: "Mira los números que están juntos.",
        steps: T => { const vis = s.map((x, i) => i === h ? "⬜" : x), j = h === 1 ? 2 : 0, j2 = h === 1 ? 3 : 1;
          return [
            { t: `Buscamos la regla con dos números que estén <b>juntos</b>: de ${s[j]} a ${s[j2]} ${d > 0 ? "aumenta" : "disminuye"} <b>${Math.abs(d)}</b>.`, b: BOARD.seq(vis, { diffs: vis.slice(1).map((x, i) => (vis[i] === "⬜" || x === "⬜") ? null : d) }) },
            { t: `Aplicamos la regla al número de antes del espacio: ${s[h - 1]} ${d > 0 ? "+" : "−"} ${Math.abs(d)} = <b>${ans}</b>.` },
            { t: `Comprobamos: ${ans} ${d > 0 ? "+" : "−"} ${Math.abs(d)} = ${s[h + 1]}. ✅ Falta el <b>${ans}</b>.`, b: BOARD.seq(s, { diffs: [d, d, d], hl: h }) }
          ]; } }; },
    () => { const d = pick([9, 8, 11, 7]), a = between(10, 20), s = [0, 1, 2, 3, 4].map(i => a + d * i), ans = a + 5 * d;
      return { prompt: "¿Qué número falta en el último vagón del trencito?", say: "¿Qué número falta en el trencito?", scene: `<div class="line small">🚂${s.map(x => `<span class="card-op">${x}</span>`).join("")}<span class="card-op">?</span></div>`, ans, opts: numOpts(ans, [ans + 1, ans - 1, ans + 10], 0), why: `Van de ${d} en ${d}: ${s[4]} + ${d} = ${ans}.`, hint: "Resta dos vagones seguidos para descubrir el salto.",
        steps: T => [
          { t: `Restamos dos vagones seguidos para descubrir el salto: ${s[1]} − ${s[0]} = <b>${d}</b>.`, b: BOARD.seq([...s, "?"], { diffs: [d, d, d, d, null] }) },
          { t: `Todos los vagones van de ${d} en ${d}. Al último (${s[4]}) le sumamos ${d}:`, b: BOARD.lines([`${s[4]} + ${d} = ${ans}`]) },
          { t: `El último vagón es <b>${ans}</b>.` }
        ] }; },
  ],
  [
    () => { const a = between(1, 3), d = 2, s = [a, a + 2, a + 4, a + 6, a + 8, a + 10], h = [0, 3], ans = s[0] + s[3];
      return { prompt: "En la sucesión, halla la <b>suma</b> de los números que faltan.", say: "Halla la suma de los dos números que faltan.", scene: seqTxt(s.map((x, i) => h.includes(i) ? "⬜" : x)), ans, opts: numOpts(ans, [s[0], s[3], ans + 2], 0), why: `Faltan ${s[0]} y ${s[3]}: ${s[0]} + ${s[3]} = ${ans}.`, hint: "Primero descubre la regla y los números que faltan.",
        steps: T => [
          { t: `Primero la regla: ${s[1]} → ${s[2]} aumenta 2. Van de <b>2 en 2</b>.`, b: BOARD.seq(s.map((x, i) => h.includes(i) ? "⬜" : x), { diffs: [null, 2, null, null, 2] }) },
          { t: `El primero es ${s[1]} − 2 = <b>${s[0]}</b>. El cuarto es ${s[2]} + 2 = <b>${s[3]}</b>.`, b: BOARD.seq(s, { diffs: [2, 2, 2, 2, 2] }) },
          { t: `Sumamos los que faltaban: ${s[0]} + ${s[3]} = <b>${ans}</b>.`, bAdd: BOARD.lines([`${s[0]} + ${s[3]} = ${ans}`]) }
        ],
        err: w => w === s[0] || w === s[3] ? "Ese es solo uno de los que faltan; piden la suma de los dos." : "" }; },
    () => { const k = between(4, 6), s = Array.from({ length: k }, (_, i) => (i + 1) * (i + 1)), ans = (k + 1) * (k + 1);
      return { prompt: "Halla el número que continúa:", say: s.join(", ") + ". ¿Qué número continúa?", scene: seqTxt([...s, "?"]), ans, opts: numOpts(ans, [s[k - 1] + (s[k - 1] - s[k - 2]), ans + 1, ans - 1], 0), why: `Los saltos crecen: +3, +5, +7…; ahora toca +${2 * k + 1}: ${ans}.`, hint: "Mira cuánto suma cada vez: ¿siempre igual?",
        steps: T => [
          { t: `Miramos los saltos: ¡no son iguales! Van creciendo: +3, +5, +7…`, b: BOARD.seq([...s, "?"], { diffs: [...s.slice(1).map((x, i) => x - s[i]), null] }) },
          { t: `Los saltos son los números impares. Ahora toca <b>+${2 * k + 1}</b>: ${s[k - 1]} + ${2 * k + 1} = ${ans}.` },
          { t: `Además: 1 = 1×1, 4 = 2×2, 9 = 3×3… ¡son números «cuadrados»! ${k + 1} × ${k + 1} = <b>${ans}</b>.`, b: BOARD.seq([...s, ans], { diffs: [...s.slice(1).map((x, i) => x - s[i]), 2 * k + 1], hl: k }) }
        ],
        err: w => w === s[k - 1] + (s[k - 1] - s[k - 2]) ? "Repetiste el último salto, pero los saltos crecen de 2 en 2." : "" }; },
  ]
];
lesson({ n: 36, title: "Secuencias numéricas", short: "Secuencias", char: "tito", music: "electro", deco: ["🔢", "➡️", "🚂", "✨"],
  hello: "¡Bip bup! Soy <b>Tito</b> 🤖. Las <b>secuencias</b> siguen una regla. ¡Descúbrela y sabrás qué número sigue!",
  levels: LEVELS3(["¿Qué sigue?", "De 1 en 1 y de 2 en 2"], ["¿Qué falta?", "Saltos de 3, 5, 9, 10…"], ["", "Sumas de faltantes y saltos que crecen"]) }, GEN);
