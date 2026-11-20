        /* 🧩 ARMA LA FIGURA: geometría. Arrastra cada pieza a su silueta (casa, barco, cohete…). */
        const COL = { cuad: "#3b82f6", tri: "#ef4444", rect: "#22c55e", circ: "#eab308", trap: "#a855f7" };
        // forma: [tipo, x, y, w, h, extra] en un tablero de 300×260
        const SVG = {
            cuad: c => `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><rect width="100" height="100" fill="${c}"/></svg>`,
            rect: c => `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><rect width="100" height="100" fill="${c}"/></svg>`,
            tri: (c, dir) => `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="${dir === "abajo" ? "0,0 100,0 50,100" : dir === "der" ? "0,0 100,50 0,100" : dir === "izq" ? "100,0 0,50 100,100" : "50,0 100,100 0,100"}" fill="${c}"/></svg>`,
            circ: c => `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="${c}"/></svg>`,
            trap: c => `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="0,0 100,0 80,100 20,100" fill="${c}"/></svg>`
        };
        const FIGURAS = [
            ["🏠 Casa", [["tri", 60, 20, 180, 90], ["cuad", 90, 110, 120, 120]]],
            ["⛵ Barco", [["tri", 120, 10, 90, 140, "der"], ["trap", 50, 160, 200, 60]]],
            ["🍦 Helado", [["circ", 100, 20, 100, 100], ["tri", 100, 110, 100, 130, "abajo"]]],
            ["🚀 Cohete", [["tri", 110, 10, 80, 70], ["rect", 110, 80, 80, 130], ["tri", 60, 150, 50, 70, "izq"], ["tri", 190, 150, 50, 70, "der"]]],
            ["🌲 Árbol", [["tri", 70, 10, 160, 90], ["tri", 50, 80, 200, 100], ["rect", 130, 180, 40, 70]]],
            ["🤖 Robot", [["cuad", 110, 10, 80, 70], ["rect", 80, 85, 140, 100], ["rect", 95, 190, 40, 60], ["rect", 165, 190, 40, 60], ["circ", 140, 0, 20, 20]]],
            ["🐱 Gato", [["circ", 90, 40, 120, 120], ["tri", 95, 10, 40, 50], ["tri", 165, 10, 40, 50], ["trap", 85, 165, 130, 80]]],
            ["🚂 Tren", [["rect", 30, 90, 140, 90], ["cuad", 170, 50, 90, 130], ["circ", 50, 180, 50, 50], ["circ", 180, 180, 50, 50], ["rect", 190, 20, 30, 30]]]
        ];
        let puestas = 0, total = 0, primera = true, listoFn = null, orden = [];
        const NIV = [
            { n: 1, name: "Nivel 1", desc: "Figuras de 2 piezas", cls: "lv1", pz: [2, 2] },
            { n: 2, name: "Nivel 2", desc: "Figuras de 3 y 4 piezas", cls: "lv2", pz: [3, 4] },
            { n: 3, name: "Nivel 3", desc: "Figuras de 4 y 5 piezas", cls: "lv3", pz: [4, 5] }
        ];
        MKP.juego({
            clave: "tangram", rondas: 3, icono: "🧩", pausa: 2400, niveles: NIV, niveles4: NIV, niveles5: NIV,
            ronda(nv, i, listo) {
                primera = true; listoFn = listo; puestas = 0;
                if (i === 0) orden = MKJ.shuffle(FIGURAS.filter(f => f[1].length >= nv.pz[0] && f[1].length <= nv.pz[1]));
                const [nombre, partes] = orden[i % orden.length];
                total = partes.length;
                document.getElementById("card").innerHTML = `<p class="task">Arma: <span class="nombre">${nombre}</span> <button class="again" id="oir" type="button">🔊</button></p>
                    <p class="sub">Arrastra cada pieza a su silueta.</p>
                    <div class="tablero">${partes.map((p, k) => `<div class="hueco ${p[0] === "tri" ? "tri" : ""}" data-drop="hueco" data-k="${k}" data-t="${p[0]}${p[5] ? "-" + p[5] : ""}" style="left:${p[1]}px;top:${p[2]}px;width:${p[3]}px;height:${p[4]}px;${p[0] === "circ" ? "border-radius:50%;" : ""}">${p[0] === "tri" ? SVG.tri("#e2e8f0", p[5]).replace("<polygon", '<polygon stroke="#94a3b8" stroke-width="3" stroke-dasharray="8 6" vector-effect="non-scaling-stroke"') : ""}</div>`).join("")}</div>
                    <div class="piezas">${MKJ.shuffle(partes.map((p, k) => ({ p, k }))).map(({ p }) => `<div class="pieza" data-t="${p[0]}${p[5] ? "-" + p[5] : ""}" style="width:${Math.round(p[3] * .55)}px;height:${Math.round(p[4] * .55)}px">${SVG[p[0]](COL[p[0]], p[5])}</div>`).join("")}</div>`;
                document.querySelectorAll(".pieza").forEach(pz => MKP.arrastrar(pz, { alSoltar: h => poner(pz, h, partes) }));
                const t = "Arma " + nombre.slice(nombre.indexOf(" ") + 1) + " con las piezas";
                document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t);
            }
        });
        function poner(pz, h, partes) {
            if (h.classList.contains("lleno")) return false;
            if (h.dataset.t !== pz.dataset.t) { primera = false; MKJ.sound("error"); pz.classList.remove("mal"); void pz.offsetWidth; pz.classList.add("mal"); MKP.decir("Esa pieza no tiene esa forma"); return false; }
            const p = partes[+h.dataset.k];
            h.classList.add("lleno"); h.innerHTML = SVG[p[0]](COL[p[0]], p[5]); h.style.border = "0"; h.style.background = "none";
            pz.remove(); MKJ.sound("moneda"); puestas++;
            if (puestas === total) { MKJ.sound("ok"); MKP.aviso("¡Lo armaste!", true); MKP.decir("¡Muy bien! Lo armaste"); listoFn(primera); }
            return true;
        }
