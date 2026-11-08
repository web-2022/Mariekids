/* Generadores de problemas tipo olimpiada (temas 59, 60 y 61). d = dificultad 0, 1 o 2 */
const OLI_NUM = [
  d => (() => { const k = between(2, 3), cs = Array.from({ length: k }, () => 2 * between(1, 8)), tot = cs.reduce((a, b) => a + b, 0), v = pick(["x", "y", "a"]), ans = tot + v;
      const opts = shuffle([...new Set([ans, String(tot), (tot - 2) + v, (tot + 4) + v])]).slice(0, 4);
      if (!opts.includes(ans)) opts[0] = ans;
      return { prompt: `Halla la suma: <b>${cs.map(c => c + v).join(" + ")}</b>`, say: `Halla la suma de ${cs.map(c => c + " " + v).join(" más ")}.`, scene: `<div class="legend">Piensa que «${v}» es una cajita: ${cs[0]}${v} son ${cs[0]} cajitas.</div>`,
        ans, opts, cols: 2, why: `Se suman los números y la letra se queda igual: ${cs.join(" + ")} = ${tot}, entonces ${ans}.`, hint: `Suma solo los números (${cs.join(", ")}) y al final escribe la «${v}».`,
    steps: T => [
      { t: `Todos los términos tienen la misma letra «${v}». Es como sumar cajitas: se suman los números y la letra se queda igual.` },
      { t: `Sumamos los números: ${cs.join(" + ")} = ${tot}.`, b: BOARD.lines([`${cs.join(" + ")} = ${tot}`]) },
      { t: `La suma es <b>${ans}</b>.` }
    ],
    err: w => w === String(tot) ? "¡Falta la letra!" : "" }; })(),
  d => { const s = between(2, 5 + d), m = between(2, 5 + d), f = between(2, 8), ans = f + 1;
    return { prompt: "Halla el <b>sucesor</b> del valor de la 🍓:", say: "Descubre el valor de cada figura y halla el sucesor de la fresa.", scene: `<div class="eqs"><div>⭐ + ⭐ + ⭐ + ⭐ = ${4 * s}</div><div>🍎 + 🍎 + 🍎 = ${3 * m}</div><div>🍎 + ⭐ + 🍓 = ${m + s + f}</div></div>`, ans, opts: numOpts(ans, [f, ans + 1, f - 1], 0), why: `⭐ = ${s}, 🍎 = ${m}, 🍓 = ${f}. Sucesor: ${ans}.`, hint: "Resuelve de arriba hacia abajo.",
    steps: T => [
      { t: `Resolvemos de arriba hacia abajo. 4 estrellas = ${4 * s} → ⭐ = <b>${s}</b>.`, b: BOARD.lines([`⭐ = ${4 * s} ÷ 4 = ${s}`]) },
      { t: `3 manzanas = ${3 * m} → 🍎 = <b>${m}</b>. Entonces ${m} + ${s} + 🍓 = ${m + s + f} → 🍓 = <b>${f}</b>.`, bAdd: BOARD.lines([`🍎 = ${m}`, `🍓 = ${m + s + f} − ${m + s} = ${f}`]) },
      { t: `El sucesor de ${f} es <b>${ans}</b>.` }
    ],
    err: w => w === f ? "Ese es el valor de la fresa; piden su sucesor." : "" }; },
  d => { const k = 4 + d, s = Array.from({ length: k }, (_, i) => (i + 1) * (i + 1)), ans = (k + 1) * (k + 1);
    return { prompt: "¿Qué número continúa?", say: "¿Qué número continúa en la sucesión?", scene: `<div class="seq">${s.join(" ; ")} ; ?</div>`, ans, opts: numOpts(ans, [s[k - 1] + s[k - 1] - s[k - 2], ans + 1, ans - 1], 0), why: `Los saltos son +3, +5, +7…: ${ans}.`, hint: "Mira cómo crecen los saltos.",
    steps: T => [
      { t: `Miramos los saltos: ¡crecen! +3, +5, +7…`, b: BOARD.seq([...s, "?"], { diffs: [...s.slice(1).map((x, i) => x - s[i]), null] }) },
      { t: `Ahora toca +${2 * k + 1}: ${s[k - 1]} + ${2 * k + 1} = ${ans}. (Son números «cuadrados»: ${k + 1} × ${k + 1}.)` },
      { t: `Continúa <b>${ans}</b>.` }
    ] }; },
  d => { const ar = pick([6, 12]), por = pick([2, 3]), pal = ar * por + 2 * between(1, 4), ans = pal - ar * por;
    return { prompt: `En un parque hay <b>${ar === 6 ? "media docena" : "una docena"}</b> de árboles y <b>${pal}</b> palomas. Si en cada árbol se paran <b>${por}</b> palomas, ¿cuántas quedan volando?`, say: "¿Cuántas palomas quedan volando?", scene: "", ans, opts: numOpts(ans, [pal - ar, ar * por, ans + 2], 0), why: `${ar} × ${por} = ${ar * por} paradas. ${pal} − ${ar * por} = ${ans}.`, hint: "Media docena = 6 y una docena = 12.",
    steps: T => [
      { t: `Datos: ${ar === 6 ? "media docena = 6" : "una docena = 12"} árboles, ${pal} palomas, ${por} en cada árbol.` },
      { t: `Palomas paradas: ${Array(Math.min(ar, 6)).fill(por).join(" + ")}${ar > 6 ? " + …" : ""} = ${ar * por}.`, b: BOARD.lines([`${ar} × ${por} = ${ar * por}`, `${pal} − ${ar * por} = ${ans}`]) },
      { t: `Quedan volando <b>${ans}</b>.` }
    ],
    err: w => w === ar * por ? "Esas son las que se pararon." : w === pal - ar ? `En cada árbol se paran ${por}, no 1.` : "" }; },
  d => { const [x, y, z] = [between(1, 9), between(1, 9), between(1, 9)], ans = x + y + z - 1;
    return { prompt: `Si △(x; y; z) = x + y + z, halla el <b>antecesor</b> de △(${x}; ${y}; ${z}).`, say: "Calcula el triángulo y halla su antecesor.", scene: "", ans, opts: numOpts(ans, [ans + 1, ans + 2, ans - 1], 0), why: `${x} + ${y} + ${z} = ${ans + 1}; antecesor ${ans}.`, hint: "Primero el triángulo, después resta 1.",
    steps: T => [
      { t: `Primero el triángulo: ${x} + ${y} + ${z} = <b>${ans + 1}</b>.`, b: BOARD.lines([`△ = ${x} + ${y} + ${z} = ${ans + 1}`]) },
      { t: `El antecesor es el de antes: ${ans + 1} − 1.`, b: BOARD.jumps(ans + 1, [-1], { pad: 2 }) },
      { t: `El antecesor es <b>${ans}</b>.` }
    ],
    err: w => w === ans + 1 ? "Falta el antecesor (−1)." : "" }; },
  d => { const c = 2 * between(3, 8 + d), ans = c + 3 * c + c / 2;
    return { prompt: `Carmen tiene S/ ${c}. Juana tiene el <b>triple</b> que Carmen y Diana la <b>mitad</b> que Carmen. ¿Cuánto tienen las tres juntas?`, say: "¿Cuánto tienen las tres juntas?", scene: "", ans, opts: numOpts(ans, [c + 3 * c, c + 2 * c + c / 2, 3 * c + c / 2], 0), why: `${c} + ${3 * c} + ${c / 2} = ${ans}.`, hint: "Triple = 3 veces, mitad = entre 2.",
    steps: T => [
      { t: `Carmen: ${c}. Juana: el triple = ${c} + ${c} + ${c} = ${3 * c}. Diana: la mitad de ${c} = ${c / 2}.`, b: BOARD.lines([`Carmen: ${c}`, `Juana: ${3 * c}`, `Diana: ${c / 2}`], { step: .8 }) },
      { t: `Sumamos las tres:`, bAdd: BOARD.lines([`${c} + ${3 * c} + ${c / 2} = ${ans}`]) },
      { t: `Tienen <b>S/ ${ans}</b>.` }
    ] }; },
  d => { const u = between(1, 4), dd = 2 * u, ans = 10 * dd + u;
    return { prompt: `Adivina: «Soy un número de dos cifras. Mi cifra de las decenas es el <b>doble</b> de la de las unidades y mis cifras suman <b>${3 * u}</b>». ¿Quién soy?`, say: `Mi cifra de las decenas es el doble de la de las unidades y mis cifras suman ${3 * u}. ¿Quién soy?`, scene: "", ans, opts: numOpts(ans, [10 * u + dd, ans + 1, 3 * u], 1), why: `${dd} es el doble de ${u} y ${dd} + ${u} = ${3 * u}: ${ans}.`, hint: "Prueba con unidades 1, 2, 3…",
    steps: T => [
      { t: `Probamos con las unidades: si U = 1, D = 2 (el doble) y suman 3; si U = 2, D = 4 y suman 6; si U = 3, D = 6 y suman 9…`, b: BOARD.lines([1, 2, 3, 4].map(k => `U = ${k}, D = ${2 * k} → suman ${3 * k}${k === u ? " ✅" : ""}`), { step: .7 }) },
      { t: `Deben sumar ${3 * u}: U = ${u} y D = ${dd}.` },
      { t: `El número es <b>${ans}</b>.` }
    ],
    err: w => w === 10 * u + dd ? "Al revés: las decenas son el doble." : "" }; },
  d => { const base = [between(1, 5), between(1, 5), between(1, 5)], mid = [base[0] + base[1], base[1] + base[2]], top = mid[0] + mid[1];
    return { prompt: "Cada bloque es la suma de los dos de abajo. ¿Qué número va en la punta?", say: "Completa la pirámide. ¿Qué número va arriba?", scene: pyramid([["?"], ["", ""], base]), ans: top, opts: numOpts(top, [mid[0], base[0] + base[1] + base[2], top + 1], 0), why: `Medio: ${mid.join(" y ")}. Punta: ${top}.`, hint: "Primero la fila del medio.",
    steps: T => [
      { t: `Vamos de abajo hacia arriba. Fila del medio: ${base[0]} + ${base[1]} = ${mid[0]} y ${base[1]} + ${base[2]} = ${mid[1]}.`, b: BOARD.big(pyramid([["?"], mid, base], new Set(["2,0", "2,1", "2,2"]))) },
      { t: `Punta: ${mid[0]} + ${mid[1]} = <b>${top}</b>.`, b: BOARD.big(pyramid([[top], mid, base], new Set(["1,0", "1,1"]))) },
      { t: `En la punta va <b>${top}</b>.` }
    ] }; },
  d => { const S = between(3, 6 + d), list = []; for (let n = 10; n < 100; n++) if (Math.floor(n / 10) + n % 10 === S) list.push(n); const ans = list.length;
    return { prompt: `¿Cuántos números de dos cifras tienen cifras que suman <b>${S}</b>?`, say: `¿Cuántos números de dos cifras tienen cifras que suman ${S}?`, scene: "", ans, opts: numOpts(ans, [ans + 1, ans - 1, S + 2], 1), why: `Son ${list.join(", ")}: ${ans}.`, hint: "Empieza por 1_, luego 2_, 3_…",
    steps: T => [
      { t: `Buscamos en orden: los que empiezan con 1, con 2, con 3… y cuyas dos cifras sumen ${S}.` },
      { t: `Los escribimos:`, b: BOARD.lines([list.join(", ")]) },
      { t: `Son <b>${ans}</b> números.` }
    ] }; },
  d => { const p = between(1, 3), q = between(1, 3), r = between(1, 2), ans = 4 * p + 2 * q + 4 * r;
    return { prompt: `¿Cuántas patas se pueden contar en <b>${p}</b> perros, <b>${q}</b> loros y <b>${r}</b> conejo${r > 1 ? "s" : ""}?`, say: `¿Cuántas patas hay en ${p} perros, ${q} loros y ${r} conejos?`, scene: line([...em("🐶", p), ...em("🦜", q), ...em("🐰", r)]), ans, opts: numOpts(ans, [4 * (p + q + r), 2 * (p + q + r), ans + 2], 0), why: `${4 * p} + ${2 * q} + ${4 * r} = ${ans}.`, hint: "Loros 2 patas; perros y conejos 4.",
    steps: T => [
      { t: `Los perros y los conejos tienen <b>4</b> patas; los loros, <b>2</b>.` },
      { t: `Calculamos cada grupo:`, b: BOARD.lines([`🐶 ${p} × 4 = ${4 * p}`, `🦜 ${q} × 2 = ${2 * q}`, `🐰 ${r} × 4 = ${4 * r}`, `${4 * p} + ${2 * q} + ${4 * r} = ${ans}`], { step: .8 }) },
      { t: `Hay <b>${ans}</b> patas.` }
    ],
    err: w => w === 4 * (p + q + r) ? "Los loros tienen 2 patas, no 4." : "" }; },
  d => { const b = between(2, 4 + d), x = between(1, 3 * b - 1), ans = 2 * b;
    return { prompt: "La balanza está en equilibrio. ¿Cuánto pesa un <b>par</b> de botellas?", say: "¿Cuánto pesan dos botellas?", scene: balance(em("🍼", 3).join(""), `<span class="weight">${x} kg</span><span class="weight">${3 * b - x} kg</span>`), ans, opts: numOpts(ans, [b, 3 * b, ans + 2], 1), why: `3 botellas = ${3 * b} kg → 1 = ${b} → 2 = ${ans}.`, hint: "Primero una botella.",
    steps: T => [
      { t: `Balanza en equilibrio: 3 botellas = ${x} + ${3 * b - x} = <b>${3 * b}</b> kg.` },
      { t: `Una botella: ${3 * b} repartido en 3 = <b>${b}</b> kg.`, b: BOARD.share(3 * b, 3, "●", { names: ["🍼", "🍼", "🍼"] }) },
      { t: `Un par: ${b} + ${b} = <b>${ans}</b> kg.` }
    ],
    err: w => w === b ? "Esa es una sola botella; piden un par." : "" }; },
];
function oliPoly(k) { const cells = new Set(["1,1"]); while (cells.size < k) { const [x, y] = pick([...cells]).split(",").map(Number), [dx, dy] = pick([[1, 0], [-1, 0], [0, 1], [0, -1]]), nx = x + dx, ny = y + dy; if (nx >= 0 && ny >= 0 && nx < 4 && ny < 3) cells.add(nx + "," + ny); } return [...cells].map(s => s.split(",").map(Number)); }
const OLI_FIG = [
  d => { const m = between(2, 3), h = between(0, d > 0 ? 1 : 0), ans = (h + 1) * m * (m + 1) / 2;
    return { prompt: "¿Cuántos triángulos hay en la figura?", say: "¿Cuántos triángulos hay en total?", scene: triFan(m, h), ans, opts: numOpts(ans, [m * (h + 1), ans - 1, ans + 2], 1), why: `Hay ${ans} triángulos.`, hint: "Pequeños, de 2 piezas, de 3 piezas…",
    steps: T => [
      { t: `Contamos los triángulos de 1 pieza, luego los de 2 piezas${m > 2 ? ", luego los de 3" : ""}${h ? ", en cada piso" : ""}.` },
      { t: `Los marcamos uno por uno:`, go: T.flash(FIG.triFan(m, h)) },
      { t: `Hay <b>${ans}</b> triángulos.` }
    ] }; },
  d => { const r = d > 0 ? 2 : 1, c = between(2, 3), ans = (r === 2 ? 3 : 1) * c * (c + 1) / 2;
    return { prompt: "¿Cuántos rectángulos (con los cuadrados) hay?", say: "¿Cuántos rectángulos hay en total?", scene: rectGrid(r, c), ans, opts: numOpts(ans, [r * c, ans - 2, ans + 2], 1), why: `Hay ${ans}.`, hint: "Cuenta los simples y los que se forman juntando.",
    steps: T => [
      { t: `Contamos los rectángulos por tamaño: de 1 pieza, de 2, de 3…${r === 2 ? " y también los que usan las dos filas" : ""}.` },
      { t: `Los marcamos uno por uno:`, go: T.flash(FIG.rects(r, c), { ms: 700 }) },
      { t: `Hay <b>${ans}</b> rectángulos.` }
    ] }; },
  d => { const n = d > 1 ? 3 : 2, ans = n === 2 ? 5 : 14;
    return { prompt: "¿Cuántos cuadrados hay en la figura?", say: "¿Cuántos cuadrados hay en total?", scene: squareGrid(n), ans, opts: numOpts(ans, [n * n, n * n + 1, ans + 1], 1), why: n === 2 ? "4 + 1 = 5." : "9 + 4 + 1 = 14.", hint: "Pequeños, medianos y grande.",
    steps: T => [
      { t: `Contamos los cuadrados por tamaño: pequeños${n === 3 ? ", medianos" : ""} y el grande.` },
      { t: `Los marcamos uno por uno:`, go: T.flash(FIG.squares(n)) },
      { t: n === 2 ? `4 + 1 = <b>5</b>.` : `9 + 4 + 1 = <b>14</b>.` }
    ] }; },
  d => { const p = between(4, 5), ans = C2(p);
    return { prompt: "¿Cuántos segmentos hay en total?", say: "¿Cuántos segmentos hay?", scene: segPoints(p), ans, opts: numOpts(ans, [p - 1, p, ans + 1], 1), why: `${Array.from({ length: p - 1 }, (_, i) => p - 1 - i).join(" + ")} = ${ans}.`, hint: "Desde A salen…, desde B…",
    steps: T => [
      { t: `Un segmento une dos puntos. Contamos en orden: desde A, desde B, desde C…` },
      { t: `Los marcamos:`, go: T.flash(FIG.segs(p), { ms: 700, say: (k, sh) => sh.name }) },
      { t: `${Array.from({ length: p - 1 }, (_, i) => p - 1 - i).join(" + ")} = <b>${ans}</b>.` }
    ] }; },
  d => { const H = Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => between(1, 2))), have = H.flat().reduce((a, b) => a + b, 0), ans = 8 - have;
    return { prompt: "¿Cuántos cubitos faltan para formar un cubo de 2 × 2 × 2?", say: "¿Cuántos cubitos faltan para formar un cubo grande?", scene: isoCubes(H), ans, opts: numOpts(ans, [have, 8, ans + 1], 0), why: `8 − ${have} = ${ans}.`, hint: "El cubo grande tiene 8.",
    steps: T => { const tp = isoTops(H);
      return [
        { t: `Un cubo de 2 × 2 × 2 tiene <b>8</b> cubitos. Contamos los que hay, torre por torre:`, go: T.dots(T.sc.querySelector("svg"), tp.map(q => [q.x, q.y]), { label: k => tp[k - 1].n, say: k => String(tp.slice(0, k).reduce((p2, q) => p2 + q.n, 0)), ms: 1000 }) },
        { t: `Hay ${have}. Faltan 8 − ${have}.`, b: BOARD.lines([`8 − ${have} = ${ans}`]) },
        { t: `Faltan <b>${ans}</b>.` }
      ]; } }; },
  d => { let x = between(1, 3), y = between(1, 2); const sx = x, sy = y, st = []; for (let i = 0; i < 3 + d; i++) for (;;) { const m = pick([["↑", 0, 1], ["↓", 0, -1], ["→", 1, 0], ["←", -1, 0]]), n = between(1, 3), nx = x + m[1] * n, ny = y + m[2] * n; if (nx >= 0 && nx <= 6 && ny >= 0 && ny <= 5) { st.push(n + m[0]); x = nx; y = ny; break; } }
    const ans = `(${x};${y})`;
    return { prompt: "Parte del 🎲 y sigue las flechas. ¿En qué coordenada termina?", say: "Sigue las flechas desde el dado.", scene: `<div class="seq" style="font-size:20px">${st.map(s => `<span class="card-op">${s}</span>`).join(" ")}</div>` + coordGrid(6, 5, [{ x: sx, y: sy, e: "🎲" }]), ans, opts: shuffle([...new Set([ans, `(${y};${x})`, `(${x + 1};${y})`, `(${x};${y === 5 ? 4 : y + 1})`])]), cols: 2, why: `Termina en ${ans}.`, hint: "Paso a paso con el dedo.",
    steps: T => { let cx = sx, cy = sy; const MV2 = { "↑": [0, 1], "↓": [0, -1], "→": [1, 0], "←": [-1, 0] };
      const segs = st.map(z => { const n2 = parseInt(z), dd = z.slice(-1), [a1, b1] = coordXY(6, 5, cx, cy); cx += MV2[dd][0] * n2; cy += MV2[dd][1] * n2; const [c1, d1] = coordXY(6, 5, cx, cy); return [a1, b1, c1, d1]; });
      return [
        { t: `Empezamos en el 🎲 (${sx};${sy}). Cada flecha dice hacia dónde y el número cuántas casillas.` },
        { t: `Recorremos:`, go: T.strokes(T.sc.querySelector("svg"), segs, { label: k => st[k - 1], ms: 1200, r: 12 }) },
        { t: `Terminamos en <b>${ans}</b>.` }
      ]; } }; },
  d => pick([
    { prompt: "¿Qué parentesco tiene conmigo Margot, si su madre fue la única hija de mi madre? (yo soy mujer)", say: "¿Qué parentesco tiene conmigo Margot?", scene: "", ans: "hija", opts: ["sobrina", "hija", "hermana", "prima"], cols: 2, cls: "grp", why: "La única hija de mi madre soy yo: Margot es mi hija.", hint: "¿Quién es la única hija de mi madre?", steps: T => [{ t: "La clave: «la única hija de mi madre» soy <b>yo</b> (soy mujer y soy su única hija)." }, { t: "Entonces la madre de Margot soy yo.", b: BOARD.lines(["mi madre", "↓", "yo", "↓", "Margot"]) }, { t: "Margot es mi <b>hija</b>." }] },
    { prompt: "César es mayor que Dany. Carmen es menor que Dany. César es menor que Patrick. ¿Quién es el mayor?", say: "¿Quién es el mayor?", scene: "", ans: "Patrick", opts: ["César", "Dany", "Patrick", "Carmen"], cols: 2, cls: "grp", why: "Patrick > César > Dany > Carmen.", hint: "Ordena con cada pista.", steps: T => [{ t: "Ordenamos de mayor a menor con cada pista:", b: BOARD.lines(["César > Dany", "César > Dany > Carmen", "Patrick > César > Dany > Carmen"], { step: 1.1 }) }, { t: "Patrick es mayor que César, y César es mayor que los demás." }, { t: "El mayor es <b>Patrick</b>." }] },
    { prompt: "El hijo del único hermano de mi papá es mi…", say: "El hijo del único hermano de mi papá es mi…", scene: "", ans: "primo", opts: ["hermano", "primo", "tío", "sobrino"], cols: 2, cls: "grp", why: "El hermano de mi papá es mi tío; su hijo es mi primo.", hint: "Paso a paso: primero el tío.", steps: T => [{ t: "Vamos paso a paso por el árbol familiar." }, { t: "El hermano de mi papá es mi <b>tío</b>. El hijo de mi tío es mi <b>primo</b>.", b: BOARD.lines(["papá ↔ tío", "↓        ↓", "yo   primo"]) }, { t: "Es mi <b>primo</b>." }] }]),
  d => { const k = between(4, 6), cells = oliPoly(k), key = new Set(cells.map(p => p.join(","))), s = 2; let e = 0; cells.forEach(([x, y]) => [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => { if (!key.has((x + dx) + "," + (y + dy))) e++; }));
    const ans = e * s; return { prompt: "Cada cuadradito mide <b>2 cm</b> de lado. ¿Cuál es el perímetro de la figura sombreada?", say: "Cada cuadradito mide 2 centímetros. ¿Cuál es el perímetro?", scene: gridSvg(4, 3, new Set(cells.map(([x, y]) => y * 4 + x)), { color: "#86efac" }), ans, opts: numOpts(ans, [k * 2, ans - 4, ans + 4], 1), why: `${e} lados × 2 cm = ${ans} cm.`, hint: "Cuenta los lados del borde y multiplica por 2.",
    steps: T => { const S2 = 34, segs = [];
      cells.forEach(([x, y]) => { if (!key.has(x + "," + (y - 1))) segs.push([x * S2, y * S2, (x + 1) * S2, y * S2]); if (!key.has((x + 1) + "," + y)) segs.push([(x + 1) * S2, y * S2, (x + 1) * S2, (y + 1) * S2]); if (!key.has(x + "," + (y + 1))) segs.push([x * S2, (y + 1) * S2, (x + 1) * S2, (y + 1) * S2]); if (!key.has((x - 1) + "," + y)) segs.push([x * S2, y * S2, x * S2, (y + 1) * S2]); });
      return [
        { t: `Contamos los lados de cuadradito del <b>borde de afuera</b>:`, go: T.strokes(T.sc.querySelector("svg"), segs, { ms: 500 }) },
        { t: `Hay ${e} lados y cada uno mide 2 cm: ${e} × 2.`, b: BOARD.lines([`${Array(Math.min(e, 6)).fill(2).join(" + ")}${e > 6 ? " + …" : ""} = ${ans}`]) },
        { t: `El perímetro es <b>${ans}</b> cm.` }
      ]; } }; },
  d => { const D = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"], s = rnd(7), a = between(3, 10), b = a + between(8, 20), ans = D[(s + b - a) % 7];
    return { prompt: `César cumple años el ${D[s]} ${a} de mayo y Jorge el ${b} de mayo. ¿Qué día cumple Jorge?`, say: "¿Qué día de la semana cumple Jorge?", scene: "", ans, opts: shuffle([ans, ...sample(D.filter(x => x !== ans), 3)]), cols: 2, cls: "grp", why: `Pasan ${b - a} días: ${ans}.`, hint: "Cada 7 días se repite el día.",
    steps: T => [
      { t: `Del ${a} al ${b} pasan ${b - a} días. Cada 7 días se repite el mismo día: ${b - a} = ${Math.floor((b - a) / 7) * 7} + ${(b - a) % 7}.` },
      { t: `Las semanas completas caen otra vez en ${D[s]}. Avanzamos ${(b - a) % 7} día${(b - a) % 7 === 1 ? "" : "s"} más:`, b: BOARD.seq(Array.from({ length: (b - a) % 7 + 1 }, (_, j) => D[(s + j) % 7]), { diffs: Array((b - a) % 7).fill(null), hl: (b - a) % 7 }) },
      { t: `Jorge cumple un <b>${ans}</b>.` }
    ] }; },
  d => { const a = between(3, 7), b = between(2, 6), ans = a + b - 1;
    return { prompt: `En una fila, Ana es la <b>${a}.ª</b> contando desde adelante y la <b>${b}.ª</b> desde atrás. ¿Cuántos niños hay?`, say: `Ana es la ${a} desde adelante y la ${b} desde atrás. ¿Cuántos niños hay?`, scene: "", ans, opts: numOpts(ans, [a + b, a + b + 1, ans - 1], 1), why: `${a} + ${b} − 1 = ${ans}.`, hint: "¡No cuentes a Ana dos veces!",
    steps: T => [
      { t: `Ana tiene ${a - 1} niños delante y ${b - 1} detrás.`, b: BOARD.lines([`${"🧒".repeat(a - 1)}👧${"🧒".repeat(b - 1)}`]) },
      { t: `${a - 1} + 1 (Ana) + ${b - 1} = ${ans}. Si sumas ${a} + ${b}, cuentas a Ana dos veces.` },
      { t: `Hay <b>${ans}</b> niños.` }
    ],
    err: w => w === a + b ? "¡Contaste a Ana dos veces!" : "" }; },
];
const oli = (list, d) => () => pick(list)(d);
