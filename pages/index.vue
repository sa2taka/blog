<template>
  <v-layout column justify-center align-center>
    <pagination v-model="page" :limit="limit" :count="count" />
    <posts :posts="posts" />
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

@Component({
  components: {
    Posts,
    Pagination,
  },
})
export default class IndexPage extends Vue {
  page!: number;
  limit = 20;
  posts!: Post[];

  async asyncData(context: Context) {
    const page = decidePage(context);
    const limit = 20; // hard code because "this" is not accessable

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
      name: '/',
      params: { page: this.page.toString() },
    });
  }
}

// page setting
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

  return pageQueryNum - 1;
};
</script>

<style scoped>
.blog-title {
  font-size: 1.6em;
}
</style>
