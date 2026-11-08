/* Tema 54 · Calendario, días y periodicidad · Kiki */
const D = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
const M = [["enero", 31], ["febrero", 28], ["marzo", 31], ["abril", 30], ["mayo", 31], ["junio", 30], ["julio", 31], ["agosto", 31], ["setiembre", 30], ["octubre", 31], ["noviembre", 30], ["diciembre", 31]];
const dOpts = ans => shuffle([ans, ...sample(D.filter(x => x !== ans), 3)]);
const GEN = [
  [
    () => { const i = rnd(7), t = pick(["ayer", "mañana"]), ans = t === "ayer" ? D[(i + 1) % 7] : D[(i + 6) % 7];
      return { prompt: t === "ayer" ? `Ayer fue <b>${D[i]}</b>. ¿Qué día es hoy?` : `Mañana será <b>${D[i]}</b>. ¿Qué día es hoy?`, say: t === "ayer" ? `Ayer fue ${D[i]}. ¿Qué día es hoy?` : `Mañana será ${D[i]}. ¿Qué día es hoy?`, scene: "", ans, opts: dOpts(ans), cols: 2, cls: "grp", why: `Hoy es ${ans}.`, hint: "Ayer va antes de hoy; mañana va después.",
        steps: T => [
          { t: `Ordenamos: <b>ayer → hoy → mañana</b>. ${t === "ayer" ? "Hoy va justo <b>después</b> de ayer." : "Hoy va justo <b>antes</b> de mañana."}` },
          { t: `Miramos los días de la semana en orden:`, b: BOARD.seq(D, { diffs: Array(6).fill(null), hl: D.indexOf(ans) }) },
          { t: t === "ayer" ? `Ayer fue ${D[i]}, entonces hoy es el día siguiente: <b>${ans}</b>.` : `Mañana será ${D[i]}, entonces hoy es el día anterior: <b>${ans}</b>.` }
        ],
        err: w => w === (t === "ayer" ? D[(i + 6) % 7] : D[(i + 1) % 7]) ? "Fuiste para el otro lado: " + (t === "ayer" ? "hoy va después de ayer." : "hoy va antes de mañana.") : "" }; },
    () => { const q = pick([["¿Cuántos días tiene una semana?", 7, [5, 6, 7, 10]], ["¿Cuántos meses tiene un año?", 12, [10, 11, 12, 7]], ["¿Cuántos días tiene el mes de abril?", 30, [28, 29, 30, 31]]]);
      return { prompt: q[0], say: q[0], scene: "", ans: q[1], opts: q[2], cols: 4, why: `${q[1]}.`, hint: "Piensa en el calendario.",
        steps: T => [
          { t: `Recordamos el calendario.`, b: BOARD.table([["semana", "año", "abril"], ["7 días", "12 meses", "30 días"]]) },
          { t: q[1] === 30 ? `Truco de los nudillos: los meses en un nudillo tienen 31 días; abril cae en un hueco, así que tiene 30.` : q[1] === 7 ? `Lunes, martes, miércoles, jueves, viernes, sábado y domingo: 7.` : `De enero a diciembre hay 12 meses.` },
          { t: `La respuesta es <b>${q[1]}</b>.` }
        ] }; },
  ],
  [
    () => { const st = rnd(7), m = pick(M), k = between(2, m[1]), ans = D[(st + k - 1) % 7];
      return { prompt: `En este calendario, ¿qué día de la semana es el <b>${k}</b> de ${m[0]}?`, say: `¿Qué día de la semana es el ${k} de ${m[0]}?`, scene: calendar(m[0].toUpperCase(), st, m[1], { [k]: "❓" }), ans, opts: dOpts(ans), cols: 2, cls: "grp", why: `El ${k} cae en ${ans}.`, hint: "Sube por la columna hasta la letra del día.",
        steps: T => { const p = st + k - 1, c = p % 7, r2 = Math.floor(p / 7), cx = 6 + c * 40 + 20, cy = 52 + r2 * 34 + 15;
          return [
            { t: `Buscamos el <b>${k}</b> (el ❓) en el calendario. Las letras de arriba son los días: L lunes, M martes, M miércoles, J jueves, V viernes, S sábado, D domingo.` },
            { t: `Subimos por su columna hasta la letra del día:`, go: T.strokes(T.sc.querySelector("svg"), [[cx, cy, cx, 40]], { label: () => "↑", say: () => ans, ms: 1300 }) },
            { t: `El ${k} de ${m[0]} es <b>${ans}</b>.` }
          ]; } }; },
  ],
  [
    () => { const s = rnd(7), a = between(3, 12), b = a + between(7, 18), ans = D[(s + b - a) % 7];
      return { prompt: `César cumple años el <b>${D[s]} ${a}</b> de mayo y Jorge el <b>${b}</b> de mayo. ¿Qué día de la semana cumple años Jorge?`, say: `César cumple el ${D[s]} ${a} de mayo y Jorge el ${b} de mayo. ¿Qué día cumple Jorge?`, scene: "", ans, opts: dOpts(ans), cols: 2, cls: "grp",
        why: `Del ${a} al ${b} pasan ${b - a} días. ${b - a} = ${Math.floor((b - a) / 7)} semana${Math.floor((b - a) / 7) === 1 ? "" : "s"} y ${(b - a) % 7} día${(b - a) % 7 === 1 ? "" : "s"}: ${ans}.`, hint: "Cada 7 días se repite el mismo día de la semana.",
        steps: T => [
          { t: `Del ${a} al ${b} pasan ${b} − ${a} = <b>${b - a}</b> días. Cada <b>7 días</b> se repite el mismo día de la semana.` },
          { t: `Quitamos las semanas completas: ${b - a} = ${Math.floor((b - a) / 7) * 7} + ${(b - a) % 7}. Las semanas completas vuelven a caer en ${D[s]}.`, b: BOARD.lines([`${D[s]} ${a}`, ...Array.from({ length: Math.floor((b - a) / 7) }, (_, j) => `${D[s]} ${a + 7 * (j + 1)}`)], { step: .7 }) },
          { t: `Desde ${D[s]} ${a + 7 * Math.floor((b - a) / 7)} avanzamos ${(b - a) % 7} día${(b - a) % 7 === 1 ? "" : "s"} más: llegamos a <b>${ans}</b>.`, b: BOARD.seq(Array.from({ length: (b - a) % 7 + 1 }, (_, j) => D[(s + j) % 7]), { diffs: Array((b - a) % 7).fill(null), hl: (b - a) % 7 }) }
        ] }; },
    () => { const i = rnd(7), n = between(8, 20), ans = D[(i + n) % 7];
      return { prompt: `Hoy es <b>${D[i]}</b>. ¿Qué día será dentro de <b>${n}</b> días?`, say: `Hoy es ${D[i]}. ¿Qué día será dentro de ${n} días?`, scene: "", ans, opts: dOpts(ans), cols: 2, cls: "grp", why: `${n} días = ${Math.floor(n / 7)} semana${Math.floor(n / 7) === 1 ? "" : "s"} y ${n % 7} día${n % 7 === 1 ? "" : "s"} más: ${ans}.`, hint: "Quita las semanas completas (7, 14…) y cuenta lo que sobra.",
        steps: T => [
          { t: `Cada <b>7 días</b> vuelve a ser ${D[i]}. ${n} días = ${Math.floor(n / 7)} semana${Math.floor(n / 7) === 1 ? "" : "s"} y ${n % 7} día${n % 7 === 1 ? "" : "s"}.`, b: BOARD.lines([`${n} = ${Math.floor(n / 7) * 7} + ${n % 7}`]) },
          { t: `Las semanas completas nos dejan otra vez en ${D[i]}. Ahora avanzamos ${n % 7} día${n % 7 === 1 ? "" : "s"}:`, b: BOARD.seq(Array.from({ length: n % 7 + 1 }, (_, j) => D[(i + j) % 7]), { diffs: Array(n % 7).fill(null), hl: n % 7 }) },
          { t: `Dentro de ${n} días será <b>${ans}</b>.` }
        ] }; },
  ]
];
lesson({ n: 54, title: "Calendario, días y periodicidad", short: "Calendario", char: "kiki", music: "cuento", deco: ["📅", "🗓️", "☀️", "🌙"],
  hello: "¡Hola! Soy <b>Kiki</b> 🐧. La semana tiene 7 días y el año 12 meses. ¡Aprendamos a usar el <b>calendario</b>!",
  levels: LEVELS3(["Días y meses", "Ayer, hoy y mañana"], ["Leer el calendario", "¿Qué día cae?"], ["", "Cumpleaños y días que pasan"]) }, GEN);
