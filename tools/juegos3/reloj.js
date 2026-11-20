        /* ⏰ EL RELOJ: leer la hora en punto e y media; poner la hora tocando el número. */
        const R = MKJ.rnd;
        let h = 3, m = 0, puesta = 12, primera = true, fin = false, listoFn = null;
        function reloj(hh, mm, tocable) {
            let s = `<svg class="reloj" viewBox="0 0 200 200"><circle cx="100" cy="100" r="96" fill="#fff" stroke="#3b82f6" stroke-width="8"/>`;
            for (let k = 1; k <= 12; k++) {
                const a = k * Math.PI / 6, x = 100 + 76 * Math.sin(a), y = 100 - 76 * Math.cos(a);
                if (tocable) s += `<circle class="zona" data-h="${k}" cx="${x}" cy="${y}" r="15"/>`;
                s += `<text class="num" data-h="${k}" x="${x}" y="${y}">${k}</text>`;
            }
            for (let k = 0; k < 60; k++) { const a = k * Math.PI / 30, r1 = k % 5 ? 90 : 86; s += `<line x1="${100 + r1 * Math.sin(a)}" y1="${100 - r1 * Math.cos(a)}" x2="${100 + 93 * Math.sin(a)}" y2="${100 - 93 * Math.cos(a)}" stroke="#94a3b8" stroke-width="${k % 5 ? 1 : 3}"/>`; }
            const ah = (hh % 12) * 30 + mm / 2, am = mm * 6;
            s += `<g class="aguja" id="aH" style="transform:rotate(${ah}deg)"><line x1="100" y1="100" x2="100" y2="52" stroke="#ef4444" stroke-width="9" stroke-linecap="round"/></g>`;
            s += `<g class="aguja" id="aM" style="transform:rotate(${am}deg)"><line x1="100" y1="100" x2="100" y2="24" stroke="#1e3a8a" stroke-width="5" stroke-linecap="round"/></g>`;
            return s + `<circle cx="100" cy="100" r="7" fill="#0f172a"/></svg>`;
        }
        const txtHora = (hh, mm) => mm ? `${hh} y media` : `${hh} en punto`;
        const NIV = [
            { n: 1, name: "Nivel 1", desc: "¿Qué hora es? (en punto)", cls: "lv1", modo: "leer", media: false },
            { n: 2, name: "Nivel 2", desc: "Pon la hora: toca el número", cls: "lv2", modo: "poner" },
            { n: 3, name: "Nivel 3", desc: "En punto e y media", cls: "lv3", modo: "leer", media: true }
        ];
        MKP.juego({
            clave: "reloj", rondas: 6, icono: "⏰", niveles: NIV, niveles4: NIV, niveles5: NIV,
            ronda(nv, i, listo) {
                primera = true; fin = false; listoFn = listo;
                h = R(1, 12); m = nv.media && i % 2 ? 30 : 0;
                if (nv.modo === "poner") {
                    puesta = 12;
                    document.getElementById("card").innerHTML = `<p class="task">Pon el reloj a las <span class="big">${h}</span> en punto <button class="again" id="oir" type="button">🔊</button></p>
                        <p class="sub">La aguja larga ya está en el 12. Toca un número para mover la aguja corta 🔴.</p>
                        ${reloj(12, 0, true)}<div class="tools"><button class="big-btn" id="ok" type="button">✅ ¡Listo!</button></div>`;
                    document.querySelectorAll("[data-h]").forEach(z => z.addEventListener("click", () => { if (fin) return; puesta = +z.dataset.h; document.getElementById("aH").style.transform = `rotate(${(puesta % 12) * 30}deg)`; MKJ.sound("salto"); MKP.decir(String(puesta)); }));
                    document.getElementById("ok").onclick = () => {
                        if (fin) return;
                        if (puesta === h) { fin = true; MKJ.sound("ok"); MKP.aviso("¡" + h + " en punto!", true); MKP.decir(`¡Muy bien! Son las ${h} en punto`); listoFn(primera); }
                        else { primera = false; MKJ.sound("error"); MKP.decir(`La aguja corta está en el ${puesta}. Ponla en el ${h}`); }
                    };
                    const t = `Pon el reloj a las ${h} en punto`;
                    document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t); return;
                }
                const otras = MKJ.shuffle([[h % 12 + 1, m], [(h + 10) % 12 + 1, m], [h, m ? 0 : 30], [(h + 5) % 12 + 1, m ? 0 : 30]].filter(x => nv.media || !x[1])).slice(0, 2);
                const opts = MKJ.shuffle([[h, m], ...otras]);
                document.getElementById("card").innerHTML = `<p class="task">¿Qué hora es? <button class="again" id="oir" type="button">🔊</button></p>
                    ${reloj(h, m)}
                    <div class="answers">${opts.map(o => `<button class="answer hora" data-h="${o[0]}" data-m="${o[1]}" type="button">${o[0]}:${o[1] ? "30" : "00"}</button>`).join("")}</div>`;
                document.querySelectorAll(".answer").forEach(b => b.onclick = () => {
                    if (fin) return;
                    if (+b.dataset.h === h && +b.dataset.m === m) { fin = true; b.classList.add("right"); MKJ.sound("ok"); MKP.decir(`¡Muy bien! Son las ${txtHora(h, m)}`); listoFn(primera); }
                    else { primera = false; b.classList.add("wrong"); MKJ.sound("error"); MKP.decir(m ? "Mira la aguja corta: está entre dos números. La larga en el 6 es y media" : "Mira la aguja corta, la roja"); }
                });
                const t = "¿Qué hora es?";
                document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t);
            }
        });
        window.__juego = { get h() { return h; }, get m() { return m; } };
