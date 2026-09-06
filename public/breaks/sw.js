/* Break Ledger offline shell.
   Scoped to this folder by where it is served from, so nothing else on the
   domain is intercepted. Bump CACHE to force a refresh of the cached shell. */
var CACHE = "break-ledger-v4";
var SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-180.png"];

self.addEventListener("install", function (ev) {
  ev.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(SHELL); })
      .catch(function () { /* a missing optional asset must not block install */ })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (ev) {
  ev.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.map(function (k) { return k === CACHE ? null : caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (ev) {
  var req = ev.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);

  /* The page itself: network first, so an update lands as soon as there is a
     connection, with the cached copy as the offline fallback. */
  if (req.mode === "navigate") {
    ev.respondWith(
      fetch(req)
        .then(function (res) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put("./index.html", copy); }).catch(function () {});
          return res;
        })
        .catch(function () {
          return caches.match("./index.html").then(function (r) { return r || caches.match("./"); });
        })
    );
    return;
  }

  /* Web fonts: serve what we have and refresh in the background. Absence just
     means the page falls back to its declared font stacks. */
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    ev.respondWith(
      caches.match(req).then(function (hit) {
        var net = fetch(req).then(function (res) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); }).catch(function () {});
          return res;
        }).catch(function () { return hit; });
        return hit || net;
      })
    );
    return;
  }

  if (url.origin !== location.origin) return;

  ev.respondWith(
    caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); }).catch(function () {});
        return res;
      });
    })
  );
});
