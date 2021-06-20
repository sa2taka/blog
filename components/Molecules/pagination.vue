<template>
  <nav aria-label="ページネーションナビゲーション">
    <ul class="pagenation">
      <li>
        <the-button
          v-if="!isFirstPage(page)"
          aria-label="前のページ"
          :to="generatePageLink(page - 1)"
          nuxt
          icon
          small
        >
          <the-icon small icon="icon-chevron-left" />
        </the-button>
        <div v-else class="paging-padding"></div>
      </li>
      <li v-for="i in maxPage" :key="i">
        <the-button
          :aria-label="
            i === page ? `現在のページ ${i}ページ目` : `${i}ページへ移動する`
          "
          :disabled="i === page"
          :to="generatePageLink(i)"
          nuxt
          icon
          outlined
          small
          class="page-number-button"
        >
          {{ i }}
        </the-button>
      </li>
      <li>
        <the-button
          v-if="!isLastPage(page)"
          aria-label="後ろのページ"
          :to="generatePageLink(page + 1)"
          nuxt
          icon
          small
        >
          <the-icon small icon="icon-chevron-right" />
        </the-button>
        <div v-else class="paging-padding"></div>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import TheButton from '@/components/Atom/theButton.vue';
import TheIcon from '../Atom/theIcon.vue';

@Component({
  components: {
    TheIcon,
    TheButton,
  },
})
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
  padding: 0;
}

.pagenation > li {
  margin: 0 4px;
}

.pagenation > li > .page-number-button {
  font-size: 0.8rem !important;
}

.paging-padding {
  width: 32px;
}
</style>
