<template>
  <v-app>
    <v-app-bar hide-on-scroll app absolute>
      <nuxt-link :to="{ name: 'index' }">
        <webp-img name="/icon" height="36" class="title-icon-margin mr-3" alt="logo" />
      </nuxt-link>

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
import CategoryMenu from '@/components/Organisms/categoryMenu.vue';

@Component({
  components: {
    WebpImg,
    DarkThemeSwitch,
    CategoryMenu,
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
