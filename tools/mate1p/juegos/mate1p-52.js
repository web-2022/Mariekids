/* Tema 52 · Derecha, izquierda, arriba, abajo, dentro y fuera · Pipo */
const O = ["🍎", "🐶", "⚽", "🚗", "🌸", "🐱", "🎈", "🍌", "🐸", "⭐"];
const GEN = [
  [
    () => { const r = sample(O, 5), i = between(1, 3), der = rnd(2) === 0, ans = r[der ? i + 1 : i - 1];
      return { prompt: `¿Qué hay a la <b>${der ? "derecha 👉" : "izquierda 👈"}</b> de ${r[i]}?`, say: `¿Qué hay a la ${der ? "derecha" : "izquierda"} de este dibujo?`, scene: line(r), ans, opts: shuffle([ans, ...sample(r.filter(x => x !== ans && x !== r[i]), 3)]), cols: 4, why: `Justo a la ${der ? "derecha" : "izquierda"} está ${ans}.`, hint: "👈 izquierda · derecha 👉 (mirando la pantalla)." }; },
  ],
  [
    () => { const g = sample(O, 9), r = rnd(3), c = rnd(3), t = pick(["arriba", "abajo", "izq", "der"]); let rr = r, cc = c; if (t === "arriba") rr = r === 0 ? 1 : r - 1; if (t === "abajo") rr = r === 2 ? 1 : r + 1; if (t === "izq") cc = c === 0 ? 1 : c - 1; if (t === "der") cc = c === 2 ? 1 : c + 1;
      const ref = g[r * 3 + c], ans = g[rr * 3 + cc], dir = rr < r ? "arriba de" : rr > r ? "debajo de" : cc < c ? "a la izquierda de" : "a la derecha de";
      return { prompt: `¿Qué está <b>${dir}</b> ${ref}?`, say: `¿Qué está ${dir} este dibujo?`, scene: `<div style="display:inline-grid;grid-template-columns:repeat(3,56px);gap:4px">${g.map(x => `<span style="font-size:34px;background:#fff;border:2px solid #cbd5e1;border-radius:10px;text-align:center">${x}</span>`).join("")}</div>`,
        ans, opts: shuffle([ans, ...sample(g.filter(x => x !== ans && x !== ref), 3)]), cols: 4, why: `${ans} está ${dir} ${ref}.`, hint: "Busca primero el dibujo y luego mira a su alrededor." }; },
  ],
  [
    () => { const L = between(2, 5), R = between(2, 5), kid0 = pick(["tito", "lula", "kiki"]), ans = L;
      return { prompt: `¿Cuántas naranjas tiene ${NAME(kid0)} a <b>su</b> derecha? (${NAME(kid0)} nos mira de frente)`, say: `¿Cuántas naranjas tiene ${NAME(kid0)} a su derecha? Nos está mirando de frente.`, scene: `<div class="sides"><div class="side">${em("🍊", L).join("")}</div>${kid(kid0)}<div class="side">${em("🍊", R).join("")}</div></div>`, ans, opts: numOpts(ans, [R, L + R, ans + 1].filter(x => x !== ans), 0),
        why: `Si nos mira de frente, SU derecha es NUESTRA izquierda: ${L} naranjas.`, hint: "Ponte en su lugar: levanta tu mano derecha como si miraras hacia ti." }; },
    () => { const a = between(2, 6), b = between(1, 5), e = pick(["⚽", "🍎", "⭐"]), inQ = rnd(2) === 0, ans = inQ ? a : b;
      return { prompt: `¿Cuántos ${e} están <b>${inQ ? "dentro" : "fuera"}</b> de la caja?`, say: `¿Cuántos están ${inQ ? "dentro" : "fuera"} de la caja?`, scene: `<div class="line"><span class="box" style="--bc:3">${em(e, a).join("")}</span>${em(e, b).join("")}</div>`, ans, opts: numOpts(ans, [inQ ? b : a, a + b, ans + 1], 0), why: `${inQ ? "Dentro" : "Fuera"} hay ${ans}.`, hint: "La caja es el recuadro marrón." }; },
  ]
];
lesson({ n: 52, title: "Derecha, izquierda, arriba, abajo, dentro y fuera", short: "Ubicación", char: "pipo", music: "calma", deco: ["👈", "👉", "⬆️", "⬇️"],
  hello: "¡Hola! Soy <b>Pipo</b> 🐧. ¿Derecha o izquierda? ¿Arriba o abajo? ¿Dentro o fuera? ¡Vamos a ubicarnos!",
  levels: LEVELS3(["Derecha e izquierda", "En una fila"], ["En un tablero", "Arriba, abajo y a los lados"], ["", "SU derecha y dentro/fuera"]) }, GEN);
