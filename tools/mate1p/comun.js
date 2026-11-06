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
  if (q.opts.length < 3) bad.push(name + ": pocas opciones");
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
    if (!passed || n > 59) return;
    const href = `mate1p-${String(n).padStart(2, "0")}.html`;
    box.innerHTML = `<a class="btn alt next-topic" href="${href}">➡️ Siguiente tema</a>`;
  };
}
