self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('findbus').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/index.html?homescreen=1',
        '/?homescreen=1',
        '/assets/stylesheets/application.css',
        '/assets/javascripts/application.js'
      ]).then(function() {
        return self.skipWaiting();
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request, { ignoreSearch: true }).then(function(response) {
    return response || fetch(event.request);
  }));
});
