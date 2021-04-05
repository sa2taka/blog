import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import Categories from '~/store/categories';
import PostsCount from '~/store/postsCount';

let categoriesStore: Categories;
let postsCountStore: PostsCount;

function initializeStores(store: Store<any>): void {
  categoriesStore = getModule(Categories, store);
  postsCountStore = getModule(PostsCount, store);
}

export { initializeStores, categoriesStore, postsCountStore };
