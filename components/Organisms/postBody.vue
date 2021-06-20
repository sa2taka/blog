<template>
  <div class="post-body" v-html="rawBodyHtml" />
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';

@Component
export default class PostBody extends Vue {
  @Prop({ required: true })
  rawBodyHtml!: string;
}
</script>

<style>
/*! purgecss start ignore */
#app .post-body * {
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

.post-body {
  line-height: 1.5;
  letter-spacing: 0.025em;
}

.theme--dark .post-body strong {
  /* color: white; */
  background: linear-gradient(transparent 75%, var(--v-secondary-base) 0%);
}

.theme--light .post-body strong {
  /* color: black; */
  background: linear-gradient(transparent 75%, var(--v-secondary-lighten1) 0%);
}

.post-body blockquote {
  padding: 0.6em 1em;
  margin: 2em auto;
  border-left: 3px solid rgba(128, 128, 128, 0.8);
}

.post-body p {
  margin-bottom: 1.8em;
}

.post-body blockquote blockquote {
  padding: 0.4em 1em;
  margin: 1.2em auto 0.7em;
  border-left: 3px solid rgba(128, 128, 128, 0.8);
}

.theme--dark .post-body blockquote {
  color: #aaa;
}

.theme--light .post-body blockquote {
  color: #333;
}

.post-body ul {
  margin-bottom: 1.8em;
}

/* 引用元名 */
.post-body blockquote p.author {
  text-align: right;
}

.post-body blockquote p.author::before {
  content: '―― ';
}

/* 画像 */
.post-body picture,
.post-body img,
.post-body source[type='image/webp'] {
  display: block;
  max-width: min(100%, 640px);
  margin: 0.6em auto;
}

/* header */
.post-body h2 {
  font-size: 2em;
}
.theme--dark .post-body h2,
.theme--dark .post-body h3 {
  border-bottom: 1px solid #222;
}

.theme--light .post-body h2,
.theme--light .post-body h3 {
  border-bottom: 1px solid #eee;
}

.post-body h2 {
  margin-top: 64px;
  margin-bottom: 24px;
}

.post-body h3 {
  margin-top: 58px;
  margin-bottom: 18px;
}

.post-body h4,
.post-body h5 {
  margin-top: 52px;
  margin-bottom: 20px;
}

.post-body hr.footnotes-sep {
  margin-top: 12px;
  margin-bottom: 16px;
}

#app .post-body code {
  margin: auto auto 1.5em;
  word-wrap: normal;
  white-space: pre;
  padding: 0.8em 0.6em;
}

#app .post-body code .token.prompt {
  user-select: none;
  color: #777;
}

.theme--light .post-body a {
  color: #006256;
}

/* HACK */
#app code {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  color: #ddd;
  background: #282c34;
  margin: 0.5em 0;
  font-weight: 500;
}

.post-body blockquote p {
  margin-bottom: 0px !important;
}

#app .post-body code.hljsspan {
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

#app code::before,
#app code::after {
  content: none;
}

#app code .hljs-comment {
  color: #acb3c0;
}

.post-body .message {
  padding: 1.2rem 0.8rem;
  margin: 1.5rem 0;
  border-left: 4px solid #2196f3;
  background: #f4f8fa;
  position: relative;
}

.theme--dark .post-body .message {
  background: #161624;
}

.post-body .message.message__success {
  background: #f4f8fa;
  border-left: 4px solid #2196f3;
}

.theme--dark .post-body .message.message__success {
  background: #161624;
}

.post-body .message.message__error {
  background: #fdf7f7;
  border-left: 4px solid #f44336;
}

.theme--dark .post-body .message.message__error {
  background: #241616;
}

.post-body .message.message__warning {
  background: #fcf8f2;
  border-left: 4px solid #ff9800;
}

.theme--dark .post-body .message.message__warning {
  background: #201612dd;
}

.post-body .message .message__icon {
  position: absolute;
  top: 1.2rem;
  left: -20px;
  width: 28px;
  height: 28px;
  padding: 4px;
  background-color: #2196f3;
  border-radius: 50% 50%;
}

.post-body .message.message__success .message__icon {
  background-color: #4caf50;
}

.post-body .message.message__error .message__icon {
  background-color: #f44336;
}

.post-body .message.message__warning .message__icon {
  background-color: #ff9800;
}

.post-body .message .message__icon svg {
  fill: white;
}

.post-body .message .alert__content {
  margin-left: 1rem;
}

.post-body .message .alert__content p:last-child {
  margin-bottom: 0;
}

#app .post-body ul,
#app .post-body ol {
  margin-left: 1.2em;
}

#app .post-body .katex-block {
  overflow-x: scroll;
}
/*! purgecss end ignore */
</style>
