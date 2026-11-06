/* Tema 43 · Operadores matemáticos especiales · Tito */
const GEN = [
  [
    () => { const k = between(1, 5), a = between(2, 9), b = between(1, 9), ans = a + b + k;
      return { prompt: `Si <b>a ★ b = a + b + ${k}</b>, halla <b>${a} ★ ${b}</b>.`, say: `Si estrella significa sumar los dos números y además ${k}, ¿cuánto es ${a} estrella ${b}?`, scene: "", ans, opts: numOpts(ans, [a + b, ans + 1, a * b], 0), why: `${a} + ${b} + ${k} = ${ans}.`, hint: "Cambia a y b por los números." }; },
  ],
  [
    () => { const a = between(2, 8), b = between(1, 9), ans = 2 * a + b;
      return { prompt: `Si <b>a ● b = 2 × a + b</b> (el doble del primero más el segundo), halla <b>${a} ● ${b}</b>.`, say: `Si a círculo b es el doble del primero más el segundo, ¿cuánto es ${a} círculo ${b}?`, scene: "", ans, opts: numOpts(ans, [a + b, 2 * b + a, ans + 1], 0), why: `2 × ${a} + ${b} = ${2 * a} + ${b} = ${ans}.`, hint: "Primero el doble del primer número." }; },
    () => { const k = between(2, 5), x = between(k + 3, 20), ans = x - k;
      return { prompt: `Si <span class="card-op">x</span> = x − ${k}, halla el valor de <span class="card-op">${x}</span>`, say: `Si el cuadrito de un número es ese número menos ${k}, ¿cuánto vale el cuadrito de ${x}?`, scene: "", ans, opts: numOpts(ans, [x + k, x, ans - 1], 0), why: `${x} − ${k} = ${ans}.`, hint: "Cambia la x por el número." }; },
  ],
  [
    () => { const [x, y, z] = [between(1, 9), between(1, 9), between(1, 9)], ans = x + y + z - 1;
      return { prompt: `Si en el triángulo <b>△(x; y; z) = x + y + z</b>, halla el <b>antecesor</b> de △(${x}; ${y}; ${z}).`, say: `El triángulo suma sus tres números. ¿Cuál es el antecesor de triángulo de ${x}, ${y} y ${z}?`, scene: `<div class="seq">△ = x + y + z</div>`, ans, opts: numOpts(ans, [ans + 1, ans + 2, ans - 1], 0), why: `${x} + ${y} + ${z} = ${ans + 1}; su antecesor es ${ans}.`, hint: "Primero calcula el triángulo y luego réstale 1." }; },
    () => { const k = between(2, 4), a = between(2, 6), inner = a + k, ans = inner + k;
      return { prompt: `Si <span class="card-op">x</span> = x + ${k}, halla <span class="card-op"><span class="card-op">${a}</span></span>`, say: `Si el cuadrito suma ${k}, ¿cuánto vale el cuadrito del cuadrito de ${a}?`, scene: `<div class="legend">Resuelve primero el cuadro de adentro</div>`, ans, opts: numOpts(ans, [inner, a, ans + 1], 0), why: `Adentro: ${a} + ${k} = ${inner}. Afuera: ${inner} + ${k} = ${ans}.`, hint: "De adentro hacia afuera." }; },
  ]
];
lesson({ n: 43, title: "Operadores matemáticos especiales", short: "Operadores", char: "tito", music: "electro", deco: ["★", "●", "△", "⬜"],
  hello: "¡Bip bup! Soy <b>Tito</b> 🤖. Los <b>operadores</b> son símbolos nuevos con su propia regla. ¡Sigue la regla!",
  levels: LEVELS3(["La estrella ★", "Sumar con una regla"], ["Círculos y cuadros", "Doble y resta"], ["", "Triángulos y cuadros dobles"]) }, GEN);
