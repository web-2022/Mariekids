/* Tema 37 · Secuencias gráficas y espaciales · Mika */
const SYM = ["🔴", "🔵", "🟡", "🟢", "⭐", "❤️", "🔺", "🟪"];
const ROT = ["⬆️", "➡️", "⬇️", "⬅️"];
const GEN = [
  [
    () => { const unit = sample(SYM, between(2, 3)), seq = Array.from({ length: unit.length * 2 + 1 }, (_, i) => unit[i % unit.length]), ans = seq.pop();
      return { prompt: "¿Qué figura <b>sigue</b>?", say: "¿Qué figura sigue?", scene: line([...seq, "❓"]), ans, opts: shuffle([...new Set([ans, ...unit, ...sample(SYM, 3)])].slice(0, 4).concat().filter((v, i, a) => a.indexOf(v) === i)).slice(0, 4).includes(ans) ? shuffle([ans, ...sample(SYM.filter(x => x !== ans), 3)]) : shuffle([ans, ...sample(SYM.filter(x => x !== ans), 3)]), cols: 4,
        why: `Se repite ${unit.join(" ")}.`, hint: "Busca el grupo que se repite.",
        steps: T => { const its = T.its().slice(0, seq.length);
          return [
            { t: `Buscamos el grupo de figuras que se <b>repite</b>: ${unit.join(" ")}.`, go: T.chunks(its, unit.length, { say: k => "grupo " + k }) },
            { t: `Después de ${unit.join(" ")} ${unit.join(" ")} vuelve a empezar: ${unit[0]}…` },
            { t: `Sigue <b>${ans}</b>.` }
          ]; } }; },
  ],
  [
    () => { const st = rnd(4), dir = pick([1, -1]), seq = Array.from({ length: 5 }, (_, i) => ROT[((st + dir * i) % 4 + 4) % 4]), ans = seq.pop();
      return { prompt: "La flecha gira siempre igual. ¿Cuál <b>sigue</b>?", say: "La flecha gira. ¿Cuál sigue?", scene: line([...seq, "❓"]), ans, opts: ROT, cols: 4, why: `Gira ${dir > 0 ? "como el reloj ↻" : "al revés del reloj ↺"}.`, hint: "Mira hacia dónde gira cada vez.",
        steps: T => [
          { t: `Miramos cómo gira la flecha de una a la siguiente: gira <b>un cuarto de vuelta</b> ${dir > 0 ? "como las agujas del reloj ↻" : "al revés del reloj ↺"}.`, go: T.count(T.its().slice(0, 4), { label: k => k + "", ms: 800 }) },
          { t: `El orden ${dir > 0 ? "↻" : "↺"} es: ${(dir > 0 ? ROT : [...ROT].reverse()).join(" → ")} → y vuelve a empezar.`, b: BOARD.seq(dir > 0 ? ROT : [...ROT].reverse(), { diffs: [null, null, null] }) },
          { t: `Después de ${seq[seq.length - 1]} sigue <b>${ans}</b>.` }
        ] }; },
    () => { const e = pick(["🔵", "⭐", "🟢"]), s = between(1, 2), figs = [1, 2, 3].map(k => s + (k - 1)), ans = s + 3;
      return { prompt: "¿Cuántas figuras tendrá la <b>figura 4</b>?", say: "¿Cuántas figuras tendrá la figura 4?", scene: figs.map((n, i) => `<div class="line small" style="justify-content:flex-start"><b style="min-width:70px;font-size:14px">Fig. ${i + 1}</b>${em(e, n).join("")}</div>`).join(""), ans, opts: numOpts(ans, [ans + 1, ans - 1, ans + 2], 1),
        why: `Cada figura tiene 1 más: la figura 4 tiene ${ans}.`, hint: "¿Cuántas aumenta de una figura a la siguiente?",
        steps: T => [
          { t: `Contamos cuántas hay en cada figura: ${figs.join(", ")}.`, b: BOARD.seq(figs.concat(["?"]), { diffs: [1, 1, null] }) },
          { t: `Cada figura tiene <b>1 más</b> que la anterior.` },
          { t: `Figura 4: ${figs[2]} + 1 = <b>${ans}</b>.`, b: BOARD.seq(figs.concat([ans]), { diffs: [1, 1, 1], hl: 3 }) }
        ] }; },
  ],
  [
    () => { const k = between(5, 7), ans = k * (k + 1) / 2;
      return { prompt: `¿Cuántas bolitas habrá en la <b>figura ${k}</b>?`, say: `¿Cuántas bolitas habrá en la figura ${k}?`, scene: [1, 2, 3, 4].map(f => `<div class="line small" style="justify-content:flex-start;gap:8px"><b style="min-width:58px;font-size:14px">Fig. ${f}</b>${Array.from({ length: f }, (_, i) => `<span style="font-size:14px">${"⚪".repeat(i + 1)}</span>`).join(" ")}</div>`).join(""),
        ans, opts: numOpts(ans, [k, 2 * k, ans - k], 1), why: `Figura ${k}: 1 + 2 + … + ${k} = ${ans}.`, hint: "Cada figura agrega un grupo con una bolita más.",
        steps: T => { const L = Array.from({ length: k }, (_, i) => i + 1), acc = L.map((_, i) => L.slice(0, i + 1).reduce((p, q) => p + q, 0));
          return [
            { t: `Cada figura agrega un grupo con <b>una bolita más</b>: la figura 1 tiene 1, la 2 tiene 1 + 2, la 3 tiene 1 + 2 + 3…`, b: BOARD.seq([1, 3, 6, 10], { diffs: [2, 3, 4] }) },
            { t: `Seguimos el patrón hasta la figura ${k}:`, b: BOARD.seq(acc, { diffs: L.slice(1), hl: k - 1 }) },
            { t: `Figura ${k}: ${L.join(" + ")} = <b>${ans}</b>.` }
          ]; },
        err: w => w === k ? `La figura ${k} no tiene solo ${k}: suma todos los grupos.` : "" }; },
  ]
];
lesson({ n: 37, title: "Secuencias gráficas y espaciales", short: "Secuencias de figuras", char: "mika", music: "kpop", deco: ["🔴", "🔵", "⬆️", "➡️"],
  hello: "¡Hola! Soy <b>Mika</b> 🦉. Las figuras también forman <b>secuencias</b>: se repiten, giran o crecen.",
  levels: LEVELS3(["Figuras que se repiten", "¿Qué sigue?"], ["Giros y figuras que crecen", "Flechas y figura 4"], ["", "¿Cuántas en la figura 6?"]) }, GEN);
