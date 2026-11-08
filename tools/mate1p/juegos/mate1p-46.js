/* Tema 46 · Problemas de lógica y parentescos · Mika */
const PAR = [["El hermano de mi papá es mi…", "tío", ["primo", "abuelo", "sobrino"]], ["La mamá de mi mamá es mi…", "abuela", ["tía", "hermana", "prima"]], ["El hijo de mi tío es mi…", "primo", ["hermano", "sobrino", "tío"]],
  ["La hermana de mi mamá es mi…", "tía", ["prima", "abuela", "sobrina"]], ["El papá de mi papá es mi…", "abuelo", ["tío", "bisabuelo", "primo"]], ["El hijo de mi hermana es mi…", "sobrino", ["primo", "hijo", "nieto"]], ["La hija de mi hijo es mi…", "nieta", ["sobrina", "hija", "prima"]]];
const NOM = ["César", "Dany", "Carmen", "Patrick", "Lucía", "Mateo"];
const GEN = [
  [
    () => { const [q, a, w] = pick(PAR);
      return { prompt: q, say: q.replace("…", ". ¿Quién es?"), scene: line(["👨‍👩‍👧‍👦"]), ans: a, opts: shuffle([a, ...w]), cols: 2, cls: "grp", why: `${q.replace("…", "")} ${a}.`, hint: "Dibuja el árbol familiar.",
        steps: T => { const P = { tío: ["El hermano de mi papá", "es hermano de mi papá → es mi <b>tío</b>"], abuela: ["La mamá de mi mamá", "es la mamá de mi mamá → es mi <b>abuela</b>"], primo: ["El hijo de mi tío", "es hijo de mi tío → es mi <b>primo</b>"], tía: ["La hermana de mi mamá", "es hermana de mi mamá → es mi <b>tía</b>"], abuelo: ["El papá de mi papá", "es el papá de mi papá → es mi <b>abuelo</b>"], sobrino: ["El hijo de mi hermana", "es hijo de mi hermana → es mi <b>sobrino</b>"], nieta: ["La hija de mi hijo", "es hija de mi hijo → es mi <b>nieta</b>"] }[a];
          return [
            { t: `Dibujamos el árbol familiar empezando por <b>mí</b> 🙂 y subimos o bajamos un paso a la vez.` },
            { t: `${P[0]} ${P[1]}.`, b: BOARD.lines([q.replace("…", "") + " → " + a]) },
            { t: `La respuesta es <b>${a}</b>.` }
          ]; } }; },
  ],
  [
    () => { const [a, b, c] = sample(NOM, 3), big = rnd(2) === 0;
      return { prompt: `${a} es <b>mayor</b> que ${b}. ${b} es <b>mayor</b> que ${c}. ¿Quién es el <b>${big ? "mayor" : "menor"}</b> de todos?`, say: `${a} es mayor que ${b} y ${b} es mayor que ${c}. ¿Quién es el ${big ? "mayor" : "menor"}?`, scene: "", ans: big ? a : c, opts: [a, b, c], cols: 3, cls: "grp", why: `Orden de mayor a menor: ${a}, ${b}, ${c}.`, hint: "Ordénalos en una fila.",
        steps: T => [
          { t: `Ordenamos en una fila, del mayor al menor, usando cada pista.` },
          { t: `${a} es mayor que ${b}: ${a} va antes. ${b} es mayor que ${c}: ${b} va antes que ${c}.`, b: BOARD.lines([`${a} > ${b} > ${c}`]) },
          { t: `El ${big ? "mayor" : "menor"} es <b>${big ? a : c}</b>.` }
        ] }; },
    () => { const [a, b, c, d] = sample(NOM, 4);
      return { prompt: `${a} es mayor que ${b}. ${c} es menor que ${b}. ${a} es menor que ${d}. ¿Quién es el <b>mayor</b>?`, say: `${a} es mayor que ${b}. ${c} es menor que ${b}. ${a} es menor que ${d}. ¿Quién es el mayor?`, scene: "", ans: d, opts: [a, b, c, d], cols: 2, cls: "grp", why: `De mayor a menor: ${d}, ${a}, ${b}, ${c}.`, hint: "Ve ordenando con cada pista.",
        steps: T => [
          { t: `Vamos poniendo a cada uno en una fila de mayor a menor con cada pista:`, b: BOARD.lines([`${a} > ${b}`, `${a} > ${b} > ${c}`, `${d} > ${a} > ${b} > ${c}`], { step: 1.1 }) },
          { t: `${d} es mayor que ${a}, y ${a} es mayor que todos los demás.` },
          { t: `El mayor es <b>${d}</b>.` }
        ],
        err: w => w === a ? `${a} es mayor que ${b} y ${c}, pero ¡${d} es mayor que ${a}!` : "" }; },
  ],
  [
    () => { return { prompt: "¿Qué parentesco tiene conmigo Margot, si su madre fue la <b>única hija</b> de mi madre? (yo soy mujer)", say: "¿Qué parentesco tiene conmigo Margot, si su madre fue la única hija de mi madre? Yo soy mujer.", scene: "", ans: "hija", opts: ["sobrina", "hija", "hermana", "prima"], cols: 2, cls: "grp",
      why: "La única hija de mi madre soy YO. Entonces la madre de Margot soy yo: Margot es mi hija.", hint: "¿Quién es la única hija de mi madre?",
        steps: T => [
          { t: `La clave: ¿quién es «la <b>única hija</b> de mi madre»? Yo soy mujer y soy hija de mi madre… ¡y es la única!` },
          { t: `Entonces la única hija de mi madre soy <b>yo</b>. La madre de Margot soy yo.`, b: BOARD.lines(["mi madre", "↓", "yo (su única hija)", "↓", "Margot"]) },
          { t: `Si yo soy la madre de Margot, Margot es mi <b>hija</b>.` }
        ] }; },
    () => { const h = between(2, 5), ans = h + 1;
      return { prompt: `En una familia hay <b>${h}</b> hermanos varones y cada uno tiene <b>una sola hermana</b>. ¿Cuántos hijos hay en total?`, say: `Hay ${h} hermanos y cada uno tiene una sola hermana. ¿Cuántos hijos hay?`, scene: "", ans, opts: numOpts(ans, [2 * h, h, h + 2], 1), why: `La hermana es la misma para todos: ${h} + 1 = ${ans}.`, hint: "¡Todos tienen la MISMA hermana!",
        steps: T => [
          { t: `Dibujamos la familia: ${h} hermanos varones 👦 y la hermana 👧.`, b: BOARD.lines([`${"👦".repeat(h)} + 👧`]) },
          { t: `¡Todos tienen <b>la misma</b> hermana! No hay una hermana para cada uno.` },
          { t: `${h} + 1 = <b>${ans}</b> hijos.` }
        ],
        err: w => w === 2 * h ? "Contaste una hermana para cada uno, pero es la misma para todos." : "" }; },
    () => { const [a, b, c] = sample(["Ana", "Beto", "Ciro"], 3), mascotas = ["🐶", "🐱", "🐰"];
      return { prompt: `${a}, ${b} y ${c} tienen un perro, un gato y un conejo (uno cada uno). ${a} no tiene perro ni gato. ${b} no tiene perro. ¿Qué mascota tiene ${c}?`, say: `${a} no tiene perro ni gato. ${b} no tiene perro. ¿Qué mascota tiene ${c}?`, scene: line(mascotas), ans: "🐶", opts: ["🐶", "🐱", "🐰"], cols: 3, why: `${a} tiene 🐰, ${b} tiene 🐱 y ${c} tiene 🐶.`, hint: "Empieza por quien tiene más pistas.",
        steps: T => [
          { t: `Empezamos por quien tiene <b>más pistas</b>: ${a} no tiene 🐶 ni 🐱, así que ${a} tiene el <b>🐰</b>.`, b: BOARD.table([["", "🐶", "🐱", "🐰"], [a, "❌", "❌", "✅"], [b, "", "", ""], [c, "", "", ""]]) },
          { t: `${b} no tiene 🐶, y el 🐰 ya es de ${a}: ${b} tiene el <b>🐱</b>.`, b: BOARD.table([["", "🐶", "🐱", "🐰"], [a, "❌", "❌", "✅"], [b, "❌", "✅", "❌"], [c, "", "", ""]]) },
          { t: `A ${c} le queda el <b>🐶</b>.`, b: BOARD.table([["", "🐶", "🐱", "🐰"], [a, "❌", "❌", "✅"], [b, "❌", "✅", "❌"], [c, "✅", "❌", "❌"]]) }
        ] }; },
  ]
];
lesson({ n: 46, title: "Problemas de lógica y parentescos", short: "Lógica", char: "mika", music: "misterio", deco: ["👨‍👩‍👧", "🧠", "🔎", "❓"],
  hello: "¡Hola! Soy <b>Mika</b> 🦉. Con <b>lógica</b> resolvemos acertijos de familias, edades y mascotas.",
  levels: LEVELS3(["Parentescos", "Tíos, primos y abuelos"], ["¿Quién es mayor?", "Ordenar con pistas"], ["", "Acertijos de concurso"]) }, GEN);
