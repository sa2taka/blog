<template>
  <v-layout column justify-center align-center>
    <pagination v-model="page" :limit="limit" :count="count" />
    <posts v-if="!isLoading" :posts="posts" />
    <skelton-pages v-else />
  </v-layout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component, Watch } from 'nuxt-property-decorator';
import { fetchPosts } from '@/libs/contentful';
import { postsCountStore } from '@/libs/storeAccessor';
import { Post, MultipleItem } from '@/types/entry';

import Posts from '@/components/Organisms/posts.vue';
import Pagination from '@/components/Molecules/pagination.vue';
import SkeltonPages from '~/components/Organisms/skeltonPosts.vue';

@Component({
  components: {
    Posts,
    Pagination,
    SkeltonPages,
  },
})
export default class IndexPage extends Vue {
  page!: number;
  limit = 20;
  posts!: Post[];
  isLoading = false;

  async asyncData(context: Context) {
    const page = decidePage(context);
    const limit = 20;

    const posts: Post[] = await fetchPosts(page - 1, limit).then(
      (posts: MultipleItem<Post>) =>
        posts.items.map((item) => {
          item.fields.body = '';
          return item;
        })
    );

    return {
      page,
      posts,
    };
  }

  get count() {
    return postsCountStore.count;
  }

  @Watch('page')
  onChangePage() {
    this.$router.push({
      name: 'index',
      query: { page: this.page.toString() },
    });

    if (!this.page || this.page < 1) {
      this.page = 1;
    }
    this.isLoading = true;
    fetchPosts(this.page - 1, this.limit).then((posts: MultipleItem<Post>) => {
      this.isLoading = false;
      this.posts = posts.items.map((item) => {
        item.fields.body = '';
        return item;
      });
    });
  }
}

const decidePage = (context: Context) => {
  const pageQuery = context.query.page;
  if (typeof pageQuery !== 'string') {
    return 1;
  }

  if (pageQuery === '') {
    return 1;
  }

  const pageQueryNum = parseInt(pageQuery, 10);

  if (isNaN(pageQueryNum) || pageQueryNum < 1) {
    return 1;
  }
  return pageQueryNum;
};
</script>

<style scoped>
.blog-title {
  font-size: 1.6em;
}
</style>
