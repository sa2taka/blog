import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { Context } from '@nuxt/types';
import '@/assets/icomoon/style.css';
import ja from 'vuetify/src/locale/ja';
import values from './iconValues';

Vue.use(Vuetify);

export default (ctx: Context) => {
  let isDark = true;

  if (process.client) {
    isDark = localStorage.getItem('theme') !== 'light';
  }

  const vuetify = new Vuetify({
    theme: {
      options: {
        customProperties: true,
      },
      dark: isDark,
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
  });
  ctx.app.vuetify = vuetify;
  // @ts-ignore
  ctx.vuetify = vuetify.framework;
};

declare module 'vue/types/vue' {
  interface Vue {
    $vuetify: any;
  }
}
