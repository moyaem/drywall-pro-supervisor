// DrywallPro Service Worker
// Cache version — bump this string to force a cache refresh on update
const CACHE_NAME = 'drywallpro-v3';

// Core files to pre-cache on install (app shell)
const PRECACHE_URLS = [
  '/drywall-pro-supervisor/',
  '/drywall-pro-supervisor/index.html',
  '/drywall-pro-supervisor/manifest.json',
  '/drywall-pro-supervisor/sw.js',
  '/drywall-pro-supervisor/icon-192.png',
  '/drywall-pro-supervisor/icon-512.png',
  '/drywall-pro-supervisor/icon-maskable-192.png',
  '/drywall-pro-supervisor/icon-maskable-512.png',
];

// ── INSTALL: pre-cache app shell ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Add each URL individually so one failure doesn't block the whole install
      return Promise.allSettled(
        PRECACHE_URLS.map(url => cache.add(url).catch(() => {}))
      );
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: delete old caches ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: network-first for navigation, cache-first for assets ──
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and chrome-extension / browser-internal requests
  if (request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;

  // For navigation requests (HTML pages): network first, fall back to cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache a fresh copy
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request)
          .then(cached => cached || caches.match('/drywall-pro-supervisor/'))
        )
    );
    return;
  }

  // For Google Fonts: cache-first (they rarely change)
  if (url.hostname.includes('fonts.googleapis.com') ||
      url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          return response;
        });
      })
    );
    return;
  }

  // For same-origin static assets: cache first, then network
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          }
          return response;
        }).catch(() => new Response('Offline', { status: 503 }));
      })
    );
  }
});

// ── BACKGROUND SYNC: when coming back online ──
self.addEventListener('sync', event => {
  if (event.tag === 'drywallpro-sync') {
    // All data is in localStorage — nothing to sync server-side
    // This fires when connectivity is restored; clients can re-render
    event.waitUntil(
      self.clients.matchAll().then(clients =>
        clients.forEach(client => client.postMessage({ type: 'ONLINE' }))
      )
    );
  }
});

// ── PUSH NOTIFICATIONS (placeholder for future) ──
self.addEventListener('push', event => {
  const data = event.data?.json() || { title: 'DrywallPro', body: 'You have an update.' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/drywall-pro-supervisor/icon-192.png',
      badge: '/drywall-pro-supervisor/icon-192.png',
      vibrate: [100, 50, 100],
      data: { url: '/drywall-pro-supervisor/' }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/drywall-pro-supervisor/')
  );
});
