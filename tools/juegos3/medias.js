        /* 🧦 PAREJAS DE MEDIAS: correspondencia. Arrastra cada media de la izquierda a su pareja. */
        const R = MKJ.rnd;
        const COL = ["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#a855f7", "#f97316", "#ec4899"];
        let quedan = 0, primera = true, listoFn = null, nivelAct = null;
        function svgMedia(c, raya) {
            return `<svg viewBox="0 0 100 90" aria-hidden="true"><path d="M30 4h34v46c0 4 2 6 6 8l16 8c8 4 8 20-4 20H40C26 86 18 76 22 62l8-22z" fill="${c}" stroke="#0003" stroke-width="3"/><rect x="30" y="4" width="34" height="12" fill="#fff8"/>${raya ? `<rect x="28" y="28" width="38" height="7" fill="#fff9"/>` : ""}</svg>`;
        }
        MKP.juego({
            clave: "medias3a", rondas: 4, icono: "🧦",
            niveles: [
                { n: 1, name: "Nivel 1", desc: "3 parejas por color", cls: "lv1", p: 3, modo: "color" },
                { n: 2, name: "Nivel 2", desc: "4 parejas: número y número", cls: "lv2", p: 4, modo: "num", max: 6 },
                { n: 3, name: "Nivel 3", desc: "Número con sus puntitos (hasta 10)", cls: "lv3", p: 4, modo: "puntos", max: 10 }
            ],
            niveles4: [
                { n: 1, name: "Nivel 1", desc: "Mismo número (hasta 10)", cls: "lv1", p: 4, modo: "num", max: 10 },
                { n: 2, name: "Nivel 2", desc: "Número con sus puntitos (hasta 10)", cls: "lv2", p: 5, modo: "puntos", max: 10 },
                { n: 3, name: "Nivel 3", desc: "Suma con su resultado: 2 + 3 y 5", cls: "lv3", p: 4, modo: "suma", max: 10 }
            ],
            ronda(nv, i, listo) {
                primera = true; listoFn = listo; nivelAct = nv; quedan = nv.p;
                const cols = MKJ.shuffle(COL.slice()).slice(0, nv.p);
                const nums = nv.modo === "color" ? cols.map((_, k) => k) : MKJ.shuffle([...Array(nv.max).keys()].map(x => x + 1).filter(x => nv.modo !== "suma" || x > 1)).slice(0, nv.p);
                const izq = nums.map((n, k) => ({ id: k, c: cols[k], n })), der = MKJ.shuffle(izq.map(x => ({ ...x, c: nv.modo === "color" ? x.c : COL[(x.id + 3) % COL.length] })));
                const cara = (m, lado) => {
                    let extra = "";
                    if (nv.modo === "num") extra = `<b>${m.n}</b>`;
                    if (nv.modo === "suma") { const a = (m.a = m.a || R(1, m.n - 1)); extra = lado === "i" ? `<b style="font-size:19px;left:30px">${a}+${m.n - a}</b>` : `<b>${m.n}</b>`; }
                    if (nv.modo === "puntos") extra = lado === "i" ? `<b>${m.n}</b>` : `<span class="dots">${"<i></i>".repeat(m.n)}</span>`;
                    return `<div class="sock" data-id="${m.id}" ${lado === "d" ? 'data-drop="media"' : ""}>${svgMedia(m.c, lado === "d")}${extra}</div>`;
                };
                document.getElementById("card").innerHTML = `<p class="task">${nv.modo === "color" ? "Junta cada media con su pareja" : nv.modo === "num" ? "Junta las medias con el mismo número" : nv.modo === "suma" ? "Junta cada suma con su resultado" : "Junta el número con sus puntitos"} <button class="again" id="oir" type="button">🔊</button></p>
                    <p class="sub">Arrastra una media de la izquierda hasta su pareja.</p>
                    <div class="cols"><div class="col">${izq.map(m => cara(m, "i")).join("")}</div><div class="col">${der.map(m => cara(m, "d")).join("")}</div></div><div class="tend" id="tend"></div>`;
                document.querySelectorAll(".col:first-child .sock").forEach(s => MKP.arrastrar(s, { alSoltar: d => juntar(s, d) }));
                const txt = nv.modo === "color" ? "Junta cada media con su pareja del mismo color" : nv.modo === "num" ? "Junta las medias que tienen el mismo número" : nv.modo === "suma" ? "Junta cada suma con su resultado" : "Junta cada número con la media que tiene esos puntitos";
                document.getElementById("oir").onclick = () => MKP.decir(txt); MKP.decir(txt);
            }
        });
        function juntar(s, d) {
            if (d.dataset.id === s.dataset.id && !d.classList.contains("hecho")) {
                s.classList.add("hecho"); d.classList.add("hecho"); s.dataset.bloqueado = 1;
                document.getElementById("tend").textContent += "🧦";
                MKJ.sound("ok"); quedan--;
                if (quedan === 0) { MKP.aviso("¡Todas!", true); MKP.decir("¡Muy bien! Todas las medias tienen pareja"); listoFn(primera); }
                return true;
            }
            primera = false; MKJ.sound("error"); d.classList.remove("mal"); void d.offsetWidth; d.classList.add("mal"); MKP.decir("Esa no es su pareja");
            return false;
        }
