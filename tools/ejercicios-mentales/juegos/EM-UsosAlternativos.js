/* Tema 19 · Usos alternativos (creatividad) · Coco 🐒 · música: funk infantil */
const { pick, shuffle, sample } = MKU;
// [emoji, nombre, usos creativos POSIBLES, usos IMPOSIBLES]
const OBJ = [
  ["🪣", "un balde", ["🥁 Tocarlo como tambor", "🏰 Hacer castillos de arena"], ["✈️ Volar por el cielo", "📺 Ver dibujos animados"]],
  ["📦", "una caja de cartón", ["🚀 Jugar a que es un cohete", "🏠 Hacer una casita para muñecos"], ["🍕 Comérsela", "🎵 Escuchar música en ella"]],
  ["🥄", "una cuchara", ["🥁 Tocar ritmo en una olla", "🌱 Remover la tierra de una maceta"], ["🚲 Pasear en ella", "📞 Llamar por teléfono"]],
  ["🧦", "una media vieja", ["🧸 Hacer un títere", "🧽 Limpiar el polvo"], ["🍦 Comerla como helado", "💡 Alumbrar el cuarto"]],
  ["🧴", "una botella de plástico", ["🌱 Hacer una maceta", "🎳 Jugar a los bolos"], ["🛏️ Dormir adentro", "🎂 Comerla de postre"]],
  ["🗞️", "un periódico", ["🎩 Hacer un gorro de papel", "⛵ Hacer un barquito"], ["🍝 Cocinarlo", "🔦 Usarlo de linterna"]],
  ["🪵", "un palito", ["✏️ Dibujar en la arena", "🏳️ Hacer una banderita"], ["📺 Ver la tele en él", "🥛 Tomarlo como leche"]],
  ["🧻", "un rollo de papel", ["🔭 Jugar a que es un telescopio", "🐛 Hacer una oruga de manualidad"], ["🚗 Manejarlo como carro", "🍳 Freír huevos"]],
  ["🥫", "una lata vacía", ["🖍️ Guardar los colores", "📞 Hacer un teléfono con hilo"], ["🐶 Tenerla de mascota que ladra", "🌙 Encender la luna"]],
  ["🧺", "una canasta", ["🧸 Guardar juguetes", "🏀 Jugar a encestar pelotas"], ["🚀 Viajar al espacio", "📖 Leerla como libro"]],
  ["🪨", "una piedra lisa", ["🎨 Pintarle una carita", "📄 Sujetar papeles con viento"], ["🍞 Comerla en el desayuno", "🎈 Inflarla como globo"]],
  ["☂️", "un paraguas", ["☀️ Taparte del sol", "💃 Bailar en un show"], ["🍲 Cocinar sopa", "✏️ Escribir con él"]],
  ["🧽", "una esponja", ["🎨 Pintar haciendo sellos", "🚗 Lavar un carrito"], ["🍔 Comerla", "🎧 Escuchar música"]],
  ["🍽️", "un plato de cartón", ["🎭 Hacer una máscara", "🥏 Lanzarlo como disco"], ["🛌 Dormir encima", "🚌 Ir en él al colegio"]]
];
const SIEMPRE = ["🎨 Dibujarlo en una hoja", "📸 Tomarle una foto", "🔍 Mirarlo con atención"];
const IMPOSIBLE_GENERAL = ["🦖 Que se convierta en dinosaurio", "🌈 Hacer que salga el arcoíris", "🐉 Que vuele como dragón"];

function gen(level) {
  const [e, name, pos, imp] = pick(OBJ);
  if (level < 2) {
    const n = level === 0 ? 2 : 3;
    const bad = sample([...imp, ...IMPOSIBLE_GENERAL], n);
    const good = pick(pos);
    return { e, name, ask: "si", ans: good, opts: shuffle([good, ...bad]) };
  }
  const wrong = pick(imp);
  return { e, name, ask: "no", ans: wrong, opts: shuffle([wrong, ...pos, pick(SIEMPRE)]) };
}
const split = t => { const i = t.indexOf(" "); return [t.slice(0, i), t.slice(i + 1)]; };
const box = t => { const [e, s] = split(t); return `<span class="emoji ua-e">${e}</span><span class="ua-t">${s}</span>`; };

MKGame({
  slug: "EM-UsosAlternativos", title: "Usos alternativos", short: "Creatividad", char: "coco", music: "music-funk.mp3",
  theme: { bg: "linear-gradient(135deg,#fde047,#fb923c 40%,#f472b6 75%,#a855f7)", a1: "#f97316", a2: "#c026d3", ink: "#701a75", title: "#c026d3", soft: "#fae8ff", tile: "#fdf4ff" },
  deco: ["💡", "🎨", "✂️", "💡"],
  hello: "¡Hola! Soy <b>Coco</b> 🐒. ¡Con imaginación, las cosas sirven para muchas cosas! ¿Qué más podemos hacer con ellas?",
  intro: ["Piensa en <b>otros usos</b> para cosas de casa. Algunos son posibles… ¡y otros son imposibles!"],
  champion: "¡Tienes una imaginación gigante! 💡",
  levels: [
    { title: "¿Qué se puede?", icon: "💡", desc: "Elige el uso posible · 3 opciones" },
    { title: "Inventor", icon: "🛠️", desc: "Elige el uso posible · 4 opciones" },
    { title: "¿Cuál no se puede?", icon: "🚫", desc: "Encuentra el uso imposible" }
  ],
  check(n) {
    const bad = [];
    for (let L = 0; L < 3; L++) for (let k = 0; k < n; k++) {
      const q = gen(L);
      if (new Set(q.opts).size !== q.opts.length || q.opts.filter(o => o === q.ans).length !== 1) bad.push("opciones mal");
    }
    return [...new Set(bad)];
  },
  round(level, idx, ui) {
    const q = gen(level);
    const st = document.createElement("div"); st.className = "stage ua-obj"; st.innerHTML = `<span class="emoji">${q.e}</span><b>${q.name}</b>`; ui.area.appendChild(st);
    if (q.ask === "si") ui.prompt(`¿Qué <b>sí</b> podrías hacer con ${q.name}?`);
    else ui.prompt(`¿Qué <b>NO</b> se puede hacer con ${q.name}?`);
    const [, txt] = split(q.ans);
    ui.choices(q.opts, { cols: 1, cls: "ua-opt", render: box, correct: o => o === q.ans,
      why: q.ask === "si" ? `¡Claro! Con ${q.name} puedes ${txt.toLowerCase()}. ¡Qué creativo!` : `¡Exacto! Eso es imposible: ${txt.toLowerCase()}. Las otras cosas sí se pueden hacer.`,
      hint: q.ask === "si" ? "Imagina que lo tienes en tus manos: ¿qué podrías hacer de verdad?" : "Busca la que nunca podría pasar en la vida real." });
  }
});
