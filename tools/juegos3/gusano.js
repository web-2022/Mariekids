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
            niveles6: [
                { n: 1, name: "Nivel 1", desc: "Series de 2, 5 y 10 grandes", cls: "lv1", serie: true, vacios: 2, pasos: [[24, 2], [35, 5], [40, 10], [100, 10], [65, 5]] },
                { n: 2, name: "Nivel 2", desc: "Hacia atrás y de 3 en 3", cls: "lv2", serie: true, vacios: 2, pasos: [[90, -10], [50, -5], [30, -3], [3, 3], [21, -2]] },
                { n: 3, name: "Nivel 3", desc: "Series de letras: A, C, E…", cls: "lv3", serie: true, vacios: 2, letras: true, pasos: [[0, 2], [1, 2], [0, 3], [25, -1], [2, 1]] }
            ],
            niveles5: [
                { n: 1, name: "Nivel 1", desc: "Cuenta de 2 en 2, de 5 en 5 y de 10 en 10", cls: "lv1", serie: true, vacios: 2, pasos: [[0, 2], [2, 2], [0, 5], [5, 5], [0, 10], [10, 10]] },
                { n: 2, name: "Nivel 2", desc: "Series hacia atrás", cls: "lv2", serie: true, vacios: 2, pasos: [[20, -2], [30, -5], [100, -10], [15, -1], [50, -5]] },
                { n: 3, name: "Nivel 3", desc: "Series grandes", cls: "lv3", serie: true, vacios: 2, pasos: [[23, 2], [35, 5], [40, 10], [61, 1], [90, -10], [45, -5], [11, 3]] }
            ],
            niveles4: [
                { n: 1, name: "Nivel 1", desc: "Patrones ABC y AABC, 2 que faltan", cls: "lv1", pats: ["ABC", "AABC", "ABCC", "AABB"], vacios: 2 },
                { n: 2, name: "Nivel 2", desc: "Patrones de números: 1 2 1 2", cls: "lv2", pats: ["AB", "ABC", "AAB", "ABB"], vacios: 2, numeros: true },
                { n: 3, name: "Nivel 3", desc: "Series: 2, 4, 6… y 10, 9, 8…", cls: "lv3", serie: true, vacios: 2 }
            ],
            ronda(nv, i, listo) {
                primera = true; listoFn = listo; sig = 0;
                let opc;
                if (nv.serie) {
                    const [ini, paso] = P(nv.pasos || [[1, 1], [2, 2], [1, 2], [5, 5], [10, -1], [20, -2], [3, 1], [0, 3]]);
                    const largo = 7;
                    const LT = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ", lab = v => nv.letras ? LT[v] || "?" : String(v);
                    serie = Array.from({ length: largo }, (_, k) => { const v = ini + paso * k; return { c: nv.letras ? "#ddd6fe" : "#fde68a", t: lab(v), id: lab(v) }; });
                    huecos = [largo - 2, largo - 1];
                    const sigv = ini + paso * (largo - 2);
                    opc = [...new Set([sigv, sigv + paso, sigv + paso + 1, sigv - 1, sigv + 2 * paso].filter(v => v >= 0))].slice(0, 4).filter(v => !nv.letras || v < 27).map(v => ({ c: nv.letras ? "#ddd6fe" : "#fde68a", t: lab(v), id: lab(v) }));
                } else {
                const pat = P(nv.pats), letras = [...new Set(pat)];
                const cols = MKJ.shuffle(PIEZAS.slice()).slice(0, letras.length);
                const usaIcono = nv.n === 3 && !nv.numeros && Math.random() < .5;
                const digs = MKJ.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                const pieza = l => { const k = letras.indexOf(l); return { c: nv.numeros ? "#e0f2fe" : cols[k][0], t: nv.numeros ? String(digs[k]) : usaIcono ? CON[k % 3] : "", id: l }; };
                const largo = Math.max(7, pat.length * 2 + nv.vacios);
                serie = Array.from({ length: largo }, (_, k) => pieza(pat[k % pat.length]));
                huecos = Array.from({ length: nv.vacios }, (_, k) => largo - nv.vacios + k);
                opc = letras.map(pieza);
                }
                const bol = (p, extra) => `<span class="bolita ${extra || ""}" data-id="${p.id}" style="background:${p.c}${/^[\dA-ZÑ]/.test(p.t) ? ";color:#1e3a8a;font-family:'Baloo 2',sans-serif;font-weight:800" : ""}">${p.t}</span>`;
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
            h.className = "bolita"; h.style.cssText = b.style.cssText; h.style.opacity = ""; h.style.background = serie[k].c; h.textContent = serie[k].t; h.removeAttribute("data-drop");
            MKJ.sound("moneda"); sig++;
            if (sig === huecos.length) { MKJ.sound("ok"); MKP.aviso("¡Bien!", true); MKP.decir("¡Muy bien! El gusano está completo"); listoFn(primera); }
            return false;   // la bolita de opciones vuelve (se puede reutilizar)
        }
        window.__juego = { get serie() { return serie; }, get huecos() { return huecos; } };
