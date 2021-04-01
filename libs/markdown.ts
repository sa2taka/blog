import MarkdownIt from 'markdown-it';
// @ts-ignore
import footnote from 'markdown-it-footnote';
// @ts-ignore
import imsize from 'markdown-it-imsize';
// @ts-ignore
import katex from '@iktakahiro/markdown-it-katex';
// @ts-ignore
import markdownItContainer from 'markdown-it-container';

import prism from '@/libs/prism';

const myHeaderPlugin = (md: MarkdownIt) => {
  md.renderer.rules.heading_open = (...[tokens, idx, options, _, self]) => {
    const tag = tokens[idx].tag;
    const content = tokens[idx + 1].content;
    const m = tag.match(/^h([123456])$/);
    if (m) {
      const headerIndex = Number(m[1]);
      const newIndex = headerIndex < 6 ? headerIndex + 1 : 6;
      return `<h${newIndex} id="${content}">`;
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
      [lang, filename] = info.split(':').map((s) => s.trim());
    } else {
      lang = 'plaintext';
    }

    prism.languages.bash.prompt = /^[$#] /m;

    let value: string;
    if (prism.languages[lang]) {
      value = prism.highlight(code, prism.languages[lang], lang);
    } else {
      value = code;
      // shellで使われるtoken($, #, (%))を選択させないように変更
      if (lang === 'plaintext' || lang === '' || lang.includes('sh')) {
        value = value.replace(
          /^([$#&]\s*)/gm,
          '<span class="token prompt">$1</span>'
        );
      }
      lang = '';
    }

    let fileElement = '';
    if (filename && filename !== '') {
      fileElement = `<div class="filename">${filename}</div>`;
    }
    return `${fileElement}<code class="${
      lang !== '' ? `language-${lang}` : ''
    } ${
      filename && filename !== '' ? 'padding-for-filename' : ''
    }">${value}</code>`;
  };
};

const myImgPlugin = (md: MarkdownIt) => {
  const defaultRender =
    md.renderer.rules.image ||
    function (tokens, idx, options, _, self) {
      return self.renderToken(tokens, idx, options);
    };
  md.renderer.rules.image = (...[tokens, idx, options, env, self]) => {
    tokens[idx].attrPush(['loading', 'lazy']);
    return defaultRender(tokens, idx, options, env, self);
  };
};

const myWebpConvertPlugin = (md: MarkdownIt) => {
  const imgRender =
    md.renderer.rules.image ||
    function (tokens, idx, options, _, self) {
      return self.renderToken(tokens, idx, options);
    };
  md.renderer.rules.image = (...[tokens, idx, options, env, self]) => {
    const src = tokens[idx].attrs?.filter((elm) => elm[0] === 'src')[0]?.[1];
    if (!src) {
      return imgRender(tokens, idx, options, env, self);
    }

    const m = src.match(/\/\/images\.ctfassets\.net/);
    if (!m) {
      return imgRender(tokens, idx, options, env, self);
    }

    const token = src.includes('?') ? '&' : '?';
    const webp = `${src}${token}fm=webp`;
    const imgTag = imgRender(tokens, idx, options, env, self);
    const webpTag = `<source srcset="${webp}" type="image/webp"/>`;
    return `<picture>${webpTag}${imgTag}</picture>`;
  };
};

const containerRender = {
  validate: (params: any) => {
    return params.trim().match(/^(.*)$/);
  },

  render: (tokens: any, idx: any) => {
    const m = tokens[idx].info.trim().match(/^(.*)$/);
    const escapeHtml = (str: string) => {
      if (typeof str !== 'string') {
        return str;
      }
      return str.replace(
        /[&'`"<>]/g,
        (match) =>
          // @ts-ignore
          ({
            '&': '&amp;',
            "'": '&#x27;',
            '`': '&#x60;',
            '"': '&quot;',
            '<': '&lt;',
            '>': '&gt;',
          }[match] || '')
      );
    };

    // HACK: vuetifyのクラスを直書きで記載している
    let svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg"><path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"></path></svg>';
    switch (m[1]) {
      case 'success':
        svg =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg"><path d="M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path></svg>';
        break;
      case 'error':
        svg =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg"><path d="M8.27,3L3,8.27V15.73L8.27,21H15.73C17.5,19.24 21,15.73 21,15.73V8.27L15.73,3M9.1,5H14.9L19,9.1V14.9L14.9,19H9.1L5,14.9V9.1M11,15H13V17H11V15M11,7H13V13H11V7"></path></svg>';
        break;
      case 'warning':
        svg =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg"><path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"></path></svg>';
        break;
    }

    if (tokens[idx].nesting === 1) {
      return `<div role="alert" class="v-alert v-sheet elevation-0 ${escapeHtml(
        m[1]
      )}"><div class="v-alert__wrapper"><span aria-hidden="true" class="v-icon notranslate v-alert__icon">${svg}</span><div class="v-alert__content">`;
    } else {
      return '</div></div></div>';
    }
  },
};

export const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  typographer: true,
  langPrefix: '',
})
  .use(myCodePlugin)
  .use(footnote)
  .use(imsize, { autofill: true })
  .use(myHeaderPlugin)
  .use(myInlineCodePlugin)
  .use(myWebpConvertPlugin)
  .use(myImgPlugin)
  .use(markdownItContainer, '', containerRender);

export function addKatex(md: MarkdownIt) {
  return md.use(katex, { throwOnError: false, errorColor: ' #cc0000' });
}
