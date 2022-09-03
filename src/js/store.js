const idb = window.indexedDB;
export default class Store {

    constructor (stateManager) {
        console.log('Constructor!!!!');

        // if (!('indexedDB' in window)) {
        //     console.log('This browser doesn\'t support IndexedDB');
        //     return;
        // }
        var openRequest = indexedDB.open('app_db', 1);

        openRequest.onupgradeneeded = function(e) {
            var db = e.target.result;
            console.log('running onupgradeneeded');
            if (!db.objectStoreNames.contains('comments')) {
                console.log('creating a new store!');
                var storeOS = db.createObjectStore('comments',
                { keyPath: "id", autoIncrement:true });
            } else {
                console.log('already has a new store!');
            }
        };

        openRequest.onsuccess = function(e) {
            console.log('running onsuccess');
            var db = e.target.result;
            stateManager.setStore(db)
            // addItem();
        };

        openRequest.onerror = function(e) {
            console.log('onerror!');
            console.dir(e);
        };
    }
}