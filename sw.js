/* Archery Lab – Service Worker
   Άλλαξε το VERSION όταν ανεβάζεις νέα έκδοση, για να ανανεωθεί η cache. */
const VERSION = 'archery-lab-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  // Σελίδα: πρώτα δίκτυο (για νέες εκδόσεις), με γρήγορο fallback στην cache όταν δεν υπάρχει σήμα.
  if (req.mode === 'navigate') {
    e.respondWith(
      Promise.race([
        fetch(req).then(res => {
          const copy = res.clone();
          caches.open(VERSION).then(c => c.put('./index.html', copy));
          return res;
        }),
        new Promise((_, rej) => setTimeout(rej, 3000))
      ]).catch(() => caches.match('./index.html').then(r => r || caches.match('./')))
    );
    return;
  }

  // Υπόλοιπα αρχεία: πρώτα cache.
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(VERSION).then(c => c.put(req, copy));
      return res;
    }))
  );
});
