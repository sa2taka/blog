import createClient from '@/plugins/contentful';
import { MultipleItem, Post } from '@/types/entry';

const client = createClient();

export function fetchCategories() {
  return client.getEntries({
    content_type: process.env.CTF_CATEGORY_ID,
    order: 'fields.sort',
  });
}

export function fetchPosts(page: number, limit: number) {
  return client.getEntries({
    content_type: process.env.CTF_POST_ID,
    order: '-fields.releaseDate',
    skip: page * limit,
    limit,
  });
}

export function fetchLatestPostInCategory(category: string) {
  return client
    .getEntries({
      content_type: process.env.CTF_POST_ID,
      limit: 1,
      order: '-fields.releaseDate',
      'fields.category.sys.contentType.sys.id': process.env.CTF_CATEGORY_ID,
      'fields.category.fields.name': category,
    })
    .then((posts: MultipleItem<Post>) => posts.items[0]);
}

export function fetchPost(slug: string) {
  return client
    .getEntries({
      content_type: process.env.CTF_POST_ID,
      'fields.slug': slug,
    })
    .then((posts: MultipleItem<Post>) => posts.items[0]);
}
