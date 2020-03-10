<template>
  <v-card elevation="12" width="256">
    <v-navigation-drawer clipped permanent right>
      <v-list>
        <v-subheader>カテゴリ</v-subheader>
        <categories></categories>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';
import Categories from '@/components/Layout/categories.vue';

@Component({
  components: {
    Categories,
  },
})
export default class LeftMenu extends Vue {
  @Prop({ default: false })
  isSmartphoneSize!: boolean;
}
</script>

<style></style>
