        /* 🧺 LLENA LA CANASTA: cantidad ↔ número. Arrastra frutas a la canasta; cuenta en voz alta. */
        const R = MKJ.rnd, P = MKJ.pick;
        const FRUTAS = ["🍎", "🍊", "🍓", "🍌", "🍐", "🍇", "🥭", "🍑"];
        let modo = "pon", a0 = 0, b0 = 0, meta = 0, dentro = 0, primera = true, fin = false, fruta = "🍎", listoFn = null;
        const J = MKP.juego({
            clave: "canasta3a", rondas: 6, icono: "🧺",
            niveles: [
                { n: 1, name: "Nivel 1", desc: "Pon de 1 a 5 frutas", cls: "lv1", max: 5 },
                { n: 2, name: "Nivel 2", desc: "Pon de 1 a 6 frutas", cls: "lv2", max: 6 },
                { n: 3, name: "Nivel 3", desc: "Pon de 1 a 10 frutas", cls: "lv3", max: 10 }
            ],
            niveles6: [
                { n: 1, name: "Nivel 1", desc: "Sumas hasta 20", cls: "lv1", max: 20, modo: "suma" },
                { n: 2, name: "Nivel 2", desc: "Restas hasta 20", cls: "lv2", max: 20, modo: "resta" },
                { n: 3, name: "Nivel 3", desc: "Problemas para escuchar hasta 20", cls: "lv3", max: 20, modo: "oral" }
            ],
            niveles5: [
                { n: 1, name: "Nivel 1", desc: "Sumas hasta 15", cls: "lv1", max: 15, modo: "suma" },
                { n: 2, name: "Nivel 2", desc: "Restas hasta 15", cls: "lv2", max: 15, modo: "resta" },
                { n: 3, name: "Nivel 3", desc: "Problemas: escucha y resuelve", cls: "lv3", max: 15, modo: "oral" }
            ],
            niveles4: [
                { n: 1, name: "Nivel 1", desc: "Pon de 5 a 10 frutas", cls: "lv1", max: 10, modo: "pon" },
                { n: 2, name: "Nivel 2", desc: "Hay unas, pon más: ¡suma!", cls: "lv2", max: 10, modo: "suma" },
                { n: 3, name: "Nivel 3", desc: "Saca algunas: ¡resta!", cls: "lv3", max: 10, modo: "resta" }
            ],
            ronda(nv, i, listo) {
                modo = nv.modo === "oral" ? MKJ.pick(["suma", "resta"]) : nv.modo || "pon"; oral = nv.modo === "oral"; dentro = 0; primera = true; fin = false; fruta = P(FRUTAS); listoFn = listo;
                if (modo === "suma") { a0 = R(1, Math.min(9, nv.max - 1)); b0 = R(1, Math.min(9, nv.max - a0)); meta = a0 + b0; }
                else if (modo === "resta") { a0 = R(4, nv.max); b0 = R(1, a0 - 1); meta = a0 - b0; }
                else meta = R(nv.max > 6 ? 5 : nv.max > 5 ? 3 : 1, nv.max);
                const enArbol = Math.min(12, (modo === "suma" ? b0 : modo === "resta" ? 2 : nv.max) + 2);
                const quien = MKJ.pick(["Ana", "Leo", "Sofía", "Mateo", "la abuela"]);
                historia = modo === "suma" ? `En la canasta había ${a0} frutas. ${quien} trajo ${b0} más. Pon las frutas que trajo.` : `En la canasta había ${a0} frutas. ${quien} se comió ${b0}. Saca las que se comió.`;
                const tarea = oral ? `🔊 Escucha el problema <button class="again" type="button" onclick="MKP.decir(historia)">Repetir</button>` : modo === "suma" ? `Hay <span class="big">${a0}</span> ${fruta}. Pon <span class="big">${b0}</span> más` :
                    modo === "resta" ? `Hay <span class="big">${a0}</span> ${fruta}. Saca <span class="big">${b0}</span>` : `Pon <span class="big">${meta}</span> ${fruta} en la canasta`;
                document.getElementById("card").innerHTML = `<p class="task">${tarea} <button class="again" id="oir" type="button">🔊</button></p>
                    <p class="sub">${modo === "resta" ? "Toca las frutas de la canasta para sacarlas." : "Arrastra las frutas con el dedo. Si pones de más, toca una fruta de la canasta para sacarla."}</p>
                    <div class="tree" id="tree"></div><div class="trunk"></div>
                    <div class="basket" id="basket" data-drop="canasta"><span class="empty">🧺 Canasta</span></div>
                    <div class="cnt" id="cnt">0</div>
                    <div class="tools"><button class="big-btn" id="ok" type="button">✅ ¡Listo!</button></div>`;
                const tree = document.getElementById("tree");
                for (let k = 0; k < enArbol; k++) {
                    const f = document.createElement("div"); f.className = "fruit"; f.textContent = fruta; tree.appendChild(f);
                    MKP.arrastrar(f, { alTocar: () => meter(f), alSoltar: d => { if (d.id === "basket") { meter(f); return true; } return false; } });
                }
                if (modo !== "pon") { for (let k = 0; k < a0; k++) meter(null, true); }
                document.getElementById("oir").onclick = decirMeta;
                document.getElementById("ok").onclick = revisar;
                decirMeta();
            }
        });
        let oral = false, historia = "";
        function decirMeta() {
            if (oral) { MKP.decir(historia); return; }
            MKP.decir(modo === "suma" ? `Hay ${MKP.NUM[a0]} frutas. Pon ${MKP.NUM[b0]} más` : modo === "resta" ? `Hay ${MKP.NUM[a0]} frutas. Saca ${MKP.NUM[b0]}` : "Pon " + MKP.NUM[meta] + " frutas en la canasta");
        }
        function meter(f, callado) {
            if (fin) return;
            const b = document.getElementById("basket");
            const e = b.querySelector(".empty"); if (e) e.remove();
            if (f) f.remove();
            const g = document.createElement("div"); g.className = "fruit"; g.textContent = fruta; b.appendChild(g);
            g.onclick = () => sacar(g);
            dentro++; pintar(); if (callado) return; MKJ.sound("moneda"); MKP.contar(dentro);
        }
        function sacar(g) {
            if (fin) return;
            g.remove(); dentro--; pintar(); MKJ.sound("salto"); if (modo === "resta") MKP.contar(a0 - dentro);
            const f = document.createElement("div"); f.className = "fruit"; f.textContent = fruta; document.getElementById("tree").appendChild(f);
            MKP.arrastrar(f, { alTocar: () => meter(f), alSoltar: d => { if (d.id === "basket") { meter(f); return true; } return false; } });
        }
        function pintar() { document.getElementById("cnt").textContent = dentro; }
        function revisar() {
            if (fin) return;
            if (dentro === meta) { fin = true; MKJ.sound("ok"); MKP.aviso("¡" + meta + "!", true); MKP.decir(modo === "suma" ? `¡Muy bien! ${a0} más ${b0} es ${meta}` : modo === "resta" ? `¡Muy bien! ${a0} menos ${b0} es ${meta}` : "¡Muy bien! Hay " + MKP.NUM[meta] + " frutas");
                if (modo !== "pon") document.getElementById("cnt").textContent = `${a0} ${modo === "suma" ? "+" : "−"} ${b0} = ${meta}`; listoFn(primera); }
            else { primera = false; MKJ.sound("error"); MKP.aviso(dentro < meta ? "¡Faltan!" : "¡Sobran!", false); MKP.decir(dentro < meta ? "Faltan frutas. Hay " + MKP.NUM[dentro] : "Hay muchas. Hay " + MKP.NUM[dentro]); }
        }
        window.__juego = { get meta() { return meta; }, get dentro() { return dentro; }, J };
