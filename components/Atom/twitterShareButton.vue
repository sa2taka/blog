<template>
  <v-btn large :href="href" color="white" width="180" target="_blank">
    <v-icon color="#1DA1F2" v-html="$vuetify.icons.values.twitter" />
    <span class="ml-2 black--text">ツイートする</span>
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
