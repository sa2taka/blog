<template>
  <li class="post-list-element" @mouseenter="addPrerender">
    <time class="mb-0 py-0 list-post-date" :datetime="postDateForDateTag">{{
      postDate
    }}</time>
    <nuxt-link
      :to="{ name: 'post-slug', params: { slug: post.fields.slug } }"
      class="list-post-title"
      >{{ post.fields.title }}</nuxt-link
    >
    <nuxt-link
      class="secondary--text list-post-category"
      :to="{
        name: 'category-slug',
        params: { slug: post.fields.category.fields.slug },
      }"
    >
      {{ post.fields.category.fields.name }}
    </nuxt-link>
  </li>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { Post } from '@/types/entry';

const WebpImg = () => import('@/components/Atom/webpImg.vue');

@Component({
  components: {
    WebpImg,
  },
})
export default class CardPost extends Vue {
  @Prop({ required: true })
  post!: Post;

  isActive = false;
  loading = true;
  maxWidth = 840;
  height = '18em';

  generateWebp(url: string) {
    return url + '?fm=webp&w=480';
  }

  generateFormatedImg(url: string) {
    return url + '?w=480';
  }

  onLoad() {
    this.loading = false;
  }

  addPrerender() {
    const elementId = 'prerendering-header';
    const oldLink = document.getElementById(elementId);
    const href = `/post/${this.post.fields.slug}`;

    if (oldLink) {
      const oldHref = oldLink.attributes.getNamedItem('href');
      if (oldHref && oldHref.value === href) return;
      oldLink.parentNode && oldLink.parentNode.removeChild(oldLink);
    }

    const link = document.createElement('link');
    link.id = elementId;
    link.rel = 'prerender';
    link.href = href;
    document.head && document.head.appendChild(link);
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
    const rawDate = this.post.sys.createdAt;

    return formatDateForDateTag(new Date(rawDate));
  }

  get updateDateForDateTag() {
    const rawDate = this.post.sys.updatedAt;

    return formatDateForDateTag(new Date(rawDate));
  }
}

const formatDate = (date: Date) => {
  const fillBy0 = (num: number, length: number) => {
    return ('0000' + num.toString()).slice(-length);
  };
  const year = date.getFullYear();
  const month = fillBy0(date.getMonth() + 1, 2);
  const day = fillBy0(date.getDate(), 2);
  return `${year}/${month}/${day}`;
};

const formatDateForDateTag = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};
</script>

<style scoped>
.post-list-element {
  list-style: none;
}

.list-post-title,
.list-post-category {
  text-decoration: none;
}
.list-post-category {
  font-size: 14px;
  font-weight: 600;
  margin-left: 8px;
}

.list-post-title {
  font-size: 1.1em;
  font-weight: 600;
}

.list-post-date {
  margin-right: 8px;
}

.theme--dark .list-post-date {
  color: #ccc;
}

.theme--light .list-post-date {
  color: #222;
}

.post-img {
  width: 50%;
}
</style>
