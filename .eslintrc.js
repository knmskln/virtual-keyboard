module.exports = {
  extends: 'eslint-config-airbnb-base',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'no-console': 'warn',
    'no-plusplus': 'off',
    'eol-last': 'off',
    'no-unused-vars': 'warn',
    'comma-dangle': ['warn', 'always-multiline'],
    'func-names': ['warn', 'never'],
    'import/newline-after-import': ['warn', { count: 1 }],
    'import/no-extraneous-dependencies': ['warn', { devDependencies: true }],
  },
};
