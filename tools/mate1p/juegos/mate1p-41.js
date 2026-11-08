/* Tema 41 · Figura o número que continúa · Mika */
const tri = (top, l, r) => `<div style="display:inline-flex;flex-direction:column;align-items:center;margin:0 6px"><span class="card-op" style="border-radius:50%">${top}</span><span style="font-size:22px">🛸</span><span style="display:flex;gap:26px;font:900 18px sans-serif">${l}<span>${r}</span></span></div>`;
const GEN = [
  [
    () => { const e = pick(["🔺", "⭐", "🟦", "❤️"]), n = between(1, 3), ans = n + 3;
      return { prompt: "¿Cuántas figuras tendrá la siguiente?", say: "¿Cuántas figuras tendrá la siguiente?", scene: line([n, n + 1, n + 2].map(k => `<span style="border:2px solid #cbd5e1;border-radius:8px;padding:2px 4px;font-size:18px">${e.repeat(k)}</span>`)), ans, opts: numOpts(ans, [ans + 1, ans - 1, n + 2], 1), why: `Aumenta 1 cada vez: ${ans}.`, hint: "Cuenta cuántas hay en cada cuadro.",
        steps: T => [
          { t: `Contamos las figuras de cada cuadro: ${n}, ${n + 1}, ${n + 2}.`, b: BOARD.seq([n, n + 1, n + 2, "?"], { diffs: [1, 1, null] }) },
          { t: `Cada cuadro tiene <b>1 más</b> que el anterior.` },
          { t: `La siguiente tendrá ${n + 2} + 1 = <b>${ans}</b>.` }
        ] }; },
  ],
  [
    () => { const k = between(1, 2), bars = [1, 2, 3, 4].map(i => i * k), ans = 5 * k;
      return { prompt: "¿Qué figura continúa? (¿cuántas bolitas tendrá?)", say: "¿Cuántas bolitas tendrá la figura que continúa?", scene: line(bars.map(b => `<span style="border:2px solid #cbd5e1;border-radius:8px;padding:2px 4px;font-size:14px">${"🔵".repeat(b)}</span>`)), ans, opts: numOpts(ans, [ans + 1, ans - 1, ans + k], 1), why: `Aumenta ${k} cada vez.`, hint: "¿Cuántas aumenta de una figura a la siguiente?",
        steps: T => [
          { t: `Contamos las bolitas de cada figura: ${bars.join(", ")}.`, b: BOARD.seq([...bars, "?"], { diffs: [k, k, k, null] }) },
          { t: `Aumenta <b>${k}</b> cada vez.` },
          { t: `La que continúa: ${bars[3]} + ${k} = <b>${ans}</b>.` }
        ] }; },
  ],
  [
    () => { const ps = Array.from({ length: 3 }, () => [between(5, 15), between(5, 15)]), ans = ps[2][0] + ps[2][1];
      return { prompt: "¿Cuál es el número que falta?", say: "Descubre la regla de los platillos y halla el número que falta.", scene: `<div class="line">${ps.map((p, i) => tri(i < 2 ? p[0] + p[1] : "?", p[0], p[1])).join("")}</div>`, ans, opts: numOpts(ans, [ans + 1, ans - 1, Math.abs(ps[2][0] - ps[2][1])], 0),
        why: `Arriba va la suma de abajo: ${ps[2][0]} + ${ps[2][1]} = ${ans}.`, hint: "Compara el número de arriba con los dos de abajo.",
        steps: T => [
          { t: `Buscamos la <b>regla</b> con los platillos completos. Comparamos el número de arriba con los dos de abajo.` },
          { t: `Probamos sumando los de abajo:`, b: BOARD.lines([`${ps[0][0]} + ${ps[0][1]} = ${ps[0][0] + ps[0][1]} ✅`, `${ps[1][0]} + ${ps[1][1]} = ${ps[1][0] + ps[1][1]} ✅`]) },
          { t: `¡Funciona! Arriba va la suma: ${ps[2][0]} + ${ps[2][1]} = <b>${ans}</b>.` }
        ] }; },
    () => { const ps = Array.from({ length: 3 }, () => { const a = between(2, 9), b = between(2, 9); return [a, b]; }), op = pick(["+", "×2"]), f = p => op === "+" ? p[0] + p[1] + 1 : 2 * (p[0] + p[1]), ans = f(ps[2]);
      return { prompt: "Halla el número que falta:", say: "Descubre la regla y halla el número que falta.", scene: `<div class="line">${ps.map((p, i) => tri(i < 2 ? f(p) : "?", p[0], p[1])).join("")}</div>`, ans, opts: numOpts(ans, [ps[2][0] + ps[2][1], ans + 1, ans - 2], 0),
        why: op === "+" ? `Arriba = suma de abajo + 1: ${ans}.` : `Arriba = el doble de la suma de abajo: ${ans}.`, hint: "Prueba sumando los de abajo y compara con el de arriba.",
        steps: T => [
          { t: `Buscamos la regla con los platillos completos. Primero probamos <b>sumando</b> los de abajo:`, b: BOARD.lines(ps.slice(0, 2).map(p => `${p[0]} + ${p[1]} = ${p[0] + p[1]}, arriba hay ${f(p)}`)) },
          { t: op === "+" ? `Arriba siempre hay <b>1 más</b> que la suma. La regla: sumar los de abajo y agregar 1.` : `Arriba siempre hay el <b>doble</b> de la suma. La regla: sumar los de abajo y duplicar.` },
          { t: op === "+" ? `${ps[2][0]} + ${ps[2][1]} = ${ps[2][0] + ps[2][1]}; más 1 = <b>${ans}</b>.` : `${ps[2][0]} + ${ps[2][1]} = ${ps[2][0] + ps[2][1]}; el doble = <b>${ans}</b>.` }
        ],
        err: w => w === ps[2][0] + ps[2][1] ? "Solo sumaste; revisa la regla con los otros platillos." : "" }; },
  ]
];
lesson({ n: 41, title: "Figura o número que continúa", short: "¿Qué continúa?", char: "mika", music: "misterio", deco: ["🔮", "🛸", "🔺", "❓"],
  hello: "¡Hola! Soy <b>Mika</b> 🦉. Busca la <b>regla secreta</b> y descubre qué figura o número continúa.",
  levels: LEVELS3(["Figuras que crecen", "¿Cuántas tendrá?"], ["Más figuras", "Aumentos de 1 y de 2"], ["", "Platillos con números"]) }, GEN);
