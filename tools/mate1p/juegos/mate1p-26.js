/* Tema 26 · Operaciones combinadas y problemas de dos pasos · Rayo */
const GEN = [
  [
    () => { const a = between(5, 15), b = between(2, 9), c = between(1, a + b - 1), ans = a + b - c;
      return { prompt: `${a} + ${b} − ${c} = ?`, say: `¿Cuánto es ${a} más ${b} menos ${c}?`, scene: "", ans, opts: numOpts(ans, [a + b + c, a - b + c, ans + 1].filter(x => x !== ans && x >= 0), 0), why: `${a} + ${b} = ${a + b}; ${a + b} − ${c} = ${ans}.`, hint: "Primero la suma, después la resta.",
        steps: T => [
          { t: `Hay suma y resta. Se hace <b>en orden, de izquierda a derecha</b>.` },
          { t: `Primero la suma: ${a} + ${b} = <b>${a + b}</b>.`, b: BOARD.lines([`${a} + ${b} = ${a + b}`]) },
          { t: `Después la resta: ${a + b} − ${c} = <b>${ans}</b>.`, bAdd: BOARD.lines([`${a + b} − ${c} = ${ans}`]) }
        ],
        err: w => w === a + b + c ? `El ${c} se resta, no se suma.` : "" }; },
  ],
  [
    () => { const x = between(10, 20), y = between(3, 8), z = between(2, 6), ans = x - y + z;
      return { prompt: `En el bus iban <b>${x}</b> pasajeros. En una parada bajaron <b>${y}</b> y subieron <b>${z}</b>. ¿Cuántos van ahora?`, say: `Iban ${x}. Bajaron ${y} y subieron ${z}. ¿Cuántos van ahora?`, scene: line(["🚌"]), ans, opts: numOpts(ans, [x - y - z, x + y + z, x - y], 0), why: `${x} − ${y} = ${x - y}; ${x - y} + ${z} = ${ans}.`, hint: "Bajan → restas. Suben → sumas.",
        steps: T => [
          { t: `Iban <b>${x}</b>. <b>Bajan</b> ${y} → restamos. <b>Suben</b> ${z} → sumamos. Lo hacemos en orden.` },
          { t: `Bajan ${y}: ${x} − ${y} = <b>${x - y}</b>.`, b: BOARD.jumps(x, Array(y).fill(-1), { step: .3 }) },
          { t: `Suben ${z}: ${x - y} + ${z} = <b>${ans}</b>.`, b: BOARD.lines([`${x} − ${y} = ${x - y}`, `${x - y} + ${z} = ${ans}`]) }
        ],
        err: w => w === x - y - z ? "Los que suben se suman, no se restan." : w === x - y ? `Te faltó sumar los ${z} que subieron.` : "" }; },
  ],
  [
    () => { const p = between(2, 5), c = between(4, 8), ans = p + 2 * c;
      return { prompt: `Si tres pelotas cuestan <b>S/ ${3 * p}</b> en total y cada camiseta cuesta <b>S/ ${c}</b>, ¿cuánto costará <b>una pelota y dos camisetas</b>?`, say: `Tres pelotas cuestan ${3 * p} soles y cada camiseta ${c} soles. ¿Cuánto cuestan una pelota y dos camisetas?`, scene: line(["⚽", "⚽", "⚽", "👕"]), ans, opts: numOpts(ans, [3 * p + 2 * c, p + c, 3 * p + c], 0),
        why: `Una pelota: ${3 * p} ÷ 3 = ${p}. Dos camisetas: ${c} + ${c} = ${2 * c}. Total: ${ans}.`, hint: "Primero averigua cuánto cuesta UNA pelota.",
        steps: T => [
          { t: `Tres pelotas cuestan S/ ${3 * p}. Primero averiguamos cuánto cuesta <b>una</b>: repartimos ${3 * p} en 3 partes iguales.`, b: BOARD.share(3 * p, 3, "🪙", { names: ["⚽", "⚽", "⚽"] }) },
          { t: `Una pelota cuesta <b>S/ ${p}</b>. Dos camisetas: ${c} + ${c} = <b>S/ ${2 * c}</b>.`, b: BOARD.lines([`1 ⚽ = ${3 * p} ÷ 3 = ${p}`, `2 👕 = ${c} + ${c} = ${2 * c}`]) },
          { t: `Una pelota y dos camisetas: ${p} + ${2 * c} = <b>S/ ${ans}</b>.`, bAdd: BOARD.lines([`${p} + ${2 * c} = ${ans}`]) }
        ],
        err: w => w === 3 * p + 2 * c ? "Usaste el precio de tres pelotas; piden solo una." : w === p + c ? "Piden dos camisetas, no una." : "" }; },
    () => { const c = 2 * between(3, 9), ans = c + 3 * c + c / 2;
      return { prompt: `Carmen tiene <b>S/ ${c}</b>. Su hermana Juana tiene el <b>triple</b> que Carmen y su prima Diana tiene la <b>mitad</b> que Carmen. ¿Cuánto tienen las tres juntas?`, say: `Carmen tiene ${c} soles. Juana tiene el triple y Diana la mitad. ¿Cuánto tienen las tres?`, scene: "", ans, opts: numOpts(ans, [c + 3 * c, c + 2 * c + c / 2, 3 * c + c / 2], 0),
        why: `Carmen ${c}, Juana ${3 * c}, Diana ${c / 2}. Total: ${ans}.`, hint: "Triple = 3 veces. Mitad = dividir entre 2.",
        steps: T => [
          { t: `Carmen tiene S/ ${c}. <b>Triple</b> es 3 veces; <b>mitad</b> es repartir en 2.` },
          { t: `Juana: ${c} + ${c} + ${c} = <b>${3 * c}</b>. Diana: la mitad de ${c} = <b>${c / 2}</b>.`, b: BOARD.lines([`Carmen: ${c}`, `Juana: ${c} + ${c} + ${c} = ${3 * c}`, `Diana: ${c} ÷ 2 = ${c / 2}`], { step: .8 }) },
          { t: `Las tres juntas: ${c} + ${3 * c} + ${c / 2} = <b>${ans}</b>.`, bAdd: BOARD.lines([`${c} + ${3 * c} + ${c / 2} = ${ans}`]) }
        ],
        err: w => w === c + 3 * c ? "Te faltó lo de Diana." : w === c + 2 * c + c / 2 ? "Triple es 3 veces, no 2." : "" }; },
  ]
];
lesson({ n: 26, title: "Operaciones combinadas y problemas de dos pasos", short: "Dos pasos", char: "rayo", music: "aventura", deco: ["➕", "➖", "🚌", "⚽"],
  hello: "¡Hola! Soy <b>Rayo</b> 🐉. Algunos problemas se resuelven en <b>dos pasos</b>. ¡Vamos paso a paso!",
  levels: LEVELS3(["Suma y resta", "Operaciones en orden"], ["Suben y bajan", "Problemas de dos pasos"], ["", "Precios, triple y mitad"]) }, GEN);
