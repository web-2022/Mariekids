/* Tema 10 · Rapidez mental · Tito 🤖 · música: electro pop */
const { pick, shuffle, sample, rnd } = MKU;
const EMO = ["🍎", "⭐", "🐟", "🎈", "🌸", "⚽", "🐥", "🍓", "🧁", "🚗"];
const SIM = [["🍎", "🍏"], ["⭐", "🌟"], ["🐟", "🐠"], ["🌸", "🌺"], ["🚗", "🚙"], ["🐶", "🐺"], ["🍊", "🍋"], ["😀", "😃"]];
const TIME = [7, 6, 5];

function gen(level, idx) {
  const type = ["mayor", "mas", "igual", "distinto"][idx % 4];
  if (type === "mayor") {
    const max = [10, 20, 99][level], min = level === 2 ? 10 : 1;
    let a = min + rnd(max - min + 1), b; do { b = min + rnd(max - min + 1); } while (b === a || (level === 0 && Math.abs(a - b) < 2));
    const opts = level === 2 ? (() => { let c; do { c = min + rnd(max - min + 1); } while (c === a || c === b); return [a, b, c]; })() : [a, b];
    return { type, opts, ans: Math.max(...opts) };
  }
  if (type === "mas") {
    const e = pick(EMO), gap = [3, 2, 1][level];
    const a = 2 + rnd([5, 7, 9][level]); const b = Math.random() < .5 ? a + gap + rnd(2) : Math.max(1, a - gap - rnd(2));
    const groups = [a, b]; return { type, e, groups, opts: [0, 1], ans: groups[0] > groups[1] ? 0 : 1 };
  }
  if (type === "igual") {
    const len = [2, 3, 4][level]; const A = sample(EMO, len);
    const same = Math.random() < .5; let B = A.slice();
    if (!same) {
      if (level === 0 || Math.random() < .5) { const i = rnd(len); B[i] = pick(EMO.filter(x => !A.includes(x))); }
      else { const i = rnd(len - 1); [B[i], B[i + 1]] = [B[i + 1], B[i]]; }   // mismo dibujo, otro orden
    }
    return { type, A, B, opts: ["sí", "no"], ans: same ? "sí" : "no" };
  }
  const n = [6, 9, 12][level];
  const [e, odd] = level === 0 ? [pick(EMO), null] : pick(SIM);
  const other = odd || pick(EMO.filter(x => x !== e));
  const at = rnd(n); const items = Array.from({ length: n }, (_, i) => i === at ? other : e);
  return { type: "distinto", items, ans: at, other };
}

MKGame({
  slug: "EM-RapidezMental", title: "Rapidez mental", short: "Rapidez", char: "tito", music: "music-electro.mp3",
  theme: { bg: "linear-gradient(135deg,#0f172a,#1e40af 45%,#7c3aed 75%,#db2777)", a1: "#22d3ee", a2: "#a855f7", ink: "#1e1b4b", title: "#4f46e5", soft: "#e0e7ff", tile: "#eef2ff" },
  deco: ["⚡", "✦", "⚡", "✦"],
  hello: "¡Bip! Soy <b>Tito</b> 🤖 y soy rapidísimo. ¿Puedes pensar tan rápido como yo? ⚡",
  intro: ["Responde antes de que se acabe la barra de tiempo. ¡Piensa rápido, pero piensa bien!"],
  champion: "¡Eres más rápido que un robot! ⚡",
  levels: [
    { title: "Calentando motores", icon: "🚦", desc: "7 segundos por pregunta" },
    { title: "Turbo", icon: "🏎️", desc: "6 segundos · más difícil" },
    { title: "Súper sónico", icon: "⚡", desc: "5 segundos · números grandes" }
  ],
  check(n) {
    const bad = [];
    for (let L = 0; L < 3; L++) for (let k = 0; k < n; k++) {
      const q = gen(L, k);
      if (q.type === "mayor" && (new Set(q.opts).size !== q.opts.length || q.opts.filter(x => x === q.ans).length !== 1)) bad.push("mayor no único");
      if (q.type === "mas" && q.groups[0] === q.groups[1]) bad.push("grupos iguales");
      if (q.type === "igual" && (q.A.join() === q.B.join()) !== (q.ans === "sí")) bad.push("igual mal");
      if (q.type === "distinto" && q.items.filter(x => x === q.other).length !== 1) bad.push("distinto no único");
    }
    return [...new Set(bad)];
  },
  round(level, idx, ui) {
    const q = gen(level, idx);
    const secs = TIME[level];
    let why, sayWhy;
    if (q.type === "mayor") {
      ui.prompt("¿Cuál número es <b>más grande</b>?", "¿Cuál es más grande?");
      why = `El ${q.ans} es el más grande.`;
      ui.choices(q.opts, { cls: "num", correct: o => o === q.ans, why, hint: "El más grande es el que viene después al contar." });
    } else if (q.type === "mas") {
      ui.prompt(`¿Dónde hay <b>más</b> ${q.e}?`, "¿Dónde hay más?");
      why = `Hay ${Math.max(...q.groups)} en un lado y ${Math.min(...q.groups)} en el otro.`;
      ui.choices(q.opts, { cols: 2, cls: "rm-group", render: i => `<span class="emoji">${q.e.repeat(q.groups[i])}</span>`, correct: i => i === q.ans, why, hint: "Cuenta rápido o mira cuál lado está más lleno." });
    } else if (q.type === "igual") {
      const st = document.createElement("div"); st.className = "stage rm-pair emoji"; st.innerHTML = `<div>${q.A.join(" ")}</div><div>${q.B.join(" ")}</div>`;
      ui.area.appendChild(st);
      ui.prompt("¿Las dos filas son <b>iguales</b>?", "¿Las dos filas son iguales?");
      why = q.ans === "sí" ? "¡Sí! Tienen los mismos dibujos en el mismo orden." : "No. Mira bien: algo cambió de dibujo o de lugar.";
      ui.choices(q.opts, { cols: 2, cls: "txt", render: o => o === "sí" ? "✅ Sí, iguales" : "❌ No, diferentes", correct: o => o === q.ans, why, hint: "Compara uno por uno, en el mismo orden." });
    } else {
      ui.prompt("¡Toca el que es <b>diferente</b>!", "Toca el que es diferente.");
      why = `El diferente era ${q.other}.`;
      ui.choices(q.items, { cols: q.items.length > 9 ? 4 : 3, cls: "rm-cell", correct: (o, i) => i === q.ans, why, hint: "Mira fila por fila, despacio pero sin parar." });
    }
    ui.timer(secs, () => {
      document.querySelectorAll(".choice").forEach(b => b.disabled = true);
      ui.lose("Se acabó el tiempo. " + why);
    });
  }
});
