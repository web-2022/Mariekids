/* Tema 10 · Lectura y escritura de números · Kiki */
const U = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte",
  "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve"];
const D = ["", "", "", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
const C = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];
const w99 = n => n < 30 ? U[n] : D[Math.floor(n / 10)] + (n % 10 ? " y " + U[n % 10] : "");
const word = n => n < 100 ? w99(n) : n === 100 ? "cien" : C[Math.floor(n / 100)] + (n % 100 ? " " + w99(n % 100) : "");
const flip = n => n >= 10 && n % 10 ? (n % 10) * 10 + Math.floor(n / 10) : n + 10;
const GEN = [
  [
    () => { const n = between(10, 30), w = rnd(2) === 0;
      return w ? { prompt: "¿Cómo se escribe con cifras?", say: `¿Cómo se escribe ${word(n)} con cifras?`, scene: `<div class="word-num">${word(n)}</div>`, ans: n, opts: numOpts(n, [flip(n), n + 1, n - 1], 0), why: `${word(n)} = ${n}.`, hint: "Lee la palabra con calma." }
        : { prompt: `¿Cómo se lee <b>${n}</b>?`, say: "¿Cómo se lee este número?", scene: `<div class="big-num">${n}</div>`, ans: word(n), opts: shuffle([...new Set([word(n), word(n + 1), word(n - 1), word(flip(n) <= 99 ? flip(n) : n + 2)])]), cols: 1, cls: "grp", why: `${n} se lee «${word(n)}».`, hint: "Primero las decenas, luego las unidades." }; },
  ],
  [
    () => { const n = between(31, 99), w = rnd(2) === 0;
      return w ? { prompt: "¿Cómo se escribe con cifras?", say: `¿Cómo se escribe ${word(n)} con cifras?`, scene: `<div class="word-num">${word(n)}</div>`, ans: n, opts: numOpts(n, [flip(n) <= 99 ? flip(n) : n - 10, n + 10 <= 99 ? n + 10 : n - 2, n - 1], 0), why: `${word(n)} = ${n}.`, hint: "«y» une las decenas con las unidades." }
        : { prompt: `¿Cómo se lee <b>${n}</b>?`, say: "¿Cómo se lee este número?", scene: `<div class="big-num">${n}</div>`, ans: word(n), opts: shuffle([...new Set([word(n), word(flip(n) <= 99 ? flip(n) : n - 11), word(n + 1 <= 99 ? n + 1 : n - 2), word(n - 10)])]), cols: 1, cls: "grp", why: `${n} se lee «${word(n)}».`, hint: "Primero las decenas, luego las unidades." }; },
  ],
  [
    () => { const n = between(21, 99), ans = Math.floor(n / 10);
      return { prompt: "¿Cuántas <b>decenas</b> hay en el número?", say: `¿Cuántas decenas hay en ${word(n)}?`, scene: `<div class="word-num" style="font-family:cursive">${word(n)}</div>`, ans, opts: numOpts(ans, [n % 10, n, ans + 1].filter(x => x !== ans), 0),
        why: `${word(n)} = ${n} = ${ans} decenas y ${n % 10} unidades.`, hint: "Escríbelo con cifras: la primera cifra son las decenas." }; },
    () => { const n = between(101, 999), w = rnd(2) === 0, sw = n % 100 >= 10 ? Math.floor(n / 100) * 100 + (n % 10) * 10 + Math.floor((n % 100) / 10) : n + 10;
      const alt = [sw !== n ? sw : n + 20, n + 100 <= 999 ? n + 100 : n - 100, n + 1];
      return w ? { prompt: "¿Cómo se escribe con cifras?", say: `¿Cómo se escribe ${word(n)} con cifras?`, scene: `<div class="word-num" style="font-size:clamp(18px,5.5vw,24px)">${word(n)}</div>`, ans: n, opts: numOpts(n, alt, 100), why: `${word(n)} = ${n}.`, hint: "Primero las centenas (doscientos, trescientos…), luego decenas y unidades." }
        : { prompt: `Escribe la forma literal del número <b>${n}</b>:`, say: "¿Cómo se lee este número?", scene: `<div class="big-num">${n}</div>`, ans: word(n), opts: shuffle([...new Set([word(n), ...alt.map(word)])]), cols: 1, cls: "grp", why: `${n} se lee «${word(n)}».`, hint: "Centenas, decenas y unidades, en ese orden." }; },
    () => { const a = between(100, 985), seq = Array.from({ length: 6 }, (_, i) => a + i), h = between(1, 4), ans = seq[h];
      return { prompt: "Completa la numeración: ¿qué número falta?", say: "Completa la numeración. ¿Qué número falta?", scene: `<div class="seq">${seq.map((x, i) => i === h ? "⬜" : x).join(" · ")}</div>`, ans, opts: numOpts(ans, [ans + 10, ans - 10, ans + 1], 100), why: `Los números van de uno en uno: falta ${ans}.`, hint: "Cada número es el anterior más 1." }; },
    () => { const d = between(2, 9), u = between(0, 9), ans = 10 * d + u;
      return { prompt: `Soy un número: mi cifra de las <b>decenas</b> es ${d} y la de las <b>unidades</b> es ${u}. ¿Quién soy?`, say: `Mi cifra de las decenas es ${d} y la de las unidades es ${u}. ¿Quién soy?`, scene: "", ans, opts: numOpts(ans, [10 * u + d !== ans ? 10 * u + d : ans + 10, d + u, ans + 1], 0),
        why: `${d} decenas y ${u} unidades = ${ans}.`, hint: "Las decenas van a la izquierda y las unidades a la derecha." }; },
  ]
];
lesson({ n: 10, title: "Lectura y escritura de números", short: "Leer números", char: "kiki", music: "cuento", deco: ["📖", "✏️", "🔢", "🔤"],
  hello: "¡Hola! Soy <b>Kiki</b> 🐧. Los números se escriben con <b>cifras</b> y también con <b>palabras</b>. ¡Vamos a leerlos, hasta el 999!",
  levels: LEVELS3(["Hasta el 30", "Leer y escribir"], ["Hasta el 99", "Treinta y uno… noventa y nueve"], ["", "Hasta el 999 y decenas escondidas"]) }, GEN);
