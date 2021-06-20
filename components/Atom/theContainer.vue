<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class TheLayout extends Vue {}
</script>

<style scoped>
.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding: 12px;
}

@media (min-width: 960px) {
  .container {
    max-width: 864px;
  }
}
</style>
