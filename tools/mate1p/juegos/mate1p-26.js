/* Tema 26 · Operaciones combinadas y problemas de dos pasos · Rayo */
const GEN = [
  [
    () => { const a = between(5, 15), b = between(2, 9), c = between(1, a + b - 1), ans = a + b - c;
      return { prompt: `${a} + ${b} − ${c} = ?`, say: `¿Cuánto es ${a} más ${b} menos ${c}?`, scene: "", ans, opts: numOpts(ans, [a + b + c, a - b + c, ans + 1].filter(x => x !== ans && x >= 0), 0), why: `${a} + ${b} = ${a + b}; ${a + b} − ${c} = ${ans}.`, hint: "Primero la suma, después la resta." }; },
  ],
  [
    () => { const x = between(10, 20), y = between(3, 8), z = between(2, 6), ans = x - y + z;
      return { prompt: `En el bus iban <b>${x}</b> pasajeros. En una parada bajaron <b>${y}</b> y subieron <b>${z}</b>. ¿Cuántos van ahora?`, say: `Iban ${x}. Bajaron ${y} y subieron ${z}. ¿Cuántos van ahora?`, scene: line(["🚌"]), ans, opts: numOpts(ans, [x - y - z, x + y + z, x - y], 0), why: `${x} − ${y} = ${x - y}; ${x - y} + ${z} = ${ans}.`, hint: "Bajan → restas. Suben → sumas." }; },
  ],
  [
    () => { const p = between(2, 5), c = between(4, 8), ans = p + 2 * c;
      return { prompt: `Si tres pelotas cuestan <b>S/ ${3 * p}</b> en total y cada camiseta cuesta <b>S/ ${c}</b>, ¿cuánto costará <b>una pelota y dos camisetas</b>?`, say: `Tres pelotas cuestan ${3 * p} soles y cada camiseta ${c} soles. ¿Cuánto cuestan una pelota y dos camisetas?`, scene: line(["⚽", "⚽", "⚽", "👕"]), ans, opts: numOpts(ans, [3 * p + 2 * c, p + c, 3 * p + c], 0),
        why: `Una pelota: ${3 * p} ÷ 3 = ${p}. Dos camisetas: ${c} + ${c} = ${2 * c}. Total: ${ans}.`, hint: "Primero averigua cuánto cuesta UNA pelota." }; },
    () => { const c = 2 * between(3, 9), ans = c + 3 * c + c / 2;
      return { prompt: `Carmen tiene <b>S/ ${c}</b>. Su hermana Juana tiene el <b>triple</b> que Carmen y su prima Diana tiene la <b>mitad</b> que Carmen. ¿Cuánto tienen las tres juntas?`, say: `Carmen tiene ${c} soles. Juana tiene el triple y Diana la mitad. ¿Cuánto tienen las tres?`, scene: "", ans, opts: numOpts(ans, [c + 3 * c, c + 2 * c + c / 2, 3 * c + c / 2], 0),
        why: `Carmen ${c}, Juana ${3 * c}, Diana ${c / 2}. Total: ${ans}.`, hint: "Triple = 3 veces. Mitad = dividir entre 2." }; },
  ]
];
lesson({ n: 26, title: "Operaciones combinadas y problemas de dos pasos", short: "Dos pasos", char: "rayo", music: "aventura", deco: ["➕", "➖", "🚌", "⚽"],
  hello: "¡Hola! Soy <b>Rayo</b> 🐉. Algunos problemas se resuelven en <b>dos pasos</b>. ¡Vamos paso a paso!",
  levels: LEVELS3(["Suma y resta", "Operaciones en orden"], ["Suben y bajan", "Problemas de dos pasos"], ["", "Precios, triple y mitad"]) }, GEN);
