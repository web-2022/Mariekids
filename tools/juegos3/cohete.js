        /* 🚀 COHETE DEL 10: complementos (amigos del 10, 12, 15, 20, 30). Toca dos números que suman la meta. Temas 33–35. */
        const R = MKJ.rnd, P = MKJ.pick;
        let meta = 10, sel = null, pares = 0, primera = true, listoFn = null, nivelAct = null, tiempo = null;
        const NIV = [
            { n: 1, name: "Nivel 1", desc: "Amigos del 10", cls: "lv1", metas: [10] },
            { n: 2, name: "Nivel 2", desc: "Amigos del 12 y del 15", cls: "lv2", metas: [12, 15] },
            { n: 3, name: "Nivel 3", desc: "Amigos del 20 y del 30, ¡contra reloj!", cls: "lv3", metas: [20, 30], reloj: 40 }
        ];
        MKP.juego({
            clave: "cohete1p", rondas: 4, icono: "🚀", pausa: 2200, niveles: NIV,
            ronda(nv, i, listo) {
                primera = true; listoFn = listo; sel = null; pares = 0; nivelAct = nv; clearInterval(tiempo);
                meta = P(nv.metas);
                const nums = [];
                while (nums.length < 8) { const a = R(meta > 15 ? 3 : 1, meta - 1); nums.push(a, meta - a); }
                document.getElementById("card").innerHTML = `<p class="task">Junta dos números que sumen <span class="big">${meta}</span> <button class="again" id="oir" type="button">🔊</button></p>
                    <div class="rocket"><span class="r" id="r">🚀</span><div class="tanque"><i id="gas" style="width:0%"></i></div>${nv.reloj ? `<span class="reloj" id="seg">⏱️ ${nv.reloj}</span>` : ""}</div>
                    <div class="fichas">${MKJ.shuffle(nums).map(n => `<button class="ficha" type="button">${n}</button>`).join("")}</div>`;
                document.querySelectorAll(".ficha").forEach(f => f.onclick = () => tocar(f));
                if (nv.reloj) { let s = nv.reloj; tiempo = setInterval(() => { s--; const e = document.getElementById("seg"); if (!e) { clearInterval(tiempo); return; } e.textContent = "⏱️ " + s; if (s <= 0) { clearInterval(tiempo); primera = false; MKP.decir("¡Se acabó el tiempo! Sigue intentando"); e.textContent = "⏱️ ¡tiempo!"; } }, 1000); }
                const t = `Junta dos números que sumen ${meta}`; document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t);
            }
        });
        function tocar(f) {
            if (f.classList.contains("usada")) return;
            if (!sel) { sel = f; f.classList.add("sel"); MKJ.sound("salto"); return; }
            if (sel === f) { f.classList.remove("sel"); sel = null; return; }
            const a = +sel.textContent, b = +f.textContent;
            if (a + b === meta) {
                sel.classList.add("usada"); f.classList.add("usada"); sel = null; pares++;
                document.getElementById("gas").style.width = (pares * 25) + "%"; MKJ.sound("moneda"); MKP.decir(`${a} más ${b} es ${meta}`);
                if (pares === 4) { clearInterval(tiempo); document.getElementById("r").classList.add("sube"); MKJ.sound("ok"); MKP.aviso("¡Despegue!", true); listoFn(primera); }
            } else {
                primera = false; MKJ.sound("error"); f.classList.add("mal"); setTimeout(() => f.classList.remove("mal"), 400);
                sel.classList.remove("sel"); sel = null; MKP.decir(`${a} más ${b} es ${a + b}, no ${meta}`);
            }
        }
        window.__juego = { get meta() { return meta; }, tocar };
