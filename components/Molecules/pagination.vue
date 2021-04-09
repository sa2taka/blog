<template>
  <nav aria-label="ページネーションナビゲーション">
    <ul class="pagenation">
      <li>
        <v-btn v-if="isFirstPage(page)" icon disabled aria-label="前のページ">
          <v-icon>fa-chevron-left</v-icon>
        </v-btn>
        <v-btn
          v-else
          aria-label="前のページ"
          :to="generatePageLink(page - 1)"
          nuxt
          icon
        >
          <v-icon>fa-chevron-left</v-icon>
        </v-btn>
      </li>
      <li v-for="i in maxPage" :key="i">
        <v-btn
          :aria-label="
            i === page ? `現在のページ ${i}ページ目` : `${i}ページへ移動する`
          "
          :to="generatePageLink(i)"
          nuxt
          icon
        >
          {{ i }}
        </v-btn>
      </li>
      <li>
        <v-btn v-if="isLastPage(page)" disabled aria-label="後ろのページ" icon>
          <v-icon>fa-chevron-right</v-icon>
        </v-btn>
        <v-btn
          v-else
          aria-label="後ろのページ"
          :to="generatePageLink(page + 1)"
          nuxt
          icon
          ><v-icon>fa-chevron-right</v-icon>
        </v-btn>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class Pagination extends Vue {
  @Prop({ required: true })
  page!: number;

  @Prop({ required: true })
  count!: number;

  @Prop({ required: true })
  limit!: number;

  @Prop({ required: true })
  baseUrl!: string;

  get maxPage() {
    return Math.ceil(this.count / this.limit);
  }

  isFirstPage(page: number) {
    return page === 1;
  }

  isLastPage(page: number) {
    return page === this.maxPage;
  }

  generatePageLink(page: number) {
    const formatedUrl =
      this.baseUrl === '' || this.baseUrl.endsWith('/')
        ? this.baseUrl
        : this.baseUrl + '/';
    return formatedUrl + page.toString();
  }
}
</script>

<style scoped>
.pagenation {
  align-items: center;
  display: inline-flex;
  list-style-type: none;
  justify-content: center;
  margin: 0;
  max-width: 100%;
  width: 100%;
}
</style>
