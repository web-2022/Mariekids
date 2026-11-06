/* Tema 46 · Problemas de lógica y parentescos · Mika */
const PAR = [["El hermano de mi papá es mi…", "tío", ["primo", "abuelo", "sobrino"]], ["La mamá de mi mamá es mi…", "abuela", ["tía", "hermana", "prima"]], ["El hijo de mi tío es mi…", "primo", ["hermano", "sobrino", "tío"]],
  ["La hermana de mi mamá es mi…", "tía", ["prima", "abuela", "sobrina"]], ["El papá de mi papá es mi…", "abuelo", ["tío", "bisabuelo", "primo"]], ["El hijo de mi hermana es mi…", "sobrino", ["primo", "hijo", "nieto"]], ["La hija de mi hijo es mi…", "nieta", ["sobrina", "hija", "prima"]]];
const NOM = ["César", "Dany", "Carmen", "Patrick", "Lucía", "Mateo"];
const GEN = [
  [
    () => { const [q, a, w] = pick(PAR);
      return { prompt: q, say: q.replace("…", ". ¿Quién es?"), scene: line(["👨‍👩‍👧‍👦"]), ans: a, opts: shuffle([a, ...w]), cols: 2, cls: "grp", why: `${q.replace("…", "")} ${a}.`, hint: "Dibuja el árbol familiar." }; },
  ],
  [
    () => { const [a, b, c] = sample(NOM, 3), big = rnd(2) === 0;
      return { prompt: `${a} es <b>mayor</b> que ${b}. ${b} es <b>mayor</b> que ${c}. ¿Quién es el <b>${big ? "mayor" : "menor"}</b> de todos?`, say: `${a} es mayor que ${b} y ${b} es mayor que ${c}. ¿Quién es el ${big ? "mayor" : "menor"}?`, scene: "", ans: big ? a : c, opts: [a, b, c], cols: 3, cls: "grp", why: `Orden de mayor a menor: ${a}, ${b}, ${c}.`, hint: "Ordénalos en una fila." }; },
    () => { const [a, b, c, d] = sample(NOM, 4);
      return { prompt: `${a} es mayor que ${b}. ${c} es menor que ${b}. ${a} es menor que ${d}. ¿Quién es el <b>mayor</b>?`, say: `${a} es mayor que ${b}. ${c} es menor que ${b}. ${a} es menor que ${d}. ¿Quién es el mayor?`, scene: "", ans: d, opts: [a, b, c, d], cols: 2, cls: "grp", why: `De mayor a menor: ${d}, ${a}, ${b}, ${c}.`, hint: "Ve ordenando con cada pista." }; },
  ],
  [
    () => ({ prompt: "¿Qué parentesco tiene conmigo Margot, si su madre fue la <b>única hija</b> de mi madre? (yo soy mujer)", say: "¿Qué parentesco tiene conmigo Margot, si su madre fue la única hija de mi madre? Yo soy mujer.", scene: "", ans: "hija", opts: ["sobrina", "hija", "hermana", "prima"], cols: 2, cls: "grp",
      why: "La única hija de mi madre soy YO. Entonces la madre de Margot soy yo: Margot es mi hija.", hint: "¿Quién es la única hija de mi madre?" }),
    () => { const h = between(2, 5), ans = h + 1;
      return { prompt: `En una familia hay <b>${h}</b> hermanos varones y cada uno tiene <b>una sola hermana</b>. ¿Cuántos hijos hay en total?`, say: `Hay ${h} hermanos y cada uno tiene una sola hermana. ¿Cuántos hijos hay?`, scene: "", ans, opts: numOpts(ans, [2 * h, h, h + 2], 1), why: `La hermana es la misma para todos: ${h} + 1 = ${ans}.`, hint: "¡Todos tienen la MISMA hermana!" }; },
    () => { const [a, b, c] = sample(["Ana", "Beto", "Ciro"], 3), mascotas = ["🐶", "🐱", "🐰"];
      return { prompt: `${a}, ${b} y ${c} tienen un perro, un gato y un conejo (uno cada uno). ${a} no tiene perro ni gato. ${b} no tiene perro. ¿Qué mascota tiene ${c}?`, say: `${a} no tiene perro ni gato. ${b} no tiene perro. ¿Qué mascota tiene ${c}?`, scene: line(mascotas), ans: "🐶", opts: ["🐶", "🐱", "🐰"], cols: 3, why: `${a} tiene 🐰, ${b} tiene 🐱 y ${c} tiene 🐶.`, hint: "Empieza por quien tiene más pistas." }; },
  ]
];
lesson({ n: 46, title: "Problemas de lógica y parentescos", short: "Lógica", char: "mika", music: "misterio", deco: ["👨‍👩‍👧", "🧠", "🔎", "❓"],
  hello: "¡Hola! Soy <b>Mika</b> 🦉. Con <b>lógica</b> resolvemos acertijos de familias, edades y mascotas.",
  levels: LEVELS3(["Parentescos", "Tíos, primos y abuelos"], ["¿Quién es mayor?", "Ordenar con pistas"], ["", "Acertijos de concurso"]) }, GEN);
