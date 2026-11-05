/* Tema 24 · Mapas simples · Lula 🦙 · música: aventura */
const { pick, shuffle, sample, rnd } = MKU;
const DIRS = { "⬆️": [0, -1], "⬇️": [0, 1], "⬅️": [-1, 0], "➡️": [1, 0] };
const NAME = { "⬆️": "arriba", "⬇️": "abajo", "⬅️": "izquierda", "➡️": "derecha" };
const LUGARES = [["🏠", "la casa"], ["🌳", "el árbol"], ["🌽", "el maizal"], ["🏫", "el colegio"], ["⛲", "la pileta"], ["🐄", "la vaca"], ["🌻", "el girasol"], ["⛺", "la carpa"], ["🏔️", "la montaña"]];
const CFG = [{ n: 4, steps: [2, 3], marks: 4 }, { n: 5, steps: [3, 5], marks: 5 }, { n: 5, steps: [3, 5], marks: 5 }];

function walk(n, s, plan) {
  let [x, y] = s; const trail = [];
  for (const d of plan) { const [dx, dy] = DIRS[d]; x += dx; y += dy; if (x < 0 || y < 0 || x >= n || y >= n) return null; trail.push([x, y]); }
  return trail;
}
function randomPlan(n, s, len) {
  for (let t = 0; t < 200; t++) {
    const plan = Array.from({ length: len }, () => pick(Object.keys(DIRS)));
    if (plan.some((d, i) => i && DIRS[d][0] === -DIRS[plan[i - 1]][0] && DIRS[d][1] === -DIRS[plan[i - 1]][1])) continue;   // sin ir y volver
    const tr = walk(n, s, plan); if (tr) { const [ex, ey] = tr[tr.length - 1]; if (ex !== s[0] || ey !== s[1]) return { plan, end: [ex, ey] }; }
  }
  return null;
}
function gen(level) {
  const C = CFG[level];
  for (;;) {
    const s = [rnd(C.n), rnd(C.n)];
    const len = C.steps[0] + rnd(C.steps[1] - C.steps[0] + 1);
    const P = randomPlan(C.n, s, len); if (!P) continue;
    const marks = sample(LUGARES, C.marks);
    const spots = shuffle([...Array(C.n * C.n).keys()].filter(k => k !== s[1] * C.n + s[0] && k !== P.end[1] * C.n + P.end[0])).slice(0, C.marks - 1);
    const place = [{ at: P.end, m: marks[0] }, ...spots.map((k, i) => ({ at: [k % C.n, Math.floor(k / C.n)], m: marks[i + 1] }))];
    if (level < 2) return { type: "donde", n: C.n, s, plan: P.plan, end: P.end, place, ans: marks[0], opts: shuffle([marks[0], ...sample(marks.slice(1), 2)]) };
    // nivel 3: elegir el camino que llega al lugar
    const wrong = [];
    for (let t = 0; t < 60 && wrong.length < 2; t++) {
      const W = randomPlan(C.n, s, len + pick([-1, 0, 0, 1])); if (!W) continue;
      if (W.end[0] === P.end[0] && W.end[1] === P.end[1]) continue;
      if (wrong.some(w => w.join() === W.plan.join())) continue;
      wrong.push(W.plan);
    }
    if (wrong.length < 2) continue;
    return { type: "camino", n: C.n, s, plan: P.plan, end: P.end, place, ans: P.plan, target: marks[0], opts: shuffle([P.plan, ...wrong]) };
  }
}

MKGame({
  slug: "EM-MapasSimples", title: "Mapas simples", short: "Mapas", char: "lula", music: "music-aventura.mp3",
  theme: { bg: "linear-gradient(180deg,#bae6fd,#d9f99d 55%,#fde68a)", a1: "#65a30d", a2: "#0284c7", ink: "#1a2e05", title: "#4d7c0f", soft: "#ecfccb", tile: "#f7fee7" },
  deco: ["🗺️", "🧭", "🌄", "🗺️"],
  hello: "¡Hola! Soy <b>Lula</b> 🦙 y tengo un mapa. Sigue las flechas conmigo… ¿a dónde llegaremos?",
  intro: ["Cada flecha es <b>un paso</b>: ⬆️ arriba, ⬇️ abajo, ⬅️ izquierda, ➡️ derecha. ¡Sigue el camino con tu dedo!"],
  champion: "¡Eres un gran explorador! 🧭",
  levels: [
    { title: "Pasitos", icon: "🐾", desc: "Mapa 4×4 · 2 o 3 flechas" },
    { title: "Exploradora", icon: "🧭", desc: "Mapa 5×5 · hasta 5 flechas" },
    { title: "Elige el camino", icon: "🗺️", desc: "¿Qué flechas llevan al lugar?" }
  ],
  check(n) {
    const bad = [];
    for (let L = 0; L < 3; L++) for (let k = 0; k < n; k++) {
      const q = gen(L);
      const tr = walk(q.n, q.s, q.plan); const e = tr[tr.length - 1];
      if (e[0] !== q.end[0] || e[1] !== q.end[1]) bad.push("final no coincide");
      if (q.type === "donde" && (new Set(q.opts.map(o => o[0])).size !== q.opts.length)) bad.push("opciones repetidas");
      if (q.type === "camino") {
        const ok = q.opts.filter(p => { const t = walk(q.n, q.s, p); const f = t[t.length - 1]; return f[0] === q.end[0] && f[1] === q.end[1]; });
        if (ok.length !== 1) bad.push("más de un camino correcto");
      }
      const at = q.place.map(p => p.at.join());
      if (new Set(at).size !== at.length) bad.push("lugares encimados");
    }
    return [...new Set(bad)];
  },
  round(level, idx, ui) {
    const q = gen(level);
    const board = document.createElement("div"); board.className = "stage mp-board"; board.style.setProperty("--n", q.n);
    const cells = [];
    for (let y = 0; y < q.n; y++) for (let x = 0; x < q.n; x++) {
      const c = document.createElement("div"); c.className = "mp-cell emoji";
      const p = q.place.find(p => p.at[0] === x && p.at[1] === y); if (p) c.textContent = p.m[0];
      board.appendChild(c); cells.push(c);
    }
    const lula = document.createElement("div"); lula.className = "mp-lula"; lula.innerHTML = MKChar("lula", "anima"); board.appendChild(lula);
    const place = (x, y) => { lula.style.left = `calc(${x} * (100% / var(--n)))`; lula.style.top = `calc(${y} * (100% / var(--n)))`; };
    place(...q.s);
    ui.area.appendChild(board);
    const animate = plan => { const tr = walk(q.n, q.s, plan); tr.forEach(([x, y], i) => ui.later(() => { place(x, y); cells[y * q.n + x].classList.add("trail"); }, 350 * (i + 1))); };
    const arrows = p => `<span class="mp-arrows emoji">${p.join("")}</span>`;
    if (q.type === "donde") {
      const ins = document.createElement("div"); ins.className = "mp-ins"; ins.innerHTML = "Camino: " + arrows(q.plan); ui.area.appendChild(ins);
      ui.prompt("Sigue las flechas. ¿A dónde llega Lula?", "Sigue las flechas: " + q.plan.map(d => NAME[d]).join(", ") + ". ¿A dónde llega Lula?");
      ui.choices(q.opts, { render: m => `<span class="emoji">${m[0]}</span>`, label: m => m[1], correct: m => m === q.ans,
        onTap: m => { if (m === q.ans) animate(q.plan); },
        why: `¡Lula llegó a ${q.ans[1]}! ${q.ans[0]}`, sayWhy: `Lula llegó a ${q.ans[1]}.`,
        hint: "Pon tu dedo sobre Lula y muévelo una casilla por cada flecha." });
    } else {
      ui.prompt(`¿Qué camino lleva a Lula hasta ${q.target[0]}?`, `¿Qué camino lleva a Lula hasta ${q.target[1]}?`);
      ui.choices(q.opts, { cols: 1, cls: "mp-opt", render: arrows, label: p => p.map(d => NAME[d]).join(", "), correct: p => p === q.ans,
        onTap: p => { if (p === q.ans) animate(q.ans); },
        why: `¡Ese camino lleva a ${q.target[1]}!`, hint: "Prueba cada camino con tu dedo, flecha por flecha." });
    }
  }
});
