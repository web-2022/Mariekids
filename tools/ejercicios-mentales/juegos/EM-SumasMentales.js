/* Tema 22 · Sumas mentales · Tito 🤖 · música: chiptune */
const { pick, shuffle, rnd } = MKU;
const TIME = [14, 12, 12];
const EMO = ["🍎", "⭐", "🎈", "🐟", "🍓", "🚗", "🌸", "⚽"];

function gen(level) {
  let a, b, op;
  if (level === 0) { op = "+"; a = 1 + rnd(5); b = 1 + rnd(10 - a); }
  else if (level === 1) { op = pick(["+", "−"]); if (op === "+") { a = 1 + rnd(8); b = 1 + rnd(10 - a); } else { a = 3 + rnd(8); b = 1 + rnd(a - 1); } }
  else { op = pick(["+", "−"]); if (op === "+") { a = 5 + rnd(10); b = 2 + rnd(Math.max(1, 20 - a - 1)); if (a + b > 20) b = 20 - a; } else { a = 11 + rnd(10); b = 2 + rnd(9); } }
  const ans = op === "+" ? a + b : a - b;
  const opts = new Set([ans]);
  for (const d of shuffle([1, -1, 2, -2, 10, -10].slice(0, level === 2 ? 6 : 4))) { if (opts.size >= (level === 0 ? 3 : 4)) break; if (ans + d >= 0 && ans + d <= 30) opts.add(ans + d); }
  return { a, b, op, ans, e: pick(EMO), opts: shuffle([...opts]) };
}

MKGame({
  slug: "EM-SumasMentales", title: "Sumas mentales", short: "Sumas", char: "tito", music: "music-chiptune.mp3",
  theme: { bg: "linear-gradient(180deg,#1e293b,#334155 40%,#0e7490)", a1: "#22d3ee", a2: "#f472b6", ink: "#0f172a", title: "#0891b2", soft: "#cffafe", tile: "#ecfeff" },
  deco: ["➕", "➖", "🔢", "⚡"],
  hello: "¡Bip bup! Soy <b>Tito</b> 🤖, la calculadora con patas. ¿Sumamos y restamos en la cabeza?",
  intro: ["Resuelve la cuenta antes de que se acabe la barra. Si te ayuda, ¡usa tus dedos!"],
  champion: "¡Eres una calculadora humana! 🤖",
  levels: [
    { title: "Sumas hasta 10", icon: "➕", desc: "Con dibujos para contar" },
    { title: "Sumas y restas", icon: "➖", desc: "Hasta 10, sin dibujos" },
    { title: "Hasta 20", icon: "🔢", desc: "Sumas y restas grandes" }
  ],
  check(n) {
    const bad = [];
    for (let L = 0; L < 3; L++) for (let k = 0; k < n; k++) {
      const q = gen(L);
      if (q.ans < 0 || q.ans > [10, 10, 20][L]) bad.push(`nivel ${L + 1}: resultado ${q.ans}`);
      if (q.b <= 0) bad.push("sumando cero");
      if (new Set(q.opts).size !== q.opts.length || !q.opts.includes(q.ans)) bad.push("opciones");
    }
    return [...new Set(bad)];
  },
  round(level, idx, ui) {
    const q = gen(level);
    const st = document.createElement("div"); st.className = "stage sm-eq";
    st.innerHTML = `<div class="sm-big">${q.a} ${q.op} ${q.b} = <span>?</span></div>` + (level === 0 ? `<div class="sm-pics emoji">${q.e.repeat(q.a)} <b>+</b> ${q.e.repeat(q.b)}</div>` : "");
    ui.area.appendChild(st);
    const dicho = `${q.a} ${q.op === "+" ? "más" : "menos"} ${q.b}`;
    ui.prompt(`¿Cuánto es <b>${q.a} ${q.op} ${q.b}</b>?`, `¿Cuánto es ${dicho}?`);
    const showDots = () => { if (!st.querySelector(".sm-pics")) st.insertAdjacentHTML("beforeend", `<div class="sm-pics emoji">${q.op === "+" ? q.e.repeat(q.a) + " <b>+</b> " + q.e.repeat(q.b) : q.e.repeat(q.a - q.b) + `<span class="sm-off">${q.e.repeat(q.b)}</span>`}</div>`); };
    const why = `${q.a} ${q.op} ${q.b} = ${q.ans}`;
    ui.choices(q.opts, { cls: "num", cols: q.opts.length, correct: o => o === q.ans,
      onTap: o => { if (o === q.ans) st.querySelector(".sm-big span").textContent = q.ans; else showDots(); },
      why: `¡${why}!`, sayWhy: `${dicho} es ${q.ans}.`,
      hint: q.op === "+" ? `Empieza en ${Math.max(q.a, q.b)} y cuenta ${Math.min(q.a, q.b)} más.` : `Empieza en ${q.a} y cuenta ${q.b} hacia atrás.` });
    ui.timer(TIME[level], () => { showDots(); st.querySelector(".sm-big span").textContent = q.ans; document.querySelectorAll(".choice").forEach(b => b.disabled = true); ui.lose(`Se acabó el tiempo. ${why}.`, `${dicho} es ${q.ans}.`); });
  }
});
