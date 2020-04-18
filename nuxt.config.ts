import { BASE_URL } from '@/libs/const';
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
  plugins: ['@/plugins/vuetify'],
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
    name: '園児ニアの庭園',
    lang: 'ja',
    short_name: 'blog',
    title: '園児ニアの庭園',
    'og:title': '園児ニアの庭園',
    description: 'sa2taka blog',
    'og:description': 'sa2taka blog',
    'og:url': BASE_URL,
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
