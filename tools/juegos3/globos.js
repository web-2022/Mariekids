        /* 🎈 REVIENTA GLOBOS: reconocer números. Revienta el globo con el número que dice la voz. */
        const R = MKJ.rnd, P = MKJ.pick;
        const COL = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"];
        let obj = 0, primera = true, hecho = false, listoFn = null;
        MKP.juego({
            clave: "globos3a", rondas: 8, icono: "🎈",
            niveles: [
                { n: 1, name: "Nivel 1", desc: "Números del 1 al 5", cls: "lv1", max: 5, g: 4, t: 9 },
                { n: 2, name: "Nivel 2", desc: "Números del 1 al 6", cls: "lv2", max: 6, g: 5, t: 8 },
                { n: 3, name: "Nivel 3", desc: "Números del 1 al 10", cls: "lv3", max: 10, g: 6, t: 7 }
            ],
            ronda(nv, i, listo) {
                obj = R(1, nv.max); primera = true; hecho = false; listoFn = listo;
                const otros = MKJ.shuffle([...Array(nv.max).keys()].map(x => x + 1).filter(x => x !== obj)).slice(0, nv.g - 1);
                const nums = MKJ.shuffle(otros.concat(obj, obj));   // el correcto sale dos veces
                document.getElementById("card").innerHTML = `<p class="task">Revienta el globo <span class="big">${obj}</span> <button class="again" id="oir" type="button">🔊</button></p><div class="sky" id="sky"></div>`;
                const sky = document.getElementById("sky"), W = sky.clientWidth, paso = (W - 80) / Math.max(1, nums.length - 1);
                nums.forEach((n, k) => {
                    const g = document.createElement("div");
                    g.className = "globo"; g.dataset.n = n;
                    g.style.cssText = `left:${Math.round(k * paso)}px;--c:${P(COL)};--t:${nv.t + Math.random() * 3}s;--d:-${(Math.random() * nv.t).toFixed(2)}s`;
                    g.innerHTML = `<div class="bola">${n}</div><div class="hilo"></div>`;
                    g.addEventListener("pointerdown", e => { e.preventDefault(); tocar(g); });
                    sky.appendChild(g);
                });
                document.getElementById("oir").onclick = () => MKP.decir("Revienta el globo " + obj);
                MKP.decir("Revienta el globo " + obj);
            }
        });
        function tocar(g) {
            if (hecho || g.classList.contains("pum")) return;
            const n = +g.dataset.n;
            if (n === obj) {
                hecho = true; g.style.transform = getComputedStyle(g).transform; g.classList.add("pum");
                MKJ.sound("ok"); MKP.aviso("¡PUM! " + n, true); MKP.decir("¡Muy bien! El " + n); listoFn(primera);
            } else {
                primera = false; g.classList.remove("mal"); void g.offsetWidth; g.classList.add("mal");
                MKJ.sound("error"); MKP.decir("Ese es el " + n + ". Busca el " + obj);
            }
        }
        window.__juego = { get obj() { return obj; } };
