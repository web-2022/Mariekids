/* Tema 29 · Reparto en partes iguales · Pipo */
const GEN = [
  [
    () => { const k = between(2, 4), c = between(2, 4), n = k * c, e = pick(["🍪", "🍬", "🍓"]);
      return { prompt: `Reparte <b>${n}</b> ${e} entre <b>${k}</b> niños en partes iguales. ¿Cuántos recibe cada uno?`, say: `Reparte ${n} entre ${k} niños en partes iguales. ¿Cuántos recibe cada uno?`, scene: line(em(e, n)) + line(sample(["👧", "👦", "🧒", "👧🏽"], k)), ans: c, opts: numOpts(c, [n, k, c + 1], 1),
        why: `${n} entre ${k} = ${c} para cada uno (${Array(k).fill(c).join(" + ")} = ${n}).`, hint: "Da uno a cada niño, una y otra vez, hasta que se acaben.",
        steps: T => [
          { t: `Repartir en partes iguales es dar <b>de uno en uno</b> a cada niño, una vuelta tras otra, hasta que se acaben.` },
          { t: `Repartimos ${n} ${e} entre ${k} niños:`, b: BOARD.share(n, k, e, { names: Array.from({ length: k }, (_, i) => "Niño " + (i + 1)) }) },
          { t: `Cada niño recibe <b>${c}</b>. Comprobamos: ${Array(k).fill(c).join(" + ")} = ${n}. ✅` }
        ],
        err: w => w === k ? `${k} es la cantidad de niños.` : w === n ? `${n} es el total; hay que repartirlo.` : "" }; },
  ],
  [
    () => { const k = between(2, 5), c = between(2, 6), n = k * c;
      return { prompt: `La profesora tiene <b>${n}</b> lápices y los reparte en <b>${k}</b> mesas por igual. ¿Cuántos lápices hay en cada mesa?`, say: `${n} lápices en ${k} mesas por igual. ¿Cuántos en cada mesa?`, scene: "", ans: c, opts: numOpts(c, [n - k, k, c + 1], 1), why: `${k} mesas × ${c} = ${n}.`, hint: `¿Qué número sumado ${k} veces da ${n}?`,
        steps: T => [
          { t: `${n} lápices en ${k} mesas <b>por igual</b>: repartimos uno a cada mesa, vuelta tras vuelta.`, b: BOARD.share(n, k, "✏️", { names: Array.from({ length: k }, (_, i) => "Mesa " + (i + 1)) }) },
          { t: `Cada mesa tiene ${c}. Pensamos: ¿qué número sumado ${k} veces da ${n}? ${Array(k).fill(c).join(" + ")} = ${n}.` },
          { t: `En cada mesa hay <b>${c}</b> lápices.` }
        ],
        err: w => w === k ? `${k} es la cantidad de mesas.` : "" }; },
  ],
  [
    () => { const k = between(3, 5), c = between(2, 4), r = between(1, k - 1), n = k * c + r;
      return { prompt: `Reparte <b>${n}</b> caramelos entre <b>${k}</b> niños, dando a todos la <b>misma</b> cantidad y lo más posible. ¿Cuántos caramelos <b>sobran</b>?`, say: `Reparte ${n} caramelos entre ${k} niños por igual. ¿Cuántos sobran?`, scene: line(em("🍬", n)), ans: r, opts: numOpts(r, [c, k, 0], 0), why: `Cada uno recibe ${c} (${k} × ${c} = ${k * c}) y sobran ${n} − ${k * c} = ${r}.`, hint: "Reparte de uno en uno y mira cuántos no alcanzan para todos.",
        steps: T => [
          { t: `Repartimos de uno en uno a los ${k} niños, mientras alcance para <b>todos</b>:`, b: BOARD.share(k * c, k, "🍬", { names: Array.from({ length: k }, (_, i) => "Niño " + (i + 1)) }) },
          { t: `Cada uno recibe ${c}: se usaron ${k * c}. Los que quedan no alcanzan para dar uno más a cada niño.`, bAdd: BOARD.groups([{ n: r, e: "🍬", c: "#e11d48", lab: "sobran" }]) },
          { t: `${n} − ${k * c} = <b>${r}</b>. Sobran ${r}.` }
        ],
        err: w => w === c ? `${c} es lo que recibe cada uno; piden los que sobran.` : w === 0 ? "Sí sobran: no alcanzan para una vuelta más." : "" }; },
    () => { const k = between(3, 6), c = between(2, 5), ans = k * c;
      return { prompt: `Se repartieron caramelos y cada uno de los <b>${k}</b> niños recibió <b>${c}</b>. No sobró ninguno. ¿Cuántos caramelos había?`, say: `${k} niños recibieron ${c} cada uno. ¿Cuántos caramelos había?`, scene: "", ans, opts: numOpts(ans, [k + c, ans + c, ans - c], 1), why: `${Array(k).fill(c).join(" + ")} = ${ans}.`, hint: "Junta lo que recibió cada niño.",
        steps: T => [
          { t: `Cada uno de los ${k} niños recibió ${c}. Juntamos lo de todos:`, b: BOARD.groups(Array.from({ length: k }, (_, i) => ({ n: c, e: "🍬", c: "#3b82f6", lab: "Niño " + (i + 1) })), { step: .12 }) },
          { t: `${Array(k).fill(c).join(" + ")} = <b>${ans}</b>.`, bAdd: BOARD.lines([`${Array(k).fill(c).join(" + ")} = ${ans}`]) },
          { t: `Había <b>${ans}</b> caramelos.` }
        ],
        err: w => w === k + c ? `Sumaste ${k} + ${c}, pero son ${k} niños con ${c} cada uno.` : "" }; },
  ]
];
lesson({ n: 29, next: 65, title: "Reparto en partes iguales", short: "Repartir", char: "pipo", music: "ukelele", deco: ["🤝", "🍪", "🍬", "👧"],
  hello: "¡Hola! Soy <b>Pipo</b> 🐧. <b>Repartir</b> en partes iguales es que a todos les toque lo mismo.",
  levels: LEVELS3(["Repartir", "Uno para ti, uno para mí"], ["Problemas de reparto", "Mesas y lápices"], ["", "¿Cuántos sobran? ¿Cuántos había?"]) }, GEN);
