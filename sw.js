self.addEventListener("install", function(event) {
	event.waitUntil(caches.open("web-app").then(function(cache) {
		return cache.addAll([ "/" ]).then(function() {
			self.skipWaiting();
		});
	}));
});

self.addEventListener("activate",  function(event) {
	event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function(event) {
	event.respondWith(caches.match(event.request).then(function(response) {
		return response || fetch(event.request);
	}));
});
