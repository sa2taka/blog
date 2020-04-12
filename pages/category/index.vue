<template>
  <nav>
    <h1>カテゴリ</h1>
    <ul>
      <li
        v-for="categoryPost in categoryPosts"
        :key="categoryPost.category.sys.id"
      >
        {{ categoryPost.category.fields.name }}
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from 'nuxt-property-decorator';
import { fetchLatestPostInCategory } from '../../libs/contentful';
import { Post, Category as ICategory } from '@/types/entry';

interface CategoryPost {
  category: ICategory;
  post: Post | undefined;
}

@Component
export default class Category extends Vue {
  categoryPosts!: CategoryPost[];

  async asyncData(context: Context) {
    return {
      categoryPosts: (
        await fetchLastetPostsInCategory(
          context.store.state.categories.categories
        )
      ).filter(e => e),
    };
  }

  head() {
    return {
      title: 'カテゴリ - ',
    };
  }
}

const fetchLastetPostsInCategory = (categories: ICategory[]) => {
  return Promise.all(
    categories.map(category => {
      return fetchLatestPostInCategory(category.fields.name).then(
        (post: Post | undefined) => {
          if (!post) {
            return null;
          }
          return {
            category,
            post,
          };
        }
      ) as CategoryPost | null;
    })
  );
};
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
