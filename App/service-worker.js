self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('motion-power-sphere-v1').then(cache => {
            return cache.addAll([
                '/Install/app/',
                '/Install/app/index.html'
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
