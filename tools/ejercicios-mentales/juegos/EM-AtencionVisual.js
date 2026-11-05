/* Tema 16 · Atención visual · Mika 🐱 · música: misterio divertido */
const { pick, shuffle, sample, rnd } = MKU;
const BASE = ["🍎", "🐟", "⭐", "🎈", "🌸", "🐞", "🍌", "⚽", "🐸", "🍓", "🧁", "🚗", "🦋", "🍄", "🐢", "🔔"];
const PARECIDO = { "⭐": "🌟", "🐟": "🐠", "🍎": "🍏", "🌸": "🌺", "🚗": "🚙", "🍓": "🍒", "🐸": "🐢", "🦋": "🐞" };
const CFG = [{ n: 12, t: [3, 4] }, { n: 16, t: [4, 5] }, { n: 20, t: [5, 6] }];

function gen(level, idx) {
  const C = CFG[level];
  const target = level === 2 ? pick(Object.keys(PARECIDO)) : pick(BASE);
  const nt = C.t[0] + rnd(C.t[1] - C.t[0] + 1);
  const pool = BASE.filter(x => x !== target && x !== PARECIDO[target]);
  const fill = [];
  if (level === 2) for (let i = 0; i < 3; i++) fill.push(PARECIDO[target]);     // trampas parecidas
  while (fill.length < C.n - nt) fill.push(pick(level === 0 ? pool.slice(0, 6) : pool));
  const items = shuffle([...Array(nt).fill(target), ...fill]);
  // posiciones en cuadrícula con un poco de movimiento (sin encimarse)
  const cols = level === 0 ? 4 : 5, rows = Math.ceil(C.n / cols);
  const cellsIdx = shuffle([...Array(cols * rows).keys()]).slice(0, C.n);
  const pos = cellsIdx.map(k => ({ x: (k % cols + .5 + (Math.random() - .5) * .45) / cols * 100, y: (Math.floor(k / cols) + .5 + (Math.random() - .5) * .45) / rows * 100, r: rnd(40) - 20 }));
  const mode = idx % 3 === 2 ? "contar" : "tocar";
  return { target, nt, items, pos, rows, cols, mode };
}

MKGame({
  slug: "EM-AtencionVisual", title: "Atención visual", short: "Atención", char: "mika", music: "music-misterio.mp3",
  theme: { bg: "linear-gradient(180deg,#312e81,#6d28d9 55%,#a21caf)", a1: "#f59e0b", a2: "#8b5cf6", ink: "#3b0764", title: "#7c3aed", soft: "#ede9fe", tile: "#f5f3ff" },
  deco: ["🔍", "🐾", "✨", "🔍"],
  hello: "¡Shhh! Soy <b>Mika</b> 🐱, la gatita detective. Hay cosas escondidas en el cuadro… ¿las encuentras todas?",
  intro: ["Mira el cuadro con ojos de detective y <b>toca todas</b> las que te pido. A veces tendrás que <b>contarlas</b>."],
  champion: "¡Tienes ojos de gato detective! 🐱",
  levels: [
    { title: "Ojos atentos", icon: "👀", desc: "12 dibujos · 3 o 4 escondidos" },
    { title: "Más escondidos", icon: "🔍", desc: "16 dibujos · 4 o 5 escondidos" },
    { title: "Trampas parecidas", icon: "🕵️", desc: "¡Cuidado con los dibujos parecidos!" }
  ],
  check(n) {
    const bad = [];
    for (let L = 0; L < 3; L++) for (let k = 0; k < n; k++) {
      const q = gen(L, k);
      if (q.items.filter(x => x === q.target).length !== q.nt) bad.push("cantidad de objetivos");
      if (q.items.length !== CFG[L].n) bad.push("cantidad total");
    }
    return [...new Set(bad)];
  },
  round(level, idx, ui) {
    const q = gen(level, idx);
    const st = document.createElement("div"); st.className = "stage av-scene"; st.style.aspectRatio = `${q.cols} / ${q.rows}`;
    const btns = q.items.map((e, i) => {
      const b = document.createElement("button"); b.type = "button"; b.className = "av-it emoji"; b.textContent = e;
      b.style.left = q.pos[i].x + "%"; b.style.top = q.pos[i].y + "%"; b.style.setProperty("--r", q.pos[i].r + "deg");
      st.appendChild(b); return b;
    });
    ui.area.appendChild(st);
    if (q.mode === "tocar") {
      let got = 0;
      const cnt = document.createElement("div"); cnt.className = "av-count"; ui.area.appendChild(cnt);
      const upd = () => cnt.textContent = `${q.target} encontrados: ${got} de ${q.nt}`; upd();
      ui.prompt(`Toca <b>todos</b> los ${q.target}`, "Toca todos los que te muestro. Hay " + q.nt + ".");
      btns.forEach((b, i) => b.onclick = () => {
        if (ui.done || b.classList.contains("found")) return;
        if (q.items[i] === q.target) { b.classList.add("found"); got++; upd(); if (got === q.nt) ui.win(`¡Encontraste los ${q.nt}!`); }
        else { b.classList.add("nope"); ui.later(() => b.classList.remove("nope"), 450); ui.miss(level === 2 ? `¡Ojo! Ese se parece, pero no es igual a ${q.target}.` : `Ese no es ${q.target}. Busca despacio, fila por fila.`, "Ese no es. Busca despacio, fila por fila."); }
      });
      ui.setSolve(() => btns.forEach((b, i) => { if (q.items[i] === q.target && !b.classList.contains("found")) b.click(); }));
      ui.setMiss(() => btns[q.items.findIndex(x => x !== q.target)].click());
    } else {
      ui.prompt(`¿Cuántos ${q.target} hay?`, "¿Cuántos hay? Cuéntalos con cuidado.");
      const opts = shuffle([q.nt, q.nt + 1, q.nt - 1]);
      ui.choices(opts, { cls: "num", correct: o => o === q.nt,
        onTap: o => { if (o === q.nt) btns.forEach((b, i) => { if (q.items[i] === q.target) b.classList.add("found"); }); },
        why: `Hay ${q.nt} ${q.target}.`, sayWhy: `Hay ${q.nt}.`, hint: "Toca cada uno con la mirada y cuenta en voz baja: uno, dos, tres…" });
    }
  }
});
