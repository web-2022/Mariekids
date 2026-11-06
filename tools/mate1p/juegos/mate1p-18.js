/* Tema 18 · Sumas con objetos y dibujos · Pipo */
const EMO = ["🍎", "⭐", "🐟", "🎈", "🌸", "🍓", "🐞", "🧁"];
const GEN = [
  [
    () => { const e = pick(EMO), a = between(1, 6), b = between(1, 6), ans = a + b;
      return { prompt: "¿Cuántos hay <b>en total</b>?", say: "Junta los dos grupos. ¿Cuántos hay en total?", scene: `<div class="line">${em(e, a).join("")}<b style="margin:0 8px">+</b>${em(e, b).join("")}</div>`, ans, opts: numOpts(ans, [ans + 1, ans - 1, Math.abs(a - b)], 0),
        why: `${a} + ${b} = ${ans}.`, hint: "Cuenta el primer grupo y sigue contando con el segundo." }; },
  ],
  [
    () => { const e = pick(EMO), a = between(1, 5), b = between(1, 5), c = between(1, 5), ans = a + b + c;
      return { prompt: "¿Cuántos hay en total en los tres grupos?", say: "¿Cuántos hay en total en los tres grupos?", scene: `<div class="line">${em(e, a).join("")}<b> + </b>${em(e, b).join("")}<b> + </b>${em(e, c).join("")}</div>`, ans, opts: numOpts(ans, [a + b, ans + 1, ans - 1], 0),
        why: `${a} + ${b} + ${c} = ${ans}.`, hint: "Suma de dos en dos." }; },
    () => { const [n1, n2] = sample(["Ana", "Beto", "Lucía", "Mateo", "Sofía"], 2), e = pick(["🍬", "🎈", "🍎"]), a = between(3, 9), b = between(3, 9), ans = a + b;
      return { prompt: `${n1} tiene <b>${a}</b> ${e} y ${n2} tiene <b>${b}</b> ${e}. ¿Cuántos tienen <b>juntos</b>?`, say: `${n1} tiene ${a} y ${n2} tiene ${b}. ¿Cuántos tienen juntos?`, scene: line(em(e, a)) + line(em(e, b)), ans, opts: numOpts(ans, [Math.abs(a - b), ans + 1, ans - 1], 0),
        why: `${a} + ${b} = ${ans}.`, hint: "«Juntos» significa sumar." }; },
  ],
  [
    () => { const ds = [between(1, 6), between(1, 6), between(1, 6)], ans = ds[0] + ds[1] + ds[2];
      return { prompt: "¿Cuántos puntos suman los tres dados?", say: "¿Cuántos puntos suman los tres dados?", scene: `<div class="dice">${ds.map(d => dieSvg(d, 60)).join("")}</div>`, ans, opts: numOpts(ans, [ans + 1, ans - 1, ds[0] + ds[1]], 0), why: `${ds.join(" + ")} = ${ans}.`, hint: "Suma dado por dado." }; },
    () => { const a = between(6, 10), b = between(5, 10), c = between(1, 5), d = between(10, 15), e2 = between(8, 15), f = between(5, 10), x = a + b - c, y = d + e2 - f, ans = x + y;
      return { prompt: `César tiene (${a} + ${b} − ${c}) canicas y Danielito tiene (${d} + ${e2} − ${f}) canicas. ¿Cuántas canicas tienen <b>en total</b>?`, say: "Resuelve cada paréntesis y luego suma. ¿Cuántas canicas tienen en total?", scene: "",
        ans, opts: numOpts(ans, [x, y, ans + 2 * c], 0), why: `César: ${x}. Danielito: ${y}. Total: ${x} + ${y} = ${ans}.`, hint: "Primero resuelve lo que está entre paréntesis." }; },
  ]
];
lesson({ n: 18, title: "Sumas con objetos y dibujos", short: "Sumar con dibujos", char: "pipo", music: "ukelele", deco: ["➕", "🍎", "⭐", "🎲"],
  hello: "¡Hola! Soy <b>Pipo</b> 🐧. <b>Sumar</b> es juntar. ¡Vamos a juntar grupos de cosas!",
  levels: LEVELS3(["Juntar dos grupos", "a + b con dibujos"], ["Tres grupos y cuentos", "¿Cuántos tienen juntos?"], ["", "Dados y canicas"]) }, GEN);
