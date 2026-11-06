/* Tema 36 · Secuencias numéricas · Tito */
const seqTxt = a => `<div class="seq">${a.join(" ; ")}</div>`;
const GEN = [
  [
    () => { const d = pick([1, 2]), a = between(1, 20), s = [0, 1, 2, 3].map(i => a + d * i), ans = a + 4 * d;
      return { prompt: "¿Qué número <b>sigue</b>?", say: s.join(", ") + ". ¿Qué número sigue?", scene: seqTxt([...s, "?"]), ans, opts: numOpts(ans, [ans + 1, ans - 1, ans + d], 0), why: `Van de ${d} en ${d}: sigue ${ans}.`, hint: "¿Cuánto aumenta cada vez?" }; },
  ],
  [
    () => { const d = pick([5, 10, -2, 3, -3]), a = d < 0 ? between(20, 30) : between(0, 10), s = [0, 1, 2, 3].map(i => a + d * i), h = between(1, 2), ans = s[h];
      return { prompt: "¿Qué número <b>falta</b>?", say: "¿Qué número falta en la secuencia?", scene: seqTxt(s.map((x, i) => i === h ? "⬜" : x)), ans, opts: numOpts(ans, [ans + 1, ans - 1, ans + Math.abs(d)], 0), why: `La regla es ${d > 0 ? "+" : "−"}${Math.abs(d)}: falta ${ans}.`, hint: "Mira los números que están juntos." }; },
    () => { const d = pick([9, 8, 11, 7]), a = between(10, 20), s = [0, 1, 2, 3, 4].map(i => a + d * i), ans = a + 5 * d;
      return { prompt: "¿Qué número falta en el último vagón del trencito?", say: "¿Qué número falta en el trencito?", scene: `<div class="line small">🚂${s.map(x => `<span class="card-op">${x}</span>`).join("")}<span class="card-op">?</span></div>`, ans, opts: numOpts(ans, [ans + 1, ans - 1, ans + 10], 0), why: `Van de ${d} en ${d}: ${s[4]} + ${d} = ${ans}.`, hint: "Resta dos vagones seguidos para descubrir el salto." }; },
  ],
  [
    () => { const a = between(1, 3), d = 2, s = [a, a + 2, a + 4, a + 6, a + 8, a + 10], h = [0, 3], ans = s[0] + s[3];
      return { prompt: "En la sucesión, halla la <b>suma</b> de los números que faltan.", say: "Halla la suma de los dos números que faltan.", scene: seqTxt(s.map((x, i) => h.includes(i) ? "⬜" : x)), ans, opts: numOpts(ans, [s[0], s[3], ans + 2], 0), why: `Faltan ${s[0]} y ${s[3]}: ${s[0]} + ${s[3]} = ${ans}.`, hint: "Primero descubre la regla y los números que faltan." }; },
    () => { const k = between(4, 6), s = Array.from({ length: k }, (_, i) => (i + 1) * (i + 1)), ans = (k + 1) * (k + 1);
      return { prompt: "Halla el número que continúa:", say: s.join(", ") + ". ¿Qué número continúa?", scene: seqTxt([...s, "?"]), ans, opts: numOpts(ans, [s[k - 1] + (s[k - 1] - s[k - 2]), ans + 1, ans - 1], 0), why: `Los saltos crecen: +3, +5, +7…; ahora toca +${2 * k + 1}: ${ans}.`, hint: "Mira cuánto suma cada vez: ¿siempre igual?" }; },
  ]
];
lesson({ n: 36, title: "Secuencias numéricas", short: "Secuencias", char: "tito", music: "electro", deco: ["🔢", "➡️", "🚂", "✨"],
  hello: "¡Bip bup! Soy <b>Tito</b> 🤖. Las <b>secuencias</b> siguen una regla. ¡Descúbrela y sabrás qué número sigue!",
  levels: LEVELS3(["¿Qué sigue?", "De 1 en 1 y de 2 en 2"], ["¿Qué falta?", "Saltos de 3, 5, 9, 10…"], ["", "Sumas de faltantes y saltos que crecen"]) }, GEN);
