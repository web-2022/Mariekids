/* Tema 15 · Números ordinales · Kiki */
const ORD = ["primero", "segundo", "tercero", "cuarto", "quinto", "sexto", "séptimo", "octavo", "noveno", "décimo"];
const AN = ["🐢", "🐇", "🐶", "🐱", "🐷", "🐻", "🦊", "🐸", "🐼", "🐵"];
const race = list => `<div class="line" style="flex-wrap:nowrap;justify-content:flex-start;overflow:hidden"><span>🏁</span>${list.map(x => `<span style="display:inline-block;transform:scaleX(-1)">${x}</span>`).join("")}</div><div class="legend">🏁 llegada · el más cerca de la bandera va primero</div>`;
const GEN = [
  [
    () => { const k = between(4, 6), list = sample(AN, k), p = rnd(k), ans = ORD[p];
      return { prompt: `¿En qué lugar va ${list[p]}?`, say: "¿En qué lugar va este animalito?", scene: race(list), ans, opts: shuffle([ans, ...sample(ORD.slice(0, k + 1).filter(x => x !== ans), 3)]), cols: 2, why: `${list[p]} va en el lugar ${p + 1}: ${ans}.`, hint: "Cuenta desde la bandera 🏁." }; },
  ],
  [
    () => { const k = between(5, 7), list = sample(AN, k), p = between(1, k - 1), ans = list[p];
      return { prompt: `¿Quién va en el <b>${ORD[p]}</b> lugar?`, say: `¿Quién va en el ${ORD[p]} lugar?`, scene: race(list), ans, opts: shuffle([ans, ...sample(list.filter(x => x !== ans), 3)]), cols: 4, why: `Contando desde la bandera, el ${ORD[p]} es ${ans}.`, hint: "1.º, 2.º, 3.º… desde la bandera." }; },
  ],
  [
    () => { const a = between(2, 6), b = between(2, 6), ans = a + b - 1;
      return { prompt: `En una fila, Ana está en el <b>${ORD[a - 1]}</b> lugar contando desde adelante y en el <b>${ORD[b - 1]}</b> lugar contando desde atrás. ¿Cuántos niños hay en la fila?`, say: `Ana es la ${ORD[a - 1]} desde adelante y la ${ORD[b - 1]} desde atrás. ¿Cuántos niños hay?`, scene: "",
        ans, opts: numOpts(ans, [a + b, a + b + 1, ans - 1], 1), why: `${a} + ${b} − 1 = ${ans} (Ana se contó dos veces).`, hint: "Dibuja la fila con palitos. ¡No cuentes a Ana dos veces!" }; },
    () => { const p = between(3, 9), t = rnd(2), tot = p + between(2, 5), ans = t ? p - 1 : tot - p;
      return { prompt: t ? `Pipo es el <b>${ORD[p - 1]}</b> de la fila. ¿Cuántos niños hay <b>delante</b> de él?` : `En una fila de <b>${tot}</b> niños, Pipo es el <b>${ORD[p - 1]}</b>. ¿Cuántos hay <b>detrás</b> de él?`, say: t ? `Pipo es el ${ORD[p - 1]} de la fila. ¿Cuántos niños hay delante de él?` : `En una fila de ${tot} niños, Pipo es el ${ORD[p - 1]}. ¿Cuántos hay detrás?`, scene: "",
        ans, opts: numOpts(ans, t ? [p, p + 1] : [tot - p + 1, p, tot], 0), why: t ? `Delante de él hay ${p - 1}.` : `${tot} − ${p} = ${ans}.`, hint: "Haz un dibujo de la fila." }; },
  ]
];
lesson({ n: 15, title: "Números ordinales", short: "Ordinales", char: "kiki", music: "huayno", deco: ["🥇", "🥈", "🥉", "🏁"],
  hello: "¡Hola! Soy <b>Kiki</b> 🐧. Primero, segundo, tercero… los <b>ordinales</b> dicen el <b>lugar</b> de cada uno.",
  levels: LEVELS3(["¿En qué lugar va?", "Primero, segundo…"], ["¿Quién va…?", "Buscar por el lugar"], ["", "Filas desde adelante y desde atrás"]) }, GEN);
