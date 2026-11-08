/* Tema 15 · Números ordinales · Kiki */
const ORD = ["primero", "segundo", "tercero", "cuarto", "quinto", "sexto", "séptimo", "octavo", "noveno", "décimo"];
const AN = ["🐢", "🐇", "🐶", "🐱", "🐷", "🐻", "🦊", "🐸", "🐼", "🐵"];
const race = list => `<div style="container-type:inline-size;width:100%"><div class="line race" style="flex-wrap:nowrap;justify-content:flex-start;gap:0 2px;font-size:min(34px, calc(100cqw / ${list.length + 1} * .78))"><span>🏁</span>${list.map((x, i) => `<span class="it" data-k="p${i}" style="display:inline-block;transform:scaleX(-1)">${x}</span>`).join("")}</div></div><div class="legend">🏁 llegada · el más cerca de la bandera va primero</div>`;
const GEN = [
  [
    () => { const k = between(4, 6), list = sample(AN, k), p = rnd(k), ans = ORD[p];
      return { prompt: `¿En qué lugar va ${list[p]}?`, say: "¿En qué lugar va este animalito?", scene: race(list), ans, opts: shuffle([ans, ...sample(ORD.slice(0, k + 1).filter(x => x !== ans), 3)]), cols: 2, why: `${list[p]} va en el lugar ${p + 1}: ${ans}.`, hint: "Cuenta desde la bandera 🏁.",
        steps: T => [
          { t: `En una carrera, el <b>primero</b> es el que está más cerca de la bandera 🏁. Contamos los lugares desde la bandera.` },
          { t: `Contamos: primero, segundo, tercero…`, go: T.count(T.its().slice(0, p + 1), { label: k => k + "º", say: k => ORD[k - 1], ms: 1000 }) },
          { t: `${list[p]} va en el lugar ${p + 1}: el <b>${ans}</b>.` }
        ] }; },
  ],
  [
    () => { const k = between(5, 7), list = sample(AN, k), p = between(1, k - 1), ans = list[p];
      return { prompt: `¿Quién va en el <b>${ORD[p]}</b> lugar?`, say: `¿Quién va en el ${ORD[p]} lugar?`, scene: race(list), ans, opts: shuffle([ans, ...sample(list.filter(x => x !== ans), 3)]), cols: 4, why: `Contando desde la bandera, el ${ORD[p]} es ${ans}.`, hint: "1.º, 2.º, 3.º… desde la bandera.",
        steps: T => [
          { t: `Los lugares se cuentan desde la bandera 🏁: 1.º primero, 2.º segundo, 3.º tercero…` },
          { t: `Contamos hasta el <b>${ORD[p]}</b>:`, go: T.count(T.its().slice(0, p + 1), { label: k => k + "º", say: k => ORD[k - 1], ms: 1000 }) },
          { t: `En el ${ORD[p]} lugar va <b>${ans}</b>.` }
        ] }; },
  ],
  [
    () => { const a = between(2, 6), b = between(2, 6), ans = a + b - 1;
      return { prompt: `En una fila, Ana está en el <b>${ORD[a - 1]}</b> lugar contando desde adelante y en el <b>${ORD[b - 1]}</b> lugar contando desde atrás. ¿Cuántos niños hay en la fila?`, say: `Ana es la ${ORD[a - 1]} desde adelante y la ${ORD[b - 1]} desde atrás. ¿Cuántos niños hay?`, scene: "",
        ans, opts: numOpts(ans, [a + b, a + b + 1, ans - 1], 1), why: `${a} + ${b} − 1 = ${ans} (Ana se contó dos veces).`, hint: "Dibuja la fila con palitos. ¡No cuentes a Ana dos veces!",
        steps: T => { const fila = [...Array(a - 1).fill("🧒"), "👧", ...Array(b - 1).fill("🧒")];
          return [
            { t: `Dibujamos la fila. Ana 👧 es la <b>${ORD[a - 1]}</b> desde adelante: tiene ${a - 1} niño${a - 1 === 1 ? "" : "s"} delante.`, b: BOARD.lines([`adelante ➜ ${[...Array(a - 1).fill("🧒"), "👧"].join("")}`]) },
            { t: `Y es la <b>${ORD[b - 1]}</b> desde atrás: tiene ${b - 1} niño${b - 1 === 1 ? "" : "s"} detrás.`, b: BOARD.lines([`adelante ➜ ${fila.join("")} ⬅ atrás`]) },
            { t: `Contamos: ${a - 1} delante + Ana + ${b - 1} detrás = <b>${ans}</b>. Truco: ${a} + ${b} − 1, porque si sumas ${a} + ${b} cuentas a Ana dos veces.`, bAdd: BOARD.lines([`${a - 1} + 1 + ${b - 1} = ${ans}`]) }
          ]; },
        err: w => w === a + b ? "¡Contaste a Ana dos veces!" : "" }; },
    () => { const p = between(3, 9), t = rnd(2), tot = p + between(2, 5), ans = t ? p - 1 : tot - p;
      return { prompt: t ? `Pipo es el <b>${ORD[p - 1]}</b> de la fila. ¿Cuántos niños hay <b>delante</b> de él?` : `En una fila de <b>${tot}</b> niños, Pipo es el <b>${ORD[p - 1]}</b>. ¿Cuántos hay <b>detrás</b> de él?`, say: t ? `Pipo es el ${ORD[p - 1]} de la fila. ¿Cuántos niños hay delante de él?` : `En una fila de ${tot} niños, Pipo es el ${ORD[p - 1]}. ¿Cuántos hay detrás?`, scene: "",
        ans, opts: numOpts(ans, t ? [p, p + 1] : [tot - p + 1, p, tot], 0), why: t ? `Delante de él hay ${p - 1}.` : `${tot} − ${p} = ${ans}.`, hint: "Haz un dibujo de la fila.",
        steps: T => t ? [
          { t: `«Delante» son los niños que están <b>antes</b> que Pipo en la fila. A Pipo no lo contamos.` },
          { t: `Si Pipo es el <b>${ORD[p - 1]}</b>, delante de él están los que tienen los lugares 1.º hasta ${p - 1}.º.`, b: BOARD.lines([`adelante ➜ ${Array(p - 1).fill("🧒").join("")}🐧`]) },
          { t: `Delante de él hay ${p} − 1 = <b>${ans}</b> niños (a él no lo contamos).` }
        ] : [
          { t: `«Detrás» son los niños que están <b>después</b> de Pipo en la fila. A Pipo no lo contamos.` },
          { t: `La fila tiene ${tot} niños y Pipo es el <b>${ORD[p - 1]}</b>: hasta él hay ${p} niños (contándolo a él).`, b: BOARD.lines([`${Array(p - 1).fill("🧒").join("")}🐧${Array(tot - p).fill("🧒").join("")}`]) },
          { t: `Detrás quedan los demás: ${tot} − ${p} = <b>${ans}</b>.`, bAdd: BOARD.lines([`${tot} − ${p} = ${ans}`]) }
        ],
        err: w => w === p ? "Contaste también a Pipo." : w === tot - p + 1 ? "Contaste también a Pipo." : "" }; },
  ]
];
lesson({ n: 15, title: "Números ordinales", short: "Ordinales", char: "kiki", music: "huayno", deco: ["🥇", "🥈", "🥉", "🏁"],
  hello: "¡Hola! Soy <b>Kiki</b> 🐧. Primero, segundo, tercero… los <b>ordinales</b> dicen el <b>lugar</b> de cada uno.",
  levels: LEVELS3(["¿En qué lugar va?", "Primero, segundo…"], ["¿Quién va…?", "Buscar por el lugar"], ["", "Filas desde adelante y desde atrás"]) }, GEN);
