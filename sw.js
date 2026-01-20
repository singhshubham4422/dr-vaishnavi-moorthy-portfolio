// Minimal Service Worker to make the site installable
// This ensures the PWA install prompt can appear and the app works in standalone mode.

const CACHE_NAME = 'portfolio-v1';
const ASSETS_TO_CACHE = [
    '/dr-vaishnavi-moorthy-portfolio/',
    '/dr-vaishnavi-moorthy-portfolio/index.html',
    '/dr-vaishnavi-moorthy-portfolio/manifest.json',
    '/dr-vaishnavi-moorthy-portfolio/icon-192.png',
    '/dr-vaishnavi-moorthy-portfolio/icon-512.png'
];

// Install Event - Log install
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Install');
    // We can optionally cache core assets here if we wanted offline support, 
    // but for "minimal" we primarily want the worker to be registered.
    // Caching the start URL is good practice for PWA start functionality.
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activate');
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

// Fetch Event - Network First, then Cache
self.addEventListener('fetch', (event) => {
    // Simple Network-First Strategy
    event.respondWith(
        fetch(event.request)
            .catch(() => {
                return caches.match(event.request);
            })
    );
});
