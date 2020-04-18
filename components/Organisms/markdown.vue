<template>
  <div v-html="compiledMarkdownText" />
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

@Component
export default class PostSlug extends Vue {
  @Prop({ required: true })
  markdown!: string;

  created() {
    setMarkedOptions();
  }

  get compiledMarkdownText() {
    return marked(this.markdown);
  }
}

const setMarkedOptions = () => {
  const renderer = new marked.Renderer();
  renderer.code = codeRenderer;
  renderer.heading = headingRenderer;

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

const codeRenderer = (code: string, _lang: string | undefined) => {
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
  return `${fileElement}<code class="hljs ${lang} ${filename !== '' &&
    'padding-for-filename'}">${value}</code>`;
};

const headingRenderer = (text: string, level: 1 | 2 | 3 | 4 | 5 | 6) => {
  return `<h${level} id="${text}">${text}</h${level}>\n`;
};
</script>

<style>
.padding-for-filename {
  padding-top: 2.6em !important;
}

.filename {
  color: #eee;
  display: inline-block;
  position: absolute;
  background-color: #444;
  padding: 2px 4px;
  word-break: break-all;
  border-radius: 0 0 5px 0;
  font-size: 0.9em;
  padding: 3px 6px;
}

blockquote {
  margin: 0;
  padding: 1.1em 1em;
  margin: 2em auto;
  border-left: 3px solid rgba(128, 128, 128, 0.8);
}

.theme--dark blockquote {
  color: #aaa;
}

.theme--light blockquote {
  color: #333;
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
