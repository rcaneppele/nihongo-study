import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'dev-dist', 'coverage', 'test-results', 'playwright-report', 'reports', '.stryker-tmp'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    // Cada lição exporta, junto do componente, os dados que outras telas leem
    // (`meta`, `quiz`, `diga`); e useTheme exporta o provider junto do hook.
    // O padrão é intencional — o custo é só recarregar a página inteira no dev.
    files: ['src/licoes/**/*.tsx', 'src/lib/useTheme.tsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
  {
    // Testes ponta a ponta rodam no Node (Playwright): o `use` das fixtures
    // não é hook do React.
    files: ['e2e/**/*.ts'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: { 'react-hooks/rules-of-hooks': 'off' },
  }
);
