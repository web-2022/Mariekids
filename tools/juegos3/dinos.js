        /* 🦖 DINOSAURIOS POR TAMAÑO: seriación. Ordena de pequeño a grande (o al revés). */
        const TAM = [22, 32, 44, 56, 70];
        let orden = [], puestos = 0, primera = true, listoFn = null, alReves = false;
        MKP.juego({
            clave: "dinos3a", rondas: 5, icono: "🦖",
            niveles: [
                { n: 1, name: "Nivel 1", desc: "3 dinos: de pequeño a grande", cls: "lv1", k: 3, reves: false },
                { n: 2, name: "Nivel 2", desc: "4 dinos: de pequeño a grande", cls: "lv2", k: 4, reves: false },
                { n: 3, name: "Nivel 3", desc: "5 dinos: también de grande a pequeño", cls: "lv3", k: 5, reves: true }
            ],
            ronda(nv, i, listo) {
                primera = true; listoFn = listo; puestos = 0; alReves = nv.reves && i % 2 === 1;
                const tams = nv.k === 5 ? TAM : nv.k === 4 ? [22, 36, 52, 70] : [24, 44, 70];
                orden = alReves ? tams.slice().reverse() : tams.slice();
                const e = MKJ.pick(["🦕", "🦖"]);
                document.getElementById("card").innerHTML = `<p class="task">Ordena de <span class="big">${alReves ? "grande" : "pequeño"}</span> a ${alReves ? "pequeño" : "grande"} <button class="again" id="oir" type="button">🔊</button></p>
                    <div class="fila">${orden.map((t, k) => `<div class="hueco" data-drop="hueco" data-k="${k}"></div>`).join("")}</div>
                    <p class="flecha">${alReves ? "GRANDE ➡️ pequeño" : "pequeño ➡️ GRANDE"}</p>
                    <div class="pasto" id="pasto">${MKJ.shuffle(tams.slice()).map(t => `<span class="dino" data-t="${t}" style="font-size:${t + 18}px">${e}</span>`).join("")}</div>`;
                document.querySelectorAll(".dino").forEach(d => MKP.arrastrar(d, { alSoltar: h => poner(d, h) }));
                const txt = alReves ? "Ordena los dinosaurios de grande a pequeño" : "Ordena los dinosaurios de pequeño a grande";
                document.getElementById("oir").onclick = () => MKP.decir(txt); MKP.decir(txt);
            }
        });
        function poner(d, h) {
            if (h.classList.contains("lleno")) return false;
            if (orden[+h.dataset.k] !== +d.dataset.t) {
                primera = false; MKJ.sound("error"); d.classList.remove("mal"); void d.offsetWidth; d.classList.add("mal");
                MKP.decir(+h.dataset.k === 0 ? (alReves ? "Primero va el más grande" : "Primero va el más pequeño") : "Ese no va ahí"); return false;
            }
            h.classList.add("lleno"); d.dataset.bloqueado = 1; d.style.opacity = ""; h.appendChild(d); puestos++; MKJ.sound("moneda");
            if (puestos === orden.length) { MKJ.sound("ok"); MKP.aviso("¡Rooar!", true); MKP.decir("¡Muy bien! Están en orden"); listoFn(primera); }
            return true;
        }
        window.__juego = { get orden() { return orden; } };
