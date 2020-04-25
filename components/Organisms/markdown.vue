<template>
  <div class="markdown-body" v-html="compiledMarkdownText" />
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';
import { markdown } from '@/libs/markdown';

@Component
export default class Markdown extends Vue {
  @Prop({ required: true })
  markdown!: string;

  created() {
    // setMarkedOptions();
  }

  get compiledMarkdownText() {
    return markdown.render(this.markdown);
  }
}

// const setMarkedOptions = () => {
//   const renderer = new marked.Renderer();
//   renderer.code = codeRenderer;
//   renderer.heading = headingRenderer;

//   renderer.codespan = code => {
//     const value = hljs.highlightAuto(code, ['plaintext']).value;
//     return `<code class="hljsspan">${value}</code>`;
//   };
//   marked.setOptions({
//     // code要素にdefaultで付くlangage-を削除
//     langPrefix: '',
//     renderer,
//   });
// };

// const codeRenderer = (code: string, _lang: string | undefined) => {
//   let lang = '';
//   let filename = '';
//   if (_lang) {
//     [lang, filename] = _lang.split(':');
//   } else {
//     lang = 'plaintext';
//   }
//   const value = hljs.highlightAuto(code, [lang]).value;
//   let fileElement = '';
//   if (filename !== '') {
//     fileElement = `<div class="filename">${filename}</div>`;
//   }
//   return `${fileElement}<code class="hljs ${lang} ${filename !== '' &&
//     'padding-for-filename'}">${value}</code>`;
// };

// const headingRenderer = (text: string, level: 1 | 2 | 3 | 4 | 5 | 6) => {
//   return `<h${level} id="${text}">${text}</h${level}>\n`;
// };
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

.markdown-body {
  line-height: 1.5;
  letter-spacing: 0.025em;
}

.markdown-body blockquote {
  margin: 0;
  padding: 1.1em 1em;
  margin: 2em auto;
  border-left: 3px solid rgba(128, 128, 128, 0.8);
}

.theme--dark .markdown-body blockquote {
  color: #aaa;
}

.theme--light .markdown-body blockquote {
  color: #333;
}

.markdown-body ul {
  margin-bottom: 16px;
}

/* 引用元名 */
.markdown-body blockquote p.author {
  text-align: right;
}

.markdown-body blockquote p.author::before {
  content: '―― ';
}

/* 画像 */
.markdown-body img {
  width: 100%;
}

/* header */
.markdown-body h1 {
  font-size: 2em;
}
.theme--dark .markdown-body h1,
.theme--dark .markdown-body h2 {
  border-bottom: 1px solid #222;
}

.theme--light .markdown-body h1,
.theme--light .markdown-body h2 {
  border-bottom: 1px solid #eee;
}

.markdown-body h1 {
  margin-top: 42px;
  margin-bottom: 18px;
}

.markdown-body h2 {
  margin-top: 24px;
  margin-bottom: 18px;
}

.markdown-body h3,
.markdown-body h4 {
  margin-bottom: 20px;
  margin-top: 12px;
}

/* HACK */
.v-application code {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  color: #abb2bf;
  background: #282c34;
  margin: 0.5em 0;
}

.markdown-body blockquote p {
  margin-bottom: 0px !important;
}

.v-application code.hljsspan {
  display: inline;
  overflow-x: initial;
  color: #abb2bf;
  background: #282c34;
  padding: 0.1em 0.4em;
  margin-left: 4px;
  margin-right: 4px;
}

.v-application code::before,
.v-application code::after {
  content: none;
}

.markdown-body hr.footnotes-sep {
  margin-top: 12px;
  margin-bottom: 16px;
}
</style>
