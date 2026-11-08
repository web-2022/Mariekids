/* Tema 43 · Operadores matemáticos especiales · Tito */
const GEN = [
  [
    () => { const k = between(1, 5), a = between(2, 9), b = between(1, 9), ans = a + b + k;
      return { prompt: `Si <b>a ★ b = a + b + ${k}</b>, halla <b>${a} ★ ${b}</b>.`, say: `Si estrella significa sumar los dos números y además ${k}, ¿cuánto es ${a} estrella ${b}?`, scene: "", ans, opts: numOpts(ans, [a + b, ans + 1, a * b], 0), why: `${a} + ${b} + ${k} = ${ans}.`, hint: "Cambia a y b por los números.",
        steps: T => [
          { t: `Un <b>operador</b> es una regla inventada. «a ★ b = a + b + ${k}» nos dice qué hacer con los dos números.` },
          { t: `Cambiamos <b>a</b> por ${a} y <b>b</b> por ${b}:`, b: BOARD.lines([`a ★ b = a + b + ${k}`, `${a} ★ ${b} = ${a} + ${b} + ${k}`]) },
          { t: `${a} + ${b} + ${k} = <b>${ans}</b>.`, bAdd: BOARD.lines([`= ${ans}`]) }
        ],
        err: w => w === a + b ? `Te faltó sumar el ${k} de la regla.` : "" }; },
  ],
  [
    () => { const a = between(2, 8), b = between(1, 9), ans = 2 * a + b;
      return { prompt: `Si <b>a ● b = 2 × a + b</b> (el doble del primero más el segundo), halla <b>${a} ● ${b}</b>.`, say: `Si a círculo b es el doble del primero más el segundo, ¿cuánto es ${a} círculo ${b}?`, scene: "", ans, opts: numOpts(ans, [a + b, 2 * b + a, ans + 1], 0), why: `2 × ${a} + ${b} = ${2 * a} + ${b} = ${ans}.`, hint: "Primero el doble del primer número.",
        steps: T => [
          { t: `La regla dice: el <b>doble del primero</b> más el segundo. Cambiamos a = ${a} y b = ${b}.`, b: BOARD.lines([`a ● b = 2 × a + b`, `${a} ● ${b} = 2 × ${a} + ${b}`]) },
          { t: `Primero el doble de ${a}: ${a} + ${a} = ${2 * a}.`, bAdd: BOARD.lines([`= ${2 * a} + ${b}`]) },
          { t: `${2 * a} + ${b} = <b>${ans}</b>.` }
        ],
        err: w => w === a + b ? `Te faltó el doble del primero.` : w === 2 * b + a ? "Duplicaste el segundo, pero la regla duplica el <b>primero</b>." : "" }; },
    () => { const k = between(2, 5), x = between(k + 3, 20), ans = x - k;
      return { prompt: `Si <span class="card-op">x</span> = x − ${k}, halla el valor de <span class="card-op">${x}</span>`, say: `Si el cuadrito de un número es ese número menos ${k}, ¿cuánto vale el cuadrito de ${x}?`, scene: "", ans, opts: numOpts(ans, [x + k, x, ans - 1], 0), why: `${x} − ${k} = ${ans}.`, hint: "Cambia la x por el número.",
        steps: T => [
          { t: `La regla del cuadrito: a lo que está adentro le restamos ${k}.` },
          { t: `Cambiamos x por ${x}:`, b: BOARD.lines([`[x] = x − ${k}`, `[${x}] = ${x} − ${k}`]) },
          { t: `${x} − ${k} = <b>${ans}</b>.` }
        ],
        err: w => w === x + k ? `La regla resta ${k}, no suma.` : "" }; },
  ],
  [
    () => { const [x, y, z] = [between(1, 9), between(1, 9), between(1, 9)], ans = x + y + z - 1;
      return { prompt: `Si en el triángulo <b>△(x; y; z) = x + y + z</b>, halla el <b>antecesor</b> de △(${x}; ${y}; ${z}).`, say: `El triángulo suma sus tres números. ¿Cuál es el antecesor de triángulo de ${x}, ${y} y ${z}?`, scene: `<div class="seq">△ = x + y + z</div>`, ans, opts: numOpts(ans, [ans + 1, ans + 2, ans - 1], 0), why: `${x} + ${y} + ${z} = ${ans + 1}; su antecesor es ${ans}.`, hint: "Primero calcula el triángulo y luego réstale 1.",
        steps: T => [
          { t: `Paso 1: calculamos el triángulo: sumamos sus tres números.`, b: BOARD.lines([`△(${x}; ${y}; ${z}) = ${x} + ${y} + ${z} = ${x + y + z}`]) },
          { t: `Paso 2: el <b>antecesor</b> es el que va antes: ${x + y + z} − 1.`, bAdd: BOARD.jumps(x + y + z, [-1], { pad: 2 }) },
          { t: `El antecesor es <b>${ans}</b>.` }
        ],
        err: w => w === ans + 1 ? "Ese es el valor del triángulo; falta el antecesor (−1)." : w === ans + 2 ? "El antecesor es el de <b>antes</b>, no el de después." : "" }; },
    () => { const k = between(2, 4), a = between(2, 6), inner = a + k, ans = inner + k;
      return { prompt: `Si <span class="card-op">x</span> = x + ${k}, halla <span class="card-op"><span class="card-op">${a}</span></span>`, say: `Si el cuadrito suma ${k}, ¿cuánto vale el cuadrito del cuadrito de ${a}?`, scene: `<div class="legend">Resuelve primero el cuadro de adentro</div>`, ans, opts: numOpts(ans, [inner, a, ans + 1], 0), why: `Adentro: ${a} + ${k} = ${inner}. Afuera: ${inner} + ${k} = ${ans}.`, hint: "De adentro hacia afuera.",
        steps: T => [
          { t: `Hay un cuadrito dentro de otro. Se resuelve <b>de adentro hacia afuera</b>.` },
          { t: `Adentro: [${a}] = ${a} + ${k} = <b>${inner}</b>.`, b: BOARD.lines([`[ [${a}] ]`, `[ ${inner} ]`]) },
          { t: `Afuera: [${inner}] = ${inner} + ${k} = <b>${ans}</b>.`, bAdd: BOARD.lines([`${ans}`]) }
        ],
        err: w => w === inner ? "Solo resolviste el de adentro; falta el de afuera." : "" }; },
  ]
];
lesson({ n: 43, title: "Operadores matemáticos especiales", short: "Operadores", char: "tito", music: "electro", deco: ["★", "●", "△", "⬜"],
  hello: "¡Bip bup! Soy <b>Tito</b> 🤖. Los <b>operadores</b> son símbolos nuevos con su propia regla. ¡Sigue la regla!",
  levels: LEVELS3(["La estrella ★", "Sumar con una regla"], ["Círculos y cuadros", "Doble y resta"], ["", "Triángulos y cuadros dobles"]) }, GEN);
