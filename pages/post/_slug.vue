<template>
  <article class="post">
    <h1 class="post-title">{{ post.fields.title }}</h1>
    <div v-html="compiledMarkdownText" />
  </article>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from 'nuxt-property-decorator';
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

import { fetchPost } from '../../libs/contentful';
import { Post } from '../../types/entry';

@Component
export default class PostSlug extends Vue {
  post!: Post;

  async asyncData(context: Context) {
    const post: Post = await fetchPost(context.params.slug);
    return {
      post,
    };
  }

  created() {
    setMarkedOptions();
  }

  get compiledMarkdownText() {
    return marked(this.post.fields.body);
  }

  head() {
    return {
      style: [
        {
          type: 'text/css',
          src: 'highlight.js/styles/atom-one-dark.css',
        },
      ],
    };
  }
}

const setMarkedOptions = () => {
  const renderer = new marked.Renderer();
  renderer.code = (code, _lang) => {
    const lang = _lang || 'plaintext';
    const value = hljs.highlightAuto(code, [lang]).value;
    return `<code class="hljs ${lang}">${value}</code>`;
  };

  renderer.codespan = code => {
    const value = hljs.highlightAuto(code, ['plaintext']).value;
    return `<code class="hljsspan">${value}</code>`;
  };
  marked.setOptions({
    // code要素にdefaultで付くlangage-を削除
    langPrefix: '',
    renderer,
  });
};
</script>

<style>
.post-title {
  font-size: 48px;
}

/* HACK */
.v-application code.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  color: #abb2bf;
  background: #282c34;
  margin: 0.5em 0;
}

.v-application code.hljsspan {
  color: #abb2bf;
  background: #282c34;
  padding: 0.1em 0.4em;
}

.v-application code::before,
.v-application code::after {
  content: none;
}
</style>
