self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('findbus').then(function(cache) {
      return cache.addAll([
        '/',
        '/?homescreen=1',
        '/index.html',
        '/index.html?homescreen=1',
        '/components/item.html',
        '/components/main.html',
        '/assets/javascripts/application.js',
        '/assets/stylesheets/application.css',
        '/assets/fonts/MaterialIcons-Regular.eot',
        '/assets/fonts/MaterialIcons-Regular.svg',
        '/assets/fonts/MaterialIcons-Regular.ttf',
        '/assets/fonts/MaterialIcons-Regular.woff',
        '/assets/fonts/MaterialIcons-Regular.woff2'
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
