import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import setVuetify from '@/plugins/vuetify';

Vue.use(Vuetify);

export default (ctx: any) => {
  const isDark = localStorage.getItem('theme') !== 'light';
  setVuetify(ctx, isDark);
};

declare module 'vue/types/vue' {
  interface Vue {
    $vuetify: any;
  }
}
