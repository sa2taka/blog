import Vuetify from 'vuetify/lib';
import '@fortawesome/fontawesome-free/css/all.css';
import ja from 'vuetify/src/locale/ja';
import values from './iconValues';

export default (ctx: any, isDark: boolean) => {
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
