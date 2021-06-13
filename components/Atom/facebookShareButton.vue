<template>
  <v-btn
    large
    :href="href"
    color="white"
    class="facebook-btn-width"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebookを利用してシェアする"
  >
    <v-icon
      color="#1877f2"
      class="facebook-logo"
      v-html="$vuetify.icons.values.facebook"
    />
    <span class="black--text facebook-btn-label">シェアする</span>
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

.facebook-btn-width {
  width: 180px;
}

.facebook-btn-label {
  margin-left: 4px;
}

@media screen and (max-width: 768px) {
  .facebook-btn-width {
    width: 64px;
  }

  .facebook-btn-label {
    display: none;
  }
}
</style>
