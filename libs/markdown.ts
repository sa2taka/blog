import MarkdownIt from 'markdown-it';
// @ts-ignore
import sanitizer from 'markdown-it-sanitizer';
// @ts-ignore
import footnote from 'markdown-it-footnote';
// @ts-ignore

import imsize from 'markdown-it-imsize';

import hljs from '@/libs/hljs';

const myHeaderPlugin = (md: MarkdownIt) => {
  md.renderer.rules.heading_open = (...[tokens, idx, options, _, self]) => {
    const tag = tokens[idx].tag;
    const content = tokens[idx + 1].content;
    if (tag.match(/^h[123456]$/)) {
      return `<${tag} id="${content}">`;
    } else {
      return self.renderToken(tokens, idx, options);
    }
  };
};

const myInlineCodePlugin = (md: MarkdownIt) => {
  md.renderer.rules.code_inline = (...[tokens, idx]) => {
    const tag = tokens[idx].tag;
    const content = tokens[idx].content;
    return `<${tag} class="hljsspan">${content}</${tag}>`;
  };
};

const myCodePlugin = (md: MarkdownIt) => {
  // code_blockではなくfence ruleにてcodeは拾われるらしい
  // @ts-ignore
  md.renderer.rules.fence = (...[tokens, idx]) => {
    const info = tokens[idx].info;
    const code = tokens[idx].content;

    let lang = '';
    let filename = '';
    if (info) {
      [lang, filename] = info.split(':');
    } else {
      lang = 'plaintext';
    }
    const value = hljs.highlightAuto(code, [lang]).value;
    let fileElement = '';
    if (filename && filename !== '') {
      fileElement = `<div class="filename">${filename}</div>`;
    }
    return `${fileElement}<code class="hljs ${lang} ${filename &&
      filename !== '' &&
      'padding-for-filename'}">${value}</code>`;
  };
};

export const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  typographer: true,
  langPrefix: '',
})
  .use(myCodePlugin)
  .use(sanitizer)
  .use(footnote)
  .use(imsize, { autofill: true })
  .use(myHeaderPlugin)
  .use(myInlineCodePlugin);
