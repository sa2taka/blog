<template>
  <div>slug</div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from 'nuxt-property-decorator';
import { fetchPost } from '../../libs/contentful';
import { Post } from '../../types/entry';

@Component
export default class PostSlug extends Vue {
  post!: Post;

  async asyncData(context: Context) {
    const post: Post = await fetchPost(context.params.slug);
    return {
      post,
    };
  }

  created() {}
}
</script>

<style></style>
