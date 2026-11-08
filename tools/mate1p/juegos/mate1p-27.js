/* Tema 27 · El doble de una cantidad · Kiki */
const GEN = [
  [
    () => { const e = pick(["🍎", "⭐", "🐟", "🎈"]), n = between(1, 7), ans = 2 * n;
      return { prompt: `¿Cuál es el <b>doble</b> de ${n}?`, say: `¿Cuál es el doble de ${n}?`, scene: line(em(e, n)) + line(em(e, n).map(x => `<span style="opacity:.35">${x}</span>`)), ans, opts: numOpts(ans, [n, n + 2, ans + 1], 0), why: `El doble es dos veces: ${n} + ${n} = ${ans}.`, hint: "Doble = el mismo número sumado dos veces.",
        steps: T => { const ls = T.its(".line"), top = [...ls[0].querySelectorAll(".it")], bot = [...ls[1].querySelectorAll(".it")];
          return [
            { t: `El <b>doble</b> es tener <b>dos veces</b> la misma cantidad. Arriba hay ${n}; abajo ponemos otros ${n} iguales.`, go: d => { bot.forEach(x => x.firstElementChild ? x.firstElementChild.style.opacity = 1 : 0); setTimeout(d, 600); } },
            { t: `Contamos todos: los de arriba y seguimos con los de abajo.`, go: d => T.count(top, { ms: 500 })(() => T.count(bot, { from: n + 1, ms: 500 })(d)) },
            { t: `${n} + ${n} = <b>${ans}</b>. El doble de ${n} es ${ans}.`, b: BOARD.lines([`${n} + ${n} = ${ans}`]) }
          ]; },
        err: w => w === n ? `${n} es una sola vez; el doble son dos veces.` : w === n + 2 ? "El doble no es sumar 2: es sumar el mismo número otra vez." : "" }; },
  ],
  [
    () => { const n = between(3, 15), ans = 2 * n;
      return { prompt: `Roxana tiene <b>${n}</b> canicas. Rosa tiene el <b>doble</b> que Roxana. ¿Cuántas tiene Rosa?`, say: `Roxana tiene ${n} canicas y Rosa el doble. ¿Cuántas tiene Rosa?`, scene: "", ans, opts: numOpts(ans, [n, n + 2, n / 2 === Math.floor(n / 2) ? n / 2 : n + 1], 0), why: `${n} + ${n} = ${ans}.`, hint: "Doble = 2 veces.",
        steps: T => [
          { t: `Rosa tiene el <b>doble</b> que Roxana: dos veces ${n}.`, b: BOARD.groups([{ n, e: "🔵", c: "#3b82f6", lab: "Roxana" }, { n: 2 * n, e: "🟢", c: "#22c55e", lab: "Rosa" }], { step: .06 }) },
          { t: `${n} + ${n} = <b>${ans}</b>.`, bAdd: BOARD.lines([`${n} + ${n} = ${ans}`]) },
          { t: `Rosa tiene <b>${ans}</b> canicas.` }
        ],
        err: w => w === n ? "Esas son las de Roxana." : w === n + 2 ? "Doble no es «más 2», es «dos veces»." : "" }; },
    () => { const n = between(2, 9), ans = 2 * n + n;
      return { prompt: `Ayer los bomberos apagaron <b>${n}</b> incendios y hoy apagaron el <b>doble</b> que ayer. ¿Cuántos incendios apagaron <b>en total</b>?`, say: `Ayer apagaron ${n} y hoy el doble. ¿Cuántos en total?`, scene: line(["🚒", "🔥"]), ans, opts: numOpts(ans, [2 * n, n, ans + 1], 0), why: `Hoy: ${2 * n}. Total: ${n} + ${2 * n} = ${ans}.`, hint: "Primero calcula lo de hoy, luego suma lo de ayer.",
        steps: T => [
          { t: `Es un problema de <b>dos pasos</b>. Paso 1: ¿cuántos apagaron hoy? El doble de ${n}: ${n} + ${n} = <b>${2 * n}</b>.`, b: BOARD.lines([`Ayer: ${n}`, `Hoy: ${n} + ${n} = ${2 * n}`]) },
          { t: `Paso 2: «en total» es juntar ayer y hoy: ${n} + ${2 * n}.`, bAdd: BOARD.lines([`${n} + ${2 * n} = ${ans}`]) },
          { t: `En total apagaron <b>${ans}</b> incendios.` }
        ],
        err: w => w === 2 * n ? "Esos son solo los de hoy; piden el total." : "" }; },
  ],
  [
    () => { const l = between(3, 12), ans = l + 2 * l + 3 * l + 6 * l;
      return { prompt: `Un caracol recorrió: el lunes <b>${l} m</b>, el martes el <b>doble</b> del lunes, el miércoles el <b>triple</b> del lunes y el jueves el <b>doble del miércoles</b>. ¿Cuántos metros recorrió en total?`, say: "Lunes, martes el doble, miércoles el triple y jueves el doble del miércoles. ¿Cuántos metros en total?", scene: line(["🐌"]),
        ans, opts: numOpts(ans, [l + 2 * l + 3 * l + 4 * l, l + 2 * l + 3 * l, ans + l], 0), why: `${l} + ${2 * l} + ${3 * l} + ${6 * l} = ${ans} m.`, hint: "Calcula cada día y al final suma todo.",
        steps: T => [
          { t: `Calculamos día por día. Lunes: <b>${l}</b>.` },
          { t: `Martes = doble del lunes = ${2 * l}. Miércoles = triple del lunes = ${3 * l}. Jueves = doble del <b>miércoles</b> = ${3 * l} + ${3 * l} = ${6 * l}.`, b: BOARD.table([["Día", "Lu", "Ma", "Mi", "Ju"], ["m", l, 2 * l, 3 * l, 6 * l]]) },
          { t: `Total: ${l} + ${2 * l} + ${3 * l} + ${6 * l} = <b>${ans}</b> m.`, bAdd: BOARD.lines([`${l} + ${2 * l} + ${3 * l} + ${6 * l} = ${ans}`]) }
        ],
        err: w => w === l + 2 * l + 3 * l + 4 * l ? "El jueves es el doble del <b>miércoles</b>, no del martes." : w === l + 2 * l + 3 * l ? "Te faltó el jueves." : "" }; },
    () => { const v = between(2, 9), ans = 2 * (v + 3);
      return { prompt: `Pienso un número, le sumo 3 y el resultado lo duplico. Si pensé el <b>${v}</b>, ¿qué obtengo?`, say: `Pienso ${v}, le sumo 3 y lo duplico. ¿Qué obtengo?`, scene: "", ans, opts: numOpts(ans, [2 * v + 3, v + 3, ans + 2], 0), why: `${v} + 3 = ${v + 3}; doble: ${ans}.`, hint: "Haz los pasos en orden.",
        steps: T => [
          { t: `Hacemos los pasos <b>en orden</b>, como una receta.` },
          { t: `Paso 1: pienso ${v} y le sumo 3 → ${v} + 3 = <b>${v + 3}</b>.`, b: BOARD.lines([`${v} + 3 = ${v + 3}`]) },
          { t: `Paso 2: lo duplico → ${v + 3} + ${v + 3} = <b>${ans}</b>.`, bAdd: BOARD.lines([`${v + 3} + ${v + 3} = ${ans}`]) }
        ],
        err: w => w === 2 * v + 3 ? "Duplicaste antes de sumar 3. ¡El orden importa!" : "" }; },
  ]
];
lesson({ n: 27, title: "El doble de una cantidad", short: "El doble", char: "kiki", music: "huayno", deco: ["✌️", "👯", "2️⃣", "🐌"],
  hello: "¡Hola! Soy <b>Kiki</b> 🐧. El <b>doble</b> es tener <b>dos veces</b> la misma cantidad.",
  levels: LEVELS3(["¿Cuál es el doble?", "Dos veces lo mismo"], ["Problemas del doble", "El doble y el total"], ["", "Doble, triple y caracoles"]) }, GEN);
