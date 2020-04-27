import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { Context } from '@nuxt/types';
import setVuetify from '@/plugins/vuetify';

Vue.use(Vuetify);

export default (ctx: Context) => {
  const isDark = !ctx.req.headers.cookie?.match(/theme=light/);
  setVuetify(ctx, !!isDark);
};

declare module 'vue/types/vue' {
  interface Vue {
    $vuetify: any;
  }
}
