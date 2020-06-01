<template>
  <nav v-show="!isSmartphoneWidth">
    <v-breadcrumbs :items="list">
      <template v-slot:divider>
        <v-icon>fas fa-chevron-circle-right</v-icon>
      </template>
    </v-breadcrumbs>
  </nav>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';
import { BreadcrumbsList } from '@/libs/breadcrumbsGenerator';

@Component
export default class Breadcrumbs extends Vue {
  @Prop({ required: true })
  list!: BreadcrumbsList;

  isSmartphoneWidth = false;
  smartphoneWidth = 600;

  mounted() {
    this.isSmartphoneWidth = window.innerWidth < this.smartphoneWidth;

    window.addEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.isSmartphoneWidth = window.innerWidth < this.smartphoneWidth;
  }
}
</script>

<style>
/* HACK */
.v-application li.v-breadcrumbs__divider {
  margin-bottom: 2px;
}

.v-application .theme--light a.v-breadcrumbs__item {
  color: #444;
}

.v-application .theme--dark a.v-breadcrumbs__item {
  color: #ccc;
}
</style>
