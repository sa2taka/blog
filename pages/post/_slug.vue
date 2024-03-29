<template>
  <the-layout column justify-center align-center>
    <breadcrumbs :list="breadcrumbsList"></breadcrumbs>
    <article class="post post-width">
      <div class="post-title d-flex align-center flex-column">
        <nuxt-link
          class="post-category secondary--text animation-link align-center"
          :to="{
            name: 'category-slug',
            params: { slug: post.fields.category.fields.slug },
          }"
          >{{ post.fields.category.fields.name }}</nuxt-link
        >
        <h1 class="post-title-name">{{ post.fields.title }}</h1>
        <p class="post-date">
          作成日:
          <time :datetime="postDateForDateTag">{{ postDate }}</time>
        </p>
        <p class="post-date">
          更新日:
          <time :datetime="updateDateForDateTag">{{ updateDate }}</time>
        </p>
      </div>

      <post-index :index="postIndex" class="post-index-margin" />
      <post-body class="post-body-margin" :raw-body-html="rawBodyHtml" />
      <footer class="post-footer-margin">
        <share-buttons :title="post.fields.title" />
      </footer>
    </article>
  </the-layout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from 'nuxt-property-decorator';
import { Post } from '@/types/entry';
import { BASE_URL } from '@/libs/const';
import { generateIndexies } from '@/libs/generateIndexies';
import { generatePostBreadcrumbsList } from '@/libs/breadcrumbsGenerator';

import PostBody from '@/components/Organisms/postBody.vue';
import PostIndex from '@/components/Molecules/postIndex.vue';
import Breadcrumbs from '@/components/Atom/breadcrumbs.vue';
import ShareButtons from '@/components/Molecules/shareButtons.vue';
import TheLayout from '@/components/Atom/theLayout.vue';

import '@/libs/prism-theme.css';

@Component({
  components: {
    PostBody,
    PostIndex,
    Breadcrumbs,
    ShareButtons,
    TheLayout,
  },
})
export default class PostSlug extends Vue {
  post!: Post;
  rawBodyHtml!: String;
  postIndex!: PostIndex[];
  prevHash = '';

  async asyncData(context: Context) {
    const { fetchPost } = await import('@/libs/contentful');
    if (!context.params.slug || context.params.slug === '') {
      return context.error({
        statusCode: 404,
      });
    }
    const post: Post = await fetchPost(context.params.slug);

    if (!post) {
      return context.error({
        statusCode: 404,
      });
    }

    const { markdown } = await import('../../libs/markdown');
    const rawBodyHtml = markdown.render(post.fields.body);
    const postIndex = generateIndexies(post.fields.body);

    // HACK: post.fields.body does not use after this process.
    // Delete body to reduce traffic.
    post.fields.body = '';

    return {
      post,
      rawBodyHtml,
      postIndex,
    };
  }

  mounted() {
    if (process.client) {
      this.registerHashEvent();
    }
  }

  beforeDestroy() {
    if (process.client) {
      this.removeHashEventListener();
    }
  }

  registerHashEvent() {
    this.indexes.forEach((element) => {
      element.addEventListener('click', this.addHashToHistory);
    });

    this.footnoteRefs.forEach((element) => {
      element.addEventListener('click', this.addHashToHistory);
    });

    this.backFootnoteRefs.forEach((element) => {
      element.addEventListener('click', this.onClickBackfootRef);
    });
  }

  removeHashEventListener() {
    this.indexes.forEach((element) => {
      element.removeEventListener('click', this.addHashToHistory);
    });

    this.footnoteRefs.forEach((element) => {
      element.removeEventListener('click', this.addHashToHistory);
    });

    this.backFootnoteRefs.forEach((element) => {
      element.removeEventListener('click', this.onClickBackfootRef);
    });
  }

  addHashToHistory(event: Event) {
    const target = event.currentTarget;
    if (target && target instanceof HTMLAnchorElement) {
      history.replaceState(
        { hash: target.id },
        document.title,
        `#${target.id}`
      );
      this.prevHash = target.id;
    }
  }

  onClickBackfootRef(event: Event) {
    const target = event.currentTarget;
    if (target && target instanceof HTMLAnchorElement) {
      const refferId = new URL(target.href).hash.replace('#', '');

      // if refferId is at last of hash history
      if (refferId === this.prevHash) {
        history.back();
        event.preventDefault();
      } else {
        const re = /^#fnref(\d+)$/i;
        const match = refferId.match(re);
        if (!match || !match[1]) {
          return;
        }

        const refferNumber = match[1];
        const replacement = `fn${refferNumber}`;
        history.replaceState(
          { hash: replacement },
          document.title,
          `#${replacement}`
        );
      }
    }
  }

  get indexes() {
    return Array.from(document.querySelectorAll('.post-index .index-link'));
  }

  get footnoteRefs() {
    return Array.from(
      document.querySelectorAll('.post-body sup.footnote-ref > a')
    );
  }

  get backFootnoteRefs() {
    return Array.from(
      document.querySelectorAll('.post-body a.footnote-backref')
    );
  }

  get postDate() {
    const rawDate = this.post.sys.createdAt;

    return formatDate(new Date(rawDate));
  }

  get updateDate() {
    const rawDate = this.post.sys.updatedAt;

    return formatDate(new Date(rawDate));
  }

  get postDateForDateTag() {
    return this.post.sys.createdAt.substring(0, 10);
  }

  get updateDateForDateTag() {
    return this.post.sys.updatedAt.substring(0, 10);
  }

  get breadcrumbsList() {
    return generatePostBreadcrumbsList(this.post);
  }

  get seoStructureData() {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': BASE_URL + this.$route.path,
      },
      headline: this.post.fields.title,
      datePublished: this.post.sys.createdAt.toString(),
      dateModified: this.post.sys.updatedAt.toString(),
      author: {
        '@type': 'Person',
        name: 'sa2taka',
      },
      publisher: {
        '@type': 'Organization',
        name: 'sa2taka',
        logo: {
          '@type': 'ImageObject',
          url: BASE_URL + '/logo-for-twitter.png',
        },
      },
    };
  }

  head() {
    const link = [];
    const hid = 'article';
    if (this.post.fields.latex) {
      link.push({
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css',
        type: 'text/css',
        integrity:
          'sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X',
        crossorigin: 'anonymous',
      });
      link.push({
        rel: 'preload',
        as: 'font',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/fonts/KaTeX_Main-Regular.woff2',
      });
    }

    return {
      style: [
        {
          type: 'text/css',
          src: 'highlight.js/styles/atom-one-dark.css',
        },
      ],
      title: this.post.fields.title + ' - ',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.fields.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.post.fields.title + ' - 園児ニアの庭園',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.post.fields.description,
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: BASE_URL + this.$route.path,
        },
      ],
      link,
      script: [
        {
          hid,
          type: 'application/ld+json',
          innerHTML: JSON.stringify(this.seoStructureData, null),
        },
      ],
      __dangerouslyDisableSanitizersByTagID: {
        [hid]: ['innerHTML'],
      },
    };
  }
}

const formatDate = (date: Date) => {
  const fillBy0 = (num: number, length: number) => {
    return ('0000' + num.toString()).slice(-length);
  };
  const year = date.getFullYear();
  const month = fillBy0(date.getMonth() + 1, 2);
  const day = fillBy0(date.getDate(), 2);
  const week = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
  return `${year}/${month}/${day}(${week})`;
};
</script>

<style>
/* Do not set scoped */
.post {
  min-width: 300px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 12px;
}

.post-width {
  width: 816px;
}

@media (max-width: 1020px) and (min-width: 768px) {
  .post-width {
    width: 80%;
  }
}

@media (max-width: 767px) {
  .post-width {
    width: 99%;
  }
}

.back-button {
  text-decoration: none;
}

.theme--dark .back-button {
  color: #aaa !important;
}

.theme--light .back-button {
  color: #333 !important;
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

.post-date {
  font-size: 0.9em !important;
  margin-bottom: 0 !important;
  margin-top: 0 !important;
}

.theme--dark .post-date {
  color: #ccc;
}

.theme--light .post-date {
  color: #222;
}

.post-title {
  padding: 8px 12px;
  margin-bottom: 0;
  margin-top: auto;
  min-width: 80%;
  overflow-wrap: break-word;
}

.post-title-name {
  font-size: 2em;
  text-align: center;
  margin: 0.4em auto;
}

@media (max-width: 600px) {
  .post-title-name {
    font-size: 1.6em;
  }
}
@media (min-width: 601px) {
  .post-title-name {
    font-size: 2em;
  }
}

.post-category {
  margin-bottom: 0px !important;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
}

.post-author {
  margin-bottom: 0px !important;
  font-size: 164x;
  margin-left: 2em;
}

.post-title-area {
  height: 240px;
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
  border-radius: 12px;
  background-position: center;
}

.post-index-margin {
  margin-top: 40px;
}

.post-body-margin {
  margin-top: 32px;
}

.post-footer-margin {
  margin-top: 24px;
}
</style>
