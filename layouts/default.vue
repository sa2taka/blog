<template>
  <div id="app" :class="isDark ? 'theme--dark' : 'theme--light'">
    <div class="app-wrapper">
      <header class="app-bar sheet">
        <nuxt-link class="d-flex title-link align-center" :to="'/'">
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

        <div class="spacer"></div>

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
      </header>

      <main class="padding-for-header main-content">
        <div class="main-wrapper">
          <the-container>
            <a
              v-if="!isRoute"
              class="back-button animation-link"
              href="javascript:history.back();"
              >&lt;&lt; 戻る</a
            >
            <nuxt v-cloak />
          </the-container>
        </div>
      </main>

      <footer class="main-footer footer sheet">
        <div class="d-flex flex-column align-center mx-auto">
          <nuxt-link
            class="d-flex footer-link align-center animation-link"
            :to="'/'"
          >
            <the-icon icon="icon-home" />
            <span>Home</span>
          </nuxt-link>
          <div class="d-flex justify-center flex-wrap">
            <a
              href="https://twitter.com/t0p_l1ght"
              class="animation-link footer-link footer-between-margin"
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
              class="
                animation-link
                footer-link
                guide-link
                footer-between-margin
              "
              >当サイト利用について</nuxt-link
            >
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import TheIcon from '../components/Atom/theIcon.vue';
import WebpImg from '@/components/Atom/webpImg.vue';
import DarkThemeSwitch from '@/components/Molecules/darkThemeSwitch.vue';
import { BLOG_TITLE, BASE_URL } from '@/libs/const';
import TheContainer from '@/components/Atom/theContainer.vue';

@Component({
  components: {
    WebpImg,
    DarkThemeSwitch,
    TheIcon,
    TheContainer,
  },
})
export default class Default extends Vue {
  title: string = BLOG_TITLE;
  isDark: boolean = true;

  created() {
    if (process.client) {
      this.isDark = localStorage.getItem('theme') !== 'light';
    }
  }

  mounted() {
    const removed = this.isDark ? 'theme--light' : 'theme--dark';
    const appended = this.isDark ? 'theme--dark' : 'theme--light';
    if (this.$el.classList.contains(removed)) {
      this.$el.classList.remove(removed);
      this.$el.classList.add(appended);
    }
  }

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
#app {
  margin: 0;
  font-family: Helvetica Neue, Arial, Hiragino Kaku Gothic ProN, Hiragino Sans,
    BIZ UDPGothic, Meiryo, sans-serif;
  font-weight: 400;
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow-x: hidden !important;
}

.app-wrapper {
  flex: 1 1 auto;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 100%;
  position: relative;
}

a {
  color: var(--primary-color);
}

.theme--dark {
  background: #121212;
  color: #ddd;
}

.theme--light {
  background: #fff;
  color: rgba(0, 0, 0, 0.87);
}

.title-icon-margin {
  margin-left: 4%;
  height: 36px;
  margin-right: 16px;
}

.navbar-blog-title {
  font-size: 1.2em;
  width: 200px;
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

.footer.main-footer {
  position: relative;
  padding: 1em 0;
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

.spacer {
  flex-grow: 1 !important;
}

.main-content {
  display: flex;
  flex: 1 0 auto;
  max-width: 100%;
  transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.main-wrapper {
  flex: 1 1 auto;
  max-width: 100%;
  position: relative;
}

.padding-for-header {
  padding-top: 72px;
}

.footer {
  align-items: center;
  justify-content: center;
  display: flex;
  flex: 0 1 auto !important;
  flex-wrap: wrap;
  padding: 6px 16px;
  position: relative;
  transition-duration: 0.2s;
  transition-property: background-color, left, right;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.copyright-footer {
  position: fixed;
  height: 32px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
}

.sheet {
  box-shadow: 0 0 0 0 rgb(0 0 0 / 20%), 0 0 0 0 rgb(0 0 0 / 14%),
    0 0 0 0 rgb(0 0 0 / 12%);
}

.theme--dark .sheet {
  background-color: #272727;
  color: #fff;
}

.theme--light .sheet {
  background-color: #f5f5f5;
  color: rgba(0, 0, 0, 0.87);
}

.app-bar {
  height: 64px;
  margin-top: 0px;
  transform: translateY(0px);
  left: 0px;
  right: 0px;
  position: absolute;
  align-items: center;
  display: flex;
  z-index: 0;
  padding: 4px 16px;
}
</style>
