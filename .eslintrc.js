module.exports = {
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  rules: {
    'prettier/prettier': 'error',

    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],
  },
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
