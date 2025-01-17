// @ts-check

import eslint from '@eslint/js'
import perfectionist from 'eslint-plugin-perfectionist'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    ignores: [
      'coverage/',
      'public/',
      'dist/',
      'node_modules/',
      'src/services/maverick/generated/',
      'src/icons/**/*.tsx',
    ],
  },
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-imports': [
        'error',
        { type: 'alphabetical', newlinesBetween: 'ignore' },
      ],
      'perfectionist/sort-interfaces': 'error',
      'perfectionist/sort-jsx-props': 'error',
      'perfectionist/sort-union-types': 'error',
      'perfectionist/sort-named-imports': 'error',
    },
  },
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    rules: {
      'no-useless-catch': 'off',
      'no-empty': ['error', { allowEmptyCatch: true }],
      curly: 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: {
      'perfectionist/sort-imports': 'off',
    },
  }
)
