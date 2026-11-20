        /* 🐟 PESCA DE NÚMEROS: reconoce el número que escucha. Toca el pez o arrástralo al balde. */
        const R = MKJ.rnd, P = MKJ.pick;
        const PECES = ["🐟", "🐠", "🐡"];
        let objetivo = 0, primera = true, hecho = false;
        const J = MKP.juego({
            clave: "pesca3a", rondas: 8, icono: "🐟",
            niveles: [
                { n: 1, name: "Nivel 1", desc: "Números del 1 al 5", cls: "lv1", max: 5, peces: 3 },
                { n: 2, name: "Nivel 2", desc: "Números del 1 al 6", cls: "lv2", max: 6, peces: 4 },
                { n: 3, name: "Nivel 3", desc: "Números del 1 al 10", cls: "lv3", max: 10, peces: 5 }
            ],
            ronda(nv, i, listo) {
                objetivo = R(1, nv.max); primera = true; hecho = false;
                const nums = MKJ.shuffle([...Array(nv.max).keys()].map(x => x + 1).filter(x => x !== objetivo)).slice(0, nv.peces - 1).concat(objetivo);
                MKJ.shuffle(nums);
                const card = document.getElementById("card");
                card.innerHTML = `<p class="task">Pesca el número <span class="big">${objetivo}</span> <button class="again" id="oir" type="button">🔊</button></p>
                    <div class="pond" id="pond"></div>
                    <div class="bucket" data-drop="balde">🪣<small>Balde</small></div>`;
                const pond = document.getElementById("pond"), W = pond.clientWidth, filas = nums.length;
                nums.forEach((n, k) => {
                    const f = document.createElement("div");
                    const izq = Math.random() < .5;
                    f.className = "fish"; f.dataset.n = n;
                    f.style.cssText = `top:${12 + k * ((pond.clientHeight - 110) / Math.max(1, filas - 1))}px;left:${R(10, Math.max(12, W - 120))}px;--t:${(2.5 + Math.random() * 2.5).toFixed(2)}s;--dx:${R(20, 60)}px;--f:${izq ? 1 : -1};animation-delay:-${Math.random() * 3}s`;
                    f.innerHTML = `<span class="e">${P(PECES)}</span><b>${n}</b>`;
                    pond.appendChild(f);
                    MKP.arrastrar(f, { alTocar: () => intentar(f, listo), alSoltar: d => { intentar(f, listo); return false; } });
                });
                document.getElementById("oir").onclick = () => MKP.decir("Pesca el número " + objetivo);
                MKP.decir("Pesca el número " + objetivo);
            }
        });
        function intentar(f, listo) {
            if (hecho) return;
            const n = +f.dataset.n;
            if (n === objetivo) {
                hecho = true; f.classList.add("pescado"); f.dataset.bloqueado = 1;
                MKJ.sound("ok"); MKP.aviso("¡" + n + "!", true); MKP.decir("¡Muy bien! Es el " + n);
                listo(primera);
            } else {
                primera = false; f.classList.remove("mal"); void f.offsetWidth; f.classList.add("mal");
                MKJ.sound("error"); MKP.decir("Ese es el " + n + ". Busca el " + objetivo);
            }
        }
        window.__juego = { get objetivo() { return objetivo; }, J };
