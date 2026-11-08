/* Tema 19 · Sumas de una, dos y tres cifras · Tito */
const vert = (rows, sign = "+") => `<div class="eqs" style="font-family:monospace;align-items:flex-end">${rows.map((r, i) => `<div>${i === rows.length - 1 ? sign + " " : ""}${r}</div>`).join("")}<div style="border-top:3px solid #1e293b;min-width:90px;text-align:right">?</div></div>`;
const GEN = [
  [
    () => { const a = between(2, 9), b = between(2, 9), ans = a + b;
      return { prompt: `${a} + ${b} = ?`, say: `¿Cuánto es ${a} más ${b}?`, scene: "", ans, opts: numOpts(ans, [ans + 1, ans - 1, ans + 10], 0), why: `${a} + ${b} = ${ans}.`, hint: "Empieza por el número más grande y cuenta hacia adelante.",
        steps: T => { const M = Math.max(a, b), m = Math.min(a, b);
          return [
            { t: `Un truco: empezamos en el número <b>más grande</b>, ${M}, y contamos hacia adelante ${m} saltos.` },
            { t: `${M}… ¡y saltamos ${m} veces!`, b: BOARD.jumps(M, Array(m).fill(1), { step: .35 }) },
            { t: `Llegamos a ${ans}: ${a} + ${b} = <b>${ans}</b>.${ans > 10 ? ` (También: ${M} + ${10 - M} = 10, y 10 + ${ans - 10} = ${ans}.)` : ""}` }
          ]; } }; },
  ],
  [
    () => { const a = between(12, 69), b = between(5, 29), ans = a + b;
      return { prompt: "Resuelve la suma:", say: `¿Cuánto es ${a} más ${b}?`, scene: vert([a, b]), ans, opts: numOpts(ans, [ans - 10, ans + 10, ans + 1], 0), why: `${a} + ${b} = ${ans}. Primero unidades, luego decenas.`, hint: "Suma primero las unidades. Si pasa de 10, «llevas» 1 a las decenas.",
        steps: T => { const L = colTxt([a, b]).lines;
          return [
            { t: `Escribimos los números uno debajo del otro: <b>unidades debajo de unidades</b> y decenas debajo de decenas. Siempre se empieza por las unidades.`, b: BOARD.op([a, b]) },
            { t: L[0] },
            { t: L[1] || "Listo." },
            { t: `${a} + ${b} = <b>${ans}</b>.` }
          ]; },
        err: w => w === ans - 10 ? "Olvidaste el 1 que «llevamos» a las decenas." : w === ans + 10 ? "Llevaste 1 de más a las decenas." : "" }; },
  ],
  [
    () => { const a = between(100, 160), b = between(100, 160), c = between(100, 160), ans = a + b + c;
      return { prompt: `Don Casimiro recibió <b>${a}</b> marraquetas, <b>${b}</b> panes de yema y <b>${c}</b> chapitas. ¿Cuántos panes recibió en total?`, say: "¿Cuántos panes recibió en total?", scene: vert([a, b, c]), ans, opts: numOpts(ans, [ans - 10, ans + 10, ans - 100], 0),
        why: `${a} + ${b} + ${c} = ${ans}.`, hint: "Ordena los números uno debajo del otro: unidades con unidades.",
        steps: T => { const L = colTxt([a, b, c]).lines;
          return [
            { t: `«En total» es sumar los tres. Los ponemos en columna: unidades con unidades, decenas con decenas, centenas con centenas.`, b: BOARD.op([a, b, c]) },
            { t: L[0] },
            { t: L[1] },
            { t: `${L[2] || ""} Resultado: ${a} + ${b} + ${c} = <b>${ans}</b>.` }
          ]; },
        err: w => Math.abs(w - ans) === 10 || Math.abs(w - ans) === 100 ? "Revisa lo que se «lleva» de una columna a la otra." : "" }; },
    () => { const a = between(40, 60), b = between(50, 70), ans = a + b;
      return { prompt: `Una florista vendió <b>${a}</b> rosas blancas y <b>${b}</b> rosas rojas. ¿Cuántas rosas vendió en total?`, say: `Vendió ${a} rosas blancas y ${b} rosas rojas. ¿Cuántas vendió en total?`, scene: line(["🌹", "🤍", "💐"]), ans, opts: numOpts(ans, [ans - 10, ans + 10, ans + 1], 0), why: `${a} + ${b} = ${ans}.`, hint: "Suma unidades y luego decenas.",
        steps: T => { const L = colTxt([a, b]).lines;
          return [
            { t: `«En total» quiere decir que hay que <b>sumar</b> las rosas blancas y las rojas: ${a} + ${b}.`, b: BOARD.op([a, b]) },
            { t: L[0] },
            { t: L[1] },
            { t: `Vendió <b>${ans}</b> rosas.` }
          ]; },
        err: w => w === ans - 10 ? "Olvidaste el 1 que se lleva a las decenas." : "" }; },
  ]
];
lesson({ n: 19, title: "Sumas de números de una, dos y tres cifras", short: "Sumas", char: "tito", music: "chiptune", deco: ["➕", "🔢", "🧮", "✨"],
  hello: "¡Bip bup! Soy <b>Tito</b> 🤖. Vamos a <b>sumar</b> números de una, dos y hasta tres cifras.",
  levels: LEVELS3(["Una cifra", "Sumas hasta 18"], ["Dos cifras", "Sumas en columna"], ["", "Tres cifras en problemas"]) }, GEN);
