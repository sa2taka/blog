/* eslint-disable */

export default ({ app }) => {
  if (process.env.NODE_ENV !== 'production') return;

  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    (i[r] =
      i[r] ||
      function () {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(
    window,
    document,
    'script',
    'https://www.googletagmanager.com/gtag/js?id=G-3VKK45X498',
    'ga'
  );

  ga('js', new Date());
  ga('config', 'G-3VKK45X498');
  /*
   ** ルートが変更されるたびに毎回実行（初期化も実行される）
   */
  app.router.afterEach((to, from) => {
    ga('config', 'G-3VKK45X498', {
      page_path: to.path,
    });
  });
};
