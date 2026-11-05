/* Tema 4 · Memoria visual · Bimba 🐘 · música: caja de música */
const { pick, shuffle, sample } = MKU;
const POOL = ["🐶", "🐱", "🐰", "🐻", "🐼", "🦁", "🐸", "🐵", "🐷", "🐮", "🐔", "🐧", "🦋", "🐢", "🐟", "🐞",
  "🍎", "🍌", "🍇", "🍓", "🍉", "🍐", "🍒", "🥕", "🌽", "🍦", "🧁", "🍩",
  "⚽", "🎈", "🧸", "🪁", "🎲", "🚗", "🚲", "🚀", "⛵", "🌸", "🌻", "⭐", "🌙", "☀️", "🎸", "🥁", "👑", "🎩"];

// Contenido de cada ronda (separado del dibujo para poder validarlo)
function gen(level) {
  if (level === 0) {                       // ¿cuál viste?
    const s = sample(POOL, 5); const shown = s.slice(0, 3);
    return { shown, ask: "seen", opts: shuffle([shown[Math.floor(Math.random() * 3)], s[3], s[4]]), secs: 4 };
  }
  if (level === 1) {                       // ¿cuál NO estaba?
    const s = sample(POOL, 5); const shown = s.slice(0, 4);
    const opts = shuffle([...sample(shown, 2), s[4]]);
    return { shown, ask: "unseen", opts, secs: 4.5 };
  }
  const s = sample(POOL, 6); const shown = s.slice(0, 5);   // ¿qué cambió?
  const at = Math.floor(Math.random() * 5);
  const after = shown.slice(); after[at] = s[5];
  return { shown, ask: "changed", after, at, secs: 5 };
}
function isRight(q, o, i) {
  if (q.ask === "seen") return q.shown.includes(o);
  if (q.ask === "unseen") return !q.shown.includes(o);
  return i === q.at;
}

MKGame({
  slug: "EM-MemoriaVisual", title: "Memoria visual", short: "Memoria", char: "bimba", music: "music-calma.mp3",
  theme: { bg: "radial-gradient(circle at 20% 15%,#fff 0 40px,transparent 41px),linear-gradient(180deg,#e0e7ff,#fbcfe8 60%,#fdf2f8)", a1: "#818cf8", a2: "#ec4899", ink: "#3730a3", title: "#6366f1", soft: "#e0e7ff", tile: "#eef2ff" },
  deco: ["🌸", "⭐", "🎈", "🌸"],
  hello: "¡Hola! Soy <b>Bimba</b> 🐘 y nunca olvido nada. ¿Me ayudas a recordar los dibujos?",
  intro: ["Mira los dibujos con mucha atención. Luego se esconden… ¡y tienes que recordarlos!"],
  champion: "¡Tienes memoria de elefante! 🐘",
  levels: [
    { title: "¿Cuál viste?", icon: "👀", desc: "Recuerda 3 dibujos" },
    { title: "¿Cuál no estaba?", icon: "🤔", desc: "Recuerda 4 dibujos" },
    { title: "¿Qué cambió?", icon: "🔄", desc: "Recuerda 5 dibujos en fila" }
  ],
  check(n) {
    const bad = [];
    for (let L = 0; L < 3; L++) for (let k = 0; k < n; k++) {
      const q = gen(L);
      const list = q.ask === "changed" ? q.after : q.opts;
      const right = list.filter((o, i) => isRight(q, o, i)).length;
      if (right !== 1) bad.push(`nivel ${L + 1}: ${right} respuestas correctas`);
      if (new Set(list).size !== list.length) bad.push(`nivel ${L + 1}: dibujo repetido`);
    }
    return [...new Set(bad)];
  },
  round(level, idx, ui) {
    const q = gen(level);
    const row = document.createElement("div");
    row.className = "stage mem-row"; row.style.setProperty("--n", q.shown.length);
    q.shown.forEach(e => { const c = document.createElement("div"); c.className = "mem-card emoji"; c.textContent = e; row.appendChild(c); });
    ui.area.appendChild(row);
    ui.prompt(`¡Mira bien! Memoriza ${q.shown.length} dibujos…`, `Mira bien y memoriza los ${q.shown.length} dibujos.`);
    const bar = ui.timer(q.secs, hide);

    function hide() {
      bar.remove();
      [...row.children].forEach((c, i) => ui.later(() => c.classList.add("hidden-card"), i * 90));
      ui.later(ask, q.shown.length * 90 + 300);
    }
    function peek() {              // pista: mirar otra vez un momento
      ui.helped();
      [...row.children].forEach(c => c.classList.remove("hidden-card"));
      ui.later(() => [...row.children].forEach(c => c.classList.add("hidden-card")), 1800);
    }
    function ask() {
      if (q.ask === "changed") {
        ui.prompt("Volvieron… pero <b>uno cambió</b>. ¡Tócalo!", "Volvieron, pero uno cambió. Tócalo.");
        row.remove();
        ui.choices(q.after, {
          cols: 5, cls: "mem-pick",
          correct: (o, i) => i === q.at,
          why: `Aquí antes estaba ${q.shown[q.at]} y ahora está ${q.after[q.at]}.`,
          sayWhy: "Ese dibujo era otro antes.",
          hint: "Piensa en el orden: ¿qué había en cada lugar?"
        });
      } else {
        const t = q.ask === "seen" ? "¿Cuál de estos <b>viste</b>?" : "¿Cuál <b>NO estaba</b>?";
        ui.prompt(t, q.ask === "seen" ? "¿Cuál de estos viste?" : "¿Cuál no estaba?");
        ui.choices(q.opts, {
          correct: o => isRight(q, o),
          why: q.ask === "seen" ? `Estaban: ${q.shown.join(" ")}.` : `Estaban: ${q.shown.join(" ")}. El que no estaba es ${q.opts.find(o => !q.shown.includes(o))}.`,
          sayWhy: q.ask === "seen" ? "Ese sí estaba en la fila." : "Ese no estaba en la fila.",
          hint: "Toca «👀 Mirar otra vez» para recordar."
        });
      }
      const again = document.createElement("button");
      again.type = "button"; again.className = "btn soft small"; again.style.marginTop = "10px"; again.textContent = "👀 Mirar otra vez";
      again.onclick = () => {
        if (ui.done) return;
        if (q.ask === "changed") {     // muestra la fila original un momento
          ui.helped();
          const ghost = document.createElement("div"); ghost.className = "stage mem-row"; ghost.style.setProperty("--n", 5);
          q.shown.forEach(e => { const c = document.createElement("div"); c.className = "mem-card emoji"; c.textContent = e; ghost.appendChild(c); });
          ui.area.prepend(ghost); ui.later(() => ghost.remove(), 1800);
        } else { ui.area.prepend(row); peek(); }
      };
      ui.area.appendChild(again);
    }
  }
});
