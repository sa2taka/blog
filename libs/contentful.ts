import createClient from '@/plugins/contentful';

const client = createClient();

export function fetchCategories() {
  return client.getEntries({
    content_type: process.env.CTF_CATEGORY_ID,
  });
}
