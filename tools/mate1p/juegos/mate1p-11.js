/* Tema 11 · Formación de números con cifras · Bimba */
const card = d => `<span class="card-op">${d}</span>`;
const perm2 = ds => { const s = new Set(); ds.forEach((a, i) => ds.forEach((b, j) => { if (i !== j && a !== 0) s.add(10 * a + b); })); return [...s]; };
const perm3 = ds => { const s = new Set(); ds.forEach((a, i) => ds.forEach((b, j) => ds.forEach((c, k) => { if (i !== j && j !== k && i !== k && a !== 0) s.add(100 * a + 10 * b + c); }))); return [...s]; };
const GEN = [
  [
    () => { const ds = sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 2), big = rnd(2) === 0, all = perm2(ds), ans = big ? Math.max(...all) : Math.min(...all);
      return { prompt: `Con estas tarjetas, ¿cuál es el número de dos cifras <b>${big ? "más grande" : "más pequeño"}</b>?`, say: `¿Cuál es el número ${big ? "más grande" : "más pequeño"} que puedes formar con las dos tarjetas?`, scene: ds.map(card).join(" "),
        ans, opts: numOpts(ans, [...all.filter(x => x !== ans), ds[0] + ds[1]], 0), why: big ? "Pon la cifra mayor en las decenas." : "Pon la cifra menor en las decenas.", hint: "La cifra de la izquierda (decenas) vale más.",
        steps: T => { const [x, y] = [...ds].sort((p, q) => q - p);
          return [
            { t: `En un número de dos cifras, la cifra de la <b>izquierda</b> son las <b>decenas</b> y vale mucho más que la de la derecha.` },
            { t: `Con ${ds[0]} y ${ds[1]} podemos formar dos números:`, b: BOARD.lines([`${10 * x + y} (${x} decenas)`, `${10 * y + x} (${y} decena${y > 1 ? "s" : ""})`]) },
            { t: big ? `Para el más grande, ponemos la cifra <b>mayor</b> (${x}) en las decenas: <b>${ans}</b>.` : `Para el más pequeño, ponemos la cifra <b>menor</b> (${y}) en las decenas: <b>${ans}</b>.` }
          ]; },
        err: w => w === ds[0] + ds[1] ? "Sumaste las tarjetas, pero hay que ponerlas una al lado de la otra." : "" }; },
  ],
  [
    () => { const ds = sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 3), big = rnd(2) === 0, all = perm2(ds), ans = big ? Math.max(...all) : Math.min(...all);
      return { prompt: `Usando <b>dos</b> de estas tarjetas, ¿cuál es el número <b>${big ? "mayor" : "menor"}</b> que puedes formar?`, say: `Usando dos tarjetas, ¿cuál es el número ${big ? "mayor" : "menor"}?`, scene: ds.map(card).join(" "),
        ans, opts: numOpts(ans, sample(all.filter(x => x !== ans), 3), 0), why: `El ${big ? "mayor" : "menor"} es ${ans}.`, hint: "Elige bien la cifra de las decenas primero.",
        steps: T => { const s = [...ds].sort((p, q) => big ? q - p : p - q);
          return [
            { t: `Solo usamos <b>dos</b> tarjetas. La de las decenas (izquierda) es la más importante.` },
            { t: big ? `Para el mayor: en las decenas va la cifra más grande, <b>${s[0]}</b>; en las unidades, la siguiente más grande, <b>${s[1]}</b>.` : `Para el menor: en las decenas va la cifra más pequeña, <b>${s[0]}</b>; en las unidades, la siguiente más pequeña, <b>${s[1]}</b>.`, b: BOARD.table([["D", "U"], [s[0], s[1]]]) },
            { t: `El número ${big ? "mayor" : "menor"} es <b>${ans}</b>.` }
          ]; } }; },
    () => { const ds = sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 3), ans = perm2(ds).length;
      return { prompt: "¿Cuántos números <b>de dos cifras diferentes</b> puedes formar con estas tarjetas?", say: "¿Cuántos números de dos cifras diferentes puedes formar?", scene: ds.map(card).join(" "), ans, opts: numOpts(ans, [3, 9, 4], 1),
        why: `Son ${perm2(ds).sort((a, b) => a - b).join(", ")}: ${ans} números.`, hint: "Pon cada tarjeta adelante y combínala con las otras dos.",
        steps: T => { const L = ds.map(a => ds.filter(b => b !== a).map(b => 10 * a + b));
          return [
            { t: `Vamos en orden: ponemos cada tarjeta adelante (decenas) y la juntamos con cada una de las otras dos.` },
            { t: `Así salen todos, sin olvidar ninguno:`, b: BOARD.lines(ds.map((a, i) => `${a} adelante → ${L[i].join(" y ")}`), { step: .9 }) },
            { t: `3 tarjetas adelante × 2 compañeras = <b>${ans}</b> números.`, bAdd: BOARD.lines([`${L.map(x => x.length).join(" + ")} = ${ans}`]) }
          ]; },
        err: w => w === 3 ? "Hay más: cada tarjeta puede ir adelante con dos compañeras distintas." : w === 9 ? "No se puede repetir la misma tarjeta (como 11 o 22)." : "" }; },
  ],
  [
    () => { const ds = [0, ...sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)], big = rnd(2) === 0, all = perm3(ds), ans = big ? Math.max(...all) : Math.min(...all);
      return { prompt: `¿Cuál es el <b>${big ? "mayor" : "menor"}</b> número de tres cifras que puedes formar con estas fichas (sin repetir)?`, say: `¿Cuál es el ${big ? "mayor" : "menor"} número de tres cifras que puedes formar?`, scene: shuffle(ds).map(card).join(" "),
        ans, opts: numOpts(ans, sample(all.filter(x => x !== ans), 3), 0), why: `${ans}.${big ? "" : " ¡El 0 no puede ir adelante!"}`, hint: big ? "Pon las cifras de mayor a menor." : "El 0 no puede ir primero: ponlo en el medio.",
        steps: T => { const nz = ds.filter(x => x).sort((p, q) => p - q), desc = [...ds].sort((p, q) => q - p);
          return big ? [
            { t: `Para el número <b>mayor</b>, ponemos las cifras de la más grande a la más pequeña: centenas, decenas y unidades.`, b: BOARD.table([["C", "D", "U"], desc.slice(0, 3)]) },
            { t: `Usamos ${desc.slice(0, 3).join(", ")}: el número es <b>${ans}</b>.` }
          ] : [
            { t: `Para el número <b>menor</b>, la cifra de adelante debe ser la más pequeña… ¡pero el <b>0 no puede ir adelante</b>! Un número no empieza con 0.` },
            { t: `Adelante va ${nz[0]}, la más pequeña que no es 0. Después va el 0, y al final ${nz[1]}.`, b: BOARD.table([["C", "D", "U"], [nz[0], 0, nz[1]]]) },
            { t: `El menor número es <b>${ans}</b>.` }
          ]; },
        err: w => !big && w < 100 ? "¡El 0 no puede ir adelante!" : "" }; },
    () => { const a = pick([1, 3, 5, 7]), b = a + 2, ans = 10 * a + b;
      return { prompt: `Adivina: «Soy un número de dos cifras <b>impares consecutivas</b> (de menor a mayor) y mis cifras suman <b>${a + b}</b>. ¿Quién soy?»`, say: `Soy un número de dos cifras impares consecutivas, de menor a mayor, y mis cifras suman ${a + b}. ¿Quién soy?`, scene: "",
        ans, opts: numOpts(ans, [10 * b + a, ans + 1, 10 * (a + 1) + (b - 1)], 10), why: `${a} y ${b} son impares seguidos y ${a} + ${b} = ${a + b}: el número es ${ans}.`, hint: "Impares seguidos: 1 y 3, 3 y 5, 5 y 7, 7 y 9.",
        steps: T => [
          { t: `Impares <b>consecutivos</b> son impares seguidos: 1 y 3, 3 y 5, 5 y 7, 7 y 9.` },
          { t: `Sumamos cada pareja y buscamos la que da <b>${a + b}</b>:`, b: BOARD.lines([[1, 3], [3, 5], [5, 7], [7, 9]].map(([p, q]) => `${p} + ${q} = ${p + q}${p === a ? " ✅" : ""}`), { step: .7 }) },
          { t: `Son ${a} y ${b}. De menor a mayor, el número es <b>${ans}</b>.` }
        ],
        err: w => w === 10 * b + a ? "Las cifras van de menor a mayor: primero la menor." : "" }; },
  ]
];
lesson({ n: 11, title: "Formación de números con cifras", short: "Formar números", char: "bimba", music: "pop", deco: ["🃏", "1️⃣", "2️⃣", "3️⃣"],
  hello: "¡Hola! Soy <b>Bimba</b> 🐘. Con unas <b>tarjetas</b> de cifras podemos formar muchos números. ¡Vamos a jugar!",
  levels: LEVELS3(["Dos tarjetas", "El más grande y el más pequeño"], ["Tres tarjetas", "Elige y cuenta números"], ["", "Fichas con 0 y adivinanzas"]) }, GEN);
