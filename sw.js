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
