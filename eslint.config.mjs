import { builtinModules } from 'node:module';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const PLATFORM_FREE = 'packages/core must run on web, mobile and server (see CLAUDE.md).';

export default defineConfig([
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/.turbo/**',
      '**/dist/**',
      '**/coverage/**',
      '**/next-env.d.ts',
    ],
  },
  js.configs.recommended,
  tseslint.configs.strict,
  {
    files: ['**/*.{js,cjs,mjs}'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: { sourceType: 'commonjs' },
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  {
    // Architecture rule: no React, Next.js, browser or Node APIs in packages/core.
    files: ['packages/core/src/**/*.ts'],
    ignores: ['**/*.test.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: builtinModules.map((name) => ({ name, message: PLATFORM_FREE })),
          patterns: [
            {
              group: [
                'node:*',
                'react',
                'react/*',
                'react-dom',
                'react-dom/*',
                'react-native',
                'next',
                'next/*',
              ],
              message: PLATFORM_FREE,
            },
          ],
        },
      ],
      'no-restricted-globals': [
        'error',
        ...[
          'window',
          'document',
          'navigator',
          'localStorage',
          'sessionStorage',
          'process',
          'Buffer',
        ].map((name) => ({ name, message: PLATFORM_FREE })),
      ],
    },
  },
]);
