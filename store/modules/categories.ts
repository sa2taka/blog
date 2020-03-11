import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators';
import { Category } from '@/types/entry';
import store from '~/store/store';
import { fetchCategories } from '@/libs/contentful';

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
    return fetchCategories().then((entries: any) => {
      this.setCategories(entries.items);
    });
  }
}

const module = getModule(Categories);
export default module;
