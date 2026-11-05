/* Tema 13 · ¿Por qué pasó? (causa y efecto) · Kiki 🦉 · música: lo-fi tranquilo */
const { pick, shuffle, sample } = MKU;
// [grupo, causa, efecto]: los distractores siempre vienen de otro grupo, para que haya una sola respuesta
const PARES = [
  ["agua", "🌧️ Llovió mucho", "💧 Hay charcos en la calle"],
  ["calor", "☀️ Hizo mucho calor", "🍦 El helado se derritió"],
  ["calor", "🧊 Dejé el hielo al sol", "💧 El hielo se volvió agua"],
  ["planta", "🚿 Regué la planta todos los días", "🌻 La planta creció"],
  ["cansado", "🏃 Corrí muy rápido en el patio", "😮‍💨 Me cansé y respiro rápido"],
  ["hambre", "⏰ No tomé desayuno", "🍽️ Tengo mucha hambre"],
  ["frio", "🥶 Hace mucho frío", "🧣 Me puse chompa y bufanda"],
  ["viento", "🌬️ Sopló un viento fuerte", "🍂 Se cayeron las hojas del árbol"],
  ["globo", "🎈 Solté el globo", "☁️ El globo se fue volando"],
  ["cocina", "🔥 La olla se quedó mucho en el fuego", "🍳 La comida se quemó"],
  ["rompe", "🥚 Se me cayó el huevo al piso", "💥 El huevo se rompió"],
  ["estudio", "📚 Practiqué mucho para el examen", "🏅 Me fue muy bien en el examen"],
  ["higiene", "🪥 Me lavé bien los dientes", "✨ Mis dientes están limpios"],
  ["perro", "🐕 Llegó alguien a la puerta", "🐶 El perro ladró"],
  ["noche", "🌙 Ya es de noche", "😴 Me dio sueño"],
  ["pila", "🔋 Se acabaron las pilas", "🔦 La linterna no prende"],
  ["amigo", "🧸 Compartí mis juguetes", "😊 Mi amigo se puso feliz"],
  ["planta2", "🌵 Nadie regó la planta", "🥀 La planta se secó"],
  ["suelo", "🧃 Se volcó el jugo", "🫗 El piso quedó mojado y pegajoso"],
  ["ropa", "🟫 Jugué en el barro", "👕 Mi ropa se ensució"]
];

// grupos que se podrían confundir (una causa podría explicar el efecto del otro)
const CHOCAN = [["agua", "suelo"], ["planta", "planta2"], ["calor", "cansado"], ["cansado", "noche"], ["cansado", "hambre"],
  ["frio", "viento"], ["globo", "viento"], ["planta2", "calor"], ["ropa", "suelo"], ["agua", "ropa"], ["calor", "suelo"]];
const choca = (a, b) => CHOCAN.some(([x, y]) => (x === a && y === b) || (x === b && y === a));

function gen(level) {
  const p = pick(PARES);
  const others = PARES.filter(x => x[0] !== p[0] && !choca(x[0], p[0]));
  const dir = level === 0 ? "causa" : level === 1 ? "efecto" : pick(["causa", "efecto"]);
  const n = level === 2 ? 3 : 2;
  if (dir === "causa") return { dir, show: p[2], ans: p[1], opts: shuffle([p[1], ...sample(others, n).map(x => x[1])]) };
  return { dir, show: p[1], ans: p[2], opts: shuffle([p[2], ...sample(others, n).map(x => x[2])]) };
}
const split = t => { const i = t.indexOf(" "); return [t.slice(0, i), t.slice(i + 1)]; };
const box = t => { const [e, s] = split(t); return `<span class="emoji ce-e">${e}</span><span class="ce-t">${s}</span>`; };

MKGame({
  slug: "EM-CausaYEfecto", title: "¿Por qué pasó?", short: "Causa y efecto", char: "kiki", music: "music-lofi.mp3",
  theme: { bg: "linear-gradient(180deg,#fef3c7,#fde68a 40%,#fdba74)", a1: "#f59e0b", a2: "#b45309", ink: "#78350f", title: "#b45309", soft: "#fef3c7", tile: "#fffbeb" },
  deco: ["💡", "🌧️", "☀️", "💡"],
  hello: "¡Hu-hu! Soy <b>Kiki</b> 🦉. Todo lo que pasa tiene una razón. ¿Descubrimos <b>por qué pasan</b> las cosas?",
  intro: ["La <b>causa</b> es lo que hace que algo pase. El <b>efecto</b> es lo que pasó después."],
  champion: "¡Eres un pequeño científico! 🔬",
  levels: [
    { title: "¿Por qué pasó?", icon: "🔎", desc: "Busca la causa · 3 opciones" },
    { title: "¿Qué pasará?", icon: "🔮", desc: "Adivina el efecto · 3 opciones" },
    { title: "Científico", icon: "🔬", desc: "Causas y efectos · 4 opciones" }
  ],
  check(n) {
    const bad = [];
    for (let L = 0; L < 3; L++) for (let k = 0; k < n; k++) {
      const q = gen(L);
      if (new Set(q.opts).size !== q.opts.length) bad.push("opción repetida");
      if (q.opts.filter(o => o === q.ans).length !== 1) bad.push("respuesta no única");
    }
    return [...new Set(bad)];
  },
  round(level, idx, ui) {
    const q = gen(level);
    const st = document.createElement("div"); st.className = "stage ce-show"; st.innerHTML = box(q.show); ui.area.appendChild(st);
    const [, showTxt] = split(q.show), [, ansTxt] = split(q.ans);
    if (q.dir === "causa") ui.prompt("<b>¿Por qué pasó?</b>", `${showTxt}. ¿Por qué pasó?`);
    else ui.prompt("<b>¿Qué pasará después?</b>", `${showTxt}. ¿Qué pasará después?`);
    ui.choices(q.opts, { cols: 1, cls: "ce-opt", render: box, correct: o => o === q.ans,
      why: q.dir === "causa" ? `${ansTxt}… ¡por eso ${showTxt.toLowerCase()}!` : `${showTxt}… y por eso ${ansTxt.toLowerCase()}.`,
      hint: q.dir === "causa" ? "¿Cuál de estas cosas podría hacer que eso pase?" : "Imagina la escena: ¿qué pasaría justo después?" });
  }
});
