<template>
  <div class="post-wrapper">
    <pagination
      :page="page"
      :limit="limit"
      :count="count"
      :base-url="baseUrl"
    />
    <posts :posts="posts" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'nuxt-property-decorator';
import { Post } from '@/types/entry';

import Posts from '@/components/Organisms/posts.vue';
import Pagination from '@/components/Molecules/pagination.vue';

@Component({
  components: {
    Posts,
    Pagination,
  },
})
export default class postsWithPagenation extends Vue {
  @Prop({ required: true })
  page!: number;

  @Prop({ required: true })
  count!: number;

  @Prop({ required: true })
  limit!: number;

  @Prop({ required: true })
  baseUrl!: string;

  @Prop({ required: true })
  posts!: Post[];

  @Watch('page')
  onChangePage() {
    this.$router.push({
      name: 'page/_page',
      params: { page: this.page.toString() },
    });
  }
}
</script>

<style scoped>
.blog-title {
  font-size: 1.6em;
}

.post-wrapper {
  width: 100%;
}
</style>
