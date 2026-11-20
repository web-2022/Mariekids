        /* 🏆 RETO OLÍMPICO: preguntas mezcladas de todo el temario, con tiempo. Reto diario con racha. Temas 59–61. */
        const R = MKJ.rnd, P = MKJ.pick;
        let resp = null, primera = true, listoFn = null, reloj = null;
        const DIAS = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
        const LOGICA = [
            () => { const a = R(2, 9); return { t: `Ana tiene ${a} años. Su hermano tiene el doble. ¿Cuántos años tiene su hermano?`, r: 2 * a }; },
            () => { const a = R(2, 6), b = R(2, 6); return { t: `En una fila, Leo tiene ${a} niños delante y ${b} niños detrás. ¿Cuántos niños hay en la fila?`, r: a + b + 1 }; },
            () => { const a = R(4, 9), b = R(1, 3); return { t: `Un gato tiene 4 patas. ¿Cuántas patas tienen ${b + 1} gatos?`, r: 4 * (b + 1) }; },
            () => { const h = R(1, 9), n = R(1, 3); return { t: `Son las ${h} en punto. ¿Qué hora será en ${n} horas?`, r: h + n }; },
            () => { const d = R(0, 6), n = R(1, 6); return { t: `Hoy es ${DIAS[d]}. ¿Qué día será en ${n} días?`, r: DIAS[(d + n) % 7], ops: DIAS }; },
            () => { const c = R(2, 4); return { t: `¿Cuántos lados tienen ${c} triángulos juntos?`, r: 3 * c }; },
            () => { const a = R(5, 15), b = R(1, a - 1); return { t: `Tenía ${a} canicas y perdí ${b}. Luego gané 2. ¿Cuántas tengo?`, r: a - b + 2 }; },
            () => { const p = R(3, 9); return { t: `Compro un lápiz de S/ ${p} y pago con S/ 10. ¿Cuánto me dan de vuelto?`, r: 10 - p }; },
            () => { const a = R(2, 5); return { t: `En una mesa hay ${a} platos y en cada plato 3 panes. ¿Cuántos panes hay?`, r: 3 * a }; },
            () => { const x = R(2, 9), s = R(x + 1, x + 9); return { t: `Pienso un número. Si le sumo ${s - x}, obtengo ${s}. ¿Qué número pensé?`, r: x }; },
            () => { const a = R(1, 4), d = R(2, 3); const s = [a, a + d, a + 2 * d, a + 3 * d]; return { t: `¿Qué número sigue? ${s.join(", ")}, …`, r: a + 4 * d }; },
            () => { const n = R(2, 4); return { t: `Un cuadrado tiene lados de ${n} cm. ¿Cuánto mide su perímetro?`, r: 4 * n }; }
        ];
        function pregNum(lv) { const q = MKJ.question(lv); return { t: q.text, v: q.visual, r: q.answer, ops: q.options }; }
        const NIV = [
            { n: 1, name: "Nivel 1", desc: "🔥 Reto del día: 5 preguntas", cls: "lv1", n5: true, seg: 30, rondas: 5 },
            { n: 2, name: "Nivel 2", desc: "Números y operaciones (10 preguntas)", cls: "lv2", tipo: "num", seg: 30 },
            { n: 3, name: "Nivel 3", desc: "Simulacro: lógica y problemas (10)", cls: "lv3", tipo: "log", seg: 45 }
        ];
        function racha() { try { return JSON.parse(localStorage.getItem("mk-reto-dia") || '{"d":"","n":0}'); } catch (e) { return { d: "", n: 0 }; } }
        const J = MKP.juego({
            clave: "reto1p", rondas: 10, icono: "🏆", pausa: 1400, niveles: NIV,
            ronda(nv, i, listo) {
                primera = true; clearInterval(reloj);
                listoFn = ok => { clearInterval(reloj); if (nv.n5 && i === 4) guardarRacha(); listo(ok); };
                const q = nv.n5 ? (i % 2 ? P(LOGICA)() : pregNum(R(2, 5))) : nv.tipo === "num" ? pregNum(R(3, 7)) : P(LOGICA)();
                resp = q.r;
                const ops = q.ops ? (q.ops.length > 3 ? MKJ.shuffle([q.r, ...MKJ.shuffle(q.ops.filter(o => o !== q.r)).slice(0, 2)]) : q.ops) : MKJ.shuffle([...new Set([q.r, q.r + 1, q.r - 1 >= 0 ? q.r - 1 : q.r + 2, q.r + 2])].slice(0, 3));
                if (!ops.includes(q.r)) ops[0] = q.r;
                const r0 = racha();
                document.getElementById("card").innerHTML = `${nv.n5 ? `<p class="racha">🔥 Racha: ${r0.n} día${r0.n === 1 ? "" : "s"} · Pregunta ${i + 1} de 5</p>` : ""}
                    <div class="barra-t"><i id="bt" style="width:100%"></i></div>
                    <p class="task">${q.t} <button class="again" id="oir" type="button">🔊</button></p>${q.v ? `<div class="q-vis">${q.v}</div>` : ""}
                    <div class="answers">${ops.map(o => `<button class="answer${typeof o === "string" ? " txt" : ""}" type="button">${o}</button>`).join("")}</div>`;
                document.querySelectorAll(".answer").forEach(b => b.onclick = () => {
                    if (b.dataset.done) return;
                    if (b.textContent === String(resp)) { document.querySelectorAll(".answer").forEach(x => x.dataset.done = 1); b.classList.add("right"); MKJ.sound("ok"); listoFn(primera); }
                    else { primera = false; b.classList.add("wrong"); MKJ.sound("error"); }
                });
                let s = nv.seg; requestAnimationFrame(() => { const bt = document.getElementById("bt"); if (bt) bt.style.width = "100%"; });
                reloj = setInterval(() => { s--; const bt = document.getElementById("bt"); if (!bt) { clearInterval(reloj); return; } bt.style.width = (100 * s / nv.seg) + "%"; if (s <= 0) { clearInterval(reloj); primera = false; MKP.decir("¡Se acabó el tiempo!"); } }, 1000);
                const voz = q.t.replace("−", "menos").replace("+", "más").replace("= ?", "");
                document.getElementById("oir").onclick = () => MKP.decir(voz); MKP.decir(voz);
            }
        });
        function guardarRacha() {
            const hoy = new Date().toISOString().slice(0, 10), ayer = new Date(Date.now() - 864e5).toISOString().slice(0, 10), r = racha();
            if (r.d === hoy) return;
            const n = r.d === ayer ? r.n + 1 : 1;
            try { localStorage.setItem("mk-reto-dia", JSON.stringify({ d: hoy, n })); } catch (e) { }
            MKP.aviso("🔥 Racha: " + n, true);
        }
        window.__juego = { get resp() { return resp; } };
