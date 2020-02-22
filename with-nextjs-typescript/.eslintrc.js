import prettierConfig from './.prettierrc.js'

module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'wesbos'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    '@typescript-eslint/rule-name': 'error',
    'prettier/prettier': ['error', prettierConfig],
    'react/jsx-filename-extension': [
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-unused-expression': [true, 'allow-tagged-template'],
  },
}
