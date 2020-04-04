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
    let lang = '';
    let filename = '';
    if (_lang) {
      [lang, filename] = _lang.split(':');
    } else {
      lang = 'plaintext';
    }
    const value = hljs.highlightAuto(code, [lang]).value;
    let fileElement = '';
    if (filename !== '') {
      fileElement = `<div class="filename">${filename}</div>`;
    }
    return `${fileElement}<code class="hljs ${lang} ${filename !== '' && 'padding-for-filename'}">${value}</code>`;
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
/* Do not set scoped */
.post {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.post-title {
  font-size: 48px;
}

.padding-for-filename {
  padding-top: 2.6em !important;
}

.filename {
  color: #eee;
  display: inline-block;
  position: absolute;
  background-color: #777;
  padding: 2px 4px;
  word-break: break-all;
  border-radius: 0 0 5px 0;
}

blockquote {
  margin: 0;
  padding: 1.1em 1em;
  margin: 2em auto;
  border-left: 3px solid rgba(128, 128, 128, 0.8);
  color: #777;
}

/* 引用元名 */
blockquote p.author {
  text-align: right;
}

blockquote p.author::before {
  content: '―― ';
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

blockquote p {
  margin-bottom: 0px !important;
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
