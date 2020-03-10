require('dotenv').config();
const config = process.env;

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
  plugins: ['~/plugins/vuetify.client.ts'],
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
  vuetify: {},
  modules: ['@nuxtjs/pwa', '@nuxtjs/dotenv', '@nuxtjs/vuetify'],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(_config: any, _coctx: any) {},
  },
  env: {
    CTF_SPACE_ID: config.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN,
    CTF_CTF_MAIN_AUTHOR_ID: config.CTF_PERSON_ID,
    CTF_POST_ID: config.CTF_BLOG_POST_TYPE_ID,
    CTF_CATEGORY_ID: config.CTF_CATEGORY_ID,
  },
  manifest: {
    name: 'Engineer Garden',
    lang: 'ja',
    short_name: 'blog',
    title: 'Engineer Garden',
    'og:title': 'Engineer Garden',
    description: 'sa2taka blog',
    'og:description': 'sa2taka blog',
    theme_color: '#009688',
    background_color: '#2a2a2a',
  },
  workbox: {
    dev: true,
    importScripts: ['cache-sw.js'],
  },
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true,
  },
};
