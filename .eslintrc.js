module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
  ],
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  rules: {
    'prettier/prettier': 'error',

    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],
  },
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        directory: './',
      },
    },
  },
};
