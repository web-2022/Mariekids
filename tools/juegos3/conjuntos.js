        /* 🧺 CONJUNTOS: pertenencia, clasificación, intersección (diagramas) e intruso. Temas 1–6. */
        const P = MKJ.pick;
        const COSAS = [
            ["🍎", { fruta: 1, rojo: 1 }], ["🍓", { fruta: 1, rojo: 1 }], ["🍌", { fruta: 1, amarillo: 1 }], ["🍋", { fruta: 1, amarillo: 1 }], ["🍇", { fruta: 1 }],
            ["🚗", { vehiculo: 1, rojo: 1 }], ["🚌", { vehiculo: 1, amarillo: 1 }], ["🚲", { vehiculo: 1 }], ["✈️", { vehiculo: 1 }],
            ["🐶", { animal: 1 }], ["🐱", { animal: 1 }], ["🐤", { animal: 1, amarillo: 1 }], ["🐞", { animal: 1, rojo: 1 }], ["🦊", { animal: 1 }],
            ["⚽", { juguete: 1 }], ["🧸", { juguete: 1 }], ["🪀", { juguete: 1, rojo: 1 }], ["🎈", { juguete: 1, rojo: 1 }]
        ];
        const NOM = { fruta: "Frutas", vehiculo: "Vehículos", animal: "Animales", juguete: "Juguetes", rojo: "Cosas rojas", amarillo: "Cosas amarillas" };
        let quedan = 0, primera = true, listoFn = null, zonas = [];
        const NIV = [
            { n: 1, name: "Nivel 1", desc: "¿Pertenece al conjunto?", cls: "lv1", modo: "uno" },
            { n: 2, name: "Nivel 2", desc: "Clasifica en dos conjuntos", cls: "lv2", modo: "dos" },
            { n: 3, name: "Nivel 3", desc: "Intersección: ¡los que están en los dos!", cls: "lv3", modo: "inter" }
        ];
        MKP.juego({
            clave: "conjuntos1p", rondas: 4, icono: "🧺", niveles: NIV,
            ronda(nv, i, listo) {
                primera = true; listoFn = listo;
                if (i === 3) { intruso(); return; }
                const tipos = ["fruta", "vehiculo", "animal", "juguete"];
                let A, B;
                if (nv.modo === "inter") { A = P(tipos); B = P(["rojo", "amarillo"]); }
                else { [A, B] = MKJ.shuffle(tipos.slice()).slice(0, 2); }
                const en = (o, k) => !!o[1][k];
                if (nv.modo === "uno") zonas = [{ t: NOM[A], c: "#3b82f6", f: o => en(o, A) }, { t: "No pertenece", c: "#94a3b8", f: o => !en(o, A), fuera: 1 }];
                else if (nv.modo === "dos") zonas = [{ t: NOM[A], c: "#3b82f6", f: o => en(o, A) }, { t: NOM[B], c: "#ef4444", f: o => en(o, B) }, { t: "Ninguno", c: "#94a3b8", f: o => !en(o, A) && !en(o, B), fuera: 1 }];
                else zonas = [{ t: "Solo " + NOM[A].toLowerCase(), c: "#3b82f6", f: o => en(o, A) && !en(o, B) }, { t: "¡Los dos!", c: "#a855f7", f: o => en(o, A) && en(o, B) }, { t: "Solo " + NOM[B].toLowerCase(), c: "#ef4444", f: o => en(o, B) && !en(o, A) }];
                let items = MKJ.shuffle(COSAS.filter(o => zonas.some(z => z.f(o)))).slice(0, 7);
                zonas.forEach(z => { if (!items.some(z.f)) { const x = COSAS.find(z.f); if (x) items[MKJ.rnd(0, items.length - 1)] = x; } });
                items = [...new Set(items)]; quedan = items.length;
                document.getElementById("card").innerHTML = `<p class="task">${nv.modo === "inter" ? `${NOM[A]} y ${NOM[B].toLowerCase()}` : "Pon cada cosa en su conjunto"} <button class="again" id="oir" type="button">🔊</button></p>
                    <p class="sub">Arrastra cada dibujo a su lugar.</p>
                    <div class="zonas" style="--n:${zonas.length}">${zonas.map((z, k) => `<div class="zona${z.fuera ? " fuera" : ""}" data-drop="zona" data-k="${k}" style="--c:${z.c}"><h3>${z.t}</h3><div class="dentro"></div></div>`).join("")}</div>
                    <div class="bandeja">${MKJ.shuffle(items.slice()).map(o => `<span class="item" data-i="${COSAS.indexOf(o)}">${o[0]}</span>`).join("")}</div>`;
                document.querySelectorAll(".item").forEach(it => MKP.arrastrar(it, { alSoltar: d => poner(it, d) }));
                const t = nv.modo === "inter" ? `En el medio van los que son ${NOM[A].toLowerCase()} y también ${NOM[B].toLowerCase()}` : "Pon cada cosa en su conjunto";
                document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t);
            }
        });
        function poner(it, d) {
            const o = COSAS[+it.dataset.i], z = zonas[+d.dataset.k];
            if (!z.f(o)) { primera = false; MKJ.sound("error"); it.classList.remove("mal"); void it.offsetWidth; it.classList.add("mal"); MKP.decir("Ahí no va. Piensa: ¿a qué conjunto pertenece?"); return false; }
            d.querySelector(".dentro").insertAdjacentHTML("beforeend", `<span>${o[0]}</span>`); it.remove(); MKJ.sound("moneda"); quedan--;
            if (!quedan) { MKJ.sound("ok"); MKP.aviso("¡Muy bien!", true); MKP.decir("¡Muy bien! Todo está en su conjunto"); listoFn(primera); }
            return true;
        }
        function intruso() {
            const tipo = P(["fruta", "vehiculo", "animal", "juguete"]);
            const grupo = MKJ.shuffle(COSAS.filter(o => o[1][tipo])).slice(0, 3), otro = P(COSAS.filter(o => !o[1][tipo]));
            const ops = MKJ.shuffle([...grupo, otro]);
            document.getElementById("card").innerHTML = `<p class="task">¿Cuál <span class="big">NO</span> pertenece? <button class="again" id="oir" type="button">🔊</button></p>
                <div class="answers" style="grid-template-columns:repeat(4,1fr)">${ops.map(o => `<button class="answer" type="button" style="font-size:44px">${o[0]}</button>`).join("")}</div>`;
            document.querySelectorAll(".answer").forEach(b => b.onclick = () => {
                if (b.dataset.done) return;
                if (b.textContent === otro[0]) { document.querySelectorAll(".answer").forEach(x => x.dataset.done = 1); b.classList.add("right"); MKJ.sound("ok"); MKP.decir("¡Muy bien! Los otros son " + NOM[tipo].toLowerCase()); listoFn(primera); }
                else { primera = false; b.classList.add("wrong"); MKJ.sound("error"); MKP.decir("Mira bien: ¿qué tienen en común?"); }
            });
            const t = "¿Cuál no pertenece al grupo?"; document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t);
        }
