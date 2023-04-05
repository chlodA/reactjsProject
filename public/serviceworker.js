/*
const staticCache='baproject-cache-v3';
const dynamicCache = 'baproject-dynamic-v2';
const urlsTOCache=[
    '/',
    '/index.html',
    '/fallback.html',
    '/service-worker.js',

]

self.addEventListener('message', (event) => {
    if(event.data && event.data.type === 'SKIP_WAITING'){
        self.skipWaiting();
    }
})

self.addEventListener('install', event =>{

    event.waitUntil(
        caches.open(staticCache)
            .then(cache=>{
                return cache.addAll(urlsTOCache);
            })
    )

    console.log('sw installed')
})

self.addEventListener('activate', function (event) {

    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCache && key !== dynamicCache)
                .map(key => caches.delete(key)))
        })
    )

})

self.addEventListener('fetch', event=>{

    if(event.request.url.indexOf('firestore.googleapis.com') === -1) {
        event.respondWith(
            caches.match(event.request).then(cacheRes => {
                return cacheRes || fetch(event.request).then(fetchRes => {
                    return caches.open(dynamicCache).then(cache => {
                        cache.put(event.request.url, fetchRes.clone()).then(r => console.log('success'));
                        return fetchRes;
                    })
                });
            }).catch(() => {
                /!*if(event.request.url.indexOf('.js') > -1){*!/
                    return  caches.match('/fallback.html')
                /!*}*!/

            })

        )
    }

})
*/
