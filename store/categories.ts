import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators';
import { Category, MultipleItem } from '@/types/entry';
import { fetchCategories, fetchPostsCountInCategory } from '@/libs/contentful';

type CategoryWithCount = { element: Category; count: number };
export interface ICategories {
  categories: CategoryWithCount[];
}

@Module({
  name: 'categories',
  namespaced: true,
  stateFactory: true,
})
export default class Categories extends VuexModule implements ICategories {
  categories: CategoryWithCount[] = [];

  @Mutation
  setCategories(categories: CategoryWithCount[]) {
    this.categories = categories;
  }

  @Action
  init() {
    return fetchCategories().then((entries: MultipleItem<Category>) => {
      return Promise.all(
        entries.items.map((e) => {
          return fetchPostsCountInCategory(e.sys.id).then((count) => ({
            element: e,
            count,
          }));
        })
      ).then((categoriesWithCount) => {
        this.setCategories(categoriesWithCount);
      });
    });
  }
}
