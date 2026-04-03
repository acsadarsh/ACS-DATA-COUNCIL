const CACHE_NAME = 'acs-council-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json'
];

// Install Service Worker aur files cache karo
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
    );
});

// Offline load karne ke liye fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            // Agar cache mein hai toh wahi se return karo, warna internet se fetch karo
            return response || fetch(event.request);
        })
    );
});

// Purane cache ko delete karne ke liye (Update ke time)
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
