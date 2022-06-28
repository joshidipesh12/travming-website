try {
  const PRECACHE = 'precache-v2';
  const RUNTIME = 'runtime';

  // A list of local resources we always want to be cached.
  const PRECACHE_URLS = [
    'https://images.pexels.com/photos/2901215/pexels-photo-2901215.jpeg',
    'https://images.pexels.com/photos/531602/pexels-photo-531602.jpeg',
    'https://images.pexels.com/photos/2265880/pexels-photo-2265880.jpeg',
    'https://images.pexels.com/photos/1542620/pexels-photo-1542620.jpeg',
    'https://images.pexels.com/photos/2507031/pexels-photo-2507031.jpeg',
    'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg',
    'https://images.pexels.com/photos/591383/pexels-photo-591383.jpeg',
    'https://images.pexels.com/photos/1802255/pexels-photo-1802255.jpeg',
    'https://images.pexels.com/photos/2516406/pexels-photo-2516406.jpeg',
    'https://images.pexels.com/photos/951539/pexels-photo-951539.jpeg',
    'https://images.pexels.com/photos/9510830/pexels-photo-9510830.jpeg',
  ];

  // The install handler takes care of precaching the resources we always need.
  self.addEventListener('install', event => {
    console.log('installing sw');
    event.waitUntil(
      caches
        .open(PRECACHE)
        .then(cache => cache.addAll(PRECACHE_URLS))
        .then(() => self.skipWaiting()),
    );
  });
  // The activate handler takes care of cleaning up old caches.
  self.addEventListener('activate', event => {
    const currentCaches = [PRECACHE, RUNTIME];
    console.log('activate cache');
    event.waitUntil(
      caches
        .keys()
        .then(cacheNames => {
          return cacheNames.filter(
            cacheName => !currentCaches.includes(cacheName),
          );
        })
        .then(cachesToDelete => {
          console.log('deleting old cache');
          return Promise.all(
            cachesToDelete.map(cacheToDelete => {
              return caches.delete(cacheToDelete);
            }),
          );
        })
        .then(() => self.clients.claim()),
    );
  });

  // The fetch handler serves responses for same-origin resources from a cache.
  // If no response is found, it populates the runtime cache with the response
  // from the network before returning it to the page.
  self.addEventListener('fetch', event => {
    // Skip cross-origin requests, like those for Google Analytics.
    // if (event.request.url.startsWith(self.location.origin)) {
    //   event.respondWith(
    //     caches.match(event.request).then(cachedResponse => {
    //       if (cachedResponse) {
    //         return cachedResponse;
    //       }
    //       return caches.open(RUNTIME).then(cache => {
    //         return fetch(event.request, {}).then(response => {
    //           // Put a copy of the response in the runtime cache.
    //           return cache.put(event.request, response.clone()).then(() => {
    //             return response;
    //           });
    //         });
    //       });
    //     }),
    //   );
    // }
  });
} catch (e) {
  console.log('Error: ', e);
}
