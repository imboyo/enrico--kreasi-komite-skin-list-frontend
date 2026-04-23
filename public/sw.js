const STATIC_CACHE = "skin-list-static-v1";
const DOCUMENT_CACHE = "skin-list-documents-v1";
const APP_SHELL_ROUTES = ["/"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(DOCUMENT_CACHE).then((cache) => cache.addAll(APP_SHELL_ROUTES))
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) => key !== STATIC_CACHE && key !== DOCUMENT_CACHE
            )
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  // Navigation requests prefer fresh content but keep a cached document as an offline fallback.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();

          void caches
            .open(DOCUMENT_CACHE)
            .then((cache) => cache.put(request, responseClone));

          return response;
        })
        .catch(
          async () =>
            (await caches.match(request)) || caches.match("/") || Response.error()
        )
    );

    return;
  }

  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/pwa/") ||
    /\.(?:css|js|png|svg|jpg|jpeg|webp|ico)$/i.test(url.pathname)
  ) {
    // Static assets can use stale-while-revalidate so repeat visits feel immediate.
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        const networkPromise = fetch(request)
          .then((response) => {
            if (response.ok) {
              void cache.put(request, response.clone());
            }

            return response;
          })
          .catch(() => cachedResponse);

        return cachedResponse || networkPromise;
      })
    );
  }
});
