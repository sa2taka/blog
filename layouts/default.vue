<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app> </v-navigation-drawer>
    <v-app-bar hide-on-scroll app absolute>
      <webp-img name="icon" height="36" class="title-icon-margin mr-3" alt="logo" />
      <v-spacer />
      <dark-theme-switch class="mr-3" />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      <v-spacer />
      <span>&copy; sa2taka </span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import WebpImg from '@/components/webpImg.vue';
import DarkThemeSwitch from '@/components/Molecules/darkThemeSwitch.vue';

@Component({
  components: {
    WebpImg,
    DarkThemeSwitch,
  },
})
export default class Default extends Vue {
  drawer = false;

  title = process.env.BLOG_TITLE;
}
</script>

<style>
html {
  overflow-y: auto !important;
}
.title-icon-margin {
  margin-left: 4%;
  height: 36px;
}
</style>
