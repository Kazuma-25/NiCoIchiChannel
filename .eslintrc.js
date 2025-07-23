module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true, // これがないと defineProps に警告が出る
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    // 必要に応じてルールを追加
  },
  rules: {
  'vue/html-self-closing': 'off',
  'vue/max-attributes-per-line': 'off',
  'vue/require-default-prop': 'off'
  }

}