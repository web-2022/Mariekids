/* =========================================================
   SERVICE WORKER — MVG LEARNING
   Ubicación: /service-worker.js

   IMPORTANTE:
   Cada vez que publiques cambios importantes en HTML, CSS
   o JavaScript, aumenta el número de CACHE_VERSION:
   v1 → v2 → v3...
========================================================= */

const CACHE_VERSION = "v17";
const CACHE_PREFIX = "mvg-learning";
const STATIC_CACHE = `${CACHE_PREFIX}-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `${CACHE_PREFIX}-runtime-${CACHE_VERSION}`;

/*
   Archivos fundamentales que estarán disponibles desde
   la primera instalación.

   No es necesario colocar aquí todas las páginas de grados.
   Las demás páginas se guardarán cuando el usuario las visite.
*/
const APP_SHELL = [
    "./",
    "./index.html",
    "./manifest.json",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];

/* =========================================================
   INSTALACIÓN
========================================================= */

self.addEventListener("install", event => {
    event.waitUntil(
        caches
            .open(STATIC_CACHE)
            .then(cache => {
                console.info("Guardando archivos principales de MVG Learning...");
                return cache.addAll(APP_SHELL);
            })
            .then(() => {
                /*
                   Permite que la nueva versión pase inmediatamente
                   al estado de espera.
                */
                return self.skipWaiting();
            })
            .catch(error => {
                console.error(
                    "No se pudieron guardar los archivos iniciales:",
                    error
                );
            })
    );
});

/* =========================================================
   ACTIVACIÓN
   Elimina cachés correspondientes a versiones anteriores.
========================================================= */

self.addEventListener("activate", event => {
    event.waitUntil(
        caches
            .keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(cacheName => {
                            const perteneceAMVG =
                                cacheName.startsWith(CACHE_PREFIX);

                            const esCacheActual =
                                cacheName === STATIC_CACHE ||
                                cacheName === RUNTIME_CACHE;

                            return perteneceAMVG && !esCacheActual;
                        })
                        .map(cacheName => {
                            console.info(
                                "Eliminando caché anterior:",
                                cacheName
                            );

                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                /*
                   La nueva versión controla inmediatamente
                   las páginas abiertas de la aplicación.
                */
                return self.clients.claim();
            })
    );
});

/* =========================================================
   INTERCEPTAR SOLICITUDES
========================================================= */

self.addEventListener("fetch", event => {
    const request = event.request;

    /*
       El Service Worker solo maneja solicitudes GET.
       No interfiere con formularios, pagos o peticiones POST.
    */
    if (request.method !== "GET") {
        return;
    }

    const url = new URL(request.url);

    /*
       Evita administrar extensiones internas del navegador.
    */
    if (
        url.protocol !== "http:" &&
        url.protocol !== "https:"
    ) {
        return;
    }

    /*
       Para páginas HTML se utiliza Network First:
       1. Intenta obtener la versión más reciente.
       2. La guarda en caché.
       3. Si no hay internet, muestra la versión guardada.
    */
    if (request.mode === "navigate") {
        event.respondWith(networkFirstForPages(request));
        return;
    }

    /*
       Para archivos propios como CSS, JS, imágenes y audio,
       se utiliza Stale While Revalidate:
       1. Muestra rápidamente la copia guardada.
       2. Busca una versión nueva en segundo plano.
    */
    if (url.origin === self.location.origin) {
        event.respondWith(staleWhileRevalidate(request));
        return;
    }

    /*
       Los recursos externos, por ejemplo Google Fonts,
       se buscan primero en internet y después en caché.
    */
    event.respondWith(networkFirstForExternalResources(request));
});

/* =========================================================
   ESTRATEGIA PARA PÁGINAS HTML
========================================================= */

async function networkFirstForPages(request) {
    const cache = await caches.open(RUNTIME_CACHE);

    try {
        const networkResponse = await fetch(request);

        if (isValidResponse(networkResponse)) {
            await cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.warn(
            "Sin conexión. Buscando página en caché:",
            request.url
        );

        const cachedResponse = await caches.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        /*
           Si una página interna nunca fue visitada y no está
           guardada, se muestra el menú principal.
        */
        const fallback =
            await caches.match("./index.html") ||
            await caches.match("./");

        if (fallback) {
            return fallback;
        }

        return new Response(
            `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                >
                <title>MVG Learning sin conexión</title>

                <style>
                    body {
                        min-height: 100vh;
                        margin: 0;
                        padding: 24px;
                        display: grid;
                        place-items: center;
                        box-sizing: border-box;
                        font-family: Arial, sans-serif;
                        text-align: center;
                        color: #17365d;
                        background: #f2f8ff;
                    }

                    .offline-card {
                        width: min(100%, 480px);
                        padding: 32px 24px;
                        border-radius: 24px;
                        background: white;
                        box-shadow: 0 12px 35px rgba(23, 54, 93, 0.15);
                    }

                    h1 {
                        margin-top: 0;
                        color: #0b73ff;
                    }

                    button {
                        min-height: 52px;
                        padding: 10px 22px;
                        border: 0;
                        border-radius: 15px;
                        color: white;
                        font-size: 17px;
                        font-weight: bold;
                        cursor: pointer;
                        background: #58cc02;
                    }
                </style>
            </head>

            <body>
                <main class="offline-card">
                    <div style="font-size: 70px">📡</div>

                    <h1>Sin conexión a internet</h1>

                    <p>
                        Esta página todavía no está guardada en el dispositivo.
                        Conéctate a internet y vuelve a intentarlo.
                    </p>

                    <button onclick="window.location.reload()">
                        Reintentar
                    </button>
                </main>
            </body>
            </html>
            `,
            {
                status: 503,
                headers: {
                    "Content-Type": "text/html; charset=UTF-8"
                }
            }
        );
    }
}

/* =========================================================
   ESTRATEGIA PARA ARCHIVOS LOCALES
========================================================= */

async function staleWhileRevalidate(request) {
    const cache = await caches.open(RUNTIME_CACHE);
    const cachedResponse = await cache.match(request);

    const networkPromise = fetch(request)
        .then(async networkResponse => {
            if (isValidResponse(networkResponse)) {
                await cache.put(request, networkResponse.clone());
            }

            return networkResponse;
        })
        .catch(error => {
            console.warn(
                "No se pudo actualizar el recurso:",
                request.url,
                error
            );

            return null;
        });

    /*
       Si ya existe una copia, se muestra inmediatamente.
       Mientras tanto se actualiza la caché.
    */
    if (cachedResponse) {
        eventWaitUntilSafe(networkPromise);
        return cachedResponse;
    }

    /*
       Si no existe una copia, espera la respuesta de internet.
    */
    const networkResponse = await networkPromise;

    if (networkResponse) {
        return networkResponse;
    }

    return new Response("", {
        status: 504,
        statusText: "Recurso no disponible sin conexión"
    });
}

/* =========================================================
   ESTRATEGIA PARA RECURSOS EXTERNOS
========================================================= */

async function networkFirstForExternalResources(request) {
    const cache = await caches.open(RUNTIME_CACHE);

    try {
        const networkResponse = await fetch(request);

        if (isValidResponse(networkResponse)) {
            await cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        const cachedResponse = await cache.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        return new Response("", {
            status: 504,
            statusText: "Recurso externo no disponible"
        });
    }
}

/* =========================================================
   FUNCIONES AUXILIARES
========================================================= */

function isValidResponse(response) {
    return (
        response &&
        (
            response.status === 200 ||
            response.type === "opaque"
        )
    );
}

/*
   Evita errores cuando una actualización de caché ejecutada
   en segundo plano falla.
*/
function eventWaitUntilSafe(promise) {
    promise.catch(error => {
        console.warn("Actualización en segundo plano fallida:", error);
    });
}

/* =========================================================
   MENSAJES DESDE LA PÁGINA
   Permite activar inmediatamente una nueva versión.
========================================================= */

self.addEventListener("message", event => {
    if (event.data?.type === "SKIP_WAITING") {
        self.skipWaiting();
    }

    /*
       Permite borrar manualmente todas las cachés de MVG.
    */
    if (event.data?.type === "CLEAR_MVG_CACHES") {
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(name => name.startsWith(CACHE_PREFIX))
                        .map(name => caches.delete(name))
                );
            })
        );
    }
});