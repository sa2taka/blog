<template>
  <div class="skelton-posts">
    <v-skeleton-loader v-for="i in 20" :key="i" max-height="18em" type="card" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class SkeltonPosts extends Vue {}
</script>

<style scoped>
.skelton-posts {
  width: 100%;
  position: relative;
  justify-content: space-between;
}
.skelton-posts > div {
  margin-top: 24px;
}
</style>
