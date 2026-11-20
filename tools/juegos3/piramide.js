        /* 🧱 PIRÁMIDE DE SUMAS: cada bloque es la suma de los dos de abajo. Temas 44–45. */
        const R = MKJ.rnd;
        let pira = [], huecos = [], sel = null, escrito = "", primera = true, listoFn = null;
        const NIV = [
            { n: 1, name: "Nivel 1", desc: "Pirámide de 2 pisos", cls: "lv1", pisos: 2, base: 9, ocultar: "arriba" },
            { n: 2, name: "Nivel 2", desc: "Pirámide de 3 pisos", cls: "lv2", pisos: 3, base: 8, ocultar: "arriba" },
            { n: 3, name: "Nivel 3", desc: "Faltan números abajo: ¡piensa al revés!", cls: "lv3", pisos: 3, base: 9, ocultar: "mezcla" }
        ];
        MKP.juego({
            clave: "piramide1p", rondas: 5, icono: "🧱", niveles: NIV,
            ronda(nv, i, listo) {
                primera = true; listoFn = listo; sel = null; escrito = "";
                const base = Array.from({ length: nv.pisos }, () => R(1, nv.base));
                pira = [base];
                while (pira[0].length > 1) { const a = pira[0]; pira.unshift(a.slice(1).map((v, k) => a[k] + v)); }
                // pira[0] = cima … pira[n-1] = base
                huecos = [];
                if (nv.ocultar === "arriba") pira.forEach((piso, f) => { if (f < pira.length - 1) piso.forEach((v, c) => huecos.push(f + "-" + c)); });
                else { const k = R(0, 2), j = k === 0 ? 1 : k === 2 ? 0 : R(0, 1); huecos = ["2-" + k, "1-" + j]; }
                document.getElementById("card").innerHTML = `<p class="task">Cada bloque es la suma de los dos de abajo <button class="again" id="oir" type="button">🔊</button></p>
                    <p class="sub">Toca un bloque vacío y escribe el número.</p>
                    <div class="pira">${pira.map((p, f) => `<div class="piso">${p.map((v, c) => huecos.includes(f + "-" + c) ? `<span class="bloq hueco" data-p="${f}-${c}">?</span>` : `<span class="bloq">${v}</span>`).join("")}</div>`).join("")}</div>
                    <div class="teclado">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(n => `<button type="button" data-n="${n}">${n}</button>`).join("")}<button type="button" data-n="b" style="grid-column:span 2">⌫ Borrar</button><button type="button" data-n="ok" style="grid-column:span 3;background:#bbf7d0;box-shadow:0 4px 0 #22c55e">✅ Comprobar</button></div>`;
                document.querySelectorAll(".hueco").forEach(h => h.onclick = () => elegir(h));
                document.querySelectorAll(".teclado button").forEach(b => b.onclick = () => tecla(b.dataset.n));
                elegir(document.querySelector(".hueco"));
                const t = "Cada bloque es la suma de los dos bloques de abajo"; document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t);
            }
        });
        function elegir(h) { if (!h || h.classList.contains("ok")) return; document.querySelectorAll(".hueco").forEach(x => x.classList.remove("sel")); sel = h; escrito = ""; h.classList.add("sel"); }
        function tecla(n) {
            if (!sel) return;
            if (n === "b") { escrito = escrito.slice(0, -1); sel.textContent = escrito || "?"; return; }
            if (n === "ok") {
                const [f, c] = sel.dataset.p.split("-").map(Number);
                if (+escrito === pira[f][c] && escrito !== "") {
                    sel.classList.add("ok"); sel.classList.remove("sel", "hueco"); MKJ.sound("moneda");
                    const sig = document.querySelector(".hueco:not(.ok)");
                    if (!sig) { MKJ.sound("ok"); MKP.aviso("¡Pirámide lista!", true); MKP.decir("¡Muy bien! La pirámide está completa"); listoFn(primera); sel = null; } else elegir(sig);
                } else { primera = false; MKJ.sound("error"); MKP.decir("Revisa: suma los dos de abajo, o resta si te falta uno de abajo"); escrito = ""; sel.textContent = "?"; }
                return;
            }
            if (escrito.length >= 3) return;
            escrito += n; sel.textContent = escrito; MKJ.sound("salto");
        }
        window.__juego = { get pira() { return pira; }, tecla, elegir };
