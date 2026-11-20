        /* 🏗️ FÁBRICA DE DECENAS: valor posicional. 10 cubitos se convierten en una barra (1 decena). */
        const R = MKJ.rnd;
        let meta = 0, bar = 0, cub = 0, primera = true, fin = false, listoFn = null, nivelAct = null;
        const NIV = [
            { n: 1, name: "Nivel 1", desc: "Del 11 al 19: ¡10 cubitos hacen una barra!", cls: "lv1", min: 11, max: 19, barras: false },
            { n: 2, name: "Nivel 2", desc: "Arma números hasta 59 con barras y cubitos", cls: "lv2", min: 20, max: 59, barras: true },
            { n: 3, name: "Nivel 3", desc: "¿Qué número es? (hasta 99)", cls: "lv3", leer: true }
        ];
        MKP.juego({
            clave: "decenas", rondas: 6, icono: "🏗️", niveles: NIV, niveles4: NIV, niveles5: NIV,
            ronda(nv, i, listo) {
                primera = true; fin = false; listoFn = listo; bar = 0; cub = 0; nivelAct = nv;
                if (nv.leer) { leer(); return; }
                meta = R(nv.min, nv.max);
                document.getElementById("card").innerHTML = `<p class="task">Arma el número <span class="big">${meta}</span> <button class="again" id="oir" type="button">🔊</button></p>
                    <p class="sub">Arrastra cubitos a la fábrica. ¡Cuando juntas 10, se vuelven una barra! Toca una pieza para sacarla.</p>
                    <div class="fab" id="fab" data-drop="fab"><div class="barras" id="barras"></div><div class="sueltos" id="sueltos"></div></div>
                    <div class="conteo" id="conteo"></div>
                    <div class="fuentes"><div class="fuente"><span class="cub" id="srcC"></span>1 cubito</div>${nv.barras ? `<div class="fuente"><span class="barra" id="srcB">${"<i></i>".repeat(10)}</span>1 barra = 10</div>` : ""}</div>
                    <div class="tools"><button class="big-btn" id="ok" type="button">✅ ¡Listo!</button></div>`;
                MKP.arrastrar(document.getElementById("srcC"), { alTocar: () => poner(1), alSoltar: d => { if (d.id === "fab") poner(1); return false; } });
                if (nv.barras) MKP.arrastrar(document.getElementById("srcB"), { alTocar: () => poner(10), alSoltar: d => { if (d.id === "fab") poner(10); return false; } });
                document.getElementById("ok").onclick = revisar;
                const t = "Arma el número " + meta;
                document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t);
                pintar();
            }
        });
        function poner(v) {
            if (fin) return;
            if (v === 10) bar++; else cub++;
            let fusion = false;
            if (cub === 10) { cub = 0; bar++; fusion = true; }
            pintar(fusion); MKJ.sound(fusion ? "gana" : "moneda");
            if (fusion) MKP.decir("¡Diez cubitos! Una decena"); else MKP.decir(String(bar * 10 + cub));
        }
        function pintar(fusion) {
            const bs = document.getElementById("barras"), ss = document.getElementById("sueltos");
            bs.innerHTML = Array.from({ length: bar }, (_, k) => `<span class="barra${fusion && k === bar - 1 ? " fusion" : ""}" data-k="b">${"<i></i>".repeat(10)}</span>`).join("");
            ss.innerHTML = "<span class='cub'></span>".repeat(cub);
            bs.querySelectorAll(".barra").forEach(b => b.onclick = () => { if (fin) return; bar--; pintar(); MKJ.sound("salto"); });
            ss.querySelectorAll(".cub").forEach(c => c.onclick = () => { if (fin) return; cub--; pintar(); MKJ.sound("salto"); });
            document.getElementById("conteo").textContent = `${bar} decena${bar === 1 ? "" : "s"} y ${cub} unidad${cub === 1 ? "" : "es"} = ${bar * 10 + cub}`;
        }
        function revisar() {
            if (fin) return;
            const n = bar * 10 + cub;
            if (n === meta) { fin = true; MKJ.sound("ok"); MKP.aviso("¡" + meta + "!", true); MKP.decir(`¡Muy bien! ${bar} decenas y ${cub} unidades es ${meta}`); listoFn(primera); }
            else { primera = false; MKJ.sound("error"); MKP.aviso(n < meta ? "¡Faltan!" : "¡Sobran!", false); MKP.decir(`Tienes ${n}. Necesitas ${meta}`); }
        }
        function leer() {
            const d = R(1, 9), u = R(0, 9); meta = d * 10 + u;
            const opts = MKJ.shuffle([...new Set([meta, u * 10 + d, meta + 10 > 99 ? meta - 10 : meta + 10, meta + 1])].filter(x => x > 0 && x < 100)).slice(0, 3);
            if (!opts.includes(meta)) opts[0] = meta;
            document.getElementById("card").innerHTML = `<p class="task">¿Qué número es? <button class="again" id="oir" type="button">🔊</button></p>
                <div class="fab"><div class="barras">${`<span class="barra">${"<i></i>".repeat(10)}</span>`.repeat(d)}</div><div class="sueltos">${"<span class='cub'></span>".repeat(u)}</div></div>
                <div class="answers">${MKJ.shuffle(opts).map(o => `<button class="answer" type="button">${o}</button>`).join("")}</div>`;
            document.querySelectorAll(".answer").forEach(b => b.onclick = () => {
                if (fin) return;
                if (+b.textContent === meta) { fin = true; b.classList.add("right"); MKJ.sound("ok"); MKP.decir(`¡Muy bien! ${d} decenas y ${u} unidades es ${meta}`); listoFn(primera); }
                else { primera = false; b.classList.add("wrong"); MKJ.sound("error"); MKP.decir("Cuenta las barras de diez y luego los cubitos"); }
            });
            const t = "¿Qué número es? Cuenta las barras de diez y los cubitos";
            document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t);
        }
        window.__juego = { get meta() { return meta; }, poner, revisar };
