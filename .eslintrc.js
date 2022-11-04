module.exports = {
  extends: ['next', 'prettier', '@typescript-eslint'],
  rules: {
    quotes: ['error', 'single'],
    'prefer-const': 1,
    'block-spacing': ['error', 'always'],
    'keyword-spacing': ['error', { before: true, after: true }],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'semi-spacing': ['error', { before: false, after: true }],
    'space-in-parens': ['error', 'never'],
    'sort-imports': 0,
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['/'],
          exceptions: ['-', '+'],
        },
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true,
        },
      },
    ],
    'space-before-blocks': [
      'error',
      { functions: 'always', keywords: 'always', classes: 'always' },
    ],
    'padded-blocks': [
      'error',
      { blocks: 'never', classes: 'never', switches: 'never' },
    ],
    'object-property-newline': [
      'error',
      { allowMultiplePropertiesPerLine: true },
    ],
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    'no-duplicate-imports': 0,
    'array-bracket-spacing': 0,
    '@typescript-eslint/no-this-alias': 1,
    '@typescript-eslint/ban-types': 0,
  },
}
