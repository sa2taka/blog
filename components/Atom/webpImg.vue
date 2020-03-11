<template>
  <picture>
    <source :srcset="webpName" type="image/webp" />
    <img :src="imgName" :width="width" :height="height" :alt="alt" />
  </picture>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';

@Component
export default class WebpImage extends Vue {
  @Prop({ required: true })
  webpName!: string;

  @Prop({ required: true })
  imgName!: string;

  @Prop({ required: true })
  alt!: string;

  @Prop({ default: 'auto' })
  width!: string | number;

  @Prop({ default: 'auto' })
  height!: string | number;
}
</script>

<style></style>
