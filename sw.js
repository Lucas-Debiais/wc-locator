// sw.js
self.addEventListener('install', e => {
    e.waitUntil(
        // Après l'installation du service worker,
        // ouvre un nouveau cache
        caches.open('mon-cache-pwa').then(cache => {
            // Ajoute toutes les URLs des éléments à mettre en cache
            return cache.addAll([
                '/',
                '/index.html',
                '/img/icon.svg',
                '/assets/',
            ])
                .then(() => self.skipWaiting());
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});