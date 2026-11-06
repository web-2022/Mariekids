/* Tema 11 · Formación de números con cifras · Bimba */
const card = d => `<span class="card-op">${d}</span>`;
const perm2 = ds => { const s = new Set(); ds.forEach((a, i) => ds.forEach((b, j) => { if (i !== j && a !== 0) s.add(10 * a + b); })); return [...s]; };
const perm3 = ds => { const s = new Set(); ds.forEach((a, i) => ds.forEach((b, j) => ds.forEach((c, k) => { if (i !== j && j !== k && i !== k && a !== 0) s.add(100 * a + 10 * b + c); }))); return [...s]; };
const GEN = [
  [
    () => { const ds = sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 2), big = rnd(2) === 0, all = perm2(ds), ans = big ? Math.max(...all) : Math.min(...all);
      return { prompt: `Con estas tarjetas, ¿cuál es el número de dos cifras <b>${big ? "más grande" : "más pequeño"}</b>?`, say: `¿Cuál es el número ${big ? "más grande" : "más pequeño"} que puedes formar con las dos tarjetas?`, scene: ds.map(card).join(" "),
        ans, opts: numOpts(ans, [...all.filter(x => x !== ans), ds[0] + ds[1]], 0), why: big ? "Pon la cifra mayor en las decenas." : "Pon la cifra menor en las decenas.", hint: "La cifra de la izquierda (decenas) vale más." }; },
  ],
  [
    () => { const ds = sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 3), big = rnd(2) === 0, all = perm2(ds), ans = big ? Math.max(...all) : Math.min(...all);
      return { prompt: `Usando <b>dos</b> de estas tarjetas, ¿cuál es el número <b>${big ? "mayor" : "menor"}</b> que puedes formar?`, say: `Usando dos tarjetas, ¿cuál es el número ${big ? "mayor" : "menor"}?`, scene: ds.map(card).join(" "),
        ans, opts: numOpts(ans, sample(all.filter(x => x !== ans), 3), 0), why: `El ${big ? "mayor" : "menor"} es ${ans}.`, hint: "Elige bien la cifra de las decenas primero." }; },
    () => { const ds = sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 3), ans = perm2(ds).length;
      return { prompt: "¿Cuántos números <b>de dos cifras diferentes</b> puedes formar con estas tarjetas?", say: "¿Cuántos números de dos cifras diferentes puedes formar?", scene: ds.map(card).join(" "), ans, opts: numOpts(ans, [3, 9, 4], 1),
        why: `Son ${perm2(ds).sort((a, b) => a - b).join(", ")}: ${ans} números.`, hint: "Pon cada tarjeta adelante y combínala con las otras dos." }; },
  ],
  [
    () => { const ds = [0, ...sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)], big = rnd(2) === 0, all = perm3(ds), ans = big ? Math.max(...all) : Math.min(...all);
      return { prompt: `¿Cuál es el <b>${big ? "mayor" : "menor"}</b> número de tres cifras que puedes formar con estas fichas (sin repetir)?`, say: `¿Cuál es el ${big ? "mayor" : "menor"} número de tres cifras que puedes formar?`, scene: shuffle(ds).map(card).join(" "),
        ans, opts: numOpts(ans, sample(all.filter(x => x !== ans), 3), 0), why: `${ans}.${big ? "" : " ¡El 0 no puede ir adelante!"}`, hint: big ? "Pon las cifras de mayor a menor." : "El 0 no puede ir primero: ponlo en el medio." }; },
    () => { const a = pick([1, 3, 5, 7]), b = a + 2, ans = 10 * a + b;
      return { prompt: `Adivina: «Soy un número de dos cifras <b>impares consecutivas</b> (de menor a mayor) y mis cifras suman <b>${a + b}</b>. ¿Quién soy?»`, say: `Soy un número de dos cifras impares consecutivas, de menor a mayor, y mis cifras suman ${a + b}. ¿Quién soy?`, scene: "",
        ans, opts: numOpts(ans, [10 * b + a, ans + 1, 10 * (a + 1) + (b - 1)], 10), why: `${a} y ${b} son impares seguidos y ${a} + ${b} = ${a + b}: el número es ${ans}.`, hint: "Impares seguidos: 1 y 3, 3 y 5, 5 y 7, 7 y 9." }; },
  ]
];
lesson({ n: 11, title: "Formación de números con cifras", short: "Formar números", char: "bimba", music: "pop", deco: ["🃏", "1️⃣", "2️⃣", "3️⃣"],
  hello: "¡Hola! Soy <b>Bimba</b> 🐘. Con unas <b>tarjetas</b> de cifras podemos formar muchos números. ¡Vamos a jugar!",
  levels: LEVELS3(["Dos tarjetas", "El más grande y el más pequeño"], ["Tres tarjetas", "Elige y cuenta números"], ["", "Fichas con 0 y adivinanzas"]) }, GEN);
