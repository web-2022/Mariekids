/* Tema 14 · Secuencias (procesos y rutinas) · Bimba 🐘 · música: pop alegre */
const { pick } = MKU;
const SEC = [
  [ ["De huevo a gallina", [["🥚", "Huevo"], ["🐣", "Pollito"], ["🐔", "Gallina"]]],
    ["De semilla a árbol", [["🌰", "Semilla"], ["🌱", "Plantita"], ["🌳", "Árbol"]]],
    ["Un día", [["🌅", "Amanece"], ["☀️", "Mediodía"], ["🌙", "Noche"]]],
    ["Comer un plátano", [["🍌", "Pelo el plátano"], ["😋", "Me lo como"], ["🗑️", "Boto la cáscara"]]],
    ["Ponerse los zapatos", [["🧦", "Me pongo las medias"], ["👟", "Me pongo las zapatillas"], ["🎀", "Me amarro los pasadores"]]],
    ["El desayuno", [["🥣", "Pongo el cereal"], ["🥛", "Echo la leche"], ["🥄", "Me lo como"]]],
    ["Lavarse las manos", [["🚰", "Me mojo las manos"], ["🧼", "Me echo jabón"], ["🧻", "Me seco las manos"]]],
    ["Una vela", [["🕯️", "Vela nueva"], ["🔥", "Se prende"], ["💨", "Se apaga"]]] ],
  [ ["Así crecemos", [["👶", "Bebé"], ["🧒", "Niño"], ["🧑", "Adulto"], ["👴", "Abuelo"]]],
    ["Hacer limonada", [["🍋", "Exprimo los limones"], ["💧", "Echo agua"], ["🥄", "Mezclo con azúcar"], ["🥤", "Sirvo la limonada"]]],
    ["El viaje del agua", [["☀️", "El sol calienta el agua"], ["☁️", "Se forman las nubes"], ["🌧️", "Llueve"], ["🏞️", "El agua vuelve al río"]]],
    ["Al despertar", [["⏰", "Suena el despertador"], ["🛏️", "Me levanto"], ["🚿", "Me baño"], ["👕", "Me visto"]]],
    ["Hacer una pizza", [["🥣", "Preparo la masa"], ["🍅", "Le pongo salsa"], ["🧀", "Le pongo queso"], ["🔥", "La horneo"]]],
    ["Cepillarse los dientes", [["🪥", "Pongo pasta en el cepillo"], ["😁", "Me cepillo los dientes"], ["🚰", "Me enjuago la boca"], ["✨", "¡Dientes limpios!"]]],
    ["Plantar una flor", [["🕳️", "Hago un hoyito"], ["🌰", "Pongo la semilla"], ["💧", "La riego"], ["🌷", "Sale una flor"]]] ],
  [ ["La flor crece", [["🌰", "Siembro la semilla"], ["💧", "La riego"], ["🌱", "Sale un brote"], ["🌿", "Crece la planta"], ["🌻", "¡Sale la flor!"]]],
    ["Lavar la ropa", [["🧺", "Junto la ropa sucia"], ["🫧", "La lavo"], ["☀️", "La seco al sol"], ["👕", "La doblo"], ["🗄️", "La guardo"]]],
    ["Hacer una torta", [["🥚", "Junto los ingredientes"], ["🥣", "Los mezclo"], ["🔥", "Horneo la masa"], ["🍫", "La decoro"], ["🎂", "¡A comer torta!"]]],
    ["Ir al colegio", [["⏰", "Me despierto"], ["🥣", "Tomo desayuno"], ["🎒", "Agarro mi mochila"], ["🚌", "Subo al bus"], ["🏫", "Llego al colegio"]]],
    ["La vida del pollito", [["🐔", "La gallina pone un huevo"], ["🥚", "El huevo está en el nido"], ["🐣", "El pollito sale del huevo"], ["🐥", "El pollito crece"], ["🐓", "Se vuelve un gallo"]]],
    ["Mi día", [["🌅", "Amanece"], ["🏫", "Voy al colegio"], ["🍽️", "Almuerzo"], ["🌇", "Atardece"], ["🌙", "Me voy a dormir"]]],
    ["Un regalo pintado", [["✏️", "Hago un dibujo"], ["🖌️", "Lo pinto"], ["☀️", "Dejo que seque"], ["🖼️", "Le pongo marco"], ["🎁", "Lo regalo"]]] ]
];
let used = new Set();
const card = s => `<span class="emoji">${s[0]}</span><span class="cap">${s[1]}</span>`;

MKGame({
  slug: "EM-Secuencias", title: "Secuencias", short: "Secuencias", char: "bimba", music: "music-pop.mp3",
  theme: { bg: "linear-gradient(180deg,#a7f3d0,#bfdbfe 50%,#ddd6fe)", a1: "#10b981", a2: "#6366f1", ink: "#1e3a8a", title: "#4f46e5", soft: "#e0e7ff", tile: "#eef2ff" },
  deco: ["🌱", "☀️", "🌷", "⭐"],
  hello: "¡Hola! Soy <b>Bimba</b> 🐘. Las cosas pasan <b>en orden</b>, paso a paso. ¿Me ayudas a ordenarlas?",
  intro: ["Toca los pasos en orden: <b>primero, después… y al final</b>."],
  champion: "¡Eres experto en ordenar! 🧩",
  levels: [
    { title: "3 pasos", icon: "1️⃣", desc: "Procesos cortos" },
    { title: "4 pasos", icon: "2️⃣", desc: "Rutinas y cosas que crecen" },
    { title: "5 pasos", icon: "3️⃣", desc: "Procesos largos" }
  ],
  onLevel: () => { used = new Set(); },
  check() {
    const bad = [];
    SEC.forEach((lv, L) => lv.forEach(h => { if (h[1].length !== L + 3) bad.push(`«${h[0]}» no tiene ${L + 3} pasos`); }));
    return bad;
  },
  round(level, idx, ui) {
    const pool = SEC[level].filter(h => !used.has(h[0]));
    const h = pick(pool.length ? pool : SEC[level]); used.add(h[0]);
    ui.prompt(`🧩 <b>${h[0]}</b>: ¿qué va primero?`, `${h[0]}. ¿Qué va primero?`);
    ui.order(h[1], {
      cols: level === 1 ? 2 : 3, render: card, onPlace: s => ui.say(s[1]),
      why: "¡Perfecto! " + h[1].map(s => s[1]).join(" → ") + ".", sayWhy: "¡Perfecto! Todo está en orden.",
      hint: k => k === 0 ? "¿Con qué se empieza? Piensa en lo que pasa antes de todo." : `¿Qué viene justo después de «${h[1][k - 1][1]}»?`
    });
  }
});
