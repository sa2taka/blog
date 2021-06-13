module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'plugin:nuxt/recommended',
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'import/no-mutable-exports': 'off',
    'vue/no-v-html': 'off',
  },
  ignorePatterns: ['static/', 'node_modules/', '.nuxt/'],
};
