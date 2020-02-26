import ja from 'vuetify/src/locale/ja';
import values from './plugins/iconValues';

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxt/typescript-build',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
  ],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      options: {
        customProperties: true,
      },
      themes: {
        light: {
          primary: '#009688',
          secondary: '#ff5722',
          accent: '#00bcd4',
          error: '#f44336',
          warning: '#cddc39',
          info: '#8bc34a',
          success: '#2196f3',
        },
        dark: {
          primary: '#009688',
          secondary: '#ff5722',
          accent: '#00bcd4',
          error: '#f44336',
          warning: '#cddc39',
          info: '#8bc34a',
          success: '#2196f3',
        },
      },
    },
    lang: {
      locales: { ja },
      current: 'ja',
    },
    icons: {
      iconfont: 'fa',
      values,
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(_config: any, _coctx: any) {},
  },
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true,
  },
};
