<template>
  <the-layout column justify-center align-center>
    <posts-with-pagenation
      :page="page"
      :limit="limit"
      :base-url="'/page/'"
      :count="count"
      :posts="posts.slice(0, limit)"
    />
  </the-layout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from 'nuxt-property-decorator';
import { fetchPosts, fetchPostsCount } from '@/libs/contentful';
import { Post, MultipleItem } from '@/types/entry';

import PostsWithPagenation from '@/components/Organisms/postsWithPagenation.vue';
import { POSTS_LIMIT } from '@/libs/const';
import TheLayout from '@/components/Atom/theLayout.vue';

@Component({
  components: {
    PostsWithPagenation,
    TheLayout,
  },
})
export default class IndexPage extends Vue {
  page!: number;
  limit = POSTS_LIMIT;
  posts!: Post[];
  count!: number;

  async asyncData(_context: Context) {
    const page = 1;
    const limit = POSTS_LIMIT;

    const posts: Post[] = await fetchPosts(page - 1, limit + 1).then(
      (posts: MultipleItem<Post>) =>
        posts.items.map((item) => {
          item.fields.body = '';
          return item;
        })
    );

    const count = await fetchPostsCount();

    return {
      page,
      posts,
      count,
    };
  }
}
</script>

<style scoped>
.blog-title {
  font-size: 1.6em;
  word-break: break-all;
}
</style>
