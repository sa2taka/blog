workbox.routing.registerRoute(
  new RegExp('^https://blog.sa2taka.com/'),
  workbox.strategies.networkFirst({
    cacheName: 'page-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 30 * 12, // for 1 year
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp(
    '^https://cdn.contentful.com/spaces/xw0ljpdch9v4/environments/master/'
  ),
  workbox.strategies.networkFirst({
    cacheName: 'entry-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 30 * 12, // for 1 year
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp('^https?://images.ctfassets.net/xw0ljpdch9v4/.*.(png|jpg|webp)$'),
  workbox.strategies.cacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 30 * 12, // for 1 year
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp('^https://fonts.googleapis.com/'),
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 30 * 12, // for 1 year
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp('.min.(css|js)$'),
  workbox.strategies.cacheFirst({
    cacheName: 'minify-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 30 * 12, // for 1 year
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp('.woff2?$'),
  workbox.strategies.cacheFirst({
    cacheName: 'fonts-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 30 * 12, // for 1 year
      }),
    ],
  })
);
