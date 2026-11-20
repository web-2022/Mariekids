        /* 🧺 LLENA LA CANASTA: cantidad ↔ número. Arrastra frutas a la canasta; cuenta en voz alta. */
        const R = MKJ.rnd, P = MKJ.pick;
        const FRUTAS = ["🍎", "🍊", "🍓", "🍌", "🍐", "🍇", "🥭", "🍑"];
        let meta = 0, dentro = 0, primera = true, fin = false, fruta = "🍎", listoFn = null;
        const J = MKP.juego({
            clave: "canasta3a", rondas: 6, icono: "🧺",
            niveles: [
                { n: 1, name: "Nivel 1", desc: "Pon de 1 a 5 frutas", cls: "lv1", max: 5 },
                { n: 2, name: "Nivel 2", desc: "Pon de 1 a 6 frutas", cls: "lv2", max: 6 },
                { n: 3, name: "Nivel 3", desc: "Pon de 1 a 10 frutas", cls: "lv3", max: 10 }
            ],
            ronda(nv, i, listo) {
                meta = R(nv.max > 5 ? 3 : 1, nv.max); dentro = 0; primera = true; fin = false; fruta = P(FRUTAS); listoFn = listo;
                const enArbol = Math.min(12, nv.max + 2);
                document.getElementById("card").innerHTML = `<p class="task">Pon <span class="big">${meta}</span> ${fruta} en la canasta <button class="again" id="oir" type="button">🔊</button></p>
                    <p class="sub">Arrastra las frutas con el dedo. Si pones de más, toca una fruta de la canasta para sacarla.</p>
                    <div class="tree" id="tree"></div><div class="trunk"></div>
                    <div class="basket" id="basket" data-drop="canasta"><span class="empty">🧺 Canasta</span></div>
                    <div class="cnt" id="cnt">0</div>
                    <div class="tools"><button class="big-btn" id="ok" type="button">✅ ¡Listo!</button></div>`;
                const tree = document.getElementById("tree");
                for (let k = 0; k < enArbol; k++) {
                    const f = document.createElement("div"); f.className = "fruit"; f.textContent = fruta; tree.appendChild(f);
                    MKP.arrastrar(f, { alTocar: () => meter(f), alSoltar: d => { if (d.id === "basket") { meter(f); return true; } return false; } });
                }
                document.getElementById("oir").onclick = decirMeta;
                document.getElementById("ok").onclick = revisar;
                decirMeta();
            }
        });
        function decirMeta() { MKP.decir("Pon " + MKP.NUM[meta] + " frutas en la canasta"); }
        function meter(f) {
            if (fin) return;
            const b = document.getElementById("basket");
            const e = b.querySelector(".empty"); if (e) e.remove();
            f.remove();
            const g = document.createElement("div"); g.className = "fruit"; g.textContent = fruta; b.appendChild(g);
            g.onclick = () => sacar(g);
            dentro++; pintar(); MKJ.sound("moneda"); MKP.contar(dentro);
        }
        function sacar(g) {
            if (fin) return;
            g.remove(); dentro--; pintar(); MKJ.sound("salto");
            const f = document.createElement("div"); f.className = "fruit"; f.textContent = fruta; document.getElementById("tree").appendChild(f);
            MKP.arrastrar(f, { alTocar: () => meter(f), alSoltar: d => { if (d.id === "basket") { meter(f); return true; } return false; } });
        }
        function pintar() { document.getElementById("cnt").textContent = dentro; }
        function revisar() {
            if (fin) return;
            if (dentro === meta) { fin = true; MKJ.sound("ok"); MKP.aviso("¡" + meta + "!", true); MKP.decir("¡Muy bien! Hay " + MKP.NUM[meta] + " frutas"); listoFn(primera); }
            else { primera = false; MKJ.sound("error"); MKP.aviso(dentro < meta ? "¡Faltan!" : "¡Sobran!", false); MKP.decir(dentro < meta ? "Faltan frutas. Hay " + MKP.NUM[dentro] + ". Pon " + MKP.NUM[meta] : "Hay muchas. Saca algunas. Necesitas " + MKP.NUM[meta]); }
        }
        window.__juego = { get meta() { return meta; }, get dentro() { return dentro; }, J };
