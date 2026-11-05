/* Tema 21 · Memoria mixta (imagen + sonido) · Bimba 🐘 y Pipo 🐧 · música: caja de música con ritmo */
const { pick, shuffle, sample } = MKU;
const ANIM = [["🐶", "perro", "guau"], ["🐱", "gato", "miau"], ["🐮", "vaca", "muuu"], ["🐸", "rana", "croac"], ["🐔", "gallina", "cocorocó"],
  ["🐑", "oveja", "beee"], ["🦆", "pato", "cuac"], ["🐷", "chanchito", "oinc"], ["🦁", "león", "grrr"], ["🐝", "abeja", "bzzz"], ["🐍", "serpiente", "sss"]];
const PAIRS = [3, 4, 5];
const ALLOW = [3, 4, 5];               // errores permitidos para que cuente «a la primera»

function gen(level) {
  const set = sample(ANIM, PAIRS[level]);
  const cards = [];
  set.forEach((a, i) => {
    cards.push({ id: i, kind: "img", face: a[0], say: a[1] });
    if (level === 0) cards.push({ id: i, kind: "img", face: a[0], say: a[1] });
    else if (level === 1) cards.push({ id: i, kind: "word", face: a[1], say: a[1] });
    else cards.push({ id: i, kind: "sound", face: "🔊 «" + a[2] + "»", say: a[2] });
  });
  return { set, cards: shuffle(cards) };
}

MKGame({
  slug: "EM-MemoriaMixta", title: "Memoria mixta", short: "Parejas", char: "bimba", music: "music-cajabeat.mp3", rounds: 6,
  theme: { bg: "linear-gradient(180deg,#c7d2fe,#fbcfe8 50%,#bae6fd)", a1: "#6366f1", a2: "#ec4899", ink: "#312e81", title: "#6366f1", soft: "#e0e7ff", tile: "#eef2ff" },
  deco: ["🎵", "🃏", "🐧", "🐘"],
  hello: "¡Hola! Somos <b>Bimba</b> 🐘 y <b>Pipo</b> 🐧. Juntos recordamos lo que vemos… ¡y lo que escuchamos! Encuentra las parejas.",
  intro: ["Voltea dos cartas. Si forman pareja, se quedan. ¡Escucha bien: algunas cartas hablan!"],
  champion: "¡Memoria de elefante y oído de pingüino! 🐘🐧",
  levels: [
    { title: "Parejas iguales", icon: "🃏", desc: "3 parejas de dibujos" },
    { title: "Dibujo y palabra", icon: "🔤", desc: "4 parejas: 🐶 con «perro»" },
    { title: "Dibujo y sonido", icon: "🔊", desc: "5 parejas: 🐶 con «guau»" }
  ],
  check(n) {
    const bad = [];
    for (let L = 0; L < 3; L++) for (let k = 0; k < n; k++) {
      const q = gen(L);
      const ids = q.cards.map(c => c.id);
      if (q.cards.length !== PAIRS[L] * 2 || ids.some(i => ids.filter(j => j === i).length !== 2)) bad.push("parejas mal");
    }
    return [...new Set(bad)];
  },
  round(level, idx, ui) {
    const q = gen(level);
    let open = [], found = 0, errors = 0, lock = false;
    const grid = document.createElement("div"); grid.className = "mm-grid"; grid.style.setProperty("--cols", q.cards.length > 8 ? 4 : q.cards.length === 8 ? 4 : 3);
    const info = document.createElement("div"); info.className = "mm-info";
    const upd = () => info.textContent = `Parejas: ${found} de ${q.set.length} · Errores: ${errors}`;
    const els = q.cards.map((c, i) => {
      const b = document.createElement("button"); b.type = "button"; b.className = "mm-card";
      b.innerHTML = `<span class="mm-back">?</span><span class="mm-face ${c.kind}">${c.face}</span>`;
      b.onclick = () => flip(i); grid.appendChild(b); return b;
    });
    ui.area.appendChild(grid); ui.area.appendChild(info); upd();
    ui.prompt(level === 0 ? "Encuentra las parejas iguales." : level === 1 ? "Une cada dibujo con su <b>nombre</b>." : "Une cada animal con su <b>sonido</b>.");
    function flip(i) {
      if (lock || ui.done || open.includes(i) || els[i].classList.contains("done")) return;
      els[i].classList.add("up"); open.push(i);
      ui.say(q.cards[i].say);
      if (open.length < 2) return;
      const [a, b] = open; lock = true;
      if (q.cards[a].id === q.cards[b].id) {
        ui.later(() => { els[a].classList.add("done"); els[b].classList.add("done"); open = []; lock = false; found++; upd();
          if (found === q.set.length) ui.win(errors <= ALLOW[level] ? `¡Todas las parejas con solo ${errors} errores!` : `¡Encontraste todas las parejas!`); }, 450);
      } else {
        errors++; upd();
        if (errors === ALLOW[level] + 1) ui.miss("Trata de recordar dónde estaba cada carta antes de voltear otra.", "Recuerda dónde estaba cada carta.");
        ui.later(() => { els[a].classList.remove("up"); els[b].classList.remove("up"); open = []; lock = false; }, 900);
      }
    }
    const solve = () => {
      if (lock) { setTimeout(solve, 150); return; }
      const left = q.cards.map((c, i) => i).filter(i => !els[i].classList.contains("done"));
      if (!left.length) return;
      const i = left[0], j = left.find(k => k !== i && q.cards[k].id === q.cards[i].id);
      flip(i); flip(j); setTimeout(solve, 600);
    };
    ui.setSolve(solve);
    ui.setMiss(() => {        // provoca errores hasta pasar el límite permitido
      let n = 0; const step = () => {
        if (lock) { setTimeout(step, 150); return; }
        const i = 0, j = q.cards.findIndex((c, k) => k !== i && c.id !== q.cards[i].id);
        flip(i); flip(j); if (++n <= ALLOW[level]) setTimeout(step, 1000);
      }; step();
    });
  }
});
