        /* 🐣 NIDO DE POLLITOS: cantidad ↔ número con dos o tres nidos. */
        const R = MKJ.rnd;
        let metas = [], primera = true, fin = false, listoFn = null;
        MKP.juego({
            clave: "nido3a", rondas: 5, icono: "🐣",
            niveles: [
                { n: 1, name: "Nivel 1", desc: "2 nidos, hasta 5 pollitos", cls: "lv1", max: 5, nidos: 2 },
                { n: 2, name: "Nivel 2", desc: "2 nidos, hasta 6 pollitos", cls: "lv2", max: 6, nidos: 2 },
                { n: 3, name: "Nivel 3", desc: "3 nidos, hasta 10 pollitos", cls: "lv3", max: 10, nidos: 3 }
            ],
            niveles5: [
                { n: 1, name: "Nivel 1", desc: "3 nidos, hasta 18 pollitos", cls: "lv1", max: 18, nidos: 3, cada: 6 },
                { n: 2, name: "Nivel 2", desc: "Las gallinas piden sumas: 2 + 3", cls: "lv2", max: 15, nidos: 3, cada: 6, op: "+" },
                { n: 3, name: "Nivel 3", desc: "Las gallinas piden restas: 7 − 2", cls: "lv3", max: 15, nidos: 3, cada: 6, op: "-" }
            ],
            niveles4: [
                { n: 1, name: "Nivel 1", desc: "2 nidos, hasta 10 pollitos", cls: "lv1", max: 10, nidos: 2, cada: 5 },
                { n: 2, name: "Nivel 2", desc: "3 nidos, hasta 12 pollitos", cls: "lv2", max: 12, nidos: 3, cada: 5 },
                { n: 3, name: "Nivel 3", desc: "3 nidos, hasta 15 pollitos", cls: "lv3", max: 15, nidos: 3, cada: 6 }
            ],
            ronda(nv, i, listo) {
                primera = true; fin = false; listoFn = listo;
                do { metas = Array.from({ length: nv.nidos }, () => R(1, nv.cada || (nv.nidos === 3 ? 4 : 3))); } while (metas.reduce((a, b) => a + b) > nv.max);
                const total = metas.reduce((a, b) => a + b) + R(1, 2);
                document.getElementById("card").innerHTML = `<p class="task">Lleva los pollitos a su mamá <button class="again" id="oir" type="button">🔊</button></p>
                    <p class="sub">Cada gallina quiere tantos pollitos como dice su número. Arrástralos con el dedo.</p>
                    <div class="nests">${metas.map((m, k) => `<div class="nest"><div class="hen">🐔<b${nv.op ? ' style="font-size:24px;padding:0 6px"' : ""}>${etiqueta(m, nv.op)}</b></div><div class="bowl" data-drop="nido" data-k="${k}"></div></div>`).join("")}</div>
                    <div class="yard" id="yard" data-drop="patio"></div>
                    <div class="tools"><button class="big-btn" id="ok" type="button">✅ ¡Listo!</button></div>`;
                for (let k = 0; k < total; k++) nuevo(document.getElementById("yard"));
                document.getElementById("ok").onclick = revisar;
                document.getElementById("oir").onclick = decir;
                decir();
            }
        });
        const etq = {};
        function etiqueta(m, op) {
            if (!op) return m;
            if (op === "+") { if (m < 2) return String(m); const a = R(1, m - 1); return a + "+" + (m - a); }
            const b = R(1, 4); return (m + b) + "−" + b;
        }
        function decir() { MKP.decir("Lleva los pollitos. " + metas.map((m, k) => "Gallina " + (k + 1) + ": " + MKP.NUM[m]).join(". ")); }
        function nuevo(dest) {
            const c = document.createElement("span"); c.className = "chick"; c.textContent = "🐥";
            dest.appendChild(c);
            if (dest.id === "yard") MKP.arrastrar(c, { alSoltar: d => mover(c, d) });
            else c.onclick = () => { c.remove(); nuevo(document.getElementById("yard")); MKJ.sound("salto"); };
        }
        function mover(c, d) {
            if (fin || !d.classList.contains("bowl")) return false;
            c.remove(); nuevo(d); MKJ.sound("moneda"); MKP.contar(d.children.length);
            return true;
        }
        function revisar() {
            if (fin) return;
            const malos = [...document.querySelectorAll(".bowl")].filter((b, k) => b.children.length !== metas[k]);
            if (!malos.length) { fin = true; MKJ.sound("ok"); MKP.aviso("¡Pío pío!", true); MKP.decir("¡Muy bien! Todas las mamás están felices"); listoFn(primera); return; }
            primera = false; MKJ.sound("error"); MKP.aviso("¡Cuenta otra vez!", false);
            const k = [...document.querySelectorAll(".bowl")].indexOf(malos[0]), n = malos[0].children.length;
            MKP.decir(`La gallina ${k + 1} quiere ${MKP.NUM[metas[k]]} y tiene ${MKP.NUM[n]}`);
        }
        window.__juego = { get metas() { return metas; } };
