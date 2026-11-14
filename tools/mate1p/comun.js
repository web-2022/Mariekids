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
  const opts = q.opts, ok = o => (q.eq ? q.eq(o, q.ans) : o === q.ans);
  ui.choices(opts, {
    cols: q.cols || 2, cls: "exam " + (q.cls || ""), render: q.render || abcd,
    correct: ok, onTap: o => { if (!ok(o)) q._wrong = o; },
    why: q.why, hint: q.hint
  });
  if (q.steps) { const all = ui.area.querySelectorAll(".scene"); tutorBtn(ui, q, all[all.length - 1] || null); }
}

/* ---------- Tutor «Ayúdame a resolver»: explica paso a paso como un profesor ----------
   q.steps = T => [{ t: "texto del paso", go: done => {...animación...; done()} }, ...]
   T trae ayudas para marcar la escena: its, of, dim, count, pairs, match, badge, clear. */
let TUT_TOK = 0, TUT_HOLD = null;
const tutVoz = () => { const b = document.getElementById("soundBtn"); return !b || b.textContent.trim() !== "🔇"; };
function tutSay(text, cb) {
  const t = String(text || "").replace(/&lt;/g, " < ").replace(/&gt;/g, " > ")
    .replace(/(^|[\s\d)>])<(?=[\s\d(<]|$)/g, "$1 es menor que ").replace(/(^|[\s\d)>])>(?=[\s\d(<]|$)/g, "$1 es mayor que ")
    .replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/[\u{1F000}-\u{1FAFF}\u2190-\u21FF\u2300-\u23FF\u2600-\u27BF\u2B00-\u2BFF\uFE0F]/gu, "")
    .replace(/S\/\s?(\d+)/g, "$1 soles").replace(/\((\d+)\s?;\s?(\d+)\)/g, "$1 coma $2").replace(/(\d)\s?kg\b/g, "$1 kilos").replace(/(\d)\s?cm\b/g, "$1 centímetros").replace(/(\d)\s?m\b/g, "$1 metros")
    .replace(/÷/g, " entre ").replace(/(\d+)\.?º/g, "$1").replace(/×/g, " por ").replace(/−/g, " menos ").replace(/\+/g, " más ").replace(/=/g, " es igual a ").replace(/\s+/g, " ").trim();
  let fin = false; const end = () => { if (!fin) { fin = true; if (cb) cb(); } };
  if (!t || !tutVoz() || !("speechSynthesis" in window)) { setTimeout(end, Math.min(2600, 400 + t.length * 40)); return; }
  const u = new SpeechSynthesisUtterance(t), vs = speechSynthesis.getVoices();
  u.voice = vs.find(x => x.lang === "es-PE") || vs.find(x => /^es[-_](419|US|MX|CO)/.test(x.lang)) || vs.find(x => /^es/.test(x.lang)) || null;
  u.lang = "es-PE"; u.rate = .85; u.pitch = 1.05;
  u.onend = end; u.onerror = e => { if (e.error !== "interrupted" && e.error !== "canceled") end(); };
  speechSynthesis.cancel(); speechSynthesis.speak(u);
  setTimeout(end, 1800 + t.length * 95);   // por si el navegador no avisa el final
}
function tutKit(sc, tok) {
  const alive = () => tok === TUT_TOK;
  const host = el => { if (getComputedStyle(el).position === "static") el.classList.add("t-host"); };
  const T = {
    sc,
    its: (sel = ".it") => [...sc.querySelectorAll(sel)],
    of: (txt, sel = ".it") => T.its(sel).filter(x => x.dataset.k ? x.dataset.k === txt : x.textContent.includes(txt)),
    not: (els, sel = ".it") => T.its(sel).filter(x => !els.includes(x)),
    dim: els => els.forEach(x => x.classList.add("t-dim")),
    badge: (el, txt, cls = "") => {
      if (el instanceof SVGElement && el.tagName !== "svg") {   // dentro de un dibujo SVG: número en el centro
        const bb = el.getBBox(), NS = "http://www.w3.org/2000/svg";
        if (bb.width < 34 && bb.height < 34) {   // objeto chico (número, punto): globito arriba a la derecha
          const g = document.createElementNS(NS, "g"), c = document.createElementNS(NS, "circle"), t = document.createElementNS(NS, "text"), cx = bb.x + bb.width + 3, cy = bb.y + 2;
          g.setAttribute("class", "t-num t-svgb");
          c.setAttribute("cx", cx); c.setAttribute("cy", cy); c.setAttribute("r", 8.5); c.setAttribute("fill", "#e11d48"); c.setAttribute("stroke", "#fff"); c.setAttribute("stroke-width", 1.5);
          t.setAttribute("x", cx); t.setAttribute("y", cy + 3.8); t.setAttribute("text-anchor", "middle"); t.setAttribute("font-size", txt.length > 2 ? 8 : 11); t.setAttribute("font-weight", "900"); t.setAttribute("fill", "#fff"); t.textContent = txt;
          g.append(c, t); (el.ownerSVGElement || el.parentNode).appendChild(g);
          return { style: { set background(v) { c.setAttribute("fill", v); } } };
        }
        const t = document.createElementNS(NS, "text"), sz = Math.max(10, Math.min(18, bb.height * .55));
        t.setAttribute("x", bb.x + bb.width / 2); t.setAttribute("y", bb.y + bb.height / 2 + sz * .36); t.setAttribute("text-anchor", "middle");
        t.setAttribute("font-size", sz); t.setAttribute("font-weight", "900"); t.setAttribute("class", "t-num t-svgnum"); t.textContent = txt;
        el.parentNode.insertBefore(t, el.nextSibling); return { style: t.style };
      }
      host(el); const b = document.createElement("b"); b.className = "t-num " + cls; b.textContent = txt; el.appendChild(b); return b; },
    // cuenta uno por uno: pone el número y lo dice en voz alta
    count: (els, o = {}) => done => {
      let k = 0;
      const step = () => {
        if (!alive()) return;
        if (k >= els.length) { setTimeout(() => alive() && done(), 350); return; }
        const el = els[k++], lab = o.label ? o.label(k, el) : String(o.from ? o.from + k - 1 : k);
        el.classList.add("t-hl"); if (o.color) el.style.setProperty("--pc", o.color);
        T.badge(el, lab, o.cls); tutSay(o.say ? o.say(k, el) : lab);
        setTimeout(step, o.ms || 900);
      };
      step();
    },
    // agrupa de dos en dos (pares) con colores
    // ordena para que cada pareja quede con su vecino más cercano
    near: els => {
      const P = els.map(e => { const r = e.getBoundingClientRect(); return { e, x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
      const left = [...P].sort((a, b) => a.y - b.y || a.x - b.x), out = [];
      while (left.length) {
        const a = left.shift(); out.push(a.e); if (!left.length) break;
        let bi = 0, bd = Infinity; left.forEach((b, i) => { const d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2; if (d < bd) { bd = d; bi = i; } });
        out.push(left.splice(bi, 1)[0].e);
      }
      return out;
    },
    pairs: (els, o = {}) => done => {
      if (o.near) els = T.near(els);
      const C = ["#f59e0b", "#22c55e", "#3b82f6", "#ec4899", "#8b5cf6", "#14b8a6", "#ef4444", "#84cc16"];
      let k = 0;
      const step = () => {
        if (!alive()) return;
        if (2 * k >= els.length) { setTimeout(() => alive() && done(), 350); return; }
        const a = els[2 * k], b = els[2 * k + 1], c = C[k % C.length]; k++;
        [a, b].forEach(x => { if (x) { x.classList.add("t-pair"); x.style.setProperty("--pc", c); } });
        const lab = o.label ? o.label(k) : String(k);
        T.badge(a, lab, "t-pc").style.background = c;
        if (b && o.both) T.badge(b, lab, "t-pc").style.background = c;
        tutSay(o.say ? o.say(k) : lab); setTimeout(step, o.ms || 1000);
      };
      step();
    },
    // recorre los lados (o vértices) de una figura SVG (path M…L…Z, rect o polygon): pinta cada lado y lo numera
    edges: (shp, o = {}) => done => {
      const NS = "http://www.w3.org/2000/svg", svg = shp.ownerSVGElement;
      let P = [];
      if (shp.tagName === "rect") { const x = +shp.getAttribute("x"), y = +shp.getAttribute("y"), w = +shp.getAttribute("width"), h = +shp.getAttribute("height"); P = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]; }
      else { const nums = (shp.getAttribute("d") || shp.getAttribute("points") || "").match(/-?[\d.]+/g).map(Number); for (let i = 0; i + 1 < nums.length; i += 2) P.push([nums[i], nums[i + 1]]); }
      let k = 0;
      const dot = (x, y, txt, c) => { const g = document.createElementNS(NS, "g"), ci = document.createElementNS(NS, "circle"), t = document.createElementNS(NS, "text");
        g.setAttribute("class", "t-num t-svgb"); ci.setAttribute("cx", x); ci.setAttribute("cy", y); ci.setAttribute("r", o.r || 9); ci.setAttribute("fill", c); ci.setAttribute("stroke", "#fff"); ci.setAttribute("stroke-width", 2);
        t.setAttribute("x", x); t.setAttribute("y", y + 4.5); t.setAttribute("text-anchor", "middle"); t.setAttribute("font-size", o.fs || 13); t.setAttribute("font-weight", 900); t.setAttribute("fill", "#fff"); t.textContent = txt; g.append(ci, t); svg.appendChild(g); };
      const step = () => {
        if (!alive()) return;
        if (k >= P.length) { setTimeout(() => alive() && done(), 350); return; }
        const a = P[k], b = P[(k + 1) % P.length]; k++;
        const lab = o.label ? o.label(k) : String(k);
        if (o.vertices) dot(a[0], a[1], lab, "#16a34a");
        else { const ln = document.createElementNS(NS, "line"); ln.setAttribute("x1", a[0]); ln.setAttribute("y1", a[1]); ln.setAttribute("x2", b[0]); ln.setAttribute("y2", b[1]); ln.setAttribute("stroke", "#e11d48"); ln.setAttribute("stroke-width", o.sw || 6); ln.setAttribute("stroke-linecap", "round"); ln.setAttribute("class", "t-num"); svg.appendChild(ln);
          dot((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, lab, "#e11d48"); }
        tutSay(o.say ? o.say(k) : lab); setTimeout(step, o.ms || 800);
      };
      step();
    },
    // trazos numerados sobre un dibujo SVG: segs = [[x1, y1, x2, y2], …]
    strokes: (svg, segs, o = {}) => done => {
      const NS = "http://www.w3.org/2000/svg"; let k = 0;
      const step = () => {
        if (!alive()) return;
        if (k >= segs.length) { setTimeout(() => alive() && done(), 300); return; }
        const [x1, y1, x2, y2] = segs[k++], g = document.createElementNS(NS, "g"), mx = (x1 + x2) / 2, my = (y1 + y2) / 2, lab = o.label ? o.label(k) : k;
        g.setAttribute("class", "t-num t-svgb");
        g.innerHTML = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#e11d48" stroke-width="${o.sw || 6}" stroke-linecap="round"/><circle cx="${mx}" cy="${my}" r="${o.r || 9}" fill="#e11d48" stroke="#fff" stroke-width="2"/><text x="${mx}" y="${my + 4}" text-anchor="middle" font-size="${o.fs || 11}" font-weight="900" fill="#fff" stroke="none">${lab}</text>`;
        svg.appendChild(g); tutSay(o.say ? o.say(k) : String(lab)); setTimeout(step, o.ms || 650);
      };
      step();
    },
    // puntos numerados sobre un dibujo SVG, en coordenadas del dibujo: pts = [[x, y], …]
    dots: (svg, pts, o = {}) => done => {
      const NS = "http://www.w3.org/2000/svg"; let k = 0;
      const step = () => {
        if (!alive()) return;
        if (k >= pts.length) { setTimeout(() => alive() && done(), 300); return; }
        const [x, y] = pts[k++], g = document.createElementNS(NS, "g");
        g.setAttribute("class", "t-num t-svgb");
        g.innerHTML = `<circle cx="${x}" cy="${y}" r="${o.r || 10}" fill="${o.c || "#e11d48"}" stroke="#fff" stroke-width="2"/><text x="${x}" y="${y + 4.5}" text-anchor="middle" font-size="${o.fs || 13}" font-weight="900" fill="#fff" stroke="none">${o.label ? o.label(k) : k}</text>`;
        svg.appendChild(g); tutSay(o.say ? o.say(k) : String(k)); setTimeout(step, o.ms || 750);
      };
      step();
    },
    // muestra figuras escondidas una por una (formas SVG sobre el dibujo) y las va contando
    flash: (shapes, o = {}) => done => {
      const svg = sc.querySelector("svg"), NS = "http://www.w3.org/2000/svg", C = ["#f59e0b", "#22c55e", "#3b82f6", "#ec4899", "#8b5cf6", "#14b8a6", "#ef4444"];
      const vb = svg.viewBox.baseVal, cnt = document.createElementNS(NS, "text");
      cnt.setAttribute("x", vb.x + vb.width - 4); cnt.setAttribute("y", vb.y + Math.max(30, vb.height * .2)); cnt.setAttribute("text-anchor", "end"); cnt.setAttribute("font-size", Math.max(30, vb.height * .2)); cnt.setAttribute("font-weight", 900);
      cnt.setAttribute("fill", "#e11d48"); cnt.setAttribute("class", "t-num t-svgnum"); svg.appendChild(cnt);
      let k = 0, cur = null;
      const step = () => {
        if (!alive()) return;
        if (cur) cur.remove();
        if (k >= shapes.length) { setTimeout(() => alive() && done(), 300); return; }
        const sh = shapes[k], c = sh.c || C[(sh.g ?? k) % C.length]; k++;
        cur = document.createElementNS(NS, "g"); cur.setAttribute("class", "t-num"); cur.innerHTML = sh.svg;
        [...cur.children].forEach(x => { x.setAttribute("fill", c); x.setAttribute("fill-opacity", sh.line ? 1 : .5); x.setAttribute("stroke", c); x.setAttribute("stroke-width", sh.line ? 8 : 5); x.setAttribute("stroke-linecap", "round"); });
        svg.insertBefore(cur, cnt); cnt.textContent = String(k);
        tutSay(o.say ? o.say(k, sh) : String(k)); setTimeout(step, o.ms || 950);
      };
      step();
    },
    // encierra de g en g (grupos de igual cantidad), con color y número de grupo
    chunks: (els, g, o = {}) => done => {
      const C = ["#f59e0b", "#22c55e", "#3b82f6", "#ec4899", "#8b5cf6", "#14b8a6", "#ef4444", "#84cc16"];
      let k = 0;
      const step = () => {
        if (!alive()) return;
        if (k * g >= els.length) { setTimeout(() => alive() && done(), 350); return; }
        const grp = els.slice(k * g, k * g + g), c = C[k % C.length]; k++;
        grp.forEach(x => { x.classList.add("t-pair"); x.style.setProperty("--pc", c); });
        const lab = o.label ? o.label(k) : String(k);
        T.badge(grp[grp.length - 1], lab, "t-pc").style.background = c;
        tutSay(o.say ? o.say(k) : lab); setTimeout(step, o.ms || 1000);
      };
      step();
    },
    // reparte en 2 grupos iguales: uno al azul, uno al naranja…
    split: (els, o = {}) => done => {
      let k = 0;
      const step = () => {
        if (!alive()) return;
        if (k >= els.length) { setTimeout(() => alive() && done(), 350); return; }
        const el = els[k], blue = k % 2 === 0, n = Math.floor(k / 2) + 1, c = blue ? "#3b82f6" : "#f97316"; k++;
        el.classList.add("t-pair"); el.style.setProperty("--pc", c);
        T.badge(el, String(n), "t-pc").style.background = c;
        if (blue) tutSay(String(n));
        setTimeout(step, blue ? 550 : 800);
      };
      step();
    },
    cell: (r, c) => { const tr = sc.querySelectorAll("tr")[r]; const td = tr && tr.children[c]; if (td) td.classList.add("t-cell"); return td; },
    paint: (els, c = "#fde68a") => els.forEach(x => { x.classList.add("t-paint"); x.style.fill = c; }),
    clear: () => {
      sc.querySelectorAll(".t-num").forEach(x => x.remove());
      sc.querySelectorAll(".t-paint").forEach(x => { x.classList.remove("t-paint"); x.style.removeProperty("fill"); });
      sc.querySelectorAll(".t-dim,.t-hl,.t-pair,.t-host,.t-cell").forEach(x => { x.classList.remove("t-dim", "t-hl", "t-pair", "t-host", "t-cell"); x.style.removeProperty("--pc"); });
    }
  };
  return T;
}
// «<» suelto (signo menor que) → &lt; para que no rompa el HTML
const tutEsc = h => String(h).replace(/<(?=[\s\d=(<]|$)/g, "&lt;");
// texto de la respuesta para el cierre (null si no se puede escribir)
const ansTxt = q => q.ansTxt !== undefined ? q.ansTxt : (typeof q.ans === "number" || typeof q.ans === "string") ? String(q.ans) : null;
function tutorBtn(ui, q, sc) {
  TUT_TOK++;
  if (TUT_HOLD) { TUT_HOLD(false); TUT_HOLD = null; }
  const btn = document.createElement("button");
  btn.type = "button"; btn.className = "tut-btn"; btn.innerHTML = "🙋 No entiendo, ¡ayúdame a resolver!";
  const place = el => { if (sc) sc.after(el); else { const ch = ui.area.querySelector(".choices"); ch ? ch.before(el) : ui.area.appendChild(el); } };
  place(btn);
  btn.onclick = () => {
    if (ui.helped) ui.helped();
    btn.remove();
    const box = document.createElement("div"); box.className = "tutor";
    box.innerHTML = `<div class="th"><span>👩‍🏫 Resolvamos juntos</span><span class="tp"></span></div><div class="tt"></div><div class="tboard"></div><div class="tb"><button type="button" class="t-rep">🔊 Repetir</button><button type="button" class="t-next">Siguiente paso ➜</button></div>`;
    place(box);
    if (ui.musicHold) { ui.musicHold(true); TUT_HOLD = ui.musicHold; }
    const tok = ++TUT_TOK, T = tutKit(sc || box.querySelector(".tboard"), tok), board = box.querySelector(".tboard");
    T.board = board;
    const steps = q.steps(T).filter(Boolean);
    // ayuda según el error: si ya marcó una alternativa equivocada, empezamos por ahí
    if (q._wrong !== undefined) {
      const w = q._wrong, wt = (typeof w === "number" || typeof w === "string") ? String(w) : "esa";
      const extra = q.err ? q.err(w) : "";
      steps.unshift({ t: `Elegiste <b>${wt}</b>. ¡Buen intento! ${extra || "Pero esa no es."} Vamos a resolverlo juntos, paso a paso.` });
    }
    // cierre: siempre termina diciendo la respuesta correcta (sin tocarla por el niño)
    const at = ansTxt(q), lastT = String(steps[steps.length - 1].t).replace(/<[^>]+>/g, "");
    if (at === null) steps.push({ t: "Ahora ya sabes cuál es. 👇 Búscala en las respuestas y tócala." });
    else if (!lastT.includes(at.replace(/<[^>]+>/g, ""))) steps.push({ t: `La respuesta es <b>${at}</b>. 👇 Búscala en las respuestas y tócala.` });
    else steps[steps.length - 1] = { ...steps[steps.length - 1], t: steps[steps.length - 1].t + (/Búscala|búscala/.test(lastT) ? "" : " 👇 Búscala en las respuestas.") };
    let i = -1;
    const nx = box.querySelector(".t-next"), rp = box.querySelector(".t-rep");
    const show = () => {
      const s = steps[i], last = i === steps.length - 1;
      box.querySelector(".tp").textContent = `Paso ${i + 1} de ${steps.length}`;
      box.querySelector(".tt").innerHTML = tutEsc(s.t);
      if (s.b !== undefined) { const h = typeof s.b === "function" ? s.b() : s.b; board.innerHTML = h || ""; board.classList.toggle("on", !!h); }
      if (s.bAdd) { board.insertAdjacentHTML("beforeend", typeof s.bAdd === "function" ? s.bAdd() : s.bAdd); board.classList.add("on"); }
      nx.disabled = true; nx.textContent = "…";
      const ready = () => {
        if (tok !== TUT_TOK) return;
        nx.disabled = false;
        nx.textContent = last ? "🔁 Ver otra vez" : "Siguiente paso ➜";
        if (last && TUT_HOLD) { TUT_HOLD(false); TUT_HOLD = null; }
      };
      const wait = board.querySelectorAll("[style*='--d']").length && (s.b !== undefined || s.bAdd) ? BOARD.dur(board) : 0;
      const t0 = Date.now();
      tutSay(s.s || s.t, () => { if (tok !== TUT_TOK) return; if (s.go) s.go(ready); else setTimeout(ready, Math.max(0, wait - (Date.now() - t0))); });
      box.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };
    nx.onclick = () => {
      if (i === steps.length - 1) { T.clear(); board.innerHTML = ""; board.classList.remove("on"); i = -1; }
      i++; show();
    };
    rp.onclick = () => tutSay(steps[i].s || steps[i].t);
    i = 0; show();
  };
}

// explica una operación en columna: devuelve { lines: [...], carry: [...] }
function colTxt(nums, sign = "+") {
  const N = ["unidades", "decenas", "centenas"], w = String(Math.max(...nums)).length + 1, lines = [], carry = [];
  if (sign === "+") {
    let c = 0;
    for (let k = 0; k < w; k++) {
      const ds = nums.map(n => Math.floor(n / 10 ** k) % 10), any = nums.some(n => n >= 10 ** k);
      if (!any && !c) break;
      const sum = ds.reduce((p, q) => p + q, 0) + c, parts = (c ? [c] : []).concat(ds.filter((d, i) => nums[i] >= 10 ** k || d));
      const nm = N[k] || "millares";
      lines.push(sum >= 10 && nums.some(n => n >= 10 ** (k + 1)) || (sum >= 10 && k < w - 1)
        ? `${nm[0].toUpperCase() + nm.slice(1)}: ${parts.join(" + ")} = ${sum} → escribimos ${sum % 10} y llevamos ${Math.floor(sum / 10)} a las ${N[k + 1] || "siguientes"}.`
        : `${nm[0].toUpperCase() + nm.slice(1)}: ${parts.join(" + ")} = ${sum} → escribimos ${sum}.`);
      if (sum >= 10 && !(nums.every(n => n < 10 ** (k + 1)) && k === w - 1)) { carry.push(String(Math.floor(sum / 10))); c = Math.floor(sum / 10); } else { carry.push(""); c = 0; }
      if (sum >= 10 && nums.every(n => n < 10 ** (k + 1))) { lines[lines.length - 1] = `${nm[0].toUpperCase() + nm.slice(1)}: ${parts.join(" + ")} = ${sum} → escribimos ${sum}.`; carry[carry.length - 1] = ""; break; }
    }
  } else {
    let [a, b] = nums, p = 0;
    for (let k = 0; k < w; k++) {
      if (a < 10 ** k && b < 10 ** k) break;
      let x = Math.floor(a / 10 ** k) % 10 - p, y = Math.floor(b / 10 ** k) % 10, nm = N[k] || "millares", Nm = nm[0].toUpperCase() + nm.slice(1);
      if (x < y) { lines.push(`${Nm}: ${x} − ${y} no se puede. Pedimos 1 prestado a las ${N[k + 1]}: ${x + 10} − ${y} = ${x + 10 - y}.`); p = 1; carry.push(""); }
      else { lines.push(`${Nm}: ${x} − ${y} = ${x - y}${p ? " (ya le quitamos el 1 prestado)" : ""}.`); p = 0; carry.push(""); }
    }
  }
  return { lines, carry };
}

// saltos para ir de a hasta b «completando»: de 1 en 1 hasta la decena, luego de 10 en 10, luego de 1 en 1
function saltosHasta(a, b) {
  const out = []; let v = a, sg = b >= a ? 1 : -1;
  if (sg < 0) { while (v > b) { const j = v - b >= 10 && v % 10 === 0 ? 10 : 1; out.push(-j); v -= j; } return out; }
  while (v < b && v % 10 && v + 1 <= b) { out.push(1); v++; }
  while (v + 10 <= b) { out.push(10); v += 10; }
  while (v < b) { out.push(1); v++; }
  return out;
}

// figuras escondidas en los dibujos de conteo (para el tutor): listas de { svg, g (grupo/tamaño) }
const FIG = {
  triFan(m, h) {
    const A = [150, 14], L = [20, 200], R = [280, 200], lp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t], out = [];
    for (let lev = h + 1; lev >= 1; lev--) { const t = lev / (h + 1), p = lp(A, L, t), q = lp(A, R, t);
      for (let sz = 1; sz <= m; sz++) for (let i = 0; i + sz <= m; i++) { const a = lp(p, q, i / m), b = lp(p, q, (i + sz) / m); out.push({ svg: `<path d="M${A} L${a} L${b}Z"/>`, g: sz - 1, sz, lev }); } }
    return out;
  },
  rects(r, c) {
    const W = 260, H = 60 * r, out = [];
    for (let hh = 1; hh <= r; hh++) for (let ww = 1; ww <= c; ww++) for (let y = 0; y + hh <= r; y++) for (let x = 0; x + ww <= c; x++)
      out.push({ svg: `<rect x="${10 + W * x / c}" y="${10 + H * y / r}" width="${W * ww / c}" height="${H * hh / r}"/>`, g: ww - 1 + (hh - 1) * c, ww, hh });
    return out;
  },
  squares(n) {
    const S = 180, c = S / n, out = [];
    for (let z = 1; z <= n; z++) for (let y = 0; y + z <= n; y++) for (let x = 0; x + z <= n; x++) out.push({ svg: `<rect x="${10 + c * x}" y="${10 + c * y}" width="${c * z}" height="${c * z}"/>`, g: z - 1, z });
    return out;
  },
  segs(p) {
    const X = i => 20 + 260 * i / (p - 1), N = "ABCDEFGH", out = [];
    for (let i = 0; i < p; i++) for (let j = i + 1; j < p; j++) out.push({ svg: `<line x1="${X(i)}" y1="30" x2="${X(j)}" y2="30"/>`, g: i, line: true, name: N[i] + N[j] });
    return out;
  }
};

// centro de la cara de arriba de cada torre de isoCubes(H): [{x, y, n}] (n = altura)
function isoTops(H) {
  const s = 34, t = s * 0.87, h = s * 0.5, out = [];
  H.forEach((row, y) => row.forEach((n, x) => { if (n) { const a = (x - y) * t, b = (x + y) * h - (n - 1) * s; out.push({ x: a, y: b - s + h, n }); } }));
  return out;
}

// posición (en el dibujo) de la casilla (x; y) de coordGrid(w, h)
const coordXY = (w, h, x, y) => [30 + x * 40, (h + 1) * 40 + 20 - 30 - y * 40];

// línea guía desde la punta de la barra i hasta el eje (para barChart)
function barGuide(vals, i) {
  const max = Math.max(...vals), top = Math.ceil(max / 2) * 2 || 2, sc = 150 / top, x = 48 + i * 58 + 22, y = 190 - vals[i] * sc;
  return [x, y, 38, y];
}

/* ---------- Pizarra del tutor: dibujos que aparecen poco a poco ----------
   Cada pieza con style="--d:Xs" aparece con retraso X (animación .tb-in). */
const BOARD = {
  dur: el => { let m = 0; el.querySelectorAll("[style*='--d']").forEach(x => { const v = parseFloat((x.getAttribute("style").match(/--d:\s*([\d.]+)s/) || [])[1] || 0); if (v > m) m = v; }); return (m + .6) * 1000; },
  // recta numérica con saltos: desde a, saltos = [+1,+1,...] o [-10, -1...]
  jumps(a, saltos, o = {}) {
    const vals = [a]; saltos.forEach(j => vals.push(vals[vals.length - 1] + j));
    const lo = o.min !== undefined ? o.min : Math.min(...vals) - (o.pad ?? 1), hi = o.max !== undefined ? o.max : Math.max(...vals) + (o.pad ?? 1);
    const W = 320, L = 14, R = W - 14, X = v => L + (R - L) * (v - lo) / Math.max(1, hi - lo), span = hi - lo;
    const every = span <= 22 ? 1 : span <= 60 ? 5 : 10;
    let g = `<line x1="${L - 6}" y1="70" x2="${R + 6}" y2="70" stroke="#334155" stroke-width="2.5"/>`;
    for (let v = Math.ceil(lo / every) * every; v <= hi; v += every) g += `<line x1="${X(v)}" y1="64" x2="${X(v)}" y2="76" stroke="#334155" stroke-width="2"/><text x="${X(v)}" y="93" font-size="${span > 22 ? 10 : 12}" text-anchor="middle" font-weight="800" fill="#334155">${v}</text>`;
    if (every > 1) vals.forEach((v, i) => { if (v % every && (i === 0 || i === vals.length - 1 || Math.abs(saltos[i - 1]) >= every)) g += `<line x1="${X(v)}" y1="64" x2="${X(v)}" y2="76" stroke="#334155" stroke-width="2"/><text x="${X(v)}" y="93" font-size="10" text-anchor="middle" font-weight="800" fill="#7c3aed">${v}</text>`; });
    g += `<circle cx="${X(a)}" cy="70" r="6" fill="#22c55e"/>`;
    saltos.forEach((j, i) => {
      const x1 = X(vals[i]), x2 = X(vals[i + 1]), m = (x1 + x2) / 2, hgt = Math.min(40, 14 + Math.abs(x2 - x1) * .45), c = j > 0 ? "#2563eb" : "#e11d48";
      g += `<g class="tb-in" style="--d:${(i * (o.step || .7) + .3).toFixed(2)}s"><path d="M${x1} 64 Q${m} ${64 - hgt * 1.4} ${x2} 64" fill="none" stroke="${c}" stroke-width="2.5" marker-end="url(#ah${c.slice(1)})"/>` +
        (o.labels === false ? "" : `<text x="${m}" y="${60 - hgt * .72}" font-size="12" text-anchor="middle" font-weight="900" fill="${c}">${j > 0 ? "+" : "−"}${Math.abs(j)}</text>`) + `</g>`;
    });
    const end = vals[vals.length - 1];
    g += `<g class="tb-in" style="--d:${(saltos.length * (o.step || .7) + .3).toFixed(2)}s"><circle cx="${X(end)}" cy="70" r="7" fill="#f59e0b" stroke="#fff" stroke-width="2"/></g>`;
    const defs = `<defs>${["2563eb", "e11d48"].map(c => `<marker id="ah${c}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#${c}"/></marker>`).join("")}</defs>`;
    return `<svg viewBox="0 0 ${W} 100" class="tb-svg">${defs}${g}</svg>`;
  },
  // recta numérica con algunos números marcados: vals = [{v, c, lab}] o números
  marks(vals, o = {}) {
    vals = vals.map(x => typeof x === "number" ? { v: x } : x);
    const vs = vals.map(x => x.v), lo = o.min ?? Math.max(0, Math.min(...vs) - 2), hi = o.max ?? Math.max(...vs) + 2;
    const W = 320, L = 14, R = W - 14, X = v => L + (R - L) * (v - lo) / Math.max(1, hi - lo), span = hi - lo, every = span <= 22 ? 1 : span <= 60 ? 5 : 10;
    const C = ["#2563eb", "#e11d48", "#16a34a", "#f59e0b"];
    let g = `<line x1="${L - 6}" y1="56" x2="${R + 6}" y2="56" stroke="#334155" stroke-width="2.5"/><path d="M${R + 6} 50 L${R + 14} 56 L${R + 6} 62z" fill="#334155"/>`;
    for (let v = Math.ceil(lo / every) * every; v <= hi; v += every) g += `<line x1="${X(v)}" y1="50" x2="${X(v)}" y2="62" stroke="#334155" stroke-width="2"/><text x="${X(v)}" y="80" font-size="${span > 22 ? 10 : 12}" text-anchor="middle" font-weight="800" fill="#334155">${v}</text>`;
    vals.forEach((x, i) => { const c = x.c || C[i % C.length];
      g += `<g class="tb-in" style="--d:${(.3 + i * .8).toFixed(2)}s"><circle cx="${X(x.v)}" cy="56" r="8" fill="${c}" stroke="#fff" stroke-width="2"/><text x="${X(x.v)}" y="36" font-size="15" text-anchor="middle" font-weight="900" fill="${c}">${x.lab ?? x.v}</text></g>`; });
    return `<svg viewBox="0 0 ${W + 16} 90" class="tb-svg">${g}</svg>` + (o.note ? `<div class="tb-line tb-in" style="--d:${(.4 + vals.length * .8).toFixed(2)}s">${o.note}</div>` : "");
  },
  // grupos de puntos/objetos: [{n, e, c, lab}]
  groups(gs, o = {}) {
    let d = 0;
    return `<div class="tb-groups">` + gs.map(gr => `<div class="tb-grp" style="--gc:${gr.c || "#f59e0b"}">${gr.lab ? `<b class="tb-in" style="--d:${(d).toFixed(2)}s">${gr.lab}</b>` : ""}<div class="tb-gi">` +
      (gr.items || Array.from({ length: gr.n }, () => gr.e || "●")).map(x => `<span class="tb-in" style="--d:${(d += (o.step || .18)).toFixed(2)}s">${x}</span>`).join("") + `</div></div>`).join("") + `</div>`;
  },
  // reparto de n cosas en k platos, de uno en uno
  share(n, k, e = "●", o = {}) {
    const C = ["#3b82f6", "#f97316", "#22c55e", "#ec4899", "#8b5cf6", "#14b8a6"], plates = Array.from({ length: k }, () => []);
    for (let i = 0; i < n; i++) plates[i % k].push(`<span class="tb-in" style="--d:${(.3 + i * (o.step || .3)).toFixed(2)}s">${e}</span>`);
    return `<div class="tb-groups">` + plates.map((p, i) => `<div class="tb-grp tb-plate" style="--gc:${C[i % C.length]}"><b>${o.names ? o.names[i] : "Grupo " + (i + 1)}</b><div class="tb-gi">${p.join("")}</div></div>`).join("") + `</div>`;
  },
  // decenas (barras de 10) y unidades
  du(n, o = {}) {
    const D = Math.floor(n / 10), U = n % 10; let d = 0;
    const bar = () => `<span class="tb-ten tb-in" style="--d:${(d += .35).toFixed(2)}s">${"<i></i>".repeat(10)}</span>`;
    return `<div class="tb-du"><div class="tb-dcol"><b>${D} decena${D === 1 ? "" : "s"}</b><div>${Array.from({ length: D }, bar).join("")}</div></div><div class="tb-ucol"><b>${U} unidad${U === 1 ? "" : "es"}</b><div>${Array.from({ length: U }, () => `<span class="tb-one tb-in" style="--d:${(d += .25).toFixed(2)}s"></span>`).join("")}</div></div></div>` + (o.total === false ? "" : `<div class="tb-line tb-in" style="--d:${(d + .4).toFixed(2)}s">${D} D + ${U} U = <b>${n}</b></div>`);
  },
  // operación en columna (suma o resta) con D y U
  col(a, b, op = "+") {
    const r = op === "+" ? a + b : a - b, w = String(Math.max(a, b, Math.abs(r))).length;
    const cells = (n, cls = "") => String(n).padStart(w, " ").split("").map(c => `<span class="${cls}">${c === " " ? "" : c}</span>`).join("");
    const rd = String(r).padStart(w, " ").split("");
    return `<div class="tb-col" style="--w:${w}"><div class="tb-hd">${w === 3 ? "<span>C</span>" : ""}${w >= 2 ? "<span>D</span>" : ""}<span>U</span></div><div>${cells(a)}</div><div><span class="tb-op">${op === "+" ? "+" : "−"}</span>${cells(b)}</div><div class="tb-res">${rd.map((c, i) => `<span class="tb-in" style="--d:${(.6 + (w - 1 - i) * .9).toFixed(2)}s">${c === " " ? "" : c}</span>`).join("")}</div></div>`;
  },
  // operación en columna con «llevo» (suma de varios) o «presto» (resta de dos); aparece columna por columna
  op(nums, sign = "+") {
    const r = sign === "+" ? nums.reduce((p, q) => p + q, 0) : nums[0] - nums[1], w = String(Math.max(...nums, r)).length;
    const dig = (n, i) => { const t = String(n).padStart(w, " "); return t[i] === " " ? "" : t[i]; };
    const steps = colTxt(nums, sign), carry = Array(w).fill(""), D = i => (.5 + (w - 1 - i) * 1.4).toFixed(2);
    steps.carry.forEach((c, k) => { if (c) carry[w - 2 - k] = c; });   // lo que se lleva va encima de la columna siguiente
    const row = (cells, cls = "", first = "") => `<div class="${cls}"><span class="tb-op">${first}</span>${cells.join("")}</div>`;
    const hd = ["C", "D", "U"].slice(3 - Math.min(3, w)); while (hd.length < w) hd.unshift("");
    let h = row(hd.map(x => `<span>${x}</span>`), "tb-hd");
    h += row(carry.map((c, i) => `<span class="tb-car${c ? " tb-in" : ""}" style="--d:${c ? (+D(i + 1) + .5).toFixed(2) : 0}s">${c}</span>`), "tb-carry");
    nums.forEach((n, j) => { h += row(Array.from({ length: w }, (_, i) => `<span>${dig(n, i)}</span>`), "", j === nums.length - 1 ? (sign === "+" ? "+" : "−") : ""); });
    h += row(Array.from({ length: w }, (_, i) => `<span class="tb-in" style="--d:${D(i)}s">${dig(r, i)}</span>`), "tb-res");
    return `<div class="tb-col tb-op2" style="--w:${w}">${h}</div>`;
  },
  // líneas de pizarra que aparecen una tras otra
  lines(ls, o = {}) { return `<div class="tb-lines">` + ls.map((l, i) => `<div class="tb-in" style="--d:${(.2 + i * (o.step || 1)).toFixed(2)}s">${l}</div>`).join("") + `</div>`; },
  // sucesión con el salto entre términos
  seq(terms, o = {}) {
    let h = "", d = .1;
    terms.forEach((t, i) => {
      if (i) { const df = o.diffs ? o.diffs[i - 1] : (typeof t === "number" && typeof terms[i - 1] === "number" ? t - terms[i - 1] : null);
        h += df === null ? `<span class="tb-sep tb-in" style="--d:${(d += .2).toFixed(2)}s"></span>` : `<span class="tb-arr tb-in" style="--d:${(d += .5).toFixed(2)}s">${(df >= 0 ? "+" : "−") + Math.abs(df)}<i>➜</i></span>`; }
      h += `<span class="tb-term tb-in${o.hl === i ? " hl" : ""}" style="--d:${(d += .35).toFixed(2)}s">${t}</span>`;
    });
    return `<div class="tb-seq">${h}</div>`;
  },
  // tabla sencilla: filas de celdas (la primera es encabezado)
  table(rows, o = {}) { return `<table class="tbl tb-tbl">` + rows.map((r, i) => `<tr>${r.map((c, j) => i === 0 ? `<th>${c}</th>` : `<td class="${o.hl && o.hl[0] === i && o.hl[1] === j ? "hl" : ""}">${c}</td>`).join("")}</tr>`).join("") + `</table>`; },
  // copia del dibujo de la pregunta (para animarlo en la pizarra)
  big: (html, o = {}) => `<div class="tb-big tb-in" style="--d:${o.d || 0}s">${html}</div>`
};
function checkQ(q, bad, name) {
  const eq = q.eq || ((a, b) => a === b);
  if (q.opts.filter(o => eq(o, q.ans)).length !== 1) bad.push(name + ": respuesta no única o ausente");
  if (new Set(q.opts.map(String)).size !== q.opts.length) bad.push(name + ": opciones repetidas");
  if (q.opts.length < (q.min || 3)) bad.push(name + ": pocas opciones");
  if (!q.steps) bad.push(name + ": sin ayuda");
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
    out += `<rect class="it" data-k="${painted.has(k) ? "P" : "W"}" data-r="${r}" data-c="${c}" x="${c * s}" y="${r * s}" width="${s}" height="${s}" fill="${painted.has(k) ? (o.color || "#38bdf8") : "#fff"}" stroke="#0f172a" stroke-width="2"/>`;
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
    if (!passed || n > 69) return;
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
    levels: o.levels, openLevels: o.openLevels !== false,   // 1.º primaria: el alumno elige cualquier nivel
    check(k) { const bad = []; GEN.forEach((L, i) => L.forEach((g, j) => { for (let t = 0; t < k / 10; t++) { try { checkQ(g(), bad, `N${i + 1}.${j + 1}`); } catch (e) { bad.push(`N${i + 1}.${j + 1}: ${e.message}`); } } })); return [...new Set(bad)]; },
    round(level, idx, ui) { ask(ui, pick(GEN[level])()); },
    onEnd: nextTopic(o.next || o.n + 1)
  });
}

/* ---------- Más dibujos para los temas ---------- */
const svgWrap = (w, h, inner, maxw = 320) => `<svg viewBox="0 0 ${w} ${h}" width="${Math.min(maxw, w)}" style="max-width:100%;height:auto" font-family="Segoe UI, Arial, sans-serif">${inner}</svg>`;
// conjunto con llaves: A = {a; b; c}
const setTxt = (name, items) => `<div class="settxt"><b>${name}</b> = { ${items.map(x => `<span class="it">${x}</span>`).join(" ; ")} }</div>`;
// diagrama de Venn: zonas onlyA, both, onlyB, out (listas de texto/emoji)
function venn(o) {
  const place = (list, x0, x1, y0, y1, z) => { const n = list.length, cols = Math.max(1, Math.ceil(Math.sqrt(n))), rows = Math.ceil(n / cols) || 1;
    return list.map((t, i) => { const c = i % cols, r = Math.floor(i / cols); return `<text class="it" data-k="${z}" x="${(x0 + (x1 - x0) * (c + 0.5) / cols).toFixed(0)}" y="${(y0 + (y1 - y0) * (r + 0.5) / rows + 7).toFixed(0)}" text-anchor="middle" font-size="22" font-weight="800" fill="#0f172a">${t}</text>`; }).join(""); };
  const two = o.onlyB !== undefined;
  let g = `<rect x="2" y="2" width="${two ? 336 : 256}" height="196" rx="10" fill="#f8fafc" stroke="#334155" stroke-width="2"/><text x="14" y="24" font-size="18" font-weight="900" fill="#334155">U</text>`;
  if (two) {
    g += `<ellipse class="zA" cx="125" cy="105" rx="92" ry="72" fill="rgba(59,130,246,.15)" stroke="#2563eb" stroke-width="3"/><ellipse class="zB" cx="215" cy="105" rx="92" ry="72" fill="rgba(236,72,153,.15)" stroke="#db2777" stroke-width="3"/>`;
    g += `<text x="58" y="40" font-size="20" font-weight="900" fill="#2563eb">${o.a || "A"}</text><text x="270" y="40" font-size="20" font-weight="900" fill="#db2777">${o.b || "B"}</text>`;
    g += place(o.onlyA, 45, 150, 60, 150, "A") + place(o.both, 150, 190, 60, 150, "AB") + place(o.onlyB, 190, 295, 60, 150, "B") + place(o.out || [], 260, 330, 165, 195, "O");
    return svgWrap(340, 200, g);
  }
  g += `<ellipse cx="120" cy="105" rx="95" ry="70" fill="rgba(59,130,246,.15)" stroke="#2563eb" stroke-width="3"/><text x="40" y="45" font-size="20" font-weight="900" fill="#2563eb">${o.a || "A"}</text>`;
  g += place(o.onlyA, 45, 195, 60, 150, "A") + place(o.out || [], 180, 255, 165, 195, "O");
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
    for (let k = 0; k < d; k++) g += `<ellipse class="it" data-k="${labels[i]}" cx="${x}" cy="${140 - k * 13}" rx="20" ry="7" fill="${col[i]}" stroke="#0f172a" stroke-width="1.5"/>`;
    g += `<text x="${x}" y="190" text-anchor="middle" font-size="20" font-weight="900" fill="#334155">${labels[i]}</text>`; });
  return svgWrap(W, 200, g, 260);
}
// recta numérica: marks = [{v, show:true|false|"emoji"}]
function numberLine(vals, hidden = {}) {
  const n = vals.length, W = 40 + 56 * (n - 1) + 40;
  let g = `<line x1="10" y1="60" x2="${W - 10}" y2="60" stroke="#0f172a" stroke-width="3"/><path d="M${W - 10} 60 l-10 -6 v12z" fill="#0f172a"/>`;
  vals.forEach((v, i) => { const x = 40 + 56 * i; g += `<line x1="${x}" y1="50" x2="${x}" y2="70" stroke="#0f172a" stroke-width="3"/>`;
    g += hidden[i] ? `<text class="it" data-k="H" x="${x}" y="40" text-anchor="middle" font-size="26">${hidden[i]}</text>` : `<text class="it" data-k="v${i}" x="${x}" y="98" text-anchor="middle" font-size="20" font-weight="800" fill="#1e3a8a">${v}</text>`; });
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
