<template>
  <the-layout column justify-center align-center>
    <breadcrumbs :list="breadcrumbsList"></breadcrumbs>
    <h2 class="center-title">カテゴリ</h2>
    <nav>
      <ul class="categories">
        <li v-for="category in categories" :key="category.element.sys.id">
          <v-btn
            :to="{
              name: 'category-slug',
              params: { slug: category.element.fields.slug },
            }"
            class="category-slug-button"
            outlined
            >{{ category.element.fields.name }}({{ category.count }})</v-btn
          >
        </li>
      </ul>
    </nav>
  </the-layout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from 'nuxt-property-decorator';
import { Category as ICategory } from '@/types/entry';
import { generateCategoriesBreadcrumbsList } from '@/libs/breadcrumbsGenerator';

import Breadcrumbs from '@/components/Atom/breadcrumbs.vue';
import TheLayout from '@/components/Atom/theLayout.vue';

interface CategoryWithCount {
  category: ICategory;
  count: number;
}

@Component({
  components: {
    Breadcrumbs,
    TheLayout,
  },
})
export default class Category extends Vue {
  categories!: CategoryWithCount[];

  asyncData(context: Context) {
    return {
      categories: context.store.state.categories.categories.filter(
        (categoryWithCount: any) => categoryWithCount.count > 0
      ),
    };
  }

  get breadcrumbsList() {
    return generateCategoriesBreadcrumbsList();
  }

  head() {
    return {
      title: 'カテゴリ - ',
      meta: [{ name: 'robots', content: 'noindex,nofollow' }],
    };
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}

.center-title {
  text-align: center;
}

.categories {
  display: flex;
  flex-wrap: wrap;
}

.category-slug-button {
  margin: 0.5em 8px;
}
</style>
