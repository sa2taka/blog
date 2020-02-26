<template>
  <picture>
    <source :srcset="webpName" type="image/webp" />
    <img :src="pngName" :width="width" :height="height" alt="Logo" />
  </picture>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';

@Component
export default class WebpImage extends Vue {
  @Prop({ required: true })
  name!: string;

  @Prop({ default: 'auto' })
  width!: string | number;

  @Prop({ default: 'auto' })
  height!: string | number;

  get webpName() {
    return this.name + '.webp';
  }

  get pngName() {
    return this.name + '.png';
  }
}
</script>

<style></style>
