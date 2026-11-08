/* Tema 18 · Sumas con objetos y dibujos · Pipo */
const EMO = ["🍎", "⭐", "🐟", "🎈", "🌸", "🍓", "🐞", "🧁"];
const GEN = [
  [
    () => { const e = pick(EMO), a = between(1, 6), b = between(1, 6), ans = a + b;
      return { prompt: "¿Cuántos hay <b>en total</b>?", say: "Junta los dos grupos. ¿Cuántos hay en total?", scene: `<div class="line">${em(`<span class="it" data-k="g1">${e}</span>`, a).join("")}<b style="margin:0 8px">+</b>${em(`<span class="it" data-k="g2">${e}</span>`, b).join("")}</div>`, ans, opts: numOpts(ans, [ans + 1, ans - 1, Math.abs(a - b)], 0),
        why: `${a} + ${b} = ${ans}.`, hint: "Cuenta el primer grupo y sigue contando con el segundo.",
        steps: T => [
          { t: `<b>Sumar</b> es <b>juntar</b>. Contamos el primer grupo:`, go: T.count(T.of("g1")) },
          { t: `Ahora <b>seguimos contando</b> con el segundo grupo, desde ${a + 1}, sin volver a empezar:`, go: T.count(T.of("g2"), { from: a + 1 }) },
          { t: `${a} + ${b} = <b>${ans}</b>.`, b: BOARD.jumps(a, Array(b).fill(1), { step: .35 }) }
        ],
        err: w => w === Math.abs(a - b) ? "Restaste, pero «en total» es <b>juntar</b> (sumar)." : "" }; },
  ],
  [
    () => { const e = pick(EMO), a = between(1, 5), b = between(1, 5), c = between(1, 5), ans = a + b + c;
      return { prompt: "¿Cuántos hay en total en los tres grupos?", say: "¿Cuántos hay en total en los tres grupos?", scene: `<div class="line">${em(`<span class="it" data-k="g1">${e}</span>`, a).join("")}<b> + </b>${em(`<span class="it" data-k="g2">${e}</span>`, b).join("")}<b> + </b>${em(`<span class="it" data-k="g3">${e}</span>`, c).join("")}</div>`, ans, opts: numOpts(ans, [a + b, ans + 1, ans - 1], 0),
        why: `${a} + ${b} + ${c} = ${ans}.`, hint: "Suma de dos en dos.",
        steps: T => [
          { t: `Hay tres grupos. Los juntamos contando uno detrás de otro:`, go: d => T.count(T.of("g1"), { ms: 600 })(() => T.count(T.of("g2"), { from: a + 1, ms: 600 })(() => T.count(T.of("g3"), { from: a + b + 1, ms: 600 })(d))) },
          { t: `Con números se suma de dos en dos: primero ${a} + ${b} = ${a + b}, y luego ${a + b} + ${c} = ${ans}.`, b: BOARD.lines([`${a} + ${b} = ${a + b}`, `${a + b} + ${c} = ${ans}`]) },
          { t: `En total hay <b>${ans}</b>.` }
        ],
        err: w => w === a + b ? "Te faltó sumar el tercer grupo." : "" }; },
    () => { const [n1, n2] = sample(["Ana", "Beto", "Lucía", "Mateo", "Sofía"], 2), e = pick(["🍬", "🎈", "🍎"]), a = between(3, 9), b = between(3, 9), ans = a + b;
      return { prompt: `${n1} tiene <b>${a}</b> ${e} y ${n2} tiene <b>${b}</b> ${e}. ¿Cuántos tienen <b>juntos</b>?`, say: `${n1} tiene ${a} y ${n2} tiene ${b}. ¿Cuántos tienen juntos?`, scene: line(em(e, a)) + line(em(e, b)), ans, opts: numOpts(ans, [Math.abs(a - b), ans + 1, ans - 1], 0),
        why: `${a} + ${b} = ${ans}.`, hint: "«Juntos» significa sumar.",
        steps: T => [
          { t: `La palabra <b>«juntos»</b> nos dice que hay que <b>sumar</b>: ${a} + ${b}.` },
          { t: `Empezamos en el número más grande (${Math.max(a, b)}) y contamos hacia adelante ${Math.min(a, b)}:`, b: BOARD.jumps(Math.max(a, b), Array(Math.min(a, b)).fill(1), { step: .35 }) },
          { t: `${a} + ${b} = <b>${ans}</b>.` }
        ],
        err: w => w === Math.abs(a - b) ? "Restaste; «juntos» significa sumar." : "" }; },
  ],
  [
    () => { const ds = [between(1, 6), between(1, 6), between(1, 6)], ans = ds[0] + ds[1] + ds[2];
      return { prompt: "¿Cuántos puntos suman los tres dados?", say: "¿Cuántos puntos suman los tres dados?", scene: `<div class="dice">${ds.map(d => dieSvg(d, 60)).join("")}</div>`, ans, opts: numOpts(ans, [ans + 1, ans - 1, ds[0] + ds[1]], 0), why: `${ds.join(" + ")} = ${ans}.`, hint: "Suma dado por dado.",
        steps: T => { const dd = T.its(".dice svg");
          return [
            { t: `Contamos los puntos de cada dado y seguimos contando en el siguiente:`, go: d => T.count([...dd[0].querySelectorAll("circle")], { ms: 450 })(() => T.count([...dd[1].querySelectorAll("circle")], { from: ds[0] + 1, ms: 450 })(() => T.count([...dd[2].querySelectorAll("circle")], { from: ds[0] + ds[1] + 1, ms: 450 })(d))) },
            { t: `Con números: ${ds[0]} + ${ds[1]} = ${ds[0] + ds[1]}, y ${ds[0] + ds[1]} + ${ds[2]} = ${ans}.`, b: BOARD.lines([`${ds[0]} + ${ds[1]} = ${ds[0] + ds[1]}`, `${ds[0] + ds[1]} + ${ds[2]} = ${ans}`]) },
            { t: `Los tres dados suman <b>${ans}</b> puntos.` }
          ]; },
        err: w => w === ds[0] + ds[1] ? "Te faltó el tercer dado." : "" }; },
    () => { const a = between(6, 10), b = between(5, 10), c = between(1, 5), d = between(10, 15), e2 = between(8, 15), f = between(5, 10), x = a + b - c, y = d + e2 - f, ans = x + y;
      return { prompt: `César tiene (${a} + ${b} − ${c}) canicas y Danielito tiene (${d} + ${e2} − ${f}) canicas. ¿Cuántas canicas tienen <b>en total</b>?`, say: "Resuelve cada paréntesis y luego suma. ¿Cuántas canicas tienen en total?", scene: "",
        ans, opts: numOpts(ans, [x, y, ans + 2 * c], 0), why: `César: ${x}. Danielito: ${y}. Total: ${x} + ${y} = ${ans}.`, hint: "Primero resuelve lo que está entre paréntesis.",
        steps: T => [
          { t: `Primero resolvemos lo que está <b>entre paréntesis</b>, de izquierda a derecha.` },
          { t: `César: ${a} + ${b} = ${a + b}; ${a + b} − ${c} = <b>${x}</b>. Danielito: ${d} + ${e2} = ${d + e2}; ${d + e2} − ${f} = <b>${y}</b>.`, b: BOARD.lines([`César: ${a} + ${b} − ${c} = ${x}`, `Danielito: ${d} + ${e2} − ${f} = ${y}`]) },
          { t: `«En total» es juntar: ${x} + ${y} = <b>${ans}</b>.`, bAdd: BOARD.lines([`${x} + ${y} = ${ans}`]) }
        ],
        err: w => w === x || w === y ? "Esas son las canicas de uno solo; piden las de los dos juntos." : "" }; },
  ]
];
lesson({ n: 18, title: "Sumas con objetos y dibujos", short: "Sumar con dibujos", char: "pipo", music: "ukelele", deco: ["➕", "🍎", "⭐", "🎲"],
  hello: "¡Hola! Soy <b>Pipo</b> 🐧. <b>Sumar</b> es juntar. ¡Vamos a juntar grupos de cosas!",
  levels: LEVELS3(["Juntar dos grupos", "a + b con dibujos"], ["Tres grupos y cuentos", "¿Cuántos tienen juntos?"], ["", "Dados y canicas"]) }, GEN);
