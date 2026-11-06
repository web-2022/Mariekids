/* Tema 41 · Figura o número que continúa · Mika */
const tri = (top, l, r) => `<div style="display:inline-flex;flex-direction:column;align-items:center;margin:0 6px"><span class="card-op" style="border-radius:50%">${top}</span><span style="font-size:22px">🛸</span><span style="display:flex;gap:26px;font:900 18px sans-serif">${l}<span>${r}</span></span></div>`;
const GEN = [
  [
    () => { const e = pick(["🔺", "⭐", "🟦", "❤️"]), n = between(1, 3), ans = n + 3;
      return { prompt: "¿Cuántas figuras tendrá la siguiente?", say: "¿Cuántas figuras tendrá la siguiente?", scene: line([n, n + 1, n + 2].map(k => `<span style="border:2px solid #cbd5e1;border-radius:8px;padding:2px 4px;font-size:18px">${e.repeat(k)}</span>`)), ans, opts: numOpts(ans, [ans + 1, ans - 1, n + 2], 1), why: `Aumenta 1 cada vez: ${ans}.`, hint: "Cuenta cuántas hay en cada cuadro." }; },
  ],
  [
    () => { const k = between(1, 2), bars = [1, 2, 3, 4].map(i => i * k), ans = 5 * k;
      return { prompt: "¿Qué figura continúa? (¿cuántas bolitas tendrá?)", say: "¿Cuántas bolitas tendrá la figura que continúa?", scene: line(bars.map(b => `<span style="border:2px solid #cbd5e1;border-radius:8px;padding:2px 4px;font-size:14px">${"🔵".repeat(b)}</span>`)), ans, opts: numOpts(ans, [ans + 1, ans - 1, ans + k], 1), why: `Aumenta ${k} cada vez.`, hint: "¿Cuántas aumenta de una figura a la siguiente?" }; },
  ],
  [
    () => { const ps = Array.from({ length: 3 }, () => [between(5, 15), between(5, 15)]), ans = ps[2][0] + ps[2][1];
      return { prompt: "¿Cuál es el número que falta?", say: "Descubre la regla de los platillos y halla el número que falta.", scene: `<div class="line">${ps.map((p, i) => tri(i < 2 ? p[0] + p[1] : "?", p[0], p[1])).join("")}</div>`, ans, opts: numOpts(ans, [ans + 1, ans - 1, Math.abs(ps[2][0] - ps[2][1])], 0),
        why: `Arriba va la suma de abajo: ${ps[2][0]} + ${ps[2][1]} = ${ans}.`, hint: "Compara el número de arriba con los dos de abajo." }; },
    () => { const ps = Array.from({ length: 3 }, () => { const a = between(2, 9), b = between(2, 9); return [a, b]; }), op = pick(["+", "×2"]), f = p => op === "+" ? p[0] + p[1] + 1 : 2 * (p[0] + p[1]), ans = f(ps[2]);
      return { prompt: "Halla el número que falta:", say: "Descubre la regla y halla el número que falta.", scene: `<div class="line">${ps.map((p, i) => tri(i < 2 ? f(p) : "?", p[0], p[1])).join("")}</div>`, ans, opts: numOpts(ans, [ps[2][0] + ps[2][1], ans + 1, ans - 2], 0),
        why: op === "+" ? `Arriba = suma de abajo + 1: ${ans}.` : `Arriba = el doble de la suma de abajo: ${ans}.`, hint: "Prueba sumando los de abajo y compara con el de arriba." }; },
  ]
];
lesson({ n: 41, title: "Figura o número que continúa", short: "¿Qué continúa?", char: "mika", music: "misterio", deco: ["🔮", "🛸", "🔺", "❓"],
  hello: "¡Hola! Soy <b>Mika</b> 🦉. Busca la <b>regla secreta</b> y descubre qué figura o número continúa.",
  levels: LEVELS3(["Figuras que crecen", "¿Cuántas tendrá?"], ["Más figuras", "Aumentos de 1 y de 2"], ["", "Platillos con números"]) }, GEN);
