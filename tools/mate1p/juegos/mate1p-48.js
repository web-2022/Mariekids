/* Tema 48 · Conteo de triángulos, rectángulos y segmentos · Tito */
const GEN = [
  [
    () => { const p = between(3, 4), ans = C2(p);
      return { prompt: "¿Cuántos <b>segmentos</b> hay?", say: "¿Cuántos segmentos hay en total? Un segmento une dos puntos.", scene: segPoints(p), ans, opts: numOpts(ans, [p - 1, p, ans + 1], 1), why: `${Array.from({ length: p - 1 }, (_, i) => p - 1 - i).join(" + ")} = ${ans}: ${["AB", "AC", "AD", "BC", "BD", "CD"].filter(s => s.charCodeAt(1) - 65 < p).join(", ")}.`, hint: "Empieza en A y une con todos los demás; luego sigue con B…" }; },
    () => { const m = 2, ans = 3;
      return { prompt: "¿Cuántos <b>triángulos</b> hay en la figura?", say: "¿Cuántos triángulos hay en total? ¡Cuenta también el grande!", scene: triFan(m, 0), ans, opts: [2, 3, 4, 5], cols: 4, why: "2 pequeños + 1 grande = 3.", hint: "No olvides el triángulo grande." }; },
  ],
  [
    () => { const m = between(2, 3), h = between(0, 1), ans = (h + 1) * m * (m + 1) / 2;
      return { prompt: "¿Cuántos triángulos hay en la figura?", say: "¿Cuántos triángulos hay en total?", scene: triFan(m, h), ans, opts: numOpts(ans, [m * (h + 1), ans - 1, ans + 2], 1), why: `Hay ${m * (m + 1) / 2} triángulos con la punta de arriba${h ? ` en cada piso (×${h + 1})` : ""}: ${ans}.`, hint: "Cuenta los de 1 pieza, luego los de 2 piezas, luego los de 3…" }; },
    () => { const c = between(2, 4), ans = c * (c + 1) / 2;
      return { prompt: "¿Cuántos <b>rectángulos</b> hay en la figura?", say: "¿Cuántos rectángulos hay en total?", scene: rectGrid(1, c), ans, opts: numOpts(ans, [c, c + 1, ans + 1], 1), why: `Simples ${c}, de a 2: ${c - 1}${c > 2 ? `, de a 3: ${c - 2}` : ""}${c > 3 ? ", de a 4: 1" : ""}. Total ${ans}.`, hint: "Cuenta los pequeños, luego los que se forman juntando 2, 3…" }; },
  ],
  [
    () => { const c = between(2, 3), ans = 3 * c * (c + 1) / 2;
      return { prompt: "¿Cuántos rectángulos (incluidos los cuadrados) hay en la figura?", say: "¿Cuántos rectángulos hay en total, incluidos los cuadrados?", scene: rectGrid(2, c), ans, opts: numOpts(ans, [2 * c, ans - 3, ans + 2], 1), why: `Por filas hay ${c * (c + 1) / 2} formas en el ancho y 3 en lo alto: 3 × ${c * (c + 1) / 2} = ${ans}.`, hint: "Cuenta los de arriba, los de abajo y los que usan las dos filas." }; },
    () => { const n = between(2, 3), ans = n === 2 ? 5 : 14;
      return { prompt: "¿Cuántos <b>cuadrados</b> hay en la figura?", say: "¿Cuántos cuadrados hay en total?", scene: squareGrid(n), ans, opts: numOpts(ans, [n * n, n * n + 1, ans + 1], 1), why: n === 2 ? "4 pequeños + 1 grande = 5." : "9 pequeños + 4 medianos + 1 grande = 14.", hint: "Pequeños, medianos y el grande." }; },
    () => { const p = 5, ans = C2(p);
      return { prompt: "¿Cuántos segmentos hay en total?", say: "¿Cuántos segmentos hay en total?", scene: segPoints(p), ans, opts: numOpts(ans, [4, 5, 8], 1), why: "4 + 3 + 2 + 1 = 10.", hint: "Desde A salen 4, desde B salen 3 nuevos…" }; },
  ]
];
lesson({ n: 48, title: "Conteo de triángulos, rectángulos y segmentos", short: "Contar figuras", char: "tito", music: "chiptune", deco: ["🔺", "▭", "📏", "🔢"],
  hello: "¡Bip bup! Soy <b>Tito</b> 🤖. En una figura se esconden más triángulos y rectángulos de los que parece. ¡Cuéntalos todos!",
  levels: LEVELS3(["Segmentos y triángulos", "Los pequeños y el grande"], ["Más figuras", "Triángulos y rectángulos"], ["", "Retos de conteo"]) }, GEN);
