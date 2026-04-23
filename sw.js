// Service Worker for AI Mastery for Aerospace
// Provides offline support after first visit

const CACHE_NAME = 'ai-aerospace-v22';
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

// CDN assets — cached on first use so the app works offline after initial load
const RUNTIME_CACHE_HOSTS = [
  'unpkg.com',
  'cdnjs.cloudflare.com',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('Precache partially failed:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Skip YouTube requests — always go to network, never cache
  if (url.hostname.includes('youtube.com') || url.hostname.includes('youtube-nocookie.com') ||
      url.hostname.includes('ytimg.com') || url.hostname.includes('googlevideo.com')) {
    return;
  }

  // App shell: cache-first
  const isAppShell = url.origin === self.location.origin;
  const isCdnAsset = RUNTIME_CACHE_HOSTS.some((host) => url.hostname.includes(host));

  if (isAppShell || isCdnAsset) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          // Only cache successful responses
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        }).catch(() => {
          // Offline fallback for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
    );
  }
});
