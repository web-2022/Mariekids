/* Tema 8 · Mayor que, menor que e igual que · Tito */
const sg = (a, b) => a > b ? ">" : a < b ? "<" : "=";
const GEN = [
  [
    () => { const a = between(0, 20), b = pick([a, between(0, 20), between(0, 20)]), ans = sg(a, b);
      return { prompt: "¿Qué signo va en el cuadrito?", say: `¿Qué signo va entre ${a} y ${b}?`, scene: `<div class="seq">${a} &nbsp;⬜&nbsp; ${b}</div><div class="legend">&gt; mayor que · &lt; menor que · = igual</div>`,
        ans, opts: [">", "<", "="], cols: 3, why: `${a} ${ans} ${b}.`, hint: "La boca abierta del cocodrilo 🐊 se come al número MAYOR." }; },
  ],
  [
    () => { const a = between(1, 9), b = between(1, 9), c = between(2, 18), ans = sg(a + b, c);
      return { prompt: "¿Qué signo va en el cuadrito?", say: `¿Qué signo va entre ${a} más ${b} y ${c}?`, scene: `<div class="seq">${a} + ${b} &nbsp;⬜&nbsp; ${c}</div>`, ans, opts: [">", "<", "="], cols: 3,
        why: `${a} + ${b} = ${a + b}, y ${a + b} ${ans} ${c}.`, hint: "Primero resuelve la suma, después compara." }; },
    () => { const a = between(5, 40), ans = a + 1;
      return { prompt: `¿Qué número es <b>mayor que ${a}</b> y <b>menor que ${a + 2}</b>?`, say: `¿Qué número es mayor que ${a} y menor que ${a + 2}?`, scene: "", ans, opts: numOpts(ans, [a, a + 2, a + 3]), why: `Entre ${a} y ${a + 2} está ${ans}.`, hint: "Busca el número que está en medio." }; },
  ],
  [
    () => { for (;;) { const a = between(3, 9), b = between(1, 3), c = between(2, 12), d = between(3, 9), e = between(1, 3), f = between(2, 12);
        const combos = [["+", "+"], ["+", "−"], ["−", "+"], ["−", "−"]], ok = combos.filter(([s, t]) => (s === "+" ? a + b : a - b) < c && (t === "+" ? d + e : d - e) > f);
        if (ok.length !== 1) continue; const ans = ok[0].join(" ; ");
        return { prompt: "¿Qué signos (+ o −) deben ir en los cuadritos para que se cumpla?", say: "¿Qué signos, más o menos, hacen que se cumpla?", scene: `<div class="eqs"><div>${a} ⬜ ${b} &lt; ${c}</div><div>${d} ⬜ ${e} &gt; ${f}</div></div>`,
          ans, opts: combos.map(x => x.join(" ; ")), cols: 2, why: `${a} ${ok[0][0]} ${b} = ${ok[0][0] === "+" ? a + b : a - b} < ${c} y ${d} ${ok[0][1]} ${e} = ${ok[0][1] === "+" ? d + e : d - e} > ${f}.`, hint: "Prueba con + y con − en cada uno." }; } },
    () => { const a = between(5, 20), b = a + between(3, 7), ans = b - a - 1;
      return { prompt: `¿Cuántos números son <b>mayores que ${a}</b> y <b>menores que ${b}</b>?`, say: `¿Cuántos números son mayores que ${a} y menores que ${b}?`, scene: "", ans, opts: numOpts(ans, [b - a, b - a + 1], 1),
        why: `Son ${Array.from({ length: ans }, (_, i) => a + 1 + i).join(", ")}: ${ans} números.`, hint: `No cuentes ni el ${a} ni el ${b}.` }; },
  ]
];
lesson({ n: 8, title: "Mayor que, menor que e igual que", short: "> < =", char: "tito", music: "chiptune", deco: [">", "<", "=", "🐊"],
  hello: "¡Bip bup! Soy <b>Tito</b> 🤖. El signo <b>&gt;</b> es como la boca de un cocodrilo 🐊: ¡siempre se come al número mayor!",
  levels: LEVELS3(["Comparo números", "> < ="], ["Comparo sumas", "Resuelve y compara"], ["", "Signos que cumplen y números entre"]) }, GEN);
