/* Tema 13 · Valor posicional, ábaco y descomposición · Tito */
const GEN = [
  [
    () => { const d = between(1, 9), u = between(0, 9), ans = 10 * d + u;
      return { prompt: "¿Qué número muestra el <b>ábaco</b>?", say: "¿Qué número muestra el ábaco?", scene: abacus([d, u]), ans, opts: numOpts(ans, [10 * u + d, d + u, ans + 1], 0), why: `${d} en las decenas y ${u} en las unidades: ${ans}.`, hint: "La varilla D son decenas y la U son unidades." }; },
  ],
  [
    () => { const c = between(1, 3), d = between(0, 9), u = between(0, 9), ans = 100 * c + 10 * d + u;
      return { prompt: "¿Qué número muestra el ábaco?", say: "¿Qué número muestra el ábaco?", scene: abacus([c, d, u]), ans, opts: numOpts(ans, [100 * c + 10 * u + d, c + d + u, ans + 10], 0), why: `${c}C ${d}D ${u}U = ${ans}.`, hint: "C centenas, D decenas, U unidades." }; },
    () => { const n = between(21, 99), d = Math.floor(n / 10), u = n % 10, t = rnd(2);
      return t ? { prompt: `${n} = ${d * 10} + ⬜`, say: `${n} es igual a ${d * 10} más ¿cuánto?`, scene: "", ans: u, opts: numOpts(u, [d, n - u, u + 10], 0), why: `${n} = ${d * 10} + ${u}.`, hint: "Separa las decenas y las unidades." }
        : { prompt: `En el número <b>${n}</b>, ¿cuánto <b>vale</b> la cifra ${d}?`, say: `En el número ${n}, ¿cuánto vale la cifra ${d}?`, scene: `<div class="big-num">${n}</div>`, ans: 10 * d, opts: numOpts(10 * d, [d, n, 100 * d], 0), why: `El ${d} está en las decenas: vale ${10 * d}.`, hint: "Depende del lugar donde está." }; },
  ],
  [
    () => { const a = [between(1, 9), between(0, 9)], b = [between(1, 9), between(0, 9)], x = 10 * a[0] + a[1], y = 10 * b[0] + b[1], ans = x + y;
      return { prompt: "¿Cuál es la <b>suma</b> de los números que muestran los ábacos?", say: "Suma los números de los dos ábacos.", scene: `<div class="dice">${abacus(a)}${abacus(b)}</div>`, ans, opts: numOpts(ans, [ans + 10, ans - 1, x + 10 * b[1] + b[0]], 0),
        why: `${x} + ${y} = ${ans}.`, hint: "Primero lee cada ábaco." }; },
    () => { const a = between(2, 9), b = between(2, 9), s = a + b, t = pick(["D", "U"]), ans = t === "D" ? Math.floor(s / 10) : s % 10;
      return { prompt: `Halla la cifra de las <b>${t === "D" ? "decenas" : "unidades"}</b> en: ${a} + ${b}`, say: `Halla la cifra de las ${t === "D" ? "decenas" : "unidades"} del resultado de ${a} más ${b}.`, scene: "", ans, opts: numOpts(ans, [s, t === "D" ? s % 10 : Math.floor(s / 10), ans + 1], 0),
        why: `${a} + ${b} = ${s}. La cifra de las ${t === "D" ? "decenas" : "unidades"} es ${ans}.`, hint: "Primero resuelve la suma." }; },
  ]
];
lesson({ n: 13, title: "Valor posicional, ábaco y descomposición numérica", short: "Ábaco", char: "tito", music: "electro", deco: ["🧮", "C", "D", "U"],
  hello: "¡Bip bup! Soy <b>Tito</b> 🤖. Cada cifra <b>vale</b> según el lugar donde está. ¡El ábaco nos ayuda a verlo!",
  levels: LEVELS3(["Ábaco D U", "Leer el ábaco"], ["Centenas y descomponer", "C D U y valor de cada cifra"], ["", "Sumar ábacos y cifras escondidas"]) }, GEN);
