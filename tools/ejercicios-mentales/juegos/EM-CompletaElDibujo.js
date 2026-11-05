/* Tema 6 · Completa el dibujo · Coco 🐒 · música: marimba tropical */
const { pick, shuffle, sample } = MKU;

// Dibujos de 100×100. Cada pieza: nombre, color, caja [x,y,w,h] y forma d(color).
const DIBUJOS = [
  { name: "la casa", parts: [
    { n: "la pared", c: "#fde68a", box: [20, 45, 60, 45], d: c => `<rect x="20" y="45" width="60" height="45" rx="3" fill="${c}" stroke="#92400e" stroke-width="2"/>`, fixed: true },
    { n: "el techo", c: "#ef4444", box: [12, 14, 76, 34], d: c => `<path d="M12 47 L50 15 L88 47Z" fill="${c}" stroke="#7f1d1d" stroke-width="2" stroke-linejoin="round"/>` },
    { n: "la puerta", c: "#92400e", box: [42, 62, 16, 28], d: c => `<rect x="42" y="62" width="16" height="28" rx="2" fill="${c}"/><circle cx="54" cy="77" r="1.8" fill="#fde047"/>` },
    { n: "la ventana", c: "#7dd3fc", box: [25, 54, 14, 14], d: c => `<rect x="25" y="54" width="14" height="14" fill="${c}" stroke="#fff" stroke-width="2"/><path d="M32 54v14M25 61h14" stroke="#fff" stroke-width="1.6"/>` },
    { n: "la chimenea", c: "#b91c1c", box: [64, 18, 10, 18], d: c => `<rect x="64" y="18" width="10" height="18" fill="${c}"/>` }] },
  { name: "el carro", parts: [
    { n: "el cuerpo", c: "#3b82f6", box: [8, 40, 84, 30], d: c => `<path d="M10 68 L10 52 Q12 46 20 46 L32 46 L40 34 L66 34 L76 46 L86 48 Q90 50 90 56 L90 68Z" fill="${c}" stroke="#1e3a8a" stroke-width="2"/>`, fixed: true },
    { n: "la rueda", c: "#1f2937", box: [16, 60, 22, 22], d: c => `<circle cx="27" cy="71" r="10" fill="${c}"/><circle cx="27" cy="71" r="4" fill="#d1d5db"/>` },
    { n: "la ventana", c: "#bae6fd", box: [43, 37, 20, 11], d: c => `<path d="M44 46 L49 38 L62 38 L62 46Z" fill="${c}"/>` },
    { n: "el faro", c: "#fde047", box: [83, 50, 8, 8], d: c => `<circle cx="87" cy="54" r="3.5" fill="${c}" stroke="#ca8a04"/>` }] },
  { name: "el gato", parts: [
    { n: "la cabeza", c: "#fdba74", box: [22, 30, 56, 52], d: c => `<ellipse cx="50" cy="58" rx="28" ry="25" fill="${c}"/>`, fixed: true },
    { n: "la oreja", c: "#fb923c", box: [22, 14, 22, 26], d: c => `<path d="M24 42 L28 14 L46 34Z" fill="${c}"/>` },
    { n: "los ojos", c: "#1f2937", box: [36, 48, 28, 10], d: c => `<circle cx="40" cy="53" r="4.5" fill="${c}"/><circle cx="60" cy="53" r="4.5" fill="${c}"/><circle cx="41.5" cy="51.5" r="1.4" fill="#fff"/><circle cx="61.5" cy="51.5" r="1.4" fill="#fff"/>` },
    { n: "la nariz", c: "#e11d48", box: [45, 60, 10, 7], d: c => `<path d="M46 61 h8 l-4 5z" fill="${c}"/>` },
    { n: "los bigotes", c: "#7c2d12", box: [14, 62, 72, 12], d: c => `<path d="M16 64 h18 M16 71 h18 M66 64 h18 M66 71 h18" stroke="${c}" stroke-width="2" stroke-linecap="round"/>` }] },
  { name: "la flor", parts: [
    { n: "los pétalos", c: "#f472b6", box: [24, 8, 52, 52], d: c => [0, 72, 144, 216, 288].map(a => `<ellipse cx="50" cy="20" rx="10" ry="14" fill="${c}" transform="rotate(${a} 50 34)"/>`).join("") },
    { n: "el centro", c: "#facc15", box: [41, 25, 18, 18], d: c => `<circle cx="50" cy="34" r="8" fill="${c}"/>` },
    { n: "el tallo", c: "#16a34a", box: [47, 46, 6, 46], d: c => `<rect x="47.5" y="46" width="5" height="46" rx="2.5" fill="${c}"/>`, fixed: true },
    { n: "la hoja", c: "#22c55e", box: [52, 62, 24, 14], d: c => `<path d="M52 72 Q64 58 76 64 Q66 78 52 72Z" fill="${c}"/>` }] },
  { name: "el árbol", parts: [
    { n: "el tronco", c: "#92400e", box: [42, 54, 16, 38], d: c => `<rect x="42" y="54" width="16" height="38" rx="3" fill="${c}"/>`, fixed: true },
    { n: "la copa", c: "#22c55e", box: [16, 6, 68, 56], d: c => `<circle cx="50" cy="34" r="27" fill="${c}"/><circle cx="30" cy="44" r="14" fill="${c}"/><circle cx="70" cy="44" r="14" fill="${c}"/>` },
    { n: "las manzanas", c: "#ef4444", box: [30, 24, 40, 26], d: c => `<circle cx="36" cy="40" r="4" fill="${c}"/><circle cx="58" cy="28" r="4" fill="${c}"/><circle cx="64" cy="46" r="4" fill="${c}"/>` }] },
  { name: "el helado", parts: [
    { n: "el cono", c: "#f59e0b", box: [34, 48, 32, 44], d: c => `<path d="M34 50 L50 92 L66 50Z" fill="${c}"/><path d="M40 58 L60 58 M44 68 L56 68 M47 78 L53 78" stroke="#b45309" stroke-width="1.6"/>`, fixed: true },
    { n: "la bola", c: "#f9a8d4", box: [30, 22, 40, 32], d: c => `<circle cx="50" cy="40" r="17" fill="${c}"/>` },
    { n: "la cereza", c: "#dc2626", box: [44, 8, 14, 18], d: c => `<circle cx="50" cy="20" r="5" fill="${c}"/><path d="M50 15 Q52 9 57 8" stroke="#166534" stroke-width="2" fill="none"/>` }] },
  { name: "el pez", parts: [
    { n: "el cuerpo", c: "#fb923c", box: [20, 30, 56, 40], d: c => `<ellipse cx="48" cy="50" rx="28" ry="19" fill="${c}"/>`, fixed: true },
    { n: "la cola", c: "#f97316", box: [72, 34, 22, 32], d: c => `<path d="M74 50 L94 34 L94 66Z" fill="${c}"/>` },
    { n: "el ojo", c: "#1f2937", box: [30, 40, 12, 12], d: c => `<circle cx="36" cy="46" r="5" fill="#fff"/><circle cx="35" cy="46" r="2.6" fill="${c}"/>` },
    { n: "la aleta", c: "#fdba74", box: [42, 18, 22, 16], d: c => `<path d="M44 32 Q52 16 64 32Z" fill="${c}"/>` }] },
  { name: "el barco", parts: [
    { n: "el casco", c: "#b45309", box: [12, 62, 76, 22], d: c => `<path d="M12 64 L88 64 L78 84 L22 84Z" fill="${c}"/>`, fixed: true },
    { n: "la vela", c: "#f8fafc", box: [52, 14, 30, 46], d: c => `<path d="M54 16 L54 60 L82 60Z" fill="${c}" stroke="#94a3b8" stroke-width="2"/>` },
    { n: "el mástil", c: "#78350f", box: [48, 10, 6, 54], d: c => `<rect x="49" y="10" width="4" height="54" fill="${c}"/>` },
    { n: "la bandera", c: "#ef4444", box: [34, 10, 16, 12], d: c => `<path d="M49 11 L35 16 L49 21Z" fill="${c}"/>` }] },
  { name: "el cohete", parts: [
    { n: "el cuerpo", c: "#e2e8f0", box: [36, 10, 28, 66], d: c => `<path d="M50 10 Q66 26 64 74 L36 74 Q34 26 50 10Z" fill="${c}" stroke="#64748b" stroke-width="2"/>`, fixed: true },
    { n: "la ventanita", c: "#38bdf8", box: [43, 32, 14, 14], d: c => `<circle cx="50" cy="39" r="6.5" fill="${c}" stroke="#1e3a8a" stroke-width="2.5"/>` },
    { n: "las aletas", c: "#ef4444", box: [24, 56, 52, 24], d: c => `<path d="M37 58 L25 78 L37 74Z M63 58 L75 78 L63 74Z" fill="${c}"/>` },
    { n: "el fuego", c: "#f97316", box: [40, 74, 20, 22], d: c => `<path d="M40 75 Q50 98 60 75 Q50 84 40 75Z" fill="${c}"/><path d="M45 76 Q50 88 55 76Z" fill="#fde047"/>` }] }
];
const OTRO_COLOR = ["#3b82f6", "#22c55e", "#a855f7", "#ef4444", "#facc15", "#14b8a6"];

const svg = (inner, vb) => `<svg viewBox="${vb || "0 0 100 100"}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const thumb = (p, color) => { const [x, y, w, h] = p.box, s = Math.max(w, h) + 10; return svg(p.d(color || p.c), `${x + w / 2 - s / 2} ${y + h / 2 - s / 2} ${s} ${s}`); };

function gen(level) {
  const D = pick(DIBUJOS);
  const removable = D.parts.filter(p => !p.fixed);
  const miss = pick(removable);
  // piezas de otros dibujos, sin nombres repetidos (no dos «ventanas»)
  const seen = new Set([miss.n]);
  const others = shuffle(DIBUJOS.filter(x => x !== D).flatMap(x => x.parts.filter(p => !p.fixed)))
    .filter(p => !seen.has(p.n) && seen.add(p.n));
  let opts;
  if (level === 0) opts = [{ p: miss }, ...sample(others, 2).map(p => ({ p }))];
  else if (level === 1) opts = [{ p: miss }, ...sample(others, 3).map(p => ({ p }))];
  else {
    const col = pick(OTRO_COLOR.filter(c => c.toLowerCase() !== miss.c.toLowerCase()));
    opts = [{ p: miss }, { p: miss, color: col }, ...sample(others, 2).map(p => ({ p }))];
  }
  return { D, miss, opts: shuffle(opts) };
}
const isRight = (q, o) => o.p === q.miss && !o.color;

MKGame({
  slug: "EM-CompletaElDibujo", title: "Completa el dibujo", short: "Completa", char: "coco", music: "music-marimba.mp3",
  theme: { bg: "radial-gradient(circle at 80% 10%,#fef08a 0 60px,transparent 61px),linear-gradient(180deg,#bbf7d0,#fef3c7 55%,#fed7aa)", a1: "#f97316", a2: "#16a34a", ink: "#7c2d12", title: "#ea580c", soft: "#ffedd5", tile: "#fff7ed" },
  deco: ["🎨", "🖌️", "🌴", "🍌"],
  hello: "¡Hola! Soy <b>Coco</b> 🐒, el monito pintor. ¡A mis dibujos les falta una pieza! ¿Me ayudas?",
  intro: ["Mira el dibujo, descubre <b>qué pieza falta</b> en el recuadro punteado y elígela."],
  champion: "¡Eres un gran artista! 🎨",
  levels: [
    { title: "¿Qué falta?", icon: "🖍️", desc: "3 piezas para elegir" },
    { title: "Mira bien", icon: "🖌️", desc: "4 piezas para elegir" },
    { title: "Forma y color", icon: "🎨", desc: "¡Ojo con el color correcto!" }
  ],
  check(n) {
    const bad = [];
    for (let L = 0; L < 3; L++) for (let k = 0; k < n; k++) {
      const q = gen(L);
      if (q.opts.filter(o => isRight(q, o)).length !== 1) bad.push("respuesta no única");
      const keys = q.opts.map(o => o.p.n + (o.color || ""));
      if (new Set(keys).size !== keys.length) bad.push("opción repetida");
      if (q.opts.some(o => o.p !== q.miss && !o.color && o.p.n === q.miss.n)) bad.push("pieza igual de otro dibujo");
    }
    return [...new Set(bad)];
  },
  round(level, idx, ui) {
    const q = gen(level);
    const [x, y, w, h] = q.miss.box;
    const holder = `<rect x="${x - 2}" y="${y - 2}" width="${w + 4}" height="${h + 4}" rx="4" fill="#fff7ed" stroke="#f97316" stroke-width="2" stroke-dasharray="4 3"/><text x="${x + w / 2}" y="${y + h / 2 + 5}" text-anchor="middle" font-size="14" font-weight="900" fill="#f97316">?</text>`;
    const draw = parts => q.D.parts.map(p => p === q.miss ? (parts ? p.d(p.c) : holder) : p.d(p.c)).join("");
    const stage = document.createElement("div");
    stage.className = "stage cd-stage"; stage.innerHTML = svg(draw(false));
    ui.area.appendChild(stage);
    ui.prompt(`A ${q.D.name} le falta una pieza. ¿Cuál es?`);
    ui.choices(q.opts, {
      cols: q.opts.length === 4 ? 2 : 3, cls: "cd-opt",
      render: o => thumb(o.p, o.color),
      label: o => o.p.n,
      correct: o => isRight(q, o),
      onTap: o => { if (isRight(q, o)) stage.innerHTML = svg(draw(true)); },
      why: `¡Faltaba ${q.miss.n}! Ahora ${q.D.name} está completo.`.replace("completo", /^la /.test(q.D.name) ? "completa" : "completo"),
      hint: level === 2 ? "La pieza debe tener la forma y el color correctos." : `Piensa: ¿qué parte tiene siempre ${q.D.name}?`
    });
  }
});
