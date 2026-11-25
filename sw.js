// Offline cache: the whole atlas is stored on the device on first visit.
// The page itself is fetched from the network first (so updates arrive at once), the cache is the fallback offline.
const CACHE='atlante-7660f32b0d';
const FILES=['./', 'index.html', 'manifest.webmanifest', 'three.module.min.js', 'data.json', 'stars.json', 'all.json', 'gaia.jpg', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png', 'tex/earth.webp', 'tex/earth_clouds.webp', 'tex/earth_night.webp', 'tex/earth_spec.webp', 'tex/jupiter.webp', 'tex/mars.webp', 'tex/mercury.webp', 'tex/moon.webp', 'tex/neptune.webp', 'tex/saturn.webp', 'tex/saturn_ring.webp', 'tex/sun.webp', 'tex/uranus.webp', 'tex/venus.webp'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:'reload'})))).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==CACHE).map(n=>caches.delete(n)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{ const req=e.request; if(req.method!=='GET') return; const url=new URL(req.url); if(url.origin!==location.origin) return;
  const page=req.mode==='navigate'||url.pathname.endsWith('/')||url.pathname.endsWith('index.html');
  if(page){ e.respondWith(fetch(req,{cache:'no-cache'}).then(res=>{ if(res.ok){ const cp=res.clone(); caches.open(CACHE).then(c=>c.put('index.html',cp)); } return res; }).catch(()=>caches.match('index.html'))); return; }
  e.respondWith(caches.match(req,{ignoreSearch:true}).then(r=>r||fetch(req).then(res=>{ if(res.ok){ const cp=res.clone(); caches.open(CACHE).then(c=>c.put(req,cp)); } return res; }))); });
