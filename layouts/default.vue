<template>
  <v-app>
    <v-app-bar hide-on-scroll app>
      <webp-img name="icon" height="36" class="title-icon-margin mr-3" alt="logo" />
      <v-spacer />
      <dark-theme-switch class="mr-3" />
    </v-app-bar>
    <left-menu></left-menu>

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
import LeftMenu from '@/components/Layout/leftMenu.vue';

@Component({
  components: {
    WebpImg,
    DarkThemeSwitch,
    LeftMenu,
  },
})
export default class Default extends Vue {
  drawer = false;
  title = process.env.BLOG_TITLE;
  isSmartphoneWidth = false;
  smartphoneWidth = 600;

  mounted() {
    this.isSmartphoneWidth = window.innerWidth > this.smartphoneWidth;
  }
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
