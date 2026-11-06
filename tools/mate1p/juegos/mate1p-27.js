/* Tema 27 · El doble de una cantidad · Kiki */
const GEN = [
  [
    () => { const e = pick(["🍎", "⭐", "🐟", "🎈"]), n = between(1, 7), ans = 2 * n;
      return { prompt: `¿Cuál es el <b>doble</b> de ${n}?`, say: `¿Cuál es el doble de ${n}?`, scene: line(em(e, n)) + line(em(e, n).map(x => `<span style="opacity:.35">${x}</span>`)), ans, opts: numOpts(ans, [n, n + 2, ans + 1], 0), why: `El doble es dos veces: ${n} + ${n} = ${ans}.`, hint: "Doble = el mismo número sumado dos veces." }; },
  ],
  [
    () => { const n = between(3, 15), ans = 2 * n;
      return { prompt: `Roxana tiene <b>${n}</b> canicas. Rosa tiene el <b>doble</b> que Roxana. ¿Cuántas tiene Rosa?`, say: `Roxana tiene ${n} canicas y Rosa el doble. ¿Cuántas tiene Rosa?`, scene: "", ans, opts: numOpts(ans, [n, n + 2, n / 2 === Math.floor(n / 2) ? n / 2 : n + 1], 0), why: `${n} + ${n} = ${ans}.`, hint: "Doble = 2 veces." }; },
    () => { const n = between(2, 9), ans = 2 * n + n;
      return { prompt: `Ayer los bomberos apagaron <b>${n}</b> incendios y hoy apagaron el <b>doble</b> que ayer. ¿Cuántos incendios apagaron <b>en total</b>?`, say: `Ayer apagaron ${n} y hoy el doble. ¿Cuántos en total?`, scene: line(["🚒", "🔥"]), ans, opts: numOpts(ans, [2 * n, n, ans + 1], 0), why: `Hoy: ${2 * n}. Total: ${n} + ${2 * n} = ${ans}.`, hint: "Primero calcula lo de hoy, luego suma lo de ayer." }; },
  ],
  [
    () => { const l = between(3, 12), ans = l + 2 * l + 3 * l + 6 * l;
      return { prompt: `Un caracol recorrió: el lunes <b>${l} m</b>, el martes el <b>doble</b> del lunes, el miércoles el <b>triple</b> del lunes y el jueves el <b>doble del miércoles</b>. ¿Cuántos metros recorrió en total?`, say: "Lunes, martes el doble, miércoles el triple y jueves el doble del miércoles. ¿Cuántos metros en total?", scene: line(["🐌"]),
        ans, opts: numOpts(ans, [l + 2 * l + 3 * l + 4 * l, l + 2 * l + 3 * l, ans + l], 0), why: `${l} + ${2 * l} + ${3 * l} + ${6 * l} = ${ans} m.`, hint: "Calcula cada día y al final suma todo." }; },
    () => { const v = between(2, 9), ans = 2 * (v + 3);
      return { prompt: `Pienso un número, le sumo 3 y el resultado lo duplico. Si pensé el <b>${v}</b>, ¿qué obtengo?`, say: `Pienso ${v}, le sumo 3 y lo duplico. ¿Qué obtengo?`, scene: "", ans, opts: numOpts(ans, [2 * v + 3, v + 3, ans + 2], 0), why: `${v} + 3 = ${v + 3}; doble: ${ans}.`, hint: "Haz los pasos en orden." }; },
  ]
];
lesson({ n: 27, title: "El doble de una cantidad", short: "El doble", char: "kiki", music: "huayno", deco: ["✌️", "👯", "2️⃣", "🐌"],
  hello: "¡Hola! Soy <b>Kiki</b> 🐧. El <b>doble</b> es tener <b>dos veces</b> la misma cantidad.",
  levels: LEVELS3(["¿Cuál es el doble?", "Dos veces lo mismo"], ["Problemas del doble", "El doble y el total"], ["", "Doble, triple y caracoles"]) }, GEN);
