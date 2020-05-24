workbox.routing.registerRoute(
  new RegExp('^https://blog.sa2taka.com/$'),
  workbox.strategies.staleWhileRevalidate({
    plugins: [
      new workbox.broadcastUpdate.Plugin({
        channelName: 'top-page',
      }),
    ],
  }),
  'GET'
);
workbox.routing.registerRoute(
  new RegExp(
    '^https://cdn.contentful.com/spaces/xw0ljpdch9v4/environments/master/*'
  ),
  workbox.strategies.staleWhileRevalidate({
    plugins: [
      new workbox.broadcastUpdate.Plugin({
        channelName: 'contentful',
      }),
    ],
  }),
  'GET'
);

workbox.routing.registerRoute(
  new RegExp('^https://blog.sa2taka.com/post/*'),
  new workbox.strategies.CacheFirst({}),
  'GET'
);
workbox.routing.registerRoute(
  new RegExp('^https?://images.ctfassets.net/xw0ljpdch9v4/.*.(png|jpg|webp)$'),
  new workbox.strategies.CacheFirst({}),
  'GET'
);
workbox.routing.registerRoute(
  new RegExp('^https?://i.imgur.com/.*.(png|jpg|webp)'),
  new workbox.strategies.CacheFirst({}),
  'GET'
);
workbox.routing.registerRoute(
  new RegExp('^https://fonts.googleapis.com/'),
  new workbox.strategies.CacheFirst({}),
  'GET'
);
workbox.routing.registerRoute(
  new RegExp('/_nuxt/'),
  new workbox.strategies.CacheFirst({}),
  'GET'
);
workbox.routing.registerRoute(
  new RegExp('/'),
  new workbox.strategies.NetworkFirst({}),
  'GET'
);
