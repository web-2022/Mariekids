/* Tema 13 · Valor posicional, ábaco y descomposición · Tito */
const GEN = [
  [
    () => { const d = between(1, 9), u = between(0, 9), ans = 10 * d + u;
      return { prompt: "¿Qué número muestra el <b>ábaco</b>?", say: "¿Qué número muestra el ábaco?", scene: abacus([d, u]), ans, opts: numOpts(ans, [10 * u + d, d + u, ans + 1], 0), why: `${d} en las decenas y ${u} en las unidades: ${ans}.`, hint: "La varilla D son decenas y la U son unidades.",
        steps: T => [
          { t: `En el ábaco, cada bolita de la varilla <b>D</b> vale <b>10</b> y cada bolita de la varilla <b>U</b> vale <b>1</b>.` },
          { t: `Contamos las decenas de 10 en 10:`, go: T.count(T.of("D", "ellipse"), { label: k => String(10 * k), say: k => String(10 * k), ms: 900 }) },
          u ? { t: `Seguimos con las unidades, de 1 en 1:`, go: T.count(T.of("U", "ellipse"), { from: 10 * d + 1 }) } : { t: `La varilla U no tiene bolitas: 0 unidades.` },
          { t: `${d} decenas y ${u} unidades: <b>${ans}</b>.`, b: BOARD.table([["D", "U"], [d, u]]) }
        ],
        err: w => w === 10 * u + d ? "¡Leíste al revés! La varilla D va a la izquierda." : w === d + u ? "Contaste todas las bolitas como 1, pero las de D valen 10." : "" }; },
  ],
  [
    () => { const c = between(1, 3), d = between(0, 9), u = between(0, 9), ans = 100 * c + 10 * d + u;
      return { prompt: "¿Qué número muestra el ábaco?", say: "¿Qué número muestra el ábaco?", scene: abacus([c, d, u]), ans, opts: numOpts(ans, [100 * c + 10 * u + d, c + d + u, ans + 10], 0), why: `${c}C ${d}D ${u}U = ${ans}.`, hint: "C centenas, D decenas, U unidades.",
        steps: T => [
          { t: `Bolitas en <b>C</b> valen 100, en <b>D</b> valen 10 y en <b>U</b> valen 1.` },
          { t: `Contamos: centenas de 100 en 100, decenas de 10 en 10, unidades de 1 en 1.`, go: d2 => T.count(T.of("C", "ellipse"), { label: k => String(100 * k), say: k => String(100 * k), ms: 900 })(() => T.count(T.of("D", "ellipse"), { label: k => String(100 * c + 10 * k), say: k => String(100 * c + 10 * k), ms: 700 })(() => T.count(T.of("U", "ellipse"), { from: 100 * c + 10 * d + 1, ms: 600 })(d2))) },
          { t: `${c} centena${c > 1 ? "s" : ""}, ${d} decena${d === 1 ? "" : "s"} y ${u} unidad${u === 1 ? "" : "es"}: <b>${ans}</b>.`, b: BOARD.table([["C", "D", "U"], [c, d, u]]) }
        ],
        err: w => w === c + d + u ? "Contaste todas las bolitas como 1, pero cada varilla vale distinto." : "" }; },
    () => { const n = between(21, 99), d = Math.floor(n / 10), u = n % 10, t = rnd(2);
      const __q = t ? { prompt: `${n} = ${d * 10} + ⬜`, say: `${n} es igual a ${d * 10} más ¿cuánto?`, scene: "", ans: u, opts: numOpts(u, [d, n - u, u + 10], 0), why: `${n} = ${d * 10} + ${u}.`, hint: "Separa las decenas y las unidades." }
        : { prompt: `En el número <b>${n}</b>, ¿cuánto <b>vale</b> la cifra ${d}?`, say: `En el número ${n}, ¿cuánto vale la cifra ${d}?`, scene: `<div class="big-num">${n}</div>`, ans: 10 * d, opts: numOpts(10 * d, [d, n, 100 * d], 0), why: `El ${d} está en las decenas: vale ${10 * d}.`, hint: "Depende del lugar donde está." };
      return { ...__q,
        steps: T => t ? [
          { t: `${n} tiene ${d} decenas y ${u} unidades.`, b: BOARD.du(n) },
          { t: `${d} decenas = ${d * 10}. Lo que falta son las unidades: ${u}.` },
          { t: `${n} = ${d * 10} + <b>${u}</b>.` }
        ] : [
          { t: `El valor de una cifra depende del <b>lugar</b> donde está. En ${n}, el ${d} está en el lugar de las <b>decenas</b>.`, b: BOARD.table([["D", "U"], [d, u]]) },
          { t: `${d} decenas son ${d} grupos de 10:`, bAdd: BOARD.du(d * 10, { total: false }) },
          { t: `Entonces el ${d} vale <b>${10 * d}</b>.` }
        ] }; },
  ],
  [
    () => { const a = [between(1, 9), between(0, 9)], b = [between(1, 9), between(0, 9)], x = 10 * a[0] + a[1], y = 10 * b[0] + b[1], ans = x + y;
      return { prompt: "¿Cuál es la <b>suma</b> de los números que muestran los ábacos?", say: "Suma los números de los dos ábacos.", scene: `<div class="dice">${abacus(a)}${abacus(b)}</div>`, ans, opts: numOpts(ans, [ans + 10, ans - 1, x + 10 * b[1] + b[0]], 0),
        why: `${x} + ${y} = ${ans}.`, hint: "Primero lee cada ábaco.",
        steps: T => [
          { t: `Primero leemos cada ábaco: decenas (D) y unidades (U).`, b: BOARD.lines([`Primer ábaco: ${a[0]}D ${a[1]}U = ${x}`, `Segundo ábaco: ${b[0]}D ${b[1]}U = ${y}`]) },
          { t: `Ahora sumamos en columna: unidades con unidades y decenas con decenas.`, b: BOARD.col(x, y) },
          { t: `${x} + ${y} = <b>${ans}</b>.` }
        ] }; },
    () => { const a = between(2, 9), b = between(2, 9), s = a + b, t = pick(["D", "U"]), ans = t === "D" ? Math.floor(s / 10) : s % 10;
      return { prompt: `Halla la cifra de las <b>${t === "D" ? "decenas" : "unidades"}</b> en: ${a} + ${b}`, say: `Halla la cifra de las ${t === "D" ? "decenas" : "unidades"} del resultado de ${a} más ${b}.`, scene: "", ans, opts: numOpts(ans, [s, t === "D" ? s % 10 : Math.floor(s / 10), ans + 1], 0),
        why: `${a} + ${b} = ${s}. La cifra de las ${t === "D" ? "decenas" : "unidades"} es ${ans}.`, hint: "Primero resuelve la suma.",
        steps: T => [
          { t: `Primero resolvemos la suma: ${a} + ${b}. Contamos ${b} saltos desde ${a}:`, b: BOARD.jumps(a, Array(b).fill(1), { step: .35 }) },
          { t: `${a} + ${b} = <b>${s}</b>.`, b: s >= 10 ? BOARD.table([["D", "U"], [Math.floor(s / 10), s % 10]]) : BOARD.lines([`${s} tiene 0 decenas y ${s} unidades`]) },
          { t: `La cifra de las <b>${t === "D" ? "decenas" : "unidades"}</b> (${t === "D" ? "izquierda" : "derecha"}) es <b>${ans}</b>.` }
        ],
        err: w => w === s ? "Ese es el resultado completo; piden solo una cifra." : "" }; },
  ]
];
lesson({ n: 13, title: "Valor posicional, ábaco y descomposición numérica", short: "Ábaco", char: "tito", music: "electro", deco: ["🧮", "C", "D", "U"],
  hello: "¡Bip bup! Soy <b>Tito</b> 🤖. Cada cifra <b>vale</b> según el lugar donde está. ¡El ábaco nos ayuda a verlo!",
  levels: LEVELS3(["Ábaco D U", "Leer el ábaco"], ["Centenas y descomponer", "C D U y valor de cada cifra"], ["", "Sumar ábacos y cifras escondidas"]) }, GEN);
