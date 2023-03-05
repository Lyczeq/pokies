module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  rules: {
    indent: ['error', 'space'],
    'linebreak-style': ['warn', 'unix'],
    quotes: ['error', 'single'],
    semi: ['warn', 'always'],
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'no-console': 'on',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
