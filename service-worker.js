const CACHE_NAME = 'mariekids-v1';

const ARCHIVOS_CACHE = [
  '/',
  '/ingles.html',
  '/ajedrez.html',
  '/css/estilos.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ARCHIVOS_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
