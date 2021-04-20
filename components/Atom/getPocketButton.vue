<template>
  <v-btn
    large
    :href="href"
    color="white"
    class="pocket-btn-width"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Pocketを利用して後で読む"
  >
    <v-icon color="#ee4056" v-html="$vuetify.icons.values.pocket" />
    <span class="ml-2 black--text pocket-btn-label">後で読む</span>
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class GetPocketButton extends Vue {
  @Prop({ required: true })
  href!: string;
}
</script>

<style scoped>
.pocket-btn-width {
  width: 180px;
}

@media screen and (max-width: 768px) {
  .pocket-btn-width {
    width: 64px;
  }

  .pocket-btn-label {
    display: none;
  }
}
</style>
