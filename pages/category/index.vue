<template>
  <nav>
    <h2 class="center-title">カテゴリ</h2>

    <ul class="ml-10 categories">
      <li v-for="category in categories" :key="category.sys.id">
        <v-btn
          :to="{
            name: 'category-slug',
            params: { slug: category.fields.slug },
          }"
          outlined
          >{{ category.fields.name }}</v-btn
        >
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from 'nuxt-property-decorator';
import { confirmExistingCategory } from '../../libs/contentful';
import { Category as ICategory } from '@/types/entry';

interface CategoryWithCount {
  category: ICategory;
  count: number;
}

@Component
export default class Category extends Vue {
  categories!: CategoryWithCount[];

  async asyncData(context: Context) {
    return {
      categories: await fetchCategoriesIfExist(
        context.store.state.categories.categories
      ),
    };
  }

  head() {
    return {
      title: 'カテゴリ - ',
    };
  }
}

const fetchCategoriesIfExist = (categories: ICategory[]) => {
  return Promise.all(
    categories.map(category => {
      return confirmExistingCategory(category.sys.id).then(isExist => {
        return {
          isExist,
          category,
        };
      });
    })
  ).then(categoriesWithExist => {
    return categoriesWithExist.filter(e => e.isExist).map(e => e.category);
  });
};
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
</style>
