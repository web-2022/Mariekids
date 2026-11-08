/* Tema 64 · Ecuaciones de primer grado (halla x) · Kiki */
const XB = () => `<span class="weight" style="background:#7c3aed;font-size:16px;padding:6px 9px">x</span>`;
const PW = n => `<span class="weight">${n}</span>`;
const pesas = n => n <= 5 ? Array(n).fill(PW(1)).join("") : PW(n);
const GEN = [
  [ // Básico: la balanza
    () => { const x = between(2, 9), a = between(1, 5), b = x + a, ans = x;
      return { prompt: `La balanza está en equilibrio: <b>x + ${a} = ${b}</b>. ¿Cuánto vale x?`, say: `La balanza está en equilibrio. x más ${a} es igual a ${b}. ¿Cuánto vale x?`,
        scene: balance(XB() + pesas(a), PW(b)), ans, opts: numOpts(ans, [b + a, b, ans + 1], 0),
        why: `Quitamos ${a} de cada lado: x = ${b} − ${a} = ${ans}.`, hint: `¿Qué número más ${a} da ${b}?` }; },
    () => { const x = between(2, 12), a = between(2, 8), b = x + a, ans = x, sw = rnd(2);
      const eq = sw ? `${a} + x = ${b}` : `x + ${a} = ${b}`;
      return { prompt: `Halla x: <b>${eq}</b>`, say: `Halla x. ${eq.replace("+", "más").replace("=", "es igual a")}.`, scene: "",
        ans, opts: numOpts(ans, [b + a, b, ans - 1], 0), why: `x = ${b} − ${a} = ${ans}. Comprueba: ${a} + ${ans} = ${b}.`, hint: "Para quitar lo que se suma, resta." }; },
    () => { const x = between(2, 9), k = 2, b = k * x, ans = x;
      return { prompt: `<b>x + x = ${b}</b>. ¿Cuánto vale x?`, say: `x más x es igual a ${b}. ¿Cuánto vale x?`,
        scene: balance(XB() + XB(), PW(b)), ans, opts: numOpts(ans, [b, b - 2, ans + 1], 1),
        why: `Dos x iguales suman ${b}: x = ${b} ÷ 2 = ${ans}.`, hint: `¿Qué número sumado con él mismo da ${b}?` }; },
  ],
  [ // Intermedio: resta y número que se quita
    () => { const x = between(6, 20), a = between(2, 5), b = x - a, ans = x;
      return { prompt: `Halla x: <b>x − ${a} = ${b}</b>`, say: `Halla x. x menos ${a} es igual a ${b}.`, scene: "",
        ans, opts: numOpts(ans, [b - a, b, ans + 1], 0), why: `x = ${b} + ${a} = ${ans}. Comprueba: ${ans} − ${a} = ${b}.`, hint: "Para quitar lo que se resta, suma." }; },
    () => { const a = between(10, 20), x = between(2, a - 3), b = a - x, ans = x;
      return { prompt: `Halla x: <b>${a} − x = ${b}</b>`, say: `Halla x. ${a} menos x es igual a ${b}.`, scene: "",
        ans, opts: numOpts(ans, [a + b, b, ans + 1], 0), why: `x = ${a} − ${b} = ${ans}. Comprueba: ${a} − ${ans} = ${b}.`, hint: `¿Cuánto le quito a ${a} para que quede ${b}?` }; },
    () => { const x = between(3, 15), a = between(2, 9), b = between(1, Math.min(9, x + a - 1)), c = x + a - b, ans = x;
      return { prompt: `Halla x: <b>x + ${a} = ${c} + ${b}</b>`, say: `Halla x. x más ${a} es igual a ${c} más ${b}.`, scene: "",
        ans, opts: numOpts(ans, [c + b, c + b + a, ans + 1], 0), why: `${c} + ${b} = ${c + b}; x = ${c + b} − ${a} = ${ans}.`, hint: "Primero calcula el lado derecho." }; },
    () => { const x = between(3, 12), a = between(2, 9), b = x + a, ans = x, n = pick(["Tito", "Lula", "Bimba", "Kiki"]);
      return { prompt: `${n} tenía unas canicas, le regalaron <b>${a}</b> y ahora tiene <b>${b}</b>. ¿Cuántas tenía?`, say: `${n} tenía unas canicas, le regalaron ${a} y ahora tiene ${b}. ¿Cuántas tenía?`,
        scene: `<div class="legend">x + ${a} = ${b}</div>`, ans, opts: numOpts(ans, [b + a, b, ans + 1], 0), why: `x + ${a} = ${b} → x = ${b} − ${a} = ${ans}.`, hint: "Escribe la ecuación: lo que tenía + lo que le regalaron = lo que tiene." }; },
  ],
  [ // Reto concurso
    () => { const k = between(2, 4), x = between(2, 6), b = k * x, ans = x;
      return { prompt: `Halla x: <b>${k}x = ${b}</b>`, say: `Halla x. ${k} x es igual a ${b}.`, scene: balance(Array(k).fill(XB()).join(""), PW(b)),
        ans, opts: numOpts(ans, [b - k, b, ans + 1], 1), why: `${k}x significa ${Array(k).fill("x").join(" + ")}. ${k} × ${ans} = ${b}, entonces x = ${ans}.`, hint: `¿Qué número repetido ${k} veces da ${b}?` }; },
    () => { const k = between(2, 3), x = between(2, 6), a = between(1, 6), b = k * x + a, ans = x;
      return { prompt: `Halla x: <b>${k}x + ${a} = ${b}</b>`, say: `Halla x. ${k} x más ${a} es igual a ${b}.`, scene: balance(Array(k).fill(XB()).join("") + pesas(a), PW(b)),
        ans, opts: numOpts(ans, [b - a, (b - a) + 1, ans + 1, b], 1), why: `Quita ${a}: ${k}x = ${b - a}. Luego x = ${b - a} ÷ ${k} = ${ans}.`, hint: `Primero quita ${a} de los dos lados.` }; },
    () => { const x = between(3, 12), a = between(2, 8), b = x + a, ans = 2 * x;
      return { prompt: `Si <b>x + ${a} = ${b}</b>, ¿cuánto vale <b>x + x</b>?`, say: `Si x más ${a} es igual a ${b}, ¿cuánto vale x más x?`, scene: "",
        ans, opts: numOpts(ans, [x, 2 * b, ans + 1], 1), why: `x = ${b} − ${a} = ${x}. x + x = ${x} + ${x} = ${ans}.`, hint: "Primero halla x." }; },
  ]
];
GEN[2].push(() => { const x = between(5, 12), a = between(2, 4), b = x - a, ans = x + 1;
  return { prompt: `Si <b>x − ${a} = ${b}</b>, ¿cuál es el <b>sucesor</b> de x?`, say: `Si x menos ${a} es igual a ${b}, ¿cuál es el sucesor de x?`, scene: "",
    ans, opts: numOpts(ans, [x, b + 1, ans + 1], 1), why: `x = ${b} + ${a} = ${x}. Su sucesor es ${ans}.`, hint: "Halla x y luego súmale 1." }; });
lesson({ n: 64, next: 46, title: "Ecuaciones de primer grado (halla x)", short: "Ecuaciones", char: "kiki", music: "electro", deco: ["⚖️", "❓", "🔤", "⭐"],
  hello: "¡Hola! Soy <b>Kiki</b>. Una <b>ecuación</b> es como una balanza en equilibrio: si x + 3 = 8, quito 3 de cada lado y descubro que <b>x = 5</b>. ¡Siempre puedes comprobar tu respuesta!",
  levels: LEVELS3(["La balanza", "x + 3 = 8"], ["Restas y problemas", "x − 4 = 9 · 12 − x = 5"], ["", "2x = 10 · 3x + 2 = 14"]) }, GEN);
