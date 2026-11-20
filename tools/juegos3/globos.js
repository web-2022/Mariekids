        /* 🎈 REVIENTA GLOBOS: reconocer números. Revienta el globo con el número que dice la voz. */
        const R = MKJ.rnd, P = MKJ.pick;
        const COL = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"];
        let frase = "", obj = 0, primera = true, hecho = false, listoFn = null;
        MKP.juego({
            clave: "globos3a", rondas: 8, icono: "🎈",
            niveles: [
                { n: 1, name: "Nivel 1", desc: "Números del 1 al 5", cls: "lv1", max: 5, g: 4, t: 9 },
                { n: 2, name: "Nivel 2", desc: "Números del 1 al 6", cls: "lv2", max: 6, g: 5, t: 8 },
                { n: 3, name: "Nivel 3", desc: "Números del 1 al 10", cls: "lv3", max: 10, g: 6, t: 7 }
            ],
            niveles4: [
                { n: 1, name: "Nivel 1", desc: "Números del 1 al 10", cls: "lv1", max: 10, g: 5, t: 8 },
                { n: 2, name: "Nivel 2", desc: "Números del 1 al 20", cls: "lv2", max: 20, g: 6, t: 8 },
                { n: 3, name: "Nivel 3", desc: "¿Qué número va antes y después?", cls: "lv3", max: 20, g: 6, t: 8, ad: true }
            ],
            ronda(nv, i, listo) {
                obj = nv.ad ? R(2, nv.max - 1) : R(1, nv.max); primera = true; hecho = false; listoFn = listo;
                const otros = MKJ.shuffle([...Array(nv.max).keys()].map(x => x + 1).filter(x => x !== obj)).slice(0, nv.g - 1);
                const nums = MKJ.shuffle(otros.concat(obj, obj));   // el correcto sale dos veces
                const despues = i % 2 === 0, ref = despues ? obj - 1 : obj + 1;
                const texto = nv.ad ? `¿Qué número va ${despues ? "después" : "antes"} del <span class="big">${despues ? obj - 1 : obj + 1}</span>?` : `Revienta el globo <span class="big">${obj}</span>`;
                frase = nv.ad ? `¿Qué número va ${despues ? "después" : "antes"} del ${despues ? obj - 1 : obj + 1}?` : "Revienta el globo " + obj;
                document.getElementById("card").innerHTML = `<p class="task">${texto} <button class="again" id="oir" type="button">🔊</button></p><div class="sky" id="sky"></div>`;
                const sky = document.getElementById("sky"), W = sky.clientWidth, paso = (W - 80) / Math.max(1, nums.length - 1);
                nums.forEach((n, k) => {
                    const g = document.createElement("div");
                    g.className = "globo"; g.dataset.n = n;
                    g.style.cssText = `left:${Math.round(k * paso)}px;--c:${P(COL)};--t:${nv.t + Math.random() * 3}s;--d:-${(Math.random() * nv.t).toFixed(2)}s`;
                    g.innerHTML = `<div class="bola">${n}</div><div class="hilo"></div>`;
                    g.addEventListener("pointerdown", e => { e.preventDefault(); tocar(g); });
                    sky.appendChild(g);
                });
                document.getElementById("oir").onclick = () => MKP.decir(frase);
                MKP.decir(frase);
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
                MKJ.sound("error"); MKP.decir("Ese es el " + n + ". " + frase);
            }
        }
        window.__juego = { get obj() { return obj; } };
