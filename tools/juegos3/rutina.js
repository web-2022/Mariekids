        /* 🌅 MI DÍA: secuencia temporal (mañana, tarde, noche y la rutina del día) y días de la semana. */
        const SEC = {
            momentos: [["🌅", "mañana"], ["☀️", "tarde"], ["🌙", "noche"]],
            rutina: [["⏰", "despertar"], ["🪥", "lavarse"], ["🥣", "desayunar"], ["🎒", "colegio"], ["🍲", "almorzar"], ["⚽", "jugar"], ["🛁", "bañarse"], ["😴", "dormir"]],
            dias: [["📅", "lunes"], ["📅", "martes"], ["📅", "miércoles"], ["📅", "jueves"], ["📅", "viernes"], ["🎉", "sábado"], ["🏡", "domingo"]]
        };
        let orden = [], puestos = 0, primera = true, listoFn = null;
        const NIV = [
            { n: 1, name: "Nivel 1", desc: "Mañana, tarde y noche", cls: "lv1", sec: "momentos", k: 3 },
            { n: 2, name: "Nivel 2", desc: "Ordena tu día (4 cosas)", cls: "lv2", sec: "rutina", k: 4 },
            { n: 3, name: "Nivel 3", desc: "Días de la semana", cls: "lv3", sec: "dias", k: 4 }
        ];
        MKP.juego({
            clave: "rutina", rondas: 4, icono: "🌅", niveles: NIV, niveles4: NIV,
            ronda(nv, i, listo) {
                primera = true; listoFn = listo; puestos = 0;
                const todo = SEC[nv.sec];
                if (nv.sec === "momentos") orden = todo.slice();
                else if (nv.sec === "dias") { const a = MKJ.rnd(0, todo.length - nv.k); orden = todo.slice(a, a + nv.k); }
                else { const idx = MKJ.shuffle([...todo.keys()]).slice(0, nv.k).sort((a, b) => a - b); orden = idx.map(k => todo[k]); }
                const t = nv.sec === "dias" ? "Ordena los días de la semana" : nv.sec === "momentos" ? "Ordena: ¿qué va primero?" : "Ordena tu día: ¿qué haces primero?";
                document.getElementById("card").innerHTML = `<p class="task">${t} <button class="again" id="oir" type="button">🔊</button></p>
                    <p class="sub">Arrastra cada tarjeta a su lugar: 1, 2, 3…</p>
                    <div class="linea" style="--n:${orden.length}">${orden.map((o, k) => `<div class="casilla" data-drop="casilla" data-k="${k}"><span class="num">${k + 1}</span></div>`).join("")}</div>
                    <div class="monton">${MKJ.shuffle(orden.map((o, k) => ({ o, k }))).map(x => `<div class="tarjeta" data-k="${x.k}"><span class="e">${x.o[0]}</span><small>${x.o[1]}</small></div>`).join("")}</div>`;
                document.querySelectorAll(".tarjeta").forEach(c => MKP.arrastrar(c, { alTocar: () => MKP.decir(orden[+c.dataset.k][1]), alSoltar: d => poner(c, d) }));
                document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t);
            }
        });
        function poner(c, d) {
            if (d.querySelector(".tarjeta")) return false;
            if (c.dataset.k !== d.dataset.k) { primera = false; MKJ.sound("error"); c.classList.remove("mal"); void c.offsetWidth; c.classList.add("mal"); MKP.decir(+d.dataset.k === 0 ? "¿Qué va primero?" : "Eso va en otro lugar"); return false; }
            c.dataset.bloqueado = 1; c.style.opacity = ""; d.appendChild(c); puestos++; MKJ.sound("moneda"); MKP.decir(orden[+c.dataset.k][1]);
            if (puestos === orden.length) { MKJ.sound("ok"); MKP.aviso("¡En orden!", true); MKP.decir("¡Muy bien! " + orden.map(o => o[1]).join(", ")); listoFn(primera); }
            return true;
        }
        window.__juego = { get orden() { return orden; } };
