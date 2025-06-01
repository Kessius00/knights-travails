import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

/** @type {import("eslint").Linter.Config[]} */
export default [  
  // 🔒 Ignore patterns go first
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '*.min.js',
    ],
  },

  // 🧠 Recommended base rules
  js.configs.recommended,

  // Browser JS files
  {
      files: ['src/**/*.js'],
      languageOptions: {
          ecmaVersion: 2022,
          sourceType: 'module',
          globals: globals.browser,

      },
      rules: {
          'no-console': 'off',
          'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      },
  },

  // Node.js scripts like webpack configs
  {
      files: ['webpack*.js', 'webpack*.cjs', 'webpack*.mjs'],
      languageOptions: {
          ecmaVersion: 2022,
          sourceType: 'commonjs',
          globals: globals.node,
      },
      rules: {
          'no-console': 'off',
      },
  },

  // Apply Prettier formatting compatibility
  prettier,
];
