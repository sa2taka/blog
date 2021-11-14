<template>
  <the-layout column justify-center align-center>
    <breadcrumbs :list="breadcrumbsList"></breadcrumbs>
    <div class="category-title">{{ category.element.fields.name }}</div>

    <posts-with-pagenation
      :page="page"
      :limit="limit"
      :count="category.count"
      :base-url="`/category/${slug}/page/`"
      :posts="posts"
    />
  </the-layout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from 'nuxt-property-decorator';
import {
  fetchCategoriesWithCounts,
  fetchPostInCategory,
  CategoryWithCount,
} from '@/libs/contentful';
import { Post, MultipleItem } from '@/types/entry';
import { generateCategoryBreadcrumbsList } from '@/libs/breadcrumbsGenerator';

import Breadcrumbs from '@/components/Atom/breadcrumbs.vue';
import PostsWithPagenation from '@/components/Organisms/postsWithPagenation.vue';
import { POSTS_LIMIT } from '@/libs/const';
import TheLayout from '@/components/Atom/theLayout.vue';

@Component({
  components: {
    Breadcrumbs,
    PostsWithPagenation,
    TheLayout,
  },
})
export default class CategorySlug extends Vue {
  posts!: Post[];
  page!: number;
  category!: CategoryWithCount;
  slug!: string;
  limit = POSTS_LIMIT;

  async asyncData(context: Context) {
    const page = 1;
    const limit = POSTS_LIMIT;
    const category = await fetchCategoriesWithCounts().find(
      (category: CategoryWithCount) =>
        category.element.fields.slug === context.route.params.slug
    );

    const posts: Post[] = await fetchPostInCategory(
      context.route.params.slug,
      page - 1,
      limit
    ).then((posts: MultipleItem<Post>) =>
      posts.items.map((item) => {
        item.fields.body = '';
        return item;
      })
    );

    return {
      page,
      posts,
      category,
      slug: context.route.params.slug,
    };
  }

  get breadcrumbsList() {
    return generateCategoryBreadcrumbsList(this.category.element);
  }

  head() {
    return {
      title: this.category.element.fields.name + ' カテゴリ - ',
      meta: [{ name: 'robots', content: 'noindex,nofollow' }],
    };
  }
}
</script>

<style scoped>
.category-title {
  font-size: 1.4em;
}
</style>
