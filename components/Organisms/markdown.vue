<template>
  <div class="markdown-body" v-html="compiledMarkdownText" />
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';
import { markdown, addKatex } from '@/libs/markdown';

@Component
export default class Markdown extends Vue {
  @Prop({ required: true })
  markdown!: string;

  @Prop({ default: false })
  latex!: boolean;

  get compiledMarkdownText() {
    let md = markdown;
    if (this.latex) {
      md = addKatex(markdown);
    }
    return md.render(this.markdown);
  }
}
</script>

<style>
/*! purgecss start ignore */
.v-application .markdown-body * {
  word-wrap: break-word;
}
.padding-for-filename {
  padding-top: 2.6em !important;
}

.filename {
  color: #eee;
  display: inline-block;
  position: absolute;
  background-color: #444;
  word-break: break-all;
  border-radius: 0 0 5px 0;
  font-size: 0.9em;
  padding: 3px 6px;
}

.markdown-body {
  line-height: 1.5;
  letter-spacing: 0.025em;
}

.theme--dark .markdown-body strong {
  /* color: white; */
  background: linear-gradient(transparent 75%, var(--v-secondary-base) 0%);
}

.theme--light .markdown-body strong {
  /* color: black; */
  background: linear-gradient(transparent 75%, var(--v-secondary-lighten1) 0%);
}

.markdown-body blockquote {
  padding: 0.6em 1em;
  margin: 2em auto;
  border-left: 3px solid rgba(128, 128, 128, 0.8);
}

.markdown-body p {
  margin-bottom: 1.8em;
}

.markdown-body blockquote blockquote {
  padding: 0.4em 1em;
  margin: 1.2em auto 0.7em;
  border-left: 3px solid rgba(128, 128, 128, 0.8);
}

.theme--dark .markdown-body blockquote {
  color: #aaa;
}

.theme--light .markdown-body blockquote {
  color: #333;
}

.markdown-body ul {
  margin-bottom: 1.8em;
}

/* 引用元名 */
.markdown-body blockquote p.author {
  text-align: right;
}

.markdown-body blockquote p.author::before {
  content: '―― ';
}

/* 画像 */
.markdown-body picture,
.markdown-body img,
.markdown-body source[type='image/webp'] {
  display: block;
  max-width: min(100%, 640px);
  margin: 0.6em auto;
}

/* header */
.markdown-body h2 {
  font-size: 2em;
}
.theme--dark .markdown-body h2,
.theme--dark .markdown-body h3 {
  border-bottom: 1px solid #222;
}

.theme--light .markdown-body h2,
.theme--light .markdown-body h3 {
  border-bottom: 1px solid #eee;
}

.markdown-body h2 {
  margin-top: 64px;
  margin-bottom: 24px;
}

.markdown-body h3 {
  margin-top: 58px;
  margin-bottom: 18px;
}

.markdown-body h4,
.markdown-body h5 {
  margin-top: 52px;
  margin-bottom: 20px;
}

.markdown-body hr.footnotes-sep {
  margin-top: 12px;
  margin-bottom: 16px;
}

.v-application .markdown-body code {
  margin: auto auto 1.5em;
  word-wrap: normal;
  white-space: pre;
  padding: 0.8em 0.6em;
}

.v-application .markdown-body code .token.prompt {
  user-select: none;
  color: #777;
}

.theme--light .markdown-body a {
  color: #006256;
}

/* HACK */
.v-application code {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  color: #ddd;
  background: #282c34;
  margin: 0.5em 0;
  font-weight: 500;
}

.markdown-body blockquote p {
  margin-bottom: 0px !important;
}

.v-application .markdown-body code.hljsspan {
  display: inline;
  overflow-x: initial;
  overflow-wrap: break-word;
  color: #ddd;
  background: #282c34;
  padding: 0.1em 0.4em;
  margin-left: 4px;
  margin-right: 4px;
  white-space: normal;
}

.v-application code::before,
.v-application code::after {
  content: none;
}

.v-application code .hljs-comment {
  color: #acb3c0;
}

.markdown-body .message {
  padding: 1.2rem 0.8rem;
  margin: 1.5rem 0;
  border-left: 4px solid #2196f3;
  background: #f4f8fa;
  position: relative;
}

.theme--dark .markdown-body .message {
  background: #161624;
}

.markdown-body .message.message__success {
  background: #f4f8fa;
  border-left: 4px solid #2196f3;
}

.theme--dark .markdown-body .message.message__success {
  background: #161624;
}

.markdown-body .message.message__error {
  background: #fdf7f7;
  border-left: 4px solid #f44336;
}

.theme--dark .markdown-body .message.message__error {
  background: #241616;
}

.markdown-body .message.message__warning {
  background: #fcf8f2;
  border-left: 4px solid #ff9800;
}

.theme--dark .markdown-body .message.message__warning {
  background: #201612dd;
}

.markdown-body .message .message__icon {
  position: absolute;
  top: 1.2rem;
  left: -16px;
  width: 28px;
  height: 28px;
  padding: 4px;
  background-color: #2196f3;
  border-radius: 50% 50%;
}

.markdown-body .message.message__success .message__icon {
  background-color: #4caf50;
}

.markdown-body .message.message__error .message__icon {
  background-color: #f44336;
}

.markdown-body .message.message__warning .message__icon {
  background-color: #ff9800;
}

.markdown-body .message .message__icon svg {
  fill: white;
}

.markdown-body .message .alert__content {
  margin-left: 1rem;
}

.markdown-body .message .alert__content p:last-child {
  margin-bottom: 0;
}
/*! purgecss end ignore */
</style>
