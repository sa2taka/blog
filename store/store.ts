import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface RootState {
  version: string;
}

const store = new Vuex.Store<RootState>({
  state: () => {
    return {
      version: '1.0.0',
    };
  },
  // actions,
});

export default store;
