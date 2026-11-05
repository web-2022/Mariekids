/* Tema 11 · Pensar antes de mover · Lula 🦙 · música: aventura */
const { pick, shuffle, rnd } = MKU;
const DIRS = { "⬆️": [0, -1], "⬇️": [0, 1], "⬅️": [-1, 0], "➡️": [1, 0] };
const NAME = { "⬆️": "arriba", "⬇️": "abajo", "⬅️": "izquierda", "➡️": "derecha" };
const CFG = [ { n: 4, rocks: 2, min: 3, max: 5, extra: 2 }, { n: 5, rocks: 5, min: 4, max: 7, extra: 1 }, { n: 5, rocks: 7, min: 5, max: 8, extra: 0 } ];
const GOALS = [["🌽", "el choclo"], ["🏠", "su casa"], ["🌷", "la flor"], ["🍎", "la manzana"]];

function bfs(n, rocks, s, g) {
  const key = (x, y) => x + "," + y, prev = { [key(...s)]: null }, q = [s];
  while (q.length) {
    const [x, y] = q.shift();
    if (x === g[0] && y === g[1]) break;
    for (const [d, [dx, dy]] of Object.entries(DIRS)) {
      const nx = x + dx, ny = y + dy, k = key(nx, ny);
      if (nx < 0 || ny < 0 || nx >= n || ny >= n || rocks.has(k) || k in prev) continue;
      prev[k] = [x, y, d]; q.push([nx, ny]);
    }
  }
  if (!(key(...g) in prev)) return null;
  const path = []; let c = g;
  while (prev[key(...c)]) { const [px, py, d] = prev[key(...c)]; path.unshift(d); c = [px, py]; }
  return path;
}
function gen(level) {
  const C = CFG[level];
  for (let t = 0; t < 400; t++) {
    const s = [rnd(C.n), rnd(C.n)], g = [rnd(C.n), rnd(C.n)];
    if (s[0] === g[0] && s[1] === g[1]) continue;
    const rocks = new Set();
    while (rocks.size < C.rocks) { const r = [rnd(C.n), rnd(C.n)]; if ((r[0] !== s[0] || r[1] !== s[1]) && (r[0] !== g[0] || r[1] !== g[1])) rocks.add(r.join(",")); }
    const path = bfs(C.n, rocks, s, g);
    if (path && path.length >= C.min && path.length <= C.max) return { n: C.n, s, g, rocks, path, limit: path.length + C.extra, goal: pick(GOALS) };
  }
  return gen(level);
}
function simulate(q, plan) {
  let [x, y] = q.s; const trail = [];
  for (const d of plan) {
    const [dx, dy] = DIRS[d]; const nx = x + dx, ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= q.n || ny >= q.n) return { trail, stop: "borde" };
    if (q.rocks.has(nx + "," + ny)) return { trail, stop: "roca" };
    x = nx; y = ny; trail.push([x, y]);
    if (x === q.g[0] && y === q.g[1]) return { trail, stop: "meta" };
  }
  return { trail, stop: "corto" };
}

MKGame({
  slug: "EM-PensarAntesDeMover", title: "Pensar antes de mover", short: "Pensar", char: "lula", music: "music-aventura.mp3",
  theme: { bg: "linear-gradient(180deg,#bae6fd,#bbf7d0 55%,#fde68a)", a1: "#16a34a", a2: "#e11d48", ink: "#14532d", title: "#15803d", soft: "#dcfce7", tile: "#f0fdf4" },
  deco: ["⛰️", "🌄", "⛰️", "🌵"],
  hello: "¡Hola! Soy <b>Lula</b> 🦙 de los Andes. ¿Me ayudas a llegar? Primero <b>planea</b> todos los pasos… ¡y luego camino!",
  intro: ["Toca las flechas para armar el camino completo. Cuando estés seguro, toca <b>▶ ¡Vamos!</b>. Esquiva las rocas 🪨."],
  champion: "¡Eres un gran planificador! 🗺️",
  levels: [
    { title: "Primeros pasos", icon: "🐾", desc: "Tablero 4×4 · con pasos de sobra" },
    { title: "Camino con rocas", icon: "🪨", desc: "Tablero 5×5 · más rocas" },
    { title: "Camino perfecto", icon: "🏔️", desc: "Llega con los pasos justos" }
  ],
  check(n) {
    const bad = [];
    for (let L = 0; L < 3; L++) for (let k = 0; k < n; k++) {
      const q = gen(L);
      const r = simulate(q, q.path);
      if (r.stop !== "meta") bad.push("camino de la solución no llega");
      if (q.path.length > q.limit) bad.push("límite menor que la solución");
    }
    return [...new Set(bad)];
  },
  round(level, idx, ui) {
    const q = gen(level);
    let plan = [], busy = false;
    const board = document.createElement("div"); board.className = "stage pm-board"; board.style.setProperty("--n", q.n);
    const cells = [];
    for (let y = 0; y < q.n; y++) for (let x = 0; x < q.n; x++) {
      const c = document.createElement("div"); c.className = "pm-cell emoji";
      if (q.rocks.has(x + "," + y)) c.textContent = "🪨";
      if (x === q.g[0] && y === q.g[1]) { c.textContent = q.goal[0]; c.classList.add("goal"); }
      board.appendChild(c); cells.push(c);
    }
    const lula = document.createElement("div"); lula.className = "pm-lula"; lula.innerHTML = MKChar("lula", "anima");
    board.appendChild(lula);
    const place = (x, y) => { lula.style.left = `calc(${x} * (100% / var(--n)))`; lula.style.top = `calc(${y} * (100% / var(--n)))`; };
    place(...q.s);
    ui.area.appendChild(board);

    const planBox = document.createElement("div"); planBox.className = "pm-plan"; ui.area.appendChild(planBox);
    const pad = document.createElement("div"); pad.className = "pm-pad";
    pad.innerHTML = `<span></span><button data-d="⬆️">⬆️</button><span></span><button data-d="⬅️">⬅️</button><button class="del" aria-label="Borrar">⌫</button><button data-d="➡️">➡️</button><span></span><button data-d="⬇️">⬇️</button><span></span>`;
    ui.area.appendChild(pad);
    const go = document.createElement("button"); go.type = "button"; go.className = "btn"; go.textContent = "▶ ¡Vamos!"; go.style.width = "100%"; go.style.marginTop = "8px";
    ui.area.appendChild(go);

    const drawPlan = () => {
      planBox.innerHTML = plan.length ? plan.map(d => `<span class="emoji">${d}</span>`).join("") : `<small>Tu plan aparecerá aquí</small>`;
      planBox.insertAdjacentHTML("beforeend", `<b>${plan.length}/${q.limit}</b>`);
    };
    drawPlan();
    pad.querySelectorAll("button[data-d]").forEach(b => b.onclick = () => { if (busy || ui.done || plan.length >= q.limit) return; plan.push(b.dataset.d); ui.say(NAME[b.dataset.d]); drawPlan(); });
    pad.querySelector(".del").onclick = () => { if (busy) return; plan.pop(); drawPlan(); };
    ui.prompt(`Lleva a Lula hasta ${q.goal[0]} en <b>${q.limit} pasos o menos</b>.`, `Lleva a Lula hasta ${q.goal[1]} en ${q.limit} pasos o menos. Primero arma todo el plan.`);

    function run() {
      if (busy || ui.done) return;
      if (!plan.length) { ui.feedback("Primero toca las flechas para armar tu plan 👆", "hint"); return; }
      busy = true; go.disabled = true;
      const r = simulate(q, plan); let i = 0;
      cells.forEach(c => c.classList.remove("trail"));
      const step = () => {
        if (i < r.trail.length) { const [x, y] = r.trail[i]; place(x, y); cells[y * q.n + x].classList.add("trail"); i++; ui.later(step, 380); return; }
        busy = false; go.disabled = false;
        if (r.stop === "meta") { lula.innerHTML = MKChar("lula", "feliz"); ui.win(`¡Lula llegó a ${q.goal[1]} en ${plan.length} pasos! Planear antes de mover funciona.`); return; }
        const why = r.stop === "roca" ? "¡Ups! Hay una roca en el camino." : r.stop === "borde" ? "¡Ups! Lula se salía del tablero." : "Lula no llegó: faltan pasos.";
        ui.later(() => { place(...q.s); cells.forEach(c => c.classList.remove("trail")); }, 700);
        ui.miss(`${why} Empieza así: ${q.path[0]} (${NAME[q.path[0]]}).`, `${why} Empieza yendo hacia ${NAME[q.path[0]]}.`);
      };
      step();
    }
    go.onclick = run;
    const solve = () => { if (busy) { setTimeout(solve, 200); return; } plan = q.path.slice(); drawPlan(); run(); };
    ui.setSolve(solve);
    ui.setMiss(() => { plan = [Object.keys(DIRS).find(d => { const r = simulate(q, [d]); return r.stop !== "meta"; })]; drawPlan(); run(); });
  }
});
