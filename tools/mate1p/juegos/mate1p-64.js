/* Tema 64 · Ecuaciones de primer grado (halla x) · Kiki */
const XB = () => `<span class="weight" style="background:#7c3aed;font-size:16px;padding:6px 9px">x</span>`;
const PW = n => `<span class="weight">${n}</span>`;
const pesas = n => n <= 5 ? Array(n).fill(PW(1)).join("") : PW(n);
const GEN = [
  [ // Básico: la balanza
    () => { const x = between(2, 9), a = between(1, 5), b = x + a, ans = x;
      return { prompt: `La balanza está en equilibrio: <b>x + ${a} = ${b}</b>. ¿Cuánto vale x?`, say: `La balanza está en equilibrio. x más ${a} es igual a ${b}. ¿Cuánto vale x?`,
        scene: balance(XB() + pesas(a), PW(b)), ans, opts: numOpts(ans, [b + a, b, ans + 1], 0),
        why: `Quitamos ${a} de cada lado: x = ${b} − ${a} = ${ans}.`, hint: `¿Qué número más ${a} da ${b}?`,
        steps: T => [
          { t: `Una ecuación es como una balanza en equilibrio: los dos lados pesan igual. La caja <b>x</b> es lo que no sabemos.` },
          { t: `Quitamos ${a} de <b>cada lado</b>: la balanza sigue en equilibrio.`, b: BOARD.lines([`x + ${a} = ${b}`, `x + ${a} − ${a} = ${b} − ${a}`, `x = ${ans}`], { step: 1 }) },
          { t: `x vale <b>${ans}</b>. Comprobamos: ${ans} + ${a} = ${b}. ✅` }
        ],
        err: w => w === b ? `${b} es el total; hay que quitar el ${a}.` : w === b + a ? `Sumaste ${a}; hay que quitarlo de los dos lados.` : "" }; },
    () => { const x = between(2, 12), a = between(2, 8), b = x + a, ans = x, sw = rnd(2);
      const eq = sw ? `${a} + x = ${b}` : `x + ${a} = ${b}`;
      return { prompt: `Halla x: <b>${eq}</b>`, say: `Halla x. ${eq.replace("+", "más").replace("=", "es igual a")}.`, scene: "",
        ans, opts: numOpts(ans, [b + a, b, ans - 1], 0), why: `x = ${b} − ${a} = ${ans}. Comprueba: ${a} + ${ans} = ${b}.`, hint: "Para quitar lo que se suma, resta.",
        steps: T => [
          { t: `Queremos dejar la x <b>sola</b>. El ${a} está sumando: para quitarlo, <b>restamos</b> ${a} en los dos lados.` },
          { t: `Hacemos la resta:`, b: BOARD.lines([eq, `x = ${b} − ${a}`, `x = ${ans}`], { step: 1 }) },
          { t: `x = <b>${ans}</b>. Comprobamos: ${a} + ${ans} = ${b}. ✅` }
        ],
        err: w => w === b + a ? "El número suma; para quitarlo hay que restar." : "" }; },
    () => { const x = between(2, 9), k = 2, b = k * x, ans = x;
      return { prompt: `<b>x + x = ${b}</b>. ¿Cuánto vale x?`, say: `x más x es igual a ${b}. ¿Cuánto vale x?`,
        scene: balance(XB() + XB(), PW(b)), ans, opts: numOpts(ans, [b, b - 2, ans + 1], 1),
        why: `Dos x iguales suman ${b}: x = ${b} ÷ 2 = ${ans}.`, hint: `¿Qué número sumado con él mismo da ${b}?`,
        steps: T => [
          { t: `x + x son <b>dos</b> x iguales. Juntas pesan ${b}.` },
          { t: `Repartimos ${b} en 2 partes iguales:`, b: BOARD.share(b, 2, "●", { names: ["x", "x"] }) },
          { t: `Cada x vale <b>${ans}</b>: ${ans} + ${ans} = ${b}. ✅` }
        ],
        err: w => w === b ? "Ese es lo que pesan las dos x juntas." : "" }; },
  ],
  [ // Intermedio: resta y número que se quita
    () => { const x = between(6, 20), a = between(2, 5), b = x - a, ans = x;
      return { prompt: `Halla x: <b>x − ${a} = ${b}</b>`, say: `Halla x. x menos ${a} es igual a ${b}.`, scene: "",
        ans, opts: numOpts(ans, [b - a, b, ans + 1], 0), why: `x = ${b} + ${a} = ${ans}. Comprueba: ${ans} − ${a} = ${b}.`, hint: "Para quitar lo que se resta, suma.",
        steps: T => [
          { t: `Al número x le quitaron ${a} y quedó ${b}. Para volver al número de antes, <b>sumamos</b> ${a}.` },
          { t: `Sumamos ${a} en los dos lados:`, b: BOARD.lines([`x − ${a} = ${b}`, `x = ${b} + ${a}`, `x = ${ans}`], { step: 1 }) },
          { t: `x = <b>${ans}</b>. Comprobamos: ${ans} − ${a} = ${b}. ✅` }
        ],
        err: w => w === b - a ? "Para quitar una resta se suma, no se resta." : "" }; },
    () => { const a = between(10, 20), x = between(2, a - 3), b = a - x, ans = x;
      return { prompt: `Halla x: <b>${a} − x = ${b}</b>`, say: `Halla x. ${a} menos x es igual a ${b}.`, scene: "",
        ans, opts: numOpts(ans, [a + b, b, ans + 1], 0), why: `x = ${a} − ${b} = ${ans}. Comprueba: ${a} − ${ans} = ${b}.`, hint: `¿Cuánto le quito a ${a} para que quede ${b}?`,
        steps: T => [
          { t: `A ${a} le quitamos x y quedó ${b}. Pregunta: ¿cuánto le quito a ${a} para que quede ${b}?` },
          { t: `Contamos hacia atrás desde ${a} hasta ${b}:`, b: BOARD.jumps(a, Array(ans).fill(-1), { step: .3 }) },
          { t: `Dimos ${ans} saltos: x = ${a} − ${b} = <b>${ans}</b>. Comprobamos: ${a} − ${ans} = ${b}. ✅` }
        ],
        err: w => w === a + b ? "Aquí no se suma: buscamos cuánto quitar." : "" }; },
    () => { const x = between(3, 15), a = between(2, 9), b = between(1, Math.min(9, x + a - 1)), c = x + a - b, ans = x;
      return { prompt: `Halla x: <b>x + ${a} = ${c} + ${b}</b>`, say: `Halla x. x más ${a} es igual a ${c} más ${b}.`, scene: "",
        ans, opts: numOpts(ans, [c + b, c + b + a, ans + 1], 0), why: `${c} + ${b} = ${c + b}; x = ${c + b} − ${a} = ${ans}.`, hint: "Primero calcula el lado derecho.",
        steps: T => [
          { t: `Primero calculamos el lado derecho: ${c} + ${b} = <b>${c + b}</b>.`, b: BOARD.lines([`x + ${a} = ${c} + ${b}`, `x + ${a} = ${c + b}`]) },
          { t: `Ahora quitamos ${a} de los dos lados:`, bAdd: BOARD.lines([`x = ${c + b} − ${a}`, `x = ${ans}`]) },
          { t: `x = <b>${ans}</b>. Comprobamos: ${ans} + ${a} = ${c + b}. ✅` }
        ],
        err: w => w === c + b ? "Ese es el lado derecho; falta quitar el " + a + "." : "" }; },
    () => { const x = between(3, 12), a = between(2, 9), b = x + a, ans = x, n = pick(["Tito", "Lula", "Bimba", "Kiki"]);
      return { prompt: `${n} tenía unas canicas, le regalaron <b>${a}</b> y ahora tiene <b>${b}</b>. ¿Cuántas tenía?`, say: `${n} tenía unas canicas, le regalaron ${a} y ahora tiene ${b}. ¿Cuántas tenía?`,
        scene: `<div class="legend">x + ${a} = ${b}</div>`, ans, opts: numOpts(ans, [b + a, b, ans + 1], 0), why: `x + ${a} = ${b} → x = ${b} − ${a} = ${ans}.`, hint: "Escribe la ecuación: lo que tenía + lo que le regalaron = lo que tiene.",
        steps: T => [
          { t: `Lo que no sabemos (las canicas que tenía) es la <b>x</b>. Escribimos la ecuación: lo que tenía + lo que le regalaron = lo que tiene.`, b: BOARD.lines([`x + ${a} = ${b}`]) },
          { t: `Quitamos ${a} de los dos lados:`, bAdd: BOARD.lines([`x = ${b} − ${a} = ${ans}`]) },
          { t: `Tenía <b>${ans}</b> canicas. Comprobamos: ${ans} + ${a} = ${b}. ✅` }
        ],
        err: w => w === b ? "Eso es lo que tiene ahora." : w === b + a ? "Sumaste; para saber lo de antes hay que quitar lo que le regalaron." : "" }; },
  ],
  [ // Reto concurso
    () => { const k = between(2, 4), x = between(2, 6), b = k * x, ans = x;
      return { prompt: `Halla x: <b>${k}x = ${b}</b>`, say: `Halla x. ${k} x es igual a ${b}.`, scene: balance(Array(k).fill(XB()).join(""), PW(b)),
        ans, opts: numOpts(ans, [b - k, b, ans + 1], 1), why: `${k}x significa ${Array(k).fill("x").join(" + ")}. ${k} × ${ans} = ${b}, entonces x = ${ans}.`, hint: `¿Qué número repetido ${k} veces da ${b}?`,
        steps: T => [
          { t: `${k}x son ${k} cajas x iguales que juntas pesan ${b}.` },
          { t: `Repartimos ${b} en ${k} partes iguales:`, b: BOARD.share(b, k, "●", { names: Array(k).fill("x") }) },
          { t: `Cada x vale <b>${ans}</b>: ${k} × ${ans} = ${b}. ✅` }
        ],
        err: w => w === b - k ? `${k}x no es «${b} − ${k}»: son ${k} x iguales.` : "" }; },
    () => { const k = between(2, 3), x = between(2, 6), a = between(1, 6), b = k * x + a, ans = x;
      return { prompt: `Halla x: <b>${k}x + ${a} = ${b}</b>`, say: `Halla x. ${k} x más ${a} es igual a ${b}.`, scene: balance(Array(k).fill(XB()).join("") + pesas(a), PW(b)),
        ans, opts: numOpts(ans, [b - a, (b - a) + 1, ans + 1, b], 1), why: `Quita ${a}: ${k}x = ${b - a}. Luego x = ${b - a} ÷ ${k} = ${ans}.`, hint: `Primero quita ${a} de los dos lados.`,
        steps: T => [
          { t: `Primero quitamos las pesas sueltas: restamos ${a} en los dos lados.`, b: BOARD.lines([`${k}x + ${a} = ${b}`, `${k}x = ${b} − ${a} = ${b - a}`]) },
          { t: `Ahora ${k} x pesan ${b - a}. Repartimos en ${k} partes iguales:`, b: BOARD.share(b - a, k, "●", { names: Array(k).fill("x") }) },
          { t: `x = <b>${ans}</b>. Comprobamos: ${k} × ${ans} + ${a} = ${b}. ✅` }
        ],
        err: w => w === b - a ? `Ese es el peso de las ${k} x juntas; falta repartir.` : "" }; },
    () => { const x = between(3, 12), a = between(2, 8), b = x + a, ans = 2 * x;
      return { prompt: `Si <b>x + ${a} = ${b}</b>, ¿cuánto vale <b>x + x</b>?`, say: `Si x más ${a} es igual a ${b}, ¿cuánto vale x más x?`, scene: "",
        ans, opts: numOpts(ans, [x, 2 * b, ans + 1], 1), why: `x = ${b} − ${a} = ${x}. x + x = ${x} + ${x} = ${ans}.`, hint: "Primero halla x.",
        steps: T => [
          { t: `Primero hallamos x: x + ${a} = ${b} → x = ${b} − ${a} = <b>${x}</b>.`, b: BOARD.lines([`x = ${b} − ${a} = ${x}`]) },
          { t: `Ahora calculamos x + x: ${x} + ${x}.`, bAdd: BOARD.lines([`x + x = ${x} + ${x} = ${ans}`]) },
          { t: `x + x = <b>${ans}</b>.` }
        ],
        err: w => w === x ? "Ese es el valor de x; piden x + x." : "" }; },
  ]
];
GEN[2].push(() => { const x = between(5, 12), a = between(2, 4), b = x - a, ans = x + 1;
  return { prompt: `Si <b>x − ${a} = ${b}</b>, ¿cuál es el <b>sucesor</b> de x?`, say: `Si x menos ${a} es igual a ${b}, ¿cuál es el sucesor de x?`, scene: "",
    ans, opts: numOpts(ans, [x, b + 1, ans + 1], 1), why: `x = ${b} + ${a} = ${x}. Su sucesor es ${ans}.`, hint: "Halla x y luego súmale 1.",
    steps: T => [
      { t: `Primero hallamos x. Le quitaron ${a} y quedó ${b}: sumamos ${a} para volver.`, b: BOARD.lines([`x − ${a} = ${b}`, `x = ${b} + ${a} = ${x}`]) },
      { t: `El <b>sucesor</b> es el que viene después: ${x} + 1.`, b: BOARD.jumps(x, [1], { pad: 2 }) },
      { t: `El sucesor de x es <b>${ans}</b>.` }
    ],
    err: w => w === x ? "Ese es el valor de x; falta el sucesor (+1)." : "" }; });
lesson({ n: 64, next: 46, title: "Ecuaciones de primer grado (halla x)", short: "Ecuaciones", char: "kiki", music: "electro", deco: ["⚖️", "❓", "🔤", "⭐"],
  hello: "¡Hola! Soy <b>Kiki</b>. Una <b>ecuación</b> es como una balanza en equilibrio: si x + 3 = 8, quito 3 de cada lado y descubro que <b>x = 5</b>. ¡Siempre puedes comprobar tu respuesta!",
  levels: LEVELS3(["La balanza", "x + 3 = 8"], ["Restas y problemas", "x − 4 = 9 · 12 − x = 5"], ["", "2x = 10 · 3x + 2 = 14"]) }, GEN);
