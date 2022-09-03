importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
    // make some changes to this function
    workbox.precaching.precacheAndRoute([
        'self.__WB_MANIFEST'
    ]); 
    workbox.routing.registerRoute(
        /(.*).(?:png|gif|jpg)/,
        workbox.strategies.networkFirst({
          cacheName: 'images-cache',
          plugins: [
            new workbox.expiration.Plugin({
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            })
          ]
        })
    );

    workbox.routing.registerRoute(
        /(.*).html/,
        workbox.strategies.networkFirst({
          cacheName: 'html-cache',
          plugins: [
            new workbox.expiration.Plugin({
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            })
          ]
        })
    );

    workbox.routing.registerRoute(
        /(.*).js/,
        workbox.strategies.cacheFirst({
          cacheName: 'code-cache',
          plugins: [
            new workbox.expiration.Plugin({
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            })
          ]
        })
    );

    workbox.routing.registerRoute(
        /(.*).css/,
        workbox.strategies.cacheFirst({
          cacheName: 'css-cache',
          plugins: [
            new workbox.expiration.Plugin({
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            })
          ]
        })
    );

    const htmlHandler = workbox.strategies.networkFirst({
        cacheName: 'html-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 50,
          })
        ]
    });
      
    workbox.routing.registerRoute(/\.html/, args => {
        return htmlHandler.handle(args);
    });

    workbox.routing.registerRoute(/(.*)\.(?:html)/, args => {
        return htmlHandler.handle(args).then(response => {
          if (!response) {
            return caches.match('pages/offline.html');
          } else if (response.status === 404) {
            return caches.match('pages/404.html');
          }
          return response;
        });
    });
    
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}