        /* 🌅 MI DÍA: secuencia temporal (mañana, tarde, noche y la rutina del día) y días de la semana. */
        const SEC = {
            momentos: [["🌅", "mañana"], ["☀️", "tarde"], ["🌙", "noche"]],
            rutina: [["⏰", "despertar"], ["🪥", "lavarse"], ["🥣", "desayunar"], ["🎒", "colegio"], ["🍲", "almorzar"], ["⚽", "jugar"], ["🛁", "bañarse"], ["😴", "dormir"]],
            meses: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "setiembre", "octubre", "noviembre", "diciembre"].map((m, k) => [["☀️", "☀️", "🍂", "🍂", "🍂", "❄️", "❄️", "❄️", "🌸", "🌸", "🌸", "☀️"][k], m]),
            dias: [["📅", "lunes"], ["📅", "martes"], ["📅", "miércoles"], ["📅", "jueves"], ["📅", "viernes"], ["🎉", "sábado"], ["🏡", "domingo"]]
        };
        let orden = [], puestos = 0, primera = true, listoFn = null;
        const NIV = [
            { n: 1, name: "Nivel 1", desc: "Mañana, tarde y noche", cls: "lv1", sec: "momentos", k: 3 },
            { n: 2, name: "Nivel 2", desc: "Ordena tu día (4 cosas)", cls: "lv2", sec: "rutina", k: 4 },
            { n: 3, name: "Nivel 3", desc: "Días de la semana", cls: "lv3", sec: "dias", k: 4 }
        ];
        const NIV5 = [
            { n: 1, name: "Nivel 1", desc: "Ordena tu día (5 cosas)", cls: "lv1", sec: "rutina", k: 5 },
            { n: 2, name: "Nivel 2", desc: "Días de la semana (5)", cls: "lv2", sec: "dias", k: 5 },
            { n: 3, name: "Nivel 3", desc: "Meses del año", cls: "lv3", sec: "meses", k: 4 }
        ];
        const NIV6 = [
            { n: 1, name: "Nivel 1", desc: "Días de la semana (7)", cls: "lv1", sec: "dias", k: 5 },
            { n: 2, name: "Nivel 2", desc: "Meses del año", cls: "lv2", sec: "meses", k: 5 },
            { n: 3, name: "Nivel 3", desc: "Calendario: ¿qué día será?", cls: "lv3", sec: "calendario" }
        ];
        MKP.juego({
            clave: "rutina", rondas: 4, icono: "🌅", niveles: NIV, niveles4: NIV, niveles5: NIV5, niveles6: NIV6,
            ronda(nv, i, listo) {
                primera = true; listoFn = listo; puestos = 0;
                if (nv.sec === "calendario") { calendario(i); return; }
                const todo = SEC[nv.sec];
                if (nv.sec === "momentos") orden = todo.slice();
                else if (nv.sec === "dias" || nv.sec === "meses") { const a = MKJ.rnd(0, todo.length - nv.k); orden = todo.slice(a, a + nv.k); }
                else { const idx = MKJ.shuffle([...todo.keys()]).slice(0, nv.k).sort((a, b) => a - b); orden = idx.map(k => todo[k]); }
                const t = nv.sec === "meses" ? "Ordena los meses del año" : nv.sec === "dias" ? "Ordena los días de la semana" : nv.sec === "momentos" ? "Ordena: ¿qué va primero?" : "Ordena tu día: ¿qué haces primero?";
                document.getElementById("card").innerHTML = `<p class="task">${t} <button class="again" id="oir" type="button">🔊</button></p>
                    <p class="sub">Arrastra cada tarjeta a su lugar: 1, 2, 3…</p>
                    <div class="linea" style="--n:${orden.length}">${orden.map((o, k) => `<div class="casilla" data-drop="casilla" data-k="${k}"><span class="num">${k + 1}</span></div>`).join("")}</div>
                    <div class="monton">${MKJ.shuffle(orden.map((o, k) => ({ o, k }))).map(x => `<div class="tarjeta" data-k="${x.k}"><span class="e">${x.o[0]}</span><small>${x.o[1]}</small></div>`).join("")}</div>`;
                document.querySelectorAll(".tarjeta").forEach(c => MKP.arrastrar(c, { alTocar: () => MKP.decir(orden[+c.dataset.k][1]), alSoltar: d => poner(c, d) }));
                document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t);
            }
        });
        const DIAS = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
        function calendario(i) {
            const hoy = MKJ.rnd(0, 6), n = MKJ.rnd(1, 9), atras = i % 3 === 2, r = ((hoy + (atras ? -n : n)) % 7 + 7) % 7;
            const opts = MKJ.shuffle([r, (r + 1) % 7, (r + 6) % 7]);
            const t = atras ? `Hoy es ${DIAS[hoy]}. ¿Qué día fue hace ${n} días?` : `Hoy es ${DIAS[hoy]}. ¿Qué día será en ${n} días?`;
            document.getElementById("card").innerHTML = `<p class="task">${t.replace(DIAS[hoy], `<span class="big">${DIAS[hoy]}</span>`)} <button class="again" id="oir" type="button">🔊</button></p>
                <p class="sub">${DIAS.map((d, k) => k === hoy ? `<b>${d}</b>` : d).join(" · ")}</p>
                <div class="monton">${opts.map(o => `<button class="tarjeta" data-r="${o}" type="button" style="cursor:pointer;border:0"><span class="e">📅</span><small>${DIAS[o]}</small></button>`).join("")}</div>`;
            document.querySelectorAll("[data-r]").forEach(b => b.onclick = () => {
                if (b.dataset.done) return;
                if (+b.dataset.r === r) { document.querySelectorAll("[data-r]").forEach(x => x.dataset.done = 1); MKJ.sound("ok"); MKP.aviso("¡Sí!", true); MKP.decir("¡Muy bien! " + DIAS[r]); listoFn(primera); }
                else { primera = false; MKJ.sound("error"); b.classList.remove("mal"); void b.offsetWidth; b.classList.add("mal"); MKP.decir("Cuenta los días uno por uno"); }
            });
            document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t);
        }
        function poner(c, d) {
            if (d.querySelector(".tarjeta")) return false;
            if (c.dataset.k !== d.dataset.k) { primera = false; MKJ.sound("error"); c.classList.remove("mal"); void c.offsetWidth; c.classList.add("mal"); MKP.decir(+d.dataset.k === 0 ? "¿Qué va primero?" : "Eso va en otro lugar"); return false; }
            c.dataset.bloqueado = 1; c.style.opacity = ""; d.appendChild(c); puestos++; MKJ.sound("moneda"); MKP.decir(orden[+c.dataset.k][1]);
            if (puestos === orden.length) { MKJ.sound("ok"); MKP.aviso("¡En orden!", true); MKP.decir("¡Muy bien! " + orden.map(o => o[1]).join(", ")); listoFn(primera); }
            return true;
        }
        window.__juego = { get orden() { return orden; } };
