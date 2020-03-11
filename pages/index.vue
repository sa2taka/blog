<template>
  <v-layout column justify-center align-center>
    <div v-if="posts.length !== 0">
      <article v-for="post in posts" :key="post.id">
        <v-card :width="width">
          <webp-img
            :webp-name="generateWebp(post.fields.postImage.fields.file.url)"
            :img-name="generateFormatedImg(post.fields.postImage.fields.file.url)"
            :alt="post.fields.postImage.title"
            :width="width"
          />
          <v-card-title>{{ post.fields.title }}</v-card-title>
          <v-card-subtitle>{{ post.fields.description }}</v-card-subtitle>
        </v-card>
      </article>
    </div>
    <div v-else>投稿が見つかりません</div>
  </v-layout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from 'nuxt-property-decorator';
import { fetchPosts } from '@/libs/contentful';
import { Post, MultipleItem } from '@/types/entry';

import WebpImg from '@/components/Atom/webpImg.vue';

@Component({
  components: {
    WebpImg,
  },
})
export default class IndexPage extends Vue {
  title: string = process.env.BLOG_TITLE as string;
  description: string = process.env.BLOG_DESCRIPTION as string;

  limit = 20;
  page!: number;
  posts: Post[] = [];

  width = 320;

  async asyncData(context: Context) {
    const page = decidePage(context);
    const limit = 20; // hard code because "this" is not access

    const posts: Post[] = await fetchPosts(page, limit).then((posts: MultipleItem<Post>) => posts.items);
    return {
      page,
      posts,
    };
  }

  generateWebp(url: string) {
    return url + `?fm=webp&w=${this.width}`;
  }

  generateFormatedImg(url: string) {
    return url + `?w=${this.width}`;
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
