<template>
  <v-layout column justify-center align-center> </v-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class IndexPage extends Vue {
  title: string = process.env.BLOG_TITLE as string;
  description: string = process.env.BLOG_DESCRIPTION as string;
}
</script>
