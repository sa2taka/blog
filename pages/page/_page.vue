<template>
  <v-layout column justify-center align-center>
    <posts-with-pagenation
      :page="page"
      :limit="limit"
      :count="count"
      base-url=""
      :posts="posts"
    />
  </v-layout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from 'nuxt-property-decorator';
import { fetchPosts } from '@/libs/contentful';
import { postsCountStore } from '@/libs/storeAccessor';
import { Post, MultipleItem } from '@/types/entry';

import PostsWithPagenation from '@/components/Organisms/postsWithPagenation.vue';

@Component({
  components: {
    PostsWithPagenation,
  },
})
export default class PageSettedPage extends Vue {
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
}

const decidePage = (context: Context) => {
  const pageParam = context.route.params.page;
  if (typeof pageParam !== 'string') {
    return 1;
  }

  if (pageParam === '') {
    return 1;
  }

  const pageParamNum = parseInt(pageParam, 10);

  if (isNaN(pageParamNum) || pageParamNum < 1) {
    return 1;
  }
  return pageParamNum;
};
</script>

<style scoped>
.blog-title {
  font-size: 1.6em;
}
</style>
