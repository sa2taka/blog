const contentful = require('contentful');
// use default environment config for convenience
// these will be set via `env` property in nuxt.config.js
const config = {
  postId: process.env.CTF_POST_ID,
  mainAuthorId: process.env.CTF_MAIN_AUTHOR_ID,
  categoryId: process.env.CTF_CATEGORY_ID,
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN,
};

// export `createClient` to use it in page components

export default function createClient() {
  return contentful.createClient(config);
}
