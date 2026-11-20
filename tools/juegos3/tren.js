        /* 🚂 EL TREN ORDENADO: secuencia numérica. Arrastra cada vagón a su lugar en el tren. */
        const R = MKJ.rnd;
        const COLORES = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6", "#f43f5e"];
        let nums = [], puestos = 0, primera = true, listoFn = null;
        const J = MKP.juego({
            clave: "tren3a", rondas: 4, icono: "🚂", pausa: 2600,
            niveles: [
                { n: 1, name: "Nivel 1", desc: "Ordena del 1 al 5 (con ayuda)", cls: "lv1", desde: [1, 1], largo: 5, guia: "todo" },
                { n: 2, name: "Nivel 2", desc: "Ordena del 1 al 6", cls: "lv2", desde: [1, 1], largo: 6, guia: "primero" },
                { n: 3, name: "Nivel 3", desc: "Ordena números hasta el 10", cls: "lv3", desde: [1, 5], largo: 6, guia: "primero" }
            ],
            niveles5: [
                { n: 1, name: "Nivel 1", desc: "Ordena números hasta 50", cls: "lv1", desde: [10, 40], largo: 6, guia: "primero" },
                { n: 2, name: "Nivel 2", desc: "Cuenta de 2 en 2", cls: "lv2", desde: [0, 10], largo: 6, guia: "primero", paso: 2 },
                { n: 3, name: "Nivel 3", desc: "De 5 en 5 y de 10 en 10", cls: "lv3", desde: [0, 0], largo: 6, guia: "primero", paso: [5, 10] }
            ],
            niveles4: [
                { n: 1, name: "Nivel 1", desc: "Ordena números hasta el 10", cls: "lv1", desde: [1, 5], largo: 6, guia: "primero" },
                { n: 2, name: "Nivel 2", desc: "Ordena números hasta el 20", cls: "lv2", desde: [5, 15], largo: 6, guia: "primero" },
                { n: 3, name: "Nivel 3", desc: "¿Qué vagones faltan? (hasta 20)", cls: "lv3", desde: [1, 13], largo: 8, guia: "no", faltan: 3 }
            ],
            ronda(nv, i, listo) {
                const a = R(nv.desde[0], nv.desde[1]);
                const paso = Array.isArray(nv.paso) ? MKJ.pick(nv.paso) : nv.paso || 1, a1 = paso > 2 ? paso * R(0, 2) : paso === 2 ? 2 * R(0, 5) : a;
                nums = Array.from({ length: nv.largo }, (_, k) => a1 + k * paso); puestos = 0; primera = true; listoFn = listo;
                const card = document.getElementById("card");
                card.innerHTML = `<p class="task">Ordena el tren: ${nums[0]}, ${nums[1]}, ${nums[2]}… <button class="again" id="oir" type="button">🔊</button></p>
                    <p class="sub">Arrastra cada vagón a su lugar.</p>
                    <div class="rail${nums.length > 6 ? " l8" : ""}" id="rail"><span class="loco">🚂</span>${nums.map((n, k) => `<div class="slot" data-drop="slot" data-n="${n}">${nv.guia === "todo" || k === 0 ? n : ""}</div>`).join("")}</div>
                    <div class="yard" id="yard"></div>`;
                const yard = document.getElementById("yard");
                const falta = nv.faltan ? MKJ.shuffle(nums.slice(1)).slice(0, nv.faltan) : nums;
                if (nv.faltan) nums.forEach(n => { if (!falta.includes(n)) { const sl = card.querySelector(`.slot[data-n="${n}"]`); sl.classList.add("lleno"); sl.textContent = ""; sl.innerHTML = `<div class="wagon" style="background:${COLORES[nums.indexOf(n) % COLORES.length]}">${n}</div>`; puestos++; } });
                MKJ.shuffle(falta.slice()).forEach(n => {
                    const w = document.createElement("div"); w.className = "wagon"; w.textContent = n; w.dataset.n = n;
                    w.style.background = COLORES[nums.indexOf(n) % COLORES.length];
                    yard.appendChild(w);
                    MKP.arrastrar(w, { alTocar: () => MKP.contar(n), alSoltar: d => poner(w, d) });
                });
                document.getElementById("oir").onclick = () => MKP.decir("Ordena el tren. " + nums.slice(0, 3).join(", "));
                MKP.decir("Ordena el tren: " + nums.slice(0, 3).join(", ") + "…");
            }
        });
        function poner(w, slot) {
            if (slot.classList.contains("lleno")) return false;
            if (+slot.dataset.n !== +w.dataset.n) {
                primera = false; MKJ.sound("error"); MKP.decir("El " + w.dataset.n + " va en otro lugar");
                w.classList.remove("mal"); void w.offsetWidth; w.classList.add("mal");
                return false;
            }
            slot.textContent = ""; slot.classList.add("lleno"); w.dataset.bloqueado = 1; w.style.opacity = ""; slot.appendChild(w);
            puestos++; MKJ.sound("moneda"); MKP.contar(+w.dataset.n);
            if (puestos === nums.length) {
                setTimeout(() => {
                    MKJ.sound("gana"); MKP.decir("¡Chu chu! " + nums.join(", "));
                    document.getElementById("rail").classList.add("va");
                    listoFn(primera);
                }, 600);
            }
            return true;
        }
        window.__juego = { get nums() { return nums; }, poner, J };
