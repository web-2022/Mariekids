/* Tema 9 · Adivinanzas · Kiki 🦉 · música: huayno suave */
const { pick, shuffle, sample } = MKU;
// [adivinanza, respuesta, nombre, distractores (no cumplen las pistas)]
const ADIV = [
  // Nivel 1: muy conocidas
  [["Tengo orejas largas, salto mucho y me encantan las zanahorias.", "🐰", "el conejo", ["🐶", "🐟", "🐔"]],
   ["Digo «miau», tengo bigotes y me gusta tomar leche.", "🐱", "el gato", ["🐮", "🐸", "🐦"]],
   ["Digo «guau» y muevo la cola cuando estoy feliz.", "🐶", "el perro", ["🐱", "🐟", "🐥"]],
   ["Soy amarillo, doy calor y alumbro el día.", "☀️", "el sol", ["🌙", "⭐", "☁️"]],
   ["Soy una fruta amarilla y larga, y a los monos les encanto.", "🍌", "el plátano", ["🍎", "🍇", "🍓"]],
   ["Tengo una trompa larga y orejas muy grandes.", "🐘", "el elefante", ["🦁", "🐭", "🐔"]],
   ["Vivo en el agua y nado con mis aletas.", "🐟", "el pez", ["🐶", "🐦", "🐰"]],
   ["Digo «muuu» y doy leche.", "🐮", "la vaca", ["🐷", "🐔", "🐸"]],
   ["Soy frío y dulce, y me comes cuando hace calor.", "🍦", "el helado", ["🍕", "🥕", "🍞"]],
   ["Tengo cuatro ruedas y llevo a la familia de paseo.", "🚗", "el carro", ["🚲", "⛵", "✈️"]],
   ["Pongo huevos y digo «cocorocó».", "🐔", "la gallina", ["🐶", "🐟", "🐷"]],
   ["Salgo de noche en el cielo y a veces soy redonda.", "🌙", "la luna", ["☀️", "🌈", "🌧️"]]],
  // Nivel 2: hay que pensar un poco más
  [["Tengo hojas pero no soy árbol, y me lees en el colegio.", "📖", "el libro", ["🌳", "🍃", "📺"]],
   ["Tengo agujas pero no coso: te digo la hora.", "🕐", "el reloj", ["🧵", "📏", "🔑"]],
   ["Floto en el cielo, soy blanca y a veces traigo lluvia.", "☁️", "la nube", ["☀️", "🎈", "⭐"]],
   ["Tengo teclas blancas y negras, y con mis teclas haces música.", "🎹", "el piano", ["🥁", "🎸", "📱"]],
   ["Me inflas, floto en el aire y si me pinchas hago «¡pum!».", "🎈", "el globo", ["⚽", "🪁", "☁️"]],
   ["Tengo caparazón y camino muy, muy despacio.", "🐢", "la tortuga", ["🐇", "🐎", "🐶"]],
   ["Soy verde por fuera, roja por dentro y tengo pepitas negras.", "🍉", "la sandía", ["🍎", "🍋", "🥝"]],
   ["Tengo muchos colores y salgo en el cielo después de la lluvia.", "🌈", "el arcoíris", ["☀️", "⭐", "🌙"]],
   ["Llevo mi casa en la espalda y dejo un caminito brillante.", "🐌", "el caracol", ["🐢", "🐛", "🐞"]],
   ["Me abres cuando llueve y te cubro de las gotas.", "☂️", "el paraguas", ["🧢", "👟", "🧤"]],
   ["Tengo el cuello muy largo y manchas en el cuerpo.", "🦒", "la jirafa", ["🐘", "🐴", "🐫"]],
   ["Tengo dos ruedas y pedales, y me manejas tú.", "🚲", "la bicicleta", ["🚗", "🛴", "🚂"]]],
  // Nivel 3: varias pistas y opciones parecidas
  [["Soy un animal de granja, tengo lana y digo «beee».", "🐑", "la oveja", ["🐮", "🐷", "🐴"]],
   ["Soy una fruta roja y pequeña, con puntitos en mi piel.", "🍓", "la fresa", ["🍒", "🍎", "🍅"]],
   ["Soy un ave que no vuela, nado en el mar frío y soy blanco y negro.", "🐧", "el pingüino", ["🦆", "🦉", "🐦"]],
   ["Soy un gato muy grande, tengo rayas negras y vivo en la selva.", "🐯", "el tigre", ["🦁", "🐱", "🦓"]],
   ["Tengo rayas blancas y negras, pero me parezco a un caballo.", "🦓", "la cebra", ["🐯", "🐴", "🐄"]],
   ["Soy un insecto, vuelo de flor en flor y hago miel.", "🐝", "la abeja", ["🦋", "🐞", "🐜"]],
   ["Soy una fruta redonda y de color naranja.", "🍊", "la naranja", ["🍋", "🍎", "🍇"]],
   ["Tengo alas pero no soy un pájaro, salgo de noche y duermo de cabeza.", "🦇", "el murciélago", ["🦉", "🐦", "🦋"]],
   ["Tengo alas, vuelo muy alto y llevo pasajeros a otros países.", "✈️", "el avión", ["🚁", "🚀", "🚂"]],
   ["Brillo de noche, no soy la luna y en el cielo hay muchísimas como yo.", "⭐", "la estrella", ["🌙", "☀️", "☁️"]],
   ["Soy verde, salto muy alto y digo «croac».", "🐸", "la rana", ["🐢", "🦎", "🐊"]],
   ["Tengo ocho brazos y vivo en el fondo del mar.", "🐙", "el pulpo", ["🦀", "🐟", "🐬"]]]
];

function gen(level, idx, used) {
  const pool = ADIV[level].filter(a => !used.has(a[1]));
  const a = pick(pool.length ? pool : ADIV[level]);
  const n = level === 0 ? 2 : 3;
  return { text: a[0], ans: a[1], name: a[2], opts: shuffle([a[1], ...sample(a[3], n)]) };
}
let used = new Set();

MKGame({
  slug: "EM-Adivinanzas", title: "Adivinanzas", short: "Adivinanzas", char: "kiki", music: "music-huayno.mp3",
  theme: { bg: "radial-gradient(circle at 85% 12%,#fef9c3 0 46px,transparent 47px),linear-gradient(180deg,#1e3a8a,#6d28d9 60%,#db2777)", a1: "#f59e0b", a2: "#7c3aed", ink: "#4c1d95", title: "#7c3aed", soft: "#ede9fe", tile: "#f5f3ff" },
  deco: ["⭐", "🌙", "✨", "⭐"],
  hello: "¡Hu-hu! Soy <b>Kiki</b> 🦉, el búho sabio. Te digo una adivinanza y tú descubres qué es. ¿Listo?",
  intro: ["Escucha la adivinanza (toca 🔊 para oírla otra vez) y elige el dibujo correcto."],
  champion: "¡Eres más sabio que un búho! 🦉",
  levels: [
    { title: "Fáciles", icon: "🐰", desc: "Animales y cosas que conoces · 3 opciones" },
    { title: "Para pensar", icon: "🤔", desc: "Adivinanzas con truco · 4 opciones" },
    { title: "Súper sabio", icon: "🦉", desc: "Varias pistas y opciones parecidas" }
  ],
  onLevel: () => { used = new Set(); },
  check() {
    const bad = [];
    ADIV.forEach((lv, L) => lv.forEach(a => {
      if (a[3].includes(a[1])) bad.push("respuesta entre distractores: " + a[2]);
      if (new Set(a[3]).size !== a[3].length) bad.push("distractor repetido: " + a[2]);
    }));
    return bad;
  },
  round(level, idx, ui) {
    const q = gen(level, idx, used); used.add(q.ans);
    const card = document.createElement("div"); card.className = "stage adv-card"; card.innerHTML = `<span class="adv-q">“</span>${q.text}<span class="adv-q">”</span>`;
    ui.area.appendChild(card);
    ui.prompt("¿Qué es? ¿Quién soy?", q.text + " ¿Quién soy?");
    ui.choices(q.opts, { cols: q.opts.length === 4 ? 2 : 3, correct: o => o === q.ans,
      why: `¡Es ${q.name}! ${q.ans}`, sayWhy: `Es ${q.name}.`,
      hint: "Vuelve a leer cada pista. ¿Qué dibujo cumple TODAS?" });
  }
});
