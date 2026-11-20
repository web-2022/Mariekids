        /* 🐸 LA RANA SALTARINA: recta numérica, contar saltos (base de la suma y la resta).
           Toca la rana (o las flechas) para saltar, o arrástrala a una hoja. */
        const R = MKJ.rnd;
        let pos = 0, inicio = 0, meta = 0, saltos = 0, dir = 1, max = 5, primera = true, fin = false, listoFn = null;
        const J = MKP.juego({
            clave: "rana3a", rondas: 6, icono: "🐸",
            niveles: [
                { n: 1, name: "Nivel 1", desc: "Salta hacia adelante hasta el 5", cls: "lv1", max: 5, s: 2, atras: false },
                { n: 2, name: "Nivel 2", desc: "Salta hacia adelante hasta el 6", cls: "lv2", max: 6, s: 3, atras: false },
                { n: 3, name: "Nivel 3", desc: "Adelante y atrás hasta el 10", cls: "lv3", max: 10, s: 4, atras: true }
            ],
            niveles5: [
                { n: 1, name: "Nivel 1", desc: "Sumas hasta 15", cls: "lv1", max: 15, s: 7, atras: false },
                { n: 2, name: "Nivel 2", desc: "Sumas y restas hasta 15", cls: "lv2", max: 15, s: 7, atras: true },
                { n: 3, name: "Nivel 3", desc: "Sumas y restas grandes hasta 15", cls: "lv3", max: 15, s: 9, atras: true, min: 4 }
            ],
            niveles4: [
                { n: 1, name: "Nivel 1", desc: "Sumas saltando hasta el 10", cls: "lv1", max: 10, s: 5, atras: false },
                { n: 2, name: "Nivel 2", desc: "Sumas y restas hasta el 10", cls: "lv2", max: 10, s: 5, atras: true },
                { n: 3, name: "Nivel 3", desc: "Sumas y restas hasta el 12", cls: "lv3", max: 12, s: 6, atras: true }
            ],
            ronda(nv, i, listo) {
                max = nv.max; primera = true; fin = false; listoFn = listo;
                dir = nv.atras && i % 2 === 1 ? -1 : 1;
                saltos = R(nv.min || 1, nv.s);
                inicio = dir > 0 ? R(0, max - saltos) : R(saltos, max);
                meta = inicio + dir * saltos; pos = inicio;
                const txt = `Salta ${saltos} ${dir > 0 ? "hacia adelante ➡️" : "hacia atrás ⬅️"}`;
                document.getElementById("card").innerHTML = `<p class="task">La rana está en el <span class="big">${inicio}</span><br>${txt.replace(String(saltos), `<span class="big">${saltos}</span>`)} <button class="again" id="oir" type="button">🔊</button>${MKP.edad === 4 ? `<br><span class="big">${inicio} ${dir > 0 ? "+" : "−"} ${saltos} = ?</span>` : ""}</p>
                    <p class="sub">Toca la rana para que salte. ¿En qué número cae?</p>
                    <div class="lake" id="lake"><span class="frog" id="frog">🐸</span>
                        <div class="pads" style="--n:${max + 1}">${Array.from({ length: max + 1 }, (_, k) => `<div class="pad" data-drop="pad" data-k="${k}">${k}</div>`).join("")}</div></div>
                    <div class="dirs"><button type="button" id="atras" aria-label="Saltar hacia atrás">⬅️</button><button type="button" id="adelante" aria-label="Saltar hacia adelante">➡️</button></div>
                    <div class="tools"><button class="big-btn alt" id="otra" type="button">↩ Empezar de nuevo</button><button class="big-btn" id="ok" type="button">✅ ¡Llegué!</button></div>`;
                const frog = document.getElementById("frog");
                MKP.arrastrar(frog, { alTocar: () => saltar(dir), alSoltar: d => { mover(+d.dataset.k, true); return false; } });
                document.getElementById("adelante").onclick = () => saltar(1);
                document.getElementById("atras").onclick = () => saltar(-1);
                document.getElementById("otra").onclick = () => { if (!fin) { pos = inicio; contados = 0; mover(pos); } };
                document.getElementById("ok").onclick = revisar;
                document.getElementById("oir").onclick = decir;
                contados = 0;
                requestAnimationFrame(() => mover(pos));
                window.onresize = () => mover(pos);
                decir();
            }
        });
        let contados = 0;
        function decir() { MKP.decir(`La rana está en el ${inicio}. Salta ${saltos} ${dir > 0 ? "hacia adelante" : "hacia atrás"}`); }
        function mover(k, arrastre) {
            const pad = document.querySelector(`.pad[data-k="${k}"]`), lake = document.getElementById("lake"), frog = document.getElementById("frog");
            if (!pad || !frog) return;
            const pr = pad.getBoundingClientRect(), lr = lake.getBoundingClientRect();
            frog.style.left = (pr.left - lr.left + pr.width / 2) + "px";
            frog.style.top = (pr.top - lr.top - frog.offsetHeight + 12) + "px";
            if (arrastre) { pos = k; contados = Math.abs(k - inicio); MKJ.sound("salto"); MKP.decir(String(k)); }
        }
        function saltar(d) {
            if (fin) return;
            const n = pos + d;
            if (n < 0 || n > max) { MKJ.sound("error"); return; }
            pos = n; contados++;
            const frog = document.getElementById("frog");
            frog.classList.remove("salta"); void frog.offsetWidth; frog.classList.add("salta");
            mover(pos); MKJ.sound("salto"); MKP.contar(contados);
        }
        function revisar() {
            if (fin) return;
            if (pos === meta) {
                fin = true; MKJ.sound("ok"); MKP.aviso("¡" + meta + "!", true);
                document.querySelector(`.pad[data-k="${meta}"]`).classList.add("meta");
                MKP.decir(`¡Muy bien! ${inicio} ${dir > 0 ? "más" : "menos"} ${saltos} es ${meta}`);
                listoFn(primera);
            } else {
                primera = false; MKJ.sound("error"); MKP.aviso("¡Otra vez!", false);
                MKP.decir(`Estás en el ${pos}. Empieza en el ${inicio} y salta ${saltos}`);
                pos = inicio; contados = 0; setTimeout(() => mover(pos), 700);
            }
        }
        window.__juego = { get meta() { return meta; }, get pos() { return pos; }, saltar, revisar, J };
