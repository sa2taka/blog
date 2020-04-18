import { BASE_URL } from './libs/const';
const nodeExternals = require('webpack-node-externals');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

const config = require('./.contentful.json');

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s' + '園児ニアの庭園',
    title: ' ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: "園児ニアの庭園 | sa2taka's blog",
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'sa2takanのブログ',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: BASE_URL,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: BASE_URL + 'site-icon.jpg',
      },
      { property: 'og:site_name', content: '園児ニアの庭園' },
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
  css: ['@/assets/css/layout.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/vuetify.server', '@/plugins/vuetify.client'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build',
  ],
  /*
   ** Nuxt.js modules
   */
  vuetify: {},
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    ['cookie-universal-nuxt', { parseJSON: false }],
  ],
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^vuetify/],
    plugins: [new VuetifyLoaderPlugin()],
    extractCSS: true,
    extend(config: any, ctx: any) {
      if (ctx.isDev && ctx.isClient) {
        config.devtool = 'inline-cheap-module-source-map';
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }

      if (process.server) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/],
          }),
        ];
      }
    },
  },
  env: {
    CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN,
    CTF_CTF_MAIN_AUTHOR_ID: config.CTF_PERSON_ID,
    CTF_SPACE_ID: config.CTF_SPACE_ID,
  },
  manifest: {
    name: "園児ニアの庭園 | sa2taka's blog",
    lang: 'ja',
    short_name: "sa2taka's blog",
    description: 'sa2taka blog',
    theme_color: '#009688',
    background_color: '#2a2a2a',
    start_url: '/',
    icons: [
      {
        src: 'icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: 'icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: 'icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: 'icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: 'icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        src: 'icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: 'icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
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
