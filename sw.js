var CACHE_NAME = 'apresenta-card-v02-01';
var urlsToCache = [
	'/apresenta/',
	'/apresenta/index.html',
	'/apresenta/offline.html',
	'/apresenta/404.html',
	'/apresenta/favicon/android-chrome-512x512.png',
	'/apresenta/favicon/android-icon-192x192.png',
	'/apresenta/favicon-foto/android-chrome-512x512.png',
	'/apresenta/favicon-foto/android-icon-192x192.png',
	'/apresenta/css/all.css',
	'/apresenta/webfonts/fa-brands-400.eot',
	'/apresenta/webfonts/fa-brands-400.svg',
	'/apresenta/webfonts/fa-brands-400.ttf',
	'/apresenta/webfonts/fa-brands-400.woff',
	'/apresenta/webfonts/fa-brands-400.woff2',
	'/apresenta/webfonts/fa-regular-400.eot',
	'/apresenta/webfonts/fa-regular-400.svg',
	'/apresenta/webfonts/fa-regular-400.ttf',
	'/apresenta/webfonts/fa-regular-400.woff',
	'/apresenta/webfonts/fa-regular-400.woff2',
	'/apresenta/webfonts/fa-solid-900.eot',
	'/apresenta/webfonts/fa-solid-900.svg',
	'/apresenta/webfonts/fa-solid-900.ttf',
	'/apresenta/webfonts/fa-solid-900.woff',
	'/apresenta/webfonts/fa-solid-900.woff2',
	'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
	'https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
	'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
	'/apresenta/imgs/mauricio-jun-sobre-picture-mobile.png',
	'/apresenta/imgs/mauricio-jun-sobre-picture-mobile-02.png',
	'/apresenta/imgs/logo-cartao-digital-puro-v01-01.png',
	'/apresenta/imgs/portfolio-01.png',
	'/apresenta/imgs/portfolio-02.png',
	'/apresenta/imgs/portfolio-03.png',
	'/apresenta/imgs/logo-bkg-03-mobile-transparente.png',
	'/apresenta/imgs/logo-mauricio-jun-cartao-digital-horiz-v01-01.png',
	'/apresenta/imgs/dcard-cartao-digital-molde-cabecalho-v01-01.png',
	'/apresenta/imgs/picture-circle-bkg.png',
	'/apresenta/imgs/mauricio-jun-dcard-slide-01.jpg',
	'/apresenta/imgs/mauricio-jun-dcard-slide-02.jpg',
	'/apresenta/imgs/mauricio-jun-dcard-slide-03.jpg'
];
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					// Return true if you want to remove this cache,
					// but remember that caches are shared across
					// the whole origin
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});
/* FETCH */
self.addEventListener('fetch', function(event) {
	event.respondWith(
	// Try the cache
		caches.match(event.request).then(function(response) {
			//console.log('response 01 = ' + response);
			if (response) {
				return response;
			}
			return fetch(event.request).then(function(response) {
				//console.log('response.status = ' + response.status);
				if (response.status === 404) {
					return caches.match('/apresenta/404.html');
				}
				//console.log('response 02 = ' + response);
				return response
			});
		}).catch(function() {
			// If both fail, show a generic fallback:
			//console.log('offline event = ' + event);
			return caches.match('/apresenta/offline.html');
		})
	);
});