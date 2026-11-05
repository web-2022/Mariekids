/* Tema 20 · Comparar soluciones · Lula 🦙 · música: acústica (ukelele) */
const { pick, shuffle, sample } = MKU;
// [situación, mejor solución, solución regular (sirve un poco), [malas soluciones], por qué]
const SIT = [
  ["💧 Se derramó agua en el piso.", "🧽 Lo seco con un trapo", "🧦 Lo seco con mi media", ["🏃 Corro encima del agua", "🙈 Lo dejo así"], "Así nadie se resbala y el piso queda limpio."],
  ["🤕 Tu amigo se cayó en el patio.", "🤝 Lo ayudo a levantarse y le pregunto si está bien", "🗣️ Le digo «levántate» desde lejos", ["😂 Me río de él", "🏃 Me voy corriendo"], "Ayudar y preguntar es lo más amable."],
  ["🧩 No sabes armar un rompecabezas.", "🙋 Pido ayuda y lo intento pieza por pieza", "😤 Lo intento una sola vez y lo dejo", ["💥 Lo tiro al piso", "😭 Lloro sin intentarlo"], "Con paciencia y ayuda se aprende."],
  ["🌧️ Va a llover y tienes que salir.", "☂️ Llevo paraguas y casaca", "🧢 Me pongo solo una gorra", ["🩴 Salgo en sandalias y short", "🏊 Salgo a mojarme a propósito"], "Así no me mojo ni me resfrío."],
  ["🍪 Hay una sola galleta y son dos amigos.", "✂️ La partimos por la mitad", "🕐 Uno la come hoy y otro mañana", ["😠 Me la como yo solo", "🤼 Nos peleamos por ella"], "Compartiendo, los dos quedan contentos."],
  ["📚 Tienes tarea y quieres jugar.", "✅ Primero termino la tarea y luego juego", "🎮 Juego un ratito y después hago la tarea", ["🙅 No hago la tarea", "🗑️ Escondo el cuaderno"], "Así juego tranquilo y sin preocupaciones."],
  ["🔥 Ves una olla caliente en la cocina.", "🙌 No la toco y le aviso a un adulto", "👀 Me alejo sin decir nada", ["✋ La toco con la mano", "🥄 Pruebo la sopa hirviendo"], "Las cosas calientes queman: hay que avisar a un adulto."],
  ["🧸 Tu hermanito quiere tu juguete.", "🤗 Jugamos juntos por turnos", "⏳ Se lo presto cuando yo termine", ["😡 Le grito", "🙅 Lo escondo para que no lo vea"], "Por turnos, los dos pueden jugar."],
  ["🍦 Terminaste tu helado y queda el palito.", "🗑️ Boto el palito en el tacho", "🎒 Lo guardo para botarlo después", ["🌳 Lo tiro al pasto", "🪟 Lo tiro por la ventana"], "La basura va al tacho y el parque queda limpio."],
  ["🦷 Te duele una muela.", "👩 Le digo a mamá para ir al dentista", "🧊 Me pongo hielo y espero", ["🍬 Como más dulces", "🤐 No le digo a nadie"], "El dentista sabe curar las muelas."],
  ["🌱 La plantita está seca.", "💧 La riego con un poco de agua", "🌞 La pongo al sol sin regarla", ["✂️ La corto", "🧃 La riego con jugo"], "Las plantas necesitan agua para vivir."],
  ["😢 Un compañero está triste.", "🫂 Le pregunto qué le pasa y lo acompaño", "🍬 Le regalo un dulce sin hablarle", ["😝 Le saco la lengua", "🙄 Lo ignoro"], "Escuchar y acompañar ayuda a sentirse mejor."],
  ["🥶 Hace mucho frío afuera.", "🧥 Me pongo casaca, gorro y bufanda", "👕 Me pongo solo un polo más", ["🩳 Salgo en short", "🍦 Como helado afuera"], "Bien abrigado no me resfrío."],
  ["🚦 Quieres cruzar la pista.", "🚸 Cruzo con un adulto cuando el semáforo está en verde", "👀 Miro a los lados y espero en la vereda", ["🏃 Cruzo corriendo solo", "📱 Cruzo mirando el celular"], "Con un adulto y en verde, cruzamos seguros."],
  ["🎒 Mañana hay colegio.", "🌙 Preparo mi mochila en la noche", "⏰ La preparo en la mañana con prisa", ["🙈 No la preparo", "🧸 Meto solo juguetes"], "Así no me olvido nada y llego a tiempo."]
];
const split = t => { const i = t.indexOf(" "); return [t.slice(0, i), t.slice(i + 1)]; };
const box = t => { const [e, s] = split(t); return `<span class="emoji cs-e">${e}</span><span class="cs-t">${s}</span>`; };

function gen(level, used) {
  const pool = SIT.filter(s => !used.has(s[0]));
  const s = pick(pool.length ? pool : SIT);
  let opts;
  if (level === 0) opts = [s[1], ...sample(s[3], 2)];
  else if (level === 1) opts = [s[1], ...s[3], s[2]].slice(0, 4);
  else opts = [s[1], s[2], ...sample(s[3], 1), pick(SIT.filter(x => x !== s))[2]];   // dos «regulares» que confunden
  return { s, opts: shuffle(opts), ans: s[1] };
}
let used = new Set();

MKGame({
  slug: "EM-CompararSoluciones", title: "Comparar soluciones", short: "Soluciones", char: "lula", music: "music-ukelele.mp3",
  theme: { bg: "linear-gradient(180deg,#fecdd3,#fde68a 50%,#bbf7d0)", a1: "#e11d48", a2: "#16a34a", ink: "#14532d", title: "#be123c", soft: "#ffe4e6", tile: "#fff1f2" },
  deco: ["💡", "🤝", "🌈", "💡"],
  hello: "¡Hola! Soy <b>Lula</b> 🦙. Cuando hay un problema, hay varias soluciones… ¡pero una es la <b>mejor</b>! ¿Me ayudas a elegirla?",
  intro: ["Lee el problema y piensa: ¿cuál solución es la más <b>segura</b>, <b>amable</b> y que <b>sí funciona</b>?"],
  champion: "¡Siempre eliges la mejor solución! 🌟",
  levels: [
    { title: "La buena idea", icon: "👍", desc: "1 buena y 2 malas" },
    { title: "Piensa bien", icon: "🤔", desc: "4 opciones, una regular" },
    { title: "La mejor de todas", icon: "🏆", desc: "Hay opciones que sirven un poco…" }
  ],
  onLevel: () => { used = new Set(); },
  check(n) {
    const bad = [];
    for (let L = 0; L < 3; L++) for (let k = 0; k < n; k++) {
      const q = gen(L, new Set());
      if (new Set(q.opts).size !== q.opts.length || q.opts.filter(o => o === q.ans).length !== 1) bad.push("opciones mal");
    }
    if (SIT.some(s => SIT.some(t => t !== s && (t[2] === s[1] || t[1] === s[1])))) bad.push("mejor solución repetida");
    return [...new Set(bad)];
  },
  round(level, idx, ui) {
    const q = gen(level, used); used.add(q.s[0]);
    const st = document.createElement("div"); st.className = "stage cs-sit"; st.innerHTML = box(q.s[0]); ui.area.appendChild(st);
    const [, sitTxt] = split(q.s[0]);
    ui.prompt("¿Cuál es la <b>mejor</b> solución?", sitTxt + " ¿Cuál es la mejor solución?");
    ui.choices(q.opts, { cols: 1, cls: "cs-opt", render: box, correct: o => o === q.ans,
      why: `${split(q.ans)[1]}. ${q.s[4]}`, hint: "Piensa: ¿es segura?, ¿es amable?, ¿de verdad resuelve el problema?" });
  }
});
