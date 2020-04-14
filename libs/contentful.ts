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

export async function confirmExistingCategory(categoryId: string) {
  const isExist = await client
    .getEntries({
      content_type: process.env.CTF_POST_ID,
      limit: 1,
      order: '-fields.releaseDate',
      'fields.category.sys.id': categoryId,
    })
    .then((posts: MultipleItem<Post>) => posts.items.length !== 0);
  return isExist;
}

export function fetchPost(slug: string) {
  return client
    .getEntries({
      content_type: process.env.CTF_POST_ID,
      'fields.slug': slug,
    })
    .then((posts: MultipleItem<Post>) => posts.items[0]);
}
