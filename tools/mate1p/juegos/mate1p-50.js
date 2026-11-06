/* Tema 50 · Conteo de cubos y construcciones · Bimba */
const sum = H => H.flat().reduce((a, b) => a + b, 0);
const rndH = (r, c, max) => Array.from({ length: r }, () => Array.from({ length: c }, () => between(1, max)));
const GEN = [
  [
    () => { const H = [Array.from({ length: between(2, 4) }, () => between(1, 3))], ans = sum(H);
      return { prompt: "¿Cuántos <b>cubos</b> hay?", say: "¿Cuántos cubos hay en total?", scene: isoCubes(H), ans, opts: numOpts(ans, [H[0].length, ans + 1, ans - 1], 1), why: `Por columnas: ${H[0].join(" + ")} = ${ans}.`, hint: "Cuenta columna por columna, de abajo hacia arriba." }; },
  ],
  [
    () => { const n = between(3, 4), H = [Array.from({ length: n }, (_, i) => n - i)], ans = sum(H);
      return { prompt: "¿Cuántos cubos de igual tamaño forman la escalera?", say: "¿Cuántos cubos forman la escalera?", scene: isoCubes(H), ans, opts: numOpts(ans, [n, 2 * n, ans + 1], 1), why: `${H[0].join(" + ")} = ${ans}.`, hint: "Cada escalón tiene un cubo menos." }; },
    () => { const H = rndH(2, 2, 2), ans = sum(H);
      return { prompt: "¿Cuántos cubos hay en la construcción? (todos se apoyan en el piso o en otro cubo)", say: "¿Cuántos cubos hay en la construcción?", scene: isoCubes(H), ans, opts: numOpts(ans, [ans - 1, ans + 1, 4], 1), why: `Por torres: ${H.flat().join(" + ")} = ${ans}.`, hint: "Hay cubos escondidos atrás: cuenta torre por torre." }; },
  ],
  [
    () => { const f = pick([[2, 2, 2], [2, 3, 2], [3, 2, 1]]), H = Array.from({ length: f[0] }, () => Array(f[1]).fill(f[2])), ans = sum(H);
      return { prompt: "Gabrielita armó esta caja con cubos iguales. ¿Cuántos cubos usó?", say: "¿Cuántos cubos usó para armar la caja?", scene: isoCubes(H), ans, opts: numOpts(ans, [f[0] * f[1], ans - 2, ans + 2], 1), why: `${f[0]} × ${f[1]} = ${f[0] * f[1]} por piso, y ${f[2]} piso${f[2] > 1 ? "s" : ""}: ${ans}.`, hint: "Cuenta los cubos de un piso y multiplica por los pisos." }; },
    () => { const H = rndH(2, 2, 2), have = sum(H), ans = 8 - have;
      return { prompt: "¿Cuántos cubos <b>faltan</b> para formar un cubo grande de 2 × 2 × 2?", say: "¿Cuántos cubos faltan para formar un cubo grande de dos por dos por dos?", scene: isoCubes(H), ans, opts: numOpts(ans, [have, 8, ans + 1], 0), why: `El cubo grande tiene 8. Hay ${have}: faltan ${ans}.`, hint: "Un cubo de 2 × 2 × 2 tiene 8 cubitos." }; },
  ]
];
lesson({ n: 50, title: "Conteo de cubos y construcciones", short: "Cubos", char: "bimba", music: "cajabeat", deco: ["🧊", "🧱", "📦", "🏗️"],
  hello: "¡Hola! Soy <b>Bimba</b> 🐘. Con cubitos se arman torres y escaleras. ¡Ojo con los que se esconden atrás!",
  levels: LEVELS3(["Torres", "Contar cubos"], ["Escaleras y construcciones", "Cubos escondidos"], ["", "Cajas y cubos que faltan"]) }, GEN);
