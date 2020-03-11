import createClient from '@/plugins/contentful';

const client = createClient();

export function fetchCategories() {
  return client.getEntries({
    content_type: process.env.CTF_CATEGORY_ID,
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
