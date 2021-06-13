<template>
  <v-app>
    <v-app-bar hide-on-scroll app absolute>
      <nuxt-link class="d-flex title-link" :to="'/'">
        <webp-img
          webp-name="/icon.webp"
          img-name="/icon.png"
          width="auto"
          height="36"
          class="title-icon-margin"
          alt="logo"
        />
        <h1 class="navbar-blog-title">
          {{ title }}
        </h1>
      </nuxt-link>

      <v-spacer />

      <nav class="d-flex navigation-links">
        <div class="title-link animation-link" @click="$router.push('/')">
          Home
        </div>

        <div
          class="title-link animation-link"
          @click="$router.push('/category')"
        >
          Category
        </div>
      </nav>

      <dark-theme-switch />
    </v-app-bar>

    <v-main>
      <v-container>
        <a
          v-if="!isRoute"
          class="back-button animation-link"
          href="javascript:history.back();"
          >&lt;&lt; 戻る</a
        >
        <nuxt v-cloak />
      </v-container>
    </v-main>

    <v-footer class="main-footer">
      <div class="d-flex flex-column align-center mx-auto">
        <nuxt-link
          class="d-flex footer-link align-center animation-link"
          :to="'/'"
        >
          <the-icon icon="icon-home" />
          <span>Home</span>
        </nuxt-link>
        <div class="d-flex justify-center flex-wrap footer-between-margin">
          <a
            href="https://twitter.com/t0p_l1ght"
            class="animation-link footer-link"
          >
            <the-icon
              class="author-twitter-margin-adjust"
              color="#1DA1F2"
              icon="icon-twitter"
            />
            <span>筆者Twitterアカウント</span>
          </a>
          <nuxt-link
            :to="{ name: 'guide' }"
            class="animation-link footer-link guide-link"
            >当サイト利用について</nuxt-link
          >
        </div>
      </div>
    </v-footer>

    <v-footer app height="36">
      <v-spacer />
      <span>&copy; sa2taka</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import WebpImg from '@/components/Atom/webpImg.vue';
import DarkThemeSwitch from '@/components/Molecules/darkThemeSwitch.vue';
import { BLOG_TITLE, BASE_URL } from '@/libs/const';
import TheIcon from '../components/Atom/theIcon.vue';

@Component({
  components: {
    WebpImg,
    DarkThemeSwitch,
    TheIcon,
  },
})
export default class Default extends Vue {
  title: string = BLOG_TITLE;

  get isRoute() {
    return this.$route.name === 'index';
  }

  head() {
    return {
      link: [
        {
          rel: 'canonical',
          href: `${BASE_URL}/${this.currentPageForCanonical}`,
        },
        {
          rel: 'preload',
          as: 'image',
          href: '/icon.webp',
        },
        {
          rel: 'preload',
          as: 'image',
          href: '/icon.png',
        },
      ],
    };
  }

  get currentPageForCanonical() {
    return this.$route.path.slice(1);
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
  margin-right: 16px;
}

.navbar-blog-title {
  font-size: 1.2em;
  width: 200px;
  margin-top: 4px;
}

@media screen and (max-width: 768px) {
  .navbar-blog-title {
    display: none;
  }
}

.title-link {
  cursor: pointer;
  margin-left: 16px;
}

a.title-link {
  text-decoration: none;
}

.theme--dark a.title-link {
  color: white;
}

.theme--light a.title-link {
  color: black;
}

.animation-link {
  position: relative;
  cursor: pointer;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.main-footer {
  position: relative;
  top: -36px;
}

.footer-link {
  margin-top: 8px;
  margin-left: 8px;
  text-decoration: none;
}

.theme--dark .footer-link {
  color: white !important;
}

.theme--light .footer-link {
  color: black !important;
}

.author-twitter-margin-adjust {
  margin-top: -4px;
}

.footer-between-margin {
  margin-top: 16px;
}

.guide-link {
  margin-left: 16px;
}

.navigation-links {
  margin-right: 40px;
}
</style>
