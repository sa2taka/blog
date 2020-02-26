<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app> </v-navigation-drawer>
    <v-app-bar fixed app>
      <webp-img name="icon" height="36" class="mr-3" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <v-spacer />
      <span>&copy; sa2taka </span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import WebpImg from '@/components/webpImg.vue';

@Component({
  components: {
    WebpImg,
  },
})
export default class Default extends Vue {
  drawer = false;
  fixed = true;

  title = process.env.BLOG_TITLE;
}
</script>
