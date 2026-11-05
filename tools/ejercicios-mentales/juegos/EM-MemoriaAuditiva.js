/* Tema 17 · Memoria auditiva (tipo Simón) · Pipo 🐧 · música: caja de música (se calla durante los sonidos) */
const { pick, rnd } = MKU;
const PADS = [
  { e: "🐶", n: "perro", f: 523.25, c: "#f87171" },
  { e: "🐱", n: "gato", f: 659.25, c: "#60a5fa" },
  { e: "🐸", n: "rana", f: 783.99, c: "#4ade80" },
  { e: "🐥", n: "pollito", f: 1046.5, c: "#facc15" }
];
const LEN = [[2, 3], [3, 4], [4, 5]];
const SPEED = [700, 600, 520];
let actx = null;
function tone(f, ms) {
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === "suspended") actx.resume();
    const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime;
    o.type = "triangle"; o.frequency.value = f;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.35, t + .02); g.gain.exponentialRampToValueAtTime(.001, t + ms / 1000);
    o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + ms / 1000 + .05);
  } catch (e) { }
}
function gen(level, idx) {
  const [a, b] = LEN[level]; const len = idx < 5 ? a : b;
  const seq = []; while (seq.length < len) { const k = rnd(4); if (len > 2 && seq.length >= 2 && seq[seq.length - 1] === k && seq[seq.length - 2] === k) continue; seq.push(k); }
  return { seq };
}

MKGame({
  slug: "EM-MemoriaAuditiva", title: "Memoria auditiva", short: "Escucha", char: "pipo", music: "music-calma.mp3",
  theme: { bg: "linear-gradient(180deg,#bae6fd,#e0f2fe 45%,#fbcfe8)", a1: "#ec4899", a2: "#0ea5e9", ink: "#0c4a6e", title: "#0284c7", soft: "#e0f2fe", tile: "#f0f9ff" },
  deco: ["🎵", "🎶", "❄️", "🎵"],
  hello: "¡Hola! Soy <b>Pipo</b> 🐧 y me encanta la música. Escucha mis sonidos y <b>repítelos en el mismo orden</b>.",
  intro: ["Primero <b>escucha y mira</b> qué animalitos suenan. Luego tócalos tú en el mismo orden."],
  champion: "¡Tienes oído de músico! 🎧",
  levels: [
    { title: "2 y 3 sonidos", icon: "🎵", desc: "Escucha y repite" },
    { title: "3 y 4 sonidos", icon: "🎶", desc: "Un poco más largo" },
    { title: "4 y 5 sonidos", icon: "🎼", desc: "¡Memoria de concierto!" }
  ],
  check(n) {
    const bad = [];
    for (let L = 0; L < 3; L++) for (let k = 0; k < 10; k++) { const q = gen(L, k); if (q.seq.length < LEN[L][0] || q.seq.length > LEN[L][1]) bad.push("largo"); }
    return [...new Set(bad)];
  },
  round(level, idx, ui) {
    const q = gen(level, idx);
    let pos = 0, listening = false;
    ui.musicHold(true);
    const grid = document.createElement("div"); grid.className = "ma-grid";
    const btns = PADS.map((p, k) => {
      const b = document.createElement("button"); b.type = "button"; b.className = "ma-pad emoji"; b.style.setProperty("--c", p.c);
      b.innerHTML = `${p.e}`; b.setAttribute("aria-label", p.n);
      b.onclick = () => press(k); grid.appendChild(b); return b;
    });
    ui.area.appendChild(grid);
    const again = document.createElement("button"); again.type = "button"; again.className = "btn soft small"; again.style.marginTop = "10px"; again.textContent = "🔁 Escuchar otra vez";
    again.onclick = () => { if (!listening || ui.done) return; ui.helped(); pos = 0; play(); };
    ui.area.appendChild(again);
    const flash = (k, ms) => { btns[k].classList.add("lit"); tone(PADS[k].f, ms); ui.later(() => btns[k].classList.remove("lit"), ms * .8); };
    function play() {
      listening = false; grid.classList.add("busy");
      ui.prompt(`👂 Escucha ${q.seq.length} sonidos…`, false);
      q.seq.forEach((k, i) => ui.later(() => flash(k, SPEED[level] * .85), 600 + i * SPEED[level]));
      ui.later(() => { listening = true; grid.classList.remove("busy"); ui.prompt(`¡Tu turno! Toca los ${q.seq.length} en orden.`, false); }, 600 + q.seq.length * SPEED[level]);
    }
    function press(k) {
      if (!listening || ui.done) return;
      flash(k, 300);
      if (k === q.seq[pos]) {
        pos++;
        if (pos === q.seq.length) { listening = false; ui.musicHold(false); ui.later(() => ui.win(`¡Perfecto! El orden era: ${q.seq.map(i => PADS[i].e).join(" ")}.`, "¡Lo repetiste perfecto!"), 350); }
      } else {
        listening = false;
        ui.miss("Vuelve a escuchar con atención. ¡Esta vez tú puedes!", "Vuelve a escuchar con atención.");
        pos = 0; ui.later(play, 1400);
      }
    }
    play();
    const solve = () => { if (!listening) { setTimeout(solve, 150); return; } q.seq.slice(pos).forEach(k => press(k)); };
    ui.setSolve(solve);
    const miss = () => { if (!listening) { setTimeout(miss, 150); return; } press((q.seq[pos] + 1) % 4); };
    ui.setMiss(miss);
  }
});
