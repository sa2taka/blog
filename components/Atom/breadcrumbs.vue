<template>
  <nav class="breadcrumbs">
    <ul class="breadcrumbs_list">
      <template v-for="(item, index) in list">
        <li
          :key="index"
          :class="['breadcrumbs_item', { 'disabled-link': item.disabled }]"
        >
          <nuxt-link :to="item.to">{{ item.text }}</nuxt-link>
        </li>
        <li
          v-if="index !== list.length - 1"
          :key="`${index}-divider`"
          class="breadcrumbs_divider"
        >
          <the-icon
            small
            class="arrow-margin"
            icon="icon-chevron-circle-right"
          />
        </li>
      </template>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';
import TheIcon from './theIcon.vue';

import { BreadcrumbsList } from '@/libs/breadcrumbsGenerator';
import { BASE_URL } from '@/libs/const';

@Component({
  components: {
    TheIcon,
  },
})
export default class Breadcrumbs extends Vue {
  @Prop({ required: true })
  list!: BreadcrumbsList;

  smartphoneWidth = 600;

  head() {
    const hid = 'breadcrumbs';

    return {
      script: [
        {
          hid,
          type: 'application/ld+json',
          innerHTML: JSON.stringify(this.seoStructureData, null),
        },
      ],
      __dangerouslyDisableSanitizersByTagID: {
        [hid]: ['innerHTML'],
      },
    };
  }

  get seoStructureData() {
    const items = this.list.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': item.to,
        '@type': 'ListItem',
        name: item.text,
        item: `${BASE_URL}${item.to}`,
      },
    }));

    return {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items,
    };
  }
}
</script>

<style>
.breadcrumbs {
  width: 100%;
}

@media screen and (max-width: 768px) {
  .breadcrumbs {
    display: none;
  }
}

.breadcrumbs_list {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  flex: 0 1 auto;
  list-style-type: none;
  margin: 0;
  padding: 18px 12px;
}

.breadcrumbs_item {
  display: inline-flex;
  font-size: 14px;
}

.breadcrumbs_item > a {
  text-decoration: none;
}

.disabled-link {
  pointer-events: none;
}

.theme--dark .breadcrumbs_item > a {
  color: #ccc;
}

.theme--light .breadcrumbs_item > a {
  color: #444;
}

.arrow-margin {
  margin: 0 12px 4px;
}

.breadcrumbs_divider > i {
  margin-top: 4px;
}
</style>
