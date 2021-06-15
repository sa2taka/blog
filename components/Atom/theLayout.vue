<template>
  <div class="layout column justify-center align-center">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class TheLayout extends Vue {}
</script>

<style scoped>
.layout {
  display: flex;
  flex: 1 1 auto;
  flex-wrap: nowrap;
  min-width: 0;
}

.layout column {
  flex-direction: column;
}
</style>
