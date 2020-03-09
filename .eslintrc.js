module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'import/prefer-default-export': 0,
    'semi': 0,
    'import/extensions': 0,
    'class-methods-use-this': 0,
    'no-new': 0,
    'no-unused-vars': 0,
    'import/no-unresolved': 0,
    'guard-for-in': 0,
    'no-restricted-syntax': 0,
  },
};
