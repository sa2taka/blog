<template>
  <v-layout column justify-center align-center>
    <posts-with-pagenation
      :page="page"
      :limit="limit"
      :count="count"
      :base-url="'/page/'"
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
import { POSTS_LIMIT } from '@/libs/const';

@Component({
  components: {
    PostsWithPagenation,
  },
})
export default class IndexPage extends Vue {
  page!: number;
  limit = POSTS_LIMIT;
  posts!: Post[];

  async asyncData(_context: Context) {
    const page = 1;
    const limit = POSTS_LIMIT;

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
</script>

<style scoped>
.blog-title {
  font-size: 1.6em;
}
</style>
