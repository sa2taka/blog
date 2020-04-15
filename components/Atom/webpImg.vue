<template>
  <picture
    onload="handleLoad()"
    :style="{
      width: width ? width + 'px' : 'auto',
      height: height ? height + 'px' : 'auto',
    }"
  >
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

  @Prop({ default: undefined })
  onLoad?: () => {};

  mounted() {
    for (let i = 0; i < this.$el.childElementCount; i++) {
      this.$el.children[i].addEventListener('load', () => {
        if (this.onLoad) {
          this.onLoad();
        }
      });

      if ((this.$el.children[i] as HTMLImageElement).complete) {
        if (this.onLoad) {
          this.onLoad();
        }
      }
    }
  }
}
</script>

<style scoped>
picture,
source,
img {
  object-fit: cover;
}
</style>
