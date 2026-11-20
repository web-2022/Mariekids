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
            ronda(nv, i, listo) {
                primera = true; hecho = false; listoFn = listo;
                pide = nv.menos && i % 2 ? "menos" : "mas";
                do { cant = Array.from({ length: nv.platos }, () => R(1, nv.max)); } while (new Set(cant).size < nv.platos || (nv.n === 1 && Math.abs(cant[0] - cant[1]) < 2));
                const e = P(["🍪", "🍩", "🧁", "🍬", "🍓"]);
                document.getElementById("card").innerHTML = `<p class="task">¿Dónde hay <span class="big">${pide === "mas" ? "MÁS" : "MENOS"}</span> ${e}? <button class="again" id="oir" type="button">🔊</button></p>
                    <div class="plates" style="--n:${nv.platos}">${cant.map((c, k) => `<button class="plate" data-k="${k}" type="button">${e.repeat(c)}</button>`).join("")}</div>
                    <div class="cnts" id="cnts" style="--n:${nv.platos}"></div>`;
                document.querySelectorAll(".plate").forEach(p => p.onclick = () => elegir(p));
                const t = `¿Dónde hay ${pide === "mas" ? "más" : "menos"}?`;
                document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t);
            }
        });
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
