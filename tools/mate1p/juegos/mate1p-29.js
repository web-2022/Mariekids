/* Tema 29 · Reparto en partes iguales · Pipo */
const GEN = [
  [
    () => { const k = between(2, 4), c = between(2, 4), n = k * c, e = pick(["🍪", "🍬", "🍓"]);
      return { prompt: `Reparte <b>${n}</b> ${e} entre <b>${k}</b> niños en partes iguales. ¿Cuántos recibe cada uno?`, say: `Reparte ${n} entre ${k} niños en partes iguales. ¿Cuántos recibe cada uno?`, scene: line(em(e, n)) + line(sample(["👧", "👦", "🧒", "👧🏽"], k)), ans: c, opts: numOpts(c, [n, k, c + 1], 1),
        why: `${n} entre ${k} = ${c} para cada uno (${Array(k).fill(c).join(" + ")} = ${n}).`, hint: "Da uno a cada niño, una y otra vez, hasta que se acaben." }; },
  ],
  [
    () => { const k = between(2, 5), c = between(2, 6), n = k * c;
      return { prompt: `La profesora tiene <b>${n}</b> lápices y los reparte en <b>${k}</b> mesas por igual. ¿Cuántos lápices hay en cada mesa?`, say: `${n} lápices en ${k} mesas por igual. ¿Cuántos en cada mesa?`, scene: "", ans: c, opts: numOpts(c, [n - k, k, c + 1], 1), why: `${k} mesas × ${c} = ${n}.`, hint: `¿Qué número sumado ${k} veces da ${n}?` }; },
  ],
  [
    () => { const k = between(3, 5), c = between(2, 4), r = between(1, k - 1), n = k * c + r;
      return { prompt: `Reparte <b>${n}</b> caramelos entre <b>${k}</b> niños, dando a todos la <b>misma</b> cantidad y lo más posible. ¿Cuántos caramelos <b>sobran</b>?`, say: `Reparte ${n} caramelos entre ${k} niños por igual. ¿Cuántos sobran?`, scene: line(em("🍬", n)), ans: r, opts: numOpts(r, [c, k, 0], 0), why: `Cada uno recibe ${c} (${k} × ${c} = ${k * c}) y sobran ${n} − ${k * c} = ${r}.`, hint: "Reparte de uno en uno y mira cuántos no alcanzan para todos." }; },
    () => { const k = between(3, 6), c = between(2, 5), ans = k * c;
      return { prompt: `Se repartieron caramelos y cada uno de los <b>${k}</b> niños recibió <b>${c}</b>. No sobró ninguno. ¿Cuántos caramelos había?`, say: `${k} niños recibieron ${c} cada uno. ¿Cuántos caramelos había?`, scene: "", ans, opts: numOpts(ans, [k + c, ans + c, ans - c], 1), why: `${Array(k).fill(c).join(" + ")} = ${ans}.`, hint: "Junta lo que recibió cada niño." }; },
  ]
];
lesson({ n: 29, title: "Reparto en partes iguales", short: "Repartir", char: "pipo", music: "ukelele", deco: ["🤝", "🍪", "🍬", "👧"],
  hello: "¡Hola! Soy <b>Pipo</b> 🐧. <b>Repartir</b> en partes iguales es que a todos les toque lo mismo.",
  levels: LEVELS3(["Repartir", "Uno para ti, uno para mí"], ["Problemas de reparto", "Mesas y lápices"], ["", "¿Cuántos sobran? ¿Cuántos había?"]) }, GEN);
