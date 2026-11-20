        /* 🐛 GUSANO DE PATRONES: lógica. Completa el patrón arrastrando la bolita que sigue. */
        const P = MKJ.pick;
        const PIEZAS = [["#ef4444", ""], ["#3b82f6", ""], ["#eab308", ""], ["#22c55e", ""], ["#a855f7", ""]];
        const CON = ["⭐", "❤️", "🌙"];
        let serie = [], huecos = [], sig = 0, primera = true, listoFn = null, juegos = [];
        MKP.juego({
            clave: "gusano3a", rondas: 6, icono: "🐛",
            niveles: [
                { n: 1, name: "Nivel 1", desc: "Patrón de 2 colores: 🔴🔵🔴🔵", cls: "lv1", pats: ["AB"], vacios: 1 },
                { n: 2, name: "Nivel 2", desc: "Patrones AAB, ABB y ABC", cls: "lv2", pats: ["AAB", "ABB", "ABC", "AB"], vacios: 1 },
                { n: 3, name: "Nivel 3", desc: "Patrones largos, 2 que faltan", cls: "lv3", pats: ["AABB", "ABC", "ABBC", "AAB"], vacios: 2 }
            ],
            ronda(nv, i, listo) {
                primera = true; listoFn = listo; sig = 0;
                const pat = P(nv.pats), letras = [...new Set(pat)];
                const cols = MKJ.shuffle(PIEZAS.slice()).slice(0, letras.length);
                const usaIcono = nv.n === 3 && Math.random() < .5;
                const pieza = l => { const k = letras.indexOf(l); return { c: cols[k][0], t: usaIcono ? CON[k % 3] : "", id: l }; };
                const largo = Math.max(7, pat.length * 2 + nv.vacios);
                serie = Array.from({ length: largo }, (_, k) => pieza(pat[k % pat.length]));
                huecos = Array.from({ length: nv.vacios }, (_, k) => largo - nv.vacios + k);
                const opc = letras.map(pieza);
                const bol = (p, extra) => `<span class="bolita ${extra || ""}" data-id="${p.id}" style="background:${p.c}">${p.t}</span>`;
                document.getElementById("card").innerHTML = `<p class="task">¿Qué sigue en el gusano? <button class="again" id="oir" type="button">🔊</button></p>
                    <p class="sub">Mira el patrón y arrastra la bolita que falta.</p>
                    <div class="gusano">${serie.map((p, k) => huecos.includes(k) ? `<span class="bolita hueco" data-drop="hueco" data-k="${k}"></span>` : bol(p)).join("")}<span class="cabeza">🐛</span></div>
                    <div class="opciones">${MKJ.shuffle(opc.slice()).map(p => bol(p)).join("")}</div>`;
                document.querySelectorAll(".opciones .bolita").forEach(b => MKP.arrastrar(b, { alSoltar: h => poner(b, h) }));
                document.getElementById("oir").onclick = () => MKP.decir("¿Qué sigue en el gusano?"); MKP.decir("¿Qué sigue en el gusano?");
            }
        });
        function poner(b, h) {
            const k = +h.dataset.k;
            if (!h.classList.contains("hueco") || k !== huecos[sig]) { MKJ.sound("error"); MKP.decir("Primero llena el primer espacio"); return false; }
            if (serie[k].id !== b.dataset.id) {
                primera = false; MKJ.sound("error"); b.classList.remove("mal"); void b.offsetWidth; b.classList.add("mal"); MKP.decir("Mira el patrón otra vez"); return false;
            }
            h.className = "bolita"; h.style.background = serie[k].c; h.textContent = serie[k].t; h.removeAttribute("data-drop");
            MKJ.sound("moneda"); sig++;
            if (sig === huecos.length) { MKJ.sound("ok"); MKP.aviso("¡Bien!", true); MKP.decir("¡Muy bien! El gusano está completo"); listoFn(primera); }
            return false;   // la bolita de opciones vuelve (se puede reutilizar)
        }
        window.__juego = { get serie() { return serie; }, get huecos() { return huecos; } };
