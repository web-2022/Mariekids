        /* 📏 ¿CUÁNTO MIDE?: medir con unidades no convencionales (clips) y comparar longitudes. */
        const R = MKJ.rnd, P = MKJ.pick;
        const OBJ = [["✏️", "el lápiz", "#facc15"], ["🐛", "el gusano", "#4ade80"], ["🥄", "la cuchara", "#cbd5e1"], ["🖍️", "el crayón", "#f87171"], ["🐍", "la serpiente", "#a3e635"], ["🌭", "el hot dog", "#fb923c"], ["🖌️", "el pincel", "#c084fc"]];
        let largo = 0, puestos = 0, primera = true, fin = false, listoFn = null, U = 40;
        const NIV = [
            { n: 1, name: "Nivel 1", desc: "¿Cuántos clips mide?", cls: "lv1", modo: "contar", max: 6 },
            { n: 2, name: "Nivel 2", desc: "¿Cuál es más largo o más corto?", cls: "lv2", modo: "comparar", max: 8 },
            { n: 3, name: "Nivel 3", desc: "Mide tú: pon los clips", cls: "lv3", modo: "medir", max: 8 }
        ];
        const barra = (o, n) => `<div class="obj"><div class="barra" style="width:calc(var(--u) * ${n});background:${o[2]}">${o[0]}</div></div>`;
        MKP.juego({
            clave: "medidas", rondas: 6, icono: "📏", niveles: NIV, niveles4: NIV, niveles5: NIV,
            ronda(nv, i, listo) {
                primera = true; fin = false; listoFn = listo; puestos = 0;
                U = Math.max(26, Math.min(48, Math.floor((document.getElementById("card").clientWidth - 60) / nv.max)));
                document.getElementById("card").style.setProperty("--u", U + "px");
                const o = P(OBJ);
                largo = R(2, nv.max);
                if (nv.modo === "comparar") {
                    const o2 = P(OBJ.filter(x => x !== o)); let l2 = R(2, nv.max); while (l2 === largo) l2 = R(2, nv.max);
                    const pide = i % 2 ? "corto" : "largo", gana = pide === "largo" ? (largo > l2 ? 0 : 1) : (largo < l2 ? 0 : 1);
                    document.getElementById("card").innerHTML = `<p class="task">¿Cuál es más <span class="big">${pide.toUpperCase()}</span>? <button class="again" id="oir" type="button">🔊</button></p>
                        <div class="dos"><button type="button" data-k="0">${barra(o, largo)}</button><button type="button" data-k="1">${barra(o2, l2)}</button></div>`;
                    document.querySelectorAll(".dos button").forEach(b => b.onclick = () => {
                        if (fin) return;
                        if (+b.dataset.k === gana) { fin = true; b.classList.add("bien"); MKJ.sound("ok"); MKP.decir(`¡Muy bien! ${[o, o2][gana][1]} es más ${pide}`); listoFn(primera); }
                        else { primera = false; b.classList.remove("mal"); void b.offsetWidth; b.classList.add("mal"); MKJ.sound("error"); MKP.decir("Mira bien dónde termina cada uno"); }
                    });
                    const t = `¿Cuál es más ${pide}?`; document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t); return;
                }
                const clips = nv.modo === "contar" ? "<span class='clip'>📎</span>".repeat(largo) : "";
                document.getElementById("card").innerHTML = `<p class="task">¿Cuántos 📎 mide ${o[1]}? <button class="again" id="oir" type="button">🔊</button></p>
                    ${nv.modo === "medir" ? `<p class="sub">Arrastra clips debajo hasta que lleguen al final. Toca un clip para sacarlo.</p>` : ""}
                    <div class="regla">${barra(o, largo)}<div class="clips${nv.modo === "medir" ? " drop" : ""}" id="clips" data-drop="clips">${clips}</div></div>
                    ${nv.modo === "medir" ? `<div class="fuente"><span class="clip" id="src">📎</span>Clips</div><div class="tools"><button class="big-btn" id="ok" type="button">✅ ¡Listo!</button></div>` :
                    `<div class="answers">${MKJ.shuffle([...new Set([largo, largo + 1, largo - 1 || largo + 2])]).map(v => `<button class="answer" type="button">${v}</button>`).join("")}</div>`}`;
                if (nv.modo === "medir") {
                    MKP.arrastrar(document.getElementById("src"), { alTocar: agregar, alSoltar: d => { if (d.id === "clips") agregar(); return false; } });
                    document.getElementById("ok").onclick = () => {
                        if (fin) return;
                        if (puestos === largo) { fin = true; MKJ.sound("ok"); MKP.aviso(largo + " 📎", true); MKP.decir(`¡Muy bien! ${o[1]} mide ${largo} clips`); listoFn(primera); }
                        else { primera = false; MKJ.sound("error"); MKP.decir(puestos < largo ? "Faltan clips. Llega hasta el final" : "Te pasaste. Saca un clip"); }
                    };
                } else document.querySelectorAll(".answer").forEach(b => b.onclick = () => {
                    if (fin) return;
                    if (+b.textContent === largo) { fin = true; b.classList.add("right"); MKJ.sound("ok"); MKP.decir(`¡Muy bien! Mide ${largo} clips`); listoFn(primera); }
                    else { primera = false; b.classList.add("wrong"); MKJ.sound("error"); MKP.decir("Cuenta los clips uno por uno"); }
                });
                const t = `¿Cuántos clips mide ${o[1]}?`; document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t);
            }
        });
        function agregar() {
            if (fin) return;
            const c = document.getElementById("clips"), s = document.createElement("span");
            s.className = "clip"; s.textContent = "📎"; s.onclick = () => { if (fin) return; s.remove(); puestos--; MKJ.sound("salto"); };
            c.appendChild(s); puestos++; MKJ.sound("moneda"); MKP.contar(puestos);
        }
        window.__juego = { get largo() { return largo; }, agregar };
