<template>
  <div>
    <h1>カテゴリ</h1>
    <ul>
      <li v-for="category in categories" :key="category.sys.id">{{ category.fields.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from 'nuxt-property-decorator';
import { Category as ICategory } from '@/types/entry';

@Component
export default class Category extends Vue {
  categories: ICategory[] = this.$store.state.categories;

  asyncData(context: Context) {
    return {
      categories: context.store.state.categories.categories,
    };
  }

  head() {
    return {
      title: 'カテゴリ - ',
    };
  }
}
</script>

<style></style>
a
