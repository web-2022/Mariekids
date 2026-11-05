/* Tema 12 · Ordena la historia · Kiki 🦉 · música: cuento */
const { pick, shuffle } = MKU;
// Historias de Los Mentecitos: [título, [[emoji, texto], ...]] en el orden correcto
const HIST = [
  [ ["El helado de Mika", [["🍦", "Mika compra un helado"], ["😋", "Mika se come el helado"], ["🧻", "Mika se limpia la boca"]]],
    ["El gol de Coco", [["⚽", "Coco patea la pelota"], ["🥅", "La pelota entra al arco"], ["🎉", "Coco celebra el gol"]]],
    ["Día de lluvia", [["🌧️", "Empieza a llover"], ["☂️", "Lula abre su paraguas"], ["🌈", "Sale el arcoíris"]]],
    ["El cumpleaños de Pipo", [["🎂", "Traen la torta"], ["🕯️", "Pipo sopla las velas"], ["🍰", "Todos comen torta"]]],
    ["El perrito con hambre", [["🐶", "El perrito tiene hambre"], ["🥣", "Bimba le sirve comida"], ["😴", "El perrito duerme feliz"]]],
    ["El dibujo de Kiki", [["✏️", "Kiki dibuja una casa"], ["🖍️", "Kiki la pinta de colores"], ["🖼️", "Kiki la cuelga en la pared"]]],
    ["Tito y el barro", [["🟫", "Tito juega en el barro"], ["🛁", "Tito se baña"], ["✨", "Tito queda limpiecito"]]],
    ["La semilla de Rayo", [["🌰", "Rayo siembra una semilla"], ["💧", "Rayo la riega"], ["🌻", "Crece una flor"]]] ],
  [ ["Pipo va a la playa", [["🎒", "Pipo prepara su mochila"], ["🚌", "Pipo viaja en bus"], ["🏖️", "Pipo llega a la playa"], ["🏊", "Pipo nada en el mar"]]],
    ["Coco hace pan", [["🥣", "Coco mezcla la harina"], ["👐", "Coco amasa la masa"], ["🔥", "Coco hornea el pan"], ["🍞", "Coco come pan calientito"]]],
    ["La cometa de Lula", [["🪁", "Lula arma su cometa"], ["🌬️", "Sopla el viento"], ["☁️", "La cometa vuela alto"], ["😄", "Lula ríe feliz"]]],
    ["Mika busca su pelota", [["😿", "Mika no encuentra su pelota"], ["🔍", "Mika busca con su lupa"], ["🛋️", "¡Estaba debajo del sofá!"], ["😺", "Mika juega otra vez"]]],
    ["La carta de Bimba", [["✉️", "Bimba escribe una carta"], ["📮", "La pone en el buzón"], ["📬", "La carta llega a la abuela"], ["😊", "La abuela la lee feliz"]]],
    ["Rayo está resfriado", [["🤧", "Rayo estornuda mucho"], ["🌡️", "Mamá le toma la temperatura"], ["🛌", "Rayo descansa en cama"], ["💪", "Rayo se siente mejor"]]],
    ["Kiki y el árbol", [["🍎", "Kiki ve una manzana en el árbol"], ["🪜", "Trae una escalera"], ["🧺", "Pone la manzana en su canasta"], ["😋", "Kiki se come la manzana"]]] ],
  [ ["Kiki va al mercado", [["📝", "Kiki hace su lista"], ["🛒", "Kiki va al mercado"], ["🍎", "Kiki compra frutas"], ["🏠", "Kiki vuelve a casa"], ["🥗", "Kiki prepara una ensalada"]]],
    ["El robot de Tito", [["📐", "Tito dibuja su idea"], ["🔩", "Tito junta las piezas"], ["🔧", "Tito arma el robot"], ["🔋", "Le pone las pilas"], ["🤖", "¡El robot camina!"]]],
    ["La fiesta de Lula", [["💌", "Lula envía invitaciones"], ["🎈", "Lula decora con globos"], ["🚪", "Llegan sus amigos"], ["🎶", "Todos bailan"], ["👋", "Se despiden felices"]]],
    ["Pipo y la nieve", [["❄️", "Empieza a nevar"], ["🧤", "Pipo se pone guantes"], ["⛄", "Pipo arma un muñeco de nieve"], ["🥕", "Le pone nariz de zanahoria"], ["📸", "Pipo le toma una foto"]]],
    ["Coco se va a dormir", [["📚", "Coco elige un cuento"], ["🛏️", "Coco se acuesta"], ["📖", "Coco lee el cuento"], ["🥱", "A Coco le da sueño"], ["😴", "Coco se duerme"]]],
    ["Bimba hornea galletas", [["🥚", "Bimba junta huevos y harina"], ["🥣", "Mezcla todo en un tazón"], ["🍪", "Forma las galletas"], ["🔥", "Las hornea"], ["😋", "Comparte las galletas"]]] ]
];
let used = new Set();
const NOMBRES = /^(¡)?(Mika|Tito|Lula|Pipo|Bimba|Kiki|Coco|Rayo|Mamá)\b/;
const card = s => `<span class="emoji">${s[0]}</span><span class="cap">${s[1]}</span>`;

MKGame({
  slug: "EM-OrdenaLaHistoria", title: "Ordena la historia", short: "Historias", char: "kiki", music: "music-cuento.mp3",
  theme: { bg: "radial-gradient(circle at 20% 12%,#fff 0 30px,transparent 31px),linear-gradient(180deg,#fbcfe8,#e9d5ff 50%,#bfdbfe)", a1: "#a855f7", a2: "#ec4899", ink: "#581c87", title: "#9333ea", soft: "#f3e8ff", tile: "#faf5ff" },
  deco: ["📖", "✨", "🌙", "📚"],
  hello: "¡Hu-hu! Soy <b>Kiki</b> 🦉. ¡Se me mezclaron las páginas de mis cuentos! ¿Me ayudas a ordenarlas?",
  intro: ["Toca las escenas en orden: <b>¿qué pasó primero, después y al final?</b>"],
  champion: "¡Eres un gran cuentacuentos! 📖",
  levels: [
    { title: "Cuentos cortitos", icon: "📗", desc: "Historias de 3 escenas" },
    { title: "Cuentos medianos", icon: "📘", desc: "Historias de 4 escenas" },
    { title: "Cuentos largos", icon: "📙", desc: "Historias de 5 escenas" }
  ],
  onLevel: () => { used = new Set(); },
  check() {
    const bad = [];
    HIST.forEach((lv, L) => lv.forEach(h => { if (h[1].length !== L + 3) bad.push(`«${h[0]}» no tiene ${L + 3} escenas`); }));
    return bad;
  },
  round(level, idx, ui) {
    const pool = HIST[level].filter(h => !used.has(h[0]));
    const h = pick(pool.length ? pool : HIST[level]); used.add(h[0]);
    ui.prompt(`📖 <b>${h[0]}</b>: ¿qué pasó primero?`, `${h[0]}. Ordena la historia. ¿Qué pasó primero?`);
    ui.order(h[1], {
      cols: level === 2 ? 3 : h[1].length === 4 ? 2 : 3,
      render: card,
      onPlace: (s, i) => ui.say(s[1]),
      why: "¡La historia está en orden! " + h[1].map((s, i) => i === 0 || NOMBRES.test(s[1]) ? s[1] : s[1][0].toLowerCase() + s[1].slice(1)).join(", luego ").replace(/!,/g, "!") + ".",
      sayWhy: "La historia está en orden.",
      hint: k => k === 0 ? "¿Cómo empieza la historia? Busca lo que pasa al principio." : "¿Qué pasa justo después? Piensa en lo que ya ocurrió."
    });
  }
});
