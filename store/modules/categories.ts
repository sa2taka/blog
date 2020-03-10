import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators';
import { Category } from '@/types/entry';
import createClient from '@/plugins/contentful';
import store from '~/store/store';

interface ICategories {
  categories: Category[];
}

@Module({
  name: 'categories',
  namespaced: true,
  dynamic: true,
  store,
})
class Categories extends VuexModule implements ICategories {
  categories: Category[] = [];

  @Mutation
  setCategories(category: Category[]) {
    this.categories = category;
  }

  @Action
  init() {
    const client = createClient();

    return client
      .getEntries({
        content_type: process.env.CTF_CATEGORY_ID,
      })
      .then((entries: any) => {
        this.setCategories(entries.items);
      });
  }
}

const module = getModule(Categories);
export default module;
