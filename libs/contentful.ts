import createClient from '@/plugins/contentful';
import { MultipleItem, Post } from '@/types/entry';

import { CTF_CATEGORY_ID, CTF_POST_ID } from '@/libs/const';

const client = createClient();
const isProdcution = process.env.NODE_ENV === 'production';

export function fetchCategories() {
  return client.getEntries({
    content_type: CTF_CATEGORY_ID,
    order: 'fields.sort',
  });
}

export function fetchPosts(page: number, limit: number) {
  const queries: Record<string, any> = {
    content_type: CTF_POST_ID,
    order: '-fields.releaseDate',
    skip: page * limit,
    limit,
  };

  if (isProdcution) {
    queries['fields.public'] = true;
  }

  return client.getEntries(queries);
}

export async function confirmExistingCategory(categoryId: string) {
  const queries: Record<string, any> = {
    content_type: CTF_POST_ID,
    limit: 1,
    order: '-fields.releaseDate',
    'fields.category.sys.id': categoryId,
  };

  if (isProdcution) {
    queries['fields.public'] = true;
  }

  const isExist = await client
    .getEntries(queries)
    .then((posts: MultipleItem<Post>) => posts.items.length !== 0);
  return isExist;
}

export function fetchPostInCategory(
  categorySlug: string,
  page: number,
  limit: number
) {
  const queries: Record<string, any> = {
    content_type: CTF_POST_ID,
    limit,
    skip: page * limit,
    order: '-fields.releaseDate',
    'fields.category.sys.contentType.sys.id': CTF_CATEGORY_ID,
    'fields.category.fields.slug': categorySlug,
  };

  if (isProdcution) {
    queries['fields.public'] = true;
  }

  return client.getEntries(queries);
}

export function fetchPost(slug: string) {
  return client
    .getEntries({
      content_type: CTF_POST_ID,
      'fields.slug': slug,
    })
    .then((posts: MultipleItem<Post>) => posts.items[0]);
}
