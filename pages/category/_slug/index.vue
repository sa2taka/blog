<template>
  <v-layout column justify-center align-center>
    <breadcrumbs :list="breadcrumbsList"></breadcrumbs>
    <div class="category-title">{{ category.element.fields.name }}</div>

    <posts-with-pagenation
      :page="page"
      :limit="limit"
      :count="category.count"
      :base-url="`${category.element.fields.slug}/page/`"
      :posts="posts"
    />
  </v-layout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from 'nuxt-property-decorator';
import { fetchPostInCategory } from '@/libs/contentful';
import { Post, MultipleItem } from '@/types/entry';
import { generateCategoryBreadcrumbsList } from '@/libs/breadcrumbsGenerator';

import Breadcrumbs from '@/components/Atom/breadcrumbs.vue';
import PostsWithPagenation from '@/components/Organisms/postsWithPagenation.vue';
import { CategoryWithCount } from '~/store/categories';

@Component({
  components: {
    Breadcrumbs,
    PostsWithPagenation,
  },
})
export default class CategorySlug extends Vue {
  posts!: Post[];
  page!: number;
  category!: CategoryWithCount;
  slug!: string;
  limit = 20;

  async asyncData(context: Context) {
    const page = 1;
    const limit = 20;
    const category = context.store.state.categories.categories.find(
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
