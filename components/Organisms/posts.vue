<template>
  <div v-if="posts.length !== 0">
    <article v-for="post in posts" :key="post.id" class="posts">
      <card-post class="post" :post="post" />
    </article>
  </div>
  <div v-else>投稿が見つかりません</div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';
import { Post } from '@/types/entry';
import CardPost from '@/components/Organisms/cardPost.vue';

@Component({
  components: {
    CardPost,
  },
})
export default class Posts extends Vue {
  @Prop({ required: true })
  posts!: Post[];

  limit = 20;

  width = 320;

  handlePostClick(slug: string) {
    this.$router.push({ name: 'post-slug', params: { slug } });
  }
}
</script>

<style scoped>
.posts {
  display: grid;
  grid-template-rows: 20px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}
</style>
