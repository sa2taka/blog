import createClient from '@/plugins/contentful';
import { Category, MultipleItem, Post } from '@/types/entry';

import { CTF_CATEGORY_ID, CTF_POST_ID } from '@/libs/const';

export type CategoryWithCount = { element: Category; count: number };

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
    order: '-sys.createdAt',
    skip: page * limit,
    limit,
  };

  if (isProdcution) {
    queries['fields.public'] = true;
  }

  return client.getEntries(queries);
}

export function fetchPostsCount() {
  const queries: Record<string, any> = {
    content_type: CTF_POST_ID,
    order: '-sys.createdAt',
    limit: 1000,
    select: 'fields.public',
  };

  if (isProdcution) {
    queries['fields.public'] = true;
  }

  return client
    .getEntries(queries)
    .then((posts: MultipleItem<Post>) => posts.total);
}

export async function fetchPostsCountInCategory(categoryId: string) {
  const queries: Record<string, any> = {
    content_type: CTF_POST_ID,
    limit: 1000,
    order: '-sys.createdAt',
    'fields.category.sys.id': categoryId,
    select: 'fields.public',
  };

  if (isProdcution) {
    queries['fields.public'] = true;
  }

  const count = await client
    .getEntries(queries)
    .then((posts: MultipleItem<Post>) => posts.items.length);
  return count;
}

export function fetchCategoriesWithCounts(): CategoryWithCount[] {
  return fetchCategories().then((entries: MultipleItem<Category>) => {
    return Promise.all(
      entries.items.map((e) => {
        return fetchPostsCountInCategory(e.sys.id).then((count) => ({
          element: e,
          count,
        }));
      })
    );
  });
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
    order: '-sys.createdAt',
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
