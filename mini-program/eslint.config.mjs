import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';

// ESLint flat config for the uni-app (Vue 3 + TypeScript) mini-program.
// Prettier is run separately for formatting; eslint-config-prettier disables
// any rules that would fight it.
export default [
  {
    ignores: [
      'dist/**',
      'unpackage/**',
      'node_modules/**',
      'src/uni_modules/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  eslintConfigPrettier,
];
