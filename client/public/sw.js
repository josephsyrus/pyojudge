const CACHE_NAME = "pyodide-runtime-v1";
const PYODIDE_CDN_ORIGIN = "cdn.jsdelivr.net";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only cache Pyodide CDN requests
  if (!url.hostname.includes(PYODIDE_CDN_ORIGIN) || !url.pathname.includes("/pyodide/")) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(event.request);
      if (cached) return cached;

      const response = await fetch(event.request);
      if (response.ok) {
        cache.put(event.request, response.clone());
      }
      return response;
    }),
  );
});
