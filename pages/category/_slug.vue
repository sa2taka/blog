<template>
  <v-layout column justify-center align-center>
    <div class="category-title">{{ category.fields.name }}</div>
    <posts :posts="posts" />
  </v-layout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from 'nuxt-property-decorator';
import { fetchPostInCategory } from '@/libs/contentful';
import { Post, MultipleItem, Category } from '@/types/entry';
import Posts from '@/components/Organisms/posts.vue';

@Component({
  components: {
    Posts,
  },
})
export default class CategorySlug extends Vue {
  posts!: Post[];
  page!: number;

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
