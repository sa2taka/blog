<template>
  <v-btn large :href="href" color="white" width="180">
    <v-icon color="#ee4056" v-html="$vuetify.icons.values.pocket" />
    <span class="ml-2 black--text">後で読む</span>
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
