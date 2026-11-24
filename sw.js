// Offline cache: the whole atlas is stored on the device on first visit.
const CACHE='atlante-1b9b8385b0';
const FILES=['./', 'index.html', 'manifest.webmanifest', 'three.module.min.js', 'data.json', 'stars.json', 'all.json', 'gaia.jpg', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png', 'tex/earth.webp', 'tex/earth_clouds.webp', 'tex/earth_night.webp', 'tex/earth_spec.webp', 'tex/jupiter.webp', 'tex/mars.webp', 'tex/mercury.webp', 'tex/moon.webp', 'tex/neptune.webp', 'tex/saturn.webp', 'tex/saturn_ring.webp', 'tex/sun.webp', 'tex/uranus.webp', 'tex/venus.webp'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==CACHE).map(n=>caches.delete(n)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{ if(res.ok&&new URL(e.request.url).origin===location.origin){ const cp=res.clone(); caches.open(CACHE).then(c=>c.put(e.request,cp)); } return res; }).catch(()=>caches.match('index.html')))); });
