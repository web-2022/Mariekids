/* Tema 39 · Patrones de suma y resta · Coco */
const GEN = [
  [
    () => { const d = pick([2, 3, 4, 5, -1, -2]), a = d < 0 ? between(15, 25) : between(1, 10), s = [0, 1, 2, 3].map(i => a + d * i), ans = (d > 0 ? "+" : "−") + Math.abs(d);
      const opts = [...new Set([ans, (d > 0 ? "−" : "+") + Math.abs(d), (d > 0 ? "+" : "−") + (Math.abs(d) + 1), (d > 0 ? "+" : "−") + Math.max(1, Math.abs(d) - 1 || 2)])];
      return { prompt: "¿Cuál es la <b>regla</b> del patrón?", say: s.join(", ") + ". ¿Cuál es la regla?", scene: `<div class="seq">${s.join(" → ")}</div>`, ans, opts: shuffle(opts.length >= 3 ? opts : [...opts, "+10"]), cols: 4, why: `Cada número ${d > 0 ? "suma" : "resta"} ${Math.abs(d)}.`, hint: "Resta dos números seguidos." }; },
  ],
  [
    () => { const u = pick([3, 4, 5]), dn = pick([1, 2]), a = between(2, 10), s = [a]; for (let i = 1; i < 6; i++) s.push(s[i - 1] + (i % 2 ? u : -dn)); const ans = s.pop();
      return { prompt: "El patrón sube y baja. ¿Qué número sigue?", say: s.join(", ") + ". ¿Qué número sigue?", scene: `<div class="seq">${s.join(" ; ")} ; ?</div>`, ans, opts: numOpts(ans, [s[4] + u, s[4] - dn, ans + 1].filter(x => x !== ans), 0), why: `La regla es +${u}, −${dn}, +${u}, −${dn}…: sigue ${ans}.`, hint: "Mira los saltos: uno sube y el otro baja." }; },
  ],
  [
    () => { const st = between(2, 6), d = between(3, 6), m = [st, st + d, st + 2 * d], ans = d;
      return { prompt: "Observa los saltos de la rana. ¿Cuántos metros avanza en <b>cada salto</b>?", say: "¿Cuántos metros avanza la rana en cada salto?", scene: `<div class="line small">${m.map(x => `🐸<sub style="font:900 14px sans-serif">${x} m</sub>`).join(" ⤼ ")}</div>`, ans, opts: numOpts(ans, [m[2], m[1], ans + 1], 1), why: `${m[1]} − ${m[0]} = ${d} y ${m[2]} − ${m[1]} = ${d}.`, hint: "Resta las distancias de dos saltos seguidos." }; },
    () => { const x = between(20, 30), ops = [pick([5, 8, 11]), -pick([4, 6, 9]), pick([3, 6]), -pick([2, 5]), pick([4, 7])], r = ops.reduce((a, b) => a + b, x);
      return { prompt: "Completa y descubre el valor de la ⚽:", say: "Haz las operaciones en orden y descubre el valor de la pelota.", scene: `<div class="seq" style="font-size:20px">${x} ${ops.map(o => (o > 0 ? "+" : "−") + Math.abs(o)).map(o => `<span class="card-op">${o}</span>`).join(" ")} → ⚽</div>`, ans: r, opts: numOpts(r, [r + 2, r - 2, x], 0),
        why: `${x}${ops.map(o => (o > 0 ? " + " : " − ") + Math.abs(o)).join("")} = ${r}.`, hint: "Ve de casilla en casilla, una operación a la vez." }; },
  ]
];
lesson({ n: 39, title: "Patrones de suma y resta", short: "Patrones + −", char: "coco", music: "funk", deco: ["➕", "➖", "🐸", "⚽"],
  hello: "¡Hola! Soy <b>Coco</b> 🐵. Un <b>patrón</b> es una regla que se repite: sumar, restar… ¡descúbrela!",
  levels: LEVELS3(["¿Cuál es la regla?", "+2, +3, −1…"], ["Sube y baja", "Patrones alternados"], ["", "Saltos de rana y caminos"]) }, GEN);
