<template>
  <v-app>
    <v-app-bar hide-on-scroll app absolute>
      <div class="d-flex title-link" @click="$router.push('/')">
        <webp-img
          webp-name="/icon.webp"
          img-name="/icon.png"
          height="36"
          class="title-icon-margin mr-3"
          alt="logo"
        />
        <h1 class="navbar-blog-title">{{ title }}</h1>
      </div>

      <v-spacer />

      <nav class="mr-10 d-flex">
        <div class="title-link animation-link ml-4" @click="$router.push('/')">
          Home
        </div>

        <div
          class="title-link animation-link ml-4"
          @click="$router.push('/category')"
        >
          Category
        </div>
      </nav>

      <dark-theme-switch class="mr-3" />
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      <v-spacer />
      <span>&copy; sa2taka</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import WebpImg from '@/components/Atom/webpImg.vue';
import DarkThemeSwitch from '@/components/Molecules/darkThemeSwitch.vue';
import CategoryMenu from '@/components/Organisms/categoryMenu.vue';

import { BLOG_TITLE } from '@/libs/const';

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
  title: string = BLOG_TITLE;

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

.navbar-blog-title {
  font-size: 1.2em;
  width: 200px;
  margin-top: 4px;
}

.title-link {
  cursor: pointer;
}

.animation-link {
  position: relative;
}

.animation-link::after {
  position: absolute;
  bottom: 0;
  left: 50%;
  content: '';
  width: 0;
  height: 1px;
  background-color: #009688;
  transition: 0.3s;
  transform: translateX(-50%);
}

.animation-link:hover::after {
  width: 100%;
}
</style>
