<template>
  <v-layout column justify-center align-center>
    <breadcrumbs :list="breadcrumbsList"></breadcrumbs>
    <div class="category-title">{{ category.element.fields.name }}</div>
    <pagination v-model="page" :limit="limit" :count="category.count" />
    <posts :posts="posts" />
  </v-layout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component, Watch } from 'nuxt-property-decorator';
import { fetchPostInCategory } from '@/libs/contentful';
import { Post, MultipleItem } from '@/types/entry';
import { generateCategoryBreadcrumbsList } from '@/libs/breadcrumbsGenerator';

import Posts from '@/components/Organisms/posts.vue';
import Breadcrumbs from '@/components/Atom/breadcrumbs.vue';
import { CategoryWithCount } from '~/store/categories';

@Component({
  components: {
    Posts,
    Breadcrumbs,
  },
})
export default class CategorySlug extends Vue {
  posts!: Post[];
  page!: number;
  category!: CategoryWithCount;

  async asyncData(context: Context) {
    const page = decidePage(context);
    const limit = 20; // hard code because "this" is not access
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

  return pageQueryNum;
};
</script>

<style scoped>
.category-title {
  font-size: 1.4em;
}
</style>
