/* Tema 23 · Rotación de figuras · Tito 🤖 · música: espacial */
const { pick, shuffle, rnd } = MKU;
const COLORS = ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b", "#a855f7", "#ec4899"];

// Figuras de cuadritos sin simetría (todas sus vueltas y su espejo son distintos)
const rot = cells => cells.map(([x, y]) => [-y, x]);
const mir = cells => cells.map(([x, y]) => [-x, y]);
// norm solo mueve la pieza a la esquina (no cambia el orden: el primer cuadrito lleva el puntito)
const norm = cells => { const mx = Math.min(...cells.map(c => c[0])), my = Math.min(...cells.map(c => c[1])); return cells.map(([x, y]) => [x - mx, y - my]); };
const key = cells => JSON.stringify(norm(cells).slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]));
const turn = (cells, q) => { let c = cells; for (let i = 0; i < q; i++) c = rot(c); return c; };
function randomShape() {
  for (;;) {
    const n = 4 + rnd(2); const cells = [[0, 0]];
    while (cells.length < n) {
      const [x, y] = pick(cells); const [dx, dy] = pick([[1, 0], [-1, 0], [0, 1], [0, -1]]);
      if (!cells.some(c => c[0] === x + dx && c[1] === y + dy)) cells.push([x + dx, y + dy]);
    }
    const all = [0, 1, 2, 3].flatMap(q => [key(turn(cells, q)), key(mir(turn(cells, q)))]);
    if (new Set(all).size === 8) return norm(cells);
  }
}
function draw(cells, color) {
  const c = norm(cells); const w = Math.max(...c.map(p => p[0])) + 1, h = Math.max(...c.map(p => p[1])) + 1, s = Math.max(w, h);
  const ox = (s - w) / 2, oy = (s - h) / 2;
  return `<svg viewBox="-0.15 -0.15 ${s + .3} ${s + .3}" xmlns="http://www.w3.org/2000/svg">${c.map(([x, y], i) =>
    `<rect x="${x + ox + .05}" y="${y + oy + .05}" width=".9" height=".9" rx=".18" fill="${color}"/>${i === 0 ? `<circle cx="${x + ox + .5}" cy="${y + oy + .5}" r=".2" fill="#fff"/>` : ""}`).join("")}</svg>`;
}
const GIRO = { 1: ["un cuarto de vuelta ↻", "un cuarto de vuelta hacia la derecha"], 2: ["media vuelta ↻↻", "media vuelta"], 3: ["tres cuartos de vuelta ↻↻↻", "tres cuartos de vuelta hacia la derecha"] };

function gen(level) {
  const base = randomShape(), color = pick(COLORS);
  const q = level === 0 ? 2 : level === 1 ? 1 : pick([1, 2, 3]);
  const ans = turn(base, q);
  let cand;
  if (level === 0) cand = [ans, base, turn(base, 1)];
  else if (level === 1) cand = [ans, turn(base, 3), turn(base, 2), base];
  else cand = [ans, mir(ans), turn(base, (q + 2) % 4), mir(base)];
  return { base, color, q, ans, opts: shuffle(cand.map(c => norm(c))) };
}

MKGame({
  slug: "EM-RotacionDeFiguras", title: "Rotación de figuras", short: "Rotación", char: "tito", music: "music-espacial.mp3",
  theme: { bg: "radial-gradient(circle at 15% 20%,#fff 0 2px,transparent 3px),radial-gradient(circle at 70% 60%,#fff 0 2px,transparent 3px),radial-gradient(circle at 40% 85%,#fff 0 1.5px,transparent 2.5px),linear-gradient(180deg,#0f172a,#312e81 60%,#5b21b6)", a1: "#818cf8", a2: "#22d3ee", ink: "#1e1b4b", title: "#4f46e5", soft: "#e0e7ff", tile: "#eef2ff" },
  deco: ["🪐", "⭐", "🚀", "✨"],
  hello: "¡Bip! Soy <b>Tito</b> 🤖 y estoy en el espacio. Aquí las piezas <b>giran</b>. ¿Sabes cómo se verán?",
  intro: ["Mira la pieza (el puntito blanco te ayuda a seguirla) e imagina cómo queda <b>después de girar</b>."],
  champion: "¡Eres un astronauta de las formas! 🚀",
  levels: [
    { title: "Media vuelta", icon: "🔄", desc: "Gira la pieza de cabeza" },
    { title: "Un cuarto de vuelta", icon: "↪️", desc: "Gira hacia la derecha" },
    { title: "Giro espacial", icon: "🪐", desc: "Giros distintos · ¡cuidado con el espejo!" }
  ],
  check(n) {
    const bad = [];
    for (let L = 0; L < 3; L++) for (let k = 0; k < n; k++) {
      const q = gen(L);
      const ks = q.opts.map(key);
      if (new Set(ks).size !== ks.length) bad.push("opciones iguales");
      if (ks.filter(x => x === key(q.ans)).length !== 1) bad.push("respuesta no única");
    }
    return [...new Set(bad)];
  },
  round(level, idx, ui) {
    const q = gen(level);
    const st = document.createElement("div"); st.className = "stage rf-stage";
    st.innerHTML = `<div class="rf-fig">${draw(q.base, q.color)}</div><div class="rf-arrow"><span>${["", "↻", "↻↻", "↻↻↻"][q.q]}</span><small>${GIRO[q.q][0].replace(/ ↻+/, "")}</small></div><div class="rf-fig rf-q">?</div>`;
    ui.area.appendChild(st);
    ui.prompt(`Si giramos la pieza <b>${GIRO[q.q][0]}</b>, ¿cómo queda?`, `Si giramos la pieza ${GIRO[q.q][1]}, ¿cómo queda?`);
    ui.choices(q.opts, { cols: q.opts.length === 4 ? 2 : 3, cls: "rf-opt", render: c => draw(c, q.color), correct: c => key(c) === key(q.ans),
      onTap: c => { if (key(c) === key(q.ans)) st.querySelector(".rf-q").innerHTML = draw(q.ans, q.color); },
      why: `¡Así queda después de ${GIRO[q.q][1]}! Sigue el puntito blanco: también giró.`, sayWhy: "¡Así queda! Sigue el puntito blanco.",
      hint: level === 2 ? "Ojo: una opción es como en el espejo, no girada. Sigue el puntito blanco." : "Sigue el puntito blanco: ¿hacia dónde se mueve al girar?" });
  }
});
