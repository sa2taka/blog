<template>
  <the-layout column justify-center align-center>
    <breadcrumbs :list="breadcrumbsList"></breadcrumbs>
    <h2 class="center-title">カテゴリ</h2>
    <nav>
      <ul class="categories">
        <li v-for="category in categories" :key="category.element.sys.id">
          <the-button
            :to="{
              name: 'category-slug',
              params: { slug: category.element.fields.slug },
            }"
            class="category-slug-button"
            outlined
            nuxt
            >{{ category.element.fields.name }}({{
              category.count
            }})</the-button
          >
        </li>
      </ul>
    </nav>
  </the-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { generateCategoriesBreadcrumbsList } from '@/libs/breadcrumbsGenerator';

import Breadcrumbs from '@/components/Atom/breadcrumbs.vue';
import TheLayout from '@/components/Atom/theLayout.vue';
import TheButton from '@/components/Atom/theButton.vue';
import {
  CategoryWithCount,
  fetchCategoriesWithCounts,
} from '~/libs/contentful';

@Component({
  components: {
    Breadcrumbs,
    TheLayout,
    TheButton,
  },
})
export default class Category extends Vue {
  categories!: CategoryWithCount[];

  async asyncData() {
    return {
      categories: await fetchCategoriesWithCounts().filter(
        (categoryWithCount: CategoryWithCount) => categoryWithCount.count > 0
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
