        /* 🔤 ANALOGÍAS Y OPERADORES: descubre la regla. 2 → 4, 3 → 6, 5 → ? · a ★ b = a + b + 1. Temas 41–43. */
        const R = MKJ.rnd, P = MKJ.pick;
        let resp = 0, primera = true, listoFn = null;
        const REGLAS1 = [["+1", x => x + 1], ["+2", x => x + 2], ["+3", x => x + 3], ["−1", x => x - 1], ["+10", x => x + 10]];
        const REGLAS2 = [["el doble", x => 2 * x], ["el doble más 1", x => 2 * x + 1], ["+5", x => x + 5], ["−2", x => x - 2], ["×3", x => 3 * x], ["+ sí mismo y −1", x => 2 * x - 1]];
        const OPS = [["a ★ b = a + b + 1", (a, b) => a + b + 1], ["a ■ b = a + a + b", (a, b) => 2 * a + b], ["a ▲ b = a × b", (a, b) => a * b], ["a ● b = a + b − 2", (a, b) => a + b - 2], ["a ♦ b = a × 2 − b", (a, b) => 2 * a - b]];
        const NIV = [
            { n: 1, name: "Nivel 1", desc: "Descubre la regla: 2 → 3, 5 → 6", cls: "lv1", reglas: REGLAS1 },
            { n: 2, name: "Nivel 2", desc: "Reglas difíciles: el doble, ×3…", cls: "lv2", reglas: REGLAS2 },
            { n: 3, name: "Nivel 3", desc: "Operadores especiales ★ ■ ▲", cls: "lv3", ops: true }
        ];
        MKP.juego({
            clave: "analogias1p", rondas: 6, icono: "🔤", niveles: NIV,
            ronda(nv, i, listo) {
                primera = true; listoFn = listo;
                let html, t;
                if (nv.ops) {
                    const [txt, f] = P(OPS), a = R(2, 6), b = R(1, Math.min(a, 5)), e1 = [R(1, 5), R(1, 4)];
                    resp = f(a, b);
                    const s = txt[2];
                    html = `<p class="task">Descubre el operador <button class="again" id="oir" type="button">🔊</button></p><div class="op">${txt}</div>
                        <div class="filas"><div class="fila"><span>${e1[0]} ${s} ${e1[1]}</span><span class="fl">=</span><span>${f(e1[0], e1[1])}</span></div><div class="fila preg"><span>${a} ${s} ${b}</span><span class="fl">=</span><span>?</span></div></div>`;
                    t = `Mira la regla del operador. ¿Cuánto es ${a} ${s === "★" ? "estrella" : s === "■" ? "cuadrado" : s === "▲" ? "triángulo" : s === "●" ? "círculo" : "rombo"} ${b}?`;
                } else {
                    const [nom, f] = P(nv.reglas), xs = MKJ.shuffle([2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3);
                    resp = f(xs[2]);
                    html = `<p class="task">¿Qué número sigue la regla? <button class="again" id="oir" type="button">🔊</button></p>
                        <div class="filas">${xs.map((x, k) => `<div class="fila${k === 2 ? " preg" : ""}"><span>${x}</span><span class="fl">➡️</span><span>${k === 2 ? "?" : f(x)}</span></div>`).join("")}</div>`;
                    t = `${xs[0]} se convierte en ${f(xs[0])}, ${xs[1]} en ${f(xs[1])}. ¿${xs[2]} en cuánto?`;
                }
                const opts = MKJ.shuffle([...new Set([resp, resp + 1, resp - 1, resp + 2])].slice(0, 3));
                document.getElementById("card").innerHTML = html + `<div class="answers">${opts.map(o => `<button class="answer" type="button">${o}</button>`).join("")}</div>`;
                document.querySelectorAll(".answer").forEach(b => b.onclick = () => {
                    if (b.dataset.done) return;
                    if (+b.textContent === resp) { document.querySelectorAll(".answer").forEach(x => x.dataset.done = 1); b.classList.add("right"); MKJ.sound("ok"); MKP.decir("¡Muy bien! Es " + resp); listoFn(primera); }
                    else { primera = false; b.classList.add("wrong"); MKJ.sound("error"); MKP.decir("Mira qué le pasa al primer número"); }
                });
                document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t);
            }
        });
        window.__juego = { get resp() { return resp; } };
