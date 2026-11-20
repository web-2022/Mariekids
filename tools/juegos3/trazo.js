        /* ✏️ UN SOLO TRAZO: dibuja la figura sin levantar el dedo y sin repetir líneas. Tema 68. */
        // [nombre, vértices [[x,y]], aristas [[a,b]]] en un lienzo 300×300
        const FIG = [
            ["Triángulo", [[150, 40], [260, 240], [40, 240]], [[0, 1], [1, 2], [2, 0]], 1],
            ["Cuadrado", [[60, 60], [240, 60], [240, 240], [60, 240]], [[0, 1], [1, 2], [2, 3], [3, 0]], 1],
            ["Zeta", [[50, 60], [250, 60], [50, 240], [250, 240]], [[0, 1], [1, 2], [2, 3]], 1],
            ["Casita", [[70, 130], [230, 130], [230, 270], [70, 270], [150, 30]], [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [1, 4]], 2],
            ["Sobre", [[60, 70], [240, 70], [240, 230], [60, 230]], [[0, 1], [1, 2], [2, 3], [3, 0], [0, 2]], 2],
            ["Pez", [[40, 150], [120, 80], [220, 150], [120, 220], [280, 90], [280, 210]], [[0, 1], [1, 2], [2, 3], [3, 0], [2, 4], [4, 5], [5, 2]], 2],
            ["Casita mágica", [[70, 130], [230, 130], [230, 270], [70, 270], [150, 30]], [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [1, 4], [0, 2], [1, 3]], 3],
            ["Estrella", [[150, 20], [230, 270], [30, 110], [270, 110], [70, 270]], [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]], 3],
            ["Moño", [[40, 60], [40, 240], [150, 150], [260, 60], [260, 240]], [[0, 1], [1, 2], [2, 0], [2, 3], [3, 4], [4, 2]], 3]
        ];
        let fig = null, usadas = new Set(), act = -1, primera = true, listoFn = null, orden = [];
        const NIV = [
            { n: 1, name: "Nivel 1", desc: "Figuras sencillas", cls: "lv1", d: 1 },
            { n: 2, name: "Nivel 2", desc: "Casita, sobre y pez", cls: "lv2", d: 2 },
            { n: 3, name: "Nivel 3", desc: "Retos: estrella, moño y casita mágica", cls: "lv3", d: 3 }
        ];
        MKP.juego({
            clave: "trazo1p", rondas: 3, icono: "✏️", pausa: 2000, niveles: NIV,
            ronda(nv, i, listo) {
                primera = true; listoFn = listo;
                if (i === 0) orden = MKJ.shuffle(FIG.filter(f => f[3] === nv.d));
                fig = orden[i % orden.length]; reiniciar();
                const t = `Dibuja ${fig[0].toLowerCase()} de un solo trazo: sin levantar el dedo y sin pasar dos veces por la misma línea`;
                MKP.decir(t);
            }
        });
        function reiniciar() { usadas = new Set(); act = -1; pintar(); }
        function pintar(msg) {
            const [nom, V, E] = fig;
            document.getElementById("card").innerHTML = `<p class="task">Dibuja: <span class="big">${nom}</span></p>
                <p class="sub">${msg || "Pon el dedo en un punto y pasa por todas las líneas sin repetir."}</p>
                <div class="lienzo" id="lz"><svg viewBox="0 0 300 300">${E.map(([a, b], j) => `<line class="e${usadas.has(j) ? " us" : ""}" x1="${V[a][0]}" y1="${V[a][1]}" x2="${V[b][0]}" y2="${V[b][1]}"/>`).join("")}${V.map((p, j) => `<circle class="v${j === act ? " act" : ""}" data-v="${j}" cx="${p[0]}" cy="${p[1]}" r="17"/>`).join("")}</svg></div>
                <div class="tools"><button class="big-btn alt" id="otra" type="button">↩ Empezar de nuevo</button></div>`;
            document.getElementById("otra").onclick = () => { reiniciar(); MKJ.sound("salto"); };
            const lz = document.getElementById("lz");
            let abajo = false;
            const vertice = e => { const el = document.elementFromPoint(e.clientX, e.clientY); return el && el.dataset && el.dataset.v !== undefined ? +el.dataset.v : null; };
            lz.addEventListener("pointerdown", e => { abajo = true; const v = vertice(e); if (v !== null) tocar(v); });
            lz.addEventListener("pointermove", e => { if (!abajo) return; const v = vertice(e); if (v !== null && v !== act) tocar(v); });
            window.onpointerup = () => { abajo = false; };
        }
        function tocar(v) {
            const E = fig[2];
            if (act === -1) { act = v; MKJ.sound("salto"); actualizar(); return; }
            const j = E.findIndex(([a, b], k) => !usadas.has(k) && ((a === act && b === v) || (b === act && a === v)));
            if (j < 0) {
                const ya = E.findIndex(([a, b], k) => usadas.has(k) && ((a === act && b === v) || (b === act && a === v)));
                if (ya >= 0) { primera = false; MKJ.sound("error"); MKP.decir("Esa línea ya la dibujaste"); }
                return;
            }
            usadas.add(j); act = v; MKJ.sound("moneda"); actualizar();
            if (usadas.size === E.length) { MKJ.sound("ok"); MKP.aviso("¡Un solo trazo!", true); MKP.decir("¡Muy bien! Lo dibujaste de un solo trazo"); listoFn(primera); return; }
            const quedan = E.some(([a, b], k) => !usadas.has(k) && (a === act || b === act));
            if (!quedan) { primera = false; MKJ.sound("error"); MKP.decir("Te quedaste sin camino. Empieza de nuevo desde otro punto"); setTimeout(() => { reiniciar(); }, 1300); }
        }
        function actualizar() {
            document.querySelectorAll(".lienzo .e").forEach((l, j) => l.classList.toggle("us", usadas.has(j)));
            document.querySelectorAll(".lienzo .v").forEach((c, j) => c.classList.toggle("act", j === act));
        }
        window.__juego = { get fig() { return fig; }, tocar, reiniciar };
