/* Tema 38 · Secuencias de letras y palabras · Kiki */
const ABC = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
const DIAS = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "setiembre", "octubre", "noviembre", "diciembre"];
const GEN = [
  [
    () => { const st = between(0, 18), s = [0, 1, 2, 3].map(i => ABC[st + i]), ans = ABC[st + 4];
      return { prompt: "¿Qué letra <b>sigue</b>?", say: "¿Qué letra sigue en el abecedario?", scene: `<div class="seq">${s.join(" , ")} , ?</div>`, ans, opts: shuffle([ans, ABC[st + 5], ABC[st + 3], ABC[st + 6]]), cols: 4, why: `En el abecedario, después de ${ABC[st + 3]} viene ${ans}.`, hint: "Canta el abecedario.",
        steps: T => [
          { t: `Las letras van en el orden del <b>abecedario</b>.`, b: BOARD.seq(ABC.slice(Math.max(0, st - 1), st + 7), { diffs: Array(7).fill(null), hl: st + 4 - Math.max(0, st - 1) }) },
          { t: `Después de ${s.join(", ")} viene la siguiente letra.` },
          { t: `Sigue la <b>${ans}</b>.` }
        ] }; },
    () => { const st = rnd(7), s = [0, 1, 2].map(i => DIAS[(st + i) % 7]), ans = DIAS[(st + 3) % 7];
      return { prompt: "¿Qué día <b>sigue</b>?", say: s.join(", ") + ". ¿Qué día sigue?", scene: `<div class="seq">${s.join(", ")}, …</div>`, ans, opts: shuffle([ans, DIAS[(st + 4) % 7], DIAS[(st + 2) % 7], DIAS[(st + 5) % 7]]), cols: 2, cls: "grp", why: `Después de ${s[2]} viene ${ans}.`, hint: "Recuerda los días de la semana.",
        steps: T => [
          { t: `Los días de la semana van siempre en el mismo orden y, después del domingo, vuelve el lunes.`, b: BOARD.seq(DIAS, { diffs: Array(6).fill(null), hl: (st + 3) % 7 }) },
          { t: `Después de ${s[2]} viene ${ans}.` },
          { t: `Sigue <b>${ans}</b>.` }
        ] }; },
  ],
  [
    () => { const st = between(0, 12), k = 2, s = [0, 1, 2, 3].map(i => ABC[st + k * i]), ans = ABC[st + 8];
      return { prompt: "¿Qué letra sigue? (salta una)", say: "¿Qué letra sigue? Va saltando una letra.", scene: `<div class="seq">${s.join(" , ")} , ?</div>`, ans, opts: shuffle([ans, ABC[st + 7], ABC[st + 9], ABC[st + 6]]), cols: 4, why: `Salta una letra cada vez: sigue ${ans}.`, hint: "Escribe el abecedario y marca las letras.",
        steps: T => [
          { t: `Escribimos el abecedario y marcamos las letras: ¡va saltando <b>una</b> letra cada vez!`, b: BOARD.seq(ABC.slice(st, st + 9).map((x, i) => i % 2 ? `<span style="opacity:.35">${x}</span>` : x), { diffs: Array(8).fill(null), hl: 8 }) },
          { t: `${s[3]} → salto ${ABC[st + 7]} → llegamos a ${ans}.` },
          { t: `Sigue la <b>${ans}</b>.` }
        ] }; },
    () => { const V = ["A", "E", "I", "O", "U"], rev = rnd(2) === 0, s = rev ? [...V].reverse() : V, k = between(2, 3), ans = s[k + 1];
      return { prompt: "Halla la letra que continúa:", say: "Halla la vocal que continúa.", scene: `<div class="seq">${s.slice(0, k + 1).join(" , ")} , …</div>`, ans, opts: shuffle(V.filter(v => v !== s[k]).slice(0, 4).includes(ans) ? [ans, ...sample(V.filter(v => v !== ans && v !== s[k]), 3)] : [ans, ...sample(V.filter(v => v !== ans), 3)]), cols: 4,
        why: `Son las vocales ${rev ? "al revés" : "en orden"}: ${s.join(", ")}.`, hint: "Recuerda las vocales: A, E, I, O, U.",
        steps: T => [
          { t: `Las vocales son <b>A, E, I, O, U</b>. Aquí van ${rev ? "al revés: U, O, I, E, A" : "en orden"}.`, b: BOARD.seq(s, { diffs: Array(4).fill(null), hl: k + 1 }) },
          { t: `Después de ${s[k]} viene ${ans}.` },
          { t: `Continúa la <b>${ans}</b>.` }
        ] }; },
  ],
  [
    () => { const st = rnd(7), k = 2, s = [0, 1, 2].map(i => DIAS[(st + k * i) % 7]), ans = DIAS[(st + 6) % 7];
      return { prompt: "¿Qué día sigue? (salta uno)", say: s.join(", ") + ". ¿Qué día sigue?", scene: `<div class="seq">${s.join(", ")}, …</div>`, ans, opts: shuffle([ans, DIAS[(st + 5) % 7], DIAS[(st + 7) % 7], DIAS[(st + 4) % 7]]), cols: 2, cls: "grp", why: `Salta un día cada vez: sigue ${ans}.`, hint: "Escribe los días de la semana en círculo.",
        steps: T => [
          { t: `Escribimos los días en círculo y vemos que va <b>saltando uno</b>:`, b: BOARD.seq(Array.from({ length: 7 }, (_, i) => DIAS[(st + i) % 7]).map((x, i) => i % 2 ? `<span style="opacity:.35">${x}</span>` : x), { diffs: Array(6).fill(null), hl: 6 }) },
          { t: `${s[2]} → salto ${DIAS[(st + 5) % 7]} → llegamos a ${ans}.` },
          { t: `Sigue <b>${ans}</b>.` }
        ] }; },
    () => { const st = rnd(12), k = pick([1, 2]), s = [0, 1, 2].map(i => MESES[(st + k * i) % 12]), ans = MESES[(st + 3 * k) % 12];
      return { prompt: "¿Qué mes sigue?", say: s.join(", ") + ". ¿Qué mes sigue?", scene: `<div class="seq">${s.join(", ")}, …</div>`, ans, opts: shuffle([...new Set([ans, MESES[(st + 3 * k + 1) % 12], MESES[(st + 3 * k - 1 + 12) % 12], MESES[(st + 3 * k + 2) % 12]])]), cols: 2, cls: "grp", why: `${k === 1 ? "Van seguidos" : "Salta un mes"}: sigue ${ans}.`, hint: "Recuerda los meses del año.",
        steps: T => [
          { t: k === 1 ? `Los meses van <b>seguidos</b>.` : `Los meses van <b>saltando uno</b>.`, b: BOARD.seq(Array.from({ length: 3 * k + 1 }, (_, i) => MESES[(st + i) % 12]).map((x, i) => i % k ? `<span style="opacity:.35">${x}</span>` : x), { diffs: Array(3 * k).fill(null), hl: 3 * k }) },
          { t: `Después de ${s[2]}${k === 2 ? `, saltamos ${MESES[(st + 3 * k - 1) % 12]}` : ""}, viene ${ans}.` },
          { t: `Sigue <b>${ans}</b>.` }
        ] }; },
  ]
];
lesson({ n: 38, title: "Secuencias de letras y palabras", short: "Secuencias de letras", char: "kiki", music: "cuento", deco: ["🔤", "📅", "A", "Z"],
  hello: "¡Hola! Soy <b>Kiki</b> 🐧. Las letras, los días y los meses también forman <b>secuencias</b>.",
  levels: LEVELS3(["Abecedario y días", "¿Qué sigue?"], ["Saltos y vocales", "Saltando letras"], ["", "Días y meses saltando"]) }, GEN);
