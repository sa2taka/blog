<template>
  <v-pagination
    v-if="Math.ceil(count / limit) >= 2"
    :value="value"
    :length="Math.ceil(count / limit)"
    circle
    @input="input($event)"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator';

@Component
export default class Pagination extends Vue {
  @Prop({ required: true })
  value!: number;

  @Prop({ required: true })
  count!: number;

  @Prop({ required: true })
  limit!: number;

  @Emit()
  input(_: Event) {}
}
</script>

<style scoped></style>
