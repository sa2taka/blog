<template>
  <v-card :width="width">
    <webp-img
      :webp-name="generateWebp(post.fields.postImage.fields.file.url)"
      :img-name="generateFormatedImg(post.fields.postImage.fields.file.url)"
      :alt="post.fields.postImage.title"
      :width="width"
      :on-load="onLoad"
    />
    <v-skeleton-loader v-if="!loading" :width="width" type="image" />
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

  loading = false;
  width = 320;

  generateWebp(url: string) {
    return url + `?fm=webp&w=${this.width}`;
  }

  generateFormatedImg(url: string) {
    return url + `?w=${this.width}`;
  }

  onLoad() {
    console.log('load');
    this.loading = true;
  }
}
</script>
