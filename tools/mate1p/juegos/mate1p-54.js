/* Tema 54 · Calendario, días y periodicidad · Kiki */
const D = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
const M = [["enero", 31], ["febrero", 28], ["marzo", 31], ["abril", 30], ["mayo", 31], ["junio", 30], ["julio", 31], ["agosto", 31], ["setiembre", 30], ["octubre", 31], ["noviembre", 30], ["diciembre", 31]];
const dOpts = ans => shuffle([ans, ...sample(D.filter(x => x !== ans), 3)]);
const GEN = [
  [
    () => { const i = rnd(7), t = pick(["ayer", "mañana"]), ans = t === "ayer" ? D[(i + 1) % 7] : D[(i + 6) % 7];
      return { prompt: t === "ayer" ? `Ayer fue <b>${D[i]}</b>. ¿Qué día es hoy?` : `Mañana será <b>${D[i]}</b>. ¿Qué día es hoy?`, say: t === "ayer" ? `Ayer fue ${D[i]}. ¿Qué día es hoy?` : `Mañana será ${D[i]}. ¿Qué día es hoy?`, scene: "", ans, opts: dOpts(ans), cols: 2, cls: "grp", why: `Hoy es ${ans}.`, hint: "Ayer va antes de hoy; mañana va después." }; },
    () => { const q = pick([["¿Cuántos días tiene una semana?", 7, [5, 6, 7, 10]], ["¿Cuántos meses tiene un año?", 12, [10, 11, 12, 7]], ["¿Cuántos días tiene el mes de abril?", 30, [28, 29, 30, 31]]]);
      return { prompt: q[0], say: q[0], scene: "", ans: q[1], opts: q[2], cols: 4, why: `${q[1]}.`, hint: "Piensa en el calendario." }; },
  ],
  [
    () => { const st = rnd(7), m = pick(M), k = between(2, m[1]), ans = D[(st + k - 1) % 7];
      return { prompt: `En este calendario, ¿qué día de la semana es el <b>${k}</b> de ${m[0]}?`, say: `¿Qué día de la semana es el ${k} de ${m[0]}?`, scene: calendar(m[0].toUpperCase(), st, m[1], { [k]: "❓" }), ans, opts: dOpts(ans), cols: 2, cls: "grp", why: `El ${k} cae en ${ans}.`, hint: "Sube por la columna hasta la letra del día." }; },
  ],
  [
    () => { const s = rnd(7), a = between(3, 12), b = a + between(7, 18), ans = D[(s + b - a) % 7];
      return { prompt: `César cumple años el <b>${D[s]} ${a}</b> de mayo y Jorge el <b>${b}</b> de mayo. ¿Qué día de la semana cumple años Jorge?`, say: `César cumple el ${D[s]} ${a} de mayo y Jorge el ${b} de mayo. ¿Qué día cumple Jorge?`, scene: "", ans, opts: dOpts(ans), cols: 2, cls: "grp",
        why: `Del ${a} al ${b} pasan ${b - a} días. ${b - a} = ${Math.floor((b - a) / 7)} semana${Math.floor((b - a) / 7) === 1 ? "" : "s"} y ${(b - a) % 7} día${(b - a) % 7 === 1 ? "" : "s"}: ${ans}.`, hint: "Cada 7 días se repite el mismo día de la semana." }; },
    () => { const i = rnd(7), n = between(8, 20), ans = D[(i + n) % 7];
      return { prompt: `Hoy es <b>${D[i]}</b>. ¿Qué día será dentro de <b>${n}</b> días?`, say: `Hoy es ${D[i]}. ¿Qué día será dentro de ${n} días?`, scene: "", ans, opts: dOpts(ans), cols: 2, cls: "grp", why: `${n} días = ${Math.floor(n / 7)} semana${Math.floor(n / 7) === 1 ? "" : "s"} y ${n % 7} día${n % 7 === 1 ? "" : "s"} más: ${ans}.`, hint: "Quita las semanas completas (7, 14…) y cuenta lo que sobra." }; },
  ]
];
lesson({ n: 54, title: "Calendario, días y periodicidad", short: "Calendario", char: "kiki", music: "cuento", deco: ["📅", "🗓️", "☀️", "🌙"],
  hello: "¡Hola! Soy <b>Kiki</b> 🐧. La semana tiene 7 días y el año 12 meses. ¡Aprendamos a usar el <b>calendario</b>!",
  levels: LEVELS3(["Días y meses", "Ayer, hoy y mañana"], ["Leer el calendario", "¿Qué día cae?"], ["", "Cumpleaños y días que pasan"]) }, GEN);
