        /* 🍪 ¿DÓNDE HAY MÁS?: comparar cantidades (más / menos). */
        const R = MKJ.rnd, P = MKJ.pick;
        let cant = [], pide = "mas", primera = true, hecho = false, listoFn = null;
        MKP.juego({
            clave: "galletas3a", rondas: 8, icono: "🍪",
            niveles: [
                { n: 1, name: "Nivel 1", desc: "¿Dónde hay más? (hasta 5)", cls: "lv1", max: 5, platos: 2, menos: false },
                { n: 2, name: "Nivel 2", desc: "Más y menos (hasta 6)", cls: "lv2", max: 6, platos: 2, menos: true },
                { n: 3, name: "Nivel 3", desc: "3 platos, más y menos (hasta 10)", cls: "lv3", max: 10, platos: 3, menos: true }
            ],
            niveles5: [
                { n: 1, name: "Nivel 1", desc: "¿Qué número es mayor o menor? (hasta 100)", cls: "lv1", max: 100, platos: 3, menos: true, num: true },
                { n: 2, name: "Nivel 2", desc: "Cocodrilo hasta 100", cls: "lv2", max: 100, signo: true },
                { n: 3, name: "Nivel 3", desc: "Cocodrilo con sumas: 3 + 4 ▢ 6", cls: "lv3", max: 10, signo: true, ops: true }
            ],
            niveles4: [
                { n: 1, name: "Nivel 1", desc: "3 platos, más y menos (hasta 10)", cls: "lv1", max: 10, platos: 3, menos: true },
                { n: 2, name: "Nivel 2", desc: "¿Qué número es mayor o menor? (hasta 20)", cls: "lv2", max: 20, platos: 3, menos: true, num: true },
                { n: 3, name: "Nivel 3", desc: "El cocodrilo: >, < e =", cls: "lv3", max: 20, signo: true }
            ],
            ronda(nv, i, listo) {
                primera = true; hecho = false; listoFn = listo;
                if (nv.signo) { cocodrilo(nv, i); return; }
                pide = nv.menos && i % 2 ? "menos" : "mas";
                do { cant = Array.from({ length: nv.platos }, () => R(1, nv.max)); } while (new Set(cant).size < nv.platos || (nv.n === 1 && Math.abs(cant[0] - cant[1]) < 2));
                const e = P(["🍪", "🍩", "🧁", "🍬", "🍓"]);
                document.getElementById("card").innerHTML = `<p class="task">${nv.num ? `¿Qué número es <span class="big">${pide === "mas" ? "MAYOR" : "MENOR"}</span>?` : `¿Dónde hay <span class="big">${pide === "mas" ? "MÁS" : "MENOS"}</span> ${e}?`} <button class="again" id="oir" type="button">🔊</button></p>
                    <div class="plates" style="--n:${nv.platos}">${cant.map((c, k) => `<button class="plate" data-k="${k}" type="button">${nv.num ? `<span class="numgr">${c}</span>` : e.repeat(c)}</button>`).join("")}</div>
                    <div class="cnts" id="cnts" style="--n:${nv.platos}"></div>`;
                document.querySelectorAll(".plate").forEach(p => p.onclick = () => elegir(p));
                const t = nv.num ? `¿Qué número es ${pide === "mas" ? "mayor" : "menor"}?` : `¿Dónde hay ${pide === "mas" ? "más" : "menos"}?`;
                document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t);
            }
        });
        /* 🐊 El cocodrilo siempre abre la boca hacia el número más grande */
        let sig = "";
        function cocodrilo(nv, i) {
            let a = R(1, nv.max), b = i % 3 === 2 ? a : R(1, nv.max), izq = String(a);
            if (nv.ops) { const x = R(1, a > 1 ? a - 1 : 1); izq = a > 1 ? `${x} + ${a - x}` : "1 + 0"; if (a < 2) a = 1; b = i % 3 === 2 ? a : R(Math.max(1, a - 2), a + 2); }
            sig = a > b ? ">" : a < b ? "<" : "=";
            document.getElementById("card").innerHTML = `<p class="task">¿Qué pone el cocodrilo? 🐊 <button class="again" id="oir" type="button">🔊</button></p>
                <p class="sub">La boca del cocodrilo se abre hacia el número más grande. Si son iguales, pon =.</p>
                <div class="comp"><span class="nb"${nv.ops ? ' style="font-size:34px"' : ""}>${izq}</span><span class="hueco" id="hueco">?</span><span class="nb">${b}</span></div>
                <div class="signos">${[">", "<", "="].map(x => `<button class="plate sg" data-s="${x}" type="button">${x}</button>`).join("")}</div>`;
            document.querySelectorAll(".sg").forEach(bt => bt.onclick = () => {
                if (hecho) return;
                if (bt.dataset.s === sig) {
                    hecho = true; bt.classList.add("bien"); document.getElementById("hueco").textContent = sig;
                    MKJ.sound("ok"); MKP.aviso("¡Ñam!", true);
                    MKP.decir(sig === "=" ? `${izq} es igual a ${b}` : sig === ">" ? `${izq} es mayor que ${b}` : `${izq} es menor que ${b}`); listoFn(primera);
                } else { primera = false; bt.classList.remove("mal"); void bt.offsetWidth; bt.classList.add("mal"); MKJ.sound("error"); MKP.decir("¿Cuál número es más grande?"); }
            });
            const t = `¿Qué es más grande, ${izq} o ${b}?`;
            document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t);
        }
        function elegir(p) {
            if (hecho) return;
            const k = +p.dataset.k, mejor = pide === "mas" ? Math.max(...cant) : Math.min(...cant);
            if (cant[k] === mejor) {
                hecho = true; p.classList.add("bien");
                document.getElementById("cnts").innerHTML = cant.map(c => `<span>${c}</span>`).join("");
                MKJ.sound("ok"); MKP.aviso("¡Sí!", true);
                MKP.decir(`¡Muy bien! Aquí hay ${MKP.NUM[cant[k]]}, ${pide === "mas" ? "es más" : "es menos"}`); listoFn(primera);
            } else {
                primera = false; p.classList.remove("mal"); void p.offsetWidth; p.classList.add("mal");
                MKJ.sound("error"); MKP.decir("Cuenta otra vez");
            }
        }
        window.__juego = { get cant() { return cant; }, get pide() { return pide; } };
