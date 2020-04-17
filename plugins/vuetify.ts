import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@fortawesome/fontawesome-free/css/all.css';
import ja from 'vuetify/src/locale/ja';
import values from './iconValues';

let storage;

if (process.env.client) {
  storage = localStorage;
}

let isDark = true;
if (storage?.getItem('theme') === 'light') {
  isDark = false;
}

Vue.use(Vuetify);

export default (ctx: any) => {
  const vuetify = new Vuetify({
    customVariables: ['~/assets/variables.scss'],
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
  ctx.vuetify = vuetify.framework;
};

declare module 'vue/types/vue' {
  interface Vue {
    $vuetify: any;
  }
}
