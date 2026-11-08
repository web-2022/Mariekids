/* Tema 52 · Derecha, izquierda, arriba, abajo, dentro y fuera · Pipo */
const O = ["🍎", "🐶", "⚽", "🚗", "🌸", "🐱", "🎈", "🍌", "🐸", "⭐"];
const GEN = [
  [
    () => { const r = sample(O, 5), i = between(1, 3), der = rnd(2) === 0, ans = r[der ? i + 1 : i - 1];
      return { prompt: `¿Qué hay a la <b>${der ? "derecha 👉" : "izquierda 👈"}</b> de ${r[i]}?`, say: `¿Qué hay a la ${der ? "derecha" : "izquierda"} de este dibujo?`, scene: line(r), ans, opts: shuffle([ans, ...sample(r.filter(x => x !== ans && x !== r[i]), 3)]), cols: 4, why: `Justo a la ${der ? "derecha" : "izquierda"} está ${ans}.`, hint: "👈 izquierda · derecha 👉 (mirando la pantalla).",
        steps: T => { const its = T.its();
          return [
            { t: `Mirando la pantalla: 👈 la <b>izquierda</b> es el lado de la mano con la que (casi siempre) NO escribes; 👉 la <b>derecha</b>, el otro lado.` },
            { t: `Buscamos ${r[i]} y miramos a su ${der ? "derecha 👉" : "izquierda 👈"}:`, go: d => { T.badge(its[i], "★", "t-big"); its[der ? i + 1 : i - 1].classList.add("t-hl"); T.dim(its.filter((x, j) => j !== i && j !== (der ? i + 1 : i - 1))); setTimeout(d, 900); } },
            { t: `Justo a la ${der ? "derecha" : "izquierda"} de ${r[i]} está <b>${ans}</b>.` }
          ]; } }; },
  ],
  [
    () => { const g = sample(O, 9), r = rnd(3), c = rnd(3), t = pick(["arriba", "abajo", "izq", "der"]); let rr = r, cc = c; if (t === "arriba") rr = r === 0 ? 1 : r - 1; if (t === "abajo") rr = r === 2 ? 1 : r + 1; if (t === "izq") cc = c === 0 ? 1 : c - 1; if (t === "der") cc = c === 2 ? 1 : c + 1;
      const ref = g[r * 3 + c], ans = g[rr * 3 + cc], dir = rr < r ? "arriba de" : rr > r ? "debajo de" : cc < c ? "a la izquierda de" : "a la derecha de";
      return { prompt: `¿Qué está <b>${dir}</b> ${ref}?`, say: `¿Qué está ${dir} este dibujo?`, scene: `<div style="display:inline-grid;grid-template-columns:repeat(3,56px);gap:4px">${g.map((x, i) => `<span class="it" data-k="c${i}" style="font-size:34px;background:#fff;border:2px solid #cbd5e1;border-radius:10px;text-align:center">${x}</span>`).join("")}</div>`,
        ans, opts: shuffle([ans, ...sample(g.filter(x => x !== ans && x !== ref), 3)]), cols: 4, why: `${ans} está ${dir} ${ref}.`, hint: "Busca primero el dibujo y luego mira a su alrededor.",
        steps: T => { const its = T.its();
          return [
            { t: `Primero buscamos ${ref} en la cuadrícula.`, go: d => { T.badge(its[r * 3 + c], "★", "t-big"); setTimeout(d, 800); } },
            { t: `Ahora miramos la casilla de al lado que está <b>${dir}</b> ${ref}:`, go: d => { its[rr * 3 + cc].classList.add("t-hl"); T.dim(its.filter((x, j) => j !== r * 3 + c && j !== rr * 3 + cc)); setTimeout(d, 800); } },
            { t: `${dir[0].toUpperCase() + dir.slice(1)} ${ref} está <b>${ans}</b>.` }
          ]; } }; },
  ],
  [
    () => { const L = between(2, 5), R = between(2, 5), kid0 = pick(["tito", "lula", "kiki"]), ans = L;
      return { prompt: `¿Cuántas naranjas tiene ${NAME(kid0)} a <b>su</b> derecha? (${NAME(kid0)} nos mira de frente)`, say: `¿Cuántas naranjas tiene ${NAME(kid0)} a su derecha? Nos está mirando de frente.`, scene: `<div class="sides"><div class="side">${em("<span class='it' data-k='L'>🍊</span>", L).join("")}</div>${kid(kid0)}<div class="side">${em("<span class='it' data-k='R'>🍊</span>", R).join("")}</div></div>`, ans, opts: numOpts(ans, [R, L + R, ans + 1].filter(x => x !== ans), 0),
        why: `Si nos mira de frente, SU derecha es NUESTRA izquierda: ${L} naranjas.`, hint: "Ponte en su lugar: levanta tu mano derecha como si miraras hacia ti.",
        steps: T => [
          { t: `${NAME(kid0)} nos mira de <b>frente</b>, como un espejo: su derecha queda en <b>nuestra izquierda</b>.` },
          { t: `Entonces SU derecha es este lado (nuestra izquierda). Contamos esas naranjas:`, go: d => { T.dim(T.of("R")); T.count(T.of("L"))(d); } },
          { t: `${NAME(kid0)} tiene <b>${L}</b> naranjas a su derecha.` }
        ],
        err: w => w === R ? "Esa es nuestra derecha, pero él nos mira de frente: su derecha es nuestra izquierda." : "" }; },
    () => { const a = between(2, 6), b = between(1, 5), e = pick(["⚽", "🍎", "⭐"]), inQ = rnd(2) === 0, ans = inQ ? a : b;
      return { prompt: `¿Cuántos ${e} están <b>${inQ ? "dentro" : "fuera"}</b> de la caja?`, say: `¿Cuántos están ${inQ ? "dentro" : "fuera"} de la caja?`, scene: `<div class="line"><span class="box" style="--bc:3">${em(`<span class="it" data-k="in">${e}</span>`, a).join("")}</span>${em(`<span class="it" data-k="out">${e}</span>`, b).join("")}</div>`, ans, opts: numOpts(ans, [inQ ? b : a, a + b, ans + 1], 0), why: `${inQ ? "Dentro" : "Fuera"} hay ${ans}.`, hint: "La caja es el recuadro marrón.",
        steps: T => [
          { t: `<b>Dentro</b> es lo que está en el recuadro de la caja. <b>Fuera</b> es lo que está afuera del recuadro.` },
          { t: `Apagamos lo que no nos piden y contamos lo que está ${inQ ? "dentro" : "fuera"}:`, go: d => { T.dim(T.of(inQ ? "out" : "in")); T.count(T.of(inQ ? "in" : "out"))(d); } },
          { t: `${inQ ? "Dentro" : "Fuera"} hay <b>${ans}</b>.` }
        ],
        err: w => w === a + b ? "Contaste todos." : "" }; },
  ]
];
lesson({ n: 52, title: "Derecha, izquierda, arriba, abajo, dentro y fuera", short: "Ubicación", char: "pipo", music: "calma", deco: ["👈", "👉", "⬆️", "⬇️"],
  hello: "¡Hola! Soy <b>Pipo</b> 🐧. ¿Derecha o izquierda? ¿Arriba o abajo? ¿Dentro o fuera? ¡Vamos a ubicarnos!",
  levels: LEVELS3(["Derecha e izquierda", "En una fila"], ["En un tablero", "Arriba, abajo y a los lados"], ["", "SU derecha y dentro/fuera"]) }, GEN);
