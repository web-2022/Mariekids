        /* 🌾 LA GRANJA: doble, mitad, grupos iguales, suma repetida y multiplicación. Temas 27–32. */
        const R = MKJ.rnd, P = MKJ.pick;
        let resp = 0, primera = true, listoFn = null;
        const NIV = [
            { n: 1, name: "Nivel 1", desc: "El doble y la mitad", cls: "lv1", modo: "doble" },
            { n: 2, name: "Nivel 2", desc: "Grupos iguales: 4 + 4 + 4", cls: "lv2", modo: "suma" },
            { n: 3, name: "Nivel 3", desc: "Multiplica: 3 × 4", cls: "lv3", modo: "mult" }
        ];
        MKP.juego({
            clave: "granja1p", rondas: 6, icono: "🌾", niveles: NIV,
            ronda(nv, i, listo) {
                primera = true; listoFn = listo;
                const a = P(["🐔", "🐷", "🐮", "🐑", "🐰", "🦆"]);
                let html, t;
                if (nv.modo === "doble") {
                    const n = R(1, 10), mitad = i % 2 === 1;
                    if (mitad) { resp = n; html = `<p class="task">¿Cuál es la <span class="big">MITAD</span> de ${2 * n}?</p><div class="espejo"><span>${a.repeat(n)}</span><span class="linea"></span><span>${a.repeat(n)}</span></div>`; t = `¿Cuál es la mitad de ${2 * n}?`; }
                    else { resp = 2 * n; html = `<p class="task">¿Cuál es el <span class="big">DOBLE</span> de ${n}?</p><div class="espejo"><span>${a.repeat(n)}</span><span class="linea"></span><span style="opacity:.35">${a.repeat(n)}</span></div>`; t = `¿Cuál es el doble de ${n}?`; }
                } else {
                    const g = R(2, 5), n = R(2, nv.modo === "mult" ? 6 : 5); resp = g * n;
                    html = `<p class="task">${g} corrales con ${n} ${a} cada uno. ¿Cuántos hay?</p>
                        <div class="corrales">${`<div class="corral">${a.repeat(n)}</div>`.repeat(g)}</div>
                        <div class="eq">${nv.modo === "mult" ? `${g} × ${n} = ?` : Array(g).fill(n).join(" + ") + " = ?"}</div>`;
                    t = nv.modo === "mult" ? `${g} por ${n}. ¿Cuántos hay?` : `${g} corrales con ${n} animales cada uno. ¿Cuántos hay?`;
                }
                const opts = MKJ.shuffle([...new Set([resp, resp + 1, resp - 1 || resp + 2, resp + (resp > 5 ? -2 : 3)])].slice(0, 3));
                document.getElementById("card").innerHTML = html + `<div class="answers">${opts.map(o => `<button class="answer" type="button">${o}</button>`).join("")}</div>`;
                document.querySelectorAll(".answer").forEach(b => b.onclick = () => {
                    if (b.dataset.done) return;
                    if (+b.textContent === resp) { document.querySelectorAll(".answer").forEach(x => x.dataset.done = 1); b.classList.add("right"); MKJ.sound("ok"); MKP.decir("¡Muy bien! Son " + resp); listoFn(primera); }
                    else { primera = false; b.classList.add("wrong"); MKJ.sound("error"); MKP.decir("Cuenta los grupos otra vez"); }
                });
                MKP.decir(t);
            }
        });
        window.__juego = { get resp() { return resp; } };
