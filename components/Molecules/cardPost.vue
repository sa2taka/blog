<template>
  <v-lazy v-model="isActive" min-height="320" transition="fade-transition">
    <article @mouseenter="addPrerener">
      <v-card
        class="post-card mx-auto"
        hover
        :to="{ name: 'post-slug', params: { slug: post.fields.slug } }"
      >
        <v-skeleton-loader v-if="loading" type="image" />
        <webp-img
          v-show="!loading"
          :webp-name="generateWebp(post.fields.postImage.fields.file.url)"
          :img-name="generateFormatedImg(post.fields.postImage.fields.file.url)"
          :alt="altText"
          :width="width"
          :height="imgHeight"
          :on-load="onLoad"
          class="post-img"
        />

        <div class="secondary--text top-post-category mt-4 mb-n3">
          {{ post.fields.category.fields.name }}
        </div>
        <v-card-title>{{ post.fields.title }}</v-card-title>
        <v-card-subtitle>{{ post.fields.description }}</v-card-subtitle>
      </v-card>
    </article>
  </v-lazy>
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

  isActive = false;
  loading = true;
  imgHeight = 200;
  width = 320;

  updated() {
    this.setGridRow();
  }

  generateWebp(url: string) {
    return url + '?fm=webp&w=320';
  }

  generateFormatedImg(url: string) {
    return url + '?w=480';
  }

  onLoad() {
    this.loading = false;
  }

  setGridRow() {
    const height = this.$el.scrollHeight;
    this.$el.setAttribute(
      'style',
      `grid-row: span ${Math.ceil(height / 20) + 1};height: ${height}px;`
    );
  }

  addPrerener() {
    const elementId = 'prerendering-header';
    const oldLink = document.getElementById(elementId);
    const href = `/post/${this.post.fields.slug}`;

    if (oldLink) {
      const oldHref = oldLink.attributes.getNamedItem('href');
      if (oldHref && oldHref.value === href) return;
      oldLink.parentNode && oldLink.parentNode.removeChild(oldLink);
    }

    const link = document.createElement('link');
    link.id = elementId;
    link.rel = 'prerender';
    link.href = href;
    document.head && document.head.appendChild(link);
  }

  get altText() {
    return `${this.post.fields.postImage.fields.title} - ${this.post.fields.title}のタイトル画像`;
  }
}
</script>

<style scoped>
.top-post-category {
  font-size: 14px;
  font-weight: 600;
  padding-left: 16px;
}

.post-card {
  width: 320px;
}

.post-img {
  width: 320px;
}
</style>
