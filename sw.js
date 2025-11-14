// Amazon Clone - Service Worker for Offline Support

const CACHE_NAME = 'amazon-clone-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/products.html',
    '/product-detail.html',
    '/cart.html',
    '/styles/main.css',
    '/styles/responsive.css',
    '/js/products.js',
    '/js/cart.js',
    '/js/main.js'
];

// Install service worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch requests
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Return cached version or fetch from network
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});

// Activate service worker
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});