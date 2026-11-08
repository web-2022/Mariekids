/* Tema 8 · Mayor que, menor que e igual que · Tito */
const sg = (a, b) => a > b ? ">" : a < b ? "<" : "=";
const GEN = [
  [
    () => { const a = between(0, 20), b = pick([a, between(0, 20), between(0, 20)]), ans = sg(a, b);
      return { prompt: "¿Qué signo va en el cuadrito?", say: `¿Qué signo va entre ${a} y ${b}?`, scene: `<div class="seq">${a} &nbsp;⬜&nbsp; ${b}</div><div class="legend">&gt; mayor que · &lt; menor que · = igual</div>`,
        ans, opts: [">", "<", "="], cols: 3, why: `${a} ${ans} ${b}.`, hint: "La boca abierta del cocodrilo 🐊 se come al número MAYOR.",
        steps: T => [
          { t: `En la recta numérica, mientras más a la <b>derecha</b> está un número, más <b>grande</b> es.`, b: a === b ? BOARD.marks([{ v: a, lab: `${a}` }]) : BOARD.marks([a, b]) },
          a === b ? { t: `¡Los dos son el mismo número, ${a}! Entonces son <b>iguales</b>.` }
                  : { t: `${Math.max(a, b)} está más a la derecha que ${Math.min(a, b)}. Entonces <b>${a} es ${a > b ? "mayor" : "menor"} que ${b}</b>.` },
          { t: a === b ? `Para «igual» usamos <b>=</b>: ${a} = ${b}.` : `El cocodrilo 🐊 abre la boca hacia el número <b>mayor</b>, porque quiere comer más: ${a} <b>${ans}</b> ${b}.`, b: BOARD.lines([`${a} ${ans} ${b}`]) }
        ] }; },
  ],
  [
    () => { const a = between(1, 9), b = between(1, 9), c = between(2, 18), ans = sg(a + b, c);
      return { prompt: "¿Qué signo va en el cuadrito?", say: `¿Qué signo va entre ${a} más ${b} y ${c}?`, scene: `<div class="seq">${a} + ${b} &nbsp;⬜&nbsp; ${c}</div>`, ans, opts: [">", "<", "="], cols: 3,
        why: `${a} + ${b} = ${a + b}, y ${a + b} ${ans} ${c}.`, hint: "Primero resuelve la suma, después compara.",
        steps: T => [
          { t: `Primero resolvemos la suma de la izquierda: ${a} + ${b} = <b>${a + b}</b>.`, b: BOARD.jumps(a, Array(b).fill(1), { step: .4 }) },
          { t: `Ahora comparamos ${a + b} con ${c}.`, b: a + b === c ? BOARD.marks([a + b]) : BOARD.marks([a + b, c]) },
          { t: a + b === c ? `${a + b} y ${c} son iguales: va <b>=</b>.` : `${a + b} es ${a + b > c ? "mayor" : "menor"} que ${c}. El cocodrilo 🐊 se come al mayor: <b>${ans}</b>.`, bAdd: BOARD.lines([`${a} + ${b} ${ans} ${c}`]) }
        ],
        err: w => "Ojo: primero se resuelve la suma y después se compara." }; },
    () => { const a = between(5, 40), ans = a + 1;
      return { prompt: `¿Qué número es <b>mayor que ${a}</b> y <b>menor que ${a + 2}</b>?`, say: `¿Qué número es mayor que ${a} y menor que ${a + 2}?`, scene: "", ans, opts: numOpts(ans, [a, a + 2, a + 3]), why: `Entre ${a} y ${a + 2} está ${ans}.`, hint: "Busca el número que está en medio.",
        steps: T => [
          { t: `«Mayor que ${a}» son los que vienen <b>después</b> del ${a}. «Menor que ${a + 2}» son los que vienen <b>antes</b> del ${a + 2}.` },
          { t: `En la recta, entre ${a} y ${a + 2} hay un solo número:`, b: BOARD.marks([{ v: a, c: "#94a3b8" }, { v: a + 1, c: "#16a34a" }, { v: a + 2, c: "#94a3b8" }], { min: a - 2, max: a + 4 }) },
          { t: `Ese número es <b>${ans}</b>: ${a} &lt; ${ans} &lt; ${a + 2}.` }
        ],
        err: w => w === a || w === a + 2 ? `${w} no puede ser: tiene que estar <b>entre</b> los dos, sin tocarlos.` : "" }; },
  ],
  [
    () => { for (;;) { const a = between(3, 9), b = between(1, 3), c = between(2, 12), d = between(3, 9), e = between(1, 3), f = between(2, 12);
        const combos = [["+", "+"], ["+", "−"], ["−", "+"], ["−", "−"]], ok = combos.filter(([s, t]) => (s === "+" ? a + b : a - b) < c && (t === "+" ? d + e : d - e) > f);
        if (ok.length !== 1) continue; const ans = ok[0].join(" ; ");
        return { prompt: "¿Qué signos (+ o −) deben ir en los cuadritos para que se cumpla?", say: "¿Qué signos, más o menos, hacen que se cumpla?", scene: `<div class="eqs"><div>${a} ⬜ ${b} &lt; ${c}</div><div>${d} ⬜ ${e} &gt; ${f}</div></div>`,
          ans, opts: combos.map(x => x.join(" ; ")), cols: 2, why: `${a} ${ok[0][0]} ${b} = ${ok[0][0] === "+" ? a + b : a - b} < ${c} y ${d} ${ok[0][1]} ${e} = ${ok[0][1] === "+" ? d + e : d - e} > ${f}.`, hint: "Prueba con + y con − en cada uno.",
        steps: T => { const r1 = s => s === "+" ? a + b : a - b, r2 = s => s === "+" ? d + e : d - e;
          return [
            { t: `Probamos en la primera: ¿con + o con − el resultado es <b>menor que ${c}</b>?`, b: BOARD.lines([`${a} + ${b} = ${a + b} ${a + b < c ? "✅" : "❌"} (${a + b} ${sg(a + b, c)} ${c})`, `${a} − ${b} = ${a - b} ${a - b < c ? "✅" : "❌"} (${a - b} ${sg(a - b, c)} ${c})`]) },
            { t: `Probamos en la segunda: ¿con + o con − el resultado es <b>mayor que ${f}</b>?`, bAdd: BOARD.lines([`${d} + ${e} = ${d + e} ${d + e > f ? "✅" : "❌"} (${d + e} ${sg(d + e, f)} ${f})`, `${d} − ${e} = ${d - e} ${d - e > f ? "✅" : "❌"} (${d - e} ${sg(d - e, f)} ${f})`]) },
            { t: `Solo funciona: ${a} ${ok[0][0]} ${b} = ${r1(ok[0][0])} &lt; ${c} y ${d} ${ok[0][1]} ${e} = ${r2(ok[0][1])} &gt; ${f}. Respuesta: <b>${ans}</b>.` }
          ]; } }; } },
    () => { const a = between(5, 20), b = a + between(3, 7), ans = b - a - 1;
      return { prompt: `¿Cuántos números son <b>mayores que ${a}</b> y <b>menores que ${b}</b>?`, say: `¿Cuántos números son mayores que ${a} y menores que ${b}?`, scene: "", ans, opts: numOpts(ans, [b - a, b - a + 1], 1),
        why: `Son ${Array.from({ length: ans }, (_, i) => a + 1 + i).join(", ")}: ${ans} números.`, hint: `No cuentes ni el ${a} ni el ${b}.`,
        steps: T => { const list = Array.from({ length: ans }, (_, i) => a + 1 + i);
          return [
            { t: `Buscamos los números que están <b>entre</b> ${a} y ${b}. El ${a} y el ${b} <b>no</b> se cuentan.` },
            { t: `En la recta los marcamos:`, b: BOARD.marks([{ v: a, c: "#94a3b8" }, ...list.map(v => ({ v, c: "#16a34a" })), { v: b, c: "#94a3b8" }], { min: a - 1, max: b + 1 }) },
            { t: `Son ${list.join(", ")}: <b>${ans}</b> números.`, b: BOARD.lines([list.map((v, i) => `${v}<sup style="color:#e11d48">${i + 1}</sup>`).join("  "), `Truco: ${b} − ${a} − 1 = ${ans}`]) }
          ]; },
        err: w => w === b - a ? `Restaste ${b} − ${a}, pero así cuentas también el ${b}. Hay que quitar 1.` : w === b - a + 1 ? `Contaste también el ${a} y el ${b}.` : "" }; },
  ]
];
lesson({ n: 8, title: "Mayor que, menor que e igual que", short: "> < =", char: "tito", music: "chiptune", deco: [">", "<", "=", "🐊"],
  hello: "¡Bip bup! Soy <b>Tito</b> 🤖. El signo <b>&gt;</b> es como la boca de un cocodrilo 🐊: ¡siempre se come al número mayor!",
  levels: LEVELS3(["Comparo números", "> < ="], ["Comparo sumas", "Resuelve y compara"], ["", "Signos que cumplen y números entre"]) }, GEN);
