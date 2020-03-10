import Vue from 'vue';
import Vuex from 'vuex';
// import Vuex, { ActionTree } from 'vuex';
// import { ActionContext } from 'vuex/types';
// import { Context } from '@nuxt/types';
// import Categories from '@/store/modules/categories';

// const actions: ActionTree<any, any> = {
//   nuxtServerInit: (_context: ActionContext<RootState, RootState>, _server: Context) => {
//     return Promise.all([Categories.init()]);
//   },
// };

Vue.use(Vuex);

interface RootState {
  version: string;
}

const store = new Vuex.Store<RootState>({
  state: {
    version: '1.0.0',
  },
  // actions,
});

export default store;
