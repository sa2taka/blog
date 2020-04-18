<template>
  <div class="main">
    <a class="back-button animation-link" href="javascript:history.back();"
      >&lt;&lt; 戻る</a
    >
    <article class="post">
      <p class="mb-0 post-date">作成日: {{ postDate }}</p>
      <p class="mb-0 post-date">更新日: {{ updateDate }}</p>
      <div
        class="post-title-area"
        :style="{
          'background-image': `url(${post.fields.postImage.fields.file.url}?fm=webp)`,
        }"
      >
        <div class="post-title">
          <nuxt-link
            class="post-category secondary--text animation-link"
            :to="{
              name: 'category-slug',
              params: { slug: post.fields.category.fields.slug },
            }"
          >
            {{ post.fields.category.fields.name }}
          </nuxt-link>
          <h1 class="post-title-name">{{ post.fields.title }}</h1>
          <p class="post-author">by {{ post.fields.author.fields.name }}</p>
        </div>
      </div>
      <post-index :index="postIndex" class="mt-10" />
      <markdown class="mt-8" :markdown="post.fields.body" />
    </article>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from 'nuxt-property-decorator';

import { fetchPost } from '@/libs/contentful';
import { Post } from '@/types/entry';
import { PostIndex as IPostIndex } from '@/types/postIndex';
import { BASE_URL } from '@/libs/const';

import Markdown from '@/components/Organisms/markdown.vue';
import PostIndex from '@/components/Molecules/postIndex.vue';

@Component({
  components: {
    Markdown,
    PostIndex,
  },
})
export default class PostSlug extends Vue {
  post!: Post;

  async asyncData(context: Context) {
    const post: Post = await fetchPost(context.params.slug);

    return {
      post,
    };
  }

  get postDate() {
    const rawDate = this.post.sys.createdAt;

    return formatDate(new Date(rawDate));
  }

  get updateDate() {
    const rawDate = this.post.sys.updatedAt;

    return formatDate(new Date(rawDate));
  }

  get postIndex() {
    return generateIndexies(this.post.fields.body);
  }

  get ogImage() {
    return this.post.fields.postImage.fields.file.url + '?w=1200';
  }

  head() {
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
          name: 'og:description',
          content: this.post.fields.description,
        },
        {
          name: 'og:image',
          content: this.ogImage,
        },
        {
          name: 'og:url',
          content: BASE_URL + this.$route.path,
        },
      ],
    };
  }
}

const generateIndexies = (markdown: string) => {
  const markdownWithoutCode = markdown
    .replace(/```[\s\S]?```/g, '')
    .replace(/`[\s\S]?`/g, '');
  const regexp = /^\s*(?<hash>#{1,3})\s*(?<title>.+)\s*$/gm;

  const postIndex: IPostIndex[] = [];

  let match: RegExpMatchArray | null;
  while ((match = regexp.exec(markdownWithoutCode))) {
    if (match?.groups) {
      const level = match.groups.hash.length;
      const title = match.groups.title;

      postIndex.push({
        level,
        title,
      });
    }
  }

  return postIndex;
};

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
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 12px;
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
  text-align: right;
  font-size: 0.9em !important;
}

.theme--dark .post-date {
  color: #aaa;
}

.theme--light .post-date {
  color: #333;
}

.post-title {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 8px 12px;
  margin-bottom: 0;
  margin-top: auto;
  min-width: 80%;
  border-radius: 0 12px 0 10.5px;
  color: white;
}

.post-title-name {
  font-size: 24px;
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
  background-size: cover;
  display: flex;
  border-radius: 12px;
}
</style>
