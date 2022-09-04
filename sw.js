// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

// if (workbox) {
//     console.log(`Yay! Workbox is loaded 🎉`);
//     // make some changes to this function
//     workbox.precaching.precacheAndRoute([
//         'self.__WB_MANIFEST'
//     ]); 
    // workbox.routing.registerRoute(
    //     /(.*).(?:png|gif|jpg)/,
    //     workbox.strategies.networkFirst({
    //       cacheName: 'images-cache',
    //       plugins: [
    //         new workbox.expiration.Plugin({
    //           maxEntries: 50,
    //           maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
    //         })
    //       ]
    //     })
    // );

    // workbox.routing.registerRoute(
    //     /(.*).html/,
    //     workbox.strategies.networkFirst({
    //       cacheName: 'html-cache',
    //       plugins: [
    //         new workbox.expiration.Plugin({
    //           maxEntries: 50,
    //           maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
    //         })
    //       ]
    //     })
    // );

    // workbox.routing.registerRoute(
    //     /(.*).js/,
    //     workbox.strategies.cacheFirst({
    //       cacheName: 'code-cache',
    //       plugins: [
    //         new workbox.expiration.Plugin({
    //           maxEntries: 50,
    //           maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
    //         })
    //       ]
    //     })
    // );

    // workbox.routing.registerRoute(
    //     /(.*).css/,
    //     workbox.strategies.cacheFirst({
    //       cacheName: 'css-cache',
    //       plugins: [
    //         new workbox.expiration.Plugin({
    //           maxEntries: 50,
    //           maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
    //         })
    //       ]
    //     })
    // );

    // const htmlHandler = workbox.strategies.networkFirst({
    //     cacheName: 'html-cache',
    //     plugins: [
    //       new workbox.expiration.Plugin({
    //         maxEntries: 50,
    //       })
    //     ]
    // });
      
    // workbox.routing.registerRoute(/\.html/, args => {
    //     return htmlHandler.handle(args);
    // });

    // workbox.routing.registerRoute(/(.*)\.(?:html)/, args => {
    //     return htmlHandler.handle(args).then(response => {
    //       if (!response) {
    //         return caches.match('pages/offline.html');
    //       } else if (response.status === 404) {
    //         return caches.match('pages/404.html');
    //       }
    //       return response;
    //     });
    // });
    
// } else {
//     console.log(`Boo! Workbox didn't load 😬`);
// }








// importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js')
// // Note: Ignore the error that Glitch raises about workbox being undefined.
// if (workbox) {
//     console.log(self);
//     console.log(`Yay! Workbox is loaded 🎉`);
//     // make some changes to this function
//     workbox.precaching.precacheAndRoute([
//         'self.__WB_MANIFEST'
//     ]); 
//     // // To avoid async issues, we load strategies before we call it in the event listener
//     // workbox.loadModule('workbox-core')
//     // workbox.loadModule('workbox-routing')
//     // workbox.loadModule('workbox-cacheable-response')
//     // workbox.loadModule('workbox-strategies')
//     // workbox.loadModule('workbox-expiration')
//     // pageCache(); 
//     // googleFontsCache(); 
//     // staticResourceCache();
//     // imageCache();
//     // offlineFallback();

//     // const cacheNames = workbox.core.cacheNames
//     // const { registerRoute, setCatchHandler, setDefaultHandler } = workbox.routing
//     // const { CacheableResponsePlugin } = workbox.cacheableResponse
//     // const {
//     // NetworkFirst,
//     // StaleWhileRevalidate,
//     // NetworkOnly,
//     // } = workbox.strategies
//     // const { ExpirationPlugin } = workbox.expiration

//     // const cacheName = cacheNames.runtime
// }

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
    // make some changes to this function
    workbox.precaching.precacheAndRoute([
        'self.__WB_MANIFEST'
    ]); 
}
import {
    pageCache,
    imageCache,
    staticResourceCache,
    googleFontsCache,
    offlineFallback,
    } from 'workbox-recipes';
    
pageCache();

googleFontsCache();

staticResourceCache();

imageCache();

offlineFallback();
