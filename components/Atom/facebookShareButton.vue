<template>
  <v-btn large :href="href" color="white" width="180">
    <v-icon
      color="#1877f2"
      class="facebook-logo"
      v-html="$vuetify.icons.values.facebook"
    />
    <span class="ml-2 black--text">シェアする</span>
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class FacebookShareButton extends Vue {
  @Prop({ required: true })
  href!: string;
}
</script>

<style scoped>
.facebook-logo {
  font-size: 28px;
}
</style>
