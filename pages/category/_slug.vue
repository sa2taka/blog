<template>
  <v-layout column justify-center align-center class="posts">
    <div class="category-title">{{ category.fields.name }}</div>
    <div v-if="posts.length !== 0" class="mt-4">
      <article v-for="post in posts" :key="post.id">
        <top-page-posts class="post" :post="post" />
      </article>
    </div>
    <div v-else class="mt-4">投稿が見つかりません</div>
  </v-layout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from 'nuxt-property-decorator';
import { fetchPostInCategory } from '@/libs/contentful';
import { Post, MultipleItem, Category } from '@/types/entry';
import TopPagePosts from '@/components/Organisms/topPagePosts.vue';

@Component({
  components: {
    TopPagePosts,
  },
})
export default class CategorySlug extends Vue {
  title: string = process.env.BLOG_TITLE as string;
  description: string = process.env.BLOG_DESCRIPTION as string;

  limit = 20;
  page!: number;
  posts: Post[] = [];
  category!: Category;

  width = 320;

  async asyncData(context: Context) {
    const page = decidePage(context);
    const limit = 20; // hard code because "this" is not access
    const category = context.store.state.categories.categories.find(
      (category: Category) => category.fields.slug === context.route.params.slug
    );

    const posts: Post[] = await fetchPostInCategory(
      context.route.params.slug,
      page,
      limit
    ).then((posts: MultipleItem<Post>) => posts.items);
    return {
      page,
      posts,
      category,
    };
  }

  handlePostClick(slug: string) {
    this.$router.push({ name: 'post-slug', params: { slug } });
  }
}

// page setting
const decidePage = (context: Context) => {
  const pageQuery = context.query.page;
  if (typeof pageQuery !== 'string') {
    return 0;
  }

  if (pageQuery === '') {
    return 0;
  }

  const pageQueryNum = parseInt(pageQuery, 10);

  if (isNaN(pageQueryNum) || pageQueryNum < 0) {
    return 0;
  }

  return pageQueryNum - 1;
};
</script>

<style>
.category-title {
  font-size: 1.4em;
}
</style>
