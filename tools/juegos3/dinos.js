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
            niveles4: [
                { n: 1, name: "Nivel 1", desc: "5 dinos: pequeño ↔ grande", cls: "lv1", k: 5, reves: true },
                { n: 2, name: "Nivel 2", desc: "Torres: de menos a más bloques", cls: "lv2", k: 4, reves: true, tipo: "torre" },
                { n: 3, name: "Nivel 3", desc: "Números: de menor a mayor (hasta 20)", cls: "lv3", k: 5, reves: true, tipo: "num" }
            ],
            ronda(nv, i, listo) {
                primera = true; listoFn = listo; puestos = 0; alReves = nv.reves && i % 2 === 1;
                let tams = nv.k === 5 ? TAM : nv.k === 4 ? [22, 36, 52, 70] : [24, 44, 70];
                if (nv.tipo === "torre") tams = MKJ.shuffle([1, 2, 3, 4, 5, 6, 7]).slice(0, nv.k).sort((a, b) => a - b);
                if (nv.tipo === "num") tams = MKJ.shuffle([...Array(20).keys()].map(x => x + 1)).slice(0, nv.k).sort((a, b) => a - b);
                orden = alReves ? tams.slice().reverse() : tams.slice();
                const e = MKJ.pick(["🦕", "🦖"]);
                document.getElementById("card").innerHTML = `<p class="task">${nv.tipo === "num" ? `Ordena de <span class="big">${alReves ? "mayor" : "menor"}</span> a ${alReves ? "menor" : "mayor"}` : nv.tipo === "torre" ? `Ordena de <span class="big">${alReves ? "más" : "menos"}</span> a ${alReves ? "menos" : "más"} bloques` : `Ordena de <span class="big">${alReves ? "grande" : "pequeño"}</span> a ${alReves ? "pequeño" : "grande"}`} <button class="again" id="oir" type="button">🔊</button></p>
                    <div class="fila">${orden.map((t, k) => `<div class="hueco" data-drop="hueco" data-k="${k}"></div>`).join("")}</div>
                    <p class="flecha">${nv.tipo ? (alReves ? "MÁS ➡️ menos" : "menos ➡️ MÁS") : alReves ? "GRANDE ➡️ pequeño" : "pequeño ➡️ GRANDE"}</p>
                    <div class="pasto" id="pasto">${MKJ.shuffle(tams.slice()).map(t => nv.tipo === "torre" ? `<span class="dino torre" data-t="${t}">${"<i></i>".repeat(t)}</span>` : nv.tipo === "num" ? `<span class="dino numc" data-t="${t}">${t}</span>` : `<span class="dino" data-t="${t}" style="font-size:${t + 18}px">${e}</span>`).join("")}</div>`;
                document.querySelectorAll(".dino").forEach(d => MKP.arrastrar(d, { alSoltar: h => poner(d, h) }));
                const txt = nv.tipo === "num" ? (alReves ? "Ordena los números de mayor a menor" : "Ordena los números de menor a mayor") : nv.tipo === "torre" ? (alReves ? "Ordena las torres de más a menos bloques" : "Ordena las torres de menos a más bloques") : alReves ? "Ordena los dinosaurios de grande a pequeño" : "Ordena los dinosaurios de pequeño a grande";
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
