<template>
  <v-card
    :width="width"
    hover
    :post="post"
    :to="{ name: 'post-slug', params: { slug: post.fields.slug } }"
  >
    <webp-img
      v-show="!loading"
      :webp-name="generateWebp(post.fields.postImage.fields.file.url)"
      :img-name="generateFormatedImg(post.fields.postImage.fields.file.url)"
      :alt="post.fields.postImage.title"
      :width="width"
      :on-load="onLoad"
    />
    <v-skeleton-loader v-if="loading" :width="width" type="image" />
    <div class="secondary--text top-post-category mt-4 mb-n3">
      {{ post.fields.category.fields.name }}
    </div>
    <v-card-title>{{ post.fields.title }}</v-card-title>
    <v-card-subtitle>{{ post.fields.description }}</v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { Post } from '@/types/entry';

import WebpImg from '@/components/Atom/webpImg.vue';

@Component({
  components: {
    WebpImg,
  },
})
export default class TopPagePosts extends Vue {
  @Prop({ required: true })
  post!: Post;

  @Prop({ default: 320 })
  width = 320;

  loading = true;

  generateWebp(url: string) {
    return url + `?fm=webp&w=${this.width}`;
  }

  generateFormatedImg(url: string) {
    return url + `?w=${this.width}`;
  }

  onLoad() {
    this.loading = false;
  }
}
</script>

<style scoped>
.top-post-category {
  font-size: 14px;
  font-weight: 600;
  padding-left: 16px;
}
</style>
