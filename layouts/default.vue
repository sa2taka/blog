<template>
  <v-app>
    <v-app-bar hide-on-scroll app absolute>
      <div :to="{ name: 'index' }" class="d-flex title-link" @click="$router.push('/')">
        <webp-img name="/icon" height="36" class="title-icon-margin mr-3" alt="logo" />
        <h1 class="blog-title">{{ title }}</h1>
      </div>

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
  isSmartphoneWidth = false;
  smartphoneWidth = 600;
  title: string = process.env.BLOG_TITLE as string;

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

.blog-title {
  font-size: 1.4em;
  width: 200px;
  margin-top: 1px;
}

.title-link {
  cursor: pointer;
}
</style>
