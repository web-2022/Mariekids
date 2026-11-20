        /* 🔷 CLASIFICA FIGURAS: geometría. Arrastra cada figura a su caja. */
        const R = MKJ.rnd, P = MKJ.pick;
        const COL = ["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#a855f7", "#f97316"];
        const FIG = {
            circulo: ["círculo", c => `<circle cx="50" cy="50" r="40" fill="${c}"/>`],
            cuadrado: ["cuadrado", c => `<rect x="12" y="12" width="76" height="76" fill="${c}"/>`],
            triangulo: ["triángulo", c => `<polygon points="50,8 92,88 8,88" fill="${c}"/>`],
            rectangulo: ["rectángulo", c => `<rect x="4" y="26" width="92" height="48" fill="${c}"/>`],
            estrella: ["estrella", c => `<polygon points="50,5 61,38 96,38 68,58 79,92 50,72 21,92 32,58 4,38 39,38" fill="${c}"/>`],
            corazon: ["corazón", c => `<path d="M50 88 C10 60 4 34 22 20 C36 10 48 18 50 28 C52 18 64 10 78 20 C96 34 90 60 50 88Z" fill="${c}"/>`]
        };
        const svg = (f, c) => `<svg viewBox="0 0 100 100" aria-hidden="true">${FIG[f][1](c)}</svg>`;
        let quedan = 0, primera = true, listoFn = null;
        MKP.juego({
            clave: "figuras3a", rondas: 4, icono: "🔷",
            niveles: [
                { n: 1, name: "Nivel 1", desc: "Círculo, cuadrado y triángulo", cls: "lv1", f: ["circulo", "cuadrado", "triangulo"], k: 6 },
                { n: 2, name: "Nivel 2", desc: "Más el rectángulo", cls: "lv2", f: ["circulo", "cuadrado", "triangulo", "rectangulo"], k: 7 },
                { n: 3, name: "Nivel 3", desc: "Más estrella y corazón", cls: "lv3", f: ["circulo", "cuadrado", "triangulo", "rectangulo", "estrella", "corazon"], k: 8 }
            ],
            ronda(nv, i, listo) {
                primera = true; listoFn = listo;
                const piezas = nv.f.concat(Array.from({ length: nv.k - nv.f.length }, () => P(nv.f)));
                quedan = piezas.length;
                document.getElementById("card").innerHTML = `<p class="task">Guarda cada figura en su caja <button class="again" id="oir" type="button">🔊</button></p>
                    <div class="cajas">${nv.f.map(f => `<div class="caja" data-drop="caja" data-f="${f}">${svg(f, "#94a3b8")}<span class="rot">${FIG[f][0]}</span><div class="dentro"></div></div>`).join("").replace(/<svg /g, '<svg style="width:40px;height:40px" ')}</div>
                    <div class="mesa">${MKJ.shuffle(piezas).map(f => `<div class="fig" data-f="${f}" style="transform:scale(${(.75 + Math.random() * .35).toFixed(2)}) rotate(${f === "circulo" ? 0 : R(-20, 20)}deg)">${svg(f, P(COL))}</div>`).join("")}</div>`;
                document.querySelectorAll(".fig").forEach(g => MKP.arrastrar(g, { alTocar: () => MKP.decir(FIG[g.dataset.f][0]), alSoltar: c => guardar(g, c) }));
                const txt = "Guarda cada figura en su caja";
                document.getElementById("oir").onclick = () => MKP.decir(txt); MKP.decir(txt);
            }
        });
        function guardar(g, c) {
            const f = g.dataset.f;
            if (c.dataset.f !== f) {
                primera = false; MKJ.sound("error"); g.classList.remove("mal"); void g.offsetWidth; g.classList.add("mal");
                MKP.decir("Eso es un " + FIG[f][0].replace("estrella", "una estrella")); return false;
            }
            const s = g.querySelector("svg").cloneNode(true); c.querySelector(".dentro").appendChild(s); g.remove();
            MKJ.sound("moneda"); MKP.decir(FIG[f][0]); quedan--;
            if (quedan === 0) { MKJ.sound("ok"); MKP.aviso("¡Ordenado!", true); MKP.decir("¡Muy bien! Todo está ordenado"); listoFn(primera); }
            return true;
        }
