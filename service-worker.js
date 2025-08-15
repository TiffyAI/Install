self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('mps-installer-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/click.wav',
        '/manifest.json'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== 'mps-installer-v1').map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
