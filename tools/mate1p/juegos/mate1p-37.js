/* Tema 37 · Secuencias gráficas y espaciales · Mika */
const SYM = ["🔴", "🔵", "🟡", "🟢", "⭐", "❤️", "🔺", "🟪"];
const ROT = ["⬆️", "➡️", "⬇️", "⬅️"];
const GEN = [
  [
    () => { const unit = sample(SYM, between(2, 3)), seq = Array.from({ length: unit.length * 2 + 1 }, (_, i) => unit[i % unit.length]), ans = seq.pop();
      return { prompt: "¿Qué figura <b>sigue</b>?", say: "¿Qué figura sigue?", scene: line([...seq, "❓"]), ans, opts: shuffle([...new Set([ans, ...unit, ...sample(SYM, 3)])].slice(0, 4).concat().filter((v, i, a) => a.indexOf(v) === i)).slice(0, 4).includes(ans) ? shuffle([ans, ...sample(SYM.filter(x => x !== ans), 3)]) : shuffle([ans, ...sample(SYM.filter(x => x !== ans), 3)]), cols: 4,
        why: `Se repite ${unit.join(" ")}.`, hint: "Busca el grupo que se repite." }; },
  ],
  [
    () => { const st = rnd(4), dir = pick([1, -1]), seq = Array.from({ length: 5 }, (_, i) => ROT[((st + dir * i) % 4 + 4) % 4]), ans = seq.pop();
      return { prompt: "La flecha gira siempre igual. ¿Cuál <b>sigue</b>?", say: "La flecha gira. ¿Cuál sigue?", scene: line([...seq, "❓"]), ans, opts: ROT, cols: 4, why: `Gira ${dir > 0 ? "como el reloj ↻" : "al revés del reloj ↺"}.`, hint: "Mira hacia dónde gira cada vez." }; },
    () => { const e = pick(["🔵", "⭐", "🟢"]), s = between(1, 2), figs = [1, 2, 3].map(k => s + (k - 1)), ans = s + 3;
      return { prompt: "¿Cuántas figuras tendrá la <b>figura 4</b>?", say: "¿Cuántas figuras tendrá la figura 4?", scene: figs.map((n, i) => `<div class="line small" style="justify-content:flex-start"><b style="min-width:70px;font-size:14px">Fig. ${i + 1}</b>${em(e, n).join("")}</div>`).join(""), ans, opts: numOpts(ans, [ans + 1, ans - 1, ans + 2], 1),
        why: `Cada figura tiene 1 más: la figura 4 tiene ${ans}.`, hint: "¿Cuántas aumenta de una figura a la siguiente?" }; },
  ],
  [
    () => { const k = between(5, 7), ans = k * (k + 1) / 2;
      return { prompt: `¿Cuántas bolitas habrá en la <b>figura ${k}</b>?`, say: `¿Cuántas bolitas habrá en la figura ${k}?`, scene: [1, 2, 3, 4].map(f => `<div class="line small" style="justify-content:flex-start;gap:8px"><b style="min-width:58px;font-size:14px">Fig. ${f}</b>${Array.from({ length: f }, (_, i) => `<span style="font-size:14px">${"⚪".repeat(i + 1)}</span>`).join(" ")}</div>`).join(""),
        ans, opts: numOpts(ans, [k, 2 * k, ans - k], 1), why: `Figura ${k}: 1 + 2 + … + ${k} = ${ans}.`, hint: "Cada figura agrega un grupo con una bolita más." }; },
  ]
];
lesson({ n: 37, title: "Secuencias gráficas y espaciales", short: "Secuencias de figuras", char: "mika", music: "kpop", deco: ["🔴", "🔵", "⬆️", "➡️"],
  hello: "¡Hola! Soy <b>Mika</b> 🦉. Las figuras también forman <b>secuencias</b>: se repiten, giran o crecen.",
  levels: LEVELS3(["Figuras que se repiten", "¿Qué sigue?"], ["Giros y figuras que crecen", "Flechas y figura 4"], ["", "¿Cuántas en la figura 6?"]) }, GEN);
