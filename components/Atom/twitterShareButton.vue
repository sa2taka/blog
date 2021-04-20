<template>
  <v-btn
    large
    :href="href"
    color="white"
    class="twitter-btn-width"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="ツイートを行う"
  >
    <v-icon color="#1DA1F2" v-html="$vuetify.icons.values.twitter" />
    <span class="ml-2 black--text twitter-btn-label">ツイートする</span>
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class TwitterShareButton extends Vue {
  @Prop({ required: true })
  href!: string;
}
</script>

<style scoped>
.twitter-btn-width {
  width: 180px;
}

@media screen and (max-width: 768px) {
  .twitter-btn-width {
    width: 64px;
  }

  .twitter-btn-label {
    display: none;
  }
}
</style>
