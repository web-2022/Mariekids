/* =========================================================
   Matemática 1.º de primaria — ayudas comunes para las lecciones
   (se incluye antes de cada lección; usa MKU del motor)

   Estilo de las preguntas: como los concursos de 1.º grado
   (Auno, LiderMat, Prolog, Tesla…): una pregunta corta,
   un dibujo que hay que observar y 4 alternativas A) B) C) D).
========================================================= */
const B = "../../";                       // raíz del sitio desde 1primary/mate1p/
const HOME = B + "ruta-mate.html";
const { pick, shuffle, sample, rnd } = MKU;
const between = (a, b) => a + rnd(b - a + 1);

/* ---------- Alternativas ---------- */
const LET = "ABCD";
// render para ui.choices: «A) 12»
const abcd = (it, i) => `<span class="lt">${LET[i]})</span> <span class="val">${it}</span>`;
// 4 opciones numéricas distintas con la respuesta; "near" son errores típicos primero
function numOpts(ans, near = [], min = 0) {
  const set = new Set([ans]);
  for (const v of near) { if (set.size >= 4) break; if (Number.isInteger(v) && v >= min && v !== ans) set.add(v); }
  const extra = shuffle([ans + 1, ans - 1, ans + 2, ans - 2, ans + 3, ans - 3, ans + 5, ans + 4]);
  for (const v of extra) { if (set.size >= 4) break; if (v >= min) set.add(v); }
  return [...set].sort((a, b) => a - b);   // como en los exámenes: de menor a mayor
}
// pregunta de opción múltiple con estilo examen
function ask(ui, q) {
  ui.prompt(q.prompt, q.say);
  if (q.scene) { const st = document.createElement("div"); st.className = "stage scene " + (q.sceneCls || ""); st.innerHTML = q.scene; ui.area.appendChild(st); }
  const opts = q.opts;
  ui.choices(opts, {
    cols: q.cols || 2, cls: "exam " + (q.cls || ""), render: q.render || abcd,
    correct: o => (q.eq ? q.eq(o, q.ans) : o === q.ans),
    why: q.why, hint: q.hint
  });
}
function checkQ(q, bad, name) {
  const eq = q.eq || ((a, b) => a === b);
  if (q.opts.filter(o => eq(o, q.ans)).length !== 1) bad.push(name + ": respuesta no única o ausente");
  if (new Set(q.opts.map(String)).size !== q.opts.length) bad.push(name + ": opciones repetidas");
  if (q.opts.length < (q.min || 3)) bad.push(name + ": pocas opciones");
}

/* ---------- Dibujos ---------- */
// objetos repartidos sin encimarse (en una cuadrícula con movimiento)
function scatter(items, o = {}) {
  const cols = o.cols || Math.min(6, Math.max(3, Math.ceil(Math.sqrt(items.length * 1.6))));
  const rows = Math.ceil(items.length * 1.25 / cols) + (o.extraRows || 0);
  const cells = shuffle([...Array(cols * rows).keys()]).slice(0, items.length);
  return `<div class="scat" style="--c:${cols};--r:${rows}">` + items.map((it, i) => {
    const c = cells[i] % cols, r = Math.floor(cells[i] / cols);
    const dx = (rnd(40) - 20) / 100, dy = (rnd(40) - 20) / 100, rot = o.rotate === false ? 0 : rnd(30) - 15;
    return `<span class="it" style="left:${((c + 0.5 + dx) / cols * 100).toFixed(1)}%;top:${((r + 0.5 + dy) / rows * 100).toFixed(1)}%;--rot:${rot}deg">${it}</span>`;
  }).join("") + `</div>`;
}
const line = (items, cls = "") => `<div class="line ${cls}">${items.map(x => `<span class="it">${x}</span>`).join("")}</div>`;
const em = (e, n) => Array(n).fill(e);

// pez dibujado: dir 1 = mira a la derecha, -1 = a la izquierda
function fishSvg(dir, color = "#38bdf8") {
  return `<svg class="fish" viewBox="0 0 60 36" width="54" height="32" style="transform:scaleX(${dir})"><path d="M56 18 Q42 2 22 10 L8 4 L12 18 L8 32 L22 26 Q42 34 56 18Z" fill="${color}" stroke="#0f172a" stroke-width="2.4"/><circle cx="46" cy="15" r="3" fill="#0f172a"/><path d="M36 12 Q32 18 36 24" stroke="#0f172a" stroke-width="2" fill="none"/></svg>`;
}
// dado con puntos
function dieSvg(n, size = 54) {
  const P = { 1: [[2, 2]], 2: [[1, 1], [3, 3]], 3: [[1, 1], [2, 2], [3, 3]], 4: [[1, 1], [3, 1], [1, 3], [3, 3]], 5: [[1, 1], [3, 1], [2, 2], [1, 3], [3, 3]], 6: [[1, 1], [3, 1], [1, 2], [3, 2], [1, 3], [3, 3]] }[n];
  return `<svg class="die" viewBox="0 0 40 40" width="${size}" height="${size}"><rect x="2" y="2" width="36" height="36" rx="8" fill="#fff" stroke="#334155" stroke-width="2.5"/>${P.map(([x, y]) => `<circle cx="${x * 10}" cy="${y * 10}" r="3.6" fill="#0f172a"/>`).join("")}</svg>`;
}
// cuadrícula: painted = Set de índices pintados
function gridSvg(cols, rows, painted = new Set(), o = {}) {
  const s = o.cell || 34, w = cols * s, h = rows * s;
  let out = `<svg class="grid" viewBox="-2 -2 ${w + 4} ${h + 4}" width="${Math.min(300, w + 4)}" style="max-width:100%">`;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const k = r * cols + c;
    out += `<rect x="${c * s}" y="${r * s}" width="${s}" height="${s}" fill="${painted.has(k) ? (o.color || "#38bdf8") : "#fff"}" stroke="#0f172a" stroke-width="2"/>`;
  }
  return out + `</svg>`;
}
// cuadro de diez (ten frame) con n puntos (n ≤ 20 → dos cuadros)
function tenFrame(n) {
  const one = k => `<div class="tf">${Array.from({ length: 10 }, (_, i) => `<span>${i < k ? "🔴" : ""}</span>`).join("")}</div>`;
  return n > 10 ? one(10) + one(n - 10) : one(n);
}
// personaje de los Mentecitos dentro de la escena
const kid = (name, mood = "feliz") => `<span class="kid">${MKChar(name, mood)}</span>`;
const NAME = n => MKChar.names[n];

/* ---------- Final de la lección: enlace al siguiente tema ---------- */
function nextTopic(n) {
  return (level, passed, stars, box) => {
    if (!passed || n > 63) return;
    const href = `mate1p-${String(n).padStart(2, "0")}.html`;
    box.innerHTML = `<a class="btn alt next-topic" href="${href}">➡️ Siguiente tema</a>`;
  };
}

/* ---------- Lección completa con 3 niveles ---------- */
const THEMES = [
  { bg: "linear-gradient(135deg,#bae6fd,#c7d2fe 55%,#fbcfe8)", a1: "#3b82f6", a2: "#8b5cf6", ink: "#1e1b4b", title: "#2563eb", soft: "#e0e7ff", tile: "#f5f3ff" },
  { bg: "linear-gradient(135deg,#fde68a,#fbcfe8 55%,#c4b5fd)", a1: "#f59e0b", a2: "#ec4899", ink: "#4a044e", title: "#db2777", soft: "#fce7f3", tile: "#fff7ed" },
  { bg: "linear-gradient(135deg,#bbf7d0,#a5f3fc 55%,#bfdbfe)", a1: "#10b981", a2: "#0ea5e9", ink: "#064e3b", title: "#059669", soft: "#d1fae5", tile: "#f0fdfa" },
  { bg: "linear-gradient(135deg,#fed7aa,#fecaca 55%,#fde68a)", a1: "#f97316", a2: "#ef4444", ink: "#7c2d12", title: "#ea580c", soft: "#ffedd5", tile: "#fff7ed" },
  { bg: "linear-gradient(135deg,#ddd6fe,#bfdbfe 55%,#a7f3d0)", a1: "#7c3aed", a2: "#2563eb", ink: "#2e1065", title: "#6d28d9", soft: "#ede9fe", tile: "#f5f3ff" },
  { bg: "linear-gradient(135deg,#a7f3d0,#fef08a 55%,#fbcfe8)", a1: "#16a34a", a2: "#ca8a04", ink: "#14532d", title: "#15803d", soft: "#dcfce7", tile: "#f7fee7" }
];
const LEVELS3 = (a, b, c) => [{ title: a[0], icon: "🟢", desc: a[1] }, { title: b[0], icon: "🟡", desc: b[1] }, { title: c[0] || "Reto concurso", icon: "🏆", desc: c[1] }];
function lesson(o, GEN) {
  const n = String(o.n).padStart(2, "0");
  MKGame({
    slug: "mate1p-" + n, title: o.title, short: o.short || o.title, char: o.char || "tito", music: B + "music-" + (o.music || "marimba") + ".mp3", home: HOME,
    theme: o.theme || THEMES[o.n % THEMES.length], deco: o.deco || ["🔢", "➕", "⭐", "✏️"],
    hello: o.hello, intro: [o.intro || "Observa bien el dibujo y elige la respuesta: A, B, C o D."],
    champion: o.champion || "¡Eres un campeón de las matemáticas! 🏆", rounds: o.rounds,
    levels: o.levels,
    check(k) { const bad = []; GEN.forEach((L, i) => L.forEach((g, j) => { for (let t = 0; t < k / 10; t++) { try { checkQ(g(), bad, `N${i + 1}.${j + 1}`); } catch (e) { bad.push(`N${i + 1}.${j + 1}: ${e.message}`); } } })); return [...new Set(bad)]; },
    round(level, idx, ui) { ask(ui, pick(GEN[level])()); },
    onEnd: nextTopic(o.next || o.n + 1)
  });
}

/* ---------- Más dibujos para los temas ---------- */
const svgWrap = (w, h, inner, maxw = 320) => `<svg viewBox="0 0 ${w} ${h}" width="${Math.min(maxw, w)}" style="max-width:100%;height:auto" font-family="Segoe UI, Arial, sans-serif">${inner}</svg>`;
// conjunto con llaves: A = {a; b; c}
const setTxt = (name, items) => `<div class="settxt"><b>${name}</b> = { ${items.join(" ; ")} }</div>`;
// diagrama de Venn: zonas onlyA, both, onlyB, out (listas de texto/emoji)
function venn(o) {
  const place = (list, x0, x1, y0, y1) => { const n = list.length, cols = Math.max(1, Math.ceil(Math.sqrt(n))), rows = Math.ceil(n / cols) || 1;
    return list.map((t, i) => { const c = i % cols, r = Math.floor(i / cols); return `<text x="${(x0 + (x1 - x0) * (c + 0.5) / cols).toFixed(0)}" y="${(y0 + (y1 - y0) * (r + 0.5) / rows + 7).toFixed(0)}" text-anchor="middle" font-size="22" font-weight="800" fill="#0f172a">${t}</text>`; }).join(""); };
  const two = o.onlyB !== undefined;
  let g = `<rect x="2" y="2" width="${two ? 336 : 256}" height="196" rx="10" fill="#f8fafc" stroke="#334155" stroke-width="2"/><text x="14" y="24" font-size="18" font-weight="900" fill="#334155">U</text>`;
  if (two) {
    g += `<ellipse cx="125" cy="105" rx="92" ry="72" fill="rgba(59,130,246,.15)" stroke="#2563eb" stroke-width="3"/><ellipse cx="215" cy="105" rx="92" ry="72" fill="rgba(236,72,153,.15)" stroke="#db2777" stroke-width="3"/>`;
    g += `<text x="58" y="40" font-size="20" font-weight="900" fill="#2563eb">${o.a || "A"}</text><text x="270" y="40" font-size="20" font-weight="900" fill="#db2777">${o.b || "B"}</text>`;
    g += place(o.onlyA, 45, 150, 60, 150) + place(o.both, 150, 190, 60, 150) + place(o.onlyB, 190, 295, 60, 150) + place(o.out || [], 260, 330, 165, 195);
    return svgWrap(340, 200, g);
  }
  g += `<ellipse cx="120" cy="105" rx="95" ry="70" fill="rgba(59,130,246,.15)" stroke="#2563eb" stroke-width="3"/><text x="40" y="45" font-size="20" font-weight="900" fill="#2563eb">${o.a || "A"}</text>`;
  g += place(o.onlyA, 45, 195, 60, 150) + place(o.out || [], 180, 255, 165, 195);
  return svgWrap(260, 200, g);
}
// ábaco: digits de izquierda a derecha, labels por defecto C D U
function abacus(digits, labels) {
  labels = labels || ["C", "D", "U"].slice(3 - digits.length);
  const W = 70 * digits.length + 20;
  let g = `<rect x="6" y="150" width="${W - 12}" height="16" rx="5" fill="#a16207"/>`;
  const col = ["#ef4444", "#3b82f6", "#22c55e"].slice(3 - digits.length);
  digits.forEach((d, i) => { const x = 45 + 70 * i;
    g += `<rect x="${x - 3}" y="14" width="6" height="138" fill="#78350f"/>`;
    for (let k = 0; k < d; k++) g += `<ellipse cx="${x}" cy="${140 - k * 13}" rx="20" ry="7" fill="${col[i]}" stroke="#0f172a" stroke-width="1.5"/>`;
    g += `<text x="${x}" y="190" text-anchor="middle" font-size="20" font-weight="900" fill="#334155">${labels[i]}</text>`; });
  return svgWrap(W, 200, g, 260);
}
// recta numérica: marks = [{v, show:true|false|"emoji"}]
function numberLine(vals, hidden = {}) {
  const n = vals.length, W = 40 + 56 * (n - 1) + 40;
  let g = `<line x1="10" y1="60" x2="${W - 10}" y2="60" stroke="#0f172a" stroke-width="3"/><path d="M${W - 10} 60 l-10 -6 v12z" fill="#0f172a"/>`;
  vals.forEach((v, i) => { const x = 40 + 56 * i; g += `<line x1="${x}" y1="50" x2="${x}" y2="70" stroke="#0f172a" stroke-width="3"/>`;
    g += hidden[i] ? `<text x="${x}" y="40" text-anchor="middle" font-size="26">${hidden[i]}</text>` : `<text x="${x}" y="98" text-anchor="middle" font-size="20" font-weight="800" fill="#1e3a8a">${v}</text>`; });
  return svgWrap(W, 110, g, 340);
}
// pirámide de bloques: rows de arriba hacia abajo; celdas con texto ("" = vacío)
function pyramid(rows, shade = new Set()) {
  const n = rows.length, s = 52, W = s * n + 20;
  let g = "";
  rows.forEach((row, r) => row.forEach((v, c) => { const x = 10 + (n - row.length) * s / 2 + c * s, y = 10 + r * (s - 8);
    g += `<rect x="${x}" y="${y}" width="${s - 4}" height="${s - 12}" rx="6" fill="${shade.has(r + "," + c) ? "#60a5fa" : "#e0f2fe"}" stroke="#0369a1" stroke-width="2"/><text x="${x + (s - 4) / 2}" y="${y + (s - 12) / 2 + 8}" text-anchor="middle" font-size="22" font-weight="900" fill="#0c4a6e">${v}</text>`; }));
  return svgWrap(W, n * (s - 8) + 20, g, 300);
}
// balanza (HTML): left/right son textos (emojis y pesas)
const balance = (L, R, tilt = 0) => `<div class="bal"><div class="beam" style="transform:rotate(${tilt}deg)"><div class="pan">${L}</div><div class="pan">${R}</div></div><div class="foot">▲</div></div>`;
// cubos en perspectiva: heights[fila][col] (fila 0 = atrás)
function isoCubes(H) {
  const s = 34, rows = H.length, cols = H[0].length, t = s * 0.87, h = s * 0.5;
  const P = (x, y, z) => [(x - y) * t, (x + y) * h - z * s];
  const cube = (x, y, z) => { const [a, b] = P(x, y, z);
    return `<path d="M${a} ${b - s} l${t} ${h} l-${t} ${h} l-${t} -${h}z" fill="#bae6fd" stroke="#0f172a" stroke-width="1.8"/><path d="M${a - t} ${b - s + h} l${t} ${h} v${s} l-${t} -${h}z" fill="#7dd3fc" stroke="#0f172a" stroke-width="1.8"/><path d="M${a} ${b - s + 2 * h} l${t} -${h} v${s} l-${t} ${h}z" fill="#38bdf8" stroke="#0f172a" stroke-width="1.8"/>`; };
  const list = [];
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) for (let z = 0; z < H[y][x]; z++) list.push([x, y, z]);
  let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
  list.forEach(([x, y, z]) => { const [a, b] = P(x, y, z); x0 = Math.min(x0, a - t); x1 = Math.max(x1, a + t); y0 = Math.min(y0, b - s); y1 = Math.max(y1, b + s); });
  const g = list.sort((p, q) => (p[0] + p[1]) - (q[0] + q[1]) || p[2] - q[2]).map(c => cube(...c)).join("");
  const W = x1 - x0 + 8, Hh = y1 - y0 + 8;
  return `<svg viewBox="${x0 - 4} ${y0 - 4} ${W} ${Hh}" width="${Math.min(240, W * 1.25)}" style="max-width:100%;height:auto">${g}</svg>`;
}
// plano cartesiano pequeño: marks [{x,y,e}]
function coordGrid(w, h, marks = []) {
  const s = 40, W = (w + 1) * s + 20, Hh = (h + 1) * s + 20, ox = 30, oy = Hh - 30;
  let g = "";
  for (let i = 0; i <= w; i++) g += `<line x1="${ox + i * s}" y1="${oy}" x2="${ox + i * s}" y2="${oy - h * s}" stroke="#94a3b8" stroke-width="1.5"/><text x="${ox + i * s}" y="${oy + 20}" text-anchor="middle" font-size="15" font-weight="800">${i}</text>`;
  for (let j = 0; j <= h; j++) g += `<line x1="${ox}" y1="${oy - j * s}" x2="${ox + w * s}" y2="${oy - j * s}" stroke="#94a3b8" stroke-width="1.5"/><text x="${ox - 14}" y="${oy - j * s + 5}" text-anchor="middle" font-size="15" font-weight="800">${j}</text>`;
  marks.forEach(m => g += `<text x="${ox + m.x * s}" y="${oy - m.y * s + 9}" text-anchor="middle" font-size="26">${m.e}</text>`);
  return svgWrap(W, Hh, g, 320);
}
// gráfico de barras vertical
function barChart(labels, vals, title = "") {
  const max = Math.max(...vals), top = Math.ceil(max / 2) * 2 || 2, n = vals.length, bw = 44, W = 50 + n * (bw + 14), Hh = 230, base = 190, sc = 150 / top;
  const colors = ["#f87171", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa", "#f472b6"];
  let g = title ? `<text x="${W / 2}" y="18" text-anchor="middle" font-size="15" font-weight="900" fill="#334155">${title}</text>` : "";
  for (let v = 0; v <= top; v += top > 10 ? 2 : 1) g += `<line x1="38" y1="${base - v * sc}" x2="${W - 6}" y2="${base - v * sc}" stroke="#e2e8f0"/><text x="30" y="${base - v * sc + 5}" text-anchor="end" font-size="12" font-weight="700">${v}</text>`;
  vals.forEach((v, i) => { const x = 48 + i * (bw + 14); g += `<rect x="${x}" y="${base - v * sc}" width="${bw}" height="${v * sc}" fill="${colors[i % 6]}" stroke="#334155"/><text x="${x + bw / 2}" y="${base + 26}" text-anchor="middle" font-size="22">${labels[i]}</text>`; });
  g += `<line x1="38" y1="${base}" x2="${W - 6}" y2="${base}" stroke="#0f172a" stroke-width="2"/><line x1="38" y1="${base}" x2="38" y2="24" stroke="#0f172a" stroke-width="2"/>`;
  return svgWrap(W, Hh, g, 330);
}
// calendario de un mes: start = día de la semana del 1 (0 = lunes)
function calendar(month, start, days, mark = {}) {
  const D = ["L", "M", "M", "J", "V", "S", "D"], s = 40;
  let g = `<text x="${3.5 * s + 6}" y="20" text-anchor="middle" font-size="17" font-weight="900" fill="#be123c">${month}</text>`;
  D.forEach((d, i) => g += `<text x="${6 + i * s + s / 2}" y="44" text-anchor="middle" font-size="14" font-weight="900" fill="#475569">${d}</text>`);
  for (let k = 1; k <= days; k++) { const p = start + k - 1, c = p % 7, r = Math.floor(p / 7), x = 6 + c * s, y = 52 + r * 34;
    g += `<rect x="${x + 2}" y="${y}" width="${s - 4}" height="30" rx="6" fill="${mark[k] ? "#fde68a" : "#fff"}" stroke="#cbd5e1"/><text x="${x + s / 2}" y="${y + 21}" text-anchor="middle" font-size="15" font-weight="800">${mark[k] || k}</text>`; }
  return svgWrap(7 * s + 12, 52 + 6 * 34, g, 320);
}
// monedas y billetes (soles)
const coin = v => `<span class="coin c${String(v).replace(".", "")}">S/${v}</span>`;
const bill = v => `<span class="bill b${v}">S/ ${v}</span>`;
const money = v => v >= 10 ? bill(v) : coin(v);
// triángulo dividido: m partes en la base (rectas desde el vértice) y h rectas horizontales
function triFan(m, h) {
  const A = [150, 14], L = [20, 200], Rr = [280, 200];
  const lerp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  let g = `<path d="M${A} L${L} L${Rr}Z" fill="#fff" stroke="#0f172a" stroke-width="3"/>`;
  for (let i = 1; i < m; i++) { const b = lerp(L, Rr, i / m); g += `<line x1="${A[0]}" y1="${A[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#0f172a" stroke-width="3"/>`; }
  for (let j = 1; j <= h; j++) { const t = j / (h + 1), p = lerp(A, L, t), q = lerp(A, Rr, t); g += `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="#0f172a" stroke-width="3"/>`; }
  return svgWrap(300, 214, g, 260);
}
// rectángulo dividido en r filas y c columnas (solo líneas)
function rectGrid(r, c) {
  const W = 260, H = 60 * r; let g = `<rect x="10" y="10" width="${W}" height="${H}" fill="#fff" stroke="#0f172a" stroke-width="3"/>`;
  for (let i = 1; i < c; i++) g += `<line x1="${10 + W * i / c}" y1="10" x2="${10 + W * i / c}" y2="${10 + H}" stroke="#0f172a" stroke-width="3"/>`;
  for (let j = 1; j < r; j++) g += `<line x1="10" y1="${10 + H * j / r}" x2="${10 + W}" y2="${10 + H * j / r}" stroke="#0f172a" stroke-width="3"/>`;
  return svgWrap(W + 20, H + 20, g, 280);
}
// cuadrado dividido en n × n cuadraditos (celdas cuadradas)
function squareGrid(n) {
  const S = 180, c = S / n; let g = `<rect x="10" y="10" width="${S}" height="${S}" fill="#fff" stroke="#0f172a" stroke-width="3"/>`;
  for (let i = 1; i < n; i++) g += `<line x1="${10 + c * i}" y1="10" x2="${10 + c * i}" y2="${10 + S}" stroke="#0f172a" stroke-width="3"/><line x1="10" y1="${10 + c * i}" x2="${10 + S}" y2="${10 + c * i}" stroke="#0f172a" stroke-width="3"/>`;
  return svgWrap(S + 20, S + 20, g, 200);
}
// segmento con p puntos
function segPoints(p) {
  const W = 300; let g = `<line x1="20" y1="30" x2="${W - 20}" y2="30" stroke="#0f172a" stroke-width="3"/>`;
  for (let i = 0; i < p; i++) { const x = 20 + (W - 40) * i / (p - 1); g += `<circle cx="${x}" cy="30" r="6" fill="#e11d48"/><text x="${x}" y="60" text-anchor="middle" font-size="16" font-weight="900">${"ABCDEFGH"[i]}</text>`; }
  return svgWrap(W, 70, g, 300);
}
const C2 = n => n * (n - 1) / 2;
