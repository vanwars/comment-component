importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js");if(workbox){console.log("Yay! Workbox is loaded \u{1F389}"),workbox.precaching.precacheAndRoute(["[{"revision":"caf6541c32aee7a9ae8d52b419836a85","url":"index.html"},{"revision":"54a88bea79585cb4216be742640703c3","url":"manifest.webmanifest"}]"]),workbox.routing.registerRoute(/(.*).(?:png|gif|jpg)/,workbox.strategies.networkFirst({cacheName:"images-cache",plugins:[new workbox.expiration.Plugin({maxEntries:50,maxAgeSeconds:30*24*60*60})]})),workbox.routing.registerRoute(/(.*).html/,workbox.strategies.networkFirst({cacheName:"html-cache",plugins:[new workbox.expiration.Plugin({maxEntries:50,maxAgeSeconds:30*24*60*60})]})),workbox.routing.registerRoute(/(.*).js/,workbox.strategies.cacheFirst({cacheName:"code-cache",plugins:[new workbox.expiration.Plugin({maxEntries:50,maxAgeSeconds:30*24*60*60})]})),workbox.routing.registerRoute(/(.*).css/,workbox.strategies.cacheFirst({cacheName:"css-cache",plugins:[new workbox.expiration.Plugin({maxEntries:50,maxAgeSeconds:30*24*60*60})]}));const r=workbox.strategies.networkFirst({cacheName:"html-cache",plugins:[new workbox.expiration.Plugin({maxEntries:50})]});workbox.routing.registerRoute(/\.html/,e=>r.handle(e)),workbox.routing.registerRoute(/(.*)\.(?:html)/,e=>r.handle(e).then(o=>{if(o){if(o.status===404)return caches.match("pages/404.html")}else return caches.match("pages/offline.html");return o}))}else console.log("Boo! Workbox didn't load \u{1F62C}");
