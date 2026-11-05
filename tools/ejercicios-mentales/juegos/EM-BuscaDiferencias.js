/* Tema 7 · Busca diferencias · Mika 🐱 · música: jazz suave */
const { pick, shuffle, sample, rnd } = MKU;
const ITEMS = ["🐶", "🐱", "🐰", "🦊", "🐻", "🐼", "🐸", "🐵", "🐷", "🐮", "🐔", "🐧", "🦋", "🐢", "🐞", "🦄",
  "🍎", "🍌", "🍇", "🍓", "🍉", "🍐", "🥕", "🌽", "🍦", "🧁", "⚽", "🎈", "🧸", "🎲", "🚗", "🚀", "🌸", "🌻", "⭐", "🌙", "🎸", "👑"];
// Parejas parecidas para el nivel difícil
const SIMILAR = [["🍎", "🍏"], ["🌸", "🌺"], ["⭐", "🌟"], ["🐟", "🐠"], ["🚗", "🚙"], ["🍊", "🍋"], ["🐱", "🐯"], ["🐶", "🐺"], ["🌻", "🌼"], ["🎈", "🎀"], ["🍓", "🍒"], ["🐭", "🐹"]];

function gen(level) {
  const cols = 3, rows = level === 2 ? 4 : 3, n = cols * rows;
  const nd = [2, 3, 4][level];
  let left = sample(ITEMS, n);
  if (level === 2) {              // mete parejas parecidas en la escena
    sample(SIMILAR, 3).forEach((pr, i) => { left[i * 3 + 1] = pr[0]; });
  }
  left = left.map(e => ({ e, big: false }));
  const right = left.map(c => ({ ...c }));
  const spots = sample([...Array(n).keys()], nd);
  const kinds = [];
  spots.forEach((i, k) => {
    const sim = SIMILAR.find(pr => pr[0] === left[i].e);
    const kind = level === 0 ? pick(["cambia", "falta"]) : sim && level === 2 ? "parecido" : pick(["cambia", "falta", "grande"]);
    if (kind === "falta") right[i] = { e: "", big: false };
    else if (kind === "grande") right[i] = { e: left[i].e, big: true };
    else if (kind === "parecido") right[i] = { e: sim[1], big: false };
    else { const used = new Set([...left, ...right].map(c => c.e)); right[i] = { e: pick(ITEMS.filter(x => !used.has(x))), big: false }; }
    kinds.push(kind);
  });
  return { cols, rows, left, right, spots, kinds };
}
const differs = (a, b) => a.e !== b.e || a.big !== b.big;

MKGame({
  slug: "EM-BuscaDiferencias", title: "Busca diferencias", short: "Diferencias", char: "mika", music: "music-jazz.mp3",
  theme: { bg: "linear-gradient(180deg,#fde68a,#fdba74 45%,#fca5a5)", a1: "#f97316", a2: "#db2777", ink: "#7c2d12", title: "#c2410c", soft: "#ffedd5", tile: "#fff7ed" },
  deco: ["🔍", "🐾", "🔍", "🐾"],
  hello: "¡Hola! Soy <b>Mika</b> 🐱, la gatita detective. Estos dos cuadros parecen iguales… ¡pero no lo son!",
  intro: ["Compara los dos cuadros y <b>toca las diferencias</b> en el de la derecha."],
  champion: "¡Eres una detective genial! 🔍",
  levels: [
    { title: "Ojo de gato", icon: "🐾", desc: "2 diferencias · 9 casillas" },
    { title: "Detective", icon: "🔍", desc: "3 diferencias · cambia, falta o crece" },
    { title: "Súper detective", icon: "🕵️", desc: "4 diferencias · dibujos muy parecidos" }
  ],
  check(n) {
    const bad = [];
    for (let L = 0; L < 3; L++) for (let k = 0; k < n; k++) {
      const q = gen(L);
      const real = q.left.map((c, i) => differs(c, q.right[i]) ? i : -1).filter(i => i >= 0);
      if (real.length !== [2, 3, 4][L] || real.some(i => !q.spots.includes(i))) bad.push(`nivel ${L + 1}: diferencias no coinciden`);
    }
    return [...new Set(bad)];
  },
  round(level, idx, ui) {
    const q = gen(level);
    const total = q.spots.length;
    const found = new Set();
    const wrap = document.createElement("div"); wrap.className = "bd-wrap";
    const make = (side, cells) => {
      const p = document.createElement("div"); p.className = "bd-panel"; p.style.gridTemplateColumns = `repeat(${q.cols},1fr)`;
      cells.forEach((c, i) => {
        const b = document.createElement("button"); b.type = "button"; b.className = "bd-cell emoji" + (c.big ? " big" : "");
        b.textContent = c.e; b.dataset.i = i; b.setAttribute("aria-label", c.e || "vacío");
        b.onclick = () => tap(i);
        p.appendChild(b);
      });
      wrap.appendChild(p); return p;
    };
    const L = make("izq", q.left), Rp = make("der", q.right);
    ui.area.appendChild(wrap);
    const count = document.createElement("div"); count.className = "bd-count"; ui.area.appendChild(count);
    const upd = () => count.textContent = `Encontraste ${found.size} de ${total} diferencias`;
    upd();
    ui.prompt(`Busca <b>${total} diferencias</b> entre los cuadros.`, `Busca ${total} diferencias entre los dos cuadros.`);
    function tap(i) {
      if (ui.done || found.has(i)) return;
      if (q.spots.includes(i)) {
        found.add(i);
        [L, Rp].forEach(p => p.children[i].classList.add("found"));
        upd();
        if (found.size === total) ui.win("¡Encontraste todas las diferencias!", "Encontraste todas las diferencias.");
        else ui.say(pick(["¡Una!", "¡Bien visto!", "¡Eso es!"]));
      } else {
        const cells = [L.children[i], Rp.children[i]]; cells.forEach(c => c.classList.add("nope"));
        ui.later(() => cells.forEach(c => c.classList.remove("nope")), 500);
        ui.miss("Compara casilla por casilla: ¿cambió el dibujo, falta o está más grande?", "Compara casilla por casilla.");
      }
    }
    ui.setSolve(() => q.spots.forEach(i => tap(i)));
    ui.setMiss(() => { const i = [...Array(q.left.length).keys()].find(i => !q.spots.includes(i)); tap(i); });
  }
});
