import { ActionTree } from 'vuex';
import { ActionContext } from 'vuex/types';
import { Context } from '@nuxt/types';
import Categories from '@/store/modules/categories';

export const state = () => ({});
export type RootState = ReturnType<typeof state>;

export const actions: ActionTree<any, any> = {
  nuxtServerInit: (_context: ActionContext<RootState, RootState>, _server: Context) => {
    return Categories.init();
  },

  nuxtClientInit: (_context: ActionContext<RootState, RootState>, _server: Context) => {
    return Categories.init();
  },
};
