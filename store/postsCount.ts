import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators';
import { fetchPostsCount } from '@/libs/contentful';

export interface IPostCount {
  count: number;
}

@Module({
  name: 'postsCount',
  namespaced: true,
  stateFactory: true,
})
export default class PostsCount extends VuexModule implements IPostCount {
  count = 0;

  @Mutation
  setNumber(count: number) {
    this.count = count;
  }

  @Action
  init() {
    return fetchPostsCount().then((count: number) => {
      this.setNumber(count);
    });
  }
}
