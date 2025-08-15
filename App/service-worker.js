self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('motion-power-sphere-v1').then(cache => {
            return cache.addAll([
                '/Motion-Power-Sphere/app/',
                '/Motion-Power-Sphere/app/index.html'
            ]);
        })
    );
    self.skipWaiting();
});
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(res => res || fetch(e.request))
    );
});
