/* Tema 8 · Figuras geométricas · Tito 🤖 · música: chiptune 8-bit */
const { pick, shuffle, sample, rnd } = MKU;
const COL = ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b", "#a855f7", "#ec4899", "#14b8a6"];
const FIG = {
  circulo: { n: "círculo", lados: 0, d: c => `<circle cx="50" cy="50" r="34" fill="${c}"/>` },
  cuadrado: { n: "cuadrado", lados: 4, d: c => `<rect x="18" y="18" width="64" height="64" rx="3" fill="${c}"/>` },
  triangulo: { n: "triángulo", lados: 3, d: c => `<path d="M50 14 L88 84 L12 84Z" fill="${c}" stroke-linejoin="round"/>` },
  rectangulo: { n: "rectángulo", lados: 4, d: c => `<rect x="8" y="30" width="84" height="42" rx="3" fill="${c}"/>` },
  pentagono: { n: "pentágono", lados: 5, d: c => `<path d="M50 12 L88 40 L74 86 L26 86 L12 40Z" fill="${c}"/>` }
};
const BASE = ["circulo", "cuadrado", "triangulo", "rectangulo"];
// Objetos de la vida diaria y su forma
const OBJ = [["⚽", "circulo", "la pelota"], ["🍪", "circulo", "la galleta"], ["🕐", "circulo", "el reloj"], ["🍩", "circulo", "la dona"], ["🌕", "circulo", "la luna llena"],
  ["🚪", "rectangulo", "la puerta"], ["📱", "rectangulo", "el celular"], ["📘", "rectangulo", "el libro"], ["📺", "rectangulo", "el televisor"],
  ["🍕", "triangulo", "la tajada de pizza"], ["⛺", "triangulo", "la carpa"], ["⛰️", "triangulo", "la montaña"], ["🧀", "triangulo", "el queso"],
  ["🎲", "cuadrado", "el dado"], ["🧊", "cuadrado", "el cubo de hielo"], ["🪟", "cuadrado", "la ventana"]];
const shape = (k, c, rot, s) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(${rot || 0} 50 50) translate(50 50) scale(${s || 1}) translate(-50 -50)">${FIG[k].d(c)}</g></svg>`;
const anyShape = k => shape(k, pick(COL), k === "circulo" ? 0 : rnd(25) - 12, .75 + Math.random() * .25);

function gen(level, idx) {
  if (level === 0) {
    const target = pick(BASE);
    const opts = shuffle([target, ...sample(BASE.filter(b => b !== target), 2)]);
    return { type: "cual", target, opts };
  }
  if (level === 1) {
    const [e, f, name] = pick(OBJ);
    const opts = shuffle([f, ...sample(BASE.filter(b => b !== f), 2)]);
    return { type: "objeto", e, f, name, opts };
  }
  if (idx % 2 === 0) {               // toca todos los…
    const target = pick(["circulo", "cuadrado", "triangulo", "rectangulo"]);
    const nT = 2 + rnd(3);
    const others = Array.from({ length: 8 - nT }, () => pick(BASE.filter(b => b !== target)));
    return { type: "todos", target, items: shuffle([...Array(nT).fill(target), ...others]) };
  }
  const f = pick(["triangulo", "cuadrado", "rectangulo", "pentagono"]);
  return { type: "lados", f, opts: [3, 4, 5] };
}

MKGame({
  slug: "EM-FigurasGeometricas", title: "Figuras geométricas", short: "Figuras", char: "tito", music: "music-chiptune.mp3",
  theme: { bg: "linear-gradient(180deg,#a5f3fc,#c7d2fe 55%,#ddd6fe)", a1: "#06b6d4", a2: "#6366f1", ink: "#1e3a8a", title: "#2563eb", soft: "#e0e7ff", tile: "#eef2ff" },
  deco: ["🔺", "🟦", "🟡", "🔷"],
  hello: "¡Bip bup! Soy <b>Tito</b> 🤖. Mi computadora ordena figuras… ¡pero necesito tu ayuda!",
  intro: ["Reconoce el <b>círculo</b>, el <b>cuadrado</b>, el <b>triángulo</b> y el <b>rectángulo</b>, ¡y encuéntralos en las cosas de tu casa!"],
  champion: "¡Eres un experto en figuras! 🤖",
  levels: [
    { title: "¿Cuál es?", icon: "🔵", desc: "Encuentra la figura que te digo" },
    { title: "Figuras en casa", icon: "🏠", desc: "¿Qué forma tiene cada cosa?" },
    { title: "Robot experto", icon: "🤖", desc: "Toca todas las figuras y cuenta lados" }
  ],
  check(n) {
    const bad = [];
    for (let L = 0; L < 3; L++) for (let k = 0; k < n; k++) {
      const q = gen(L, k);
      if (q.opts && new Set(q.opts).size !== q.opts.length) bad.push("opción repetida");
      if (q.type === "cual" && q.opts.filter(o => o === q.target).length !== 1) bad.push("respuesta no única");
      if (q.type === "objeto" && q.opts.filter(o => o === q.f).length !== 1) bad.push("respuesta no única");
      if (q.type === "lados" && !q.opts.includes(FIG[q.f].lados)) bad.push("lados fuera");
      if (q.type === "todos" && !q.items.includes(q.target)) bad.push("sin objetivo");
    }
    return [...new Set(bad)];
  },
  round(level, idx, ui) {
    const q = gen(level, idx);
    if (q.type === "cual") {
      ui.prompt(`¿Cuál es el <b>${FIG[q.target].n}</b>?`);
      ui.choices(q.opts, { render: k => anyShape(k), label: k => FIG[k].n, correct: k => k === q.target, cls: "fg-opt",
        why: `¡Ese es el ${FIG[q.target].n}! ${({ circulo: "Es redondo y no tiene esquinas.", cuadrado: "Tiene 4 lados iguales.", triangulo: "Tiene 3 lados y 3 puntas.", rectangulo: "Tiene 4 lados: 2 largos y 2 cortos." })[q.target]}`,
        hint: ({ circulo: "Busca la figura redonda, sin esquinas.", cuadrado: "Busca 4 lados iguales.", triangulo: "Busca la que tiene 3 puntas.", rectangulo: "Busca 4 lados: 2 largos y 2 cortos." })[q.target] });
    } else if (q.type === "objeto") {
      const st = document.createElement("div"); st.className = "stage fg-obj emoji"; st.textContent = q.e; ui.area.appendChild(st);
      ui.prompt(`¿Qué forma tiene <b>${q.name}</b>?`);
      ui.choices(q.opts, { render: k => anyShape(k) + `<small>${FIG[k].n}</small>`, label: k => FIG[k].n, correct: k => k === q.f, cls: "fg-opt",
        why: `${q.name[0].toUpperCase() + q.name.slice(1)} tiene forma de ${FIG[q.f].n}.`,
        hint: "Imagina el borde de la cosa: ¿es redondo o tiene lados?" });
    } else if (q.type === "lados") {
      const st = document.createElement("div"); st.className = "stage fg-big"; st.innerHTML = shape(q.f, pick(COL), 0, 1); ui.area.appendChild(st);
      ui.prompt(`¿Cuántos <b>lados</b> tiene esta figura?`);
      ui.choices(q.opts, { cls: "num", correct: n => n === FIG[q.f].lados,
        why: `El ${FIG[q.f].n} tiene ${FIG[q.f].lados} lados.`, hint: "Cuenta los bordes rectos con tu dedo, uno por uno." });
    } else {
      const need = q.items.filter(k => k === q.target).length; let got = 0;
      ui.prompt(`Toca <b>todos los ${FIG[q.target].n}s</b>.`, `Toca todos los ${FIG[q.target].n}s.`);
      const grid = document.createElement("div"); grid.className = "choices"; grid.style.setProperty("--cols", 4);
      const btns = q.items.map(k => {
        const b = document.createElement("button"); b.type = "button"; b.className = "choice fg-opt"; b.innerHTML = anyShape(k); b.setAttribute("aria-label", FIG[k].n);
        b.onclick = () => {
          if (ui.done || b.disabled) return;
          if (k === q.target) { b.classList.add("ok"); b.disabled = true; got++; if (got === need) ui.win(`¡Había ${need} ${FIG[q.target].n}s y los encontraste todos!`); else ui.say("¡Uno!"); }
          else { b.classList.add("wrong"); ui.later(() => b.classList.remove("wrong"), 450); ui.miss(`Esa no es. El ${FIG[q.target].n} ${({ circulo: "es redondo", cuadrado: "tiene 4 lados iguales", triangulo: "tiene 3 puntas", rectangulo: "es largo, con 4 lados" })[q.target]}.`); }
        };
        grid.appendChild(b); return b;
      });
      ui.area.appendChild(grid);
      ui.setSolve(() => btns.forEach((b, i) => { if (q.items[i] === q.target && !b.disabled) b.click(); }));
      ui.setMiss(() => { const i = q.items.findIndex(k => k !== q.target); btns[i].click(); });
    }
  }
});
